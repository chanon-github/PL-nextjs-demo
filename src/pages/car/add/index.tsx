/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  Car - Container
 */

import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Modal,
    InputNumber,
    Checkbox,
    Radio,
    Input,
    Form,
    Tooltip,
    Popconfirm,
    Space,
    Table as AntTable
} from 'antd';
import React from 'react';
import {useEffect, useState} from 'react';
import type {ReactElement} from 'react';
import { useRouter } from 'next/router';
import { CrudMode } from "@/utils/type/crud-types";


import type { CarCrudContentProps, CarCrudContainerProps, CarCrudContentForm } from './index.model';

const CarCrudContainer = ( props: CarCrudContainerProps ): ReactElement => {
  /** Hook section */

    const Router = useRouter();
    const [ mode, setMode ] = useState<CrudMode>('add');
    const [ antdForm ] = Form.useForm<CarCrudContentForm>();
    const [ id, setId ] = useState<number>(-1);

    useEffect(() => {
        if(Router.isReady) {
            switch(Router.route){
                case '/car/add': {
                    setMode('add'); 
                    break
                };
                case '/car/edit/[id]': {
                    setMode('edit'); 
                    antdForm.setFieldsValue({});
                    setIdFromPath();
                    break
                };
                case '/car/view/[id]': {
                    setMode('view'); 
                    setIdFromPath();
                    break;
                }
                default: setMode('add');
            }
        }
    }, [ Router.isReady, Router.route ]);

    /** Functionality section */

    const setIdFromPath = () =>{
        const { id } = Router.query as { id: string; };
        const _id = Number.parseInt(id);
        if(_id && !Number.isNaN(_id)) {
            setId(_id);
        }
    }

    const onSubmitForm = (value: CarCrudContentForm) =>{

    }


    const onClickBack = () =>{
        Router.back();
    }
  

    const contentProps: CarCrudContentProps = {
        mode,
        onSubmitForm,
        onClickBack
    };

  return (
    <Row gutter={[ 8, 16 ]}>
        <Col span={24}>
            <Card  
                className={'shadow-effect'} 
                title={<Typography.Title type={'secondary'} level={3}>test</Typography.Title>}
                headStyle={{ padding: 24 }}
                bodyStyle={{ padding: 24 }}
            >
                <Form
                    onFinish={onSubmitForm}
                    layout={'vertical'}
                    form={antdForm}
                >
                    
                </Form>
            </Card>
        </Col>
    </Row>
  );
}



export default CarCrudContainer;