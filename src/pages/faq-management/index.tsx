/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Container
 */

import { type ReactElement, useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
// import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
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
import { contentApi, contentCategoryApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { notify } from '@/utils/functions/notification';
import type { FaqManagementContentProps, FaqManagementListContainerProps, FormSearch, MasterFaqForm } from './index.model';
import { CrtPackage, PackageApiApiPackageSearchGetRequest, PackageItemSearchOutput } from '@/services/rental-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import dayjs from 'dayjs';
import { ArrowLeftOutlined, EditOutlined, FileTextOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { ModalConfirmCrud, UploadFileComponent } from '@/components/common';
import { fileApi } from '@/services/central-api';
import { CtlContent } from '@/services/central-api/generated';
import dynamic from 'next/dynamic';

import { Quill } from 'react-quill';
import { ForwardedRef } from 'react';
import { ReactQuillProps } from 'react-quill';

interface DynamicQuillProps extends ReactQuillProps {
  forwardedRef?: ForwardedRef<any>;
}
// import ImageUploader from "quill-image-uploader";
// Quill.register("modules/imageUploader", ImageUploader);
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false },);
// const ReactQuill = dynamic<DynamicQuillProps>(
//   async () => {
//     const { default: RQ } = await import("react-quill");

//     return ({ forwardedRef, ...props }: DynamicQuillProps) => (
//       <RQ ref={forwardedRef} {...props} />
//     );
//   },
//   {
//     ssr: false
//   }
// );
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const FaqManagementListContainer: NextPageWithLayout<FaqManagementListContainerProps> = ( props: FaqManagementListContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ packageCode, setPackageCode ] = useState<string | undefined>();
  const [ id, setId ] = useState<number | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormMasterPackage, setIsVisibleFormMasterPackage ] = useState<boolean>(false);
  const [ antdForm ] = Form.useForm<MasterFaqForm>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ imageUrl, setImageUrl ] = useState<string | undefined>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const quillRef = useRef<any>(null);


  //** Hook for call api Example
  const useApiFaqGet = useApi(contentApi, contentApi.apiContentGetGet);
  const useApiFaqGetById = useApi(contentApi, contentApi.apiContentGetGet);
  const useApiFaqSave = useApi(contentApi, contentApi.apiContentSavePost);
  const useApiFaqDelete = useApi(contentApi, contentApi.apiContentDeleteDelete);
  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);
  const useApiContentCategory = useApi(contentCategoryApi, contentCategoryApi.apiContentCategoryGetGet);


  useEffect(() => {
    // formSearch.setFieldsValue({
    //   type: 'main'
    // })
    // useApiFaqGet.data?.items
    if (Router.isReady) {
      useApiContentCategory.fetch({
        ...constantBranch,
        pageIndex: 1,
        pageSize: 1000,
        // isActive: true,
      });
      packageItemApiRefetch({pageIndex: pageIndex, pageSize: pageSize, });
    }
  
  }, [Router.isReady]);

  
  /** Functionality section */
  const setCodeFromPath =  () =>{
    const { packageCode } = Router.query as { packageCode: string; };
    setPackageCode(packageCode);
    return packageCode;
  }

  const packageItemApiRefetch = async (params : PackageApiApiPackageSearchGetRequest ) =>{
    const _packageCode = setCodeFromPath();
    console.log("packageCode==>>",_packageCode)
    const value = formSearch.getFieldsValue();
    const res = await useApiFaqGet.fetch({...params, 
      ...constantBranch,
      metaKeyword: value.metaKeyword,
      isActive: value.isActive
      // name: value.name,
      // code: value.code,
      // packageCode: _packageCode,
      // isActive: value.isActive,
      // type: value.type
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
    // console.log('code==>>',param.code)
    useApiFaqGetById.fetch({
      id: param.id,
      ...constantBranch,

      pageIndex: 1, 
      pageSize: 1
    }).then((res) => {
        antdForm.setFieldsValue({
          categoryCode: res.items?.[0]?.categoryCode || undefined,
          description: res.items?.[0]?.description || undefined,
          content: res.items?.[0]?.content || undefined,
          isActive: res.items?.[0]?.isActive || false,
          metaDescription: res.items?.[0]?.metaDescription?.split(',') || undefined,
          metaKeyword: res.items?.[0]?.metaKeyword || undefined,
          slug: res.items?.[0]?.slug || undefined,
          imageUrl: res.items?.[0]?.thumbmailUrl || undefined,
        })
        setImageUrl(res.items?.[0]?.thumbmailUrl || undefined);
      });
 
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    packageItemApiRefetch({pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: MasterFaqForm) =>{
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
      packageItemApiRefetch({pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
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
    console.log("value==>>",value)
    useApiFaqSave.fetch({
       faqInput: {
        id: mode === "edit" ? id : undefined,
        metaKeyword: value.metaKeyword,
        metaDescription: value.metaDescription.join(","),
        description: value.description,
        content: value.content,
        isActive: value.isActive,
        categoryCode: "faq",
        slug: value.slug,
        thumbmailUrl: imageUrl,
        ...constantBranch
      }
    }).then((res) => {
      if(res.data){
        packageItemApiRefetch({
          pageIndex: pageIndex, 
          pageSize: pageSize, 
        });
        notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
        antdForm.setFieldsValue({imageUrl: imageUrl})
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
    useApiFaqDelete.fetch({
      faqDeleteInput: {
        id: rowSelectedTable.map((id) => Number(id)),
        ...constantBranch
        // tenantCode: constantBranch.tenantCode,
        // branchCode: constantBranch.branchCode
      }
    }).then((res) => {
      if(res.data){
        packageItemApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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
          docType: "faq"
        }).then((res) => {
          if(res.data){
            setImageUrl(res.data?.url || "");
            antdForm.setFieldsValue({imageUrl: res.data?.url || ""});
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
  const handleImageUpload = async () => {
    console.log(9999)
    // const input = document.createElement('input');
    // input.setAttribute('type', 'file');
    // input.setAttribute('accept', 'image/*');
    // input.click();

    // input.onchange = async () => {
    //   const file = input.files?.[0];
    //       //  const range = quillRef.current.getEditor().getSelection();
    //        if (quillRef.current) {
    //         const range = quillRef.current.getEditor().getSelection();
    //         if (range) {
    //           console.log(999999999)
    //           quillRef.current.getEditor().insertEmbed(range.index, 'image',  "https://placehold.co/1280x1280");
    //         }
    //       }
    //       //   if (range) {
    //       //   quillRef.current.getEditor().insertEmbed(range.index, 'image', "https://placehold.co/1280x1280");
    //       // }
    //   // try{
    //   //   const resImg = await useApiFileUpload.fetch({
    //   //     docType: "faq",
    //   //     fileType: "pub-content",
    //   //     file: file,
    //   //   })
    //   //   if(resImg.data){
    //   //     const range = quillRef.current.getEditor().getSelection();
    //   //       if (range) {
    //   //       quillRef.current.getEditor().insertEmbed(range.index, 'image', resImg.data.url);
    //   //     }
    //   //   }
    //   //   else{
    //   //     notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
    //   //   }
    //   // }
    //   // catch(err){
    //   //   notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
    //   // }
      
    // };
  };

  // const ImageHandler = useCallback(() => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files?.[0];
  //     if (!file) return;

  //     const formData = new FormData();
  //     formData.append('image', file);

  //     try {
  //       // Replace this URL with your actual image upload endpoint
  //       const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       const data: { imageUrl: string } = await response.json();
  //       const quill = quillRef.current?.getEditor();
  //       if (quill) {
  //         const range = quill.getSelection(true);
  //         quill.insertEmbed(range.index, 'image', data.imageUrl);
  //       }
  //     } catch (error) {
  //       console.error('Error uploading image: ', error);
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (quillRef.current) {
  //     const quill = quillRef.current.getEditor();
  //     quill.getModule('toolbar').addHandler('image', ImageHandler);
  //   }
  // }, [ImageHandler]);

  const onGetImageUrlUploaded = (imageUrl?: string) => {
    if(imageUrl){
      antdForm.setFieldsValue({imageUrl: imageUrl});
      setImageUrl(imageUrl);
    }
  }
  
  const contentProps: FaqManagementContentProps = {
    pageIndex,
    pageSize,
    useApiFaqGet,
    rowSelectedTable,
    antdForm,
    formSearch,
    isVisibleFormMasterPackage,
    mode,
    isModalConfirmVisible,
    imageUrl,
    useApiContentCategory,
    quillRef,
    handleImageUpload,
    // ImageHandler,
    onChangeUploadImg,
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
    onClickToPreviousePage,
    onGetImageUrlUploaded
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


const renderOptionsAddAndRemove = (props: FaqManagementContentProps): ReactElement => {
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
const renderOptions = (props: FaqManagementContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10}>
              <Form.Item
                name="metaKeyword"
                label={"Meta Keyword"}
              >
                <Input/>
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
                name="type"
                label={"ชนิด รายการแพ็คเกจ"}
              >
                <Select
                  options={[{label: "main", value: "main"}, {label: "misc", value: "misc"}]}
                />
              
              </Form.Item>
            </Col> */}
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

const renderTable = (props: FaqManagementContentProps): ReactElement => {
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
              key: "metaKeyword",
              dataIndex: "metaKeyword",
              title: "Meta Keywod",                
              sorter: true,
              render: (_, record) => {
                return record?.metaKeyword
              }
            },
            {
              key: "metaDescription",
              dataIndex: "metaDescription",
              title: "Meta Description",                
              sorter: true,
              render: (_, record) => {
                return record?.metaDescription
              }
            },
            {
              key: "description",
              dataIndex: "description",
              title: "คำอธิบาย",
              sorter: true,
            },
            // {
            //   key: "content",
            //   dataIndex: "content",
            //   title: "เนื้อหา",
            //   sorter: true,
            // },
            {
              key: "slug",
              dataIndex: "slug",
              title: "ชื่อเนื้อหา",
              sorter: true,
            },
            // {
            //   key: "categoryCode",
            //   dataIndex: "categoryCode",
            //   title: "หมวดหมู่",
            //   sorter: true,
            // },
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
                        props.onClickToPackageItem({ code: record.code || "" });
                      }}
                    /> */}
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'id'}
        dataSource = {props.useApiFaqGet.data?.items || []}
        loading = {props.useApiFaqGet.loading}
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
          total: props.useApiFaqGet.data?.totalItems,
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

const renderModalCRUDForm = (props: FaqManagementContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม รายการแพ็คเกจ" : "แก้ไข รายการแพ็คเกจ"}
          open={props.isVisibleFormMasterPackage}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          // zIndex={10}
          width={1000}
        >
          <Form
            onFinish={props.onSubmitForm}
            form={props.antdForm}
            layout='vertical'
          >
            <Row gutter={[ 8, 8 ]}>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "Meta Keywod"
                  name = "metaKeyword"
                  rules={[
                    { required: true, message: 'กรุณากรอก Meta Keywod' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "Meta Description"
                  name = "metaDescription"
                  rules={[
                    { required: true, message: 'กรุณากรอก Meta Description' },
                  ]}
                >
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    // dropdownRender={() => <div />}
                    dropdownStyle={{ display: 'none' }}
                    listHeight={0}
                    // onChange={handleChange}
                    tokenSeparators={[',']}
                    // options={options}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label = "คำอธิบาย"
                  name = "description"
                  rules={[
                    { required: true, message: 'กรุณากรอก คำอธิบาย' },
                  ]}
                >
                  <Input.TextArea rows={3} className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label = "เนื้อหา"
                  name = "content"
                  rules={[
                    { required: true, message: 'กรุณากรอก เนื้อหา' },
                  ]}
                >
                  <ReactQuill 
                    theme="snow"
                    preserveWhitespace={true}
                    // re
                    // ref={props.quillRef}
                    modules={
                      {
                        toolbar: {
                          container: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            // ['code-block'],
                            // ['link', 'image'],
                            ['clean'],
                            [{ 'color': [] }, { 'background': [] }] 
                          ],
                          // handlers: {
                          //   image: props.handleImageUpload,
                          // },
                        },
                        // imageUploader: {
                        //   upload: props.handleImageUpload,
                        // }
                      }
                    }
                  />
                </Form.Item>
              </Col>
              {/* <Col xs={24} md={12} >
                <Form.Item
                  label = "หมวดหมู่"
                  name = "categoryCode"
                  rules={[
                    { required: true, message: 'กรุณากรอก หมวดหมู่' },
                  ]}
                >
                  <Select 
                    placeholder="ตำแหน่ง"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={
                      props.useApiContentCategory.data?.items?.map((data) => ({
                        label: data.description,
                        value: data.code
                      }))
                    }
                  />
                </Form.Item>
              </Col> */}
            
              <Col xs={24} md={12} >
                <Form.Item
                  label = "ชื่อเนื้อหา"
                  name = "slug"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่อเนื้อหา' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <UploadFileComponent 
                  imageUrl={props.imageUrl}
                  onGetImageUrlUploaded={props.onGetImageUrlUploaded}
                  isRequired={true}
                />
                {/* <Row gutter={[ 8, 8 ]}>
                  <Col>
                    <Form.Item
                      label = "Thumbnail"
                      name = "thumbmailUrl"
                      // rules={[{ required: true, message: 'กรุณาเลือก อัพโหลด Thumbnail  ' }]}
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
                  {
                    props.imageUrl && (
                      <Col>
                        <Form.Item
                            label = " "
                        >
                          <Image src={props.imageUrl} alt="Uploaded Image"  style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                        </Form.Item>
                      
                      </Col>
                    )
                  }           
                </Row>      */}
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




// FaqManagementListContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default FaqManagementListContainer;