/**
 *  LayoutHeader - Main
 */

import { CaretDownOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, MenuProps, Row, Select, Space, Drawer, Menu } from 'antd';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import { version } from '../../../../package.json';
import { useEffect, useState, type FC, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
// import { NotificationsMenus } from 'src/components/common/dropdown/notification-dropdown';
import type { LayoutHeaderProps } from './layout-header.model';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { menus } from '@/utils/constants/menu-dashbord';
import {UserToken} from '@/utils/type/jwt-type';
import { GetMenuOutput } from '@/services/central-api/generated';
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';
// import {} from './layout-header.module.css';
const { SubMenu, Item } = Menu;
const { Header } = Layout;

const SubMenuComponent = () => {
  const Router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
 
  useEffect(() => {
    setIsClient(true);
    if(!cookies.accessToken || !cookies.refreshToken){
      // Router.replace('/');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && cookies.accessToken && cookies.refreshToken) {
  
      const decodedToken = jwtDecode(cookies.accessToken) as UserToken; 
      setUserDisplayName(decodedToken.nameid || 'unknow');
      // console.log("decodedToken",decodedToken)
      // if (userProfile !== null) {
      //   userProfile = JSON.parse(userProfile);
      //   const decodedToken = jwtDecode(res?.data?.accessToken as string); 
      //   if (userProfile !== null) {
      //     setUserDisplayName(userProfile);
      //   }
      // }
    }
  }, []);

  const onClickPage = (params: {url: string}) =>{
    Router.push(`${params.url}`);
  }

  const onClickLogout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    // Router.replace('/');
  }
  const menuItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <a onClick={onClickLogout} rel="noopener noreferrer">
          ออกจากระบบ
        </a>
      ),
      danger: true,
    },
  ];

  // if (accessToken === null) {
  //   return (
  //     <a
  //       href={process.env.NEXT_PUBLIC_OAUTH_AUTHORIZE_URL}
  //       className="text-[#000000] font-semibold text-[12px] mr-4 bg-white rounded-3xl p-2 pl-6 pr-6  "
  //     >
  //       Login
  //     </a>
  //   );
  // }

  return (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      placement="bottomLeft"
    >
      <Space className="text-pl-primary  mr-5">{`${userDisplayName}`}</Space>
    </Dropdown>
  );
};

const LayoutHeaderMain: FC<LayoutHeaderProps.Main> = (props: LayoutHeaderProps.Main): ReactElement => {
  /** Hook section */
  const router = useRouter();
  const [ isCollapse, setIsCollapse ] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { t, i18n, ready } = useTranslation();
  const screen = useBreakpoint();

  const onSelectLanguage = (lang: any) => {
    i18n.changeLanguage(lang);
  };
  const onClickShowDrawer = () =>{
    setIsCollapse(true)
  }

  const onClickCloseDrawer = () =>{
    setIsCollapse(false);
  }
  useEffect(() => {}, []);

  const handleClick = (url: string|null|undefined) => {
    if(url){

      setSelectedKeys([url]);
      router.push(url); 
    }else{
      // router.push(''); 

    }
    if(props.setIsCollapse){
      props.setIsCollapse();
    }
  };
  const recursiveMenu = (data: GetMenuOutput[]|null|undefined) => {
    console.log("data",data)
    if(data){
      return data.map(({ name, url, children = [], menuId }) => {
        if (!children?.length) {
          return (
            <Item
              key={url} 
              onClick={() => handleClick(url)} // No reload on click, just client-side routing
            >
              {name}
            </Item>
          );
        }
  
        return (
          <SubMenu key={menuId} title={name}>
            {recursiveMenu(children)}
          </SubMenu>
        );
      });
    }else{
      <div></div>
    }
  
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys); // Set the open submenu
  };

  return (
    <Header
      className="w-full overflow-hidden "
      style={{
        paddingInline: 0,
      }}
    >
      <Row
        align={'middle'}
        justify={'space-between'}
        className="align-middle text-center h-[inherit] bg-[#f5f5f5] border-bottom"
      >
        <Col className="h-[inherit] flex justify-center items-center space-x-2 p-4">
          {
            screen.xs && (
              <Button
                icon={<MenuOutlined style={{ backgroundColor: '#ffffff' }} />}
                className=" bg-white flex  items-center  justify-center"
                style={{ width: 32, height: 32 }}
                // onClick={props.setIsCollapse}
                onClick={props.setIsCollapse}
              />
            )
          }
          
        </Col>
        <Col>
          <Row gutter={[16, 0]}>
            <Col>
            </Col>
            <Col>
              <div>
                <Avatar
                  className="mr-2  bg-white border-2 border-pl-primary text-pl-primary"
                  shape="circle"
                  icon={<UserOutlined  />}
                  style={{ width: 30, height: 30 }}
                  alt="avatar"
                  //size={30}
                ></Avatar>
                <SubMenuComponent />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {
        screen.xs && (
          <Drawer
              title={
              <div className="text-2xl font-bold text-pl-primary">ADMIN PORTAL</div>
            }
            open={props.isCollapse}
            placement={'left'}
            onClose={props.setIsCollapse}
            closable={false}
            width={240}
          >
           <Menu
            mode="inline"
            theme="light"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            className="h-full shadow-md custom-menu-light-mobile"
          >
            {recursiveMenu(menus)}
          </Menu>
          </Drawer>
        )
      }
     
    </Header>
    
  );
};

export default LayoutHeaderMain;
