import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import useSWR from 'swr';
import { HackathonCalendar, HackathonListItem } from '@/components/hackathon';
import { TeamListItem } from '@/components/team';
import { Hackathon, Team } from '@/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default function Dashboard() {
  const { data: teams } = useSWR<Team[]>('/api/teams');
  const { data: hackathons } = useSWR<Hackathon[]>('/api/hackathons');

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teams Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Teams</h2>
          <div className="grid gap-4">
            {teams?.map((team) => (
              <TeamListItem key={team._id} team={team} />
            ))}
          </div>
        </div>

        {/* Hackathons Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Active Hackathons</h2>
          <div className="grid gap-4">
            {hackathons?.map((hackathon) => (
              <HackathonListItem
                key={hackathon._id}
                hackathon={hackathon}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Schedule Overview</h2>
        <HackathonCalendar hackathons={hackathons || []} />
      </div>
    </div>
  );
}