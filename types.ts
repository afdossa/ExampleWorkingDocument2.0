export interface CellState {
  id: string;
  isActive: boolean; // true = check/green, false = x/gray
}

export interface MatrixRow {
  id: string;
  category: string;
  subCategory: string;
  rowSpan?: number; // For the first column grouping
  isCategoryStart?: boolean; // To know if we render the first column
  initialValues: boolean[]; // Default state for the 8 columns
}

export enum UserRole {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER'
}

export interface User {
  username: string;
  role: UserRole;
}