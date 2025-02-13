/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  Login - Container
 */
import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { APP_NAME } from '@/environments';
import { CustomButton } from '@/components/common/button/button';
import { ConfirmModal } from '@/components/common/confirm-modal/confirm-modal';
import {
    
    Button,
    Input,
    Form,
    Modal,
    Row
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import { ModalForgetPassword, HeaderModalPl } from '@/components/common';
import type { LoginContentProps, LoginContainerProps, LoginForm } from './index.model';
import { LockOutlined, MailOutlined,CloseOutlined} from '@ant-design/icons';
import { signIn, getSession, getProviders, signOut } from 'next-auth/react';

import useApi from '@/hooks/api/use-api';
import {  loginApi } from '@/services/central-api/index';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/utils/reducers/userActions'; // Import the action
import {jwtDecode} from 'jwt-decode';
import {notify} from '@/utils/functions/notification';

const LoginListContainer: NextPageWithLayout<LoginContainerProps> = ( props: LoginContainerProps ): ReactElement => {
  /** Hook section */
    const Router = useRouter();
    const dispatch = useDispatch();
    const resLogin = useApi(loginApi,loginApi.apiLoginLoginPost) 
    const [ mode, setMode ] = useState<'forgetPassword' | 'confirmNewPassword'>('forgetPassword');
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'externalSystem']);
    const [ isShowModal, setIsShowModal ] = useState(false);
     // State to control modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    // State to hold modal properties
    const [modalProps, setModalProps] = useState({
      title: 'email หรือ password ไม่ถูกต้อง!',
      icon: <CloseOutlined style={{ fontSize: '36px' }} />,
      cancelText: 'ปิด',
      iconBackgroundColor: 'bg-pl-red',
      onConfirm: null
    });

    useEffect(() => {
      // if(cookies.accessToken || cookies.refreshToken){
      //   Router.push('/landing-page');
      //   return 

      // }
    },[])
  /** Functionality section */

  const onFinish = async (value: LoginForm) => {

    console.log("login param here v.1 ==>>",value)

    notify({title: 'Login สำเร็จ', type: 'success'});
    Router.push('/landing-page');
    // resLogin.fetch({
    //   loginInput:{
    //     username:value.email,
    //     password:value.password
    //   }
    // }).then((res) => {
    //   console.log("login response:",res)
    //   if(res && res?.data){
    //     notify({title: 'Login สำเร็จ', type: 'success'});

    //     setCookie('accessToken', res?.data?.accessToken, {
    //       path: '/',
    //       sameSite: 'strict', // or 'Lax' or 'None'
    //       secure: true // Required if sameSite is 'None'
    //     });
        
    //     setCookie('refreshToken', res?.data?.refreshToken, {
    //       path: '/',
    //       sameSite: 'strict', // or 'Lax' or 'None'
    //       secure: true // Required if sameSite is 'None'
    //     });
    //     const decodedToken = jwtDecode(res?.data?.accessToken as string); // Decode the token to get user data
    //     console.log("decodedToken",decodedToken)
    //     if(decodedToken){
    //       /*dispatch(setUserData({
    //         name:decodedToken.nameid 
    //       })); // Set the decoded token data in Redux store*/
    //     }
  
    //     Router.push('/landing-page');
    //   }else{
    //     notify({title: 'Login ไม่สำเร็จ', type: 'error'});

    //   }

    // }).catch((err) => {
    //   notify({title: 'Login ไม่สำเร็จ', type: 'error'});
    // })

    // const res = await loginApi.apiLoginLoginPost( {loginInput:{
    //   username:value.email,
    //   password:value.password
    // }} )
    // console.log("login response:",res)
    // if(res && res?.data?.data){
    //   setCookie('accessToken', res?.data?.data.accessToken, {
    //     path: '/',
    //     sameSite: 'strict', // or 'Lax' or 'None'
    //     secure: true // Required if sameSite is 'None'
    //   });
      
    //   setCookie('refreshToken', res?.data?.data.refreshToken, {
    //     path: '/',
    //     sameSite: 'strict', // or 'Lax' or 'None'
    //     secure: true // Required if sameSite is 'None'
    //   });
    //   const decodedToken = jwtDecode(res?.data?.data?.accessToken as string); // Decode the token to get user data
    //   console.log("decodedToken",decodedToken)
    //   if(decodedToken){
    //     /*dispatch(setUserData({
    //       name:decodedToken.nameid 
    //     })); // Set the decoded token data in Redux store*/
    //   }

    //   Router.push('/landing-page');
    // }else{
    //   setModalVisible(true)
    // }
  }
  const onFinishFailed = (errorInfo: any) => {
    // when is validate here... //
    console.log('Failed:', errorInfo);
  };

  const handleCloseModal = () => {
    
    setModalVisible(false);
  };

  const onClickCloseModalForgetPassword = () => {
    setIsShowModal(false);
  }

  const onClickOpenModalForgetPassword = () =>{
    setIsShowModal(true);
  }

  const contentProps: LoginContentProps = {
    onFinish,
    onFinishFailed
  };

  const onClickMicrosoft = () => {
    setCookie('externalSystem', "azure", { 
      path: '/',
      maxAge: 86400
      // sameSite: 'strict',
      // secure: true 
    });
    signIn("azure-ad", { callbackUrl: "/" }, { prompt: "select_account" });
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
       {/* Left Section (70%) with Background Image - Hidden on mobile */}
       <div 
            className="hidden lg:block w-full lg:w-8/12 text-white p-8 bg-center bg-contain lg:bg-cover"
            style={{
              backgroundImage: "url('/assets/images/bg-admin-login.jpg')",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Content for large screens */}
        </div>

      {/* Right Section - Full width on mobile, narrower on iPad */}
      <div className="w-full lg:w-4/12 bg-white flex items-center justify-center p-8 min-h-screen lg:min-h-0">
        <div className="w-full md:max-w-md lg:max-w-xs">
          {/* Login with Microsoft */}
          <div className="flex justify-center mb-6">
            <Button className="w-3/4 mr-2" size="large" onClick={onClickMicrosoft}>
              <img src={'assets/images/microsoft-logo.png'} alt="Microsoft Login" className="inline-block mr-2 w-5" />
              Login with Microsoft
            </Button>
          </div>

          <div className="flex items-center justify-center my-4">
            <span className="w-full border-b border-gray-300"></span>
            <span className="px-3 text-gray-500">or</span>
            <span className="w-full border-b border-gray-300"></span>
          </div>

          {/* Ant Design Form */}
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-full"
          >
            {/* Email Field */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                // { 
                //   type: 'email', 
                //   message: 'The input is not valid E-mail!',
                // },
                // {
                //   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                //   message: 'Please enter a valid email address!',
                // },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            {/* Remember Me and Forgot Password */}
            {/* <Form.Item>
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <a href="#">Forgot your password?</a>
              </div>
            </Form.Item> */}

            {/* Login Button */}
            <Form.Item>
              <CustomButton 
                text="Login" 
                htmlType="submit"
                type="primary"  
                className="bg-pl-primary text-white w-full !important"
              />
            </Form.Item>

            {/* Register Link */}
            <div className="text-center">
              <a >Forgot your password?</a>
            </div>
          </Form>
        </div>
      </div>
      <ConfirmModal

          visible={modalVisible}
          title={modalProps.title}
          icon={modalProps.icon}
          cancelText={modalProps.cancelText}
          onCancel={handleCloseModal}
          iconBackgroundColor={modalProps.iconBackgroundColor}

        />
        <ModalForgetPassword
          setIsShowModal={setIsShowModal}
          open={isShowModal}
          title = {
            // <Row align={'middle'} justify={'space-between'}>
            //   <Col>
            //     <img 
            //       src='/static/images/logo-pl-car-rental.png' 
            //       style={{ width: '60%', height: '60%', objectFit: 'cover' }} 
            //     />
            //   </Col>
            //   <Col className='font-light text-[20px] cursor-pointer' onClick={onClickCloseModal}>
            //     X
            //   </Col>
            // </Row>
            <HeaderModalPl onClickClosModal={onClickCloseModalForgetPassword}/>
          }
          footer={null} 
          closable={false}
          centered={true}
        />
    </div>
  );
}

LoginListContainer.getLayout = (page: ReactElement) => (
  <>
      { page }
  </> 
)

export default LoginListContainer;