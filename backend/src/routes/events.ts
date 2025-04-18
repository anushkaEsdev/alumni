import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Event } from '../models/Event';
import { User } from '../models/User';

const router = express.Router();

// Middleware to verify JWT token
const auth = async (req: Request, res: Response, next: express.NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById((decoded as any).userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all events
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
      .populate('author', 'username avatarUrl')
      .sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get upcoming events
router.get('/upcoming', async (req: Request, res: Response) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() }
    })
      .populate('author', 'username avatarUrl')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get past events
router.get('/past', async (req: Request, res: Response) => {
  try {
    const events = await Event.find({
      date: { $lt: new Date() }
    })
      .populate('author', 'username avatarUrl')
      .sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create an event
router.post('/', auth, [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('date').isISO8601(),
  body('location').trim().notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date, location } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      author: (req as any).user._id
    });

    await event.save();
    await event.populate('author', 'username avatarUrl');
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an event
router.put('/:id', auth, [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('date').optional().isISO8601(),
  body('location').optional().trim().notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.author.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description, date, location } = req.body;
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;

    await event.save();
    await event.populate('author', 'username avatarUrl');
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an event
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.author.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const eventRoutes = router; 