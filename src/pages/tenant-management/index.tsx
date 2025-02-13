/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  TenantManagement - Container
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
import { tenantApi } from '@/services/central-api';
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
import type { TenantManagementContentProps, TenantManagementContainerProps, FormSearch, TenantForm } from './index.model';

const TenantManagementListContainer: NextPageWithLayout<TenantManagementContainerProps> = ( props: TenantManagementContainerProps ): ReactElement => {
  /** Hook section */
  
  const Router = useRouter();
    
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterFeeRate, setisVisibleFormMasterFeeRate ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<TenantForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);

  //** Hook for call api Example
  const useApiTenantGet = useApi(tenantApi, tenantApi.apiMasterTenantGetGet);
  const useApiTenantGetById = useApi(tenantApi, tenantApi.apiMasterTenantGetGet);
  const useApiTenantSave = useApi(tenantApi, tenantApi.apiMasterTenantSavePost);
  const useApiTenantDelete = useApi(tenantApi, tenantApi.apiMasterTenantDeleteDelete);

  useEffect(() => {
    tenantApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
  }, []);

  
  /** Functionality section */
  const tenantApiRefetch = async (params : TenantApiApiMasterTenantGetGetRequest ) =>{
    const value = formSearch.getFieldsValue();
    const res = await useApiTenantGet.fetch({...params, 
      keyword: value.keyword,
      code: value.code,
      status: value.status
    });
    return res
  } 
 
  const onClickToAdd = () => {
    setMode("add");
    setisVisibleFormMasterFeeRate(true);
  }

  const onClickToEdit = (param: {code: string}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setisVisibleFormMasterFeeRate(true);
    setCode(param.code);
    useApiTenantGetById.fetch({
      code: param.code, 
      pageIndex: 1, 
      pageSize: 1
    }).then((res) => {
      antdForm.setFieldsValue({
        name:  res.items?.[0].name || undefined,
        taxId:  res.items?.[0].taxId || undefined,
        // amount:  res.items?.[0].amount || undefined,
        status:  res.items?.[0].status || undefined
      })
    });
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    tenantApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: TenantForm) =>{
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
      tenantApiRefetch({
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
    const value = antdForm.getFieldsValue();
     useApiTenantSave.fetch({
       tenantInput: {
       code: mode === "edit" ? code : undefined,
       name: value.name,
       status: value.status,
       taxId: value.taxId
      }
    }).then((res) => {
      if(res.data){
        tenantApiRefetch({ pageIndex: pageIndex, pageSize: pageSize});
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
    useApiTenantDelete.fetch({
      deleteTenantInput: {
        codes: rowSelectedTable.map((code) => `${code}`),
      }
    }).then((res) => {
      if(res.data){
        tenantApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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

    const contentProps: TenantManagementContentProps = {
      pageIndex,
      pageSize,
      useApiTenantGet,
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

const renderOptionsAddAndRemove = (props: TenantManagementContentProps): ReactElement => {
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
const renderOptions = (props: TenantManagementContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10} >
              <Form.Item
                name="keyword"
                label={"ชื่อบริษัท"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10} >
              <Form.Item
                name="code"
                label={"รหัสบริษัท"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10} > </Col>
            <Col xs={24} md={10} >
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

const renderTable = (props: TenantManagementContentProps): ReactElement => {
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
              key: "code2",
              dataIndex: "code",
              title: "รหัสบริษัท",                
            },
            {
              key: "name",
              dataIndex: "name",
              title: "ชื่อบริษัท",
              sorter: true,
            },
            {
              key: "taxId",
              dataIndex: "taxId",
              title: "เลขที่ผู้เสียภาษี",
              sorter: true,
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
        dataSource = {props.useApiTenantGet.data?.items || []}
        loading = {props.useApiTenantGet.loading}
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
          total: props.useApiTenantGet.data?.totalItems,
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

const renderModalCRUDForm = (props: TenantManagementContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม tenant management" : "แก้ไข tenant management"}
          open={props.isVisibleFormMasterFeeRate}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
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
                  label = "ชื่อบริษัท"
                  name = "name"
                  rules={[{ required: true, message: 'กรุณากรอก ชื่อบริษัท' }]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
              <Form.Item
                label = "เลขที่ผู้เสียภาษี"
                name = "taxId"
                
                rules={[{ required: true, message: 'กรุณากรอก เลขที่ผู้เสียภาษี'}, 
                  {
                    pattern: /^[0-9]{13}$/,
                    message: 'กรุณากรอกเลขที่ผู้เสียภาษี 13 หลัก',
                  }
                ]}
              >
                <Input className='w-full' minLength={13} maxLength={13}/>
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


// TenantManagementListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default TenantManagementListContainer;