/**
 * Table column interface
 */
export interface ICol {
  id: string;
  title: string;
  sort?: boolean;
  searchable?: boolean;
  format?: string;
  formatOptions?: string[];
}
