import { IDevice } from './device.interface';

/**
 * Device entity
 */
export class Device implements IDevice {
  /**
   * Id
   *
   * @type {number}
   */
  public id?: number;

  /**
   * Hub Id
   *
   * @type {number}
   */
  public hubId?: number;

  /**
   * Purchase Date
   *
   * @type {string}
   */
  public purchaseDate?: string;

  /**
   * Product Id
   *
   * @type {number}
   */
  public productId: number;

  /**
   * Client Id
   *
   * @type {number}
   */
  public clientId: number;

  /**
   * Location Id
   *
   * @type {number}
   */
  public locationId: number;

  /**
   * Name
   *
   * @type {string}
   */
  public name: string;

  /**
   * Constructor
   *
   * @param {Object} values
   * @returns {void}
   */
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
