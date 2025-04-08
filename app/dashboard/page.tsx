"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { 
  LayoutGrid, 
  Video, 
  Calendar, 
  MessageSquare, 
  UserPlus, 
  LogOut,
  Clock,
  FileText,
  Users,
  PlusCircle
} from 'lucide-react';

export default function TeamsDashboard() {
  const router = useRouter();
  const { isAuthenticated, userEmail, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('meetings');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const sidebarItems = [
    { icon: Video, label: 'Meetings', key: 'meetings' },
    { icon: Calendar, label: 'Schedule', key: 'schedule' },
    { icon: MessageSquare, label: 'Chat', key: 'chat' },
    { icon: Users, label: 'Contacts', key: 'contacts' },
  ];

  const quickActions = [
    { icon: PlusCircle, label: 'New Meeting', color: 'text-green-500' },
    { icon: UserPlus, label: 'Invite', color: 'text-blue-500' },
    { icon: Calendar, label: 'Schedule', color: 'text-purple-500' },
  ];

  const upcomingMeetings = [
    { 
      title: 'Team Standup', 
      time: '9:00 AM', 
      date: 'Today', 
      participants: 5 
    },
    { 
      title: 'Product Review', 
      time: '2:00 PM', 
      date: 'Tomorrow', 
      participants: 8 
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-20 bg-white dark:bg-gray-800 shadow-md flex flex-col items-center py-6">
        <div className="mb-8">
          <LayoutGrid className="w-8 h-8 text-indigo-600" />
        </div>
        
        {sidebarItems.map((item) => (
          <button 
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`p-3 mb-2 rounded-lg ${
              activeSection === item.key 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}

        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="p-3 text-red-500 hover:bg-red-100 rounded-lg"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Meetings</h2>
            <div className="flex space-x-2">
              {quickActions.map((action) => (
                <button 
                  key={action.label}
                  className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${action.color}`}
                >
                  <action.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Upcoming</h3>
            {upcomingMeetings.map((meeting, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{meeting.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {meeting.time} · {meeting.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{meeting.participants}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="mr-4 bg-indigo-100 p-3 rounded-full">
                <Video className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Welcome, {userEmail}</h1>
                <p className="text-gray-500 dark:text-gray-400">Ready for your next virtual meeting?</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: Clock, 
                  title: 'Start Instant Meeting', 
                  description: 'Quick and easy video call',
                  color: 'bg-green-100 text-green-600'
                },
                { 
                  icon: Calendar, 
                  title: 'Schedule Meeting', 
                  description: 'Plan your next collaboration',
                  color: 'bg-blue-100 text-blue-600'
                },
                { 
                  icon: FileText, 
                  title: 'Meeting Notes', 
                  description: 'Collaborate and track progress',
                  color: 'bg-purple-100 text-purple-600'
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}