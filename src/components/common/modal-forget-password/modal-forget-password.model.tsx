/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ModalForgetPassword - Model
 */
import { ModalProps } from 'antd';
import { Dispatch, SetStateAction } from "react";

export namespace ModalForgetPasswordProps {
  export interface Main extends ModalProps {
    //
    setIsShowModal?: Dispatch<SetStateAction<boolean>>;
  }
}


export interface FormItem{
  email: string;
  password: string;
  confirmPassword: string;
}