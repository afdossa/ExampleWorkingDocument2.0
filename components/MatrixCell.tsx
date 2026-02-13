import React from 'react';
import { Check, X } from 'lucide-react';

interface MatrixCellProps {
  id: string;
  isActive: boolean;
  canEdit: boolean;
  onToggle: (id: string) => void;
}

export const MatrixCell: React.FC<MatrixCellProps> = ({ id, isActive, canEdit, onToggle }) => {
  return (
    <td 
      onClick={() => canEdit && onToggle(id)}
      className={`
        border-r border-b border-gray-300 p-4 text-center align-middle
        ${canEdit ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'}
        transition-colors duration-200
      `}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        {isActive ? (
          <Check className="w-8 h-8 text-custom-purple font-bold stroke-[3]" />
        ) : (
          <X className="w-8 h-8 text-custom-purple font-bold stroke-[3]" />
        )}
        
        <span className="text-sm font-mono text-gray-500 block">
          {isActive ? '#a3c293' : '#cccccc'}
        </span>
      </div>
    </td>
  );
};