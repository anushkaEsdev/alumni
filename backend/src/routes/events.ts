import express from 'express';
import { body, validationResult } from 'express-validator';
import { Post } from '../models/Post';
import { User } from '../models/User';

const router = express.Router();

// Middleware to verify JWT token
const auth = async (req: any, res: any, next: any) => {
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

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Post.find({ type: 'meeting' })
      .sort({ meetingDate: 1 })
      .populate('author.id', 'username avatarUrl');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const today = new Date();
    const events = await Post.find({
      type: 'meeting',
      meetingDate: { $gte: today }
    })
      .sort({ meetingDate: 1 })
      .populate('author.id', 'username avatarUrl');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get past events
router.get('/past', async (req, res) => {
  try {
    const today = new Date();
    const events = await Post.find({
      type: 'meeting',
      meetingDate: { $lt: today }
    })
      .sort({ meetingDate: -1 })
      .populate('author.id', 'username avatarUrl');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create event
router.post('/', auth, [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty(),
  body('meetingDate').isISO8601(),
  body('meetingTime').trim().notEmpty()
], async (req: any, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, meetingDate, meetingTime } = req.body;

    const event = new Post({
      title,
      content,
      type: 'meeting',
      author: {
        id: req.user._id,
        name: req.user.username
      },
      meetingDate,
      meetingTime
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event
router.put('/:id', auth, [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty(),
  body('meetingDate').isISO8601(),
  body('meetingTime').trim().notEmpty()
], async (req: any, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, meetingDate, meetingTime } = req.body;
    const event = await Post.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    event.title = title;
    event.content = content;
    event.meetingDate = meetingDate;
    event.meetingTime = meetingTime;

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event
router.delete('/:id', auth, async (req: any, res) => {
  try {
    const event = await Post.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await event.remove();
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const eventRoutes = router; 