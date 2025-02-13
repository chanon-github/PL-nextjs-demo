

import type { VehicleItemContentProps, VehicleItemContainerProps, FormValues,GetDataParams, FormSearch } from './index.model';



/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleColor - Container
 */
import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
    
} from 'antd';
const { Option } = Select
import {
  EditOutlined,
  InfoOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { NextPageWithLayout } from '@/pages/_app';

import useApi from '@/hooks/api/use-api';
import useRowSelection from '@/hooks/table/useRowSelection';

import {  carBrandApi, colorApi, vehicleModelApi  ,vehicleItemApi , vehicleLocationApi,vehiclePortApi, vehicleMasterApi} from '@/services/central-api/index';
import { 

  VehicleItemSearchOutput,

} from '@/services/central-api/generated';
import { CustomButton } from '@/components/common/button/button';
import { CustomLoading } from '@/components/common/loading/loading';
import { ConfirmModal,ConfirmModalProps } from '@/components/common/confirm-modal/confirm-modal';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { useSelector} from 'react-redux';
import { RootState } from '@/utils/store';
import { setData } from '@/utils/action';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

// const fullConfig = resolveConfig(tailwindConfig) as TailwindConfig;



const VehicleItemListContainer: NextPageWithLayout<VehicleItemContainerProps> = ( props: VehicleItemContainerProps ): ReactElement => {
  /** Hook section */
  
  const fetchGetMasterVehicleData= useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterGetGet)

  const fetchGetDataCarBrand = useApi(carBrandApi,carBrandApi.apiMasterCarBrandGetGet)
  const fetchGetDataCarModel = useApi(vehicleModelApi,vehicleModelApi.apiMasterVehicleModelGetGet)
  const fetchGetDataColor = useApi(colorApi,colorApi.apiMasterColorGetGet)
  const fetchGetDataPort = useApi(vehiclePortApi,vehiclePortApi.apiMasterVehiclePortGetGet)
  const fetchGetDataLocation = useApi(vehicleLocationApi,vehicleLocationApi.apiMasterVehicleLocationGetGet)

  const fetchGetDataVehicleItem = useApi(vehicleItemApi,vehicleItemApi.apiMasterVehicleItemGetGet)
  const fetchSaveData = useApi(vehicleItemApi,vehicleItemApi.apiMasterVehicleItemSavePost)
  const fetchRemoveData = useApi(vehicleItemApi,vehicleItemApi.apiMasterVehicleItemDeleteDelete)
  const { selectedRowKeysList, setSelectedRowKeysList , handleRowSelectionOne, handleRowSelectionAll } = useRowSelection();

  const Router = useRouter();
  const userData = useSelector((state: RootState) => state.user); // Access user data from Redux
 
  const [tenantCode,setTenantCode] = useState("0002");
  const [branchCode,setBranchCode] = useState("00002");

  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [sortOrder, setSortOrder] = useState<string| undefined>(undefined);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [ dataList, setDataList ] = useState<VehicleItemSearchOutput[]|undefined>();

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [ totalData, setTotalData ] = useState<number|undefined>(0);
  const [visible, setVisible] = useState<boolean>(false); 
  const [form] = Form.useForm<FormValues>();
  const [formSearch] = Form.useForm<FormSearch>();

  const [saveMode, setSaveMode] = useState<"ADD"|"EDIT"|null>(null); 
  const [dataIdForEdit, setDataIdForEdit] = useState<number|null|undefined>(null); 
  const [isLoadingPage,setIsLoadingPage] = useState<boolean>(false)
  const [isTableLoading,setIsTableLoading] = useState<boolean>(false)
   // State to control modal visibility
   const [modalVisible, setModalVisible] = useState(false);
     
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

    useEffect(() => {
    
      //First Render//
    getData({
        currentPage: page,
        currentPageSize: pageSize,
        sortOrder: "desc",
        sortField: "updateTimestamp",
      });
      
      //Get all lookup data
    fetchGetDataCarBrand.fetch({
        pageIndex:1, 
        pageSize:1000,
        tenantCode:tenantCode,
        branchCode:branchCode,          
    })
    // fetchGetDataCarModel.fetch({
    //   pageIndex:1, 
    //   brandCode:'MCB0007',
    //   pageSize:1000,
    //   tenantCode:tenantCode,
    //   branchCode:branchCode,          
     
    // })
    fetchGetDataColor.fetch({
      pageIndex:1, 
      pageSize:1000,
      tenantCode:tenantCode,
      branchCode:branchCode,          
  })
    fetchGetDataPort.fetch({
      pageIndex:1, 
      pageSize:1000,
      tenantCode:tenantCode,
      branchCode:branchCode,          
  })
  fetchGetDataLocation.fetch({
      pageIndex:1, 
      pageSize:1000,
      tenantCode:tenantCode,
      branchCode:branchCode,          
  })

  fetchGetMasterVehicleData.fetch({
      pageIndex:1, 
      pageSize:1000,
      tenantCode:tenantCode,
      branchCode:branchCode,      
  })

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
    chassisNo,
    licensePlate,
    brandCode,
    modelCode,
    colorCode,
    vehiclePortId,
    vehicleLocationId,
  }: GetDataParams) => {


    if (isLoadingTable) {
      setIsTableLoading(true);
    }else{
      setIsLoadingPage(true);
    }
  
    const res = await fetchGetDataVehicleItem.fetch({

        pageIndex: currentPage,
        pageSize: currentPageSize,
        keyword: keywordSearch,
        tenantCode,
        branchCode,
        sortField,
        sortDirection: sortOrder,
        status,
        chassisNo,
        licensePlate,
        brandCode,
        modelCode,
        colorCode,
        vehiclePortId,
        vehicleLocationId,
    }).finally(()=>{
      setIsLoadingPage(false);
      setIsTableLoading(false);
    })

    if (res && res.items) {
        setDataList(res.items);
        setTotalData(res.totalItems);
    }
  


  };

  const handleCloseModal = () => {
    console.log('Edit cancelled');
    setModalVisible(false);
  };


  
    const onChangePage = (
      page: number, pageSize: number
    ) => {
      console.log('page==>>',page)
      console.log('pageSize==>>',pageSize)
 
        setPage(page);
        setPageSize(pageSize);
        getData({
          currentPage: page,
          currentPageSize: pageSize,
          sortOrder: sortOrder,
          sortField: sortColumn,
          isLoadingTable:true
        });
       
    };

    const onChangePageSize = (param: {pageSize: number}) => {
        setPageSize(pageSize);
    };

    const onClickToAdd = () => {
   
      setSaveMode("ADD")
      setDataIdForEdit(null)
      setVisible(true);

    }

    const onClickToEdit = async (param: {id: number}) => {
      setSaveMode("EDIT")
      try {

        const res = await fetchGetDataVehicleItem.fetch( 
          {
            id:param?.id,
            pageIndex:1, 
            pageSize:1,
            tenantCode:tenantCode,
            branchCode:branchCode,
          }
        )       
    
        // Check if the response contains data
        if (res && res?.items && res?.items?.length>0 ) {
          // // Set the form values with the data
          const responseData = res.items[0]; 
          setDataIdForEdit(responseData?.id)

          form.setFieldsValue({
            // carBrand:responseData.brandCode||undefined,
            // carModel: Number(responseData.modelCode)  || undefined,
            licensePlate: responseData.licensePlate  ||undefined ,
            carChassisNo: responseData.chassisNo  ||undefined,
            carPort: responseData.vehiclePortId  ||undefined,
            carLocation: responseData.vehicleLocationId  ||undefined,
            // carColor: responseData.colorCode  ||undefined,
            status: responseData.status || 'active', 
            masterVehicle:responseData.vehicleMasterId||undefined

          });

          fetchGetDataCarModel.fetch({
            pageIndex:1, 
            brandCode:responseData.brandCode||undefined,
            pageSize:1000,
            tenantCode:tenantCode,
            branchCode:branchCode,          
           
          })

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

    const onClickRemove = () => {
        console.log("selectedValue",selectedRowKeysList)
        setModalVisible(true);
        if(selectedRowKeysList.length>0){
      
          setModalProps({
            visible:false,
            title: 'ยืนยันลบข้อมูล '+selectedRowKeysList.length+" รายการ",
            icon: <DeleteOutlined style={{ fontSize: '36px' }} />,
            confirmText: 'ลบ',
            hoverConfirmColor:'#f71d3f',
            cancelText: 'ยกเลิก',
            confirmButtonColor: 'bg-pl-red',
          
            iconBackgroundColor: 'bg-pl-red',
            onCancel:undefined,
            onConfirm: () => {
              // Save logic for edit
              setIsLoadingPage(true);
              const numberSelectedRowKeysList = selectedRowKeysList.map(key => Number(key));
              const paramForRemove = {
                "id": numberSelectedRowKeysList,
                "tenantCode": tenantCode,
                "branchCode": branchCode
              }
              fetchRemoveData.fetch({carrentalDeleteInput:paramForRemove})
              .then(()=>{

                getData({
                  currentPage: page,
                  currentPageSize: pageSize,
               
                });
               

              }).finally(()=>{
                  setIsLoadingPage(false);
                  setVisible(false); // Close the modal after submission
                  form.resetFields(); // Reset form fields
                  setModalVisible(false); // Close the confirmation modal
                  setSelectedRowKeysList([]);
              })

            },
          });
        }else{
          setModalProps({
            visible:true,
            title: "กรุณาเลือกรายการที่ต้องการลบ",
            icon: <InfoOutlined style={{ fontSize: '36px' }} />,
            cancelText: 'ปิด',
            iconBackgroundColor: 'bg-pl-yellow',
            onConfirm:undefined,
            onCancel:undefined,
            confirmText: 'ลบ',
            hoverConfirmColor:'#f71d3f'
          });

        }
        
        
    }

    const onClikToView = (param: {id: number}) => {
       Router.push(`/car/view/${param.id}`);
    }
    const onSubmitSearch = () =>{
      console.log("onSubmitSearch===>>>");
      formSearch
      .validateFields()
      .then((values) =>{

        const vehiclePortId = values.carPort ? Number(values.carPort) : undefined;
        const vehicleLocationId = values.carLocation ? Number(values.carLocation) : undefined;
        const carModelCode = values.carModel?.toString();
        getData({
          currentPage: page,
          currentPageSize: pageSize,
          // keywordSearch:values.carColor,
          status:values.status,
          isLoadingTable:true,
          chassisNo:values.carChassisNo,
          licensePlate: values.licensePlate,
          brandCode: values.carBrand,
          modelCode: carModelCode,
          colorCode: values.carColor,
          vehiclePortId: vehiclePortId,
          vehicleLocationId: vehicleLocationId
        });

      })
      setSelectedRowKeysList([])
        

    }
    const onClearSearch = () =>{
      formSearch.resetFields();
    }

    
    const onClickCheckAll = (param: boolean) =>{
      setIsAllChecked(param)
    }
 
    const showTotal = (total: number,range:[number,number]) => `รายการ ${range[0]}-${range[1]} จาก ${total}`;

    const onCloseFormModal = (): void => {
      setVisible(false);
      form.resetFields(); // Reset form fields
      setDataIdForEdit(null);
    };
    const onSaveFormModal = (): void => {
      
      form
        .validateFields()
        .then((values) => {

          
          console.log('Form values:', values);
          console.log('saveMode:',saveMode)
          const id = dataIdForEdit
          const vehiclePortId = values.carPort ? Number(values.carPort) : undefined;
          const vehicleLocationId = values.carLocation ? Number(values.carLocation) : undefined;
          const modelCode = values.carModel ? values.carModel.toString()  : undefined
          const paramForSave = {
            "id": id,
            "status": values.status,
            "tenantCode": tenantCode,
            "branchCode": branchCode,
            "licensePlate": values.licensePlate,
            "chassisNo": values.carChassisNo,
            "vehiclePortId": vehiclePortId,
            "vehicleLocationId": vehicleLocationId,
            "vehicleMasterId": values.masterVehicle,

          }

          // "id": 0,
          // "vehicleMasterId": 0,
          // "licensePlate": "string",
          // "chassisNo": "string",
          // "vehiclePortId": 0,
          // "vehicleLocationId": 0,
          // "status": "string",
          // "tenantCode": "string",
          // "branchCode": "string"

          if(saveMode === "ADD"){

         
            
            setIsLoadingPage(true)
          fetchSaveData.fetch({vehicleItemInput :paramForSave}).then(()=>{

                getData({
                  currentPage: page,
                  currentPageSize: pageSize,
                });
               
              }).finally(()=>{

                setIsLoadingPage(false)
                setVisible(false); // Close the modal after submission
                form.resetFields(); // Reset form fields

              })


          }else if(saveMode === "EDIT"){
        
            setModalVisible(true);
            setModalProps({
              visible:true,
              title: 'ยืนยันแก้ไขข้อมูล',
              icon: <EditOutlined style={{ fontSize: '36px' }} />,
              confirmText: 'แก้ไข',
              cancelText: 'ยกเลิก',
              confirmButtonColor: 'bg-pl-yellow',
              iconBackgroundColor: 'bg-yellow-500',
              onConfirm: () => {
                // Save logic for edit
                setIsLoadingPage(true);
                
                fetchSaveData.fetch({vehicleItemInput :paramForSave}).then(() => {
                    getData({
                      currentPage: page,
                      currentPageSize: pageSize,
                
                    });
                   
                  })
                  .finally(() => {
                    setIsLoadingPage(false);
                    setVisible(false); // Close the modal after submission
                    form.resetFields(); // Reset form fields
                    setModalVisible(false); // Close the confirmation modal
                  });
              },
            });
          }

        })
        .catch((info:string) => {
          console.log('Validation Failed:', info);
        }).finally(()=>{
          console.log('Success Save');
          
        });
    };
    const onHandleTableChange= (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleItemSearchOutput> | SorterResult<VehicleItemSearchOutput>[] ,
      extra: TableCurrentDataSource<VehicleItemSearchOutput>
    )  => {

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

    
    };

    const onCarBrandChange = (carBrandCode:string) =>{
      fetchGetDataCarModel.fetch({
        pageIndex:1, 
        brandCode:carBrandCode,
        pageSize:1000,
        tenantCode:tenantCode,
        branchCode:branchCode,          
       
      })
    }
    const contentProps: VehicleItemContentProps = {
        page,
        pageSize,
        dataList,
        isAllChecked,
        totalData,
        visible,
        form,
        isLoadingPage,
        saveMode,
        selectedRowKeysList,
        isTableLoading,
        carBrandLookupData:fetchGetDataCarBrand.data?.items,
        carModelLookupData:fetchGetDataCarModel.data?.items,
        carColorLookupData:fetchGetDataColor.data?.items,
        carLocationLookupData:fetchGetDataLocation.data?.items,
        carPortLookupData:fetchGetDataPort.data?.items,
        masterVehicleLookupData:fetchGetMasterVehicleData.data?.items,
        
        onChangePage,
        onChangePageSize,
        onClickToEdit,

        onClikToView,
        onClickRemove,
        onClickToAdd,
        onSubmitSearch,
        onClearSearch,
        onClickCheckAll,
        onCloseFormModal,
        onSaveFormModal,
        onCarBrandChange,
        // onSetSelectedValue,
        onHandleTableChange,
        onHandleRowSelectionOne:handleRowSelectionOne,
        onHandleRowSelectionAll:handleRowSelectionAll ,
        showTotal
    };


    return (
      <>
        <Row gutter={[ 8, 16 ]}>
          <Col span={24}>
              <Card  
                className={'shadow-effect'} 
                // title={
                //   <div className="text-center">
                //     <Typography.Title type={'secondary'} level={3}>
                //       ...Form Search Is Coming...
                //     </Typography.Title>
                //   </div>
                // }
                headStyle={{ padding: 24 }}
                bodyStyle={{ padding: 24 }}
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
                                    ยี่ห้อรถยนต์
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select placeholder="เลือกยี่ห้อรถยนต์">
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
                                    รุ่นรถยนต์
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                   <Select placeholder="เลือกรุ่นรถยนต์">
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
                                name="licensePlate"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    เลขทะเบียน
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }} 
                              >
                                <Input className="w-full z-10	"  placeholder="ค้นหาสีรถยนต์" allowClear />
                              </Form.Item>

                            </Col>
                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="carChassisNo"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    เลขตัวถัง
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }} 
                              >
                                <Input className="w-full z-10	"  placeholder="ค้นหาสีรถยนต์" allowClear />
                              </Form.Item>

                            </Col>
                            
                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="carPort"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    กองรถยนต์
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                 <Select placeholder="เลือกกองรถ" allowClear>
                                    { fetchGetDataPort.data?.items?.map((item) => (
                                          <Option key={item.id} value={item.id}>
                                        {item.name}
                                      </Option>
                                    ))}
                                  </Select>
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="carLocation"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ลานจอดรถ
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select placeholder="เลือกลานจอดรถ" allowClear>
                                  {fetchGetDataLocation.data?.items?.map((item) => (
                                          <Option key={item.id} value={item.id}>
                                        {item.name}
                                      </Option>
                                    ))}
                                  </Select>
                              </Form.Item>
                            </Col>

                        <Col xs={24} md={10}> 
                              <Form.Item
                                name="carColor"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    สีรถยนต์
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select className="w-full" placeholder="เลือกสี" allowClear>
                                {fetchGetDataColor.data?.items?.map((item) => (
                                        <Option key={item.code} value={item.code}>
                                      {item.colorName}
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
                          visible={modalVisible}
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


const renderOptions = (props: VehicleItemContentProps): ReactElement => {
  return (
    <>
      <Row align={'middle'} justify={'space-between'}>
        <Col>
 
          <CustomButton text="เพิ่ม" onClick={props.onClickToAdd} type="primary"  className="bg-pl-primary text-white border-none mr-2 !important "></CustomButton>
          <CustomButton text="ลบ" onClick={props.onClickRemove} type="primary" hoverColor='#f71d3f' className="bg-pl-red !important "></CustomButton>

        </Col>
      </Row>
    </>
  )
}


const renderTable = (props: VehicleItemContentProps): ReactElement => {

  const rowSelection = {
    selectedRowKeys: props.selectedRowKeysList,
    onSelect: props.onHandleRowSelectionOne,
    onSelectAll:props.onHandleRowSelectionAll
  };

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
            width: 100, // Optionally set a fixed width for the column


          },
          {
            dataIndex: "brandName",
            title: "ยี่ห้อรถยนต์",
            sorter: true,
          },
          {
            dataIndex: "modelName",
            title: "รุ่นห้อรถยนต์",
            sorter: true,
          },
          {
            dataIndex: "chassisNo",
            title: "เลขตัวถัง",
            sorter: true,
          },
          {
            dataIndex: "licensePlate",
            title: "เลขทะเบียน",
            sorter: true,
          },
          {
            dataIndex: "locationName",
            title: "ลานจอดรถ",
            sorter: true,
          },
          {
            dataIndex: "portName",
            title: "กองรถ",
            sorter: true,
          },
          {
            dataIndex: "colorName",
            title: "สีรถ",
            sorter: true,
          },
          {
            dataIndex: "status",
            title: "สถานะ",
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
            dataIndex: "updateBy",
            title: "แก้ไขโดย",
            sorter: true,
          },
          {
            title: "แก้ไข",
            render: (row1) => {
              return (
                <Space>
                  <Button
                    type="default"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => {
                      props.onClickToEdit({ id: row1.id });
                    }}
                  />
                </Space>
              );
            }
          }
        ]}
        rowSelection={rowSelection }

        dataSource={props.dataList}

        size={'middle'}
        scroll={{ x: 'max-content' }}
        onChange={props.onHandleTableChange}
        showSorterTooltip={false}
        loading={props.isTableLoading}
        pagination={{
          current: props.page,
          pageSize: props.pageSize,
          total: props.totalData,
          pageSizeOptions: [10, 15, 20, 50],
          onChange: props.onChangePage,
          showSizeChanger: true,
          simple: true,
          showTotal: (total: number, range: [number, number]) => props.showTotal(total, range),
        }}
      />
    </>
  );
}
   // rowSelection object indicates the need for row selection


