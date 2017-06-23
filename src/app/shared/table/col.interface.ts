/**
 * Table column interface
 */
export interface ICol {
  id: string;
  title: string;
  sort?: boolean;
  isSearchOpen?: boolean;
  searchable?: boolean;
  format?: string;
  formatOptions?: string[];
  notSortable?: boolean;
}
