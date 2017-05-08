import { IUser, IUserList, IUserFilter } from './user.interface';

export const MOCK_USERS_FILTER: IUserFilter = {
  pageingInfo: {
    currentPage: 0,
    pageRowCount: 10
  },
  currentFilter: 1,
  currentSortType: 'name',
  isAscendantSort: true
};

export const MOCK_USERS: IUserList = {
  totalRowCount: 3,
  currentPageNumber: 0,
  numberRowsOnPage: 3,
  suscess: true,
  message: 'OK',
  result: [
    {
      id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
      userADId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
      clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
      clientName: 'Microsoft',
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
      lastActiveDate: 'Sun Apr 30 2017 14:08:22 GMT+0300 (+03)',
      selectedClientAccess: '1'
    },
    {
      id: '6a6d87ca-9719-40b8-a473-53e6ae65dbec',
      userADId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
      clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
      clientName: 'Microsoft',
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
      lastActiveDate: 'Thu May 14 2016 12:22:02 GMT+0300 (+03)',
      selectedClientAccess: '1'
    },
    {
      id: '6ccca3fb-086e-41ed-92bb-9540b7085f03',
      userADId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
      clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
      clientName: 'Microsoft',
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
      lastActiveDate: 'Mon Jun 21 2016 14:01:17 GMT+0300 (+03)',
      selectedClientAccess: '1'
    }
  ]
};

export const MOCK_USER: IUser = {
  id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
  userADId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
  clientId: '6fe1bcb7-eecb-4b0a-9d18-1f8f7d122572',
  clientName: 'Microsoft',
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
  lastActiveDate: 'Sun Apr 30 2017 14:08:22 GMT+0300 (+03)',
  selectedClientAccess: '1'
};
