import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { loadMatrixState, saveMatrixState, loadUser, saveUser } from './services/storageService';
import { MatrixTable } from './components/MatrixTable';
import { Shield, User as UserIcon, LogOut, Info } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    const savedData = loadMatrixState();
    const savedUser = loadUser();
    setData(savedData);
    setUser(savedUser);
    setLoading(false);
  }, []);

  // Handle cell toggle
  const handleToggle = (id: string) => {
    if (user?.role !== UserRole.ADMIN) return;
    
    const newData = { ...data, [id]: !data[id] };
    setData(newData);
    saveMatrixState(newData);
  };

  // Login handler
  const handleLogin = (role: UserRole) => {
    const newUser: User = {
      username: role === UserRole.ADMIN ? 'Administrator' : 'Guest Viewer',
      role
    };
    setUser(newUser);
    saveUser(newUser);
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    saveUser(null);
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Permissions Matrix</h1>
          <p className="text-gray-500 mb-8">Select a role to continue. Changes are persistent.</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLogin(UserRole.ADMIN)}
              className="w-full flex items-center justify-center gap-3 bg-custom-purple hover:bg-purple-700 text-white p-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              <Shield className="w-5 h-5" />
              <span>Login as Admin (Can Edit)</span>
            </button>
            
            <button
              onClick={() => handleLogin(UserRole.VIEWER)}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 p-4 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              <UserIcon className="w-5 h-5" />
              <span>Continue as Viewer (Read Only)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Visual Example (Color Codes + Symbols)</h1>
            <p className="text-sm text-gray-500 mt-1">
              Logged in as <span className="font-semibold text-custom-purple">{user.username}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {user.role === UserRole.ADMIN ? (
               <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                 <Shield className="w-3 h-3" /> Edit Mode Active
               </span>
            ) : (
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                 <Info className="w-3 h-3" /> Read Only Mode
               </span>
            )}
            
            <button 
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 hover:bg-red-50 px-3 py-2 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto">
          <MatrixTable 
            data={data}
            canEdit={user.role === UserRole.ADMIN}
            onToggle={handleToggle}
          />
          
          <div className="mt-8 text-sm text-gray-400 text-center">
            <p>Data is persisted automatically to local storage.</p>
            <p>Hex codes shown: #a3c293 (Active), #cccccc (Inactive)</p>
          </div>
        </div>
      </main>
    </div>
  );
}