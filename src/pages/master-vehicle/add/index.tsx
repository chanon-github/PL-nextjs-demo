/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterVehicle - Container
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
import useApi from '@/hooks/api/use-api';

import type { MasterVehicleCrudContentProps, MasterVehicleCrudContainerProps, MasterVehicleCrudContentForm } from './index.model';

const MasterVehicleCrudContainer = ( props: MasterVehicleCrudContainerProps ): ReactElement => {
  /** Hook section */

    const Router = useRouter();
    const [ mode, setMode ] = useState<CrudMode>('add');
    const [ antdForm ] = Form.useForm<MasterVehicleCrudContentForm>();
    const [ id, setId ] = useState<number>(-1);

     //** Hook for call api Example
    // const { data: stocksData, loading: loadingStocks, error: stocksError, execute: fetchStocks, refetch } = 
    // useApi<IGetActiveStockForEIpoResultBaseOutput, StockApiStockGetActiveStockForEIpoPostRequest>(
    //     stockapi, stockapi.stockGetActiveStockForEIpoPost,
    // );
    useEffect(() => {
        if(Router.isReady) {
            switch(Router.route){
                case '/master-vehicle/add': {
                    setMode('add'); 
                    break
                };
                case '/master-vehicle/edit/[id]': {
                    setMode('edit'); 
                    antdForm.setFieldsValue({});
                    setIdFromPath();
                    break
                };
                case '/master-vehicle/view/[id]': {
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

    const onSubmitForm = (value: MasterVehicleCrudContentForm) =>{

    }


    const onClickBack = () =>{
        Router.back();
    }
  

    const contentProps: MasterVehicleCrudContentProps = {
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



export default MasterVehicleCrudContainer;