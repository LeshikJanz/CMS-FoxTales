/**
 * Permissions interface
 */
export interface IPermissions {
  userId: number;
  clientId: number;
  roles: string[];
  rolesId: string[];
  globalAccess: boolean;
  isClientAdmin: boolean;
  isUser: boolean;
  permissionMatrix: IPermissionMatrixItem[];
}

export interface IPermissionMatrixItem {
  operationId: number;
  operationName: string;
}
