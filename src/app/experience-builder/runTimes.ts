import { IRunTimes } from './runTimes.interface';

/**
 * Tag entity
 */
export class RunTimes implements IRunTimes {
  /**
   * Id
   *
   * @type {string}
   */
  public startMomentTime: any;

  /**
   * Name
   *
   * @type {string}
   */
  public startMomentDate: any;

  /**
   * Is brand?
   *
   * @type {boolean}
   */
  public endMomentTime: any;

  public endMomentDate: any;

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
