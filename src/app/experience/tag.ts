import { ITag } from './tag.interface';

/**
 * Tag entity
 */
export class Tag implements ITag {
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
   * Is brand?
   *
   * @type {boolean}
   */
  public isBrand: boolean;

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
