/**
 * Log interface
 */
export interface ILog {
  id?: string;
  logId?: string;
  logTime: Date;
  type: string;
  cpu: number;
  memory: number;
  temperature: number;
  internetStatus: number;
  connectionSpeed?: {
    upload: number;
    download: number;
  },
  errors?: any;
  virusCheck?: {
    scanTime: string;
    message: string;
  };
}
