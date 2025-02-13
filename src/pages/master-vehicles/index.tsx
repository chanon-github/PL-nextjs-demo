/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterVehicles - Container
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
import type { MasterVehiclesContentProps, MasterVehiclesContainerProps, FormSearch, MasterVehiclesCrudContentForm } from './index.model';
import { vehicleMasterApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
// import { CrtVehicle } from '@/services/central-api/generated';
import { CrtVehicleMasterVehicleMasterSearchOutputPagination } from '@/services/central-api/generated';


const MasterVehiclesListContainer: NextPageWithLayout<MasterVehiclesContainerProps> = ( props: MasterVehiclesContainerProps ): ReactElement => {
  /** Hook section */
 const Router = useRouter();
  
  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ id, setId ] = useState(-1);
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterVehicle, setIsVisibleFormMasterVehicle ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<MasterVehiclesCrudContentForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  
  const responseMasterVehicle = useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterGetGet);
  const responseSaveMasterVehicle = useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterSavePost);
  const responseDeleteMasterVehicle = useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterDeleteDelete)

  useEffect(() => {
    responseMasterVehicle.fetch({pageIndex: page, pageSize: pageSize, branchCode: "00001", tenantCode: "0001"});
  }, []);

  
  /** Functionality section */

  
    const onChangePage = ( page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);
        responseMasterVehicle.fetch({pageIndex: page, pageSize: pageSize, branchCode: "00001", tenantCode: "0001"});
    };

    const onChangePageSize = (param: {pageSize: number}) => {
        setPageSize(pageSize);
        responseMasterVehicle.fetch({pageIndex: page, pageSize: pageSize});
    };

    const onClickToAdd = () => {
      setMode("add");
      setIsVisibleFormMasterVehicle(true);
    }

    const onClickToEdit = (param: {id: number}) => {
      // Router.push(`/master-vehicles/edit/${param.id}`);
      setMode("edit");
      setIsVisibleFormMasterVehicle(true);
      setId(param.id);
      responseMasterVehicle.fetch({pageIndex: 1, pageSize: 1,branchCode: "00001", tenantCode: "0001", id: param.id}).then((res) => {
        antdForm.setFieldsValue({
          // colorCode: res.items?.[0].colorCode || undefined,
          // brandCode: res.items?.[0].brandCode || undefined,
          // chassisNo: res.items?.[0].chassisNo || undefined,
          // door: res.items?.[0].door || undefined,
          // engineSize: res.items?.[0].engineSize || undefined,
          // fuelCode: res.items?.[0].fuelCode || undefined,
          // gearCode: res.items?.[0].gearCode || undefined,
          // licensePlate: res.items?.[0].licensePlate || undefined,
          // modelCode: res.items?.[0].modelCode || undefined,
          // price: res.items?.[0].price || undefined,
          // seat: res.items?.[0].seat || undefined,
          // status: res.items?.[0].status || undefined,
          // vehicleTypeCode: res.items?.[0].vehicleTypeCode || undefined,
          // year: Number(res.items?.[0].year) || undefined
        })
      });
    }

    const onClickRemove = (param: {id: number}) => {
        
    }

    const onClikToView = (param: {id: number}) => {
       Router.push(`/master-vehicles/view/${param.id}`);
    }

    const onSubmitSerach = (value: FormSearch) =>{
      responseMasterVehicle.fetch({pageIndex: 1, pageSize: 10, branchCode: "00001", tenantCode: "0001", keyword: value.search});
    }

    const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
      setRowSelectedTable(selectedRowKeys);
    }

    const onSubmitForm = (value: MasterVehiclesCrudContentForm) =>{
      // console.log("value===>>>",value.status)
      responseSaveMasterVehicle.fetch({
        masterVehicleInput:{
          // id: mode == "edit" ? id : undefined,
          // chassisNo: value.chassisNo,
          // colorCode: value.colorCode,
          // door: value.door,
          // engineSize: value.engineSize,
          // fuelCode: value.fuelCode,
          // gearCode: value.gearCode,
          // licensePlate: value.licensePlate,
          // modelCode: value.modelCode,
          // price: value.price,
          // seat: value.seat,
          // status: value.status,
          // vehicleTypeCode: value.vehicleTypeCode,
          // year: String(value.year),
          // brandCode: value.brandCode,
          // tenantCode: "0001",
          // branchCode: "00001"
        }
      }).then((res) => {
        responseMasterVehicle.fetch({pageIndex: page, pageSize: pageSize, branchCode: "00001", tenantCode: "0001"});
        notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
      }).catch((err) => {
        notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
      })
      setIsVisibleFormMasterVehicle(false);
      antdForm.resetFields();
    }

    const onClickDeleteSelected = () =>{
      responseDeleteMasterVehicle.fetch({
        carrentalDeleteInput: {
          id: rowSelectedTable.map((id) => Number.parseInt(id.toString())),
          tenantCode: "0001",
          branchCode: "00001"
        }
      }).then((res) => {
        responseMasterVehicle.fetch({pageIndex: page, pageSize: pageSize, branchCode: "00001", tenantCode: "0001"});
        notify({title: 'ทำการ ลบ สำเร็จ', type: 'success'});
      }).catch((err) => {
        notify({title: 'ทำการ ลบ ไม่สำเร็จ', type: 'error'});
      })
    }
    const onCloseModalForm = () =>{
      antdForm.resetFields();
      setIsVisibleFormMasterVehicle(false);
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
        responseMasterVehicle.fetch({
          pageIndex: page, 
          pageSize: pageSize, 
          branchCode: "00001", 
          tenantCode: "0001",
          sortDirection: sortDirection || "asc", 
          sortField: sorter.field?.toLocaleString()
        });
      }
    }

    const contentProps: MasterVehiclesContentProps = {
        page,
        pageSize,
        responseMasterVehicle,
        rowSelectedTable,
        antdForm,
        formSearch,
        isVisibleFormMasterVehicle,
        mode,
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
        // onChangeTable
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
        </Row>
        {renderModalCRUDForm(contentProps)}
    </>
  );
}

