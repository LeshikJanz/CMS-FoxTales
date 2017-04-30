import { IUser } from './user.interface';

export const MOCK_USERS: IUser[] = [
  {
    id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
    firstName: 'Karri',
    lastName: 'Manns',
    role: 'MANAGER',
    enabled: true,
    email: 'karri@milk.com',
    phone: '425-651-7131',
    client: 'Chocolate Milk',
    location: '850 Main Street Seattle, WA 98109',
    lastActive: 'Sun Apr 30 2017 14:08:22 GMT+0300 (+03)'
  },
  {
    id: '6a6d87ca-9719-40b8-a473-53e6ae65dbec',
    firstName: 'Mark',
    lastName: 'Torres',
    role: 'MANAGER',
    enabled: true,
    email: 'mark@derecognizer.com',
    phone: '213-208-3941',
    client: 'Derecognizer',
    location: '1141 Cherry Ridge Drive Southfield, MI 48034',
    lastActive: 'Thu May 14 2016 12:22:02 GMT+0300 (+03)'
  },
  {
    id: '6ccca3fb-086e-41ed-92bb-9540b7085f03',
    firstName: 'Nicholas',
    lastName: 'Spencer',
    role: 'MANAGER',
    enabled: false,
    email: 'nick@facebook.com',
    phone: '135-878-9845',
    client: 'Facebook',
    location: '1457 Rosewood Lane Gardena, CA 90247',
    lastActive: 'Mon Jun 21 2016 14:01:17 GMT+0300 (+03)'
  }
];

export const MOCK_USER: IUser = {
  id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
  firstName: 'Karri',
  lastName: 'Manns',
  role: 'MANAGER',
  enabled: true,
  email: 'karri@milk.com',
  phone: '425-651-7131',
  client: 'Chocolate Milk',
  location: '850 Main Street Seattle, WA 98109',
  lastActive: 'Sun Apr 30 2017 14:08:22 GMT+0300 (+03)'
};
