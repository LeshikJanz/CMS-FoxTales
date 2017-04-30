import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const userData = {
      firstName: 'Patrick',
      lastName: 'Simmons',
      role: 'ADMIN',
      enabled: true,
      email: 'patrick@gopro.com',
      phone: '985-438-7340',
      client: 'GoPro',
      location: '744 Nicholas Trail Apt. 181',
      lastActive: new Date()
    };

    const user = new User(userData);

    Object.keys(user).forEach((key: string) => {
      expect(user[key]).toEqual(userData[key]);
    });
  });
});
