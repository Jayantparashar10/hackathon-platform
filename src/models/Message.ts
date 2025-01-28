import { Schema, model, models, Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  user: Schema.Types.ObjectId;
  team: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  content: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
}, { timestamps: true });

// Index for faster message retrieval
messageSchema.index({ team: 1, createdAt: -1 });

// Text index for search
messageSchema.index({ content: 'text' });

export default models.Message || model<IMessage>('Message', messageSchema);