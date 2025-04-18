import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  type: 'blog' | 'interview' | 'meeting';
  author: {
    id: Schema.Types.ObjectId;
    name: string;
  };
  date: Date;
  comments: IComment[];
  meetingDate?: Date;
  meetingTime?: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  id: Schema.Types.ObjectId;
  content: string;
  author: {
    id: Schema.Types.ObjectId;
    name: string;
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
    name: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

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
    enum: ['blog', 'interview', 'meeting'],
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
  date: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema],
  meetingDate: {
    type: Date
  },
  meetingTime: {
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