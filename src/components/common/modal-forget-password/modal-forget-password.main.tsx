/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ModalForgetPassword - Main
 */

import {
  type FC,
  type ReactElement,
  useEffect,
  useState
} from 'react';
import { useRouter } from 'next/router';
import { Avatar, Button, Col, Dropdown, Layout, MenuProps, Row, Select, Space, Modal, Form, Input, Checkbox, notification } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { loginApi } from '@/services/central-api/index';
import useApi from '@/hooks/api/use-api';
import { useCookies } from 'react-cookie';
import { notify } from '@/utils/functions/notification';
import { HeaderModalPl } from '@/components/common';

import type { ModalForgetPasswordProps, FormItem } from './modal-forget-password.model';

// import {} from './modal-forget-password.presets';

const ModalForgetPasswordMain: FC<ModalForgetPasswordProps.Main> = (props: ModalForgetPasswordProps.Main): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  const [ antdForm ] = Form.useForm<FormItem>();
  const [ mode, setMode ] = useState<'forgetPassword' | 'confirmNewPassword'>('forgetPassword');

  const useForgetPasswordApi = useApi(
    loginApi,  loginApi.apiLoginForgetPasswordPost
  );
  const useResetPasswordApi = useApi(
    loginApi,  loginApi.apiLoginResetPasswordPost
  )

  useEffect(() => {}, []);

  /** Functionality section */

  const onClickSubmit = () =>{
    const formValue = antdForm.getFieldsValue();
    if(mode == "forgetPassword"){
      useForgetPasswordApi.fetch({
        forgetPasswordInput:{
          email: formValue.email
        }
      }).then((res) =>{
        if(res.data){
          notify({ title: 'ทำการ ส่งอีเมล สำเร็จ', type: 'success' });
          setMode('confirmNewPassword');
          return
        }
        notify({ title: 'ทำการ ส่งอีเมล ล้มเหลว', type: 'error' });
      }).catch((err) =>{
        notify({ title: 'ทำการ ส่งอีเมล ล้มเหลว', type: 'error' });
      })
      // setMode('confirmNewPassword');
    }
    else if(mode == "confirmNewPassword"){
      useResetPasswordApi.fetch({
        resetPasswordInput:{
          newPassword: formValue.password,
          token: "test"
        }
      }).then((res) =>{
        if(res.data){
          notify({ title: 'ทำการ ตั้งรหัสผ่านใหม่ สำเร็จ', type: 'success' });
          return
        }
        notify({ title: 'ทำการ ตั้งรหัสผ่านใหม่ ล้มเหลว', type: 'error' });
      }).catch((err) =>{
        notify({ title: 'ทำการ ตั้งรหัสผ่านใหม่ ล้มเหลว', type: 'error' });
      })
    }
  }
  return (
    <Modal
      {...props}
    >
      <Form
        layout='vertical'
        form={antdForm}
        onFinish={onClickSubmit}
      >
        <Row align={'middle'} gutter={[8, 8]}>
          {
            mode == 'forgetPassword' && (
              <>
                <Col span={24} className='flex justify-center text-[20px] font-semibold'> 
                  จำรหัสผ่านไม่ได้ ?
                </Col>     
                <Col span={24} >         
                  <div className='border-solid border-[1px] border-[#66B363] m-1'>
                  </div>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name = "email"
                    label={"อีเมล"}
                    rules={[
                      {required: true, message: 'กรุณากรอก อีเมล'},
                      {
                        type: 'email',
                        message: 'กรุณากรอก email ให้ถูกต้อง',
                      },
                    ]}
                  >
                    <Input className='w-full'/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button className='w-full button-green' htmlType='submit'>
                    ตั้งรหัสผ่านใหม่
                  </Button>
                </Col>
                {/* <Col span={24}>
                  <Row align={'middle'} justify={'center'} gutter={[8,8]}>
                    <Col>
                      กลับไปยัง
                    </Col>
                    <Col 
                      className='underline text-[#66B363] cursor-pointer' 
                      onClick={renderContentLogin}
                    >
                      เข้าสู่ระบบ
                    </Col>
                  </Row>
                </Col> */}
              </>
            )
          }
          {
            mode == 'confirmNewPassword' &&(
              <>
                <Col span={24} className='flex justify-center text-[20px] font-semibold'> 
                  ตั้งรหัสผ่านใหม่
                </Col>     
                <Col span={24} >         
                  <div className='border-solid border-[1px] border-[#66B363] m-1'>
                  </div>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name = "password"
                    label={"รหัสผ่าน"}
                    rules={[
                      {required: true, message: 'กรุณากรอก รหัสผ่าน'},
                    ]}
                  >
                    <Input.Password className='w-full'/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name = "confirmPassword"
                    label={"ยืนยันรหัสผ่าน"}
                    rules={[
                      {required: true, message: 'กรุณากรอก ยืนยันรหัสผ่าน'},
                      ({ getFieldValue })=>({
                          validator(_, value) {
                              // console.log(getFieldValue('password'));
                              if( getFieldValue('password') && (value !== getFieldValue('password'))  ){
                                  return Promise.reject(new Error('ยืนยันรหัสผ่าน ไม่ตรงกับ รหัสผ่าน'));
                              }
                              return Promise.resolve();
                          }
                      })
                    ]}
                  >
                    <Input.Password className='w-full'/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button className='w-full button-green' htmlType='submit' >
                    ยืนยันการตั้งรหัสผ่านใหม่
                  </Button>
                </Col>
                {/* <Col span={24}>
                  <Row align={'middle'} justify={'center'} gutter={[8,8]}>
                    <Col>
                      กลับไปยัง
                    </Col>
                    <Col 
                      className='underline text-[#66B363] cursor-pointer' 
                      onClick={renderContentLogin}
                    >
                      เข้าสู่ระบบ
                    </Col>
                  </Row>
                </Col> */}
              </>
            )
          }
        </Row>
      </Form>
    </Modal>
  );
}

export default ModalForgetPasswordMain;