import { UserRole } from './user-role';
import { MOCK_USER_ROLE } from './user-role.mock';

describe('UserRole', () => {
  it('should create an instance', () => {
    expect(new UserRole()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const role = new UserRole(MOCK_USER_ROLE);

    Object.keys(role).forEach((key: string) => {
      expect(role[key]).toEqual(MOCK_USER_ROLE[key]);
    });
  });
});
