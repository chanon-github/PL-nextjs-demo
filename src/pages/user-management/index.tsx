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
// import { packageItemApi } from '@/services/rental-api';
import { userManagementApi, titleApi, roleManagementApi, departmentApi, divisionApi, positionApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { notify } from '@/utils/functions/notification';
import type { UserManagementContentProps, UserManagementListContainerProps, FormSearch, MasterUserForm } from './index.model';
import { CrtPackage, PackageApiApiPackageSearchGetRequest, PackageItemSearchOutput } from '@/services/rental-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import dayjs from 'dayjs';
import { ArrowLeftOutlined, EditOutlined, FileTextOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { ModalConfirmCrud, UploadFileComponent } from '@/components/common';
import { fileApi } from '@/services/central-api';
import { UserSearchOutput } from '@/services/central-api/generated';


const UserManagementListContainer: NextPageWithLayout<UserManagementListContainerProps> = ( props: UserManagementListContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ packageCode, setPackageCode ] = useState<string | undefined>();
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterPackage, setIsVisibleFormMasterPackage ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<MasterUserForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ imageUrl, setImageUrl ] = useState<string | undefined>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);


  //** Hook for call api Example
  const useApiUserGet = useApi(userManagementApi, userManagementApi.apiUserManagementGetGet);
  const useApiUserGetById = useApi(userManagementApi, userManagementApi.apiUserManagementGetGet);
  const useApiUserSave = useApi(userManagementApi, userManagementApi.apiUserManagementCreatePost);
  const useApiUserEdit = useApi(userManagementApi, userManagementApi.apiUserManagementUpdatePost);
  const useApiUserDelete = useApi(userManagementApi, userManagementApi.apiUserManagementDeleteDelete);

  const useApiGetDepartments = useApi(departmentApi, departmentApi.apiDepartmentGetGet);
  const useApiGetDivision = useApi(divisionApi, divisionApi.apiDivisionGetGet);
  const useApiGetPosition = useApi(positionApi, positionApi.apiPositionGetGet);

  const useApiTitleGet = useApi(titleApi, titleApi.apiMasterTitleGetGet);

  const useApiRoleGet = useApi(roleManagementApi, roleManagementApi.apiRoleManagementGetGet);

  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);



  useEffect(() => {
    // formSearch.setFieldsValue({
    //   type: 'main'
    // })
    if (Router.isReady) {
      useApiGetDivision.fetch({
        pageIndex: 1,
        pageSize: 1000,
        ...constantBranch
      })

      useApiTitleGet.fetch({
        pageIndex: 1,
        pageSize: 100,
          //ขาด isActive
        ...constantBranch
      });
      useApiRoleGet.fetch({
        pageIndex: 1,
        pageSize: 100,
        isActive: true,
        //ขาด isActive
        ...constantBranch
      })
      userApiRefetch({pageIndex: pageIndex, pageSize: pageSize, });
    }
  
  }, [Router.isReady]);

  
  /** Functionality section */
  const setCodeFromPath =  () =>{
    const { packageCode } = Router.query as { packageCode: string; };
    setPackageCode(packageCode);
    return packageCode;
  }

  const userApiRefetch = async (params : PackageApiApiPackageSearchGetRequest ) =>{
    const _packageCode = setCodeFromPath();
    console.log("packageCode==>>",_packageCode)
    const value = formSearch.getFieldsValue();
    const res = await useApiUserGet.fetch({...params, 
      ...constantBranch,
      userName: value.userName,
      name: value.name,
      role: value.role,
      isActive: value.isActive
      // name: value.name,
      // code: value.code,
      // packageCode: _packageCode,
      // isActive: value.isActive,
      // type: value.type
    });
    return res
  } 
 
  const onClickToAdd = () => {
    setImageUrl(undefined);
    setMode("add");
    setIsVisibleFormMasterPackage(true);
  }

  const onClickToEdit = async(param: {username: string;}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setIsVisibleFormMasterPackage(true);
    setCode(param.username);
    console.log('code==>>',param.username)
    useApiUserGetById.fetch({
      userName: param.username, 
      // type: param.type,
      ...constantBranch,

      pageIndex: 1, 
      pageSize: 1
    }).then((res) => {
      antdForm.setFieldsValue({
        username: res.items?.[0]?.username || undefined,
        password: res.items?.[0]?.password || undefined,
        branchCode: res.items?.[0]?.branchCode || undefined,
        divisionCode: res.items?.[0]?.divisionCode || undefined,
        divisionName: res.items?.[0]?.divisionName || undefined,
        departmentCode: res.items?.[0]?.departmentCode || undefined,
        departmentName: res.items?.[0]?.departmentName || undefined,
        positionCode: res.items?.[0]?.positionCode || undefined,
        titleCode: res.items?.[0]?.titleCode || undefined,
        firstName: res.items?.[0]?.firstName || undefined,
        lastName: res.items?.[0]?.lastName || undefined,
        email: res.items?.[0]?.email || undefined,
        tel: res.items?.[0]?.tel || undefined,
        role: res.items?.[0]?.role ?? undefined,
        imageUrl: res.items?.[0]?.image || undefined,
        isActive: res.items?.[0]?.isActive || false
      });
        if(res.items?.[0]?.divisionCode){
          useApiGetDepartments.fetch({
            pageIndex: 1,
            pageSize: 1000,
            divisionCode: res.items?.[0]?.divisionCode,
            ...constantBranch
          })
        }
        if(res.items?.[0]?.departmentCode){
          useApiGetPosition.fetch({
            pageIndex: 1,
            pageSize: 1000,
            departmentCode: res.items?.[0]?.departmentCode,
            ...constantBranch
          })
        }
        setImageUrl(res.items?.[0]?.image || undefined);
    });
 
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    userApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: MasterUserForm) =>{
    setIsModalConfirmVisible(mode === 'edit');
    if(mode == 'add'){
      onClickConfirmEdit();
    }
    // setMode("edit")
  }
  const onCloseModalForm = () =>{
    setMode("add");
    antdForm.resetFields();
    setIsVisibleFormMasterPackage(false);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<UserSearchOutput> | SorterResult<UserSearchOutput>[],
    extra: TableCurrentDataSource<UserSearchOutput>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      userApiRefetch({pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
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

  const onClickConfirmEdit = async () => {
    const value = antdForm.getFieldsValue();
    const isAddMode = mode === 'add';
    console.log("value",value)
    const userInput = {
      ...value,
      image: imageUrl,
      ...constantBranch,
      ...(isAddMode && { password: value.password }),
    };
  
    const apiCall = isAddMode ? useApiUserSave.fetch : useApiUserEdit.fetch;
    
    console.log("userInput",userInput)
    try {
      let res
      if(isAddMode){
        res = await apiCall({ userInput: userInput  });
      }
      else{
        res = await apiCall({ userUpdateInput: userInput  });
      }
  
      if (res?.data) {
        await userApiRefetch({ pageIndex, pageSize });
        notify({ title: 'บันทึก สำเร็จ', type: 'success' });
      } else {
        notify({ title: 'บันทึก ไม่สำเร็จ', type: 'error' });
      }
    } catch (err) {
      notify({ title: 'บันทึก ไม่สำเร็จ', type: 'error' });
      console.error('Error during save/edit operation:', err);
    }
    setIsVisibleFormMasterPackage(false);
    onCloseModalConfirm();
    antdForm.resetFields();
  };

  const onClickConfirmDelete = () =>{
    useApiUserDelete.fetch({
      userDeleteInput: {
        username: rowSelectedTable.map((code) => `${code}`),
        ...constantBranch
      }
    }).then((res) => {
      if(res.data){
        userApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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

  const onClickToPackageItem = (params: {code: string}) => {
    Router.push(`/master-package-item?code=${params.code}`);
  }

  const onChangeUploadImg = (params: { file: UploadFile;}) =>{
    if (params.file.status === 'done') {
      const originFileObj = params.file.originFileObj;
      if (originFileObj) {
        // setImagePromotionCash(originFileObj);
      
        useApiFileUpload.fetch({
          fileType: "pub-content",
          file: originFileObj,
          docType: "promotion"
        }).then((res) => {
          if(res.data){
            setImageUrl(res.data?.url || "");
            antdForm.setFieldsValue({imageUrl: res.data?.url || ""});
            notify({ title: 'ทำการ อัพโหลดรูป สำเร็จ', type: 'success' });
          }
          else{
            notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
          }
        });
      } else {
        console.error("No original file object available.");
      }
    }
  }
  const onClickToPreviousePage = () =>{
    Router.back();
  }

  const onChangeDivisionCode = (params: { divisionCode: string;}) =>{
    useApiGetDepartments.fetch({
      pageIndex: 1,
      pageSize: 1000,
      divisionCode: params.divisionCode,
      ...constantBranch
    })
    antdForm.resetFields(['departmentCode', 'positionCode']);
  }
  const onChangeDepartmentCode = (params: { departmentCode: string;}) =>{
    useApiGetPosition.fetch({
      pageIndex: 1,
      pageSize: 1000,
      departmentCode: params.departmentCode,
      ...constantBranch
    })
    antdForm.resetFields(['positionCode']);
  }

  const onGetImageUrlUploaded = (imageUrl?: string) => {
    if(imageUrl){
      antdForm.setFieldsValue({imageUrl: imageUrl});
      setImageUrl(imageUrl);
    }
  }
  
  const contentProps: UserManagementContentProps = {
    pageIndex,
    pageSize,
    useApiUserGet,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleFormMasterPackage,
    mode,
    isModalConfirmVisible,
    imageUrl,
    useApiTitleGet,
    useApiRoleGet,
    useApiGetDepartments,
    useApiGetDivision,
    useApiGetPosition,
    onChangeUploadImg,
    onChangeTable,
    onClickShowModalConfirm,
    onChangeRowSelection,
    onClickToEdit,
    onClikToView,
    onClickRemove,
    onClickToAdd,
    onSubmitSerach,
    onClickToPackageItem,
    onSubmitForm,
    onCloseModalForm,
    onClickClearForm,
    onCloseModalConfirm,
    onClickConfirmEdit,
    onClickConfirmDelete,
    onClickToPreviousePage,
    onChangeDivisionCode,
    onChangeDepartmentCode,
    onGetImageUrlUploaded
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


const renderOptionsAddAndRemove = (props: UserManagementContentProps): ReactElement => {
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
const renderOptions = (props: UserManagementContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10}>
              <Form.Item
                name="userName"
                label={"username"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="name"
                label={"ชื่อ"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="role"
                label={"role"}
              >
                <Select 
                  className='w-full'
                  placeholder="role"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={
                    props.useApiRoleGet.data?.items?.map((data) => ({
                      label: data.name,
                      value: data.id
                    }))
                  }
                />
              
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="isActive"
                label={"สถานะ"}
              >
                <Select
                  options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                  className='w-full'
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

const renderTable = (props: UserManagementContentProps): ReactElement => {
  return(
    <>
      <AntTable
        columns={
          [
            {
              key: "code",
              dataIndex: "code",
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
                return record?.username
              }
            },
            {
              key: "divisionName",
              dataIndex: "divisionName",
              title: "ฝ่าย",                
              sorter: true,
              render: (_, record) => {
                return record?.divisionName
              }
            },
            {
              key: "departmentName",
              dataIndex: "departmentName",
              title: "แผนก",
              sorter: true,
            },
            {
              key: "positionName",
              dataIndex: "positionName",
              title: "ตำแหน่ง",
              sorter: true,
            },
            {
              key: "firstName",
              dataIndex: "firstName",
              title: "ชื่อจริง",
              sorter: true,
            },
            {
              key: "lastName",
              dataIndex: "lastName",
              title: "นามสกุล",
              sorter: true,
            },
            {
              key: "roleName",
              dataIndex: "roleName",
              title: "role",
              sorter: true,
            },
           
            {
              dataIndex: "isActive",
              title: "สถานะ",
              sorter: true,
              render: (_, record) => {
                return record?.isActive  ? 'ใช้งาน' : 'ไม่ใช้งาน';
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
                        props.onClickToEdit({ username: record.username || ""});
                      }}
                    />
                     {/* <Button
                      type="default"
                      shape="circle"
                      icon={<FileTextOutlined />}
                      onClick={() => {
                        props.onClickToPackageItem({ code: record.code || "" });
                      }}
                    /> */}
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'username'}
        dataSource = {props.useApiUserGet.data?.items || []}
        loading = {props.useApiUserGet.loading}
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
          total: props.useApiUserGet.data?.totalItems,
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

const renderModalCRUDForm = (props: UserManagementContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม User" : "แก้ไข User"}
          open={props.isVisibleFormMasterPackage}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          // zIndex={10}
          width={1000}
        >
          <Form
            onFinish={props.onSubmitForm}
            form={props.antdForm}
            layout='vertical'
          >
            <Row gutter={[ 8, 8 ]}>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "username"
                  name = "username"
                  rules={[
                    { required: true, message: 'กรุณากรอก username' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              {
                props.mode == "add" && (
                  <Col xs={24} md={12} >
                    <Form.Item
                      label = "password"
                      name = "password"
                      rules={[
                        { required: true, message: 'กรุณากรอก password' },
                      ]}
                    >
                      <Input.Password className='w-full'/>
                    </Form.Item>
                  </Col>
                )
              }
             
              <Col xs={24} md={12} >
                <Form.Item
                  label = "คำนำหน้า"
                  name = "titleCode"
                  rules={[
                    { required: true, message: 'กรุณากรอก คำนำหน้า' },
                  ]}
                >
                  <Select className='w-full'
                     placeholder="คำนำหน้า"
                     filterOption={(input, option) =>
                       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                     }
                     options={
                       props.useApiTitleGet.data?.items?.map((data) => ({
                         label: data.titleDesc,
                         value: data.code
                       }))
                     }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "ชื่อจริง"
                  name = "firstName"
                  rules={[
                    { required: true, message: 'กรุณากรอก firstName' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "นามสกุล"
                  name = "lastName"
                  rules={[
                    { required: true, message: 'กรุณากรอก lastName' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "ฝ่าย"
                  name = "divisionCode"
                  rules={[
                    { required: true, message: 'กรุณาเลือก แผนก' },
                  ]}
                >
                  <Select  
                    placeholder="ฝ่าย"
                     filterOption={(input, option) =>
                       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                     }
                     options={
                       props.useApiGetDivision.data?.items?.map((data) => ({
                         label: data.name,
                         value: data.code
                       }))
                     }
                     onChange={(value) => props.onChangeDivisionCode({divisionCode: value})}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "แผนก"
                  name = "departmentCode"
                  rules={[
                    { required: true, message: 'กรุณาเลือก ฝ่าย' },
                  ]}
                >
                  <Select 
                    placeholder="แผนก"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                      props.useApiGetDepartments.data?.items?.map((data) => ({
                        label: data.name,
                        value: data.code
                      }))
                    }
                    onChange={(value) => props.onChangeDepartmentCode({departmentCode: value})}
                  />
                </Form.Item>
              </Col>
            
             
              <Col xs={24} md={12} >
                <Form.Item
                  label = "ตำแหน่ง"
                  name = "positionCode"
                  rules={[
                    { required: true, message: 'กรุณาเลือก ตำแหน่ง' },
                  ]}
                >
                  <Select 
                    placeholder="ตำแหน่ง"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                      props.useApiGetPosition.data?.items?.map((data) => ({
                        label: data.name,
                        value: data.code
                      }))
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "email"
                  name = "email"
                  rules={[
                    {
                      type: 'email',
                      message: 'กรุณากรอก email ให้ถูกต้อง',
                    },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "เบอร์โทรศัพท์"
                  name = "tel"
                  rules={[
                    {pattern:/^[0-9]*$/,message: 'กรุณากรอก เบอร์โทรศัพท์ เป็นตัวเลข'}
                  ]}
                >
                  <Input className='w-full' maxLength={10}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "role"
                  name = "role"
                  rules={[
                    { required: true, message: 'กรุณาเลือก role' },
                  ]}
                >
                  <Select 
                    className='w-full'
                    placeholder="role"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                      props.useApiRoleGet.data?.items?.map((data) => ({
                        label: data.name,
                        value: data.id
                      }))
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <UploadFileComponent 
                  imageUrl={props.imageUrl}
                  onGetImageUrlUploaded={props.onGetImageUrlUploaded}
                />
                {/* <Row gutter={[ 8, 8 ]}>
                  <Col>
                    <Form.Item
                      label = "อัพโหลดรูป"
                      name = "image"
                      // rules={[{ required: true, message: 'กรุณาเลือก อัพโหลดรูป' }]}
                    >
                      <Upload
                        accept="image/*"
                        maxCount={1}
                        listType="picture"
                        onChange={(info) => {props.onChangeUploadImg({file: info.file})}}
                        showUploadList={false}
                        style={{ width: "100%" }}
                      >
                        <Button   style={{ width: "100%" }}>อัปโหลด รูปภาพ</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  {
                    props.imageUrl && (
                      <Col>
                        <Form.Item
                            label = " "
                        >
                          <Image src={props.imageUrl} alt="Uploaded Image"  style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                        </Form.Item>
                      
                      </Col>
                    )
                  }
                  
                </Row> */}
                
              </Col>
              <Col xs={24} md={12}>
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




// UserManagementListContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default UserManagementListContainer;