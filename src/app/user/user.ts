import { IUser, IUserRole } from './user.interface';

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
   * Client organization
   *
   * @type {string}
   */
  public clientId: string;

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
   * Roles
   *
   * @type {IUserRole[]}
   */
  public roles: IUserRole[];

  /**
   * Is user active?
   *
   * @type {boolean}
   */
  public isActive: boolean;

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
