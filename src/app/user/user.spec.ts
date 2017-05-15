import { User } from './user';
import { MOCK_USER } from './user.mock';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const user = new User(MOCK_USER);

    Object.keys(user).forEach((key: string) => {
      expect(user[key]).toEqual(MOCK_USER[key]);
    });
  });
});
