import { IUser } from './user.interface';

/**
 * User entity
 */
export class User implements IUser {
  /**
   * Id
   *
   * @type {string}
   */
  public id: string;

  /**
   * First name
   *
   * @type {string}
   */
  public firstName: string;

  /**
   * Last name
   *
   * @type {string}
   */
  public lastName: string;

  /**
   * Role
   *
   * @type {string}
   */
  public role: string;

  /**
   * Is user enabled?
   *
   * @type {boolean}
   */
  public enabled: boolean;

  /**
   * Email
   *
   * @type {string}
   */
  public email: string;

  /**
   * Phone number
   *
   * @type {string}
   */
  public phone: string;

  /**
   * Client organization
   *
   * @type {string}
   */
  public client: string;

  /**
   * Location
   *
   * @type {string}
   */
  public location: string;

  /**
   * Last active date
   *
   * @type {string}
   */
  public lastActive: string;

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
