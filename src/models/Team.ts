import { Schema, model, models, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  members: Schema.Types.ObjectId[];
  hackathons: Schema.Types.ObjectId[];
  chatRoom: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  description: {
    type: String,
    maxlength: 200
  },
  members: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    validate: {
      validator: (v: Schema.Types.ObjectId[]) => v.length <= 5,
      message: 'Team cannot have more than 5 members'
    }
  }],
  hackathons: [{ type: Schema.Types.ObjectId, ref: 'Hackathon' }],
  chatRoom: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }
}, { timestamps: true });

// Index for faster team searches
teamSchema.index({ name: 'text', description: 'text' });

// Cascade delete middleware
teamSchema.pre('deleteOne', { document: true }, async function(next) {
  await this.model('Hackathon').deleteMany({ team: this._id });
  await this.model('ChatRoom').deleteOne({ _id: this.chatRoom });
  next();
});

export default models.Team || model<ITeam>('Team', teamSchema);