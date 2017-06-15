/**
 * Device interface
 */
export interface IDevice {
  id?: number;
  hubId?: number;
  purchaseDate?: string;
  productId?: number;
  clientId: number;
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
  result: IDevice[];
  suscess: boolean;
  message: string;
}
