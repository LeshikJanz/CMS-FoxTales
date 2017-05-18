/**
 * Client interface
 */
export interface IClient {
  id?: string;
  tenantId?: string;
  isActive?: boolean;
  logo?: string;
  logoBytes?: string;
  name: string;
  displayName: string;
  email: string;
  address: string;
  phone: string;
  city?: string;
  state?: string;
  freshBooks: string;
  socialAccounts: string[];
  selectedLicenses?: string[];
  tenant?: string;
  domain?: string;
  clientId?: string;
  clientSecret?: string;
  clientSecretValidTo?: string;
}

/**
 * Client list interface
 */
export interface IClientList {
  totalRowCount: number;
  currentPageNumber: number;
  numberRowsOnPage: number;
  result: IClient[];
  suscess: boolean;
  message: string;
}

/**
 * Client filter interface
 */
export interface IClientFilter {
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

/**
 * Client state interface
 */
export interface IActionState {
  id: number,
  action: string,
  callback?: string
}
