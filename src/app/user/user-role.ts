import { IUserRole } from './user-role.interface';

/**
 * Role entity
 */
export class UserRole implements IUserRole {
  /**
   * Id
   *
   * @type {string}
   */
  public id: string;

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
