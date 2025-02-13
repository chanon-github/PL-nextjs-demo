// import { useEffect, useState, type FC, type ReactElement } from 'react';

// import { Layout, Menu, MenuProps } from 'antd';

// import Tooltip from 'antd/lib/tooltip';
// import { useRouter } from 'next/router';
// import { Constants, iconMenu } from '@/utils/constants-menu';

// import type { LayoutSidebarProps } from './layout-sidebar.model';
// const { SubMenu, Item } = Menu;

// const data = [
//   {
//     fileName: 'Vehicle',
//     id: 1,
//     parrentId: null,
//     url: '/car',
//     items: [
//       { fileName: 'Vehicle Type', id: 7, parrentId: 1, url: '/car' },
//       { fileName: 'Vehicle Brand', id: 8, parrentId: 1, url: '/test2' },
//       { fileName: 'Vehicle Model', id: 9, parrentId: 1, url: '/car/model' },
//       { fileName: 'Vehicle Color', id: 10, parrentId: 1, url: '/car/color' },
//     ],
//   },
//   { fileName: 'Master Vehicle', id: 2, parrentId: null, url: '/master-vehicle' },
//   {
//     fileName: 'Menu3',
//     id: 3,
//     parrentId: null,
//     url: '/menu3',
//     items: [
//       {
//         fileName: 'Submenu Test',
//         id: 4,
//         parrentId: 3,
//         url: '/menu3/submenu-test',
//         items: [{ fileName: 'Submenu 4.1', id: 5, parrentId: 4, url: '/menu3/submenu-4-1' }],
//       },
//       { fileName: 'Submenu', id: 6, parrentId: 3, url: '/menu3/submenu' },
//     ],
//   },
// ];

// interface MenuReactHtml extends ReactElement {
//   key: string;
//   url?: string;
// }

// const LayoutSidebarMain: FC<LayoutSidebarProps.Main> = (props: LayoutSidebarProps.Main): ReactElement => {
//   /** Hook section */
//   const router = useRouter();
//   const { query, pathname, isReady } = router;
//   const [selected, setSelected] = useState<string[]>([]);
//   const [openKeys, setOpenKeys] = useState<string[]>([]);

//   useEffect(() => {
//     if (pathname) {
//       findActiveMenu(router.pathname);
//     }
//   }, [pathname, isReady]);

//   useEffect(() => {
//     if (document) {
//       const height = (document?.getElementsByClassName('ant-layout-header')[0] as any)?.offsetHeight;
//     }
//   }, []);

//   const findActiveMenu = (pathname: any) => {
//     let url: string = '';
//     url = pathname || router.pathname;
//     const key = findActiveMenuNew(Constants.menus, url);
//     console.log('🚀 ~ findActiveMenu ~ key:', key);
//     if (key.openKeys === undefined) return;
//     setOpenKeys([key.openKeys]);
//     setSelected([key.selectedKey]);
//   };

//   const handleClick = (e: any) => {
//     setSelected([e.key]);
//     console.log(e.key)
//   };

//   const findActiveMenuNew = (menus: MenuReactHtml | MenuProps['items'], url: string, isSub: boolean = false): any => {
//     let activePath = {};
//     activePath = url === '/' ? { openKeys: 'KPI', selectedKey: 'PmsBe.Appraisals' } : { openKeys: undefined, selectedKey: undefined };
//     if (Array.isArray(menus)) {
//       menus.forEach((eachMenu: any) => {
//         eachMenu?.children?.forEach((eachChliden: any) => {
//           if (url.includes(eachChliden.link)) {
//             activePath = {
//               openKeys: eachMenu.key,
//               selectedKey: eachChliden.key,
//             };
//           }
//         });
//       });
//     }
//     return activePath;
//   };

//   const generateMenuItem = (): Array<ReactElement> => {
//     return CreateMenu(props.menus);
//   };

//   const handleChangeUrl = (e: any, url: string, show_new_tab: boolean): void => {
//     if (show_new_tab) {
//       window.open(url, '_blank');
//     } else {
//       router.push(url, undefined, { shallow: true });
//     }
//   };

//   const onOpenChange = (value: any) => {
//     setOpenKeys([value[1]]);
//   };

//   const CreateMenu = (menus: any = [], lv = 0) => {
//     // {CreateMenu(_menu.menus || _menu.subMenus, lv + 1)}
//     const _M = menus.map((_menu: any, idx: number) => {
//       const url = (_menu.link || '').trim();
//       const key = _menu.key; //`${lv}|${url || idx + lv}|${_menu.label}`;
//       const data_url = url || _menu.label;
//       const label = _menu.label;
//       const menuIcon: any = iconMenu[key];
//       const menuHidden = _menu.hidden;

//       if (_menu.children && _menu.children.length > 0) {
//         return (
//           <Menu.SubMenu
//             icon={menuIcon}
//             key={key}
//             title={GenerateMenuToolTip(label)}

//             // data-url={data_url}
//           >
//             {_menu.children.map((_menuItem: any, idx: number) => {
//               return (
//                 <Menu.Item
//                   //icon={_menuItem.icon}
//                   key={_menuItem.key}
//                   onClick={(e: any) => {
//                     handleChangeUrl(e, _menuItem.link, _menuItem.showNewTab);
//                   }}
//                 >
//                   {_menuItem.label}
//                 </Menu.Item>
//               );
//             })}
//           </Menu.SubMenu>
//         );
//       }
//       if (menuHidden) {
//         return null;
//       }
//       return (
//         <Menu.Item
//           key={key}
//           icon={menuIcon}
//           data-url={data_url}
//           //className={styles.menuStyle}
//         >
//           {label}
//         </Menu.Item>
//       );
//     });
//     return _M;
//   };
//   const GenerateMenuToolTip = (label: string = '') => {
//     return (
//       <Tooltip title={label} placement={'right'}>
//         <div
//           style={{
//             whiteSpace: 'nowrap',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//           }}
//         >
//           {label}
//         </div>
//       </Tooltip>
//     );
//   };


