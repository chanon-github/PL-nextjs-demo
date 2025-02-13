// import { MenuProps } from 'antd';
export const menus: any  = [
    { name: 'Vehicle', menuId: 2, parrentId: null, url: null ,
      children: [
        { name: 'Vehicle Master', menuId: 11, parrentId: 2, url: '/master-vehicle' },
        { name: 'Vehicle Item', menuId: 12, parrentId: 2, url: '/vehicle-item' },
  
      ],
    },
  
    {
      
      name: 'Master Vehicle',
      menuId: 1,
      parrentId: null,
      url: '/car',
      children: [
        { name: 'Vehicle Type', menuId: 7, parrentId: 1, url: '/vehicle-type' },
        { name: 'Vehicle Brand', menuId: 8, parrentId: 1, url: '/vehicle-brand' },
        { name: 'Vehicle Model', menuId: 9, parrentId: 1, url: '/vehicle-model' },
        { name: 'Vehicle Color', menuId: 10, parrentId: 1, url: '/vehicle-color' },
      ],
    },
    { name: 'Master Product', menuId: 13, parrentId: null, url: null ,
      children: [
        { name: 'Product', menuId: 14, parrentId: 13, url: '/master-product' },
        { name: 'Product Option', menuId: 15, parrentId: 13, url: '/product-option' },
  
      ],
    },
    { name: 'Master Vehicle Group', menuId: 16, parrentId: null, url: '/vehicle-group' ,
     
    },
    { name: 'Theme Management', menuId: 17, parrentId: null, url: '/theme-management' ,
     
    },
    { name: 'Master Fee Rate', menuId: 18, parrentId: null, url: '/master-fee-rate'  },
    { name: 'Tenant Management', menuId: 19, parrentId: null, url: '/tenant-management'  },
    { name: 'Branch Management', menuId: 20, parrentId: null, url: '/branch-management'  },
    { name: 'Master Consent', menuId: 21, parrentId: null, url: '/master-consent'  },
    // { name: 'Master Hotel', menuId: 17, parrentId: null, url: '/master-hotel'  },
    { name: 'Promotion Management', menuId: 23, parrentId: null, url: '/promotion-management' ,},
    { name: 'Package Management', menuId: 24, parrentId: null, url: '/master-package' ,},
    { name: 'User Management', menuId: 25, parrentId: null, url: '/user-management' ,},
    { name: 'Master Price Tier List', menuId: 26, parrentId: null, url: '/master-price-tier-list' ,},
    { name: 'Set up price', menuId: 27, parrentId: null, url: '/set-up-price' ,},
    { name: 'Role Management', menuId: 28, parrentId: null, url: '/role-management' ,},
    { name: 'Setting', menuId: 29, parrentId: null, url: '/master-sla' ,},
    { name: 'User Approval', menuId: 30, parrentId: null, url: '/user-approval' ,},
    { name: 'FAQ Management', menuId: 31, parrentId: null, url: '/faq-management' ,},
    { name: 'Booking Request', menuId: 32, parrentId: null, url: '/booking' ,},
  ];