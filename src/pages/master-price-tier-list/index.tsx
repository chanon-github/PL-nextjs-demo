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
import {  vehicleMasterApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { notify } from '@/utils/functions/notification';
import type { SetUpPriceContentProps, SetUpPriceListContainerProps, FormSearch, SetUpPriceForm } from './index.model';
import { CrtPackage, PackageApiApiPackageSearchGetRequest } from '@/services/rental-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import dayjs from 'dayjs';
import { ArrowLeftOutlined, EditOutlined, FileTextOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { ModalConfirmCrud } from '@/components/common';
import { fileApi } from '@/services/central-api';
import { CtlContent, GetAllPriceTierItemOutput } from '@/services/central-api/generated';


const SetUpPriceListContainer: NextPageWithLayout<SetUpPriceListContainerProps> = ( props: SetUpPriceListContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ packageCode, setPackageCode ] = useState<string | undefined>();
  const [ id, setId ] = useState<number | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterPackage, setIsVisibleFormMasterPackage ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<SetUpPriceForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ imageUrl, setImageUrl ] = useState<string | undefined>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [ minDay, setMinDay ] = useState(0);
  const [ maxDay, setMaxDay ] = useState(10);

  //** Hook for call api Example
  const useApiMasterPriceTierGet = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetAllPriceTierGet);
  const useApiMasterPriceTierGetById = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetPriceTierIdGet);
  const useApiMasterPriceTierSave = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterSavePriceTierPost);
  const useApiMasterPriceTierDelete = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterDeleteTierPriceDelete);

  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);

  const useApiVehicleMaster = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetGet);

  useEffect(() => {
    // formSearch.setFieldsValue({
    //   type: 'main'
    // })
    useApiMasterPriceTierGet.data?.data?.items
    if (Router.isReady) {
      masterPriceTierApiRefetch({pageIndex: pageIndex, pageSize: pageSize, });
    }
  
  }, [Router.isReady]);

  
  /** Functionality section */
  const setCodeFromPath =  () =>{
    const { packageCode } = Router.query as { packageCode: string; };
    setPackageCode(packageCode);
    return packageCode;
  }

  const masterPriceTierApiRefetch = async (params : PackageApiApiPackageSearchGetRequest ) =>{
    const _packageCode = setCodeFromPath();
    console.log("packageCode==>>",_packageCode)
    const value = formSearch.getFieldsValue();
    const res = await useApiMasterPriceTierGet.fetch({...params,   
      // ...constantBranch,
      // name: value.name,
      // isActive: value.isActive,
    });
    return res
  } 
 
  const onClickToAdd = () => {
    setImageUrl(undefined);
    setMode("add");
    setIsVisibleFormMasterPackage(true);
  }

  const onClickToEdit = async(param: {id: number;}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setIsVisibleFormMasterPackage(true);
    setId(param.id);
    // console.log('id==>>',param.id)
    useApiMasterPriceTierGetById.fetch({
      
      // ...constantBranch,

      id: param.id
    }).then((res) => {
        setMinDay(res.data?.minDay || 0);
        setMaxDay(res.data?.maxDay  || 10);
        antdForm.setFieldsValue({
          name:  res.data?.name || undefined,
          maxDay:  res.data?.maxDay || undefined,
          minDay:  res.data?.minDay || undefined,
          isActive:  res.data?.isActive || false,
        })
      });
 
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    masterPriceTierApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: SetUpPriceForm) =>{
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
    sorter: SorterResult<GetAllPriceTierItemOutput> | SorterResult<GetAllPriceTierItemOutput>[],
    extra: TableCurrentDataSource<GetAllPriceTierItemOutput>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      masterPriceTierApiRefetch({pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
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
    useApiMasterPriceTierSave.fetch({
       savePriceTierInput: {

        id: mode === "edit" ? id : undefined,
        isActive: value.isActive || false,
        minDay: value.minDay ,
        maxDay: value.maxDay ,
        name: value.name,
        // ...constantBranch
      }
    }).then((res) => {
      if(res.data){
        masterPriceTierApiRefetch({
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
    useApiMasterPriceTierDelete.fetch({
      requestBody: rowSelectedTable.map((id) => Number(id))
    }).then((res) => {
      if(res.data){
        masterPriceTierApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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
            // setImageUrl(res.data?.url || "");
            // antdForm.setFieldsValue({imageUrl: res.data?.url || ""});
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

  const onChangeValuePirceMin = (value: number | null) =>{
    setMinDay(value || 0);
  }

  const onChangeValuePirceMax = (value: number | null) =>{
    setMaxDay(value || 0);
  }
  const contentProps: SetUpPriceContentProps = {
    pageIndex,
    pageSize,
    useApiMasterPriceTierGet,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleFormMasterPackage,
    mode,
    isModalConfirmVisible,
    imageUrl,
    useApiVehicleMaster,
    minDay,
    maxDay,
    onChangeUploadImg,
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
    onChangeValuePirceMin,
    onChangeValuePirceMax
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


const renderOptionsAddAndRemove = (props: SetUpPriceContentProps): ReactElement => {
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
const renderOptions = (props: SetUpPriceContentProps): ReactElement => {
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

const renderTable = (props: SetUpPriceContentProps): ReactElement => {
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
              key: "name",
              dataIndex: "name",
              title: "ชื่อ",                
              sorter: true,
              render: (_, record) => {
                return record?.name
              }
            },
            {
              key: "minDay",
              dataIndex: "minDay",
              title: "จำนวน วันขั้นต่ำ",                
              sorter: true,
              render: (_, record) => {
                return record?.minDay
              }
            },
            {
              key: "maxDay",
              dataIndex: "maxDay",
              title: "จำนวน วันสูงสุด",
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
                        props.onClickToEdit({ id: record.id || -1 });
                      }}
                    />
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
        dataSource = {props.useApiMasterPriceTierGet.data?.data?.items || []}
        loading = {props.useApiMasterPriceTierGet.loading}
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
          total: props.useApiMasterPriceTierGet.data?.data?.totalItems,
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

const renderModalCRUDForm = (props: SetUpPriceContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม Price Tier" : "แก้ไข Price Tier"}
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
              <Col xs={24} md={12} xl={24}>
                <Form.Item
                  label = "ชื่อ"
                  name = "name"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่อ' },
                  ]}
                >
                  <Input 
                     className='w-full'
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "จำนวน วันขั้นต่ำ"
                  name = "minDay"
                  rules={[
                    { required: true, message: 'กรุณากรอก จำนวน วันขั้นต่ำ' },
                  ]}
                >
                 <InputNumber
                    className='w-full custom-input-number'
                    min={0}
                    onChange={props.onChangeValuePirceMin}
                    max={props.maxDay}
                    value={props.minDay}
                    step={500}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "จำนวน วันสูงสุด"
                  name = "maxDay"
                  rules={[
                    { required: true, message: 'กรุณากรอก จำนวน วันสูงสุด' },
                  ]}
                >
                  <InputNumber
                    className='w-full custom-input-number'
                    onChange={props.onChangeValuePirceMax}
                    min={props.minDay}
                    value={props.maxDay}
                    step={500}
                  />
                  </Form.Item>
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




// SetUpPriceListContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default SetUpPriceListContainer;