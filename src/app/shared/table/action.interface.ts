/**
 * Table action interface
 */
export interface ITableAction {
  id?: number;
  title: string;
  callback?: string;
  acl?: string;
}
