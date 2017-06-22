import { IUser } from './user.interface';
import { IUserRole } from './user-role.interface';

/**
 * User entity
 */
export class User implements IUser {
  /**
   * Id
   *
   * @type {string}
   */
  public id?: string;

  /**
   * AD Id
   *
   * @type {string}
   */
  public userADId?: string;

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
  public firstName?: string;

  /**
   * Last name
   *
   * @type {string}
   */
  public lastName?: string;

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
  public phone?: string;

  /**
   * Roles
   *
   * @type {IUserRole[]}
   */
  public roles?: any[];

  /**
   * Is user active?
   *
   * @type {boolean}
   */
  public isActive?: boolean;

  /**
   * Location
   *
   * @type {string}
   */
  public location?: string;

  /**
   * Last active date
   *
   * @type {string}
   */
  public lastActiveDate?: string;

  /**
   * Client access
   *
   * @type {string}
   */
  public selectedClientAccess?: string;

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
