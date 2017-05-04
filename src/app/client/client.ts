import { IClient, IClientLicense } from './client.interface';

/**
 * Client entity
 */
export class Client implements IClient {
  /**
   * Id
   *
   * @type {string}
   */
  public id: string;

  /**
   * Logo url
   *
   * @type {string}
   */
  public logo: string;

  /**
   * Client name
   *
   * @type {string}
   */
  public name: string;

  /**
   * Email
   *
   * @type {string}
   */
  public email: string;

  /**
   * Address
   *
   * @type {string}
   */
  public address: string;

  /**
   * Phone number
   *
   * @type {string}
   */
  public phone: string;

  /**
   * City
   *
   * @type {string}
   */
  public city: string;

  /**
   * State
   *
   * @type {string}
   */
  public state: string;

  /**
   * Freshbook url
   *
   * @type {string}
   */
  public freshBookUrl: string;

  /**
   * Social accounts
   *
   * @type {string[]}
   */
  public socialAccounts: string[];

  /**
   * Licenses
   *
   * @type {IClientLicense[]}
   */
  public licenses: IClientLicense[];

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
