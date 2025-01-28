import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ChatWindow } from '@/components/chat';
import { Team } from '@/types';

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

export default function TeamPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: team } = useSWR<Team>(`/api/teams/${id}`);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">{team?.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Team Chat</h2>
          {id && <ChatWindow teamId={id as string} />}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Members</h2>
          <div className="space-y-2">
            {team?.members?.map((member) => (
              <div key={member._id} className="flex items-center gap-3 p-3 bg-white rounded shadow">
                <img
                  src={member.image || '/avatar-placeholder.png'}
                  className="w-10 h-10 rounded-full"
                  alt={member.name}
                />
                <span className="font-medium">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}