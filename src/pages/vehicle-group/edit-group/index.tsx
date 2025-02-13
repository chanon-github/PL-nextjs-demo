/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleGroup - Container
 */
'use client'
import type { VehicleGroupCrudContentProps, VehicleGroupCrudContainerProps,FormSearch, GetDataParams, FormValues } from './index.model';

import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import resolveConfig from 'tailwindcss/resolveConfig';
import {
    Card,
    Row,
    Col,
    Button,
    Input,
    Select,
    Space,
    Modal,
    Table as AntTable,
    Form,
    TablePaginationConfig,
    FormInstance,
    Typography
} from 'antd';
const { Option } = Select
import {
  EditOutlined,
  InfoOutlined,
  DeleteOutlined,
  SettingOutlined,
  LeftOutlined
} from '@ant-design/icons';
import type { NextPageWithLayout } from '@/pages/_app';

import useApi from '@/hooks/api/use-api';
import useRowSelection from '@/hooks/table/useRowSelection';

import { vehicleGroupApi,vehicleTypeApi , carBrandApi, vehicleModelApi, vehicleMasterApi} from '@/services/central-api/index';
import {   CtlMstVehicleType, VehicleGroupDetailOutput, VehicleMasterSearchOutput} from '@/services/central-api/generated';
import { CustomButton } from '@/components/common/button/button';
import { CustomLoading } from '@/components/common/loading/loading';
import { ConfirmModal,ConfirmModalProps } from '@/components/common/confirm-modal/confirm-modal';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { useSelector} from 'react-redux';
import { RootState } from '@/utils/store';
import { setData } from '@/utils/action';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import Cookies from 'universal-cookie';
import _ from 'lodash';

// import Item from 'antd/es/list/Item';

// const fullConfig = resolveConfig(tailwindConfig) as TailwindConfig;

