import React from 'react';
import { DATA_COLUMNS, INITIAL_ROWS } from '../constants';
import { MatrixCell } from './MatrixCell';

interface MatrixTableProps {
  data: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export const MatrixTable: React.FC<MatrixTableProps> = ({ data, onToggle }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300 bg-white">
      <table className="w-full border-collapse min-w-[1000px]">
        <thead>
          {/* Header Row 1 */}
          <tr className="bg-gray-100">
            <th className="border-r border-b border-gray-300 p-2 w-32 bg-gray-50"></th>
            <th className="border-r border-b border-gray-300 p-2 w-48 bg-white"></th>
            
            <th colSpan={4} className="border-r border-b border-gray-300 p-3 text-left font-bold text-gray-800 bg-gray-200/50">
              Single Dealer
            </th>
            <th colSpan={4} className="border-b border-gray-300 p-3 text-left font-bold text-gray-800 bg-gray-200/50">
              Multi-Dealer
            </th>
          </tr>

          {/* Header Row 2 */}
          <tr className="bg-white">
            <th className="border-r border-b border-gray-300 p-2"></th>
            <th className="border-r border-b border-gray-300 p-3 text-left font-normal text-gray-600 align-top">
              User Type
            </th>
            {DATA_COLUMNS.map((col, idx) => (
              <th 
                key={idx}
                className={`
                  border-b border-gray-300 p-3 text-left font-normal text-gray-600 align-top w-28
                  ${idx < 7 ? 'border-r' : ''}
                `}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INITIAL_ROWS.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50/30">
              {/* Category Column (Grouped) */}
              {row.isCategoryStart && (
                <td 
                  rowSpan={row.rowSpan || 1}
                  className="border-r border-b border-gray-300 p-3 font-bold text-gray-800 align-top bg-white"
                >
                  {row.category}
                </td>
              )}

              {/* Sub-Category Column */}
              <td className="border-r border-b border-gray-300 p-3 text-gray-700 align-top bg-white">
                {row.subCategory}
              </td>

              {/* Data Columns */}
              {Array.from({ length: 8 }).map((_, colIndex) => {
                const cellId = `${row.id}-col-${colIndex}`;
                return (
                  <MatrixCell
                    key={cellId}
                    id={cellId}
                    isActive={!!data[cellId]}
                    onToggle={onToggle}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};