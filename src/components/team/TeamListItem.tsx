// components/team/TeamListItem.tsx
import Link from 'next/link';

interface TeamListItemProps {
  team: {
    _id: string;
    name: string;
    members: any[];
    hackathons: any[];
  };
}

export const TeamListItem = ({ team }: TeamListItemProps) => {
  return (
    <Link href={`/teams/${team._id}`}>
      <a className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold">{team.name}</h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>{team.members.length} members</p>
          <p>{team.hackathons.length} hackathons</p>
        </div>
      </a>
    </Link>
  );
};