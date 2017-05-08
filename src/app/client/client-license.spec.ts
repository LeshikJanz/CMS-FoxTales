import { ClientLicense } from './client-license';
import { MOCK_CLIENT_LICENSE } from './client-license.mock';

describe('ClientLicense', () => {
  it('should create an instance', () => {
    expect(new ClientLicense()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const license = new ClientLicense(MOCK_CLIENT_LICENSE);

    Object.keys(license).forEach((key: string) => {
      expect(license[key]).toEqual(MOCK_CLIENT_LICENSE[key]);
    });
  });
});
