/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Container
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
  Upload,
  Image,
  UploadFile
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import useApi from '@/hooks/api/use-api';
import { settingApi } from '@/services/rental-api';
import { customerApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { notify } from '@/utils/functions/notification';
import type { CustomerApprovalContentProps, CustomerApprovalContainerProps, FormSearch, CustomerApprovalForm } from './index.model';
import { CrtPackage, CtlSetting, PackageApiApiPackageSearchGetRequest } from '@/services/rental-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import dayjs from 'dayjs';
import { ArrowLeftOutlined, EditOutlined, FileTextOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { ModalConfirmCrud } from '@/components/common';
import { fileApi } from '@/services/central-api';
import { CtlContent, CusCustomerOutput } from '@/services/central-api/generated';


const CustomerApprovalContainer: NextPageWithLayout<CustomerApprovalContainerProps> = ( props: CustomerApprovalContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ packageCode, setPackageCode ] = useState<string | undefined>();
  const [ id, setId ] = useState<number | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormCustomerApproval, setIsVisibleFormCustomerApproval ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<CustomerApprovalForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
 
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);

  //** Hook for call api Example
  const useApiCustomerApprovalGet = useApi(customerApi, customerApi.apiCustomerSearchGet);
  const useApiCustomerApprovalGetById = useApi(customerApi, customerApi.apiCustomerSearchGet);
  const useApiCustomerApprovalVerify= useApi(customerApi, customerApi.apiCustomerUpdateApproveVerifyIdPost);
  // const useApiCustomerApprovalDelete = useApi(roleManagementApi, roleManagementApi.apiRoleManagementDeleteDelete);

  useEffect(() => {
    // formSearch.setFieldsValue({
    //   type: 'main'
    // })
    useApiCustomerApprovalGet.data?.items
    if (Router.isReady) {
      CustomerApprovalApiRefetch({pageIndex: pageIndex, pageSize: pageSize, });
    }
  
  }, [Router.isReady]);

  
  /** Functionality section */
  const setCodeFromPath =  () =>{
    const { packageCode } = Router.query as { packageCode: string; };
    setPackageCode(packageCode);
    return packageCode;
  }

  const CustomerApprovalApiRefetch = async (params : PackageApiApiPackageSearchGetRequest ) =>{
    const _packageCode = setCodeFromPath();
    console.log("packageCode==>>",_packageCode)
    const value = formSearch.getFieldsValue();
    const res = await useApiCustomerApprovalGet.fetch({...params,   
      ...constantBranch,
      name: value.name,
      // isActive: value.isActive,
    });
    return res
  } 
 
  const onClickToAdd = () => {
   
    setMode("add");
    setIsVisibleFormCustomerApproval(true);
  }

  const onClickToEdit = async(param: {id: number;}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setIsVisibleFormCustomerApproval(true);
    setId(param.id);
    // console.log('id==>>',param.id)
    useApiCustomerApprovalGetById.fetch({
      id: param.id,
      pageIndex: 1,
      pageSize: 1,
      ...constantBranch,

    }).then((res) => {
       
        
    });
 
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    setMode("view");
    setIsVisibleFormCustomerApproval(true);
    setId(param.id);
    // console.log('id==>>',param.id)
    useApiCustomerApprovalGetById.fetch({
      id: param.id,
      pageIndex: 1,
      pageSize: 1,
      ...constantBranch,

    }).then((res) => {
       
        
    });
  }

  const onSubmitSerach = (value: FormSearch) =>{
    CustomerApprovalApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: CustomerApprovalForm) =>{
    // console.log('mode==>>',mode)
    setIsModalConfirmVisible(true);
    setMode("verify");
    // if(mode == 'add'){
    //   onClickConfirmEdit();
    // }
    // setMode("edit")
  }

  const onVerifyUser = () =>{
    useApiCustomerApprovalVerify.fetch({
      id: id || -1,
    }).then((res) => {
        if(res.status == 0){
          CustomerApprovalApiRefetch({
            pageIndex: pageIndex, 
            pageSize: pageSize, 
          });
          notify({title: 'ทำการ อนุมัติ สำเร็จ', type: 'success'});
          onCloseModalConfirm();
          onCloseModalForm();
        }
        else{
          notify({title: 'ทำการ อนุมัติ ไม่สำเร็จ', type: 'error'});
        }
      }).catch((err) => {
        notify({title: 'ทำการ อนุมัติ ไม่สำเร็จ', type: 'error'});
      })
  }
  const onCloseModalForm = () =>{
    setMode("add");
    antdForm.resetFields();
    setIsVisibleFormCustomerApproval(false);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CusCustomerOutput> | SorterResult<CusCustomerOutput>[],
    extra: TableCurrentDataSource<CusCustomerOutput>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      CustomerApprovalApiRefetch({pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
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
    // useApiCustomerApprovalSave.fetch({
    //    settingInput: {
    //     key: mode === "edit" ? key : undefined,
    //     value: value.value,

    //     // isActive: value.isActive || false,
    //     // name: value.name,
    //     // ...constantBranch
    //   }
    // }).then((res) => {
    //   if(res.data){
    //     CustomerApprovalApiRefetch({
    //       pageIndex: pageIndex, 
    //       pageSize: pageSize, 
    //     });
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
    // setIsVisibleFormCustomerApproval(false);
    // antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    // useApiCustomerApprovalDelete.fetch({
    //   id: rowSelectedTable.map((id) => Number(id))
    // }).then((res) => {
    //   if(res.data){
    //     CustomerApprovalApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
    //     notify({title: 'ทำการ ลบ สำเร็จ', type: 'success'});
    //     setRowSelectedTable([]);
    //   }
    //   else{
    //     notify({title: 'ทำการ ลบ ไม่สำเร็จ', type: 'error'});
    //   }
    //   setIsModalConfirmVisible(false);
    // }).catch((err) => {
    //   notify({title: 'ทำการ ลบ ไม่สำเร็จ', type: 'error'});
    // })
  }

  const onClickToPreviousePage = () =>{
    Router.back();
  }


  const contentProps: CustomerApprovalContentProps = {
    pageIndex,
    pageSize,
    useApiCustomerApprovalGet,
    useApiCustomerApprovalGetById,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleFormCustomerApproval,
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
    onClickConfirmDelete,
    onClickToPreviousePage,
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
            {/* <Col span={24} className='mt-4'>
              {renderOptionsAddAndRemove(contentProps)}
            </Col> */}
            <Col span={24} >
                {/* {props.stockId !==  0  &&  renderTable(props)} */}
              {renderTable(contentProps)}
            </Col>
            {/* <Col span={24} className='flex justify-center'>
              <Button
                className='button-primary'
                onClick={onClickToAdd}
              >
                เพิ่มข้อมูล
              </Button>
            </Col> */}
          </Row>
        </Card>
      </Col>
      {<ModalConfirmCrud 
        isModalConfirmVisible={isModalConfirmVisible}
        onCloseModalConfirm={onCloseModalConfirm}
        onClickConfirmEdit={onVerifyUser}
        onClickConfirmDelete={onClickConfirmDelete}
        mode={'verify'}
        rowSelectedTable={rowSelectedTable}
      />}
    </Row>
   
    {/* {renderModalConfirm(contentProps)} */}
    {renderModalCRUDForm(contentProps)}
   
  </>
  );
}


const renderOptionsAddAndRemove = (props: CustomerApprovalContentProps): ReactElement => {
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
const renderOptions = (props: CustomerApprovalContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10}>
              <Form.Item
                name="name"
                label={"ชื่อ"}
              >
                <Input/>
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={10}>
              <Form.Item
                name="isActive"
                label={"สถานะ"}
              >
                <Select
                  options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                  className='w-full'
                />
              </Form.Item>
            </Col> */}
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

const renderTable = (props: CustomerApprovalContentProps): ReactElement => {
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
              key: "username",
              dataIndex: "username",
              title: "username",                
              sorter: true,
              render: (_, record) => {
                return record.username
              }
            },
            {
              key: "name",
              dataIndex: "name",
              title: "name",                
              sorter: true,
              render: (_, record) => {
                return `${record.firstName} ${record.lastName}`
              }
            },
            {
              key: "mobile",
              dataIndex: "mobile",
              title: "เบอร์โทรศัพท์",                
              sorter: true,
              render: (_, record) => {
                return record.mobile
              }
            },
            {
              key: "email",
              dataIndex: "email",
              title: "email",                
              sorter: true,
              render: (_, record) => {
                return record?.email
              }
            },
            {
              key: "isIdentityVerify",
              dataIndex: "isIdentityVerify",
              title: "สถานะ",                
              sorter: true,
              render: (_, record) => {
                return (record?.isIdentityVerify || record?.employeeVerify) ? "อนุมัติ" : "ไม่อนุมัติ";
              }
            },
            // {
            //   dataIndex: "isActive",
            //   title: "สถานะ",
            //   sorter: true,
            //   render: (_, record) => {
            //     return record?.isActive  ? 'ใช้งาน' : 'ไม่ใช้งาน';
            //   }
            // },
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
                    {/* <Button
                      type="default"
                      // shape="circle"
                      className='button-primary'
                      // icon={<EditOutlined />}
                      // onClick={() => {
                      //   props.onClickToEdit({ key: record.key || "" });
                      // }}
                      
                    >
                      อนุมัติ
                    </Button> */}
                    <Button
                      type="default"
                      // shape="circle"
                      // className='button-primary'
                      // icon={<EditOutlined />}
                      onClick={() => {
                        props.onClikToView({ id: record.id || -1 });
                      }}
                      
                    >
                      รายละเอียด
                    </Button>
                     {/* <Button
                      type="default"
                      shape="circle"
                      icon={<FileTextOutlined />}
                      onClick={() => {
                        props.onClickToMasterPriceTier({ id: record.id || "" });
                      }}
                    /> */}
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'id'}
        dataSource = {props.useApiCustomerApprovalGet.data?.items || []}
        loading = {props.useApiCustomerApprovalGet.loading}
        size={'middle'}
        scroll={{ x: 'max-content' }}
        onChange = {props.onChangeTable}
        // rowSelection = {{
        //     selectedRowKeys: props.rowSelectedTable,
        //     onChange: props.onChangeRowSelection,
        // }}
        pagination={{
          current: props.pageIndex,
          pageSize: props.pageSize,
          total: props.useApiCustomerApprovalGet.data?.totalItems,
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

const renderModalCRUDForm = (props: CustomerApprovalContentProps): ReactElement =>{
  const dataById = props.useApiCustomerApprovalGetById.data?.items?.[0]
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม Price Tier" : "แก้ไข Price Tier"}
          open={props.isVisibleFormCustomerApproval}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          loading={props.useApiCustomerApprovalGetById.loading}
          // zIndex={10}
          width={750}
        >
          <Form
            onFinish={props.onSubmitForm}
            form={props.antdForm}
            layout='vertical'
          >
            <Row gutter={[ 8, 8 ]}>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "ชื่อ"
                  name = "name"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก ชื่อ' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? `${dataById?.titleName} ${dataById?.firstName} ${dataById?.lastName}`  :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "เบอร์โทร"
                  name = "mobile"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก เบอร์โทร' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? dataById?.mobile :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "username"
                  name = "username"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก username' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? dataById?.username || "-" :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "email"
                  name = "email"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก email' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? dataById?.email :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "Google Account"
                  name = "googleAccount"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก Google Account' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? dataById?.googleAccount || "-" :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "Facebook Account"
                  name = "facebookAccount"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก Facebook Account' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? dataById?.facebookAccount || "-" :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "Line Account"
                  name = "lineAccount"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก Line Account' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? dataById?.lineAccount || "-" :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={24}>
                <Form.Item
                  label = "ที่อยู่"
                  name = "address"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก ที่อยู่' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? (
                      [
                        dataById?.address, 
                        dataById?.street, 
                        dataById?.soi , 
                        dataById?.districtName ?  `${dataById?.districtName}` : undefined,
                        dataById?.subDistrictName ?  `${dataById?.subDistrictName}` : undefined,
                        dataById?.provinceName ?  `${dataById?.provinceName}` : undefined,
                        dataById?.postCode
                      ]
                        .filter(Boolean)
                        .join(' ')
                    )  :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "ไฟล์บัตรประชาชนหรือหนังสือเดินทาง"
                  name = "attachIdentity"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก ไฟล์บัตรประชาชนหรือหนังสือเดินทาง' },
                  // ]}
                >
                  {
                    props.mode === 'view' ? (dataById?.attachIdentity ? <Image src={dataById?.attachIdentity } height={100} width={100}/> : "-") :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "ไฟล์ใบขับขี่"
                  name = "attachDrivingLicense"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก ไฟล์ใบขับขี่' },
                  // ]}
                >
                  {
                    props.mode === 'view' ?  (dataById?.attachDrivingLicense ? <Image src={dataById?.attachDrivingLicense } height={100} width={100}/> : "-") :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "ไฟล์หลักฐานการเป็นพนักงาน เช่น บัตรพนักงาน"
                  name = "attachEmployeeCard"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก ไฟล์หลักฐานการเป็นพนักงาน เช่น บัตรพนักงาน' },
                  // ]}
                >
                  {
                    props.mode === 'view' ?  (dataById?.attachEmployeeCard ? <Image src={dataById?.attachEmployeeCard } height={100} width={100}/> : "-") :
                    <Input 
                      className='w-full'
                    />
                  }
                </Form.Item>
              </Col>
          
              {/* <Col xs={24} md={12}>
                <Form.Item
                  label = "สถานะ"
                  name = "isActive"
                  rules={[{ required: true, message: 'กรุณาเลือก สถานะ' }]}
                >
                  <Select
                    options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                    className='w-full'
                  />
                </Form.Item>
              </Col> */}
            </Row>
            <Row justify={'center'} align={'middle'} gutter={[ 8, 8 ]}>
              <Col >
                <Button
              
                  // type="primary"
                  onClick={props.onCloseModalForm}
                  className="button-plain"
                >
                  ยกเลิก
                </Button>
              </Col>
              <Col 
                hidden ={dataById?.isIdentityVerify || dataById?.employeeVerify || false}
              >
                <Button
                  className="button-primary"
                  // type="primary"
                  htmlType='submit'
          
                >
                  อนุมัติ
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
  )
}




// CustomerApprovalContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default CustomerApprovalContainer;