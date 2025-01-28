import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createHandler } from '@/lib/api/handlerFactory';
import Team from '@/models/Team';
import User from '@/models/User';
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
      const teams = await Team.find({
        members: session?.user?.id,
      }).populate('members hackathons');
      return res.status(200).json(teams);
    }

    if (req.method === 'POST') {
      const { name } = req.body;
      const user = await User.findById(session?.user?.id);

      const team = await Team.create({
        name,
        members: [user._id],
      });

      user.teams.push(team._id);
      await user.save();

      return res.status(201).json(team);
    }
  }
);

export default handler;