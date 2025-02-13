/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  Login - Container
 */
import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { NextPageWithLayout } from '@/pages/_app';
import type { LoginContentProps, LoginContainerProps, LoginForm } from './index.model';

const LoginListContainer: NextPageWithLayout<LoginContainerProps> = ( props: LoginContainerProps ): ReactElement => {
  /** Hook section */
    const Router = useRouter(); 
 

    useEffect(() => {
      Router.push('/vehicle-group');
    },[])
  /** Functionality section */

  const onFinish = async (value: LoginForm) => {
    
  }
  const onFinishFailed = (errorInfo: any) => {

  };

  const handleCloseModal = () => {
    

  };

  const onClickCloseModalForgetPassword = () => {

  }

  const onClickOpenModalForgetPassword = () =>{

  }

  const contentProps: LoginContentProps = {
    onFinish,
    onFinishFailed
  };

  const onClickMicrosoft = () => {
 
  }

  return (
    <div>
       
    </div>
  );
}

LoginListContainer.getLayout = (page: ReactElement) => (
  <>
      { page }
  </> 
)

export default LoginListContainer;