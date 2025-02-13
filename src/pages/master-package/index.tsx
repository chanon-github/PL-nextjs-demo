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
  UploadFile,
  Image
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import useApi from '@/hooks/api/use-api';
import { packageApi } from '@/services/rental-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { notify } from '@/utils/functions/notification';
import type { PackageManagementContentProps, PackageManagementContainerProps, FormSearch, MasterPackageForm } from './index.model';
import { CrtPackage, PackageApiApiPackageSearchGetRequest } from '@/services/rental-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import dayjs from 'dayjs';
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';
import { ModalConfirmCrud } from '@/components/common';
import { fileApi } from '@/services/central-api';


const PackageManagementListContainer: NextPageWithLayout<PackageManagementContainerProps> = ( props: PackageManagementContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterPackage, setIsVisibleFormMasterPackage ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<MasterPackageForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [ imageUrl, setImageUrl ] = useState<string | undefined>();
  
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);


  //** Hook for call api Example
  const useApiPackageGet = useApi(packageApi, packageApi.apiPackageSearchGet);
  const useApiPackageTypeGet = useApi(packageApi, packageApi.apiPackageDropdownTypeGet);
  const useApiPackageGetById = useApi(packageApi, packageApi.apiPackageSearchGet);
  const useApiPackageSave = useApi(packageApi, packageApi.apiPackageSavePost);
  const useApiPackageDelete = useApi(packageApi, packageApi.apiPackageDeleteDelete);
  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);

  useEffect(() => {
    formSearch.setFieldsValue({
      type: 'main'
    })
    useApiPackageTypeGet.fetch({});
    packageApiRefetch({pageIndex: pageIndex, pageSize: pageSize, });
  }, []);

  
  /** Functionality section */
  const packageApiRefetch = async (params : PackageApiApiPackageSearchGetRequest ) =>{
    const value = formSearch.getFieldsValue();
    const res = await useApiPackageGet.fetch({...params, 
      ...constantBranch,
      name: value.name,
      code: value.code,
      isActive: value.isActive,
      type: value.type
    });
    return res
  } 
 
  const onClickToAdd = () => {
    setMode("add");
    setIsVisibleFormMasterPackage(true);
  }

  const onClickToEdit = async(param: {code: string; type: string;}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setIsVisibleFormMasterPackage(true);
    setCode(param.code);
    console.log('code==>>',param.code)
    useApiPackageGetById.fetch({
      code: param.code, 
      type: param.type,
      ...constantBranch,
      pageIndex: 1, 
      pageSize: 1
    }).then((res) => {
        antdForm.setFieldsValue({
          name:  res.items?.[0]?.name || undefined,
          isActive:  res.items?.[0]?.isActive || false,
          type:  res.items?.[0]?.type || undefined
          // amount:  res.items?.[0]?.amount || undefined,
          // status:  res.items?.[0]?.status || undefined
        })
      });;
 
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    packageApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: MasterPackageForm) =>{
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
    formSearch.resetFields(['code', 'isActive', 'name']);
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CrtPackage> | SorterResult<CrtPackage>[],
    extra: TableCurrentDataSource<CrtPackage>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      packageApiRefetch({pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
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
    useApiPackageSave.fetch({
       packageSaveInput: {
        code: mode === "edit" ? code : undefined,
        name: value.name,
        type: value.type,
        isActive: value.isActive || false,
        ...constantBranch
        // amount: value.amount,
        // branchCode: constantBranch.branchCode,
        // tenantCode: constantBranch.tenantCode,
        // status: value.status
      }
    }).then((res) => {
      if(res.data){
        packageApiRefetch({
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
    setIsVisibleFormMasterPackage(false);
    antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    useApiPackageDelete.fetch({
      packageDeleteInput: {
        codes: rowSelectedTable.map((code) => `${code}`),
        tenantCode: constantBranch.tenantCode,
        branchCode: constantBranch.branchCode
      }
    }).then((res) => {
      if(res.data){
        packageApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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
    Router.push(`/master-package-item?packageCode=${params.code}`);
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
  const contentProps: PackageManagementContentProps = {
    pageIndex,
    pageSize,
    useApiPackageGet,
    useApiPackageTypeGet,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleFormMasterPackage,
    mode,
    isModalConfirmVisible,
    imageUrl,
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
    onChangeUploadImg
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


const renderOptionsAddAndRemove = (props: PackageManagementContentProps): ReactElement => {
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
const renderOptions = (props: PackageManagementContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10}>
              <Form.Item
                name="name"
                label={"ชื่อ กลุ่มแพ็คเกจ"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="code"
                label={"รหัส กลุ่มแพ็คเกจ"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="type"
                label={"ชนิด กลุ่มแพ็คเกจ"}
              >
                {/* <Select
                  options={[{label: "main", value: "main"}, {label: "misc", value: "misc"}]}
                /> */}
                <Select
                  options={props.useApiPackageTypeGet.data?.data?.map((item) => ({label: item.type, value: item.type}))}
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

const renderTable = (props: PackageManagementContentProps): ReactElement => {
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
              key: "code2",
              dataIndex: "code",
              title: "รหัสกลุ่มแพ็คเกจ",                
              sorter: true,
              render: (_, record) => {
                return record.code
              }
            },
            {
              key: "name",
              dataIndex: "name",
              title: "ชื่อกลุ่มแพ็คเกจ",
              sorter: true,
            },
            {
              dataIndex: "isActive",
              title: "สถานะ",
              sorter: true,
              render: (_, record) => {
                return record.isActive  ? 'ใช้งาน' : 'ไม่ใช้งาน';
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
                        props.onClickToEdit({ code: record.code || "", type: record.type || "" });
                      }}
                    />
                     <Button
                      type="default"
                      shape="circle"
                      icon={<FileTextOutlined />}
                      onClick={() => {
                        props.onClickToPackageItem({ code: record.code || "" });
                      }}
                    />
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'code'}
        dataSource = {props.useApiPackageGet.data?.items || []}
        loading = {props.useApiPackageGet.loading}
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
          total: props.useApiPackageGet.data?.totalItems,
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

const renderModalCRUDForm = (props: PackageManagementContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม กลุ่มแพ็คเกจ" : "แก้ไข กลุ่มแพ็คเกจ"}
          open={props.isVisibleFormMasterPackage}
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
              <Col xs={24} md={12} >
                <Form.Item
                  label = "ชื่อ กลุ่มแพ็คเกจ"
                  name = "name"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่อ กลุ่มแพ็คเกจ' },
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
                  name="type"
                  label={"ชนิด กลุ่มแพ็คเกจ"}
                  rules={[{ required: true, message: 'กรุณาเลือก ชนิด กลุ่มแพ็คเกจ' }]}
                >
                  {/* <Select
                    options={[{label: "main", value: "main"}, {label: "misc", value: "misc"}]}
                  /> */}
                  <Select
                    options={props.useApiPackageTypeGet.data?.data?.map((item) => ({label: item.type, value: item.type}))}
                  />
                </Form.Item>
              </Col>
              {/* <Col xs={24} md={12}>
                <Row gutter={[ 8, 8 ]}>
                  <Col>
                    <Form.Item
                      label = "อัพโหลดรูป"
                      name = "imageUrl"
                      rules={[{ required: true, message: 'กรุณาเลือก สถานะ' }]}
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
                  <Col>
                    <Form.Item
                        label = " "
                    >
                      <Image src={props.imageUrl} alt="Uploaded Image"  style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                    </Form.Item>
                   
                  </Col>
                </Row>
                
              </Col> */}
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




// PackageManagementListContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default PackageManagementListContainer;