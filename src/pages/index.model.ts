/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  Login - Model
 */

  export interface LoginContainerProps {}

  export interface LoginContentProps extends LoginState {
    onFinish: (value: LoginForm) => void;
    onFinishFailed:(value: LoginForm) => void;
  }

  export interface LoginState {
   
  }

  export interface LoginForm {
    email: string;
    password: string;
  }
