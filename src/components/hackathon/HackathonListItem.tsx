// components/hackathon/HackathonListItem.tsx
import { formatDistance } from 'date-fns';
import { Hackathon } from '../../types';

interface HackathonListItemProps {
  hackathon: Hackathon;
}

export const HackathonListItem = ({ hackathon }: HackathonListItemProps) => {
  const getStatus = () => {
    const now = new Date();
    if (now > hackathon.submissionDeadline) return 'Completed';
    if (now > hackathon.registrationDeadline) return 'In Progress';
    return 'Upcoming';
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{hackathon.title}</h3>
          <p className="text-gray-600">{hackathon.platform}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatus() === 'Upcoming' ? 
          'bg-blue-100 text-blue-800' : getStatus() === 'In Progress' ?
          'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
          {getStatus()}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Registration Deadline</p>
          <p>
            {formatDistance(new Date(hackathon.registrationDeadline), new Date(), {
              addSuffix: true
            })}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Submission Deadline</p>
          <p>
            {formatDistance(new Date(hackathon.submissionDeadline), new Date(), {
              addSuffix: true
            })}
          </p>
        </div>
      </div>
    </div>
  );
};