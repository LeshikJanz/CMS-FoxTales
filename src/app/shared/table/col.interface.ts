/**
 * Table column interface
 */
export interface ICol {
  id: string;
  title: string;
  sort?: boolean;
  format?: string;
  formatOptions?: string[];
}
