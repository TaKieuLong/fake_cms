import ROUTES from "../navigation/index.ts";

export const SuperAdminNav = [
  {
    item: ROUTES.HOME,
    children: undefined,
  },
  {
    item: ROUTES.MANAGER,
    children: [ROUTES.HOTEL, ROUTES.ROOM, ROUTES.ACCOUNT, ROUTES.BOOKING],
  },
  // {
  //   item: ROUTES.HISTORY,
  //   children: undefined,
  // },
  {
    item: ROUTES.CONFIG,
    children: [ROUTES.HOLIDAY, ROUTES.DISCOUNT],
  },
  {
    item: ROUTES.SETTING,
    children: [ROUTES.PROFILE],
  },
  {
    item: ROUTES.SIGN_OUT,
    children: undefined,
  },
];

export const AdmintNav = [
  {
    item: ROUTES.HOME,
    children: undefined,
  },
  {
    item: ROUTES.MANAGER,
    children: [ROUTES.HOTEL, ROUTES.ROOM, ROUTES.ACCOUNT, ROUTES.BOOKING],
  },
  {
    item: ROUTES.HISTORY,
    children: [ROUTES.INVOICE],
  },
  {
    item: ROUTES.SETTING,
    children: [ROUTES.PROFILE],
  },
  {
    item: ROUTES.SIGN_OUT,
    children: undefined,
  },
];

export const ReceptionistNav = [
  {
    item: ROUTES.HOME,
    children: undefined,
  },
  {
    item: ROUTES.MANAGER,
    children: [ROUTES.HOTEL, ROUTES.ROOM, ROUTES.BOOKING],
  },
  {
    item: ROUTES.HISTORY,
    children: [ROUTES.INVOICE, ROUTES.NOTI],
  },
  {
    item: ROUTES.SETTING,
    children: [ROUTES.PROFILE],
  },
  {
    item: ROUTES.SIGN_OUT,
    children: undefined,
  },
];
