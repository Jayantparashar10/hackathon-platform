import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createHandler } from '@/lib/api/handlerFactory';
import Hackathon from '@/models/Hackathon';
import Team from '@/models/Team';
import dbConnect from '@/lib/dbConnect';

const handler = createHandler(
  {
    methods: ['GET', 'POST'],
    authenticated: true,
  },
  async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    const session = await getSession({ req });

    if (req.method === 'GET') {
      const hackathons = await Hackathon.find({
        team: { $in: session?.user?.teams },
      }).populate('team');
      return res.status(200).json(hackathons);
    }

    if (req.method === 'POST') {
      const { title, platform, registrationDeadline, submissionDeadline, teamId } = req.body;
      
      const team = await Team.findOne({
        _id: teamId,
        members: session?.user?.id,
      });

      if (!team) {
        return res.status(403).json({ error: 'Invalid team selection' });
      }

      const hackathon = await Hackathon.create({
        title,
        platform,
        registrationDeadline: new Date(registrationDeadline),
        submissionDeadline: new Date(submissionDeadline),
        team: teamId,
      });

      team.hackathons.push(hackathon._id);
      await team.save();

      return res.status(201).json(hackathon);
    }
  }
);

export default handler;