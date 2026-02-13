import { MatrixRow } from './types';

// The 8 data columns headers
export const DATA_COLUMNS = [
  // Single Dealer Group
  "Initial Account Set Up",
  "Initial T&Cs",
  "Updated T&Cs",
  "At Check Out T&Cs",
  // Multi Dealer Group
  "Account Set Up",
  "T&Cs",
  "Updated T&Cs",
  "At Check Out T&Cs"
];

// Definition of the table rows based on the image
export const INITIAL_ROWS: MatrixRow[] = [
  {
    id: 'dealer-new',
    category: 'Dealer Sponsored',
    subCategory: 'New Users',
    rowSpan: 2,
    isCategoryStart: true,
    initialValues: [true, true, true, true, true, true, true, true]
  },
  {
    id: 'dealer-legacy',
    category: 'Dealer Sponsored',
    subCategory: 'Legacy/Existing Users',
    isCategoryStart: false,
    initialValues: [false, false, false, false, false, false, false, false]
  },
  {
    id: 'electronic-fleet',
    category: 'Electronic Orders',
    subCategory: 'Fleet Customers/Impex',
    rowSpan: 1,
    isCategoryStart: true,
    initialValues: [true, true, false, true, true, false, true, false]
  },
  {
    id: 'registered-guest',
    category: 'Registered',
    subCategory: 'Guest Shopper',
    rowSpan: 1,
    isCategoryStart: true,
    initialValues: [false, true, true, false, false, true, true, true]
  },
  {
    id: 'anonymous-guest',
    category: 'Anonymous',
    subCategory: 'Guest Shopper',
    rowSpan: 1,
    isCategoryStart: true,
    initialValues: [false, false, false, false, false, false, false, false]
  }
];

export const STORAGE_KEY_DATA = 'dealer_matrix_data_v1';