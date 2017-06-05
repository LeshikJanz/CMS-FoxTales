/**
 * Profile interface
 */
export interface IProfile {
  id: number;
  location: string;
  clientId: number;
  clientName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastActiveDate: string;
  roles: IProfileRole[];
  profileImagePath: string;
  availableClientAccesses: any[];
  selectedClientAccess: number;
  availableIUserTypes: any[];
  selectedIUserTypes: number;
  isActive: boolean;
  userADId: string;
}

export interface IProfileRole {
  id: number;
  name: string;
}
