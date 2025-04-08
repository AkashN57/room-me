"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
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
  PlusCircle,
  X,
  Bell,
} from "lucide-react";

export default function TeamsDashboard() {
  const router = useRouter();
  const { isAuthenticated, userEmail, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState("meetings");
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
    
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    
    // Show welcome banner for 5 seconds then auto-dismiss
    const timer = setTimeout(() => {
      setShowWelcomeBanner(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isMounted) {
   
      if (!isAuthenticated) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, router, isMounted]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const sidebarItems = [
    { icon: Video, label: "Meetings", key: "meetings" },
    { icon: Calendar, label: "Schedule", key: "schedule" },
    { icon: MessageSquare, label: "Chat", key: "chat" },
    { icon: Users, label: "Contacts", key: "contacts" },
  ];

  const quickActions = [
    { icon: PlusCircle, label: "New Meeting", color: "text-green-500" },
    { icon: UserPlus, label: "Invite", color: "text-blue-500" },
    { icon: Calendar, label: "Schedule", color: "text-purple-500" },
  ];

  const upcomingMeetings = [
    {
      title: "Team Standup",
      time: "9:00 AM",
      date: "Today",
      participants: 5,
      isActive: true,
    },
    {
      title: "Product Review",
      time: "2:00 PM",
      date: "Tomorrow",
      participants: 8,
      isActive: false,
    },
    {
      title: "Sprint Planning",
      time: "10:00 AM",
      date: "Apr 10",
      participants: 12,
      isActive: false,
    },
  ];

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect is handled in useEffect, this is just an extra safety check
  if (!isAuthenticated) {
    return null;
  }

  const themeClass = darkMode ? "dark" : "";

  return (
    <div className={`${themeClass}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        {/* Welcome Banner */}
        {showWelcomeBanner && (
          <div className="fixed top-0 left-0 right-0 bg-indigo-600 text-white py-3 px-6 z-50 animate-fadeIn">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5" />
                <p className="font-medium">
                Welcome, you’re logged in
                </p>
              </div>
              <button
                onClick={() => setShowWelcomeBanner(false)}
                className="rounded-full p-1 hover:bg-indigo-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div className="w-20 bg-white dark:bg-gray-800 shadow-md flex flex-col items-center py-6 transition-colors duration-200">
          <div className="mb-8">
            <LayoutGrid className="w-8 h-8 text-indigo-600" />
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`p-3 mb-2 rounded-lg transition-all duration-200 ${
                activeSection === item.key
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              title={item.label}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}

          <div className="mt-auto flex flex-col space-y-3">
         
            <button
              onClick={handleLogout}
              className="p-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6 overflow-y-auto transition-colors duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Meetings
              </h2>
              <div className="flex space-x-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${action.color} transition-colors`}
                    title={action.label}
                  >
                    <action.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search meetings..."
                  className="w-full py-2 pl-10 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Upcoming Meetings */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Upcoming
              </h3>
              {upcomingMeetings.map((meeting, index) => (
                <div
                  key={index}
                  className={`${
                    meeting.isActive ? "border-l-4 border-indigo-500" : ""
                  } bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {meeting.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {meeting.time} · {meeting.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{meeting.participants}</span>
                      </div>
                      {meeting.isActive && (
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div
            className="flex-1 p-8 overflow-y-auto"
            style={{ paddingTop: showWelcomeBanner ? "5rem" : "2rem" }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-200">
              <div className="flex items-center mb-6">
                <div className="mr-4 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full transition-colors">
                  <Video className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Welcome, {userEmail}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ready for your next virtual meeting?
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Clock,
                    title: "Start Instant Meeting",
                    description: "Quick and easy video call",
                    color:
                      "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
                  },
                  {
                    icon: Calendar,
                    title: "Schedule Meeting",
                    description: "Plan your next collaboration",
                    color:
                      "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
                  },
                  {
                    icon: FileText,
                    title: "Meeting Notes",
                    description: "Collaborate and track progress",
                    color:
                      "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg hover:shadow-md transition-all cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-4 transition-colors`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Activity Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      action: "attended",
                      meeting: "Weekly Project Review",
                      time: "2 hours ago",
                    },
                    {
                      action: "created",
                      meeting: "Client Presentation",
                      time: "Yesterday",
                    },
                    {
                      action: "shared",
                      meeting: "Design Discussion Notes",
                      time: "3 days ago",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border-b border-gray-100 dark:border-gray-700"
                    >
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You{" "}
                        <span className="font-medium">{activity.action}</span>{" "}
                        {activity.meeting}{" "}
                        <span className="text-gray-400">{activity.time}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}