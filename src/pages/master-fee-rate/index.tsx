/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterFeeRate - Container
 */

import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import { APP_NAME } from 'src/environments';
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
    Tag,
    Modal,
    Select,
    InputNumber,
    TablePaginationConfig
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import useApi from '@/hooks/api/use-api';
import {notify} from '@/utils/functions/notification';
import { feeRateApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
// import { CrtVehicle } from '@/services/central-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlMstFeeRate, FeeRateApiApiMasterFeeRateGetGetRequest, HotelApiApiMasterHotelGetGetRequest } from '@/services/central-api/generated';
import { ModalConfirmCrud } from '@/components/common';
import { constant } from 'lodash';
import { CustomButton } from '@/components/common/button/button';
import dayjs from 'dayjs';
import { EditOutlined, InfoOutlined } from '@ant-design/icons';
import { convertToFormattedNumeric } from '@/utils/functions/convert-numeric';
import type { MasterFeeRateContentProps, MasterFeeRateContainerProps, FormSearch, MasterFeeRateForm } from './index.model';


const MasterFeeRateListContainer: NextPageWithLayout<MasterFeeRateContainerProps> = ( props: MasterFeeRateContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterFeeRate, setisVisibleFormMasterFeeRate ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<MasterFeeRateForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);

  //** Hook for call api Example
  const useApiFeeRateGet = useApi(feeRateApi, feeRateApi.apiMasterFeeRateGetGet);
  const useApiFeeRateGetById = useApi(feeRateApi, feeRateApi.apiMasterFeeRateGetGet);
  const useApiFeeRateSave = useApi(feeRateApi, feeRateApi.apiMasterFeeRateSavePost);
  const useApiFeeRateDelete = useApi(feeRateApi, feeRateApi.apiMasterFeeRateDeleteDelete);

  useEffect(() => {
    
  }, []);

  
  /** Functionality section */
  useEffect(() => {
    feeRateApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
  }, []);

  /** Functionality section */

  
  const feeRateApiRefetch = async (params : FeeRateApiApiMasterFeeRateGetGetRequest ) =>{
    const value = formSearch.getFieldsValue();
    const res = await useApiFeeRateGet.fetch({...params, 
      branchCode: constantBranch.branchCode, 
      tenantCode: constantBranch.tenantCode,
      keyword: value.keyword,
      status: value.status
    });
    return res
  } 
 
  const onClickToAdd = () => {
    setMode("add");
    setisVisibleFormMasterFeeRate(true);
  }

  const onClickToEdit = async(param: {code: string}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setisVisibleFormMasterFeeRate(true);
    setCode(param.code);
    console.log('code==>>',param.code)
    useApiFeeRateGetById.fetch({
      code: param.code, 
      branchCode: constantBranch.branchCode, 
      tenantCode: constantBranch.tenantCode, 
      pageIndex: 1, 
      pageSize: 1
    }).then((res) => {
        antdForm.setFieldsValue({
          name:  res.items?.[0]?.name || undefined,
          amount:  res.items?.[0]?.amount || undefined,
          status:  res.items?.[0]?.status || undefined
        })
      });;
 
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    feeRateApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: MasterFeeRateForm) =>{
    setIsModalConfirmVisible(mode === 'edit');
    if(mode == 'add'){
      onClickConfirmEdit();
    }
    // setMode("edit")
  }
  const onCloseModalForm = () =>{
    setMode("add");
    antdForm.resetFields();
    setisVisibleFormMasterFeeRate(false);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CtlMstFeeRate> | SorterResult<CtlMstFeeRate>[],
    extra: TableCurrentDataSource<CtlMstFeeRate>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      feeRateApiRefetch({pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
      setPageIndex(pagination.current || 1);
      setPageSize(pagination.pageSize || 10);
     
    }
  }

  const onClickShowModalConfirm = () =>{
    setIsModalConfirmVisible(true);
  }
  const onCloseModalConfirm = () =>{
   
    setIsModalConfirmVisible(false);
  }

  const onClickConfirmEdit = () =>{
    const value = antdForm.getFieldsValue();
     useApiFeeRateSave.fetch({
       masterFeeRateInput: {
       code: mode === "edit" ? code : undefined,
       name: value.name,
       amount: value.amount,
       branchCode: constantBranch.branchCode,
       tenantCode: constantBranch.tenantCode,
       status: value.status
      }
    }).then((res) => {
      if(res.data){
        feeRateApiRefetch({
          pageIndex: pageIndex, 
          pageSize: pageSize, 
        });
        notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
        onCloseModalConfirm();
        onCloseModalForm();
      }
      else{
        notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
      }
    }).catch((err) => {
      notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
    })
    setisVisibleFormMasterFeeRate(false);
    antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    useApiFeeRateDelete.fetch({
      deleteInput: {
        codes: rowSelectedTable.map((code) => `${code}`),
        tenantCode: constantBranch.tenantCode,
        branchCode: constantBranch.branchCode
      }
    }).then((res) => {
      if(res.data){
        feeRateApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
        notify({title: 'ทำการ ลบ สำเร็จ', type: 'success'});
        setRowSelectedTable([]);
      }
      else{
        notify({title: 'ทำการ ลบ ไม่สำเร็จ', type: 'error'});
      }
      setIsModalConfirmVisible(false);
    }).catch((err) => {
      notify({title: 'ทำการ ลบ ไม่สำเร็จ', type: 'error'});
    })
  }

    const contentProps: MasterFeeRateContentProps = {
      pageIndex,
      pageSize,
      useApiFeeRateGet,
      rowSelectedTable,
      antdForm,
      formSearch,
      isVisibleFormMasterFeeRate,
      mode,
      isModalConfirmVisible,
      onChangeTable,
      onClickShowModalConfirm,
      onChangeRowSelection,
      onClickToEdit,
      onClikToView,
      onClickRemove,
      onClickToAdd,
      onSubmitSerach,
      onSubmitForm,
      onCloseModalForm,
      onClickClearForm,
      onCloseModalConfirm,
      onClickConfirmEdit,
      onClickConfirmDelete
    };

  return (
    <>
      <Row gutter={[ 8, 16 ]}>
        <Col span={24}>
          <Card  
            className={'shadow-effect'} 
            // title={
            //   renderOptions(contentProps)
            // }
            styles={{
              body:{
                padding: 24,
              },
              header:{
                padding: 24
              }
            }}

          >
            <Row gutter={[ 8, 8 ]}>
              <Col span={24}>
                  {renderOptions(contentProps)}
              </Col>
              <Col span={24} className='mt-4'>
                {renderOptionsAddAndRemove(contentProps)}
              </Col>
              <Col span={24} >
                  {/* {props.stockId !==  0  &&  renderTable(props)} */}
                {renderTable(contentProps)}
              </Col>
            </Row>
          </Card>
        </Col>
        {<ModalConfirmCrud 
          isModalConfirmVisible={isModalConfirmVisible}
          onCloseModalConfirm={onCloseModalConfirm}
          onClickConfirmEdit={onClickConfirmEdit}
          onClickConfirmDelete={onClickConfirmDelete}
          mode={mode}
          rowSelectedTable={rowSelectedTable}
        />}
      </Row>
     
      {/* {renderModalConfirm(contentProps)} */}
      {renderModalCRUDForm(contentProps)}
     
    </>
  );
}

const renderOptionsAddAndRemove = (props: MasterFeeRateContentProps): ReactElement => {
  return (
    <Row gutter={[ 8, 8 ]} justify={"start"} align={"middle"}>
      <Col >
        <Button className='button-primary' onClick={props.onClickToAdd}>เพิ่ม</Button>
      </Col>
      <Col>
        <Button className='button-error' onClick={props.onClickShowModalConfirm}>ลบ</Button>
      </Col>
      
    </Row>
  );
}
const renderOptions = (props: MasterFeeRateContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10}>
              <Form.Item
                name="keyword"
                label={"ชื่ออัตราค่าธรรมเนียม"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="status"
                label={"สถานะ"}
              >
              <Select
                options={[{label: "ใช้งาน", value: "active"}, {label: "ไม่ใช้งาน", value: "inactive"}]}
                // labelInValue={false}
              />
              </Form.Item>
            </Col>
            <Col span={24} >
              <Row gutter={[8,8]} justify={"center"} align={"middle"}>
                <Col >
                  <Button className='button-primary' htmlType='submit'>ค้นหา</Button>
                </Col>
                <Col>
                  <Button className='button-plain' onClick={props.onClickClearForm} >ล้างค่า</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      
      </Form>
    </>
  )
}

