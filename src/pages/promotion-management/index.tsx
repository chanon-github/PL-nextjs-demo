/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PromotionManagement - Container
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
    TablePaginationConfig,
    DatePicker
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import useApi from '@/hooks/api/use-api';
import {notify} from '@/utils/functions/notification';
import { promotionApi } from '@/services/rental-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
// import { CrtVehicle } from '@/services/central-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlMstFeeRate, TenantSearchOutput, FeeRateApiApiMasterFeeRateGetGetRequest, HotelApiApiMasterHotelGetGetRequest, TenantApiApiMasterTenantGetGetRequest } from '@/services/central-api/generated';
import { ModalConfirmCrud } from '@/components/common';
import { constant } from 'lodash';
import { CustomButton } from '@/components/common/button/button';
import dayjs from 'dayjs';
import { EditOutlined, InfoOutlined } from '@ant-design/icons';
import { convertToFormattedNumeric } from '@/utils/functions/convert-numeric';
import type { PromotionManagementContentProps, PromotionManagementContainerProps, FormSearch } from './index.model';

const PromotionManagementListContainer: NextPageWithLayout<PromotionManagementContainerProps> = ( props: PromotionManagementContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
    
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterFeeRate, setisVisibleFormMasterFeeRate ] = useState<boolean>(false);
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);

  //** Hook for call api Example
  const useApiPromotionGet = useApi(promotionApi, promotionApi.apiPromotionSearchGet);
  const useApiPromotionDelete = useApi(promotionApi, promotionApi.apiPromotionDeleteDelete);
  // const useApiTenantGetById = useApi(tenantApi, tenantApi.apiMasterTenantGetGet);
  // const useApiTenantSave = useApi(tenantApi, tenantApi.apiMasterTenantSavePost);
  // const useApiTenantDelete = useApi(tenantApi, tenantApi.apiMasterTenantDeleteDelete);
  
  useEffect(() => {
    promotionApiRefetch({pageIndex: pageIndex, pageSize: pageSize,...constantBranch});
  }, []);

  
  /** Functionality section */
  const promotionApiRefetch = async (params : TenantApiApiMasterTenantGetGetRequest ) =>{
    const value = formSearch.getFieldsValue();
    console.log("params ==>", params)
    const res = await useApiPromotionGet.fetch({...params, 
      ...constantBranch,
      startDate: value.startDate ? dayjs(value.startDate).toISOString() : undefined ,
      endDate: value.endDate ? dayjs(value.endDate).toISOString()  : undefined,
      code: value.code,
      name: value.name,
      startDateToUse: value.startDateToUse ? dayjs(value.startDateToUse).toISOString()  : undefined,
      endDateToUse: value.endDateToUse ? dayjs(value.endDateToUse).toISOString()  : undefined,
      // keyword: value.keyword,
      // code: value.code,
      // status: value.status
    });
    // res.items
    return res
  } 
 
  const onClickToAdd = () => {
    Router.push('/promotion-management/add');
    // setMode("add");
    // setisVisibleFormMasterFeeRate(true);
  }

  const onClickToEdit = (param: {id: number}) => {
    Router.push(`/promotion-management/edit/${param.id}`);
    // Router.push(`/master-vehicles/edit/${param.id}`);
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    promotionApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onCloseModalForm = () =>{
    setMode("add");
    // antdForm.resetFields();
    setisVisibleFormMasterFeeRate(false);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TenantSearchOutput> | SorterResult<TenantSearchOutput>[],
    extra: TableCurrentDataSource<TenantSearchOutput>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      promotionApiRefetch({
        pageIndex: pagination.current || 1, 
        pageSize: pagination.pageSize || 10, 
        sortDirection: sortDirection || "asc", 
        sortField: sorter.field?.toLocaleString()
      });
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
    // const value = antdForm.getFieldsValue();
    //  useApiTenantSave.fetch({
    //    tenantInput: {
    //    code: mode === "edit" ? code : undefined,
    //    name: value.name,
    //    status: value.status,
    //    taxId: value.taxId
    //   }
    // }).then((res) => {
    //   if(res.data){
    //     promotionApiRefetch({ pageIndex: pageIndex, pageSize: pageSize});
    //     notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
    //     onCloseModalConfirm();
    //     onCloseModalForm();
    //   }
    //   else{
    //     notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
    //   }
    // }).catch((err) => {
    //   notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
    // })
    // setisVisibleFormMasterFeeRate(false);
    // antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    useApiPromotionDelete.fetch({
      deleteInput: {
        id: rowSelectedTable.map((id) => Number(id)),
        ...constantBranch
      }
    }).then((res) => {
      if(res.data){
        promotionApiRefetch({pageIndex: pageIndex, pageSize: pageSize,});
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
    const contentProps: PromotionManagementContentProps = {
      pageIndex,
      pageSize,
      useApiPromotionGet,
      rowSelectedTable,
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
    </>
  );
}
const renderOptionsAddAndRemove = (props: PromotionManagementContentProps): ReactElement => {
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
const renderOptions = (props: PromotionManagementContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card
        //  styles={{
        //   body:{
        //     padding: 0
        //   }
        //  }}
        >
          <Row gutter={[ 16, 8 ]}  align={"middle"}>
            <Col xs={24} md={10} >
              <Form.Item
                name="name"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    ชื่อโปรโมชั่น
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                // wrapperCol={{ span: 14 }} 
                // wrapperCol={{ span: 16 }} 
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} md={10} >
              <Form.Item
                name="code"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    รหัสโปรโมชั่น
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }} 
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={10} xl={10}>
              <Form.Item
                name="startDate"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    ระยะเวลาโปรโมชั่น เริ่ม
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }} 
              
                // wrapperCol={{ span: 16 }} 
              >
                <DatePicker 
                  showTime
                  className='w-full'
                  format={'DD/MM/YYYY HH:mm'}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="endDate"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    สิ้นสุด
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }} 
                // rules={[{ required: true, message: 'กรุณาเลือก สิ้นสุด' }]}
                // wrapperCol={{ span: 16 }} 
              >
                <DatePicker 
                  showTime
                  className='w-full'
                  format={'DD/MM/YYYY HH:mm'}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="startDateToUse"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    ระยะเวลาใช้โปรโมชั่น เริ่ม
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }} 
                // rules={[{ required: true, message: 'กรุณาเลือก ระยะเวลาใช้โปรโมชั่น เริ่ม' }]}
                // wrapperCol={{ span: 16 }} 
              >
                <DatePicker 
                  showTime
                  className='w-full'
                  format={'DD/MM/YYYY HH:mm'}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="endDateToUse"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    สิ้นสุด
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }} 
                // rules={[{ required: true, message: 'กรุณาเลือก สิ้นสุด' }]}
                // wrapperCol={{ span: 16 }} 
              >
                <DatePicker 
                  showTime
                  className='w-full'
                  format={'DD/MM/YYYY HH:mm'}
                />
              </Form.Item>
            </Col> */}
            {/* <Col xs={24} md={10}></Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="isActive"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    สถานะ
                  </span>
                }
                className="w-full md:ml-10"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }} 
                rules={[{ required: true, message: 'กรุณาเลือก สถานะ' }]}
              >
                <Select
                  options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                  // labelInValue={false}
                />
              </Form.Item>
            </Col>  */}
            <Col span={24} >
              <Row gutter={[8,8]} align={"middle"} justify={'center'}>
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

