/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterHotel - Container
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
import { vehicleMasterApi, hotelApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
// import { CrtVehicle } from '@/services/central-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import { CrtVehicleMasterVehicleMasterSearchOutputPagination, HotelApiApiMasterHotelGetGetRequest } from '@/services/central-api/generated';
import { ModalConfirmCrud } from '@/components/common';
import { constant } from 'lodash';
import { CustomButton } from '@/components/common/button/button';
import dayjs from 'dayjs';
import { EditOutlined, InfoOutlined } from '@ant-design/icons';
import type { MasterHotelContentProps, MasterHotelContainerProps, FormSearch, MasterHotelCrudContentForm } from './index.model';


const MasterHotelListContainer: NextPageWithLayout<MasterHotelContainerProps> = ( props: MasterHotelContainerProps ): ReactElement => {
  /** Hook section */
 
  
  const Router = useRouter();
    
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterHotel, setisVisibleFormMasterHotel ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<MasterHotelCrudContentForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  

  const useApiHotelGet = useApi(hotelApi,hotelApi.apiMasterHotelGetGet);
  const useApiHotelSave = useApi(hotelApi,hotelApi.apiMasterHotelSavePost);
  const useApiHotelDelete = useApi(hotelApi,hotelApi.apiMasterHotelDeleteDelete);
 
  useEffect(() => {
    hotelApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
  }, []);

  /** Functionality section */

  
  const hotelApiRefetch = async (params : HotelApiApiMasterHotelGetGetRequest) =>{
    const res = await useApiHotelGet.fetch({...params, 
      branchCode: constantBranch.branchCode, 
      tenantCode: constantBranch.tenantCode
    });
    return res
  } 
  const onChangePage = ( pageIndex: number, pageSize: number) => {
      setPageIndex(pageIndex);
      setPageSize(pageSize);
      hotelApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
  };

  const onChangePageSize = (param: {pageSize: number}) => {
      setPageSize(pageSize);
      hotelApiRefetch({pageIndex: pageIndex, pageSize: pageSize}); 
  };

  const onClickToAdd = () => {
    setMode("add");
    setisVisibleFormMasterHotel(true);
  }

  const onClickToEdit = (param: {code: string}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setisVisibleFormMasterHotel(true);
    setCode(param.code);
    hotelApiRefetch({pageIndex: 1, pageSize: 1}).then((res) => {
      antdForm.setFieldsValue({
        nameTh:  res.items?.[0].nameTh || undefined,
        nameEn:  res.items?.[0].nameEn || undefined,
        address:  res.items?.[0].address || undefined       
      })
    });
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    useApiHotelGet.fetch({ 
      pageIndex: 1, 
      pageSize: 10, 
      branchCode: constantBranch.branchCode, 
      tenantCode: constantBranch.tenantCode, 
      keyword: value.keyword
    });
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: MasterHotelCrudContentForm) =>{
    setIsModalConfirmVisible(true);
    // setMode("edit")
  }

  const onClickDeleteSelected = () =>{
    useApiHotelDelete.fetch({
      deleteInput: {
        codes: rowSelectedTable.map((code) => `${code}`),
        branchCode: constantBranch.branchCode,
        tenantCode: constantBranch.tenantCode
       
      }
    }).then((res) => {
      if(res.data){
        hotelApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
      } 
      notify({title: 'ทำการ ลบ สำเร็จ', type: 'success'});
    }).catch((err) => {
      notify({title: 'ทำการ ลบ ไม่สำเร็จ', type: 'error'});
    })
  }
  const onCloseModalForm = () =>{
    setMode("add");
    antdForm.resetFields();
    setisVisibleFormMasterHotel(false);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CrtVehicleMasterVehicleMasterSearchOutputPagination> | SorterResult<CrtVehicleMasterVehicleMasterSearchOutputPagination>[],
    extra: TableCurrentDataSource<CrtVehicleMasterVehicleMasterSearchOutputPagination>
  ) =>{
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      useApiHotelGet.fetch({
        pageIndex: pageIndex, 
        pageSize: pageSize, 
        branchCode: constantBranch.branchCode, 
        tenantCode: constantBranch.tenantCode,
        sortDirection: sortDirection || "asc", 
        sortField: sorter.field?.toLocaleString()
      })
      // responseMasterVehicle.fetch({
      //   pageIndex: pageIndex, 
      //   pageSize: pageSize, 
      //   branchCode: "00001", 
      //   tenantCode: "0001",
      //   sortDirection: sortDirection || "asc", 
      //   sortField: sorter.field?.toLocaleString()
      // });
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
     useApiHotelSave.fetch({
      masterHotelInput: {
       code: mode === "edit" ? code : undefined,
       address: value.address,
       nameTh: value.nameTh,
       nameEn: value.nameEn,
       tenantCode: constantBranch.tenantCode,
       branchCode: constantBranch.branchCode
      }
    }).then((res) => {
      if(res.data){
        useApiHotelGet.fetch({pageIndex: pageIndex, pageSize: pageSize, branchCode: constantBranch.branchCode, tenantCode: constantBranch.tenantCode});
        notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
      }
      else{
        notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
      }
    }).catch((err) => {
      notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
    })
    setisVisibleFormMasterHotel(false);
    antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    console.log("rowSelectedTable ==>", rowSelectedTable);
  }
  const contentProps: MasterHotelContentProps = {
    pageIndex,
    pageSize,
    useApiHotelGet,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleFormMasterHotel,
    mode,
    isModalConfirmVisible,
    onClickShowModalConfirm,
    onChangeRowSelection,
    onChangePage,
    onChangePageSize,
    onClickToEdit,
    onClikToView,
    onClickRemove,
    onClickToAdd,
    onSubmitSerach,
    onSubmitForm,
    onCloseModalForm,
    onClickDeleteSelected,
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
            title={
              renderOptions(contentProps)
            }
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
              {/* <Col span={24}>
                  {renderOptions(contentProps)}
              </Col> */}
              <Col span={24}>
                {renderOptionsAddAndRemove(contentProps)}
              </Col>
              <Col span={24}>
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

const renderOptionsAddAndRemove = (props: MasterHotelContentProps): ReactElement => {
  return (
    <Row gutter={[ 8, 8 ]} justify={"start"} align={"middle"}>
      <Col >
        <Button className='button-primary' onClick={props.onClickToAdd}>เพิ่ม</Button>
      </Col>
      <Button className='button-error' onClick={props.onClickShowModalConfirm}>ลบ</Button>
    </Row>
  );
}
const renderOptions = (props: MasterHotelContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch}>
        <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
        
            <Col xs={24} md={10}>
              <Form.Item
                name="keyword"
                label={"ชื่อโรงแรม"}
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
      </Form>
    </>
  )
}

const renderTable = (props: MasterHotelContentProps): ReactElement => {
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
              key: "nameTh",
              dataIndex: "nameTh",
              title: "ชื่อโรงแรม (ภาษาไทย)",
              sorter: true,
            },
            {
              key: "nameEn",
              dataIndex: "nameEn",
              title: "ชื่อโรงแรม (ภาษาอังกฤษ)",
              sorter: true,
            },
            {
              key: "address",
              dataIndex: "address",
              title: "ที่อยู่",
              sorter: true,
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
        dataSource = {props.useApiHotelGet.data?.items || []}
        loading = {props.useApiHotelGet.loading}
        size={'middle'}
        scroll={{ x: 'max-content' }}
        // onChange = {props.onChangeTable}
        rowSelection = {{
            selectedRowKeys: props.rowSelectedTable,
            onChange: props.onChangeRowSelection,
        }}
        pagination={{
          current: props.pageIndex,
          pageSize: props.pageSize,
          total: props.useApiHotelGet.data?.totalItems,
          pageSizeOptions: [10, 15, 20, 50],
          onChange: props.onChangePage,
          showSizeChanger: true,
          simple: true,
          showTotal: (total: number, range: [number, number]) =>  `รายการ ${range[0]}-${range[1]} จาก ${total}`,
        }}
      />
    </>
  )
}

