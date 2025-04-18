import mongoose, { Document, Schema } from 'mongoose';

export interface IComment {
  content: string;
  author: {
    id: Schema.Types.ObjectId;
    name: string;
  };
  createdAt: Date;
}

export interface IPost extends Document {
  title: string;
  content: string;
  type: 'post' | 'question';
  author: Schema.Types.ObjectId;
  comments: IComment[];
  imageUrl?: string;
  linkUrl?: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['post', 'question'],
    default: 'post'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
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
      name: {
        type: String,
        required: true
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  imageUrl: {
    type: String
  },
  linkUrl: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const Post = mongoose.model<IPost>('Post', postSchema); 