/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  HeaderModalPl - Main
 */

import {
  type FC,
  type ReactElement,
  useEffect
} from 'react';

import type { HeaderModalPlProps } from './header-modal-pl.model';
import { Col, Row } from 'antd';

// import {} from './header-modal-pl.presets';

const HeaderModalPlMain: FC<HeaderModalPlProps.Main> = (props: HeaderModalPlProps.Main): ReactElement => {
  /** Hook section */

  useEffect(() => {}, []);

  /** Functionality section */

  const onClickModal = () => {
    props.onClickClosModal();
  }

  return (
    <Row align={'middle'} justify={'space-between'}>
      <Col>
        {/* <img 
          src='/static/images/logo-pl-car-rental.png' 
          style={{ width: '60%', height: '60%', objectFit: 'cover' }} 
        /> */}
      </Col>
      <Col className='font-light text-[20px] cursor-pointer' onClick={onClickModal}>
        X
      </Col>
    </Row>
  );
}

export default HeaderModalPlMain;