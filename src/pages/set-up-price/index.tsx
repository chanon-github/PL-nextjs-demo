/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleMasterPriceManagement - Container
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
import { ColumnsType, FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { notify } from '@/utils/functions/notification';
import {} from '@/services/rental-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import dayjs from 'dayjs';
import { ArrowLeftOutlined, EditOutlined, FileTextOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { ModalConfirmCrud } from '@/components/common';
import { fileApi } from '@/services/central-api';
import { CrtPriceTier, CrtVehicleMasterPrice, CtlContent, SaveVMasterPriceInput, VehicleMasterApiApiMasterVehicleMasterGetAllVehicleMasterPriceGetRequest, VehicleMasterOutput } from '@/services/central-api/generated';
import type { SetUpPriceContentProps, SetUpPriceListContainerProps, FormSearch, SetUpPriceForm, TableRecord, Data } from './index.model';



const SetUpPriceListContainer: NextPageWithLayout<SetUpPriceListContainerProps> = ( props: SetUpPriceListContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ packageCode, setVehicleMasterPriceCode ] = useState<string | undefined>();
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterVehicleMasterPrice, setIsVisibleFormMasterVehicleMasterPrice ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<SetUpPriceForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ imageUrl, setImageUrl ] = useState<string | undefined>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [columns, setColumns] = useState<ColumnsType<TableRecord>>([]);
  const [records, setRecords] = useState<TableRecord[]>([]);
  const [vehicleMasterIdsForFilter, setVehicleMasterIdsForFilter] = useState<Array<number | undefined>>([]);
  //** Hook for call api Example
  const useApiVehicleMasterPricGet = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetAllVehicleMasterPriceGet);
  const useApiVehicleMasterPriceGetById = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetAllVehicleMasterPriceGet);
  const useApiVehicleMasterPriceItemSave = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterSaveVehicleMasterPricePost);
  // const useApiVehicleMasterPriceItemDelete = useApi(fAQManagementApi, fAQManagementApi.apiFAQManagementDeleteDelete);

  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);

  const useApiVehicleMaster = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetGet);

  useEffect(() => {
    // formSearch.setFieldsValue({
    //   type: 'main'
    // })
    // useApiVehicleMasterPricGet.data?.items
    if (Router.isReady) {
      callApi();
      // vehicleMasterPricApiRefetch({pageIndex: pageIndex, pageSize: pageSize, });
    }
  
  }, [Router.isReady]);

  
  /** Functionality section */

  const callApi = async () => {
    const responseVehicleMaster = await useApiVehicleMaster.fetch({
      pageIndex: 1,
      pageSize: 1000,
      status: "active",
      ...constantBranch
    });
    const response = await useApiVehicleMasterPricGet.fetch({});
    const vehicleMasterIds = Array.from(new Set(Object.values(response.data?.price || {}).map(item => item.vehicleMasterId)));
    setVehicleMasterIdsForFilter(vehicleMasterIds);
    const columns = createColumns(response.data?.tier || []);
    const records = createRecords(response.data?.vehicle || [], response.data?.price || {}, response.data?.tier || []);
    setColumns(columns);
    setRecords(records);
  }
  const createColumns = (tiers: CrtPriceTier[]): ColumnsType<TableRecord> => {
    const columns: ColumnsType<TableRecord> = [
      {
        title: '',
        dataIndex: 'vehicle',
        key: 'vehicle',
      },
    ];
  
    tiers.forEach(tier => {
      columns.push({
        title: tier.name,
        dataIndex: `tier_${tier.id}`,
        key: `tier_${tier.id}`,
      });
    });
  
    // Add the action column at the end
    columns.push({
      title: '',
      key: 'action',
      render: (index, record: TableRecord) => (
        <Space>
          <Button 
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              console.log('record==>>',record)
              onClickToEdit({vehicleMasterId: record.key});
            }}
          >
          </Button>
        </Space>
      ),
    });
  
    return columns;
  };

  const createRecords = (vehicles: VehicleMasterOutput[], prices: Data['price'], tiers: CrtPriceTier[]): TableRecord[] => {
    return vehicles
    .filter(vehicle => {
      // Check if this vehicle has any price entries
      return tiers.some(tier => {
        const priceKey = `${vehicle.vehicleMasterId}:${tier.id}`;
        return priceKey in prices;
      });
    })
    .map(vehicle => {
      const record: TableRecord = {
        key: vehicle.vehicleMasterId || -1,
        vehicle: `${vehicle.brandName} ${vehicle.modelName} ${vehicle.vehicleMasterId}`,
      };

      tiers.forEach(tier => {
        const priceKey = `${vehicle.vehicleMasterId}:${tier.id}`;
        if (prices[priceKey]) {
          record[`tier_${tier.id}`] = prices[priceKey].price;
          record[`tierPriceId_${tier.id}`] = prices[priceKey].tierPriceId;
        } else {
          record[`tier_${tier.id}`] = '-';
          record[`tierPriceId_${tier.id}`] = null;
        }
      });

      return record;
    });
  };
  
  const setCodeFromPath =  () =>{
    const { packageCode } = Router.query as { packageCode: string; };
    setVehicleMasterPriceCode(packageCode);
    return packageCode;
  }

  const vehicleMasterPricApiRefetch = async (params : VehicleMasterApiApiMasterVehicleMasterGetAllVehicleMasterPriceGetRequest ) =>{
    const _packageCode = setCodeFromPath();
    console.log("packageCode==>>",_packageCode)
    const value = formSearch.getFieldsValue();
    const res = await useApiVehicleMasterPricGet.fetch({...params, 
      ...constantBranch,
      vehicleMasterId: value.vehicleMasterId
      // name: value.name,
      // code: value.code,
      // packageCode: _packageCode,
      // isActive: value.isActive,
      // type: value.type
    });
    const columns = createColumns(res.data?.tier || []);
    const records = createRecords(res.data?.vehicle || [], res.data?.price || {}, res.data?.tier || []);
    setColumns(columns);
    setRecords(records);
    return res
  } 
 
  const onClickToAdd = () => {
    setImageUrl(undefined);
    setMode("add");
    setIsVisibleFormMasterVehicleMasterPrice(true);
  }

  const onClickToEdit = async(param: {vehicleMasterId: number;}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    console.log('param==>>',param)
    setMode("edit");
    setIsVisibleFormMasterVehicleMasterPrice(true);
    // setCode(param.code);
    try {
      const res = await useApiVehicleMasterPriceGetById.fetch({
        vehicleMasterId: param.vehicleMasterId
      });
  
      const prices = res.data?.tier?.reduce<{ [key: number]: number | undefined }>((acc, tier) => {
        const tierId = tier.id || 0;  // Use 0 as a fallback if tier.id is undefined
        const priceKey = `${param.vehicleMasterId}:${tierId}`;
        const priceData = res.data?.price?.[priceKey];
        if (priceData && priceData.price != null) {  // Check if price is not null or undefined
          acc[tierId] = priceData.price;
        }
        return acc;
      }, {});
  
      antdForm.setFieldsValue({
        vehicleMasterId: param.vehicleMasterId,
        prices: prices
      });
    } catch (error) {
      console.error("Error fetching price data:", error);
      // Handle error (e.g., show error message to user)
    }
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    vehicleMasterPricApiRefetch({vehicleMasterId: value.vehicleMasterId});
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
    setIsVisibleFormMasterVehicleMasterPrice(false);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CtlContent> | SorterResult<CtlContent>[],
    extra: TableCurrentDataSource<CtlContent>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      // vehicleMasterPricApiRefetch({pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
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
    const values = antdForm.getFieldsValue();
    const formattedDataNew = Object.entries(values.prices).map(([tierId, price]) => ({ vehicleMasterId: values.vehicleMasterId, tierPriceId: Number(tierId), price: price || undefined })).filter(item => item.tierPriceId > 0);
    // const formattedDataNew= Object.entries(values.prices)
    //     .map(([tierId, price]) => ({ 
    //         vehicleMasterId: values.vehicleMasterId, 
    //         tierPriceId: Number(tierId), 
    //         price: price as number | null
    //     }))
    //     .filter(item => item.tierPriceId > 0);

    const oldData= Object.values(useApiVehicleMasterPricGet.data?.data?.price || {})
        .map(item => ({
            vehicleMasterId: item.vehicleMasterId,
            tierPriceId: item.tierPriceId,
            price: item.price || undefined
        }));

    const mergedData= oldData.map(oldItem => {
        const newItem = formattedDataNew.find(
            newItem => newItem.vehicleMasterId === oldItem.vehicleMasterId && 
                       newItem.tierPriceId === oldItem.tierPriceId
        );
        return newItem ? { ...oldItem, ...newItem } : oldItem;
    });

    formattedDataNew.forEach(newItem => {
        if (!mergedData.some(item => 
            item.vehicleMasterId === newItem.vehicleMasterId && 
            item.tierPriceId === newItem.tierPriceId
        )) {
            mergedData.push({vehicleMasterId: newItem.vehicleMasterId, tierPriceId: newItem.tierPriceId, price: newItem.price});
        }
    });
    console.log("mergedData ==>",mergedData);
    // console.log("oldData ==>",mergedData);


    useApiVehicleMasterPriceItemSave.fetch({
       saveVMasterPriceInput: mergedData
    }).then((res) => {
      if(res.data){
        vehicleMasterPricApiRefetch({});
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
    setIsVisibleFormMasterVehicleMasterPrice(false);
    antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    // useApiVehicleMasterPriceItemDelete.fetch({
    //   faqDeleteInput: {
    //     // codes: rowSelectedTable.map((code) => `${code}`),
    //     // tenantCode: constantBranch.tenantCode,
    //     // branchCode: constantBranch.branchCode
    //   }
    // }).then((res) => {
    //   if(res.data){
    //     // vehicleMasterPricApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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

  const onClickToVehicleMasterPriceItem = (params: {code: string}) => {
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
  const contentProps: SetUpPriceContentProps = {
    pageIndex,
    pageSize,
    useApiVehicleMasterPricGet,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleFormMasterVehicleMasterPrice,
    mode,
    isModalConfirmVisible,
    imageUrl,
    useApiVehicleMaster,
    columns,
    records,
    vehicleMasterIdsForFilter,
    onChangeUploadImg,
    onChangeTable,
    onClickShowModalConfirm,
    onChangeRowSelection,
    onClickToEdit,
    onClikToView,
    onClickRemove,
    onClickToAdd,
    onSubmitSerach,
    onClickToVehicleMasterPriceItem,
    onSubmitForm,
    onCloseModalForm,
    onClickClearForm,
    onCloseModalConfirm,
    onClickConfirmEdit,
    onClickConfirmDelete,
    onClickToPreviousePage
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
            <Col span={24} className='flex justify-center'>
              <Button
                className='button-primary'
                onClick={onClickToAdd}
              >
                เพิ่มข้อมูล
              </Button>
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
                name="vehicleMasterId"
                label={"Vehicle Profile"}
              >
              <Select 
                className='w-full'
                // placeholder="role"
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={
                props.useApiVehicleMaster.data?.items?.map((data) => ({
                  label: `${data.vehicleMasterName} - ${data.id}`,
                  value: data.id
                }))
                  
                }
              />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={10}>
              <Form.Item
                name="code"
                label={"รหัส รายการแพ็คเกจ"}
              >
                <Input/>
              </Form.Item>
            </Col> */}
           
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

const renderTable = (props: SetUpPriceContentProps): ReactElement => {
  return(
    <>
      <AntTable
        columns={
         props.columns
        }
        rowKey={'code'}
        dataSource = {props.records || []}
        loading = {props.useApiVehicleMasterPricGet.loading}
        size={'middle'}
        scroll={{ x: 'max-content' }}
        pagination={false}
        // onChange = {props.onChangeTable}
        // rowSelection = {{
        //     selectedRowKeys: props.rowSelectedTable,
        //     onChange: props.onChangeRowSelection,
        // }}
        // pagination={{
        //   current: props.pageIndex,
        //   pageSize: props.pageSize,
        //   total: props.useApiVehicleMasterPricGet.data?.totalItems,
        //   pageSizeOptions: [10, 15, 20, 50],
        //   // onChange: props.onChangePage,
        //   showSizeChanger: true,
        //   simple: true,
        //   showTotal: (total: number, range: [number, number]) =>  `รายการ ${range[0]}-${range[1]} จาก ${total}`,
        // }}
      />
    </>
  )
}

const renderModalCRUDForm = (props: SetUpPriceContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม price" : "แก้ไข price"}
          open={props.isVisibleFormMasterVehicleMasterPrice}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          // loading={props.useApiVehicleMasterPricGet.loading}
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
                  label = "vehicle profile"
                  name = "vehicleMasterId"
                  rules={[
                    { required: true, message: 'กรุณาเลือก vehicle profile' },
                   
                  ]}
                >
                  <Select 
                     className='w-full'
                    //  placeholder="role"
                     showSearch
                     filterOption={(input, option) =>
                       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                     }
                     options={
                       props.mode == "add" ? props.useApiVehicleMaster.data?.items?.filter((item) => !props.vehicleMasterIdsForFilter.includes(item.id)).map((data) => ({
                        label: `${data.vehicleMasterName} - ${data.id}`,
                        value: data.id
                      })) : 
                      props.useApiVehicleMaster.data?.items?.map((data) => ({
                        label: `${data.vehicleMasterName} - ${data.id}`,
                        value: data.id
                      }))
                       
                     }
                     disabled={props.mode == "edit"}
                  />
                </Form.Item>
              </Col>
              {props.useApiVehicleMasterPricGet.data?.data?.tier?.map(tier => (
                <Col xs={24} md={12} xl={12} key={tier.id}>
                  <Form.Item
                    label={tier.name}
                    name={['prices', tier?.id || -1]}
                    rules={[{ required: true, message: `กรุณากรอกราคาสำหรับ ${tier.name}` }]}
                  >
                    <InputNumber
                      className='w-full'
                      placeholder={`ราคาสำหรับ ${tier.name}`}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              ))}
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