const VehicleGroupCrudContainer: NextPageWithLayout<VehicleGroupCrudContainerProps> = ( props: VehicleGroupCrudContainerProps ): ReactElement => {
  /** Hook section */
  const cookies = new Cookies();

  const groupId = cookies.get('groupId');
  // const fetchGetMasterVehicleData= useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterGetGet)

  const fetchGetDataCarBrand = useApi(carBrandApi,carBrandApi.apiMasterCarBrandGetGet)
  const fetchGetDataCarModel = useApi(vehicleModelApi,vehicleModelApi.apiMasterVehicleModelGetGet)
  const fetchGetDataCarType = useApi(vehicleTypeApi,vehicleTypeApi.apiMasterVehicleTypeGetGet)
  const fetchGetDataMasterVehicle = useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterGetGet)

  const fetchGetData = useApi(vehicleGroupApi,vehicleGroupApi.apiMasterVehicleGroupGetDetailGet)
  const fetchSaveData = useApi(vehicleGroupApi,vehicleGroupApi.apiMasterVehicleGroupSaveDetailPost)
  // const fetchRemoveData = useApi(vehicleProductApi,vehicleProductApi.)
  const { selectedRowKeysList, setSelectedRowKeysList , handleRowSelectionOne, handleRowSelectionAll } = useRowSelection();
  const Router = useRouter();
  const userData = useSelector((state: RootState) => state.user); // Access user data from Redux
  const [tenantCode,setTenantCode] = useState("0002");
  const [branchCode,setBranchCode] = useState("00002");

  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [ dataList, setDataList ] = useState<VehicleGroupDetailOutput[]|undefined>();

      //=== For Item Table ===//
      const [ pageItemTable, setPageItemTable ] = useState(1);
      const [ pageSizeItemTable, setPageSizeItemTable ] = useState(10);
      const [ totalDataItemTable, setTotalDataItemTable ] = useState<number|undefined>(0);
      const [sortOrderItemTable, setSortOrderItemTable] = useState<string | undefined>(undefined);
      const [sortColumnItemTable, setSortColumnItemTable] = useState<string | undefined>(undefined);
      //======================//

  const [ totalData, setTotalData ] = useState<number|undefined>(0);
  const [visible, setVisible] = useState<boolean>(false); 
  const [form] = Form.useForm<FormValues>();
  const [formSearch] = Form.useForm<FormSearch>();
  const [formSearchManageItem] = Form.useForm<FormSearch>();

  const [saveMode, setSaveMode] = useState<"ADD"|"EDIT"|null>(null); 
  const [dataIdForEdit, setDataIdForEdit] = useState<string|null|undefined>(null); 
  const [isLoadingPage,setIsLoadingPage] = useState<boolean>(false)
  const [isTableLoading,setIsTableLoading] = useState<boolean>(false)
   // State to control modal visibility
  const [modalProps, setModalProps] = useState<ConfirmModalProps>({
    visible: false, // Set visible to false as default
    title: 'ยืนยันแก้ไขข้อมูล',
    icon: <EditOutlined style={{ fontSize: '36px' }} />,
    confirmText: 'แก้ไข',
    cancelText: 'ยกเลิก',
    confirmButtonColor: 'bg-pl-primary',
    hoverConfirmColor: 'hover:bg-pl-primary-hover', // Optional hover color
    iconBackgroundColor: 'bg-yellow-500',
    onConfirm: undefined, // Optional, can be set when needed
    onCancel: () => {
      console.log("Modal cancelled");
    }
  });

  const [groupName, setgroupName] = useState<string>();


  useEffect(() => {

    const vehicleGroupName = cookies.get('vehicleGroupName');
    setgroupName(vehicleGroupName)

    if(!groupId){
      setModalProps({
        visible:true,
        title: "ไม่พบกลุ่มรถยนต์",
        icon: <InfoOutlined style={{ fontSize: '36px' }} />,
        cancelText: 'ปิด',
        iconBackgroundColor: 'bg-pl-yellow',
        hoverConfirmColor:'#f71d3f'
      });
    }

  // Get Al lookup Data
      fetchGetDataCarBrand.fetch({
        pageIndex:1, 
        pageSize:1000,
        tenantCode:tenantCode,
        branchCode:branchCode,          
    })
    fetchGetDataCarModel.fetch({
      pageIndex:1, 
      // brandCode:'MCB0007',
      pageSize:1000,
      tenantCode:tenantCode,
      branchCode:branchCode,          
    
    })
    fetchGetDataCarType.fetch({
      pageIndex:1, 
      pageSize:1000,
      tenantCode:tenantCode,
      branchCode:branchCode,          
    
    })

    fetchGetDataMasterVehicle.fetch({

      pageIndex: 1,
      pageSize: 1000,
      tenantCode,
      branchCode,
 
  })


    setDefaultSelectedItem()

    return () => {
      // Cleanup tasks
      console.log('Component is being unmounted');
      // cookies.remove('productId', { path: '/' }); // Remove the cookie
      // cookies.remove('groupName', { path: '/' }); // Remove the cookie
    };
  }, []); 

  useEffect(() => {
   
    //First Render//
      getData({
        currentPage: page,
        currentPageSize: pageSize,
        sortOrder: "desc",
        sortField: "updateTimestamp",
      });

  }, []);
      
  
  /** Functionality section */

    const getData = async ({
      currentPage,
      currentPageSize,
      sortOrder = "desc",
      sortField = "updateTimestamp",
      keywordSearch,
      status,
      isLoadingTable = false,
      carBrand,
      carModel,
      carType,
      carChassisNo
    }: GetDataParams) => {


      if (isLoadingTable) {
        setIsTableLoading(true);
      }else{
        setIsLoadingPage(true);
      }
    
      try {
        const res = await fetchGetData.fetch({
          pageIndex: currentPage,
          pageSize: currentPageSize,
          keyword: keywordSearch,
          tenantCode,
          branchCode,
          sortField,
          sortDirection: sortOrder,
          groupId:groupId

          // brandCode: carBrand,
          // modelCode: carModel,
          // carType,
          // carChassisNo,
          // productId:productId
        })
        if (res && res.items) {
          setDataList(res.items);
          setTotalData(res.totalItems);
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        // Handle the error (e.g., show a notification or update error state)
        // setErrorState(true); // Example for setting an error state
      } finally {
        setIsLoadingPage(false);
        setIsTableLoading(false);
      }
    };
  
  
  const setDefaultSelectedItem =async () =>{

        const resGetVehicleItem = await  fetchGetDataMasterVehicle.fetch({
          pageIndex: 1,
          pageSize: 1000,
          tenantCode,
          branchCode,
        })
        const vehicleMasterData = resGetVehicleItem.items
        const resGetSelectedVehicleItemProduct = await  fetchGetData.fetch({
          pageIndex: 1,
          pageSize: 1000,
          tenantCode,
          branchCode,
          groupId:groupId
        })
        const selectedVehicleItemProduct = resGetSelectedVehicleItemProduct.items



        console.log("vehicleMasterData",vehicleMasterData)
        console.log("selectedVehicleItemProduct",selectedVehicleItemProduct)
      

          // Extract IDs from both data arrays
          // const ids1 = vehicleMasterData?.map(item => item.id);
          // const ids2 = selectedVehicleItemProduct?.map(item => item.vehicleMasterId);

          // // Find common IDs
          // const sameIDList = _.intersection(ids1, ids2);


          const ids1 = vehicleMasterData?.map(item => Number(item.id)); // Ensure ids are numbers
          const ids2 = selectedVehicleItemProduct?.map(item => Number(item.vehicleMasterId)); // Ensure ids are numbers

          // Find common IDs and ensure the result is a number[]
          const sameIDList: number[] = _.intersection(ids1, ids2).filter(Boolean); // Filter out any falsy values (e.g., null, undefined)

          console.log("sameIDList",sameIDList)
          setSelectedRowKeysList((prevKeys) => [...prevKeys, ...sameIDList])

  } 
  

  const handleCloseModal = () => {
    console.log('handleCloseModal::');
    Router.push(`/vehicle-group`);
    setModalProps({
      visible:false,
    });
  };

    const onChangePage = async (
      page: number, pageSize: number
    ) => {
      console.log('page==>>',page)
      console.log('pageSize==>>',pageSize)
 
        setPage(page);
        setPageSize(pageSize);

        await getData({
          currentPage: page,
          currentPageSize: pageSize,
          sortOrder,
          sortField: sortColumn,
          isLoadingTable:true
        });

        // getData(page,pageSize,sortOrder,sortColumn)
        
       
    };

    const onChangePageSize = (param: {pageSize: number}) => {
        setPageSize(pageSize);
    };

    const onClickToAdd = () => {
   
      setSaveMode("ADD")
      setVisible(true);

    }

    const onClickToEdit = async (param: {id: string}) => {
      setSaveMode("EDIT")
      try {

        const res = await vehicleTypeApi.apiMasterVehicleTypeGetGet( 
          {
            code:param?.id,
            pageIndex:1, 
            pageSize:1,
            tenantCode:tenantCode,
            branchCode:branchCode,
          }
        )       
    
        // Check if the response contains data
        if (res && res?.data?.items && res?.data?.items?.length>0 ) {
          // // Set the form values with the data
          const responseData = res.data.items[0]; 
          setDataIdForEdit(responseData?.code)
          form.setFieldsValue({
            typeName: responseData.type || '' , 
            status: responseData.status || 'active', 
          });
          setVisible(true);
        } 
        else {
          console.warn("No data found for this vehicle.");
          form.resetFields(); 
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
      

    }

    const onSubmitSearch = () =>{
      formSearch
      .validateFields()
      .then((values) =>{
      
        getData({
          currentPage: page,
          currentPageSize: pageSize,
          // keywordSearch:values.typeName,
          status:values.status,
          isLoadingTable:true,
          carBrand:values.carBrand,
          carModel:values.carModel,
          carType:values.carType,
          carChassisNo:values.chassisNo
        });

      })
      // setSelectedRowKeysList([])      

    }


    const onClearSearch = () =>{
      formSearch.resetFields();

    }

    const onCloseFormModal = (): void => {
      setDefaultSelectedItem()
      setVisible(false);
      formSearchManageItem.resetFields()
    };

    const onSaveFormModal = async () =>{
        console.log("selectedRowKey",selectedRowKeysList)
        console.log("groupId",groupId)
        const numberSelectedRowKeysList = selectedRowKeysList.map(key => Number(key));

        const paramForEdit = {
          "groupId": groupId,
          "masterId": numberSelectedRowKeysList,
          "tenantCode": tenantCode,
          "branchCode": branchCode
        }

        setModalProps({
          visible:true,
          title: 'ยืนยันแก้ไขข้อมูล',
          icon: <EditOutlined style={{ fontSize: '36px' }} />,
          confirmText: 'แก้ไข',
          cancelText: 'ยกเลิก',
          confirmButtonColor: 'bg-pl-yellow',
          iconBackgroundColor: 'bg-yellow-500',
          onConfirm: async () => {
            // Save logic for edit
            
            setIsLoadingPage(true);
            fetchSaveData.fetch({vehicleGroupDetailInput :paramForEdit}).then(() => {
                  getData({
                    currentPage: page,
                    currentPageSize: pageSize,
                    isLoadingTable:false
                  });
              })
              .finally(() => {
                // setIsLoadingPage(false);
                setVisible(false); // Close the modal after submission
                form.resetFields(); // Reset form fields
                setIsLoadingPage(false);
                setModalProps({
                  visible:false,
                });
              });
          },
        });

    }

    const onHandleTableChange= (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlMstVehicleType> | SorterResult<CtlMstVehicleType>[] ,
      extra: TableCurrentDataSource<CtlMstVehicleType>
    ) =>{

          //--- when sort,paging,filter trigger this func ---// 
          if (extra.action==='sort') {


            if (!Array.isArray(sorter)) {

              const { field, order } = sorter;
    
              console.log(`Fetching sorted data for column: ${field}, order: ${order}`);
          
                let sortOrder = undefined
                const sortField = field?.toLocaleString()
                if(order==="descend"){
                  sortOrder = 'desc'
                }else if (order === "ascend"){
                  sortOrder = 'asc'
                }
          
                setSortOrder(sortOrder);
                setSortColumn(sortField);
                getData({
                  currentPage: page,
                  currentPageSize: pageSize,
                  sortOrder:sortOrder,
                  sortField: sortField,
                  isLoadingTable:true
                });
            }
             
            }else{
              //--- other action... ---//
            }
      

    }




    const onHandleTableItemChange= (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlMstVehicleType> | SorterResult<CtlMstVehicleType>[] ,
      extra: TableCurrentDataSource<CtlMstVehicleType>
    ) =>{

          //--- when sort,paging,filter trigger this func ---// 
          if (extra.action==='sort') {


            if (!Array.isArray(sorter)) {

              const { field, order } = sorter;
    
              console.log(`Fetching sorted data for column: ${field}, order: ${order}`);
          
                let sortOrder = undefined
                const sortField = field?.toLocaleString()
                if(order==="descend"){
                  sortOrder = 'desc'
                }else if (order === "ascend"){
                  sortOrder = 'asc'
                }
          
                setSortOrderItemTable(sortOrder);
                setSortColumnItemTable(sortField);
                fetchGetDataMasterVehicle.fetch({
                  pageIndex: pageItemTable,
                  pageSize: pageSizeItemTable,
                  tenantCode,
                  branchCode,
                });
            }
             
            }else{
              //--- other action... ---//
            }
      

    }

    const onClearSearchItemTable = () =>{
      formSearchManageItem.resetFields();

    }
    const onChangePageTableItem = async (
      page: number, pageSize: number
    ) => {
  
 
        setPageItemTable(page);
        setPageSizeItemTable(pageSize);

        fetchGetDataMasterVehicle.fetch({
          pageIndex: pageItemTable,
          pageSize: pageSizeItemTable,
          sortDirection:sortOrderItemTable,
          sortField:sortColumnItemTable,
          tenantCode,
          branchCode,
        });


    };

    const onSubmitSearchItemTable = () =>{
      formSearchManageItem
      .validateFields()
      .then((values) =>{
          setIsTableLoading(true)

          fetchGetDataMasterVehicle.fetch({

            pageIndex: pageItemTable,
            pageSize: pageSizeItemTable,
            tenantCode,
            branchCode,
            brandCode:values.carBrand,
            modelCode:values.carModel,
            
            // vehicleType ==> wait api...
            status:values.status
        
        })
      })
      .finally(() => {
            setIsTableLoading(false)
      });

    }

    const contentProps: VehicleGroupCrudContentProps = {
        page,
        pageSize,
        dataList,
        totalData,
        visible,
        form,
        isLoadingPage,
        saveMode,
        selectedRowKeysList,
        isTableLoading,
        groupName,
        carBrandLookupData:fetchGetDataCarBrand.data?.items,
        carModelLookupData:fetchGetDataCarModel.data?.items,
        carTypeLookupData:fetchGetDataCarType.data?.items,
        vehicleItemList:fetchGetDataMasterVehicle.data?.items || undefined,
        formSearchManageItem,
        
        onChangePage,
        // onChangePageSize,
        // onClickToEdit,
        // onSaveVehicleItemList,
        // onClickToManageCarProduct,
        // onClickRemove,
        onClickToAdd,
        onSubmitSearch,
        onClearSearch,
        onCloseFormModal,
        onSaveFormModal,
        // onSubmitSearchManageItem,
        // onClearSearchManageItem,
        // onSetSelectedValue,
        onHandleTableChange,
        onHandleRowSelectionOne:handleRowSelectionOne,
        onHandleRowSelectionAll:handleRowSelectionAll,
        // showTotal,



         //=== For Item Table ===//
      pageItemTable,
      pageSizeItemTable,
      totalDataItemTable,
      onHandleTableItemChange,
      onChangePageTableItem,
      onSubmitSearchItemTable,

      vehicleMasterList: fetchGetDataMasterVehicle.data?.items || undefined,
      onClearSearchItemTable



    };


    return (
      <>
        <Row gutter={[ 8, 16 ]}>
          <Col span={24}>
              <Card  
                className={'shadow-effect p-5'} 
                title={<Typography.Title  level={3}>
                  <Space >
                    <Button
                      type="default"
                      shape="circle"
                      className='mr-2'
                      icon={<LeftOutlined  />}
                      onClick={() => {
                        Router.push(`/vehicle-group`);
                        cookies.remove('groupId');  
                        cookies.remove('vehicleGroupName');  
                      }}
                    />
                  </Space>
                  <label>
                    {groupName}
                   </label>
                </Typography.Title>}
              >
                  <Row gutter={[ 8, 8 ]}>
                  {/* /// ==================================================== ///    */}
                  
                  <Col span={24}>
                      <Card className="shadow-effect" bodyStyle={{ padding: 24 }}>
                      
                        <Form
                          onFinish={() => {}}
                          className="flex flex-col md:space-y-4"
                          labelAlign="left" 
                          form={formSearch}
                        >
                        
                          <Row gutter={[16, 16]} justify="start"> 
                          

                          <Col xs={24} md={10}> 
                              <Form.Item
                                name="carBrand"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ยี่ห้อรถ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                              <Select placeholder="เลือกยี่ห้อรถยนต์"
                                      // onChange={props.onCarBrandChange}
                               >
                                    {fetchGetDataCarBrand.data?.items?.map((item) => (
                                      <Option key={item.code} value={item.code}>
                                    {item.brandName}
                                  </Option>
                                ))}
                          </Select>
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="carModel"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    รุ่นรถ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select placeholder="เลือกยี่ห้อรถยนต์">
                                    {fetchGetDataCarModel.data?.items?.map((item) => (
                                      <Option key={item.id} value={item.id}>
                                          {item.modelName}
                                      </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="carType"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ประเภทรถ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select placeholder="เลือกประเภทรถยนต์">
                                    {fetchGetDataCarType.data?.items?.map((item) => (
                                      <Option key={item.code} value={item.code}>
                                          {item.type}
                                      </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                          
                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="status"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    สถานะ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select className="w-full" placeholder="เลือกสถานะ" allowClear>
                                  <Option value="ทั้งหมด">ทั้งหมด</Option>
                                  <Option value="active">ใช้งาน</Option>
                                  <Option value="inactive">ไม่ใช้งาน</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            
                          </Row>

                        </Form>

                        
                        <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 mt-4 w-full">
                          <CustomButton
                            text="ล้าง"
                            // type="primary"
                            className="bg-white text-pl-primary border-pl-primary !important w-full md:w-auto"
                            // hoverColor={'#ffffff03'}
                            onClick={onClearSearch}
                          />
                          <CustomButton
                            text="ค้นหา"
                            type="primary"
                            className="bg-pl-primary text-white border-none !important w-full md:w-auto"
                            onClick={onSubmitSearch}
                          />
                        </div>
                      </Card>
                    </Col>

                {/* /// ======================================================= //// */}

                      <Col span={24} className="mt-10">
                          {renderOptions(contentProps)}
                      </Col>
                      <Col span={24}>
                          {/* {props.stockId !==  0  &&  renderTable(props)} */}
                          {renderTable(contentProps)}
                      </Col>

                      {renderModalForm(contentProps)}
                                
                      <ConfirmModal
                          visible={modalProps.visible}
                          title={modalProps.title}
                          icon={modalProps.icon}
                          confirmText={modalProps.confirmText}
                          cancelText={modalProps.cancelText}
                          onConfirm={modalProps.onConfirm}
                          onCancel={handleCloseModal}
                          confirmButtonColor={modalProps.confirmButtonColor}
                          hoverConfirmColor={modalProps.hoverConfirmColor}
                          iconBackgroundColor={modalProps.iconBackgroundColor}
              

                        />

                        {isLoadingPage && <CustomLoading />}
                  </Row>
              </Card>
              
          </Col>
        </Row>
      </>
    );
}


const renderOptions = (props: VehicleGroupCrudContentProps): ReactElement => {
  return (
    <>
      <Row align={'middle'} justify={'space-between'}>
      
     
        <Col>
 
          <CustomButton text="เพิ่ม" onClick={props.onClickToAdd} type="primary"  className="bg-pl-primary text-white border-none mr-2 !important "></CustomButton>
          {/* <CustomButton text="ลบ" onClick={props.onClickRemove} type="primary" hoverColor='#f71d3f' className="bg-pl-red !important "></CustomButton> */}

        </Col>
      </Row>
    </>
  )
}


const renderTable = (props: VehicleGroupCrudContentProps): ReactElement => {

  const onShowTotal = (total: number,range:[number,number]) => `รายการ ${range[0]}-${range[1]} จาก ${total}`;

  return (
    <>
      <AntTable
        rowKey={'id'}
        columns={[
          {
            dataIndex: "no",
            title: "ลำดับ",
            sorter: false,
            render: (_, __, index: number) => (props.page - 1) * props.pageSize + index + 1,
            

            width: 100,
          },
          {
            dataIndex: "brandName",
            title: "ยี่ห้อรถ",
            sorter: true,
            ellipsis: true,
            width: 200, // Set a fixed width
          },
          {
            dataIndex: "modelName",
            title: "รุ่นรถ",
            sorter: true,
            ellipsis: true,
            width: 200, // Set a fixed width
          },
          {
            dataIndex: "vehicleTypeName",
            title: "ประเภทรถ",
            sorter: true,
            ellipsis: true,
            width: 200, // Set a fixed width
          },
      
          {
            dataIndex: "status",
            title: "สถานะ",
            sorter: true,
            width: 150, // Optional: set a width for consistency
          },
        
        ]}

        dataSource={props.dataList}
        size={'middle'}
        scroll={{ x: 'max-content' }}
        onChange={props.onHandleTableChange}
        showSorterTooltip={false}
        loading={props.isTableLoading}
        // style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
        pagination={{
          current: props.page,
          pageSize: props.pageSize,
          total: props.totalData,
          pageSizeOptions: [10, 15, 20, 50],
          onChange: props.onChangePage,
          showSizeChanger: true,
          simple: true,
          showTotal: (total: number, range: [number, number]) => onShowTotal(total, range),
        }}
      />
    </>
  );
}

const renderEditCarTable = (props: VehicleGroupCrudContentProps): ReactElement => {

  const onShowTotal = (total: number,range:[number,number]) => `รายการ ${range[0]}-${range[1]} จาก ${total}`;

  return (
    <>
      <AntTable
        rowKey={'id'}
        columns={[
          {
            dataIndex: "no",
            title: "ลำดับ",
            sorter: false,
            render: (_, __, index: number) => (props.page - 1) * props.pageSize + index + 1,
            

            width: 100,
          },
          {
            dataIndex: "brandName",
            title: "ยี่ห้อรถ",
            sorter: true,
            ellipsis: true,
            width: 200, // Set a fixed width
          },
          {
            dataIndex: "modelName",
            title: "รุ่นรถ",
            sorter: true,
            ellipsis: true,
            width: 200, // Set a fixed width
          },
          {
            dataIndex: "vehicleTypeName",
            title: "ประเภทรถ",
            sorter: true,
            ellipsis: true,
            width: 200, // Set a fixed width
          },
      
          {
            dataIndex: "status",
            title: "สถานะ",
            sorter: true,
            width: 150, // Optional: set a width for consistency
          },
          {
            dataIndex: "updateTimestamp",
            title: "แก้ไขล่าสุด",
            sorter: true,
            render: (item) => 
              item ? dayjs(item).format('DD/MM/YYYY') : "-",
            width: 150, // Optional: set a width for consistency
          },
          {
            dataIndex: "updateBy",
            title: "แก้ไขโดย",
            sorter: true,
            width: 150, // Optional: set a width for consistency
          }
        ]}
        rowSelection={{   
            selectedRowKeys: props.selectedRowKeysList,
            onSelect: props.onHandleRowSelectionOne,
            onSelectAll:props.onHandleRowSelectionAll}}
        dataSource={props.vehicleItemList}
        size={'middle'}
        scroll={{ x: 'max-content' }}
        onChange={props.onHandleTableChange}
        showSorterTooltip={false}
        loading={props.isTableLoading}
        // style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
        pagination={{
          current: props.page,
          pageSize: props.pageSize,
          total: props.totalData,
          pageSizeOptions: [10, 15, 20, 50],
          onChange: props.onChangePage,
          showSizeChanger: true,
          simple: true,
          showTotal: (total: number, range: [number, number]) => onShowTotal(total, range),
        }}
      />
        <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 mt-4 w-full">

          <CustomButton
            text="ยกเลิก"
            onClick={props.onCloseFormModal}
            className="bg-white text-pl-primary border-pl-primary !important w-full md:w-auto mr-3"
          />             
          <CustomButton
            text="บันทึก"
            type="primary"
            className="bg-pl-primary text-white border-none !important w-full md:w-auto"
            // onClick={props.onSaveVehicleItemList}
            onClick={props.onSaveFormModal}   
          />
          </div>
    </>
  );
}

const renderModalForm = (props: VehicleGroupCrudContentProps): ReactElement => {
  // console.log("fetchGetVehicleTypeData",props.getVehicleTypeData)
  return(
    <>
            <Modal
                // title={props.saveMode === "ADD" ? "เพิ่ม Product" : "แก้ไข Product"}
                title={ "จัดการ"+props.groupName }
                visible={props.visible}
                onOk={props.onSaveFormModal}
                onCancel={props.onCloseFormModal}
                centered
                width={1200}
                footer={null}
              >
          <Row gutter={[ 8, 16 ]}>
            <Col span={24}>
              <Card  
                className={'shadow-effect'} 
             
                headStyle={{ padding: 24 }}
                bodyStyle={{ padding: 24 }}
              >
                  <Row gutter={[ 8, 8 ]}>
                  {/* /// ==================================================== ///    */}
                  
                  <Col span={24}>
                      
                        <Form
                          onFinish={() => {}}
                          className="flex flex-col md:space-y-4"
                          labelAlign="left" 
                          form={props.formSearchManageItem}
                        >                   
                          <Row  justify="start"> 
                          <Col xs={24} md={10}> 
                              <Form.Item
                                name="carBrand"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ยี่ห้อรถ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                              <Select placeholder="เลือกยี่ห้อรถยนต์"
                                      // onChange={props.onCarBrandChange}
                               >
                                    {props?.carBrandLookupData?.map((item) => (
                                      <Option key={item.code} value={item.code}>
                                    {item.brandName}
                                  </Option>
                                ))}
                          </Select>
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="carModel"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    รุ่นรถ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select placeholder="เลือกยี่ห้อรถยนต์">
                                    {props.carModelLookupData?.map((item) => (
                                      <Option key={item.id} value={item.id}>
                                          {item.modelName}
                                      </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="carType"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ประเภทรถ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select placeholder="เลือกประเภทรถยนต์">
                                    {props.carTypeLookupData?.map((item) => (
                                      <Option key={item.code} value={item.code}>
                                          {item.type}
                                      </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>

                        
                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="status"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    สถานะ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select className="w-full" placeholder="เลือกสถานะ" allowClear>
                                  <Option value="ทั้งหมด">ทั้งหมด</Option>
                                  <Option value="active">ใช้งาน</Option>
                                  <Option value="inactive">ไม่ใช้งาน</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            
                          </Row>

                        </Form>

                        
                        <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4  w-full">
                          <CustomButton
                            text="ล้าง"
                            // type="primary"
                            className="bg-white text-pl-primary border-pl-primary !important w-full md:w-auto"
                            // hoverColor={'#ffffff03'}
                            onClick={props.onClearSearchItemTable}
                          />
                          <CustomButton
                            text="ค้นหา"
                            type="primary"
                            className="bg-pl-primary text-white border-none !important w-full md:w-auto"
                            onClick={props.onSubmitSearchItemTable}
                          />
                        </div>
                    </Col>

                {/* /// ======================================================= //// */}

                      <Col span={24} className="mt-1">
                          {/* {renderOptions(contentProps)} */}
                      </Col>
                      <Col span={24}>
                          {/* {props.stockId !==  0  &&  renderTable(props)} */}
                          {renderEditCarTable(props)}
                      </Col>

                      {/* {renderModalForm(props)} */}
                            
                          </Row>
                      </Card>
                      
                  </Col>
                </Row>
                </Modal>

    </>
  )
}





export default VehicleGroupCrudContainer;