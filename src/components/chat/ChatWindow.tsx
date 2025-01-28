// components/chat/ChatWindow.tsx
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { io } from 'socket.io-client';

interface Message {
  _id: string;
  content: string;
  user: {
    name: string;
    image?: string;
  };
  createdAt: string;
}

interface ChatWindowProps {
  teamId: string;
}

export const ChatWindow = ({ teamId }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

    socket.on('connect', () => {
      socket.emit('join-room', teamId);
    });

    socket.on('message-history', (history: Message[]) => {
      setMessages(history);
    });

    socket.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [teamId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
    socket.emit('send-message', {
      teamId,
      message: newMessage
    });
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-96 bg-white rounded-lg shadow">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message._id} className="flex items-start gap-3">
            <img 
              src={message.user.image || '/avatar-placeholder.png'} 
              className="w-8 h-8 rounded-full" 
              alt={message.user.name}
            />
            <div className="flex-1">
              <div className="font-medium">{message.user.name}</div>
              <p className="text-gray-700">{message.content}</p>
              <time className="text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleTimeString()}
              </time>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-lg p-2"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};