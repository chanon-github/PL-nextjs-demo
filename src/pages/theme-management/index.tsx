import type { ThemeManagementContentProps, ThemeManagementContainerProps,FormValues,GetDataParams } from './index.model';


/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleType - Container
 */
import { type ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config'; // Adjust the path according to your structure
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
    FormInstance,
    Typography,
    ColorPicker
} from 'antd';
const { Option } = Select
import {
  EditOutlined,
  InfoOutlined,
  DeleteOutlined,
  DownOutlined
} from '@ant-design/icons';
import type { NextPageWithLayout } from '@/pages/_app';

import useApi from '@/hooks/api/use-api';
import useRowSelection from '@/hooks/table/useRowSelection';

import { vehicleTypeApi,themeManagementApi  } from '@/services/central-api/index';
import {   CtlMstVehicleType} from '@/services/central-api/generated';
import { CustomButton } from '@/components/common/button/button';
import { CustomLoading } from '@/components/common/loading/loading';
import { ConfirmModal,ConfirmModalProps } from '@/components/common/confirm-modal/confirm-modal';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { useSelector} from 'react-redux';
import { RootState } from '@/utils/store';
import { setData } from '@/utils/action';

import CustomUpload from '@/components/common/upload/upload';
// const fullConfig = resolveConfig(tailwindConfig) as TailwindConfig;