//   const recursiveMenu = (data: any[]): JSX.Element[] => {
//     return data.map(({ fileName,url, items = [], parrentId }) => {
//       console.log({ items, fileName, parrentId });
  
//       if (!items?.length) {
//         return <Item key={fileName + Math.random()} 
//         onClick={(e: any) => {
//           handleChangeUrl(e, url, false);
//         }}>{fileName}</Item>; 
//       }
  
//       return (
//         <SubMenu key={fileName + Math.random()} title={fileName}>
//           {recursiveMenu(items)}
//         </SubMenu>
//       );
//     });
//   };



//   return (
//     <Layout.Sider
//       width={240}
//       collapsible 
//       collapsed={props.isCollapse}
//       style={{ 
//         overflowY: 'scroll', 
//         scrollbarWidth: 'none',
        
//       }}
//       trigger={null}
//     >
//       <div className="h-[64px] text-center align-middle bg-[#001529]">ASP</div>
//        <Menu mode="inline" theme="dark"         
//        className="h-full shadow-md"
//        >{recursiveMenu(data)}</Menu>
//       {/* <Menu
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         mode="inline"
//         theme="dark"
//         inlineCollapsed={props.isCollapse}
//         // items={[{key: 'KPI', label: 'KPI', }, {key: "Test", label: "Test"}]}
//         onClick={handleClick}
//         className="h-full shadow-md"
        
//       >
//         {
//           [{key: 'KPI', label: 'KPI', url: "/car" }, {key: "Test", label: "Test", url: "/car"}].map((data) =>{
//             return(
//               <Menu.Item
//                 key={data.key}
//                 onClick={(e: any) => {
//                   handleChangeUrl(e, data.url, false);
//                 }}
//               >
//                 {data.label}
//               </Menu.Item>
//             )
//           })
//         }
//       </Menu> */}
//     </Layout.Sider>
//   );
// };

// export default LayoutSidebarMain;



//----New Side Menu----//

import { useEffect, useState, type FC, type ReactElement } from 'react';
import { Layout, Menu ,Button} from 'antd';
import { CaretDownOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image'; // Assuming you are using Next.js for optimized image loading

import { useRouter } from 'next/router';
// import { Avatar, Button, Col, Dropdown, Layout, MenuProps, Row, Select, Space } from 'antd';
import {  menuApi } from '@/services/central-api/index';
import useApi from '@/hooks/api/use-api';
import { GetMenuOutput } from '@/services/central-api/generated';
import { menus } from '@/utils/constants/menu-dashbord';
import { useLocation } from 'react-router-dom';

const { SubMenu, Item } = Menu;
interface MenuItem {
  name: string;
  url: string;
  children?: MenuItem[];
  menuId: number;
}
const LayoutSidebarMain: FC<any> = (props: any): ReactElement => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [tenantCode,setTenantCode] = useState("0002");
  const [branchCode,setBranchCode] = useState("00002");
  const fetchGetData = useApi(menuApi,menuApi.apiMenuGetGet)

  useEffect(()=>{
    fetchGetData.fetch({
      tenantCode:tenantCode,
      branchCode:branchCode,
      type:'CMS'
    })
  },[])
 
  
  const findActiveKeys = (url: string, menus: MenuItem[]): string[] => {
    for (const menu of menus) {
      if (url.startsWith(menu.url)) {
        return [menu.url];
      }
      if (menu.children) {
        const childKeys = findActiveKeys(url, menu.children);
        if (childKeys.length > 0) {
          return [menu.url, ...childKeys];
        }
      }
    }
    return [];
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const keys = findActiveKeys(url, menus);
      setSelectedKeys(keys);
    };

    // Initial setup
    handleRouteChange(router.pathname);

    // Listen to route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup the event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [menus, router]);

  const handleClick = (url: string | null | undefined) => {
    if (url) {
      router.push(url);
    }
  };
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys); // Set the open submenu
  };

  const recursiveMenu = (
    data: MenuItem[],
    handleClick: (url: string | null | undefined) => void
  ): React.ReactNode => {
    return data.map(({ name, url, children = [], menuId }) => {
      if (!children.length) {
        return (
          <Item key={url} onClick={() => handleClick(url)}>
            {name}
          </Item>
        );
      }
      return (
        <SubMenu key={menuId} title={name}>
          {recursiveMenu(children, handleClick)}
        </SubMenu>
      );
    });
  };
  

  return (
    <Layout.Sider 
      width={240}  
      collapsed={props.isCollapse} 
      className='h-screen'
      // style={{ height: `calc( 100vh - ${64}px )` }} 
      // className="custom-scrollbar"
    >
       {/* Header Section */}
       <div className="flex items-center justify-between h-[64px] pl-2 bg-[#f5f5f5]">
        <div className="text-xl font-bold text-pl-primary">ADMIN PORTAL</div>
        
      </div>
      <div className="custom-scrollbar" style={{ height: 'calc(100vh - 64px)' }}>
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={selectedKeys}
          
          // openKeys={openKeys}
          // onOpenChange={onOpenChange}
          className="h-full shadow-md custom-menu-light"
        >
          {recursiveMenu(menus, handleClick)}
        </Menu>
      </div>
      
    </Layout.Sider>
  );
};

export default LayoutSidebarMain;
