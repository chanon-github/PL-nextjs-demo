import { MenuProps } from 'antd';

export const RoleUserAccessMenu = (data: MenuProps['items']) => {
  let roleId: number = 0;
  let getMe: any = undefined;
  let arr: MenuProps['items'] = [];
  if (typeof window !== 'undefined') {
    getMe = localStorage.getItem('getMe');
    if (getMe) {
      roleId = JSON.parse(getMe).UserRole[0].roleId;
    }
  }
  switch (roleId) {
    case 1: // superAdmin
      arr = data;
      break;
    case 2: // admin
      arr = data;
      break;
    case 3: // user
      arr = data?.filter((item: any) => !['/user-management'].includes(item.key));
      break;
  }
  return arr;
};
