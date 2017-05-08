import { IClient, IClientList, IClientFilter } from './client.interface';

export const MOCK_CLIENTS_FILTER: IClientFilter = {
  pageingInfo: {
    currentPage: 0,
    pageRowCount: 10
  },
  currentFilter: 1,
  currentSortType: 'name',
  isAscendantSort: true
};

export const MOCK_CLIENTS: IClientList = {
  totalRowCount: 3,
  currentPageNumber: 0,
  numberRowsOnPage: 3,
  suscess: true,
  message: 'OK',
  result: [
    {
      id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
      tenantId: 'b2af1833-6494-422d-a76a-6b887ead290c',
      isActive: true,
      logo: 'http://placeholder.pics/svg/100/DEDEDE/555555/Logo',
      name: 'Air New Zealand',
      displayName: 'Air New Zealand',
      email: 'air@zealand.com',
      address: '850 Main Street Seattle, WA 98109',
      phone: '425-651-7131',
      city: 'Houston',
      state: 'TX',
      freshBooks: 'freshbooks/zootopia21083',
      socialAccounts: [
        'facebook.com/zootopia21083',
        'twitter.com/zootopia21083',
        'instagram.com/zootopia21083'
      ],
      selectedLicenses: [
        'a2896d75-9d9b-48ec-ac8b-03e4864d55ed',
        '681f2133-4c04-49de-9528-85df12dade4a',
        'ca1b0e56-24ea-482f-9d97-50c63175c0b0'
      ],
      tenant: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
      domain: 'client',
      clientId: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
      clientSecret: 'votRG16WIGK',
      clientSecretValidTo: '2017-05-07T10:04:22.367Z'
    },
    {
      id: 'be7c2346-036e-43f3-9b6e-b6ad2602eb7c',
      tenantId: 'b2af1833-6494-422d-a76a-6b887ead290c',
      isActive: true,
      logo: 'http://placeholder.pics/svg/100/DEDEDE/555555/Logo',
      name: 'Chokolate Milk',
      displayName: 'Chokolate Milk',
      email: 'milk@chokolate.com',
      address: '4270 Sand Fork Road Elkhart, IN 46516',
      phone: '574-606-3647',
      city: 'Houston',
      state: 'TX',
      freshBooks: 'freshbooks/milk1337',
      socialAccounts: [
        'facebook.com/milk1337',
        'twitter.com/milk1337',
        'instagram.com/milk1337'
      ],
      selectedLicenses: [
        'a2896d75-9d9b-48ec-ac8b-03e4864d55ed',
        '681f2133-4c04-49de-9528-85df12dade4a',
        'ca1b0e56-24ea-482f-9d97-50c63175c0b0'
      ],
      tenant: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
      domain: 'client',
      clientId: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
      clientSecret: 'votRG16WIGK',
      clientSecretValidTo: '2017-05-07T10:04:22.367Z'
    },
    {
      id: '6705a0f2-d3ef-463a-9d29-8ea8f9fea433',
      tenantId: 'b2af1833-6494-422d-a76a-6b887ead290c',
      isActive: true,
      logo: 'http://placeholder.pics/svg/100/DEDEDE/555555/Logo',
      name: 'GoPro',
      displayName: 'GoPro',
      email: 'go@pro.com',
      address: '642 Joanne Lane  Marlboro, MA 01752',
      phone: '978-498-0272',
      city: 'Houston',
      state: 'TX',
      freshBooks: 'freshbooks/gopro',
      socialAccounts: [
        'facebook.com/gopro',
        'twitter.com/gopro',
        'instagram.com/gopro'
      ],
      selectedLicenses: [
        'a2896d75-9d9b-48ec-ac8b-03e4864d55ed',
        '681f2133-4c04-49de-9528-85df12dade4a',
        'ca1b0e56-24ea-482f-9d97-50c63175c0b0'
      ],
      tenant: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
      domain: 'client',
      clientId: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
      clientSecret: 'votRG16WIGK',
      clientSecretValidTo: '2017-05-07T10:04:22.367Z'
    }
  ]
};

export const MOCK_CLIENT: IClient = {
  id: '2eb5c2ff-44f8-4664-8a67-458a39ff4e9d',
  tenantId: 'b2af1833-6494-422d-a76a-6b887ead290c',
  isActive: true,
  logo: 'http://placeholder.pics/svg/100/DEDEDE/555555/Logo',
  name: 'Air New Zealand',
  displayName: 'Air New Zealand',
  email: 'air@zealand.com',
  address: '850 Main Street Seattle, WA 98109',
  phone: '425-651-7131',
  city: 'Houston',
  state: 'TX',
  freshBooks: 'freshbooks/zootopia21083',
  socialAccounts: [
    'facebook.com/zootopia21083',
    'twitter.com/zootopia21083',
    'instagram.com/zootopia21083'
  ],
  selectedLicenses: [
    'a2896d75-9d9b-48ec-ac8b-03e4864d55ed',
    '681f2133-4c04-49de-9528-85df12dade4a',
    'ca1b0e56-24ea-482f-9d97-50c63175c0b0'
  ],
  tenant: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
  domain: 'client',
  clientId: 'd85131e4-1763-42d6-b9c7-b6bad64b3a51',
  clientSecret: 'votRG16WIGK',
  clientSecretValidTo: '2017-05-07T10:04:22.367Z'
};
