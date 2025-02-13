import { BarChartOutlined, UserAddOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

export const menus: MenuProps['items'] = [
  {
    label: <span className="text-[16px]">{'แดชบอร์ด'}</span>,
    key: '/dashboard',
    icon: <BarChartOutlined />,
  },
  // {
  //   label: <span className="text-[16px]">{'บันทึกการใช้งานอุปกรณ์'}</span>,
  //   key: '/device-histories',
  //   icon: <DesktopOutlined />,
  // },
  {
    label: <span className="text-[16px]">{'จัดการผู้ใช้งาน'}</span>,
    key: '/user-management',
    icon: <UserAddOutlined />,
  },
];

export const MenuUrls = {
  VehicleMaster:{
    Url:'/master-vehicle'
  },
  VehicleItem:{
    Url:'/vehicle-item'
  },
  VehicleType:{
    Url:'/vehicle-type'
  },
  VehicleBrand:{
    Url:'/vehicle-brand'
  },
  VehicleModel:{
    Url:'/vehicle-model'
  },
  VehicleColor:{
    Url:'/vehicle-color'
  },
  Product:{
    Url:'/master-product',
    EditCarStock:{
      Url:'/edit-car-stock'
    },
    EditCarProduct:{
      Url:'/edit-car-product'
    }
  },
  ProductOption:{
    Url:'/product-option'
  },
  MasterVehicleGroup:{
    Url:'/vehicle-group',
    EditVehicleGroup:{
      Url:'/edit-group'
    }
  },
  ThemeManagement:{
    Url:'/theme-management'
  },
}
