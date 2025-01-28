// components/calendar/HackathonCalendar.tsx
import { EventInput } from '@fullcalendar/react';
import dynamic from 'next/dynamic';
import { Hackathon } from '../../types';

const FullCalendar = dynamic(
  () => import('@fullcalendar/react').then((mod) => mod.FullCalendar),
  { ssr: false }
);

interface CalendarProps {
  hackathons: Hackathon[];
}

export const HackathonCalendar = ({ hackathons }: CalendarProps) => {
  const events: EventInput[] = hackathons.map(hackathon => ({
    title: hackathon.title,
    start: hackathon.registrationDeadline,
    end: hackathon.submissionDeadline,
    extendedProps: {
      platform: hackathon.platform,
      status: hackathon.status
    },
    className: `calendar-event-${hackathon.status}`
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <FullCalendar
        plugins={[require('@fullcalendar/daygrid'), require('@fullcalendar/interaction')]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        height="auto"
        headerToolbar={{
          start: 'title',
          center: '',
          end: 'today prev,next'
        }}
      />
    </div>
  );
};

const renderEventContent = (eventInfo: any) => (
  <div className="p-2 text-sm">
    <div className="font-medium">{eventInfo.event.title}</div>
    <div className="text-xs text-gray-500">
      {eventInfo.event.extendedProps.platform}
    </div>
    <div className="text-xs mt-1">
      {eventInfo.event.extendedProps.status}
    </div>
  </div>
);