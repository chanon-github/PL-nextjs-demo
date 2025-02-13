
import type { MasterVehicleContentProps, MasterVehicleContainerProps ,FormSearch,GetDataParams,FormValues} from './index.model';
import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import resolveConfig from 'tailwindcss/resolveConfig';
// import tailwindConfig from '../../../tailwind.config'; // Adjust the path according to your structure
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
    DatePicker,
    TablePaginationConfig,
    Upload,
    Image,
    UploadFile
   
} from 'antd';
const { Option } = Select
import {
  EditOutlined,
  InfoOutlined,
  DeleteOutlined,
  InboxOutlined
} from '@ant-design/icons';
import type { NextPageWithLayout } from '@/pages/_app';
import useApi from '@/hooks/api/use-api';
import useRowSelection from '@/hooks/table/useRowSelection';

import { 
  carBrandApi, 
  colorApi, 
  vehicleModelApi, 
  vehicleTypeApi  , 
  engineTypeApi,
  fuelTypeApi,gearApi, 
  vehicleMasterApi,
  fileApi} from '@/services/central-api/index';
import {    VehicleMasterSearchOutput} from '@/services/central-api/generated';
import { CustomButton } from '@/components/common/button/button';
import { CustomLoading } from '@/components/common/loading/loading';
import { ConfirmModal,ConfirmModalProps } from '@/components/common/confirm-modal/confirm-modal';
import {UploadFileComponent} from '@/components/common/upload-file';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { useSelector} from 'react-redux';
import { RootState } from '@/utils/store';
// const fullConfig = resolveConfig(tailwindConfig) as TailwindConfig;
import _ from 'lodash';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { notify } from '@/utils/functions/notification';

// import Dragger from 'antd/es/upload/Dragger';