const renderModalForm = (props: VehicleItemContentProps): ReactElement => {
  // console.log("fetchGetVehicleTypeData",props.getVehicleTypeData)
  return(
    <>
            <Modal
                title={props.saveMode === "ADD" ? "เพิ่มรถยนต์" : "แก้ไขรถยนต์"}
                visible={props.visible}
                onOk={props.onSaveFormModal}
                onCancel={props.onCloseFormModal}
                centered
                width={1000}
                footer={null}
                // okText="Submit"
                // cancelText="Cancel"
              >
                  <Form form={props.form} layout="vertical" name="modal_form_layout">
                    <Row gutter={[16, 5]}>
                      {/* First Input Field */}

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="masterVehicle"
                          label="รถยนต์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                             <Select placeholder="เลือกรถยนต์" 
                            //  onChange={props.onCarBrandChange}
                               showSearch 
                               filterOption={(input, option) => {
                                const optionText = (option?.children as unknown as string)?.toLowerCase() || "";
                                return optionText.includes(input.toLowerCase());
                              }}
                             >
                                {props.masterVehicleLookupData?.map((item) => (
                              <Option key={item.id} value={item.id}>
                                {item.vehicleMasterName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                  
                      <Col xs={24} md={12}>
                        <Form.Item
                            name="licensePlate"
                            label="เลขทะเบียน"
                            rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
                          >
                            <Input placeholder="เลขทะเบียนรถยนต์" allowClear />
                          </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                            name="carChassisNo"
                            label="เลขตัวถัง"
                            rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
                          >
                            <Input placeholder="เลขตัวถังรถยนต์" allowClear />
                          </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="carPort"
                          label="กองรถยนต์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกกองรถ" allowClear>
                            {props.carPortLookupData?.map((item) => (
                                  <Option key={item.id} value={item.id}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="carLocation"
                          label="ลานจอด"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกสถานะ" allowClear>
                          {props.carLocationLookupData?.map((item) => (
                                  <Option key={item.id} value={item.id}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="status"
                          label="สถานะ"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกสถานะ" allowClear>
                            <Option value="active">ใช้งาน</Option>
                            <Option value="inactive">ไม่ใช้งาน</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        <CustomButton
                          text="ยกเลิก"
                          // type="primary"
                          onClick={props.onCloseFormModal}
                          className="bg-white text-pl-primary border-pl-primary !important w-full md:w-auto mr-3"
                        />
                        <CustomButton
                          text={props.saveMode === "ADD" ? "เพิ่ม" : "แก้ไข"}
                          type="primary"
                          onClick={props.onSaveFormModal}
                          className="bg-pl-primary text-white border-none !important w-full md:w-auto"
                        />
                    </div>
                  </Form>
                </Modal>

    </>
  )
}


// VehicleItemListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default VehicleItemListContainer;