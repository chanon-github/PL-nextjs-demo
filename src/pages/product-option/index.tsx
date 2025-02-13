/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ProductOption - Container
 */
import type { ProductOptionContentProps, ProductOptionContainerProps, FormSearch ,FormValues , GetDataParams} from './index.model';
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
    TablePaginationConfig
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

import { vehicleTypeApi ,vehicleOptionApi } from '@/services/central-api/index';
import {   CrtVehicleOption } from '@/services/central-api/generated';
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



const ProductOptionListContainer: NextPageWithLayout<ProductOptionContainerProps> = ( props: ProductOptionContainerProps ): ReactElement => {
  /** Hook section */
  const fetchGetData = useApi(vehicleOptionApi,vehicleOptionApi.apiMasterVehicleOptionGetGet)
  const fetchSaveData = useApi(vehicleOptionApi,vehicleOptionApi.apiMasterVehicleOptionSavePost)
  const fetchRemoveData = useApi(vehicleOptionApi,vehicleOptionApi.apiMasterVehicleOptionDeleteDelete)
  const { selectedRowKeysList, setSelectedRowKeysList , handleRowSelectionOne, handleRowSelectionAll } = useRowSelection();


  const Router = useRouter();
  const userData = useSelector((state: RootState) => state.user); // Access user data from Redux
  const [tenantCode,setTenantCode] = useState("0002");
  const [branchCode,setBranchCode] = useState("00002");

  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [sortOrder, setSortOrder] = useState<string| undefined>(undefined);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [ dataList, setDataList ] = useState<CrtVehicleOption[]|undefined>();

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

  }, []);
      
  
  /** Functionality section */

    const getData = async ({
      currentPage,
      currentPageSize,
      sortOrder = "desc",
      sortField = "updateTimestamp",
      keywordSearch,
      status,
      optionType,
      optionName,
      isLoadingTable = false,
    }: GetDataParams) => {


      if (isLoadingTable) {
        setIsTableLoading(true);
      }else{
        setIsLoadingPage(true);
      }
    
      try {
        // const res = await vehicleTypeApi.apiMasterVehicleTypeGetGet({
        //   pageIndex: currentPage,
        //   pageSize: currentPageSize,
        //   keyword: keywordSearch,
        //   tenantCode,
        //   branchCode,
        //   sortField,
        //   sortDirection: sortOrder,
        //   status,
        // });
        const res = await fetchGetData.fetch({
             pageIndex: currentPage,
              pageSize: currentPageSize,
              // keyword: keywordSearch,
              tenantCode,
              branchCode,
              sortField,
              sortDirection: sortOrder,
              status,
              type:optionType,
              option:optionName
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
  
  
  
  const handleCloseModal = () => {
    console.log('Edit cancelled');
    setModalVisible(false);
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

    const onClickToEdit = async (param: {id: number}) => {
      setSaveMode("EDIT")
      try {
        const res = await fetchGetData.fetch({
              id:param?.id,
              pageIndex:1, 
              pageSize:1,
              tenantCode:tenantCode,
              branchCode:branchCode,
        })
    
        // Check if the response contains data
        if (res && res?.items && res?.items?.length>0 ) {
          // // Set the form values with the data
          const responseData = res.items[0]; 
          setDataIdForEdit(responseData?.id)
          form.setFieldsValue({
            optionType: responseData.type || '' , 
            optionName: responseData.option||undefined,
            // price:responseData.price||undefined,
            limit:responseData.limit?.toString() ||undefined,

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

    const onClickRemove = () => {
        console.log("selectedRowKeysList",selectedRowKeysList)
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

                // getData(page, pageSize,undefined,undefined,undefined,false)
                getData({
                  currentPage: page,
                  currentPageSize: pageSize,
                  isLoadingTable:false
                });

              }).finally(()=>{
                  // setIsLoadingPage(false);
                  setVisible(false); // Close the modal after submission
                  form.resetFields(); // Reset form fields
                  setModalVisible(false); // Close the confirmation modal
                  setSelectedRowKeysList([]); // clear selected list

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
      
        getData({
          currentPage: page,
          currentPageSize: pageSize,
          keywordSearch:values.optionName,
          status:values.status,
          isLoadingTable:true,
          optionName:values.optionName,
          optionType:values.optionType

        });

      })
      setSelectedRowKeysList([])
        

    }
    const onClearSearch = () =>{
      formSearch.resetFields();
    }

    const onCloseFormModal = (): void => {
      console.log('onCloseFormModal')
      setVisible(false);
      form.resetFields(); // Reset form fields
    };
    const onSaveFormModal = (): void => {
      
      form
        .validateFields()
        .then((values) => {

          
          console.log('Form values:', values);
          if(saveMode === "ADD"){

         
            
            setIsLoadingPage(true)

            // const limit = values.limit ? Number(values.limit) : undefined;
            const limit = values.limit ? values.limit.toString()  : undefined

          const paramForSave = {
              "id":null,
              "type": values.optionType,
              "status": values.status,
              // "price":values.price,

              "option": values.optionName,
              "limit": limit,

              "tenantCode": tenantCode,
              "branchCode": branchCode
            }
           
          fetchSaveData.fetch({masterVehicleOptionInput:paramForSave}).then(()=>{
                // executeGetAllVehicle({pageIndex:page, pageSize:pageSize,tenantCode:tenantCode,branchCode:branchCode});
                getData({
                  currentPage: page,
                  currentPageSize: pageSize,
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
            const limit = values.limit ? values.limit.toString()  : undefined

            const paramForEdit = {
                "id":code,
                "type": values.optionType,
                "status": values.status,
                // "price":values.price,
  
                "option": values.optionName,
                "limit": limit,
  
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
                
                fetchSaveData.fetch({masterVehicleOptionInput:paramForEdit}).then(() => {
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
      sorter: SorterResult<CrtVehicleOption> | SorterResult<CrtVehicleOption>[] ,
      extra: TableCurrentDataSource<CrtVehicleOption>
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

    const contentProps: ProductOptionContentProps = {
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
        onChangePage,
        onChangePageSize,
        onClickToEdit,

        onClikToView,
        onClickRemove,
        onClickToAdd,
        onSubmitSearch,
        onClearSearch,
        onCloseFormModal,
        onSaveFormModal,
        // onSetSelectedValue,
        onHandleTableChange,
        onHandleRowSelectionOne:handleRowSelectionOne,
        onHandleRowSelectionAll:handleRowSelectionAll ,
        // showTotal,
    };


    return (
      <>
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
                                name="optionName"
                                label={
                                  <span className=" text-start md:text-end" style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ชื่อ Option
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }} 
                              >
                                <Input className="w-full z-10	"  placeholder="ค้นหาประเภท" allowClear />
                              </Form.Item>

                            </Col>

                            <Col xs={24} md={10}> 
                              <Form.Item
                                name="optionType"
                                label={
                                  <span className=" text-start md:text-end" 
                                  style={{ width: '200px',  whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                    ประเภท
                                  </span>
                                }
                                className="w-full md:ml-10 "
                                labelCol={{ span: 8 }} 
                                wrapperCol={{ span: 16 }} 
                              >
                                <Select className="w-full" placeholder="เลือกประเภท" allowClear>
                                  <Option value="">ทั้งหมด</Option>
                                  <Option value="internal">Internal</Option>
                                  <Option value="external">External</Option>
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


const renderOptions = (props: ProductOptionContentProps): ReactElement => {
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


const renderTable = (props: ProductOptionContentProps): ReactElement => {

  const onShowTotal = (total: number,range:[number,number]) => `รายการ ${range[0]}-${range[1]} จาก ${total}`;

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
            

            width: 100,
          },
          {
            dataIndex: "type",
            title: "ประเภท",
            sorter: true,
            ellipsis: true,
            width: 200, // Set a fixed width
          },
          {
            dataIndex: "option",
            title: "ชิ่อ Option",
            sorter: true,
            ellipsis: true,
            // width: 200, // Set a fixed width
          },
          // {
          //   dataIndex: "price",
          //   title: "ราคา",
          //   sorter: true,
          //   ellipsis: true,
          //   width: 200, // Set a fixed width
          // },
          {
            dataIndex: "limit",
            title: "Limit",
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
          },
          {
            title: "แก้ไข",
            render: (row1) => (
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
            ),
            width: 100, // Optional: set a width for the edit button
          },
        ]}
        rowSelection={rowSelection }

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
          pageSizeOptions: [2,10, 15, 20, 50],
          onChange: props.onChangePage,
          showSizeChanger: true,
          simple: true,
          showTotal: (total: number, range: [number, number]) => onShowTotal(total, range),
        }}
      />
    </>
  );
}

const renderModalForm = (props: ProductOptionContentProps): ReactElement => {
  // console.log("fetchGetVehicleTypeData",props.getVehicleTypeData)


  return(
    <>
            <Modal
                title={props.saveMode === "ADD" ? "เพิ่ม Option" : "แก้ไข Option"}
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
                          name="optionType"
                          label="ประเภท"
                          rules={[{ required: true, message: 'กรุณาเลือก!' }]}
                        >
                          <Select placeholder="เลือกประเภท">
                            <Option value="internal">Internal</Option>
                            <Option value="external">External</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={12}>
                      <Form.Item
                          name="optionName"
                          label="ชื่อ Option"
                          rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
                        >
                          <Input placeholder="ชื่อ Option" allowClear />
                        </Form.Item>
                      </Col>

                      {/* <Col xs={24} md={12}>
                      <Form.Item
                          name="price"
                          label="ราคาต่อหน่วย"
                          rules={[
                            { required: true, message: 'กรุณากรอกข้อมูล!' },
                            {
                              validator(_, value) {
                          
                                // Check if the value is a valid number
                                if (!value || !/^\d+(\.\d+)?$/.test(value)) { // Allows integers and decimals
                                  return Promise.reject(new Error('กรุณากรอกตัวเลขเท่านั้น!'));
                                }
                                
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input placeholder="ราคา Option" allowClear />
                        </Form.Item>
                      </Col> */}

                      <Col xs={24} md={12}>
                      <Form.Item
                          name="limit"
                          label="Limit"
                          rules={[{ required: true, message: 'กรุณากรอกข้อมูล!' }]}
                        >
                          <Input placeholder="limit" type='number' allowClear />
                        </Form.Item>
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


// ProductOptionListContainer.getLayout = (page: ReactElement) => (
//   <>
//       { page }
//   </> 
// )

export default ProductOptionListContainer;