const ThemeManagementListContainer: NextPageWithLayout<ThemeManagementContainerProps> = ( props: ThemeManagementContainerProps ): ReactElement => {

  /** Hook section */
  const fetchGetData = useApi(themeManagementApi,themeManagementApi.apiMasterThemeManagementGetGet)
  const fetchSaveData = useApi(themeManagementApi,themeManagementApi.apiMasterThemeManagementSavePost)
  const fetchRemoveData = useApi(themeManagementApi,themeManagementApi.apiMasterThemeManagementDeleteDelete)
  const { selectedRowKeysList, setSelectedRowKeysList , handleRowSelectionOne, handleRowSelectionAll } = useRowSelection();


  const Router = useRouter();
  const userData = useSelector((state: RootState) => state.user); // Access user data from Redux
  const [tenantCode,setTenantCode] = useState("0002");
  const [branchCode,setBranchCode] = useState("00002");

  const [ dataList, setDataList ] = useState<CtlMstVehicleType[]|undefined>();

  const [ totalData, setTotalData ] = useState<number|undefined>(0);
  const [visible, setVisible] = useState<boolean>(false); 
  const [form] = Form.useForm<FormValues>();
  const [formSubmit] = Form.useForm<FormValues>();

  const [saveMode, setSaveMode] = useState<"ADD"|"EDIT"|null>(null); 
  const [dataIdForEdit, setDataIdForEdit] = useState<number|null|undefined>(null); 
  const [isLoadingPage,setIsLoadingPage] = useState<boolean>(false)
  const [isTableLoading,setIsTableLoading] = useState<boolean>(false)
  const [themeId, setThemeId] = useState<number|undefined>(undefined); 

  const [colorValue, setColorValue] = useState<string|null|undefined>();

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
    setIsLoadingPage(true)
    fetchGetData.fetch({
      tenantCode:tenantCode,
      branchCode:branchCode,
      pageIndex:1,
      pageSize:1
    }).then((value)=>{
      if(value.items?.length){
        const response = value.items[0]
        const id = response.id
        // formSubmit.setFieldsValue({
        //   color: "#ca1515" || '' , 
        // });
        setColorValue(response.color);

        setThemeId(id)
        // console.log("=>>>>>",id)
      }
    }).finally(()=>{
      setIsLoadingPage(false)

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
    }: GetDataParams) => {


      if (isLoadingTable) {
        setIsTableLoading(true);
      }else{
        setIsLoadingPage(true);
      }
    
      try {
        const res = await vehicleTypeApi.apiMasterVehicleTypeGetGet({
          pageIndex: currentPage,
          pageSize: currentPageSize,
          keyword: keywordSearch,
          tenantCode,
          branchCode,
          sortField,
          sortDirection: sortOrder,
          status,
        });
    
        if (res?.data && res.data.items) {
          setDataList(res.data.items);
          setTotalData(res.data.totalItems);
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
  
  
  
    const onClickToAdd = () => {
   
      setSaveMode("ADD")
      setVisible(true);

    }

    const onClickToEdit = async (param: {id: number}) => {
      setSaveMode("EDIT")
      try {

        const res = await fetchGetData.fetch( 
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
            color: responseData.color || '' , 
            // status: responseData.status || 'active', 
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

       

   
    const onSubmitForm = () =>{
      console.log("onSubmitForm===>>>");
      formSubmit
      .validateFields()
      .then((values) =>{
        setIsLoadingPage(true);

        console.log("values onSubmitForm",values.color)
        const paramForSave = {
          "id":themeId,
          "color":values.color,
          "pathUrl":"",
          "tenantCode": tenantCode,
          "branchCode": branchCode
        }
      fetchSaveData.fetch({themeManagementInput:paramForSave}).then(()=>{

      
          }).finally(()=>{

            setIsLoadingPage(false);
            setVisible(false); // Close the modal after submission
            form.resetFields(); // Reset form fields

          })


      })
      setSelectedRowKeysList([])
        

    }
    const onClearSearch = () =>{
      formSubmit.resetFields();
    }

    const onCloseFormModal = (): void => {
      console.log('onCloseFormModal')
      setVisible(false);
      form.resetFields(); // Reset form fields
    };
    const onSaveFormModal = (): void => {
      
      form
        .validateFields()
        .then((values:any) => {

          
          console.log('Form values:', values);
          if(saveMode === "ADD"){

         
            
            setIsLoadingPage(true)


          const paramForSave = {
              "type": values.typeName,
              "status": values.status,
              "tenantCode": tenantCode,
              "branchCode": branchCode
            }
          fetchSaveData.fetch({themeManagementInput:paramForSave}).then(()=>{
                // executeGetAllVehicle({pageIndex:page, pageSize:pageSize,tenantCode:tenantCode,branchCode:branchCode});
                getData({
                  currentPage: 1,
                  currentPageSize: 10,
                  sortOrder:"desc",
                  sortField: "updateTimestamp",
                  isLoadingTable:false
                });

              }).finally(()=>{

                // setIsLoadingPage(false)
                setVisible(false); // Close the modal after submission
                form.resetFields(); // Reset form fields

              })


          }else if(saveMode === "EDIT"){
            const code = dataIdForEdit
            const paramForEdit = {
              "code":code,
              "type": values.typeName,
              "status": values.status,
              "tenantCode": tenantCode,
              "branchCode": branchCode
            }
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
                
                fetchSaveData.fetch({themeManagementInput:paramForEdit}).then(() => {
                  getData({
                    currentPage: 1,
                    currentPageSize: 10,
      
                    isLoadingTable:false
                  });
                  })
                  .finally(() => {
                    // setIsLoadingPage(false);
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



    const contentProps: ThemeManagementContentProps = {
 
        dataList,
        totalData,
        visible,
        form,
        isLoadingPage,
        saveMode,
        selectedRowKeysList,
        isTableLoading,
        colorValue,
   
        onClickToEdit,

        onClickToAdd,
        onSubmitForm,
        onClearSearch,
        onCloseFormModal,
        onSaveFormModal,
     
    };


    return (
      <>
        <Row gutter={[ 8, 16 ]}>
          <Col span={24}>
              <Card  
                className={'shadow-effect'} 
                title={<Typography.Title  level={3} className="p-4">Theme Management</Typography.Title>}

                headStyle={{ padding: 24 }}
                bodyStyle={{ padding: 24 }}
              >
                  <Row gutter={[ 8, 8 ]}>
                  {/* /// ==================================================== ///    */}
                  <Col span={24}>
  <Card className="shadow-sm w-full max-w-2xl p-6 rounded-lg ml-0"> {/* Removed mx-auto and added ml-0 */}
    <Form layout="vertical" name="modal_form_layout"     
              onFinish={() => {}}
              className="flex flex-col md:space-y-4"
              labelAlign="left" 
              form={formSubmit}
        >
      {/* Color Picker */}
      <Form.Item
        name="color"
        label="Color Picker"
        // rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
      >
          <Space direction="vertical" style={{ width: '100%' }}>
          <ColorPicker 
            // defaultValue={colorValue} 
            className="w-full xs:w-3/6 md:w-2/6" // Adjust the classes for responsive width
            showText 
            allowClear 
            
            // onChangeComplete={(color)=>{
            //   console.log("color>>",color.toHex())
            // }}
            value={colorValue}

            onChange={(value) => {
              // Manually set the color value in the form
              formSubmit.setFieldValue('color' as never , value.toHexString()); 
              setColorValue(value.toHexString())
            }} 
          />
        </Space>
      </Form.Item>

      {/* Upload Logo */}
      <Form.Item
        name="upload"
        label="Upload Logo"
        // rules={[{ required: true, message: 'กรุณาเลือก!' }]}
      >
        <CustomUpload />
      </Form.Item>

      {/* Action Buttons */}
      <div className="flex justify-center mt-6"> {/* Center the buttons */}
        <CustomButton
          text="บันทึก"
          type="primary"
          className="bg-pl-primary text-white border-none !important w-full md:w-auto"
          onClick={onSubmitForm}
        />
      </div>
    </Form>
  </Card>
</Col>


                {/* /// ======================================================= //// */}

                  

                        {isLoadingPage && <CustomLoading />}

                      
                    

                  </Row>
              </Card>
              
          </Col>
        </Row>
      </>
    );
}


// ThemeManagementListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default ThemeManagementListContainer;