const MasterVehicleListContainer: NextPageWithLayout<MasterVehicleContainerProps> = ( props: MasterVehicleContainerProps ): ReactElement => {
  /** Hook section */

  // const fetchGetDataCarBrand = useApi(carBrandApi,carBrandApi.apiMasterCarBrandGetGet)
  // const fetchGetDataCarModel = useApi(vehicleModelApi,vehicleModelApi.apiMasterVehicleModelGetGet)
  // const fetchGetDataColor = useApi(colorApi,colorApi.apiMasterColorGetGet)
  // const fetchGetVehicleTypeData = useApi(vehicleTypeApi,vehicleTypeApi.apiMasterVehicleTypeGetGet)

  // const fetchGetVehicleGearData = useApi(gearApi,gearApi.apiMasterGearGetGet)
  // const fetchGetVehicleEngineData = useApi(engineTypeApi,engineTypeApi.apiMasterEngineTypeGetGet)
  // const fetchGetVehicleFuelData = useApi(fuelTypeApi,fuelTypeApi.apiMasterFuelTypeGetGet)

  // const fetchGetData= useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterGetGet)
  // const fetchSaveData = useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterSavePost)
  // const fetchRemoveData = useApi(vehicleMasterApi,vehicleMasterApi.apiMasterVehicleMasterDeleteDelete)
  // const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);
  const { selectedRowKeysList, setSelectedRowKeysList , handleRowSelectionOne, handleRowSelectionAll } = useRowSelection();

  const Router = useRouter();
  const userData = useSelector((state: RootState) => state.user); // Access user data from Redux
 

  const [tenantCode,setTenantCode] = useState("0002");
  const [branchCode,setBranchCode] = useState("00002");

  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [sortOrder, setSortOrder] = useState<string|undefined>(undefined);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [ dataList, setDataList ] = useState<VehicleMasterSearchOutput[]|undefined>();

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [ totalData, setTotalData ] = useState<number|undefined>(0);
  const [visible, setVisible] = useState<boolean>(false); 
  const [form] = Form.useForm<FormValues>();
  const [formSearch] = Form.useForm<FormSearch>();
  const [ imageUrl, setImageUrl ] = useState<string | undefined>();

  const [saveMode, setSaveMode] = useState<"ADD"|"EDIT"|null>(null); 
  const [dataIdForEdit, setDataIdForEdit] = useState<number|null|undefined>(null); 
  const [isTableLoading,setIsTableLoading] = useState<boolean>(false)
  const [isLoadingPage,setIsLoadingPage] = useState<boolean>(false)

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

  useEffect(()=>{
    
    //--Get All Lookup Data --//

    // fetchGetDataCarBrand.fetch({
    //     pageIndex:1, 
    //     pageSize:1000,
    //     tenantCode:tenantCode,
    //     branchCode:branchCode,          
    // })

    // fetchGetDataCarModel.fetch({
    //   pageIndex:1, 
    //   pageSize:1000,
    //   tenantCode:tenantCode,
    //   branchCode:branchCode,    
    // })
  
  
  //   fetchGetDataColor.fetch({
  //     pageIndex:1, 
  //     pageSize:1000,
  //     tenantCode:tenantCode,
  //     branchCode:branchCode,          
  // })

  // fetchGetVehicleTypeData.fetch({
  //     pageIndex:1, 
  //     pageSize:1000,
  //     tenantCode:tenantCode,
  //     branchCode:branchCode,          
  // })

  // fetchGetVehicleGearData.fetch({
  //     pageIndex:1, 
  //     pageSize:1000,
  //     tenantCode:tenantCode,
  //     branchCode:branchCode,          
  // })

  // fetchGetVehicleEngineData.fetch({
  //     pageIndex:1, 
  //     pageSize:1000,
  //     tenantCode:tenantCode,
  //     branchCode:branchCode,          
  // })

  // fetchGetVehicleFuelData.fetch({
  //   pageIndex:1, 
  //   pageSize:1000,
  //   tenantCode:tenantCode,
  //   branchCode:branchCode,          
  // })

  },[])

  useEffect(()=>{

        //-------------------------------------//
        getData({
          currentPage: page,
          currentPageSize: pageSize,
          sortOrder: sortOrder,
          sortField: sortColumn,
          isLoadingTable:true
        });

      },[])
      
  
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
    year,
    vehiclePortId,
    vehicleLocationId,
  }: GetDataParams) => {


    if (isLoadingTable) {
      setIsTableLoading(true);
    }else{
      setIsLoadingPage(true);
    }
  
    // const res = await fetchGetData.fetch({

    //     pageIndex: currentPage,
    //     pageSize: currentPageSize,
    //     keyword: keywordSearch,
    //     status,
    //     tenantCode,
    //     branchCode,
    //     sortField,
    //     sortDirection: sortOrder,
    //     brandCode,
    //     modelCode,
    //     colorCode,
    //     year

    // }).finally(()=>{
    //   setIsLoadingPage(false)
    //   setIsTableLoading(false)
    // })

    // if (res && res.items) {
    //     setDataList(res.items);
    //     setTotalData(res.totalItems);
  
    // }



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
          // isLoadingTable:true
        });
       
    };

    const onChangePageSize = (param: {pageSize: number}) => {
        setPageSize(pageSize);
    };

    const onClickToAdd = () => {
      // Router.push('/car/add');
   
      setSaveMode("ADD")
      setVisible(true);

      // execute4({deleteOutput:{
      //   code: ["0005"],
      //   }
      //   }
      // )

    }

    const onClickToEdit = async (param: {id: number}) => {
      // setSaveMode("EDIT")
      // try {

      //   const res = await fetchGetData.fetch( 
      //     {
      //       id:param?.id,
      //       pageIndex:1, 
      //       pageSize:1,
      //       tenantCode:tenantCode,
      //       branchCode:branchCode,
      //     }
      //   )       
    
      //   // Check if the response contains data
      //   if (res && res?.items && res?.items?.length>0 ) {
      //     // // Set the form values with the data
      //     const responseData = res.items[0]; 
      //     setImageUrl(responseData.imageUrl || undefined)
      //     setDataIdForEdit(Number(responseData?.id))
      //     form.setFieldsValue({
      //       carType: responseData.vehicleTypeCode || undefined , 
      //       carBrand: responseData.brandCode || undefined,
      //       carModel:  Number(responseData.modelCode) || undefined,
      //       carColor:responseData.colorCode|| undefined,
      //       engineType:responseData.engineTypeCode|| undefined,
      //       gearType:responseData.gearCode|| undefined,
      //       fuelType:responseData.fuelCode|| undefined,
      //       seatNum:responseData.numberOfSeat||undefined,
      //       door:responseData.door||undefined,
      //       year: responseData.year ? dayjs().year(Number(responseData.year)) : undefined,  // Setting the year as dayjs object
      //       imageUrl: responseData.imageUrl || undefined,
      //       description: responseData.description || undefined,
      //       // year: dayjs().year(2016),  // Correctly set the year*
      //       status: responseData.status || 'active', 
      //     });

      //     fetchGetDataCarModel.fetch({
      //       pageIndex:1, 
      //       brandCode:responseData.brandCode||undefined,
      //       pageSize:1000,
      //       tenantCode:tenantCode,
      //       branchCode:branchCode,          
           
      //     })
          
      //     setVisible(true);
      //   } 
      //   else {
      //     console.warn("No data found for this vehicle.");
      //     form.resetFields(); 
      //   }
      // } catch (error) {
      //   console.error("Error fetching vehicle data:", error);
      // }
      

    }

    const onClickRemove = () => {
        console.log("selectedValue",selectedRowKeysList)
        setModalVisible(true);
        if(selectedRowKeysList.length>0){
      
          // setModalProps({
          //   visible:false,
          //   title: 'ยืนยันลบข้อมูล '+selectedRowKeysList.length+" รายการ",
          //   icon: <DeleteOutlined style={{ fontSize: '36px' }} />,
          //   confirmText: 'ลบ',
          //   hoverConfirmColor:'#f71d3f',
          //   cancelText: 'ยกเลิก',
          //   confirmButtonColor: 'bg-pl-red',
          
          //   iconBackgroundColor: 'bg-pl-red',
          //   onCancel:undefined,
          //   onConfirm: () => {
          //     // Save logic for edit
          //     setIsLoadingPage(true);
          //     const numberSelectedRowKeysList = selectedRowKeysList.map(key => Number(key));
          //     const paramForRemove = {
          //       "id": numberSelectedRowKeysList,
          //       "tenantCode": tenantCode,
          //       "branchCode": branchCode
          //     }
          //     fetchRemoveData.fetch({carrentalDeleteInput:paramForRemove})
          //     .then(()=>{

          //       getData({
          //         currentPage: page,
          //         currentPageSize: pageSize,
 
          //       });

          //     }).finally(()=>{
          //         setIsLoadingPage(false);
          //         setVisible(false); // Close the modal after submission
          //         form.resetFields(); // Reset form fields
          //         setModalVisible(false); // Close the confirmation modal
          //     })

          //   },
          // });
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
        const year = values?.year?.year().toString()
        getData({
          currentPage: page,
          currentPageSize: pageSize,
          keywordSearch:values.carType,
          brandCode:values.carBrand,
          modelCode:values.carModel,
          status:values.status,
          colorCode:values.carColor,
          year:year
          // sortOrder: sortOrder,
          // sortField: sortColumn,
          // isLoadingTable:true
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
    };
    const onSaveFormModal = (): void => {
      
      form
        .validateFields()
        .then((values) => {

          
          console.log('Form values:', values);
          console.log('saveMode:',saveMode)
          const modelCode = values.carModel ? values.carModel.toString()  : undefined
          const year = values?.year ? values.year.year().toString() : undefined; 

          if(saveMode === "ADD"){
            const paramForSave = {
                "id": null,
                "type": values.carType,
                "status": values.status,
                "tenantCode": tenantCode,
                "branchCode": branchCode,
                "brandCode": values.carBrand,
                "modelCode": modelCode,
                "vehicleTypeCode": values.carType,
                "colorCode": values.carColor,
                "engineTypeCode": values.engineType,
                "fuelCode": values.fuelType,
                "gearCode": values.gearType,
                "numberOfSeat": values.seatNum,
                "price": 100,
                "year": year,
                "door":values.door,
                "imageUrl": imageUrl,
                "description": values.description

             
              }
  
          setIsLoadingPage(true)
        
        
          // fetchSaveData.fetch({masterVehicleInput:paramForSave}).then(()=>{
          //       getData({
          //         currentPage: page,
          //         currentPageSize: pageSize,
          //       });

          //     }).finally(()=>{

          //       setIsLoadingPage(false)
          //       setVisible(false); // Close the modal after submission
          //       form.resetFields(); // Reset form fields

          //     })


          }else if(saveMode === "EDIT"){
            const modelCode = values.carModel ? values.carModel.toString()  : undefined
            const year = values?.year ? values.year.year().toString() : undefined; 
            const code = dataIdForEdit
            const paramForEdit= {
                "id": code,
                "type": values.carType,
                "status": values.status,
                "tenantCode": tenantCode,
                "branchCode": branchCode,
                "brandCode": values.carBrand,
                "modelCode": modelCode,
                "vehicleTypeCode": values.carType,
                "colorCode": values.carColor,
                "engineTypeCode": values.engineType,
                "fuelCode": values.fuelType,
                "gearCode": values.gearType,
                "numberOfSeat": values.seatNum,
                "price": 100,
                "year": year,
                "door":values.door,
                "imageUrl": imageUrl,
                "description": values.description
             
              }
            setModalVisible(true);
            // setModalProps({
            //   visible:true,
            //   title: 'ยืนยันแก้ไขข้อมูล',
            //   icon: <EditOutlined style={{ fontSize: '36px' }} />,
            //   confirmText: 'แก้ไข',
            //   cancelText: 'ยกเลิก',
            //   confirmButtonColor: 'bg-pl-yellow',
            //   iconBackgroundColor: 'bg-yellow-500',
            //   onConfirm: () => {
            //     // Save logic for edit
            //     setIsLoadingPage(true);
                
            //     fetchSaveData.fetch({masterVehicleInput:paramForEdit}).then(()=>{
            //       getData({
            //         currentPage: page,
            //         currentPageSize: pageSize,
            //       });
            //       })
            //       .finally(() => {
            //         setIsLoadingPage(false);
            //         setVisible(false); // Close the modal after submission
            //         form.resetFields(); // Reset form fields
            //         setModalVisible(false); // Close the confirmation modal
            //       });
            //   },
            // });
          }

        })
        .catch((info:string) => {
          console.log('Validation Failed:', info);
        }).finally(()=>{
          console.log('Success Save');
          
        });
    };

    // const onSetSelectedValue = (selectedList: string[]) =>{
    //   console.log('selectedList==>>',selectedList)
    //   // setSelectedList(selectedList)
    // }

    const onHandleTableChange= (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleMasterSearchOutput> | SorterResult<VehicleMasterSearchOutput>[] ,
      extra: TableCurrentDataSource<VehicleMasterSearchOutput>
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
      console.log("onCarBrandChange==>>")
      // fetchGetDataCarModel.fetch({
      //   pageIndex:1, 
      //   brandCode:carBrandCode,
      //   pageSize:1000,
      //   tenantCode:tenantCode,
      //   branchCode:branchCode,          
       
      // })
    }

    const onChangeUploadImg = (params: { file: UploadFile;}) =>{
      // console.log(params.file.status === 'done')
      if (params.file.status === 'done') {
        const originFileObj = params.file.originFileObj;
        console.log('test==>>', originFileObj)
        // if (originFileObj) {
        //   useApiFileUpload.fetch({
        //     fileType: "pub-content",
        //     file: originFileObj,
        //     docType: "vehicle"
        //   }).then((res) => {
        //     if(res.data){
        //       setImageUrl(res.data?.url || "");
        //       formSearch.setFieldsValue({imageUrl: res.data?.url || ""});
        //       notify({ title: 'ทำการ อัพโหลดรูป สำเร็จ', type: 'success' });
        //     }
        //     else{
        //       notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
        //     }
        //   });
        // } else {
        //   console.error("No original file object available.");
        // }
      }
    }

    const onGetImageUrlUploaded = (imageUrl?: string) => {
      if(imageUrl){
        formSearch.setFieldsValue({imageUrl: imageUrl});
        setImageUrl(imageUrl);
      }
    }

    const contentProps: MasterVehicleContentProps = {
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
        imageUrl,
        getVehicleTypeData:undefined,
        carBrandLookupData:undefined,
        carModelLookupData:undefined,
        carColorLookupData:undefined,
        gearTypeLookupData:undefined,
        engineTypeLookupData:undefined,
        fuelTypeLookupData:undefined,
        onCarBrandChange,
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
        onHandleTableChange,
        onHandleRowSelectionOne:handleRowSelectionOne,
        onHandleRowSelectionAll:handleRowSelectionAll ,
        showTotal,
        onChangeUploadImg,
        onGetImageUrlUploaded
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
                                {/* {fetchGetDataCarBrand.data?.items?.map((item) => (
                                  <Option key={item.code} value={item.code}>
                                      {item.brandName}
                                  </Option>
                            ))} */}
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
                                    {/* {fetchGetDataCarModel.data?.items?.map((item) => (
                                      <Option key={item.id} value={item.id}>
                                          {item.modelName}
                                      </Option>
                                  ))} */}
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="year"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ปี
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }} 
                              >
                                {/* <Input className="w-full z-10	"  placeholder="ค้นหาปี" allowClear /> */}
                                <DatePicker className="w-full z-10	" placeholder="ค้นหาปี" allowClear  picker="year" />
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
                                {/* {fetchGetDataColor.data?.items?.map((item) => (
                                        <Option key={item.code} value={item.code}>
                                      {item.colorName}
                                    </Option>
                                  ))} */}
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
                                  <Option value="">ทั้งหมด</Option>
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


const renderOptions = (props: MasterVehicleContentProps): ReactElement => {
  return (
    <>
      <Row align={'middle'} justify={'space-between'}>
        {/* <Form onFinish={props.onSubmitSerach}>
          <Col>
            <Form.Item
              name="search"
            >
              <Input.Search/>
            </Form.Item>
          </Col>
        </Form> */}
     
        <Col>
 
          <CustomButton text="เพิ่ม" onClick={props.onClickToAdd} type="primary"  className="bg-pl-primary text-white border-none mr-2 !important "></CustomButton>
          <CustomButton text="ลบ" onClick={props.onClickRemove} type="primary" hoverColor='#f71d3f' className="bg-pl-red !important "></CustomButton>

        </Col>
      </Row>
    </>
  )
}


const renderTable = (props: MasterVehicleContentProps): ReactElement => {

  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
  //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   props.onSetSelectedValue(selectedRowKeys as string[])
  //   },
  //   getCheckboxProps: (record: DataType) => ({
  //     // name: record.type,
  //   }),
  // };

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
            title: "ยี่ห้อรถ",
            sorter: true,
          },
          {
            dataIndex: "modelName",
            title: "รุ่นรถ",
            sorter: true,
          },
          {
            dataIndex: "vehicleTypeName",
            title: "ประเภทรถ",
            sorter: true,
          },
          {
            dataIndex: "colorName",
            title: "สี",
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
        rowSelection={rowSelection}

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


const renderModalForm = (props: MasterVehicleContentProps): ReactElement => {
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
                          name="carBrand"
                          label="ยี่ห้อรถยนต์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                             <Select placeholder="เลือกยี่ห้อรถยนต์" 
                             onChange={props.onCarBrandChange}
                             >
                                {props.carBrandLookupData?.map((item) => (
                              <Option key={item.code} value={item.code}>
                                {item.brandName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="carModel"
                          label="รุ่นรถยนต์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
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

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="carType"
                          label="ประเภทรถยนต์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกประเภทรถยนต์" allowClear>
                            {props.getVehicleTypeData?.map((item) => (
                              <Option key={item.code} value={item.code}>
                                {item.type}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="carColor"
                          label="สีรถยนต์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกสีรถยนต์" allowClear>
                            {props.carColorLookupData?.map((item) => (
                              <Option key={item.code} value={item.code}>
                                {item.colorName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="engineType"
                          label="ประเภทเครื่องยนต์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกประเภทเครื่องยนต์" allowClear>
                            {props.engineTypeLookupData?.map((item) => (
                              <Option key={item.code} value={item.code}>
                                {item.typeName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="fuelType"
                          label="ประเภทเชื้อเพลิง"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกประเภทเชื้อเพลิง" allowClear>
                            {props.fuelTypeLookupData?.map((item) => (
                              <Option key={item.code} value={item.code}>
                                {item.fuelTypeName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="gearType"
                          label="ประเภทเกียร์"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกประเภทเกียร์" allowClear>
                            {props.gearTypeLookupData?.map((item) => (
                              <Option key={item.code} value={item.code}>
                                {item.gearSystem}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                      <Form.Item
                          name="seatNum"
                          label="จำนวนที่นั่ง"
                          rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
                        >
                          <Input placeholder="จำนวนที่นั่ง" allowClear type='number'/>
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} md={12}>
                      <Form.Item
                          name="door"
                          label="จำนวนประตู"
                          rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
                        >
                          <Input placeholder="จำนวนประตู" allowClear type='number'/>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                        <Form.Item
                          name="year"
                          label="ปี"
                          rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
                        >
                          <DatePicker className="w-full z-10	" placeholder="ปีรถ" allowClear  picker="year" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="description"
                          label="คำอธิบาย"
                          rules={[{ required: true, message: 'กรุณากรอก คำอธิบาย!' }]}
                        >
                          <Input.TextArea rows={3} placeholder="คำอธิบาย" allowClear />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        {<UploadFileComponent 
                          onGetImageUrlUploaded={props.onGetImageUrlUploaded} 
                          imageUrl={props.imageUrl}
                          isRequired={true}
                        />}
                        {/* <Row gutter={[ 8, 8 ]}>
                          <Col >
                            <Form.Item
                              label = "รูปภาพ"
                              name = "imageUrl"
                              rules={[{ required: true, message: 'กรุณาเลือก อัพโหลด รูปภาพ' }]}
                            >
                              <UploadFileComponent onGetImageUrlUploaded={props.onGetImageUrlUploaded} />
                              <Upload.Dragger
                                accept="image/*"
                                maxCount={1}
                                listType="picture"
                                onChange={(info) => {props.onChangeUploadImg({file: info.file})}}
                                showUploadList={false}
                                style={{ width: "100%" }}
                                // beforeUpload={() => (false)}
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">อัพโหลดรูป</p>
                               
                              </Upload.Dragger>
                            </Form.Item>
                          </Col>
                          {
                            props.imageUrl && (
                              <Col>
                                <Form.Item
                                    label = " "
                                >
                                  <Image  src={props.imageUrl} style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                                </Form.Item>
                              
                              </Col>
                            )
                          }           
                        </Row>      */}
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="status"
                          label="สถานะ"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกสถานะ">
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

// CarListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default MasterVehicleListContainer;