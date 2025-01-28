import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  teams: Schema.Types.ObjectId[];
  notifications: INotification[];
  provider: 'google' | 'github' | 'credentials';
  createdAt: Date;
  updatedAt: Date;
}

interface INotification {
  type: 'deadline' | 'team' | 'system';
  message: string;
  read: boolean;
  relatedEntity?: Schema.Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
  },
  image: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  notifications: [{
    type: { type: String, enum: ['deadline', 'team', 'system'], required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    relatedEntity: { type: Schema.Types.ObjectId, refPath: 'notifications.type' },
    createdAt: { type: Date, default: Date.now }
  }],
  provider: { 
    type: String, 
    enum: ['google', 'github', 'credentials'],
    default: 'credentials'
  }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export default models.User || model<IUser>('User', userSchema);