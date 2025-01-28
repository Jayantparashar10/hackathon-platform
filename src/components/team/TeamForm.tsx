// components/team/TeamForm.tsx
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export const TeamForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { data: session } = useSession();
  const [teamName, setTeamName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: teamName }),
    });

    if (response.ok) {
      onSubmit();
      setTeamName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Create Team
      </button>
    </form>
  );
};