const renderTable = (props: PromotionManagementContentProps): ReactElement => {
  return(
    <>
      <AntTable
        columns={
          [
            {
              key: "id",
              dataIndex: "id",
              title: "ลำดับ",                
              render: (_, __, idx) => (
                <Typography.Text>
                    { ((props.pageIndex - 1) * props.pageSize) + idx + 1 }
                </Typography.Text>
              )
            },
            {
              key: "code2",
              dataIndex: "code",
              title: "รหัสโปรโมชั่น",                
            },
            {
              key: "name",
              dataIndex: "name",
              title: "ชื่อโปรโมชั่น",
              sorter: true,
            },
            {
              key: "startDate",
              dataIndex: "startDate",
              title: "ระยะเวลาโปรโมชั่น เริ่ม - สิ้นสุด",
              sorter: true,
              render: (_, record) => {
                // return<></>
                return `
                ${dayjs(record?.startDate).format('DD/MM/YYYY HH:mm')} - ${dayjs(record?.endDate).format('DD/MM/YYYY HH:mm')}
                `
              }
            },
            {
              key: "startDateToUse",
              dataIndex: "startDateToUse",
              title: "ระยะเวลาใช้โปรโมชั่น เริ่ม - สิ้นสุด",
              sorter: true,
              render: (_, record) => {
                // return<></>
                return `${dayjs(record.startDateToUse).format('DD/MM/YYYY HH:mm')} - ${dayjs(record.endDateToUse).format('DD/MM/YYYY HH:mm')}`
              }
            },
            {
              dataIndex: "status",
              title: "สถานะ",
              sorter: true,
              render: (_, record) => {
                return <Tag color="warning" className='rounded-full '>{record.status}</Tag>
              }
            },
            {
              dataIndex: "isActive",
              title: "การใช้งาน",
              sorter: true,
              render: (_, record) => {
                return record.isActive ? 'ใช้งาน' : 'ไม่ใช้งาน';
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
                        props.onClickToEdit({ id: record.id || -1 });
                      }}
                    />
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'id'}
        dataSource = {props.useApiPromotionGet.data?.items || []}
        loading = {props.useApiPromotionGet.loading}
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
          total: props.useApiPromotionGet.data?.totalItems,
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


// PromotionManagementListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default PromotionManagementListContainer;