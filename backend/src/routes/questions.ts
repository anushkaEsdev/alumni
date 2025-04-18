import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all questions
router.get('/', async (req: Request, res: Response) => {
  try {
    const questions = await Post.find({ type: 'question' })
      .populate('author', 'username name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get question by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const question = await Post.findById(req.params.id)
      .populate('author', 'username name avatarUrl')
      .populate('comments.author.id', 'username name avatarUrl');

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
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const question = new Post({
      title,
      content,
      type: 'question',
      author: (req as any).user._id
    });

    await question.save();
    await question.populate('author', 'username name avatarUrl');
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update question
router.put('/:id', auth, [
  body('title').optional().trim().notEmpty(),
  body('content').optional().trim().notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const question = await Post.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.author.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content } = req.body;
    if (title) question.title = title;
    if (content) question.content = content;

    await question.save();
    await question.populate('author', 'username name avatarUrl');
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete question
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const question = await Post.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.author.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add answer
router.post('/:id/answers', auth, [
  body('content').trim().notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const question = await Post.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const { content } = req.body;
    const answer = {
      content,
      author: {
        id: (req as any).user._id,
        name: (req as any).user.name
      },
      createdAt: new Date()
    };

    question.comments.push(answer);
    await question.save();
    await question.populate('author', 'username name avatarUrl');
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const questionRoutes = router; 