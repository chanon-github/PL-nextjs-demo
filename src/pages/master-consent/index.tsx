/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterConsent - Container
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
import { consentApi } from '@/services/central-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
// import { CrtVehicle } from '@/services/central-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import { ConsentApiApiConsentGetAllGetRequest, CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlMstFeeRate, FeeRateApiApiMasterFeeRateGetGetRequest, GetAllConsentItemOutput, HotelApiApiMasterHotelGetGetRequest, TenantApiApiMasterTenantGetGetRequest } from '@/services/central-api/generated';
import { ModalConfirmCrud } from '@/components/common';
import { add, constant } from 'lodash';
import { CustomButton } from '@/components/common/button/button';
import dayjs from 'dayjs';
import { EditOutlined, InfoOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { convertToFormattedNumeric } from '@/utils/functions/convert-numeric';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import type { MasterConsentContentProps, MasterConsentContainerProps, FormSearch, FormSubmit } from './index.model';

const MasterConsentListContainer: NextPageWithLayout<MasterConsentContainerProps> = ( props: MasterConsentContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
    
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ code, setCode ] = useState<string | undefined>();
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ setIsVisibleForm, setisVisibleForm ] = useState<boolean>(false);
  const [ isDisableAddChoice, setIsDisableAddChoice ] = useState<boolean>(true);
  const [ antdForm ] = Form.useForm<FormSubmit>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [ isUsedSubjectCode, setIsUsedSubjectCode ] = useState<boolean>(false);
  //** Hook for call api Example
  const useApiMasterConsentGet = useApi(consentApi, consentApi.apiConsentGetAllGet);
  const useApiMasterConsentGetSubjectCode = useApi(consentApi, consentApi.apiConsentSubjectGetAllGet);
  const useApiMasterConsentById = useApi(consentApi, consentApi.apiConsentGetGet);
  const useApiMasterConsentSave = useApi(consentApi, consentApi.apiConsentSavePost);
  
  useEffect(() => {
    
  }, []);

  
  /** Functionality section */

  useEffect(() => {
    masterConsentApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
    useApiMasterConsentGetSubjectCode.fetch({
      pageIndex: 1,
      pageSize: 1000,
    });
  }, []);

  
  /** Functionality section */
  const masterConsentApiRefetch = async (params :  ConsentApiApiConsentGetAllGetRequest ) =>{
    // console.log("params", params)
    const value = formSearch.getFieldsValue();
    console.log("valueFormSearch ==>", value.langauge)
    const res = await useApiMasterConsentGet.fetch({...params, 
      // pageIndex: pageIndex,
      // pageSize: pageSize,
      subject: value.subject,
      langauge: value.langauge,
      ...params
      // keyword: value.keyword,
      // status: value.status
    });
    return res
  } 
 
  const onClickToAdd = () => {
    setMode("add");
    setisVisibleForm(true);
  }

  const onClickToEdit = (param: {code: string; lang: string; uuid: string}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setisVisibleForm(true);
    setCode(param.code);
    
    useApiMasterConsentById.fetch({
      code: param.code,
      lang: param.lang,
      // uuid: param.uuid
    }).then((res) => {
      // antdForm.setFieldsValue({
      //   subjectCode: res.data?.subjectCode || undefined,
      //   lang: res.data?.lang || undefined,
      //   content: res.data?.content || undefined,
      //   name: res.data?.name || undefined,
      //   selectionType: res.data?.selectionType || undefined,
      //   choices: res.data?.choices?.map((choice) => ({description: choice.description || "", value: choice.value || ""})) || undefined
      // })
    });
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{

    // console.log(value)
    masterConsentApiRefetch({pageIndex: 1, pageSize: 10});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTable(selectedRowKeys);
  }

  const onSubmitForm = (value: FormSubmit) =>{
    // console.log(value);
    setIsModalConfirmVisible(mode === 'edit');
    if(mode == 'add'){
      onClickConfirmEdit();
    }
    // setMode("edit")
  }
  const onCloseModalForm = () =>{
    setMode("add");
    antdForm.resetFields();
    setisVisibleForm(false);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<GetAllConsentItemOutput> | SorterResult<GetAllConsentItemOutput>[],
    extra: TableCurrentDataSource<GetAllConsentItemOutput>
  ) =>{
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      masterConsentApiRefetch({
        pageIndex: pagination.current || 1, 
        pageSize: pagination.pageSize || 10, 
        sortDirection: sortDirection || "asc", 
        sortField: sorter.field?.toLocaleString()
      });
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
    console.log("value 55", value)
    useApiMasterConsentSave.fetch({
       saveConsentInput: {

        subjectCode: value.subjectCode,
        lang: value.lang,
        selectionType: value.selectionType,
        name: value.name,
        content: value.content,
        // choices: value.choices.map((choice, index) => ({
        //   description: choice.description,
        //   value: choice.value,
        //   sequence: index + 1
        // }))
      }
    }).then((res) => {
      if(!res.errors){
        masterConsentApiRefetch({ pageIndex: pageIndex, pageSize: pageSize});
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
    setisVisibleForm(false);
    antdForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    // useApiTenantDelete.fetch({
    //   deleteInput: {
    //     codes: rowSelectedTable.map((code) => `${code}`),
    //   }
    // }).then((res) => {
    //   if(res.data){
    //     masterConsentApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
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
   
    const onChangeSelectionType = (
      value: string, option: {
        label: string;
        value: string;
      } | {
        label: string;
        value: string;
      }[]
    ) =>{
      console.log("value Select", value, option)
      setIsDisableAddChoice(false);
    }
    
    const onChangeReactQuill = (content: string) =>{
      // if (!content.trim()) {
      //   console.log('Content is empty or only spaces');
      //   return;
      // }
  
      // Replace leading spaces with &nbsp; before submitting
      const formattedContent = content.replace(/^\s+/, (spaces) => spaces.replace(/ /g, '&nbsp;'));
      console.log('Formatted Content:', formattedContent);
    }
    const onChangeSubjectCode = (value: string) =>{
      const valueForm = antdForm.getFieldsValue();
      console.log("valueForm", valueForm);
      if(valueForm.subjectCode && valueForm.lang){
        useApiMasterConsentById.fetch({
          code: valueForm.subjectCode,
          lang: valueForm.lang,
          // uuid: "145b2eae-3b1d-4302-8a56-a783e14aceb0"
        }).then((res) => {
          console.log(res.data)
          setIsUsedSubjectCode(!!res.data);
          // console.log("res", !!res.data);
        })
      }
    }

    const onChangeLang = (value: string) =>{
      const valueForm = antdForm.getFieldsValue();
      console.log("valueForm", valueForm);
      if(valueForm.subjectCode && valueForm.lang){
        useApiMasterConsentById.fetch({
          code: valueForm.subjectCode,
          lang: valueForm.lang,
          // uuid: "145b2eae-3b1d-4302-8a56-a783e14aceb0"
        }).then((res) => {
          setIsUsedSubjectCode(!!res.data);
          // console.log("res", !!res.data);
        })
      }
    }

    const contentProps: MasterConsentContentProps = {
      pageIndex,
      pageSize,
      useApiMasterConsentGet,
      rowSelectedTable,
      antdForm,
      formSearch,
      setIsVisibleForm,
      mode,
      isModalConfirmVisible,
      useApiMasterConsentGetSubjectCode,
      isDisableAddChoice,
      isUsedSubjectCode,
      useApiMasterConsentById,
      onChangeSubjectCode,
      onChangeLang,
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
      onChangeSelectionType,
      onChangeReactQuill
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
        {renderModalCRUDForm(contentProps)}
       
      </>
    );
}
const renderOptionsAddAndRemove = (props: MasterConsentContentProps): ReactElement => {
  return (
    <Row gutter={[ 8, 8 ]} justify={"start"} align={"middle"}>
      <Col >
        <Button className='button-primary' onClick={props.onClickToAdd}>เพิ่ม</Button>
      </Col>
      {/* <Col>
      <Button className='button-error' onClick={props.onClickShowModalConfirm}>ลบ</Button>
      </Col> */}
    
    </Row>
  );
}
const renderOptions = (props: MasterConsentContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row gutter={[ 16, 8 ]} justify={"center"} align={"middle"}>
            <Col xs={24} md={10} >
              <Form.Item
                name="subject"
                label={"subjectCode"}
              >
                <Select  
                  className='w-full' 
                  // disabled={props.mode == "edit"}
                  options={props.useApiMasterConsentGetSubjectCode.data?.data?.items?.map((item) => ({label: item.name, value: item.code}))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10} >
              <Form.Item
                name="langauge"
                label={"ภาษา"}
              >
                <Select
                  className='w-full'
                  options={[
                    {
                      label: "ไทย",
                      value: "th",
                    },
                    {
                      label: "อังกฤษ",
                      value: "eng",
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={10} > </Col>
            <Col xs={24} md={10} >
              <Form.Item
                name="status"
                label={"สถานะ"}
              >
              <Select
                options={[{label: "ใช้งาน", value: "active"}, {label: "ไม่ใช้งาน", value: "inactive"}]}
                // labelInValue={false}
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

const renderTable = (props: MasterConsentContentProps): ReactElement => {
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
              key: "subjectCode",
              dataIndex: "subjectCode",
              title: "subjectCode",                
            },
            {
              key: "name",
              dataIndex: "name",
              title: "ชื่อ Consent",
              sorter: true,
            },
            {
              key: "lang",
              dataIndex: "lang",
              title: "ภาษา",
              sorter: true,
              render: (_, record) => {
                return record.lang === 'th' ? 'ไทย' : 'อังกฤษ';
              }
            },
            // {
            //   dataIndex: "status",
            //   title: "สถานะ",
            //   sorter: true,
            //   render: (_, record) => {
            //     return record.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน';
            //   }
            // },
            {
              dataIndex: "createTimestamp",
              title: "แก้ไขล่าสุด",
              render: (item) => 
                item ? dayjs(item).format('DD/MM/YYYY') : "-",
              sorter: true,
            },
            {
              key: "createBy",
              dataIndex: "createBy",
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
                        props.onClickToEdit({ code: record.subjectCode || "", lang: record.lang || "",  uuid: record.uuid || "" });
                      }}
                    />
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'code'}
        dataSource = {props.useApiMasterConsentGet.data?.data?.items || []}
        loading = {props.useApiMasterConsentGet.loading}
        size={'middle'}
        scroll={{ x: 'max-content' }}
        onChange = {props.onChangeTable}
        // rowSelection = {{
        //     selectedRowKeys: props.rowSelectedTable,
        //     onChange: props.onChangeRowSelection,
        // }}
        pagination={{
          current: props.pageIndex,
          pageSize: props.pageSize,
          total: props.useApiMasterConsentGet.data?.data?.totalItems,
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

const renderModalCRUDForm = (props: MasterConsentContentProps): ReactElement =>{
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม Master Consent" : "แก้ไข Master Consent"}
          open={props.setIsVisibleForm}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          // loading={props.useApiMasterConsentById.loading}
          // width={1000}
           width="75%"
        >

          <Form
            onFinish={props.onSubmitForm}
            form={props.antdForm}
            layout='vertical'
          >
            <Row gutter={[ 8, 8 ]}>
              <Col span={24} hidden={!props.isUsedSubjectCode}>
                <span className='text-[#ff4d4f]'>* subjectCode และ ภาษา ถูกใช้งานแล้ว กรุณาเลือกใหม่</span>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ชื่อ Consent"
                  name = "name"
                  rules={[{ required: true, message: 'กรุณากรอก ชื่อ Consent' }]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "subjectCode"
                  name = "subjectCode"
                  rules={[{ required: true, message: 'กรุณา เลือก subjectCode' }]}
                >
                  <Select  
                    className='w-full' 
                    disabled={props.mode == "edit"}
                    options={props.useApiMasterConsentGetSubjectCode.data?.data?.items?.map((item) => ({label: item.name, value: item.code}))}
                    onChange={(value) => {props.onChangeSubjectCode(value)}}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "ภาษา"
                  name = "lang"
                  
                  rules={[{ required: true, message: 'กรุณา เลือก ภาษา'}, 
                  ]}
                >
                  <Select
                    className='w-full'
                    disabled={props.mode == "edit"}
                    onChange={(value) => {props.onChangeLang(value)}}
                    options={[
                      {
                        label: "ไทย",
                        value: "th",
                      },
                      {
                        label: "อังกฤษ",
                        value: "eng",
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  label = "content"
                  name = "content"
                  rules={[
                    { 
                      required: true, 
                      validator: (_, value) => {
                        if (!value || value.trim() === '' || value === '<p><br></p>') {
                          return Promise.reject('กรุณากรอก content');
                        }
                        // ลบ HTML tags และตรวจสอบความยาว
                        // const textContent = value.replace(/<[^>]*>/g, '').trim();
                        // if (textContent.length < 10) {
                        //   return Promise.reject('content ต้องมีความยาวอย่างน้อย 10 ตัวอักษร');
                        // }
                        return Promise.resolve();
                      }
                    },
                  ]}
                >
                  <ReactQuill 
                    theme="snow"
                    onChange={props.onChangeReactQuill}
                    preserveWhitespace={true}
                    // modules={
                    //   {
                    //     toolbar: [
                    //       [{ 'list': 'ordered' }],
                    //       ['clean']
                    //     ],
                    //   }
                    // }
                    // formats={
                    //   [
                    //     'header',
                    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
                    //     'list', 'bullet', 'indent',
                    //     'link'
                    //   ]
                    // }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Form.Item
                  label = "รูปแบบ ตัวเลือก"
                  name = "selectionType"
                  rules={[{ required: true, message: 'กรุณา เลือก รูปแบบ ตัวเลือก'}, 
                  ]}
                >
                  <Select
                    className='w-full'
                    onChange={props.onChangeSelectionType}
                    options={[
                      {
                        label: "radio",
                        value: "radio",
                      },
                      {
                        label: "checkbox",
                        value: "checkbox",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                ตัวเลือก
              </Col>
              {/* <Col xs={24} md={24} xl={24}>
                <Form.List
                  name="contents"
                  initialValue={[{ content: '', choices: [{ description: '', value: '' }] }]}
                >
                  {(contentFields, { add: addContent, remove: removeContent }) => (
                    <>
                      <Form.Item>
                        <Button className="button-primary" onClick={() => addContent()} icon={<PlusOutlined />}>
                          เพิ่มเนื้อหา
                        </Button>
                      </Form.Item>
                      {contentFields.map((contentField, contentIndex) => (
                        <div key={contentField.key} style={{ marginBottom: 24, border: '1px solid #d9d9d9', padding: 16 }}>
                          <Row gutter={[8, 8]}>
                            <Col span={24} className='flex justify-end'>
                              {contentIndex !== 0 && (
                                <Button
                                  className="button-error"
                                  onClick={() => removeContent(contentField.name)}
                                  icon={<MinusCircleOutlined />}
                                >
                                  ลบเนื้อหา
                                </Button>
                              )}
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                {...contentField}
                                name={[contentField.name, 'content']}
                                rules={[{ required: true, message: 'กรุณากรอกเนื้อหา' }]}
                              >
                                <ReactQuill 
                                  theme="snow"
                                  preserveWhitespace={true}
                                  
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.List name={[contentField.name, 'choices']}>
                            {(choiceFields, { add: addChoice, remove: removeChoice }) => (
                              <>
                                <Form.Item>
                                  <Button className="button-primary" onClick={() => addChoice()} icon={<PlusOutlined />}>
                                    เพิ่มตัวเลือก
                                  </Button>
                                </Form.Item>
                                {choiceFields.map((choiceField, choiceIndex) => (
                                  <Row key={choiceField.key} gutter={[8,8]} >
                                    <Col xs={24} sm={24} md = {10} lg={10} xl={10}>
                                      <Form.Item
                                        {...choiceField}
                                        name={[choiceField.name, 'description']}
                                        rules={[{ required: true, message: 'กรุณากรอกตัวเลือก' }]}
                                      >
                                        <Input placeholder="คำอธิบาย ตัวเลือก" />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md = {10} lg={10} xl={10}>
                                      <Form.Item
                                        {...choiceField}
                                        name={[choiceField.name, 'value']}
                                        rules={[{ required: true, message: 'กรุณากรอก code' }]}
                                      >
                                        <Input placeholder="code" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      {choiceIndex !== 0 && (
                                        <Button
                                          className="button-error"
                                          onClick={() => removeChoice(choiceField.name)}
                                          icon={<MinusCircleOutlined />}
                                        >
                                          ลบ
                                        </Button>
                                      )}
                                    </Col>
                                  </Row>
                                ))}
                              </>
                            )}
                          </Form.List>
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col> */}
              <Col xs={24} md={12} xl={24}>
                <Form.List 
                  name="choices"
                 initialValue={[{ description: '', value: '' }]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      <Form.Item>
                        <Button  className="button-primary"  onClick={() => add()}  icon={<PlusOutlined />}>
                          เพิ่มตัวเลือก
                        </Button>
                      </Form.Item>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restField}
                            name={[name, 'description']}
                            rules={[{ required: true, message: 'กรุณากรอกตัวเลือก' }]}
                          >
                            <Input placeholder="คำอธิบาย ตัวเลือก" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            rules={[{ required: true, message: 'กรุณากรอก code' }]}
                          >
                            <Input placeholder="code" />
                          </Form.Item>
                          {index !== 0 && ( // Only show delete button if it's not the first row
                            <Button 
                              className="button-error" 
                              onClick={() => remove(name)} 
                              icon={<MinusCircleOutlined />}
                            >
                              ลบ
                            </Button>
                          )}
                        </Space>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Row justify={'center'} align={'middle'} gutter={[ 8, 8 ]}>
              <Col>
                <Button
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
                  disabled={props.isUsedSubjectCode}
                >
                  บันทึก
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
  )
}


// MasterConsentListContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default MasterConsentListContainer;