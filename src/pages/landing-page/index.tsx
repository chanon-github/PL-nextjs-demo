/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  LandingPage - Container
 */

import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MenuUrls } from '@/utils/constants/menu';
//import { APP_NAME } from 'src/environments';
import { useSelector , useDispatch} from 'react-redux';
import { RootState } from '@/utils/store';
import { setSystemSelected } from '@/utils/reducers/userActions';
import { CarOutlined, DatabaseOutlined, SettingOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css'; // Make sure you have Tailwind CSS set up
import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Checkbox,
    Radio,
    Input,
    Tooltip,
    Popconfirm,
    Space,
    Table as AntTable,
    Form,
    Layout
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import useApi from '@/hooks/api/use-api';

import { LandingPageContentProps, LandingPageContainerProps,SystemName } from './index.model';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '@/utils/type/jwt-type';
import { LayoutBody,} from '@/components/layout';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
const LandingPageListContainer: NextPageWithLayout<LandingPageContainerProps> = ( props: LandingPageContainerProps ): ReactElement => {
  /** Hook section */
 const Router = useRouter();
 const userData = useSelector((state: RootState) => state.user.userData); // Access user data from Redux
 const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
 const [userDisplayName, setUserDisplayName] = useState<string>();
 const nameUser = userData?.name;
 const dispatch = useDispatch();
 const screen = useBreakpoint();
  //** Hook for call api Example
  // const { data: stocksData, loading: loadingStocks, error: stocksError, execute: fetchStocks, refetch } = 
  // useApi<IGetActiveStockForEIpoResultBaseOutput, StockApiStockGetActiveStockForEIpoPostRequest>(
  //     stockapi, "stockGetActiveStockForEIpoPost",
  // );
  useEffect(() => {
    // const decodedToken = jwtDecode(cookies.accessToken) as UserToken; 
    // setUserDisplayName(decodedToken.nameid || 'unknow');
    // console.log("decodedToken",decodedToken)
    setUserDisplayName("User Name");
  }, []);

  
  /** Functionality section */

  const onClickSystemCard = (sysName: string) => {
    switch (sysName) {
      case SystemName.CAR_RENTAL:

      dispatch(setSystemSelected(SystemName.CAR_RENTAL)); // Set the decoded token data in Redux store

        Router.push(MenuUrls.VehicleMaster.Url);
        break;
      case SystemName.MASTER_CENTRAL:

      dispatch(setSystemSelected(SystemName.MASTER_CENTRAL))
      Router.push(MenuUrls.VehicleMaster.Url);

        break;
      case SystemName.SYSTEM_ADMIN:
        dispatch(setSystemSelected(SystemName.SYSTEM_ADMIN))
        Router.push(MenuUrls.VehicleMaster.Url);

        break;
      default:
        break;
    }
  };
   

    const contentProps: LandingPageContentProps = {
   
        nameUser,
        userDisplayName,
        screen,
        onClickSystemCard
    };

  
    return (<>
    {renderView(contentProps)}
    </>) 
    
}
const renderView = (props: LandingPageContentProps): ReactElement => {
  return (
    <Layout className='h-screen'>
      <Layout.Header className='bg-white shadow-lg px-20 '>
        <Row gutter={[8, 8]} justify={'space-between'} align={'middle'}>
          <Col className='text-pl-primary text-[27px] xs:text-[15px] font-bold'>
            Admin Portal
          </Col>
          <Col className='text-[21px]'>
            {props.userDisplayName}
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content className='bg-gradient-to-r from-[#6DC067] to-[#467B42] w-full h-full overflow-y-auto lg:overflow-y-hidden xl:overflow-y-hidden   p-20'>
        <Row gutter={[8, 8]} justify={'center'} align={'middle'}>
          <Col span={24} className='text-[27px] xl:text-[47px] lg:text-[47px] text-white  flex justify-center text-center' >
            Welcome, {props.userDisplayName}
          </Col>
          <Col span={24} className='flex justify-center text-white text-[27px] text-center'>
            Manage your dashboard and keep things running smoothly
          </Col>
          <Col span={24} className='mt-10'>
            <Row gutter={[0, 0]} justify={'center'}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card
                  style={{ 
                    borderRadius: 0,
                    padding: 20,
                    border: 0
                  }}
                  className='h-full transition-colors duration-300 hover:bg-[#313332] group cursor-pointer'
                  onClick={() => { props.onClickSystemCard(SystemName.CAR_RENTAL) }} 
                >
                  <Row gutter={[8, 8]} justify={'center'} align={'middle'}>
                    <Col>
                      <img src='assets/images/car-rental.png'  className='w-[90%]'/>
                    </Col>
                    <Col span={24} className='text-[27px] flex justify-center text-center group-hover:text-white transition-colors duration-300'>
                      CAR RENTAL
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                <Card
                  style={{ 
                    borderRadius: 0,
                    padding: 20,
                    border: 0
                  }}
                  className='h-full transition-colors duration-300 hover:bg-[#313332] group cursor-pointer'
                  onClick={() => { props.onClickSystemCard(SystemName.MASTER_CENTRAL) }} 
                >
                  <Row gutter={[8, 8]} justify={'center'} align={'middle'}>
                    <Col >
                      <img src='assets/images/master-car-rental.png'  className='w-[90%]'/>
                    </Col>
                    <Col span={24} className='text-[27px] flex justify-center text-center group-hover:text-white transition-colors duration-300'>
                      MASTER CENTRAL
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card

                  style={{ 
                    borderRadius: 0,
                    padding: 20,
                    border: 0
                  }}
                  className='h-full transition-colors duration-300 hover:bg-[#313332] group cursor-pointer' 
                  onClick={() => { props.onClickSystemCard(SystemName.SYSTEM_ADMIN) }} 
                >
                  <Row gutter={[8, 8]} justify={'center'} align={'middle'}>
                    <Col>
                      <img src='assets/images/system-admin.png' className='w-[80%]'/>
                    </Col>
                    <Col span={24} className='text-[27px] flex justify-center text-center group-hover:text-white transition-colors duration-300'>
                      System Admin
                    </Col>
                  </Row>      
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer className='bg-gradient-to-r from-[#6DC067] to-[#467B42] '>
        <Row justify={'space-between'} align={'middle'}>
          <Col className='text-white'>
            Release Version 1.0
          </Col>
          <Col>
            <Row align={'middle'}>
              <Col className='text-white'>
                Powered By
              </Col>
              <Col>
                <img src='assets/images/pl-logo.png' />
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Footer>
    </Layout>
   
//     <div className="min-h-screen flex flex-col bg-grey-100">
//       {/* Top Navbar */}
//       <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
//         <div className="text-2xl font-bold text-pl-primary">ADMIN PORTAL</div>
//         <div className="text-gray-700">{props.userDisplayName||'Unknown'}</div>
//       </nav>

//       <div className="flex flex-col items-center justify-center mt-12">
//   <h1 className="text-4xl font-semibold text-gray-800 mb-10">Welcome, {props.userDisplayName || 'Unknown'}</h1>

//   {/* Dashboard Cards */}
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"> {/* Adjusted max-width to increase size */}
    
//     {/* Job Open Card */}
//     <Card 
//       hoverable 
//       className="shadow-lg flex items-center justify-center flex-col p-10 md:p-12 lg:p-16" 
//       onClick={() => { props.onClickSystemCard(SystemName.CAR_RENTAL) }} 
//       style={{ height: '300px' }} // Fixed card height
//     >
//       <img src="assets/images/admin-carrental-logo.png" alt="Hiring" className="w-32 h-28 mb-6 mx-auto" /> {/* Increased image size */}
//       <h3 className="text-2xl font-medium text-gray-800 text-center">CAR RENTAL</h3> {/* Increased text size */}
//     </Card>

//     {/* Interviews Card */}
//     <Card 
//       hoverable 
//       className="shadow-lg flex items-center justify-center flex-col p-10 md:p-12 lg:p-16" 
//       onClick={() => { props.onClickSystemCard(SystemName.MASTER_CENTRAL) }} 
//       style={{ height: '300px' }} // Fixed card height
//     >
//       <img src="assets/images/admin-master-central-logo.png" alt="Hiring" className="w-32 h-28 mb-6 mx-auto" /> {/* Increased image size */}
//       <h3 className="text-2xl font-medium text-gray-800 text-center">MASTER CENTRAL</h3> {/* Increased text size */}
//     </Card>

//     {/* Hiring Card */}
//     <Card 
//       hoverable 
//       className="shadow-lg flex items-center justify-center flex-col p-10 md:p-12 lg:p-16" 
//       onClick={() => { props.onClickSystemCard(SystemName.SYSTEM_ADMIN) }} 
//       style={{ height: '300px' }} // Fixed card height
//     >
//       <img src="assets/images/admin-system-logo.png" alt="Hiring" className="w-32 h-28 mb-6 mx-auto" /> {/* Increased image size */}
//       <h3 className="text-2xl font-medium text-gray-800 text-center">SYSTEM ADMIN</h3> {/* Increased text size */}
//     </Card>
//   </div>
// </div>

//       {/* Spacer to push footer down */}
//       <div className="flex-grow"></div>

//       {/* Footer - Sticks to bottom of the screen */}
//       <footer className="w-full py-4 mt-auto">
// <div className="flex justify-between items-center w-full mx-auto px-5">
//   <div className="text-gray-500">Release Version 1.0</div>
  
//   {/* Group "Powered By" and the logo closer together */}
//   <div className="flex items-center space-x-2">
//     <div className="text-gray-500">Powered By</div>
//     <img src="assets/images/phatra-logo.png" alt="Powered By Logo" className="w-20" />
//   </div>
// </div>
// </footer>
//     </div>
  );
  
  // return (
  //   <div className="relative min-h-screen flex flex-col items-center justify-center">
  //     {/* Background Image with Blur */}
  //     <div
  //       className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-lg z-0"
  //       style={{
  //         backgroundImage: `url('/images/bg-admin-login4.jpg')`, // Ensure the path is correct
  //         filter: 'blur(5px)', // Extra blur effect
  //       }}
  //     ></div>

  //     {/* Foreground Content */}
  //     <div className="relative z-10 w-full max-w-md px-4">
  //       {/* <h1 className="text-3xl font-bold mb-10 text-white text-center">Admin Portal</h1> */}

  //       {/* Portal Options */}
  //       <div className="grid grid-cols-1 gap-6">
  //         {/* Car Rental Card */}
  //         <Card
  //         hoverable
  //         className="rounded-[40px] shadow-lg bg-gradient-to-r from-green-300 to-green-400 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-green-400"
  //         onClick={() => alert('Go to Car Rental')}
  //       >
  //         <div className="flex justify-center items-center h-full">
  //           <img
  //             src="/images/Admin-Carrental.png"
  //             alt="Car Rental"
  //             className="h-full w-full object-contain rounded-[40px] transition duration-500 hover:opacity-90" // Ensures full image display with 50px radius and hover effects
  //           />
  //         </div>
  //       </Card>

  //       {/* Master Central Card */}
  //         <Card
  //           hoverable
  //           className="rounded-[40px] shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-blue-500"
  //           onClick={() => alert('Go to Master Central')}
  //           // style={{width:'400px'}}
  //         >
  //           <div className="flex justify-center items-center h-full">
  //             <img
  //               src="/images/Admin-Master.png"
  //               alt="Master Central"
  //               className="h-full object-contain rounded-[40px] transition duration-500 hover:opacity-90" // Ensures full image display with 50px radius and hover effects
  //             />
  //           </div>
  //         </Card>

  //           {/* System Admin Card */}
  //           <Card
  //             hoverable
  //             className="rounded-[40px] shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-teal-500"
  //             onClick={() => alert('Go to System Admin')}
  //             // style={{width:'500px'}}
  //           >
  //             <div className="flex justify-center items-center h-full">
  //               <img
  //                 src="/images/Admin-System.png"
  //                 alt="System Admin"
  //                 className="h-full  object-contain rounded-[40px] transition duration-500 hover:opacity-90" // Ensures full image display with 50px radius and hover effects
  //               />
  //             </div>
  //           </Card>
  //       </div>
  //     </div>
  //   </div>
  // );

  // return (
  //      <div className="relative min-h-screen flex flex-col items-center justify-center">
  //       {/* Background Image with Blur */}
  //       <div
  //         className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-lg z-0"
  //         // style={{
  //         //   backgroundImage: `url('/images/bg-admin-login4.jpg')`, // Ensure the path is correct
  //         //   filter: 'blur(5px)', // Extra blur effect
  //         // }}
  //       ></div>
    
  //       {/* Foreground Content */}
  //       <div className="relative z-10 w-full max-w-5xl px-4">
  //         {/* Horizontal Flexbox for Cards */}
  //         <div className="flex flex-wrap justify-center space-x-6">
  //           {/* Car Rental Card */}
  //           <Card
  //             hoverable
  //             className="rounded-[40px] shadow-lg bg-gradient-to-r from-green-300 to-green-400 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-green-400"
  //             onClick={() => alert('Go to Car Rental')}
  //             style={{ width: '450px' }} // Adjust the card width
  //           >
  //             <div className="flex justify-center items-center h-full">
  //               <img
  //                 src="/images/Admin-Carrental.png"
  //                 alt="Car Rental"
  //                 className="h-full w-full object-contain rounded-[40px] transition duration-500 hover:opacity-90" // Ensures full image display with 50px radius and hover effects
  //               />
  //             </div>
  //           </Card>
    
  //           {/* Master Central Card */}
  //           <Card
  //             hoverable
  //             className="rounded-[40px] shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-blue-500"
  //             onClick={() => alert('Go to Master Central')}
  //             style={{ width: '450px' }} // Adjust the card width
  //           >
  //             <div className="flex justify-center items-center h-full">
  //               <img
  //                 src="/images/Admin-Master.png"
  //                 alt="Master Central"
  //                 className="h-full object-contain rounded-[40px] transition duration-500 hover:opacity-90" // Ensures full image display with 50px radius and hover effects
  //               />
  //             </div>
  //           </Card>
    
  //           {/* System Admin Card */}
  //           <Card
  //             hoverable
  //             className="rounded-[40px] mt-8 shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-teal-500"
  //             onClick={() => alert('Go to System Admin')}
  //             style={{ width: '450px' }} // Adjust the card width
  //           >
  //             <div className="flex justify-center items-center h-full">
  //               <img
  //                 src="/images/Admin-System.png"
  //                 alt="System Admin"
  //                 className="h-full object-contain rounded-[40px] transition duration-500 hover:opacity-90" // Ensures full image display with 50px radius and hover effects
  //               />
  //             </div>
  //           </Card>
  //         </div>
  //       </div>
  //     </div>
  //   );
}





LandingPageListContainer.getLayout = (page: ReactElement) => (
  <>
      { page }
  </> 
)

export default LandingPageListContainer;