const renderTable = (props: MasterFeeRateContentProps): ReactElement => {
  return(
    <>
      <AntTable
        columns={
          [
            {
              key: "code",
              dataIndex: "no",
              title: "ลำดับ",                
              render: (_, __, idx) => (
                <Typography.Text>
                    { ((props.pageIndex - 1) * props.pageSize) + idx + 1 }
                </Typography.Text>
              )
            },
            {
              key: "name",
              dataIndex: "name",
              title: "ชื่ออัตราค่าธรรมเนียม",
              sorter: true,
            },
            {
              key: "amount",
              dataIndex: "amount",
              title: "จำนวน(บาท)",
              sorter: true,
              render: (_, record) =>{
                return convertToFormattedNumeric({value: record.amount,minFractionDigits: 2, maxFractionDigits: 2});
              }
            },
            {
              dataIndex: "status",
              title: "สถานะ",
              sorter: true,
              render: (_, record) => {
                return record.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน';
              }
            },
            {
              dataIndex: "updateTimestamp",
              title: "แก้ไขล่าสุด",
              render: (item) => 
                item ? dayjs(item).format('DD/MM/YYYY') : "-",
              sorter: true,
            },
            {
              key: "updateBy",
              dataIndex: "updateBy",
              title: "แก้ไขโดย",
              sorter: true,
            },
            {
              title: "แก้ไข",
              render: (_, record) => {
                return (
                  <Space>
                    <Button
                      type="default"
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => {
                        props.onClickToEdit({ code: record.code || "" });
                      }}
                    />
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'code'}
        dataSource = {props.useApiFeeRateGet.data?.items || []}
        loading = {props.useApiFeeRateGet.loading}
        size={'middle'}
        scroll={{ x: 'max-content' }}
        onChange = {props.onChangeTable}
        rowSelection = {{
            selectedRowKeys: props.rowSelectedTable,
            onChange: props.onChangeRowSelection,
        }}
        pagination={{
          current: props.pageIndex,
          pageSize: props.pageSize,
          total: props.useApiFeeRateGet.data?.totalItems,
          pageSizeOptions: [10, 15, 20, 50],
          // onChange: props.onChangePage,
          showSizeChanger: true,
          simple: true,
          showTotal: (total: number, range: [number, number]) =>  `รายการ ${range[0]}-${range[1]} จาก ${total}`,
        }}
      />
    </>
  )
}

const renderModalCRUDForm = (props: MasterFeeRateContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม Fee Rate" : "แก้ไข Fee Rate"}
          open={props.isVisibleFormMasterFeeRate}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          // zIndex={10}
          // width={1000}
        >
          <Form
            onFinish={props.onSubmitForm}
            form={props.antdForm}
            layout='vertical'
          >
            <Row gutter={[ 8, 8 ]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ชื่ออัตราค่าธรรมเนียม"
                  name = "name"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่ออัตราค่าธรรมเนียม' },
                    // {
                    //   pattern: /^[ก-๙\sa-zA-Z]+$/,
                    //   message: 'กรุณากรอก ชื่ออัตราค่าธรรมเนียม เป็นตัวอักษรเท่านั้น'
                    // }
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "จำนวน(บาท)"
                  name = "amount"
                  rules={[{ required: true, message: 'กรุณากรอก จำนวน(บาท)' }]}
                >
                  <InputNumber
                    className='w-full'
                    precision={2}
                    min={0} 
                    formatter={(value) => {
                      if (value === undefined || value === null) return '';
                      const [integer, decimal] = `${value}`.split('.');
                      const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
                    }}
                
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "สถานะ"
                  name = "status"
                  rules={[{ required: true, message: 'กรุณาเลือก สถานะ' }]}
                >
                  <Select
                    className='w-full'
                    options={[
                      {
                        label: "ใช้งาน",
                        value: "active",
                      },
                      {
                        label: "ไม่ใช้งาน",
                        value: "inactive",
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={'center'} align={'middle'} gutter={[ 8, 8 ]}>
              <Col>
                <Button
              
                  // type="primary"
                  onClick={props.onCloseModalForm}
                  className="button-plain"
                >
                  ยกเลิก
                </Button>
              </Col>
              <Col>
                <Button
                  className="button-primary"
                  // type="primary"
                  htmlType='submit'
          
                >
                  บันทึก
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
  )
}



// MasterFeeRateListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default MasterFeeRateListContainer;