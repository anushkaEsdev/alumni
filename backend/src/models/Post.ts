import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  content: string;
  type: 'text' | 'image' | 'link';
  author: Schema.Types.ObjectId;
  imageUrl?: string;
  linkUrl?: string;
  comments: IComment[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  content: string;
  author: {
    id: Schema.Types.ObjectId;
    username: string;
    avatarUrl?: string;
  };
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String
    }
  }
}, {
  timestamps: true
});

const postSchema = new Schema<IPost>({
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'link'],
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String
  },
  linkUrl: {
    type: String
  },
  comments: [commentSchema],
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const Post = mongoose.model<IPost>('Post', postSchema); 