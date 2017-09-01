/**
 * Device interface
 */
export interface IDevice {
  id?: number;
  hubId?: number;
  purchaseDate?: string;
  productId?: number;
  clientId: any;
  locationId: number;
  name: string;
}

/**
 * Device list interface
 */
export interface IDeviceList {
  totalRowCount: number;
  currentPageNumber: number;
  numberRowsOnPage: number;
  result: any;
  suscess: boolean;
  message: string;
}

/**
 * Device filter interface
 */
export interface IDeviceFilter {
  id?: number;
  pageingInfo: {
    currentPage: number;
    pageRowCount: number;
  };
  currentSortType: number;
  isAscendantSort: boolean;
  searchFields?: {
    [index: string]: string;
  };
}

export interface IDeviceDetails {
  id: number;
  name: string;
  purchaseDate: string;
  appVersion: string;
  serialNumber: string;
  hardwareVersion: string;
  tabletModel: string;
  cameraModel: string;
  cameraFirmware: string;
  lighting: string;
}
