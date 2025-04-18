import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Post, IPost, IComment } from '../models/Post';
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

// Get all posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username avatarUrl')
      .populate('comments.author', 'username avatarUrl')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts by type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const posts = await Post.find({ type })
      .sort({ createdAt: -1 })
      .populate('author.id', 'username avatarUrl');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a post
router.post('/', auth, [
  body('content').trim().notEmpty(),
  body('type').isIn(['text', 'image', 'link'])
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, type, imageUrl, linkUrl } = req.body;
    const post = new Post({
      content,
      type,
      imageUrl,
      linkUrl,
      author: (req as any).user._id
    });

    await post.save();
    await post.populate('author', 'username avatarUrl');
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post
router.put('/:id', auth, [
  body('content').optional().trim().notEmpty(),
  body('type').optional().isIn(['text', 'image', 'link'])
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

    const { content, type, imageUrl, linkUrl } = req.body;
    if (content) post.content = content;
    if (type) post.type = type;
    if (imageUrl) post.imageUrl = imageUrl;
    if (linkUrl) post.linkUrl = linkUrl;

    await post.save();
    await post.populate('author', 'username avatarUrl');
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post
router.delete('/:id', auth, async (req: Request, res: Response) => {
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

// Add a comment
router.post('/:id/comments', auth, [
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

    const comment: IComment = {
      content: req.body.content,
      author: {
        id: (req as any).user._id,
        username: (req as any).user.username,
        avatarUrl: (req as any).user.avatarUrl
      },
      createdAt: new Date()
    };

    post.comments.push(comment);
    await post.save();
    await post.populate('author', 'username avatarUrl');
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export const postRoutes = router; 