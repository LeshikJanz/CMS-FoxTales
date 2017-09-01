/**
 * Client license interface
 */
export interface IClientLicense {
  id?: number;
  clientID?: number|string;
  licenseIdNumber: string;
  softwareLicenseTypeId: number;
  tierId: number;
  billingTypeId: number;
  startDate: string;
  numberOfMonths: number;
  autoRenew: boolean;
  hardwareLicenseTypeId: number;
  serialNumber: string;
  billingContactName: string;
  billingContactEmail: string;
  billingContactPhone: string;
  billingContactAddress: string;
}

/**
 * Client license type interface
 */
export interface IClientLicenseType {
  id: number;
  name: string;
}

/**
 * Client license tier interface
 */
export interface IClientLicenseTier {
  id: number;
  name: string;
}

/**
 * Client license billing interface
 */
export interface IClientLicenseBilling {
  id: number;
  name: string;
}

/**
 * Client license hardware interface
 */
export interface IClientLicenseHardware {
  id: number;
  name: string;
}
