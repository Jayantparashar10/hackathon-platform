import { Schema, model, models, Document } from 'mongoose';

export interface IChatRoom extends Document {
  team: Schema.Types.ObjectId;
  messages: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>({
  team: { 
    type: Schema.Types.ObjectId, 
    ref: 'Team',
    required: true,
    unique: true
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, { timestamps: true });

export default models.ChatRoom || model<IChatRoom>('ChatRoom', chatRoomSchema);