const renderOptionsAddAndRemove = (props: MasterVehiclesContentProps): ReactElement => {
  return (
    <Row gutter={[ 8, 8 ]} justify={"start"} align={"middle"}>
      <Col >
        <Button className='button-green' onClick={props.onClickToAdd}>เพิ่ม</Button>
      </Col>
      <Col>
        <Popconfirm
          title={(
            <Typography.Text>
                ต้องการ ที่จะลบ<br/>
                ยืนยันหรือไม่ ?
            </Typography.Text>
          )}
          trigger={'click'}
          okText={'ยืนยัน'}
          onConfirm={ props.onClickDeleteSelected }
          okButtonProps={{ size: 'middle',
            disabled: (props.rowSelectedTable.length === 0),
            className: 'button-green',
          }}
          
          cancelText={'ยกเลิก'}
          cancelButtonProps={{ size: 'middle' }}
        >
          <Button className='button-error'>ลบ</Button>
        </Popconfirm>
        {/*  */}
      </Col>
    </Row>
  );
}
const renderOptions = (props: MasterVehiclesContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch}>
        <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
        
            <Col xs={24} md={10}>
              <Form.Item
                name="search"
                label={"ประเภทรถยนต์"}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="statusSearch"
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
                <Button className='button-green' htmlType='submit'>ค้นหา</Button>
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

const renderTable = (props: MasterVehiclesContentProps): ReactElement => {
  return(
    <>
      <AntTable
        columns={
          [
            {
              key: "no",
              dataIndex: "no",
              title: "ลำดับ",                
              render: (_, __, idx) => (
                <Typography.Text>
                    { ((props.page - 1) * props.pageSize) + idx + 1 }
                </Typography.Text>
              )
            },
            {
              key: "chassisNo",
              dataIndex: "chassisNo",
              title: "chassisNo",
            },
            {
              key: "status",
              dataIndex: "status",
              title: "status",
              render: (_, record) =>{
                let textStatus = "unknow";
                switch (record.status) {
                  case "active":
                    textStatus = "ใช้งาน";
                    break;
                  case "inactive":
                    textStatus = "ไม่ใช้งาน";
                    break;
                }
                return  <Tag color={`${record.status == "active" ? "success" : "error"}`}>{textStatus}</Tag>
              }
            },
            {
              key: "year",
              dataIndex: "year",
              title: "year",
            },
            {
              key: "branchCode",
              dataIndex: "branchCode",
              title: "branchCode",
            },
            {
              key: "brandCode",
              dataIndex: "brandCode",
              title: "brandCode",
            },
            {
              key: "createBy",
              dataIndex: "createBy",
              title: "createBy",
              sorter: true,
            },
            {
              key: "updateBy",
              dataIndex: "updateBy",
              title: "updateBy",
                sorter: true,
            },
            {
              key: "actions",
              title: "เพิ่มเติม",
              render: (_, record) => {
                return (
                  <Space>
                    <Button type={'default'} onClick={() => props.onClickToEdit({id: record.id || -1})}>Edit</Button>
                  </Space>
                )
              }
            }
          ]
        }
        rowKey={'id'}
        dataSource = {props.responseMasterVehicle.data?.items || []}
        loading = {props.responseMasterVehicle.loading}
        // onChange = {props.onChangeTable}
        rowSelection = {{
            selectedRowKeys: props.rowSelectedTable,
            onChange: props.onChangeRowSelection,
        }}
        pagination = {{
          current: props.page,
          pageSize: props.pageSize,
          total: props.responseMasterVehicle.data?.totalItems || 0,
          pageSizeOptions: [10, 15, 20, 50],
          showSizeChanger: true,
          onChange: props.onChangePage,

        }}
      />
    </>
  )
}

const renderModalCRUDForm = (props: MasterVehiclesContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม" : "แก้ไข"}
          open={props.isVisibleFormMasterVehicle}
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
                  label = "chassisNo"
                  name = "chassisNo"
                  // rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "year"
                  name = "year"
                >
                  <InputNumber className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "licensePlate"
                  name = "licensePlate"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "price"
                  name = "price"
                >
                  <InputNumber className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "brandCode"
                  name = "brandCode"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "modelCode"
                  name = "modelCode"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "fuelCode"
                  name = "fuelCode"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "colorCode"
                  name = "colorCode"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "engineSize"
                  name = "engineSize"
                >
                  <InputNumber className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "vehicleTypeCode"
                  name = "vehicleTypeCode"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "door"
                  name = "door"
                >
                  <InputNumber className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "seat"
                  name = "seat"
                >
                  <InputNumber className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "gearCode"
                  name = "gearCode"
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "status"
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
                <Button className='button-plain'>ยกเลิก</Button>
              </Col>
              <Col>
                <Button className='button-green' htmlType='submit'>บันทึก</Button>
              </Col>
            </Row>
          </Form>
        </Modal>
  )
}

// MasterVehiclesListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default MasterVehiclesListContainer;