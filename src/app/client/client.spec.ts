import { Client } from './client';
import { MOCK_CLIENT } from './client.mock';

describe('Client', () => {
  it('should create an instance', () => {
    expect(new Client()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const client = new Client(MOCK_CLIENT);

    Object.keys(client).forEach((key: string) => {
      expect(client[key]).toEqual(MOCK_CLIENT[key]);
    });
  });
});
