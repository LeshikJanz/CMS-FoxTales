import { IClientLicense } from './client-license.interface';

/**
 * Client license entity
 */
export class ClientLicense implements IClientLicense {
  /**
   * Id
   *
   * @type {string}
   */
  public id: string;

  /**
   * Client name
   *
   * @type {string}
   */
  public name: string;

  /**
   * Is checked?
   *
   * @type {boolean}
   */
  public checked?: boolean;

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
