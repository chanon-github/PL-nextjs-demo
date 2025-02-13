/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ModalConfirmCrud - Main
 */

import {
  type FC,
  type ReactElement,
  useEffect
} from 'react';

import type { ModalConfirmCrudProps } from './modal-confirm-crud.model';
import { Button, Col, Modal, Row } from 'antd';
import { EditOutlined, InfoOutlined } from '@ant-design/icons';

// import {} from './modal-confirm-crud.presets';

const ModalConfirmCrudMain: FC<ModalConfirmCrudProps.Main> = (props: ModalConfirmCrudProps.Main): ReactElement => {
  /** Hook section */

  useEffect(() => {}, []);

  /** Functionality section */
  let textTitle = props.mode == "edit" ? `ยืนยันแก้ไขข้อมูล` : `ยืนยันลบข้อมูล ${props.rowSelectedTable.length} รายการ`;

  if(props.mode == "verify"){
    textTitle = "ยืนยันอนุมัติข้อมูล"
  }
  if(props.rowSelectedTable.length == 0 && props.mode == "add"){
    textTitle = "กรุณาเลือกรายการที่ต้องการลบ";
  }

  // console.log("props", props);
  return (
    <Modal
      open={props.isModalConfirmVisible}
      closable={false}
      footer={null}
      centered
      width={400}
      zIndex={99999}
      // className='absolute z-10'
    >
      <Row gutter={[ 8, 16 ]} justify={'center'} align={'middle'}>
        <Col span={24} className='flex justify-center'>
          {
            props.mode == "edit" ? (
              <EditOutlined style={{ fontSize: '36px' }} className='bg-pl-yellow text-white rounded-full p-4'/>
            ) : (
              <InfoOutlined style={{ fontSize: '36px' }} className='bg-pl-yellow text-white rounded-full p-4'/>
            )
          }
         
        </Col>
        <Col span={24} className='flex justify-center text-xl font-semibold'>
          {textTitle}
        </Col>
        <Col>
          <Button className='button-plain' onClick={props.onCloseModalConfirm}> {(props.rowSelectedTable.length == 0) && (props.mode !== "verify") ? 'ปิด' : 'ยกเลิก'}</Button>
        </Col>
        <Col hidden={(props.rowSelectedTable.length == 0) || props.mode == "edit"}>
          <Button 
            
            className={`button-error`}
            onClick={props.onClickConfirmDelete}
          >
           ลบ
          </Button>
        </Col>
        <Col hidden={!(props.mode == "edit")}>
          <Button 
            onClick={props.onClickConfirmEdit}
            className={`button-warning`}
          >
           แก้ไข
          </Button>
        </Col>
        <Col hidden={!(props.mode == "verify")}>
          <Button 
            onClick={props.onClickConfirmEdit}
            className={`button-warning`}
          >
           อนุมัติ
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}

export default ModalConfirmCrudMain;