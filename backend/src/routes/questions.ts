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

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Post.find({ type: 'interview' })
      .sort({ createdAt: -1 })
      .populate('author.id', 'username avatarUrl');
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Post.findById(req.params.id)
      .populate('author.id', 'username avatarUrl')
      .populate('comments.author.id', 'username avatarUrl');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create question
router.post('/', auth, [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty()
], async (req: any, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    const question = new Post({
      title,
      content,
      type: 'interview',
      author: {
        id: req.user._id,
        name: req.user.username
      }
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update question
router.put('/:id', auth, [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty()
], async (req: any, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const question = await Post.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    question.title = title;
    question.content = content;

    await question.save();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete question
router.delete('/:id', auth, async (req: any, res) => {
  try {
    const question = await Post.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await question.remove();
    res.json({ message: 'Question removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add answer
router.post('/:id/answers', auth, [
  body('content').trim().notEmpty()
], async (req: any, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const question = await Post.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const answer = {
      content: req.body.content,
      author: {
        id: req.user._id,
        name: req.user.username
      }
    };

    question.comments.push(answer);
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const questionRoutes = router; 