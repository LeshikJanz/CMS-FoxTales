/**
 * Client interface
 */
export interface IClient {
  id: string;
  logo: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  freshBookUrl: string;
  socialAccounts: string[];
  licenses: IClientLicense[];
}

/**
 * Client license interface
 */
export interface IClientLicense {
  id: string;
  name: string;
}
