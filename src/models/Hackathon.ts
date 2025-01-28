import { Schema, model, models, Document } from 'mongoose';

export interface IHackathon extends Document {
  title: string;
  platform: 'devpost' | 'devfolio' | 'other';
  registrationDeadline: Date;
  submissionDeadline: Date;
  description?: string;
  team: Schema.Types.ObjectId;
  status: 'upcoming' | 'active' | 'completed';
  externalUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const hackathonSchema = new Schema<IHackathon>({
  title: { type: String, required: true, trim: true },
  platform: {
    type: String,
    enum: ['devpost', 'devfolio', 'other'],
    required: true
  },
  registrationDeadline: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(this: IHackathon, value: Date) {
        return value < this.submissionDeadline;
      },
      message: 'Registration deadline must be before submission deadline'
    }
  },
  submissionDeadline: { type: Date, required: true },
  description: String,
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed'],
    default: 'upcoming'
  },
  externalUrl: String
}, { timestamps: true });

// Indexes for faster querying
hackathonSchema.index({ team: 1 });
hackathonSchema.index({ submissionDeadline: 1 });
hackathonSchema.index({ status: 1 });

// Virtual for days remaining
hackathonSchema.virtual('daysRemaining').get(function(this: IHackathon) {
  const now = new Date();
  const diff = this.submissionDeadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
});

export default models.Hackathon || model<IHackathon>('Hackathon', hackathonSchema);