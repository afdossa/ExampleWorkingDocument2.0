import React, { useState, useEffect } from 'react';
import { loadMatrixState, saveMatrixState } from './services/storageService';
import { MatrixTable } from './components/MatrixTable';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    const savedData = loadMatrixState();
    setData(savedData);
    setLoading(false);
  }, []);

  // Handle cell toggle
  const handleToggle = (id: string) => {
    const newData = { ...data, [id]: !data[id] };
    setData(newData);
    saveMatrixState(newData);
  };

  // Reset to defaults
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all permissions to their default state?')) {
      localStorage.removeItem('dealer_matrix_data_v1');
      const defaults = loadMatrixState(); // Will load defaults since storage is cleared
      setData(defaults);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dealer Permissions Matrix</h1>
            <p className="text-sm text-gray-500 mt-1">
              Admin Mode • All changes are saved automatically
            </p>
          </div>
          
          <button 
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 transition-colors border border-gray-200"
          >
            <RotateCcw className="w-4 h-4" /> Reset to Defaults
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto">
          <MatrixTable 
            data={data}
            onToggle={handleToggle}
          />
          
          <div className="mt-8 text-sm text-gray-400 text-center flex flex-col gap-2">
            <p>Data persists locally on this device.</p>
          </div>
        </div>
      </main>
    </div>
  );
}