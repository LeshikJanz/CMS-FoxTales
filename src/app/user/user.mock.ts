import { IUser } from './user.interface';

export const MOCK_USERS: IUser[] = [
  {
    id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
    clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
    firstName: 'Karri',
    lastName: 'Manns',
    email: 'karri@milk.com',
    phone: '425-651-7131',
    roles: [{
      id: '7658c8c0-f047-4a5b-862c-f15aebd926b1',
      name: 'MANAGER'
    }],
    isActive: true,
    location: '850 Main Street Seattle, WA 98109',
    lastActive: 'Sun Apr 30 2017 14:08:22 GMT+0300 (+03)'
  },
  {
    id: '6a6d87ca-9719-40b8-a473-53e6ae65dbec',
    clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
    firstName: 'Mark',
    lastName: 'Torres',
    email: 'mark@derecognizer.com',
    phone: '213-208-3941',
    roles: [{
      id: '7658c8c0-f047-4a5b-862c-f15aebd926b1',
      name: 'MANAGER'
    }],
    isActive: true,
    location: '1141 Cherry Ridge Drive Southfield, MI 48034',
    lastActive: 'Thu May 14 2016 12:22:02 GMT+0300 (+03)'
  },
  {
    id: '6ccca3fb-086e-41ed-92bb-9540b7085f03',
    clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
    firstName: 'Nicholas',
    lastName: 'Spencer',
    email: 'nick@facebook.com',
    phone: '135-878-9845',
    roles: [{
      id: '7658c8c0-f047-4a5b-862c-f15aebd926b1',
      name: 'MANAGER'
    }],
    isActive: false,
    location: '1457 Rosewood Lane Gardena, CA 90247',
    lastActive: 'Mon Jun 21 2016 14:01:17 GMT+0300 (+03)'
  }
];

export const MOCK_USER: IUser = {
  id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
  clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
  firstName: 'Karri',
  lastName: 'Manns',
  email: 'karri@milk.com',
  phone: '425-651-7131',
  roles: [{
    id: '7658c8c0-f047-4a5b-862c-f15aebd926b1',
    name: 'MANAGER'
  }],
  isActive: true,
  location: '850 Main Street Seattle, WA 98109',
  lastActive: 'Sun Apr 30 2017 14:08:22 GMT+0300 (+03)'
};
