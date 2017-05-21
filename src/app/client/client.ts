import { IClient } from './client.interface';

/**
 * Client entity
 */
export class Client implements IClient {
  /**
   * Id
   *
   * @type {string}
   */
  public id?: string;

  /**
   * Tenant id
   *
   * @type {string}
   */
  public tenantId?: string;

  /**
   * Is active?
   *
   * @type {boolean}
   */
  public isActive?: boolean;

  /**
   * Logo url
   *
   * @type {string}
   */
  public logo?: string;

  /**
   * Logo bytes
   *
   * @type {string}
   */
  public logoBytes?: string;

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
  public city?: string;

  /**
   * State
   *
   * @type {string}
   */
  public state?: string;

  /**
   * Freshbook url
   *
   * @type {string}
   */
  public freshBooks: string;

  /**
   * Social accounts
   *
   * @type {string[]}
   */
  public socialAccounts: string[];

  /**
   * Licenses
   *
   * @type {string[]}
   */
  public selectedLicenses?: string[];

  /**
   * Tenant
   *
   * @type {string}
   */
  public tenant?: string;

  /**
   * Domain
   *
   * @type {string}
   */
  public domain?: string;

  /**
   * Client id
   *
   * @type {string}
   */
  public clientId?: string;

  /**
   * Client secret
   *
   * @type {string}
   */
  public clientSecret?: string;

  /**
   * Client secret valid date
   *
   * @type {string}
   */
  public clientSecretValidTo?: string;

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
