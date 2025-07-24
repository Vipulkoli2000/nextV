'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-full">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Welcome Back!
                </h3>
                <p className="text-sm text-gray-600">
                  You're successfully logged in to your dashboard.
                </p>
              </div>
            </div>

            {/* User Info Card */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Account Info
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Role:</span> {user.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">ID:</span> {user.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {user.role === 'admin' && (
                    <button 
                      onClick={() => router.push('/admin')}
                      className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition duration-200"
                    >
                      Admin Panel
                    </button>
                  )}
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition duration-200">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition duration-200">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Content Area */}
          <div className="mt-8">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-center py-8">
                  No recent activity to display.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
