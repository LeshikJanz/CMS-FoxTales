import { IUserRole } from './user-role.interface';

/**
 * User interface
 */
export interface IUser {
  id?: string;
  userADId?: string;
  clientId: string;
  clientName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  roles?: IUserRole[];
  isActive?: boolean;
  location?: string;
  lastActiveDate?: string;
  selectedClientAccess?: string;
  profileImagePath?: string;
}

/**
 * User list interface
 */
export interface IUserList {
  totalRowCount: number;
  currentPageNumber: number;
  numberRowsOnPage: number;
  result: IUser[];
  suscess: boolean;
  message: string;
}

/**
 * User filter interface
 */
export interface IUserFilter {
  pageingInfo: {
    currentPage: number;
    pageRowCount: number;
  };
  currentFilter: number;
  currentSortType: string;
  isAscendantSort: boolean;
  searchFields?: {
    [index: string]: string;
  };
}
