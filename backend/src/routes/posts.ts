import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Post, IPost, IComment } from '../models/Post';
import { User } from '../models/User';
import { auth as authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ type: 'post' })
      .populate('author', 'username name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username name avatarUrl')
      .populate('comments.author.id', 'username name avatarUrl');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post
router.post('/', authMiddleware, [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      type: 'post',
      author: (req as any).user._id
    });

    await post.save();
    await post.populate('author', 'username name avatarUrl');
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post
router.put('/:id', authMiddleware, [
  body('title').optional().trim().notEmpty(),
  body('content').optional().trim().notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    await post.populate('author', 'username name avatarUrl');
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/:id/comments', authMiddleware, [
  body('content').trim().notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { content } = req.body;
    const comment = {
      content,
      author: {
        id: (req as any).user._id,
        name: (req as any).user.name
      },
      createdAt: new Date()
    };

    post.comments.push(comment);
    await post.save();
    await post.populate('author', 'username name avatarUrl');
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const postRoutes = router; 