/**
 * User interface
 */
export interface IUser {
  id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: IUserRole[];
  isActive: boolean;
  location: string;
  lastActive: string;
}

/**
 * User role interface
 */
export interface IUserRole {
  id: string;
  name: string;
}
