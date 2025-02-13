/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  BranchManagement - Container
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
import { branchApi, tenantApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
// import { CrtVehicle } from '@/services/central-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import { CtlMstFeeRate, FeeRateApiApiMasterFeeRateGetGetRequest } from '@/services/central-api/generated';
import { ModalConfirmCrud } from '@/components/common';
import { constant } from 'lodash';
import { CustomButton } from '@/components/common/button/button';
import dayjs from 'dayjs';
import { EditOutlined, InfoOutlined } from '@ant-design/icons';
import { convertToFormattedNumeric } from '@/utils/functions/convert-numeric';
import type { BranchManagementContentProps, BranchManagementContainerProps, FormSearch, BranchManagementForm } from './index.model';

const BranchManagementListContainer: NextPageWithLayout<BranchManagementContainerProps> = ( props: BranchManagementContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleForm, setIsVisibleForm ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<BranchManagementForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);

  //** Hook for call api Example
  const useApiBranchGet = useApi(branchApi, branchApi.apiMasterBranchGetGet);
  const useApiTenantGet = useApi(tenantApi, tenantApi.apiMasterTenantGetGet);
  const useApiBranchGetById = useApi(branchApi, branchApi.apiMasterBranchGetGet);
  const useApiBranchSave = useApi(branchApi, branchApi.apiMasterBranchSavePost);
  const useApiBranchDelete = useApi(branchApi, branchApi.apiMasterBranchDeleteDelete);

  useEffect(() => {
    branchApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
    useApiTenantGet.fetch({pageIndex: 1, pageSize: 1000, status: 'active'});
  }, []);

  /** Functionality section */

  
  const branchApiRefetch = async (params : FeeRateApiApiMasterFeeRateGetGetRequest ) =>{
    const value = formSearch.getFieldsValue();
    const res = await useApiBranchGet.fetch({...params, 
      // branchCode: constantBranch.branchCode, 
      // tenantCode: constantBranch.tenantCode,
      name: value.name,
      tenantName: value.tenantName,
      code: value.code
      // status: value.status,
    });
    return res
  } 
 
  const onClickToAdd = () => {
    setMode("add");
    setIsVisibleForm(true);
  }

  const onClickToEdit = (param: {code: string}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setIsVisibleForm(true);
    setCode(param.code);
    useApiBranchGetById.fetch({
      code: param.code, 
      // branchCode: constantBranch.branchCode, 
      // tenantCode: constantBranch.tenantCode, 
      pageIndex: 1, 
      pageSize: 1
    }).then((res) => {
      antdForm.setFieldsValue({
        name:  res.items?.[0]?.name || undefined,
        address:  res.items?.[0]?.address || undefined,
        contactEmail:  res.items?.[0]?.contactEmail || undefined,
        contactMobile:  res.items?.[0]?.contactMobile || undefined,
        contactName:  res.items?.[0]?.contactName || undefined,
        contactTel:  res.items?.[0]?.contactTel || undefined,
        postcode:  res.items?.[0]?.postcode || undefined,
        location:  res.items?.[0]?.location || undefined,
        tenantCode:  res.items?.[0]?.tenantCode || undefined
      })
    });
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    branchApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: BranchManagementForm) =>{
    setIsModalConfirmVisible(mode === 'edit');
    if(mode == 'add'){
      onClickConfirmEdit();
    }
    // setMode("edit")
  }
  const onCloseModalForm = () =>{
    setMode("add");
    antdForm.resetFields();
    setIsVisibleForm(false);
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
      branchApiRefetch({
        pageIndex: pagination.current || 1, 
        pageSize: pagination.pageSize || 10, 
        sortDirection: sortDirection || "asc", 
        sortField: sorter.field?.toLocaleString()
      });
      setPageIndex(pagination.current || 1);
      setPageSize(pagination.pageSize || 10);
     
    }
  }

  const handleCloseModalConcfirm = () =>{setIsModalConfirmVisible(false)}

  const onClickShowModalConfirm = () =>{
    setIsModalConfirmVisible(true);
  }
  const onCloseModalConfirm = () =>{
   
    setIsModalConfirmVisible(false);
  }

  const onClickConfirmEdit = () =>{
    const value = antdForm.getFieldsValue();
     useApiBranchSave.fetch({
        branchInput: {
        code: mode === "edit" ? code : undefined,
        name: value.name,
        address: value.address,
        // postcode: value.postcode,
        // contactEmail: value.contactEmail,
        // contactMobile: value.contactMobile,
        contactName: value.contactName,
        contactTel: value.contactTel,
        // taxId: value.taxId,
        // location: value.location,
        tenantCode: value.tenantCode,
        // branchCode: constantBranch.branchCode,
        // tenantCode: constantBranch.tenantCode,
        status: value.status
      }
    }).then((res) => {
      if(res.data){
        // useApiBranchGet.fetch({
        //   pageIndex: pageIndex, 
        //   pageSize: pageSize, 
        //   branchCode: constantBranch.branchCode, 
        //   tenantCode: constantBranch.tenantCode
        // });
        branchApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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
    setIsVisibleForm(false);
    antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    useApiBranchDelete.fetch({
      deleteTenantInput: {
        codes: rowSelectedTable.map((code) => `${code}`),
      }
    }).then((res) => {
      if(res.data){
        branchApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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
  const contentProps: BranchManagementContentProps = {
    pageIndex,
    pageSize,
    useApiBranchGet,
    useApiTenantGet,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleForm,
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

const renderOptionsAddAndRemove = (props: BranchManagementContentProps): ReactElement => {
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
const renderOptions = (props: BranchManagementContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10}>
              <Form.Item
                name="name"
                label={"ชื่อสาขา"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="code"
                label={"รหัสสาขา"}
              >
                <Input/>
              </Form.Item>
            </Col>
           
            <Col xs={24} md={10}>
              <Form.Item
                name="tenantName"
                label={"ชื่อบริษัท"}
              >
                <Select
                    showSearch
                    options={props.useApiTenantGet.data?.items?.map((item) => ({label: item.name, value: item.name}))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
              
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={10}></Col> */}
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

const renderTable = (props: BranchManagementContentProps): ReactElement => {
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
              key: "tenantCode",
              dataIndex: "tenantCode",
              title: "รหัสบริษัท",
              sorter: true,
            },
            {
              key: "tenantName",
              dataIndex: "tenantName",
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
              key: "code",
              dataIndex: "code",
              title: "เลขที่ผู้เสียภาษี",
              sorter: true,
            },
            {
              key: "name",
              dataIndex: "name",
              title: "ชื่อสาขา",
              sorter: true,
            },
            {
              key: "contactName",
              dataIndex: "contactName",
              title: "ชื่อผู้ติดต่อ",
              sorter: true,
            },
            {
              key: "address",
              dataIndex: "address",
              title: "ที่อยู่",
              sorter: true,
            },
            {
              key: "contactTel",
              dataIndex: "contactTel",
              title: "เบอร์โทร",
              sorter: true,
            },
            {
              dataIndex: "status",
              title: "สถานะ",
              sorter: true,
              render: (_, record) => {
                return record?.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน';
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
        dataSource = {props.useApiBranchGet.data?.items || []}
        loading = {props.useApiBranchGet.loading}
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
          total: props.useApiBranchGet.data?.totalItems,
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

const renderModalCRUDForm = (props: BranchManagementContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม Branch" : "แก้ไข Branch"}
          open={props.isVisibleForm}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          // width={1000}
          zIndex={10}
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
                  name = "tenantCode"
                  rules={[{ required: true, message: 'กรุณากรอก ชื่อบริษัท' }]}
                >
                 <Select
                    showSearch
                    options={props.useApiTenantGet.data?.items?.map((item) => ({label: item.name, value: item.code}))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ชื่อสาขา"
                  name = "name"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่อสาขา' },
                    // {
                    //   pattern: /^[ก-๙a-zA-Z0-9\s]+$/,
                    //   message: 'กรุณากรอกชื่อโดยใช้ตัวอักษรภาษาไทย ภาษาอังกฤษ หรือตัวเลขเท่านั้น',
                    // }
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
             
              {/* <Col xs={24} md={12}>
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
              </Col> */}
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ชื่อผู้ติดต่อ"
                  name = "contactName"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่อผู้ติดต่อ' },
                    // {
                    //   pattern: /^[ก-๙a-zA-Z0-9\s]+$/,
                    //   message: 'กรุณากรอกชื่อโดยใช้ตัวอักษรภาษาไทย ภาษาอังกฤษ หรือตัวเลขเท่านั้น',
                    // }
                  ]}
                >
                  <Input className='w-full' />
                </Form.Item>
              </Col>
              
              {/* <Col xs={24} md={12}>
                <Form.Item
                  label = "เบอร์โทรศัพท์ติดต่อ"
                  name = "contactMobile"
                  rules={[
                    {required: true, message: 'กรุณากรอก เบอร์โทรศัพท์ติดต่อ'},
                    {pattern:/^[0-9]*$/,message: 'กรุณากรอก เบอร์โทรศัพท์ติดต่อ เป็นตัวเลข'},
                    { min: 10, message: 'กรุณากรอก contactTel อย่างน้อย 10 ตัว' },
                    // {
                    //   pattern: /^[ก-๙a-zA-Z0-9\s]+$/,
                    //   message: 'กรุณากรอกชื่อโดยใช้ตัวอักษรภาษาไทย ภาษาอังกฤษ หรือตัวเลขเท่านั้น',
                    // }
                  ]}
                >
                  <Input className='w-full' minLength={10} maxLength={10}/>
                </Form.Item>
              </Col> */}
              {/* <Col xs={24} md={12}>
                <Form.Item
                  label = "อีเมลติดต่อ"
                  name = "contactEmail"
                  rules={[
                    {required: true, message: 'กรุณากรอก อีเมลติดต่อ'},
                    {
                      type: 'email',
                      message: 'กรุณากรอก อีเมลติดต่อ ให้ถูกต้อง',
                    },
                    // {
                    //   pattern: /^[ก-๙a-zA-Z0-9\s]+$/,
                    //   message: 'กรุณากรอกชื่อโดยใช้ตัวอักษรภาษาไทย ภาษาอังกฤษ หรือตัวเลขเท่านั้น',
                    // }
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col> */}
              {/* <Col xs={24} md={12}>
                <Form.Item
                  label = "location"
                  name = "location"
                  rules={[
                    { required: true, message: 'กรุณากรอก location' },
                    // {
                    //   pattern: /^[ก-๙a-zA-Z0-9\s]+$/,
                    //   message: 'กรุณากรอกชื่อโดยใช้ตัวอักษรภาษาไทย ภาษาอังกฤษ หรือตัวเลขเท่านั้น',
                    // }
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col> */}
              <Col xs={24} md={12}>
                <Form.Item
                  label = "เบอร์ติดต่อ"
                  name = "contactTel"
                  rules={[
                    {required: true, message: 'กรุณากรอก เบอร์ติดต่อ' },
                    {pattern:/^[0-9]*$/,message: 'กรุณากรอก เบอร์ติดต่อ เป็นตัวเลข'},
                    { min: 9, message: 'กรุณากรอก เบอร์ติดต่อ อย่างน้อย 9 ตัว' },
                    // {
                    //   pattern: /^[ก-๙a-zA-Z0-9\s]+$/,
                    //   message: 'กรุณากรอกชื่อโดยใช้ตัวอักษรภาษาไทย ภาษาอังกฤษ หรือตัวเลขเท่านั้น',
                    // }
                  ]}
                >
                  <Input className='w-full' minLength={10} maxLength={10}/>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label = "ที่อยู่"
                  name = "address"
                  
                >
                  <Input.TextArea rows={4} className='w-full'/>
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  label = "สถานะ"
                  name = "status"
                  // rules={[{ required: true, message: 'กรุณาเลือก สถานะ' }]}
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



// BranchManagementListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default BranchManagementListContainer;