const renderModalCRUDForm = (props: MasterHotelContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่มโรงแรม" : "แก้ไขโรงแรม"}
          open={props.isVisibleFormMasterHotel}
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
              <Col span={12}>
                <Form.Item
                  label = "ชื่อโรงแรม (ภาษาไทย)"
                  name = "nameTh"
                  // rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "ชื่อโรงแรม (ภาษาอังกฤษ)"
                  name = "nameEn"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label = "ที่อยู่"
                  name = "address"
                >
                  <Input.TextArea
                   rows={4}
                   className='w-full'/>
                </Form.Item>
              </Col> 
              <Col span={12}>
                <Form.Item
                  label = "สถานะ"
                  name = "status"
              
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

const renderModalConfirm = (props: MasterHotelContentProps): ReactElement =>{
  let textTitle = props.mode == "edit" ? `ยืนยันแก้ไขข้อมูล` : `ยืนยันลบข้อมูล ${props.rowSelectedTable.length} รายการ`;
  if(props.rowSelectedTable.length == 0){
    textTitle = "กรุณาเลือกรายการที่ต้องการลบ";
  }
  return(
    <Modal
      open={props.isModalConfirmVisible}
      closable={false}
      footer={null}
      centered
      width={400}
    >
      <Row gutter={[ 8, 16 ]} justify={'center'} align={'middle'}>
        <Col span={24} className='flex justify-center'>
          {
            props.mode == "edit" ? (
              <EditOutlined style={{ fontSize: '36px' }} className='bg-pl-yellow text-white rounded-full p-4'/>
            ) : (
              <InfoOutlined style={{ fontSize: '36px' }} className='bg-pl-yellow text-white rounded-full p-4'/>
            )
          }
         
        </Col>
        <Col span={24} className='flex justify-center text-xl font-semibold'>
          {textTitle}
        </Col>
        <Col>
          <Button className='button-plain' onClick={props.onCloseModalConfirm}>ยกเลิก</Button>
        </Col>
        <Col hidden={(props.rowSelectedTable.length == 0) || props.mode == "edit"}>
          <Button 
            
            className={`button-error`}
          >
           ลบ
          </Button>
        </Col>
        <Col hidden={!(props.mode == "edit")}>
          <Button 
            onClick={props.onClickConfirmEdit}
            className={`button-warning`}
          >
           แก้ไข
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

// MasterHotelListContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default MasterHotelListContainer;