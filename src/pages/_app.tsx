import "../styles/css/globals.css"
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { INextHeadProps, NextHead   } from '../../src/components/layout/next-head';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { ConfigProvider, Layout, Space, Skeleton, MenuProps, Menu } from 'antd';
import { LayoutBody, LayoutHeader, LayoutSidebar } from '@/components/layout';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AntdConfigProviderMain from '@/styles/theme/antd-config-provider.main';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Sarabun ,Kanit} from 'next/font/google';
import store from '@/utils/store';
import { NextPage } from 'next';
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //ปิด Fetching ทั้งโปรเจค
      refetchInterval: false,
      refetchIntervalInBackground: false,
      //refetchOnMount :false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const sarabun = Kanit({
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-kanit',
  style: ['normal', 'italic'],
  subsets: ['thai'],
  preload: false, // Failed to compile.  nextJS v13.1.1
});
type MenuItem = Required<MenuProps>['items'][number];


const LayoutComponent = ({ Component, pageProps }: any) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const screen = useBreakpoint();
  const handleCollapMenu = () => {

    setCollapsed(!collapsed);
    dispatch({ type: 'TOGGLE_COLLAPSE' }); 
  };
  const getLayout = Component.getLayout ?? ((page: any) => (
      <Layout className="overflow-hidden h-screen">
        {
          !screen.xs && (
            <LayoutSidebar isCollapse={collapsed}/>
          )
        }
        {/* <LayoutSidebar isCollapse={collapsed}/> */}
   
        <Layout>
          <LayoutHeader  setIsCollapse={handleCollapMenu} isCollapse={collapsed}/>
          {/* <LayoutHeader  /> */}
          <LayoutBody>
          
            { page }
          </LayoutBody>
         
        </Layout>
      </Layout>
  ));
  return getLayout(<Component { ...pageProps } />);
}


export default function App({ Component, pageProps: { session, ...pageProps } }:  AppPropsWithLayout) {
  // const dispatch = useDispatch();
  // const handleCollapMenu = () => {
  //   // setIsCollapse(!isCollapse);
  //   dispatch({ type: 'TOGGLE_COLLAPSE' }); // set state toggle boolean is collapsed
  // };

 

  const getNextHeadProps: INextHeadProps.Main =
    Component.getNextHeadProps && Object.keys(Component.getNextHeadProps || {}).length > 0
      ? Component.getNextHeadProps
      : { title: `Undefinded` };

  return (
    <main className={sarabun.className}>
       <style jsx global>{`
        :root {
          --font-kanit: ${sarabun.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}> 
        <AntdConfigProviderMain>
          <NextHead {...getNextHeadProps} />
          <Provider store={store}>
            <SessionProvider session={session}>
              <LayoutComponent Component={Component} pageProps={pageProps} />
            </SessionProvider>
          </Provider>
        </AntdConfigProviderMain>
      </QueryClientProvider>
    </main>
    
  )
}

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout<any> };
export type NextPageWithLayout<TypeDef> = NextPage<TypeDef> & NextAppExtProps;

export interface NextAppExtProps {
  getLayout?: (page: ReactElement) => ReactNode;
  getNextHeadProps?: INextHeadProps.Main;
}

