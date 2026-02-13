import React from 'react';
import { Check, X } from 'lucide-react';

interface MatrixCellProps {
  id: string;
  isActive: boolean;
  onToggle: (id: string) => void;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({ id, isActive, onToggle }) => {
  return (
    <td 
      onClick={() => onToggle(id)}
      className="border-r border-b border-gray-300 p-4 text-center align-middle cursor-pointer hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex flex-col items-center justify-center">
        {isActive ? (
          <Check className="w-8 h-8 text-custom-purple font-bold stroke-[3]" />
        ) : (
          <X className="w-8 h-8 text-custom-purple font-bold stroke-[3]" />
        )}
      </div>
    </td>
  );
};