/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Container
 */

import { type ReactElement, useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
// import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/router';
import thailandAddress from '@/utils/constants/thailand-address.min.json'
import { bookingApi, carRentalApi } from '@/services/rental-api';
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
  UploadFile,
  DatePicker,
  Table,
  RadioChangeEvent,
  
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import useApi from '@/hooks/api/use-api';
import { packageApi } from '@/services/rental-api';
import { contentApi, contentCategoryApi, locationApi, vehicleMasterApi, branchApi, customerApi, paymentApi, titleApi } from '@/services/central-api';
import { dropdownApi} from '@/services/rental-api';
import { CrudMode } from '@/utils/type/crud-types';
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { notify } from '@/utils/functions/notification';
import { BookingApiApiBookingSearchGetRequest, BookingRequestFormInput, BookingRequestSearchOutput, CrtPackage, PackageApiApiPackageSearchGetRequest, PackageItemSearchOutput } from '@/services/rental-api/generated';
import { constantBranch } from '@/utils/constants/branchCode';
import dayjs from '@/utils/dayjs-config';
import { ArrowLeftOutlined, EditOutlined, FileTextOutlined, LeftCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalConfirmCrud, UploadFileComponent, FormBooking } from '@/components/common';
import { fileApi } from '@/services/central-api';
import { CtlContent, CusCustomerOutput } from '@/services/central-api/generated';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { BookingContentProps, BookingListContainerProps, BookingRequest, FormSearch, BookingFormRequest, ModelTest, Selected, ThailandAddress, Address } from './index.model';
import { debounceFn } from '@/utils/functions/debounce';


const BookingListContainer: NextPageWithLayout<BookingListContainerProps> = ( props: BookingListContainerProps ): ReactElement => {
  /** Hook section */
  const Router = useRouter();
  
  const [ pageIndex, setPageIndex ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ packageCode, setPackageCode ] = useState<string | undefined>();
  const [ id, setId ] = useState<number | undefined>();
  const [ bookingNo, setBookingNo ] = useState<string | undefined>();
  const [ bookingRequestNo, setBookingRequestNo] = useState<string | undefined>();
  const [ statusBooking, setStatusBooking ] = useState<"draft" | "pending">("draft");
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableDriver, setRowSelectedTableDriver ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableOptions, setRowSelectedTableOptions ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableVoucher, setRowSelectedTableVoucher ] = useState<Array<number | string>>([]);
  // const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);
  const [ isVisibleFormBooking, setIsVisibleFormBooking ] = useState<boolean>(false);
  const [ isVisibleFormBookingForm, setIsVisibleFormBookingForm ] = useState<boolean>(false);

  const [isCheckedTax, setIsCheckedTax] = useState<boolean>(false);
  const [isDisableCheckBoxSaveDb, setIsDisableCheckBoxSaveDb] = useState<boolean>(true);
  // const [isDisableTax, setIsDisableTax] = useState<boolean>(true);
 
  const [ formBookingForm ] = Form.useForm<BookingFormRequest>();
  const [ formBooking ] = Form.useForm<BookingRequest>();
  const [ customerAddressId, setCustomerAddressId] = useState<number[]>();
  const [ formSearch ] = Form.useForm<FormSearch>();
  const [ imageUrl, setImageUrl ] = useState<string | undefined | null>();
  const [ attachIdentity, setAttachIdentity ]  = useState<string | undefined >();
  const [ attachDrivingLicense, setAttachDrivingLicense ]  = useState<string | undefined>();
  const [ attachEmployeeCard, setAttachEmployeeCard ]  = useState<string | undefined >();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [isVisibleModalShortTerm, setIsVisibleModalShortTerm] = useState(false);
  const [addressThailand, setAddressThailand]  = useState<ThailandAddress[] | []>(thailandAddress.slice(0, 9));
  const [addressThailandTax, setAddressThailandTax]  = useState<ThailandAddress[] | []>(thailandAddress.slice(0, 9));
  const [dataTest, setDataTest] = useState<ModelTest[]>([{id: 1, name: 'test 1'}, {id: 2, name: 'test 2'}, {id: 3, name: 'test 3'}, {id: 4, name: 'test 4'}]);
  const [selectedItems, setSelectedItems] = useState<Selected>({});
  const [dataSourceCustomer, setDataSourceCustomer] = useState<CusCustomerOutput[] | []>([]);
  const [isAddNewCustomer, setIsAddNewCustomer] = useState<boolean>(false);
  const [ recordStatusBooking, setRecordStatusBooking ]  = useState<string | undefined >();

  // const [boookingFormStatus,  setBoookingFormStatus] = useState();

  const [customerTypeValue, setCustomerTypeValue] = useState<string | undefined>(undefined);
  
  const quillRef = useRef<any>(null);


  //** Hook for call api Example
  const useApiBookingGet = useApi(bookingApi, bookingApi.apiBookingSearchGet);
  const useApiBookingGetById = useApi(bookingApi, bookingApi.apiBookingSearchGet);
  const useApiBookingSave = useApi(bookingApi, bookingApi.apiBookingCreateBookingRequestPost);
  const useApiBookingDelete = useApi(contentApi, contentApi.apiContentDeleteDelete);

  const formBookingFormSave = useApi(bookingApi, bookingApi.apiBookingCreateBookingPost);

  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);
  const useApiContentCategory = useApi(contentCategoryApi, contentCategoryApi.apiContentCategoryGetGet);
  const responseLocation = useApi(
    locationApi,  locationApi.apiMasterLocationGetAllGet
  );
  const useApiMasterPriceTierGet = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetAllPriceTierGet);

  const useApiVehicleMaster = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetGet);

  const useApiAcctMgr = useApi(dropdownApi, dropdownApi.apiDropdownGetAcctMgrGet);

  const useApiUsageAddress = useApi(dropdownApi, dropdownApi.apiDropdownGetUsageAddressGet);

  const useApiPaymentRental = useApi(dropdownApi, dropdownApi.apiDropdownGetRentalPaymentGet);

  const useApiPackageSd = useApi(dropdownApi, dropdownApi.apiDropdownGetPackageSdGet);

  const useApiPacakge = useApi(packageApi, packageApi.apiPackageSearchGet);

  const useApiAllOptions = useApi(carRentalApi, carRentalApi.apiCarRentalGetAllOptionsGet);

  const useApiBranch = useApi(branchApi, branchApi.apiMasterBranchGetGet);

  const useApiPriceTierGet = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetAllVehicleMasterPriceGet);

  const useApiGetRequestForm = useApi(bookingApi, bookingApi.apiBookingGetRequestFromGet);
  const useApiGetPdf = useApi(bookingApi, bookingApi.apiBookingGetPdfGet);

  const useApiCustomer = useApi(customerApi, customerApi.apiCustomerSearchGet);
  const useApiCustomerById = useApi(customerApi, customerApi.apiCustomerSearchGet);
  const useApiCustomerRental = useApi(customerApi, customerApi.apiCustomerSearchGet);
  const useApiCustomerType = useApi(dropdownApi, dropdownApi.apiDropdownGetCustomerTypeGet);
  const useApiCustomerGroup = useApi(dropdownApi, dropdownApi.apiDropdownGetCustomerGroupGet);
  const useApiCustomerSource = useApi(dropdownApi, dropdownApi.apiDropdownGetCustomerSourceGet);

  const useApiPaymentStatus = useApi(dropdownApi, dropdownApi.apiDropdownGetPaymentStatusGet);

  const useApiMasterPayment = useApi(paymentApi, paymentApi.apiMasterPaymentGetGet);

  const useApiLicensePlate = useApi(dropdownApi, dropdownApi.apiDropdownGetLicensePlateGet);

  const useApiRentalType = useApi(dropdownApi, dropdownApi.apiDropdownGetRentalTypeGet);

  const useApiCalculatePrice = useApi(carRentalApi, carRentalApi.apiCarRentalCalculatePricePost);

  const useApiSaveDraftBookingRequest = useApi(bookingApi, bookingApi.apiBookingBookingRequestSaveDraftPost);
  const useApiGetByBookingRequestDraft = useApi(bookingApi, bookingApi.apiBookingGetBookingRequestDraftBookingRequestNoGet);
  const useAPiSaveDraftBooking = useApi(bookingApi, bookingApi.apiBookingBookingSaveDraftPost);
  const useApiGetByBookingDraft = useApi(bookingApi, bookingApi.apiBookingGetBookingDraftBookingRequestNoGet);



  const useApiTitleApi = useApi(
    titleApi,  titleApi.apiMasterTitleGetGet
  )

  // const useApiSave
  useEffect(() => {
    // formSearch.setFieldsValue({
    //   type: 'main'
    // })
    // useApiBookingGet.data?.items
    if (Router.isReady) {
      callApi();
      // useApiBookingGet.fetch({
      //   bookingRequestSearchInput:{
      //     pageIndex: 1,
      //     pageSize: 10
      //   }
      // })
      packageItemApiRefetch({pageIndex: pageIndex, pageSize: pageSize});
    }
  
  }, [Router.isReady]);

  // useEffect(() => {
  //  console.log("Trigger")
  
  // }, [formBookingForm.getFieldsValue().receiveLocationCode]);

  const callApi = async () => {
    useApiAcctMgr.fetch({});
    useApiUsageAddress.fetch({
      
    });
    // useApiTitleApi.fetch({pageIndex: 1, pageSize: 1000,status: "active", ...constantBranch});
    useApiPaymentRental.fetch({});
    // useApiCustomerSource.fetch({});
    useApiPackageSd.fetch({});
    // useApiPaymentStatus.fetch({});
    // useApiCustomerType.fetch({});
    // useApiRentalType.fetch({});
   
    // useApiMasterPayment.fetch({
    //   pageIndex: 1,
    //   pageSize: 1000,
    //   ...constantBranch
    // })
    useApiCustomerRental.fetch({
      pageIndex: 1,
      pageSize: 10,
      ...constantBranch
    })
    // useApiCustomer.fetch({
    //   pageIndex: 1,
    //   pageSize: 10,

    // })
    // useApiCustomerRental.fetch({
    //   pageIndex: 1,
    //   pageSize: 10,
    // })
    // useApiBranch.fetch({
    //   pageIndex: 1,
    //   pageSize: 1000
    // })
    // useApiAllOptions.fetch({
    //   ...constantBranch,
    //   pageIndex: 1,
    //   pageSize: 1000
    // })
    // // useApiPacakge.
    // // formBookingFormSave.fetch({});
    responseLocation.fetch({
      ...constantBranch,
      pageIndex: 1,
      pageSize: 1000,
      // isActive: true
    });
    useApiVehicleMaster.fetch({
      ...constantBranch,
      pageIndex: 1,
      pageSize: 1000,
      // isActive: true
    })
    useApiMasterPriceTierGet.fetch({
      isActive: true,
      pageIndex: 1,
      pageSize: 1000,

    })
  }
  
  /** Functionality section */
  const setCodeFromPath =  () =>{
    const { packageCode } = Router.query as { packageCode: string; };
    setPackageCode(packageCode);
    return packageCode;
  }

  // const packageItemApiRefetch = async (params : BookingApiApiBookingSearchGetRequest ) =>{
  const packageItemApiRefetch = async (params : BookingApiApiBookingSearchGetRequest ) =>{
    const _packageCode = setCodeFromPath();
    console.log("packageCode==>>",_packageCode)
    const value = formSearch.getFieldsValue();
    console.log()
    const res = await useApiBookingGet.fetch({...params,
      ...constantBranch,
      bookingRequestNo: value?.bookingRequestNo,
    });
    return res
  } 
  
 
  const onClickToAdd = () => {
    setImageUrl(undefined);
    setMode("add");
    setIsVisibleFormBooking(true);
  }

  const onClickToEdit = async(param: {bookingRequestNo: string; status: string}) => {
    // Router.push(`/master-vehicles/edit/${param.id}`);
    setMode("edit");
    setIsVisibleFormBooking(true);
    setBookingNo(param.bookingRequestNo);
    // console.log('code==>>',param.code)
    if(param.status == "draft"){
      const res = await useApiGetByBookingRequestDraft.fetch({bookingRequestNo: param.bookingRequestNo});
      if(res.data){
        const jsonObject = JSON.parse(res.data);
        
        formBooking.setFieldsValue({
          accidentFee: jsonObject.accidentFee || undefined,
          bookingRequestNo: jsonObject.bookingRequestNo || undefined,
          address: jsonObject.address || undefined,
          dateRange: [dayjs(jsonObject.startDate) || undefined, dayjs(jsonObject.endDate) || undefined],
          deliveryCharge: jsonObject.deliveryCharge || undefined,
          documentDateBooking: dayjs(jsonObject.documentDate) || undefined,
          includeInsurance: jsonObject.includeInsurance || false,
          isMonthlyCharge: jsonObject.isMonthlyCharge || false,
          lateChargeFee: jsonObject.lateChargeFee || undefined,
          objective: jsonObject.objective || undefined,
          paymentDateBooking: dayjs(jsonObject.paymentDate) || undefined,
          paymentLateFee: jsonObject.paymentLateFee || undefined,
          paymentLocation: jsonObject.paymentLocation || undefined,
          paymentRental: jsonObject.paymentRental || undefined,
          packageSd: jsonObject.packageSd || undefined,
          receiveLocationCode: jsonObject.receiveLocationCode || undefined,
          rentalRate: jsonObject.rentalRate || undefined,
          requestDateBooking: dayjs(jsonObject.requestDate) || undefined,
          requesterName: jsonObject.requesterName || undefined,
          acctMgr: jsonObject.acctMgr || undefined,
          returnCharge: jsonObject.returnCharge || undefined,
          returnLocationCode: jsonObject.returnLocationCode || undefined,
          totalDays: jsonObject.totalDays || undefined,
          usageAddress: jsonObject.usageAddress || undefined,
          vehicleMasterId: jsonObject.vehicleMasterId || undefined,
          contractNo: jsonObject.contractNo || undefined,
          rateType: jsonObject.rateType || undefined,
        })
      }
    
      return
    }
    useApiBookingGetById.fetch({
      bookingRequestNo: param.bookingRequestNo,
      pageIndex: 1,
      pageSize: 1,
      ...constantBranch
      // bookingRequestSearchInput:{
      //   // id: param.id,
      //   // ...constantBranch,
  
      //   // pageIndex: 1, 
      //   // pageSize: 1
      // }
     
    }).then((res) => {
        formBooking.setFieldsValue({
          accidentFee: res.items?.[0]?.accidentFee || undefined,
          bookingRequestNo: res.items?.[0]?.bookingRequestNo || undefined,
          address: res.items?.[0]?.address || undefined,
          dateRange: [dayjs(res.items?.[0]?.startDate) || undefined, dayjs(res.items?.[0]?.endDate) || undefined],
          deliveryCharge: res.items?.[0]?.deliveryCharge || undefined,
          documentDateBooking: dayjs(res.items?.[0]?.documentDate) || undefined,
          includeInsurance: res.items?.[0]?.includeInsurance || false,
          isMonthlyCharge: res.items?.[0]?.isMonthlyCharge || false,
          lateChargeFee: res.items?.[0]?.lateChargeFee || undefined,
          objective: res.items?.[0]?.objective || undefined,
          paymentDateBooking: dayjs(res.items?.[0]?.paymentDate) || undefined,
          paymentLateFee: res.items?.[0]?.paymentLateFee || undefined,
          paymentLocation: res.items?.[0]?.paymentLocation || undefined,
          paymentRental: res.items?.[0]?.paymentRental || undefined,
          packageSd: res.items?.[0]?.packageSd || undefined,
          receiveLocationCode: res.items?.[0]?.receiveLocationCode || undefined,
          rentalRate: res.items?.[0]?.rentalRate || undefined,
          requestDateBooking: dayjs(res.items?.[0]?.requestDate) || undefined,
          requesterName: res.items?.[0]?.requesterName || undefined,
          acctMgr: res.items?.[0]?.acctMgr || undefined,
          returnCharge: res.items?.[0]?.returnCharge || undefined,
          returnLocationCode: res.items?.[0]?.returnLocationCode || undefined,
          totalDays: res.items?.[0]?.totalDays || undefined,
          usageAddress: res.items?.[0]?.usageAddress || undefined,
          vehicleMasterId: res.items?.[0]?.vehicleMasterId || undefined,
          contractNo: res.items?.[0]?.contractNo || undefined,
          rateType: res.items?.[0]?.rateType || undefined,
        })
        // setImageUrl(res.items?.[0]?.thumbmailUrl || undefined);
      });
 
  }

  const onClickRemove = (param: {id: number}) => {
      
  }

  const onClikToView = (param: {id: number}) => {
    Router.push(`/master-vehicles/view/${param.id}`);
  }

  const onSubmitSerach = (value: FormSearch) =>{
    packageItemApiRefetch({ pageIndex: 1, pageSize: 10, ...value});
  }

  const onChangeRowSelection = (selectedRowKeys: Array<number | string>) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setRowSelectedTable(selectedRowKeys);
  }

  const onChangeRowSelectionDriver = (selectedRowKeys: Array<number | string>) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setRowSelectedTableDriver(selectedRowKeys);
  }

  const onChangeRowSelectionVoucher = (selectedRowKeys: Array<number | string>) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setRowSelectedTableVoucher(selectedRowKeys);
  }
  const onChangeRowSelectionOptions = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTableOptions(selectedRowKeys);
  }
  const onSubmitFormBooking = (value: BookingRequest) =>{
    setIsModalConfirmVisible(mode === 'edit');
    setStatusBooking("pending");
    if(mode == 'add'){
      saveBooking({status: "pending"});
    }
    // setMode("edit")
  }
  const onCloseModalForm = () =>{
    setMode("add");
    formBookingForm.resetFields();
    formBooking.resetFields();
    setIsCheckedTax(false);
    setIsVisibleFormBooking(false);
    setIsVisibleFormBookingForm(false);
    setIsAddNewCustomer(false);
    setCustomerAddressId(undefined);
  }

  const onClickClearForm = ()=>{
    formSearch.resetFields();
  }

  const onChangeTable= (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<BookingRequestSearchOutput> | SorterResult<BookingRequestSearchOutput>[],
    extra: TableCurrentDataSource<BookingRequestSearchOutput>
  ) =>{
    // useApiBookingGet.data?.items
    // console.log("Array.isArray(sorter) ==>",pagination)
    if (!Array.isArray(sorter)) {
      let sortDirection = undefined;
      if(sorter.order === "ascend"){
        sortDirection = "asc";
      }else if(sorter.order === "descend"){
        sortDirection = "desc";
      }
      packageItemApiRefetch({ pageIndex: pagination.current || 1, pageSize: pagination.pageSize || 10, sortDirection: sortDirection || "asc", sortField: sorter.field?.toLocaleString()});
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
    const value = formBookingForm.getFieldsValue();
    console.log("value==>>",value)
    useApiBookingSave.fetch({
      //  BookingInput: {
      //   id: mode === "edit" ? id : undefined,
      //   metaKeyword: value.metaKeyword,
      //   metaDescription: value.metaDescription.join(","),
      //   description: value.description,
      //   content: value.content,
      //   isActive: value.isActive,
      //   categoryCode: value.categoryCode,
      //   slug: value.slug,
      //   thumbmailUrl: imageUrl,
      //   ...constantBranch
      // }
    }).then((res) => {
      // if(res.data){
      //   packageItemApiRefetch({
      //     bookingRequestSearchInput:{
      //       pageIndex: pageIndex, 
      //       pageSize: pageSize, 
      //     }
      //   });
      //   notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
      //   onCloseModalConfirm();
      //   onCloseModalForm();
      // }
      // else{
      //   notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
      // }
    }).catch((err) => {
      notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
    })
    setIsVisibleFormBooking(false);
    formBookingForm.resetFields();
  }

  const onClickConfirmDelete = () =>{
    useApiBookingDelete.fetch({
      // BookingDeleteInput: {
      //   id: rowSelectedTable.map((id) => Number(id)),
      //   ...constantBranch
      //   // tenantCode: constantBranch.tenantCode,
      //   // branchCode: constantBranch.branchCode
      // }
    }).then((res) => {
      if(res.data){
        packageItemApiRefetch({ pageIndex: pageIndex, pageSize: pageSize });
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

  const createChangeHandler = useCallback((config: {
    setImageUrl: React.Dispatch<React.SetStateAction<string | undefined | null>>;
    successMessage: string;
    errorMessage: string;
  }) => {
    return (params: { file: UploadFile, fileList: UploadFile[] }) => {
      if (params.file.status === 'done') {
        const originFileObj = params.file.originFileObj;
        if (originFileObj) {
          useApiFileUpload.fetch({
            fileType: "pub-content",
            file: originFileObj,
             docType: "booking"
          }).then((res) => {

            if(res.data){
              config.setImageUrl(`https://pl-central-api.antz-studio.co.th/api/File/Get?uuid=${res.data.requestId}` || "");
              notify({ title: config.successMessage, type: 'success' });
            }
            else{
              notify({ title: config.errorMessage, type: 'error' });
            }
          }).catch((err) => {
            notify({ title: config.errorMessage, type: 'error' });
          });
        } else {
          console.error("No original file object available.");
        }
      }
    };
  }, []);

  const onChangeUpload =  createChangeHandler({
    setImageUrl: setImageUrl,
    successMessage: 'ทำการ อัพโหลดรูป สำเร็จ',
    errorMessage: 'ทำกา รอัพโหลดรูป ไม่สำเร็จ'
  });
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
    //   //     docType: "Booking",
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

  const onSubmitFormShortTerm = () =>{
    setIsModalConfirmVisible(mode === 'edit');
    setStatusBooking("pending");
    if(mode == 'add'){
      saveBookingForm({status: "pending"});
    }
  }

  const onClickCheckBoxFax = (e: CheckboxChangeEvent) =>{
    setIsCheckedTax(e.target.checked);
    const value = formBookingForm.getFieldsValue();
    const provinceCodeValue = value?.provinceCode;  
    const [province, district, subDistrict, provinceCode, districtCode, subDistrictCode, postCode] = provinceCodeValue ? provinceCodeValue.split("_") : [];
    if(e.target.checked){
      // console.log("subDistrictCode", subDistrictCode, postCode);
      const thailandAddressProfile = thailandAddress.find(item => item.dCode === districtCode && item.sCode === subDistrictCode && item.po === postCode);
      // const thailandAddressTax = thailandAddress.find(item => item.dCode === res.items?.[0]?.districtCode && item.sCode === res.data?.customerAddresses?.[1]?.subDistrictCode && item.po === res.data?.customerAddresses?.[1]?.postcode);
      const thailandAddressData =  thailandAddress.filter(item => item !== thailandAddressProfile).slice(0,9);
      // console.log("thailandAddressData", thailandAddressData);

      const combinedAddress = thailandAddressProfile
      ? [thailandAddressProfile, ...thailandAddressData]
      : thailandAddressData;


      const hasCustomerAddress = province;
      // setAddressThailandTax(combinedAddress);
      // console.log("thailandAddressProfile", thailandAddressProfile);
      // setMode("edit");
      if(hasCustomerAddress){
        // setAddressThailand(combinedAddress);
        setAddressThailandTax(combinedAddress);
        // const valueDocument = res.data?.customerAddresses?.find(item => item.addressType === "document");
        // const valueBilling = res.data?.customerAddresses?.find(item => item.addressType === "billing");
        // setCustomerAddressId([valueDocument?.id || 0, valueBilling?.id || 0]);
      }
      formBookingForm.setFieldsValue({
        // firstNameTax: value.firstName,
        // lastNameTax: value.lastName,
        nameTax: value.nameDocument || undefined,
        mobileNoTax: value.mobileNo || undefined,
        addressNoTax: value.addressNo,
        mooTax: value.moo,
        buildingTax: value.building,
        soiTax: value.soi,
        streetTax: value.street,
        provinceCodeTax: value.provinceCode,
        districtCodeTax: value.districtCode,
        subDistrictCodeTax: value.subDistrictCode,
        postCodeTax: value.postCode,
      }) 
      // setAddressThailandTax(thailandAddress.filter(item => item.po.includes(postCode)).slice(0,9));
    }
    else{
      formBookingForm.resetFields(['postCodeTax', 'provinceCodeTax', 'districtCodeTax', 'subDistrictCodeTax', 'addressNoTax', 'mooTax', 'buildingTax', 'soiTax', 'streetTax', 'mobileNoTax', 'nameTax']);
    }
  }

  const onChangeAddressThailand = (value: string) =>{
    formBookingForm.setFieldsValue({
      provinceCode: value,
      districtCode: value,
      subDistrictCode: value,
      postCode: value
    });
  }

  const onSearchProvince = (value: string) =>{
    setAddressThailand(thailandAddress.filter(item => item.p.includes(value)).slice(0,9));
  }
  const onSearchDistrict = (value: string) =>{
    setAddressThailand(thailandAddress.filter(item => item.d.includes(value)).slice(0,9));
  }
  const onSearchSubDistrict = (value: string) =>{
    setAddressThailand(thailandAddress.filter(item => item.s.includes(value)).slice(0,9));
  }
  const onSearchPostCode = (value: string) =>{
    setAddressThailand(thailandAddress.filter(item => item.po.includes(value)).slice(0,9));
  }

  const onSearchProvinceTax = (value: string) =>{
    setAddressThailandTax(thailandAddress.filter(item => item.p.includes(value)).slice(0,9));
  }
  const onSearchDistrictTax = (value: string) =>{
    setAddressThailandTax(thailandAddress.filter(item => item.d.includes(value)).slice(0,9));
  }
  const onSearchSubDistrictTax = (value: string) =>{
    setAddressThailandTax(thailandAddress.filter(item => item.s.includes(value)).slice(0,9));
  }
  const onSearchPostCodeTax = (value: string) =>{
    setAddressThailandTax(thailandAddress.filter(item => item.po.includes(value)).slice(0,9));
  }
  const onChangeAddressThailandTax = (value: string) =>{
    formBookingForm.setFieldsValue({
      provinceCodeTax: value,
      districtCodeTax: value,
      subDistrictCodeTax: value,
      postCodeTax: value
    });
  }

  const onClickAddRow = (params: { id: number }) => {
    const { id } = params;
    const idsSelected = Object.entries(selectedItems)
    .filter(([_, value]) => 'value' in value)
    .map(([_, value]) => (value as { value: number }).value);
    let options = dataTest;
    if(idsSelected.length > 0){

      options = dataTest.filter(item => !idsSelected.includes(item.id));
    }

    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = {
        ...prevSelectedItems,
        [id]: { options: options },
      };
      return newSelectedItems;
    });
  };

  const onChangeDropdown = (value: number, index: number) => {
    console.log("oldSelected ==>", selectedItems)
    const oldSeclectedValue = selectedItems[index]?.value;
    // console.log("index ==>", index)
    let oldOption: ModelTest | undefined;

    if (oldSeclectedValue) {
      oldOption = dataTest.find(item => item.id === oldSeclectedValue);
    }
    console.log("oldOption ==>", oldOption)
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };
      Object.keys(newSelectedItems).forEach((key) => {
        const keyNum = Number(key);
        if (keyNum !== index) {
          newSelectedItems[keyNum].options = newSelectedItems[keyNum].options.filter(item => item.id !== value);
          // console.log(keyNum," ==>", newSelectedItems[keyNum].options)
          if(oldOption){
            // newSelectedItems[keyNum].value = undefined;
            newSelectedItems[keyNum].options.push(oldOption);
          }
       
        }
        else{
          newSelectedItems[keyNum].value = value;
        }
      })
     
      return newSelectedItems;
    })
    // setSelectedItems((prevSelectedItems) => {
    //   const newSelectedItems = { ...prevSelectedItems };
    //   newSelectedItems[index].value = value;
    //   return newSelectedItems;
    // });
  };

  const onRemove = (index: number) => {
    const oldSeclectedValue = selectedItems[index]?.value;
    // console.log("index ==>", index)
    let oldOption: ModelTest | undefined;

    if (oldSeclectedValue) {
      oldOption = dataTest.find(item => item.id === oldSeclectedValue);
    }
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };
      delete newSelectedItems[index];
      Object.keys(newSelectedItems).forEach((key) => {
        const keyNum = Number(key);
        if(oldOption){
          // newSelectedItems[keyNum].value = undefined;
          newSelectedItems[keyNum].options.push(oldOption);
        }
      })
      return newSelectedItems;
    })
    // setSelectedItems((prevSelectedItems) => {
    //   const newSelectedItems = { ...prevSelectedItems };
    //   delete newSelectedItems[removedIndex];

    //   // Reassign keys
    //   const updatedSelectedItems: Selected = {};
    //   Object.keys(newSelectedItems).forEach((key, index) => {
    //     updatedSelectedItems[index] = newSelectedItems[Number(key)];
    //   });

    //   return updateOptions(updatedSelectedItems);
    // });
  };

  const saveBooking = (params: {status: "draft" | "pending"}) =>{
    const value = formBooking.getFieldsValue();
    console.log("param", params.status)
    if(params.status == "draft"){
      // useApiSaveDraftBookingRequest.fetch({

      // })
      const jsonData = {
        ...value,
        bookingRequestNo: mode == 'edit' ? bookingNo : undefined,
        status: params.status,
        startDate: value.dateRange ? dayjs(value.dateRange[0]).toISOString() : undefined,
        endDate: value.dateRange ? dayjs(value.dateRange[1]).toISOString() : undefined,
        documentDate: value.documentDateBooking ? dayjs(value.documentDateBooking).toISOString() : undefined,
        paymentDate: value.paymentDateBooking ? dayjs(value.paymentDateBooking).toISOString() : undefined,
        requestDate: value.requestDateBooking ? dayjs(value.requestDateBooking).toISOString() : undefined,
        ...constantBranch,
      }

      const convertedData = JSON.stringify(value)
      // console.log("convertedData",convertedData)
      bookingApi.apiBookingBookingRequestSaveDraftPost({
        bookingRequestNo: mode == 'edit' ? bookingNo : undefined,
        saveDraftInput: {
          json: convertedData
        }
      }).then((res) =>{
        console.log("res.status",res.status)
        if(res.status === 200){
          console.log(99999)
          packageItemApiRefetch({
            pageIndex: pageIndex, 
            pageSize: pageSize, 
          });
          console.log(1000000)
          notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
          onCloseModalConfirm();
          onCloseModalForm();
        }
        else if (res.status == 400){
          notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
        }
       
      }).catch((err) =>{
        notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
      })
      console.log("param", params.status)
      return
    }
    useApiBookingSave.fetch({
      bookingRequestInput:{
        ...value,
        bookingRequestNo: mode == 'edit' ? bookingNo : undefined,
        status: params.status,
        startDate: value.dateRange ? dayjs(value.dateRange[0]).toISOString() : undefined,
        endDate: value.dateRange ? dayjs(value.dateRange[1]).toISOString() : undefined,
        documentDate: value.documentDateBooking ? dayjs(value.documentDateBooking).toISOString() : undefined,
        paymentDate: value.paymentDateBooking ? dayjs(value.paymentDateBooking).toISOString() : undefined,
        requestDate: value.requestDateBooking ? dayjs(value.requestDateBooking).toISOString() : undefined,
        // requestDate: undefined,
        // paymentDate: undefined,
        // requestDate: value.requestDate ? dayjs(value.requestDate.).format('YYYY-MM-DD') : undefined,
        ...constantBranch,
      }
    }).then((res) =>{
      if(res.status == 0){
        packageItemApiRefetch({
          pageIndex: pageIndex, 
          pageSize: pageSize, 
        });
        notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
        onCloseModalConfirm();
        onCloseModalForm();
      }
      else if (res.status == 400){
        notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
      }
     
    }).catch((err) =>{
      notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
    })
    // setIsVisibleFormBooking(false);
    formBooking.resetFields();
  }

  const onClickBookingDraft = () =>{
    setIsModalConfirmVisible(mode === 'edit');
    setStatusBooking("draft");
    if(mode == 'add'){
      saveBooking({status: "draft"});
      // setStatusBooking("draft");
    }
   
  }

  const onChangeStartDate = () =>{
    const value = formBooking.getFieldsValue().dateRange;
    const startDate = value[0];
    const endDate = value[1];
    if (value) {
      const startDate = dayjs(value[0]);
      const endDate = dayjs(value[1]);

      // Calculate the difference in days
      const dateRangeInDays = endDate.diff(startDate, 'day');
      formBooking.setFieldsValue({
        totalDays: dateRangeInDays
      })
      console.log('Date Range in Days:', dateRangeInDays);
    }

  }

  const onClickToAddBookingForm = () =>{
    setIsVisibleFormBookingForm(true);
  }

  const validateThaiIDCard = (_: any, value: string): Promise<void> => {
    if (!value) {
      return Promise.resolve();
    }
  
    // Check if the value is a 13-digit number
    const regex = /^\d{13}$/;
    if (!regex.test(value)) {
      return Promise.reject('เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก');
    }
  
    // Validate the checksum
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(value[i]) * (13 - i);
    }
    const checkDigit = (11 - (sum % 11)) % 10;
    if (checkDigit !== parseInt(value[12])) {
      return Promise.reject('เลขบัตรประชาชนไม่ถูกต้อง');
    }
  
    return Promise.resolve();
  };
  
  const onClickShowModalBookingForm = async (params: {bookingRequestNo: string; status: string}) =>{
    setBookingRequestNo(params.bookingRequestNo || undefined);
    console.log("params.status", params.status)
    setRecordStatusBooking(params.status);
    if(params.status == "draft"){
      const res = await useApiGetByBookingDraft.fetch({
        bookingRequestNo: params.bookingRequestNo
      })
      if(res.data){
        const jsonObject = JSON.parse(res.data);
        setMode('edit');
        // if(res.data){
        //   setMode('edit');
        // }
        const thailandAddressProfile = thailandAddress.find(item => item.dCode === jsonObject.customerAddresses?.[0]?.districtCode && item.sCode === jsonObject.customerAddresses?.[0]?.subDistrictCode && item.po === jsonObject.customerAddresses?.[0]?.postCode);
        const thailandAddressTax = thailandAddress.find(item => item.dCode === jsonObject.customerAddresses?.[1]?.districtCode && item.sCode === jsonObject.customerAddresses?.[1]?.subDistrictCode && item.po === jsonObject.customerAddresses?.[1]?.postCode);
        const thailandAddressData =  thailandAddress.filter(item => item !== thailandAddressProfile).slice(0,9);
        // console.log("jsonObject.customerAddresses?.[0]?.districtCode", jsonObject.customerAddresses?.[0]?.districtCode);
        // console.log("jsonObject.customerAddresses?.[0]?.subDistrictCode", jsonObject.customerAddresses?.[0]?.subDistrictCode)
        // console.log("jsonObject.customerAddresses?.[0]?.postcode", jsonObject.customerAddresses?.[0]?.postCode)
        // console.log("jsonObject.customerAddresses?.[0]",jsonObject.customerAddresses?.[0])
        setBookingNo(jsonObject.bookingNo || undefined);

        if(jsonObject.bookingNo && jsonObject.customerId){
          useApiCustomer.fetch({id: jsonObject.customerId,pageIndex: 1, pageSize: 1, customerType: jsonObject.customerType || undefined});
        }
        else{
          const hasCustomerType =  jsonObject.customerType !== undefined;
          useApiCustomer.fetch({pageIndex: hasCustomerType ? 1 : 0, pageSize: hasCustomerType ? 10 : 0 , customerType: jsonObject.customerType || undefined});
        }

        if(jsonObject.licensePlate){
          useApiLicensePlate.fetch({
            pageIndex: 1,
            pageSize: 1,
            licensePlate: jsonObject.licensePlate
          });
        }
        else{
          useApiLicensePlate.fetch({
            pageIndex: 1,
            pageSize: 10,
          });
        }

        const combinedAddress = thailandAddressProfile
        ? [thailandAddressProfile, ...thailandAddressData]
        : thailandAddressData;

        const combinedAddressTax = thailandAddressTax
        ? [thailandAddressTax, ...thailandAddressData]
        : thailandAddressData;

        const hasCustomerAddress = (jsonObject.customerAddresses?.length || 0) > 0;
        // const valueDocument = jsonObject.customerAddresses?.find(item => item.addressType === "document");
        const valueDocument = jsonObject.customerAddresses?.find((item: any) => item.addressType  === "document");
        const valueBilling = jsonObject.customerAddresses?.find((item: any) => item.addressType  === "billing");
        console.log("valueDocument", valueDocument)
        console.log("valueBilling", valueBilling)
        // const valueBilling = jsonObject.customerAddresses?.find(item => item.addressType === "billing");
        // setMode("edit");
        if(hasCustomerAddress){
          setAddressThailand(combinedAddress);
          setAddressThailandTax(combinedAddressTax);

          setCustomerAddressId([valueDocument?.id || 0, valueBilling?.id || 0]);
        }
      
        setCustomerTypeValue(jsonObject.customerType || undefined);

        const value = hasCustomerAddress ? `${thailandAddressProfile?.p}_${thailandAddressProfile?.d}_${thailandAddressProfile?.s}_${thailandAddressProfile?.pCode}_${thailandAddressProfile?.dCode}_${thailandAddressProfile?.sCode}_${thailandAddressProfile?.po}` : undefined;
        const valueTax = hasCustomerAddress ? `${thailandAddressTax?.p}_${thailandAddressTax?.d}_${thailandAddressTax?.s}_${thailandAddressTax?.pCode}_${thailandAddressTax?.dCode}_${thailandAddressTax?.sCode}_${thailandAddressTax?.po}` : undefined
        console.log("jsonObject.bookingVouchers", jsonObject.bookingVouchers)
        console.log("valueTax", valueTax)
        formBookingForm.setFieldsValue({
          ...jsonObject.data,
          vehicleMasterId: jsonObject.vehicleMasterId ? jsonObject.vehicleMasterId : undefined,
          firstName: jsonObject.firstName ?? undefined,
          lastName: jsonObject.lastName ?? undefined,
          identityId: jsonObject.identityId ?? undefined,
          name: jsonObject.name ?? undefined,
          dateRange: [
            jsonObject.startDate ? dayjs(jsonObject.startDate) : undefined,
            jsonObject.endDate ? dayjs(jsonObject.endDate) : undefined
          ],
          branchCode: jsonObject.branchCode ?? undefined,
          paidDate: jsonObject.paidDate ? dayjs(jsonObject.paidDate) : undefined,
          bookingDrivers: jsonObject.bookingDrivers?.map((item : any) => ({
            driverName: item.driverName ?? undefined,
            driverLicense: item.driverLicense ?? undefined,
            bookingNo: item.bookingNo ?? undefined,
            ...constantBranch
          })),
          bookingVouchers: jsonObject.bookingVouchers?.map((item : any) => ({
            voucherNo: item.voucherNo ?? undefined,
            remark: item.remark ?? undefined,
          })),
          bookingOptionsAntd: jsonObject.bookingOptionsAntd?.map((item : any) => ({
            optionCode: item.optionCode ?? undefined,
            price: item.price ?? 0,
            amount: item.amount ?? 0,
          })) ?? [],
          mobile: jsonObject?.mobile ?? undefined,
          titleName: jsonObject?.titleName ?? undefined,
          taxNo: valueBilling?.taxNo ?? undefined,
          nameTax: valueBilling?.name ?? undefined,
          addressNoTax: valueBilling?.addressNo ?? undefined,
          buildingTax: valueBilling?.building ?? undefined,
          mooTax: valueBilling?.moo ?? undefined,
          soiTax: valueBilling?.soi ?? undefined,
          streetTax: valueBilling?.street ?? undefined,
          provinceCodeTax: valueBilling?.provinceCode ? valueTax : undefined,
          districtCodeTax: valueBilling?.districtCode ? valueTax : undefined,
          subDistrictCodeTax: valueBilling?.subDistrictCode ? valueTax : undefined,
          postCodeTax: valueBilling?.postCode ? valueTax : undefined,
          customerId: jsonObject.customerId ? jsonObject.customerId : undefined,
          addressNo: valueDocument?.addressNo ?? undefined,
          building: valueDocument?.building ?? undefined,
          moo: valueDocument?.moo ?? undefined,
          soi: valueDocument?.soi ?? undefined,
          street: valueDocument?.street ?? undefined,
          provinceCode: valueDocument?.provinceCode ? value : undefined,
          districtCode: valueDocument?.districtCode ? value : undefined,
          subDistrictCode: valueDocument?.subDistrictCode ? value : undefined,
          postCode: valueDocument?.postCode ? value : undefined,
          nameDocument: valueDocument?.name ?? undefined,
          
          mobileNo: valueDocument?.mobileNo ?? undefined,
          mobileNoTax: valueBilling?.mobileNo ?? undefined,
          // Ensure all properties from BookingFormRequest are included
          customerAddresses: jsonObject.customerAddresses ?? undefined,
          totalAmount: jsonObject.totalAmount,
          discount: jsonObject.discount,
          totalPrice: jsonObject.totalPrice,
          paidAmount: jsonObject.paidAmount,
          insuranceAmount: jsonObject.insuranceAmount,
          remark: jsonObject.remark,
          rentalType: jsonObject.rentalType,
          // branchCode: jsonObject.branchCode,
          customerType: jsonObject.customerType,
          acquireMethod: jsonObject.customerType,
          paymentStatus: jsonObject.paymentStatus,
          paymentMethod: jsonObject.paymentMethod,
          receiveLocationCode: jsonObject.receiveLocationCode,
          returnLocationCode: jsonObject.receiveLocationCode,
          carReceiveMile: jsonObject.carReceiveMile,
          carReturnMile: jsonObject.carReceiveMile,
          email: jsonObject.email,
          fax: jsonObject.fax,
          carUseObjective: jsonObject.carUseObjective,
          licensePlate: jsonObject.licensePlate
          // Add any missing properties from BookingFormRequest here
        } as any);
        setImageUrl(jsonObject.documentUrl || undefined);
        setAttachIdentity(jsonObject.attachIdentity || undefined);
        setAttachDrivingLicense(jsonObject.attachDrivingLicense || undefined);
        setAttachEmployeeCard(jsonObject.attachEmployeeCard || undefined);
        setIsDisableCheckBoxSaveDb(jsonObject.customerId ? false : true);

      }
      formBookingForm.setFieldsValue({bookingRequestNo: params.bookingRequestNo});
    
      setIsVisibleFormBookingForm(true);

      return
    }
    await useApiGetRequestForm.fetch({bookingRequestNo: params.bookingRequestNo, ...constantBranch}).then((res) => {
      if(res.status == 0){

      const thailandAddressProfile = thailandAddress.find(item => item.dCode === res.data?.customerAddresses?.[0]?.districtCode && item.sCode === res.data?.customerAddresses?.[0]?.subDistrictCode && item.po === res.data?.customerAddresses?.[0]?.postcode);
      const thailandAddressTax = thailandAddress.find(item => item.dCode === res.data?.customerAddresses?.[1]?.districtCode && item.sCode === res.data?.customerAddresses?.[1]?.subDistrictCode && item.po === res.data?.customerAddresses?.[1]?.postcode);
      const thailandAddressData =  thailandAddress.filter(item => item !== thailandAddressProfile).slice(0,9);
      // console.log("thailandAddressData", thailandAddressData);
      setBookingNo(res.data?.bookingNo || undefined);
      console.log("bookingNo",res.data?.bookingNo)
      if(res.data?.bookingNo){
        setMode('edit');
      }
      if(res.data?.bookingNo && res.data.customerId){
        useApiCustomer.fetch({id: res.data.customerId,pageIndex: 1, pageSize: 1, customerType: res.data.customerType || undefined});
      }
      else{
        const hasCustomerType =  res.data?.customerType !== undefined;
        useApiCustomer.fetch({pageIndex: hasCustomerType ? 1 : 0, pageSize: hasCustomerType ? 10 : 0 , customerType: res.data?.customerType || undefined});
      }

      if(res.data?.licensePlate){
        useApiLicensePlate.fetch({
          pageIndex: 1,
          pageSize: 1,
          licensePlate: res.data.licensePlate
        });
      }
      else{
        useApiLicensePlate.fetch({
          pageIndex: 1,
          pageSize: 10,
        });
      }

      const combinedAddress = thailandAddressProfile
      ? [thailandAddressProfile, ...thailandAddressData]
      : thailandAddressData;

      const combinedAddressTax = thailandAddressTax
      ? [thailandAddressTax, ...thailandAddressData]
      : thailandAddressData;

      const hasCustomerAddress = (res.data?.customerAddresses?.length || 0) > 0;
      const valueDocument = res.data?.customerAddresses?.find(item => item.addressType === "document");
      const valueBilling = res.data?.customerAddresses?.find(item => item.addressType === "billing");
      // setMode("edit");
      if(hasCustomerAddress){
        setAddressThailand(combinedAddress);
        setAddressThailandTax(combinedAddressTax);

        setCustomerAddressId([valueDocument?.id || 0, valueBilling?.id || 0]);
      }
     
      setCustomerTypeValue(res.data?.customerType || undefined);
      const value = hasCustomerAddress ? `${thailandAddressProfile?.p}_${thailandAddressProfile?.d}_${thailandAddressProfile?.s}_${thailandAddressProfile?.pCode}_${thailandAddressProfile?.dCode}_${thailandAddressProfile?.sCode}_${thailandAddressProfile?.po}` : undefined;
      const valueTax = hasCustomerAddress ? `${thailandAddressTax?.p}_${thailandAddressTax?.d}_${thailandAddressTax?.s}_${thailandAddressTax?.pCode}_${thailandAddressTax?.dCode}_${thailandAddressTax?.sCode}_${thailandAddressTax?.po}` : undefined
      formBookingForm.setFieldsValue({
        ...res.data,
        vehicleMasterId: res.data?.vehicleMasterId ? res.data?.vehicleMasterId : undefined,
        firstName: res.data?.firstName ?? undefined,
        lastName: res.data?.lastName ?? undefined,
        identityId: res.data?.identityId ?? undefined,
        name: res.data?.name ?? undefined,
        dateRange: [
          res.data?.startDate ? dayjs(res.data.startDate) : undefined,
          res.data?.endDate ? dayjs(res.data.endDate) : undefined
        ],
        paidDate: res.data?.paidDate ? dayjs(res.data.paidDate) : undefined,
        bookingOptionsAntd: res.data?.bookingOptions?.map((item) => ({
          optionCode: item.optionCode ?? undefined,
          price: item.price ?? 0,
          amount: item.amount ?? 0,
        })) ?? [],
        nameTax: valueBilling?.name ?? undefined,
        taxNo: valueBilling?.taxNo ?? undefined,
        addressNoTax: valueBilling?.addressNo ?? undefined,
        buildingTax: valueBilling?.building ?? undefined,
        mooTax: valueBilling?.moo ?? undefined,
        soiTax: valueBilling?.soi ?? undefined,
        streetTax: valueBilling?.street ?? undefined,
        provinceCodeTax: valueBilling?.provinceCode ? valueTax : undefined,
        districtCodeTax: valueBilling?.districtCode ? valueTax : undefined,
        subDistrictCodeTax: valueBilling?.subDistrictCode ? valueTax : undefined,
        postCodeTax: valueBilling?.postcode ? valueTax : undefined,
        customerId: res.data?.customerId ? res.data?.customerId : undefined,
        addressNo: valueDocument?.addressNo ?? undefined,
        building: valueDocument?.building ?? undefined,
        moo: valueDocument?.moo ?? undefined,
        soi: valueDocument?.soi ?? undefined,
        street: valueDocument?.street ?? undefined,
        provinceCode: valueDocument?.provinceCode ? value : undefined,
        districtCode: valueDocument?.districtCode ? value : undefined,
        subDistrictCode: valueDocument?.subDistrictCode ? value : undefined,
        postCode: valueDocument?.postcode ? value : undefined,
        nameDocument: valueDocument?.name ?? undefined,
        mobileNo: valueDocument?.mobileNo ?? undefined,
        mobileNoTax: valueBilling?.mobileNo ?? undefined,
        // Ensure all properties from BookingFormRequest are included
        customerAddresses: res.data?.customerAddresses ?? undefined,
        // Add any missing properties from BookingFormRequest here
      } as any);
      setImageUrl(res.data?.documentUrl || undefined);
      setAttachIdentity(res.data?.attachIdentity || undefined);
      setAttachDrivingLicense(res.data?.attachDrivingLicense || undefined);
      setAttachEmployeeCard(res.data?.attachEmployeeCard || undefined);
      setIsDisableCheckBoxSaveDb(res.data?.customerId ? false : true);
        // formBooking.setFieldsValue({
        //   ...res.data
        // })
      }
    })
    console.log('params==>>',params.bookingRequestNo)
    formBookingForm.setFieldsValue({bookingRequestNo: params.bookingRequestNo});
  
    setIsVisibleFormBookingForm(true);
  }

  const saveBookingForm = async (params: {status: "draft" | "pending"}) =>{
    const value = formBookingForm.getFieldsValue();
    const provinceCodeValue = value?.provinceCode; 
    const provinceCodeTaxValue = value?.provinceCodeTax;   
    const [province, district, subDistrict, provinceCode, districtCode, subDistrictCode, postCode] = provinceCodeValue ? provinceCodeValue.split("_") : [];
    const [provinceTax, districtTax, subDistrictTax, provinceCodeTax, districtCodeTax, subDistrictCodeTax, postCodeTax] = provinceCodeTaxValue ? provinceCodeTaxValue.split("_") : [];
     const valueAddress = [
        {
          id: customerAddressId && customerAddressId[0] ? customerAddressId[0] : undefined,
          // firstName: value.firstName && value.firstName !== "" ? value.firstName : undefined,
          // lastName: value.lastName && value.lastName !== "" ? value.lastName : undefined,
          name: value.nameDocument && value.nameDocument !== "" ? value.nameDocument : undefined,
          mobileNo: value.mobileNo && value.mobileNo !== "" ? value.mobileNo : undefined,
          addressNo: value.addressNo && value.addressNo !== "" ? value.addressNo : undefined,
          building: value.building && value.building !== "" ? value.building : undefined,
          moo: value.moo && value.moo !== "" ? value.moo : undefined,
          postCode: postCode && postCode !== "" ? postCode : undefined,
          provinceCode: provinceCode && provinceCode !== "" ? provinceCode : undefined,
          districtCode: districtCode && districtCode !== "" ? districtCode : undefined,
          subDistrictCode: subDistrictCode && subDistrictCode !== "" ? subDistrictCode : undefined,
          soi: value.soi && value.soi !== "" ? value.soi : undefined,
          street: value.street && value.street !== "" ? value.street : undefined,
          addressType: 'document',
          isNotUpdateAddress: value.isNotUpdateAddress,
          taxNo: undefined
        },
        {
          id: customerAddressId && customerAddressId[1] ? customerAddressId[1] : undefined,
          name: value.nameTax && value.nameTax !== "" ? value.nameTax : undefined,
          taxNo: value.taxNo && value.taxNo !== "" ? value.taxNo : undefined,
          mobileNo: value.mobileNoTax && value.mobileNoTax !== "" ? value.mobileNoTax : undefined,
          addressNo: value.addressNoTax && value.addressNoTax !== "" ? value.addressNoTax : undefined,
          building: value.buildingTax && value.buildingTax !== "" ? value.buildingTax : undefined,
          moo: value.mooTax && value.mooTax !== "" ? value.mooTax : undefined,
          postCode: postCodeTax && postCodeTax !== "" ? postCodeTax : undefined,
          provinceCode: provinceCodeTax && provinceCodeTax !== "" ? provinceCodeTax : undefined,
          districtCode: districtCodeTax && districtCodeTax !== "" ? districtCodeTax : undefined,
          subDistrictCode: subDistrictCodeTax && subDistrictCodeTax !== "" ? subDistrictCodeTax : undefined,
          soi: value.soiTax && value.soiTax !== "" ? value.soiTax : undefined,
          street: value.streetTax && value.streetTax !== "" ? value.streetTax : undefined,
          isNotUpdateAddress: value.isNotUpdateAddressTax,
          addressType: 'billing'
        }
      ]; 
      // console.log("valueAddress ==> ", valueAddress)
      const isCustomerAddressEmty = areAddressesEmpty(valueAddress);
      // console.log("isCustomerAddressEmty ==> ", isCustomerAddressEmty)
      const jsonData = {
        ...value,
        tenantCode: constantBranch.tenantCode,
        bookingDrivers: value.bookingDrivers?.map((item) => ({...item, ...constantBranch, bookingNo: bookingNo})),
        startDate: value.dateRange ? dayjs(value.dateRange[0]).toISOString() : undefined,
        endDate: value.dateRange ? dayjs(value.dateRange[1]).toISOString() : undefined,
        bookingOptions:  value.bookingOptionsAntd,
        bookingRequestNo: bookingRequestNo,
        bookingNo: bookingNo,
        status: params.status,
        customerAddresses: isCustomerAddressEmty ? null  : valueAddress,
        documentUrl: imageUrl,
        attachIdentity: attachIdentity,
        attachDrivingLicense: attachDrivingLicense,
        attachEmployeeCard: attachEmployeeCard,
        firstName: value.firstName && value.firstName !== "" ? value.firstName : undefined,
        lastName: value.lastName && value.lastName !== "" ? value.lastName : undefined,
        identityId: value.identityId && value.identityId !== "" ? value.identityId : undefined,
        name: value.name && value.name !== "" ? value.name : undefined,
      }
      if(params.status == "draft"){
        const convertedData = JSON.stringify(jsonData);
        useAPiSaveDraftBooking.fetch({
          bookingRequestNo: bookingRequestNo,
          saveDraftInput: {
            json: convertedData
          }
        }).then((res) => {
          if(res.status == 0){
            packageItemApiRefetch({
              pageIndex: pageIndex, 
              pageSize: pageSize, 
            });
            notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
            setImageUrl(undefined)
            onCloseModalConfirm();
            onCloseModalForm();
          }
          else if (res.status == 400){
            notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
          }
        }).catch((error) => {
          notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
        })
        return
      }
      formBookingFormSave.fetch({
        bookingRequestFormInput:{ 
          ...jsonData
      }
      }).then((res) => {
        if(res.status == 0){
          packageItemApiRefetch({
            pageIndex: pageIndex, 
            pageSize: pageSize, 
          });
          notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
          setImageUrl(undefined)
          onCloseModalConfirm();
          onCloseModalForm();
        }
        else if (res.status == 400){
          notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
        }
      }).catch((error) => {
        notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
      })
    // console.log("formBookingFormSave ==> ", formBookingFormSave)
    
  }

  const areAddressesEmpty = (customerAddresses: Address[]): boolean => {
    const fieldsToCheck: (keyof Address)[] = [
      'addressNo', 'building', 'moo', 'postCode', 'provinceCode',
      'districtCode', 'subDistrictCode', 'soi', 'street'
    ];
  
    return customerAddresses.every(address => 
      fieldsToCheck.every(field => 
        address[field] === "" || address[field] === undefined
      )
    );
  }

  const onClickBookingFormDraft = () =>{
    setIsModalConfirmVisible(mode === 'edit');
    setStatusBooking("draft");
    if(mode == 'add'){
      saveBookingForm({status: "draft"});
      // saveBooking({status: "draft"});
      // setStatusBooking("draft");
    }
  }

  const onChangeOptions = (params: {index: number; price: number}) =>{
    const valueBookOptions = formBookingForm.getFieldsValue().bookingOptionsAntd;
    if(valueBookOptions){
      valueBookOptions[params.index].price = params.price;
      valueBookOptions[params.index].amount = valueBookOptions[params.index].amount ? valueBookOptions[params.index].amount : 1;
    }
    formBookingForm.setFieldsValue({bookingOptionsAntd: valueBookOptions});
    summmary();
    calCulatePrice();
  }

  const onChangeRadioPriceTier = async (e: RadioChangeEvent) =>{
    const vehicleMasterId = formBooking.getFieldsValue().vehicleMasterId;
    try{
      if(vehicleMasterId && e.target.value){
        const price = await useApiPriceTierGet.fetch({vehicleMasterId: vehicleMasterId, tierPriceId: e.target.value});
        if(price.data){
          formBooking.setFieldsValue({
            rentalRate: price.data.price?.[`${vehicleMasterId}:${e.target.value}`].price || 0
          })
        }
      }
    }
    catch(e){
      formBooking.setFieldsValue({
        rentalRate: 0
      })
    }
   
  }

  const onChangeVehicleMaster = async (id: number) =>{
    const priceTierId = formBooking.getFieldsValue().rentalRateType;
    try{
      if(priceTierId){
        const price = await useApiPriceTierGet.fetch({vehicleMasterId: id, tierPriceId: priceTierId});
        if(price.data){
          formBooking.setFieldsValue({
            rentalRate: price.data.price?.[`${id}:${priceTierId}`].price || 0
          })
        }
      }
    }
    catch(e){
      formBooking.setFieldsValue({
        rentalRate: 0
      })
    }
  }

  const onSearchCustomer = async (value: string) =>{
    const res = await useApiCustomer.fetch({
        keyword: value,
        pageIndex: 1,
        pageSize: 10,
        customerType: customerTypeValue
      });
    if(res.items){
      setDataSourceCustomer(res.items);
    }

    // useApiCustomer.data?.items
  }

  const onSearchCustomerRental = (value: string) =>{
    useApiCustomerRental.fetch({
      // name: value,
      keyword: value,
      pageIndex: 1,
      pageSize: 10
    })
  }

  const onSearchLicensePlate = (value: string) =>{
    useApiLicensePlate.fetch({
      licensePlate: value,
      pageIndex: 1,
      pageSize: 10
    })
  }

  const onChangeCustomerId = async (id: number) =>{
    console.log("id", id);
    setIsDisableCheckBoxSaveDb(id ? false : true);

    if(!id){
      formBookingForm.setFieldsValue({
        isNotUpdateAddress: undefined,
        isNotUpdateAddressTax: undefined,
        soi: undefined,
        street: undefined,
        addressNo: undefined,
        provinceCode: undefined,
        districtCode: undefined,
        subDistrictCode: undefined,
        postCode: undefined,
        mobile: undefined,
        mobileTest: undefined,
        titleName: undefined,
        // identityId: res.items?.[0]?.identityId || undefined,
        attachIdentity: undefined,
        attachDrivingLicense: undefined,
        attachEmployeeCard: undefined,
        nameDocument: undefined,
      })
    }
    try{
      const res = await useApiCustomerById.fetch({
        id: id,
        pageIndex: 1,
        pageSize: 1
      });
      const thailandAddressProfile = thailandAddress.find(item => item.dCode === res.items?.[0]?.districtCode && item.sCode === res.items?.[0]?.subDistrictCode && item.po === res.items?.[0]?.postCode);
      // const thailandAddressTax = thailandAddress.find(item => item.dCode === res.items?.[0]?.districtCode && item.sCode === res.data?.customerAddresses?.[1]?.subDistrictCode && item.po === res.data?.customerAddresses?.[1]?.postcode);
      const thailandAddressData =  thailandAddress.filter(item => item !== thailandAddressProfile).slice(0,9);
      // console.log("thailandAddressData", thailandAddressData);

      const combinedAddress = thailandAddressProfile
      ? [thailandAddressProfile, ...thailandAddressData]
      : thailandAddressData;


      const hasCustomerAddress = res.items?.[0]?.provinceCode;

      // setMode("edit");
      if(hasCustomerAddress){
        setAddressThailand(combinedAddress);
        // setAddressThailandTax(combinedAddressTax);
        // const valueDocument = res.data?.customerAddresses?.find(item => item.addressType === "document");
        // const valueBilling = res.data?.customerAddresses?.find(item => item.addressType === "billing");
        // setCustomerAddressId([valueDocument?.id || 0, valueBilling?.id || 0]);
      }

      const valueProvince = hasCustomerAddress ? `${thailandAddressProfile?.p}_${thailandAddressProfile?.d}_${thailandAddressProfile?.s}_${thailandAddressProfile?.pCode}_${thailandAddressProfile?.dCode}_${thailandAddressProfile?.sCode}_${thailandAddressProfile?.po}` : undefined;
       
      
      formBookingForm.setFieldsValue({
        // firstName: res.items?.[0]?.firstName || undefined,
        // lastName: res.items?.[0]?.lastName || undefined,  
        titleName:  res.items?.[0]?.titleName || undefined,
        firstName: res.items?.[0]?.firstName || undefined,
        lastName: res.items?.[0]?.lastName || undefined,
        identityId: res.items?.[0]?.identityId || undefined,
        name: res.items?.[0]?.name || undefined,
        // name: res.items?.[0]?.name || undefined,
        soi: res.items?.[0]?.soi || undefined,
        street: res.items?.[0]?.street || undefined,
        addressNo: res.items?.[0]?.address || undefined,
        provinceCode: valueProvince,
        districtCode: res.items?.[0]?.districtCode || undefined,
        subDistrictCode: res.items?.[0]?.subDistrictCode || undefined,
        postCode: res.items?.[0]?.postCode || undefined,
        mobile: res.items?.[0]?.mobile || undefined,
        // identityId: res.items?.[0]?.identityId || undefined,
        attachIdentity: res.items?.[0]?.attachIdentity || undefined,
        attachDrivingLicense: res.items?.[0]?.attachDrivingLicense || undefined,
        attachEmployeeCard: res.items?.[0]?.attachEmployeeCard || undefined,
        nameDocument: customerTypeValue === "CT0001" ? `${res.items?.[0]?.firstName} ${res.items?.[0]?.lastName}` || undefined : res.items?.[0]?.name || undefined,
        // email: res.items?.[0]?.email || undefined
      });

      setAttachIdentity(res.items?.[0]?.attachIdentity || undefined);
      setAttachDrivingLicense(res.items?.[0]?.attachDrivingLicense || undefined);
      setAttachEmployeeCard(res.items?.[0]?.attachEmployeeCard || undefined);
    }
    catch(e){
      
    }
  }

  const onGetImageUrlEmployeeCard = (imageUrl?: string) =>{
    setAttachEmployeeCard(imageUrl);
  }

  const onGetImageUrlUploadedIdCard = (imageUrl?: string) =>{
    setAttachIdentity(imageUrl);
  }
  
  const onGetImageUrlUploadedIdDriver = (imageUrl?: string) =>{
    setAttachDrivingLicense(imageUrl);
  }

  const onChangeAddNewCustomer = (e: RadioChangeEvent) =>{
    setIsAddNewCustomer(e.target.checked);
    formBookingForm.resetFields([
      'firstName',
      'lastName',
      'identityId',
      'customerId'
    ])
  }

  const onChangeCustomerType = (value: string) =>{
    setCustomerTypeValue(value);
    formBookingForm.resetFields([
      'firstName',
      'lastName',
      'identityId',
      'customerId',
      'attachIdentity',
      'attachDrivingLicense',
      'attachEmployeeCard'
    ]);
    setAttachDrivingLicense(undefined);
    setAttachIdentity(undefined);
    setAttachEmployeeCard(undefined);
    useApiCustomer.fetch({
      pageIndex: 1,
      pageSize: 10,
      customerType: value,
    })
  } 

  const onClickToPrintPdf = async () =>{
    if(useApiGetRequestForm.data?.data?.bookingNo){
      try {
        const defineAgreementsExport = await useApiGetPdf.download({bookingNo: useApiGetRequestForm.data?.data?.bookingNo});
        console.log("defineAgreementsExport",defineAgreementsExport);
        let response_data: ArrayBuffer = defineAgreementsExport  as ArrayBuffer;
        if (response_data instanceof ArrayBuffer) {
          // const blob = new Blob([defineAgreementsExport]);
          var file = new Blob([defineAgreementsExport], {type: 'application/pdf'});
          const url = URL.createObjectURL( file );
          window.open(url, '_blank');
        } else {
          console.error('Response data is not an ArrayBuffer');
        }
      } catch (error: any) {
        notify({title: 'พิมพ์ PDF ไม่สําเร็จ', type: 'error'});
      }
     
    

    }
  }

  const calculateTotalPrice = (fields: any[]) => {
    return fields.reduce((total, field) => {
      const amount = field.amount || 0;
      const price = field.price || 0;
      return total + (amount * price);
    }, 0);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.options) {
      const totalPrice = calculateTotalPrice(allValues.options);
      formBookingForm.setFieldsValue({ 'ราคาต่อวัน': totalPrice });
    }
  };

  const summmary = () : number => {
    const listOptions = formBookingForm.getFieldsValue().bookingOptionsAntd;
    const totalprice = listOptions
    const summary = listOptions.reduce((acc, option) => {
      const { optionCode, price, amount } = option;
      const total = (price || 0) * (amount || 0);
      
      if (acc.has(optionCode as string)) {
        acc.set(optionCode as string, acc.get(optionCode as string)! + total);
      } else {
        acc.set(optionCode as string, total);
      }
      
      return acc;
    }, new Map<string, number>());
    
    // Calculate the overall total
    const overallTotal = Array.from(summary.values()).reduce((sum, value) => sum + value, 0);
    formBookingForm.setFieldsValue({ 'ราคาต่อวัน': overallTotal });
    return overallTotal
  };

  const onChangeAmountOptions = (value: number | null) =>{
    if(value){
     const total = summmary();
     
    }
  }

  const onChangeDateRange = (dateRange: [string, string]) =>{
    // const value = formBookingForm.getFieldsValue();
    // const startDate =  dayjs(value.dateRange[0]).toISOString();
    // const endDate =  dayjs(value.dateRange[1]).toISOString();
    // console.log("startDate",startDate,"endDate",endDate);
    calCulatePrice();
  }

  const onChangeReceiveLocation = (value: string) => {
    calCulatePrice();
  }

  const onChangeReturnLocation = (value: string) =>{
    calCulatePrice();
  }

  const onChangeVoucherNo = (event: React.ChangeEvent<HTMLInputElement>) =>{
    calCulatePrice();
  }

  const calCulatePrice = async () => {
    const value = formBookingForm.getFieldsValue();
    const res = await useApiCalculatePrice.fetch({
      bookingInput:{
        startDate: value.dateRange ?  dayjs(value.dateRange[0]).toISOString() : undefined,
        endDate: value.dateRange ? dayjs(value.dateRange[1]).toISOString() : undefined,
        receiveLocationCode: value.receiveLocationCode,
        returnLocationCode: value.returnLocationCode,
        options: value.bookingOptionsAntd && (value.bookingOptionsAntd.length > 0)  ?  value.bookingOptionsAntd.map((data) => {
          return {
            amount: data.amount,
            optionCode: data.optionCode,
            ...constantBranch
          }
        }) : undefined,
        voucherCodes: value.bookingVouchers && (value.bookingVouchers.length > 0)
        ? value.bookingVouchers
            .filter((data): data is { voucherNo: string } => 
              data !== null && data !== undefined && typeof data.voucherNo === 'string')
            .map((data) => data.voucherNo)
        : undefined,
        ...constantBranch,
        vehicleMasterId: value.vehicleMasterId,

      }
    })
    if(res.status == 400){
      console.error("booking",res.message);
      // notify({title: res.message, type:"error"})
      return 
    }
    formBookingForm.setFieldsValue({
      totalAmount: res.data?.originalPrice || 0,
      discount: (res.data?.originalPrice || 0) - (res.data?.discountCarPrice || 0),
      totalPrice: res.data?.discountPrice || 0
    })
  }

  const onChangeVehicleMasterBookingForm = (id: number) =>{
    calCulatePrice();
  }

  const contentProps: BookingContentProps = {
    pageIndex,
    pageSize,
    useApiBookingGet,
    rowSelectedTable,
    formBookingForm,
    formBooking,
    formSearch,
    isVisibleFormBooking,
    mode,
    isModalConfirmVisible,
    imageUrl,
    isVisibleModalShortTerm,
    quillRef,
    responseLocation,
    addressThailand,
    dataTest,
    selectedItems,
    useApiVehicleMaster,
    useApiMasterPriceTierGet,
    isVisibleFormBookingForm,
    addressThailandTax,
    useApiAcctMgr,
    useApiPackageSd,
    useApiPaymentRental,
    useApiUsageAddress,
    useApiPacakge,
    useApiAllOptions,
    useApiBranch,
    isCheckedTax,
    rowSelectedTableDriver,
    rowSelectedTableOptions,
    rowSelectedTableVoucher,
    useApiCustomer,
    useApiPaymentStatus,
    useApiCustomerGroup,
    useApiCustomerSource,
    useApiCustomerType,
    dataSourceCustomer,
    useApiCustomerRental,
    useApiMasterPayment,
    bookingRequestNo,
    isDisableCheckBoxSaveDb,
    attachDrivingLicense,
    attachEmployeeCard,
    attachIdentity,
    isAddNewCustomer,
    customerTypeValue,
    useApiLicensePlate,
    useApiGetRequestForm,
    useApiRentalType,
    useApiBookingGetById,
    useApiTitleApi,
    recordStatusBooking,
    packageItemApiRefetch,
    onChangeVehicleMasterBookingForm,
    calCulatePrice,
    onChangeVoucherNo,
    onChangeReceiveLocation,
    onChangeReturnLocation,
    onChangeDateRange,
    summmary,
    onValuesChange,
    onClickToPrintPdf,
    onSearchLicensePlate,
    onChangeCustomerId,
    setRowSelectedTableVoucher,
    onChangeRowSelectionOptions,
    setRowSelectedTableOptions,
    saveBooking,
    validateThaiIDCard,
    onClickBookingDraft,
    onChangeDropdown,
    onClickAddRow,
    onRemove,
    onClickCheckBoxFax,
    handleImageUpload,
    onChangeAddressThailand,
    onSearchDistrict,
    onSearchPostCode,
    onSearchProvince,
    onSearchSubDistrict,
    setRowSelectedTableDriver,
    // ImageHandler,
    onChangeUpload,
    onChangeTable,
    onClickShowModalConfirm,
    onChangeRowSelection,
    onClickToEdit,
    onClikToView,
    onClickRemove,
    onClickToAdd,
    onSubmitSerach,
    onClickToPackageItem,
    onSubmitFormBooking,
    onCloseModalForm,
    onClickClearForm,
    onCloseModalConfirm,
    onClickConfirmEdit,
    onClickConfirmDelete,
    onClickToPreviousePage,
    onSubmitFormShortTerm,
    onChangeStartDate,
    onClickToAddBookingForm,
    onSearchDistrictTax,
    onSearchPostCodeTax,
    onSearchProvinceTax,
    onSearchSubDistrictTax,
    onChangeAddressThailandTax,
    onClickShowModalBookingForm,
    onClickBookingFormDraft,
    onChangeOptions,
    onChangeRowSelectionDriver,
    onChangeRowSelectionVoucher,
    onChangeRadioPriceTier,
    onChangeVehicleMaster,
    onSearchCustomer,
    onSearchCustomerRental,
    onGetImageUrlEmployeeCard,
    onGetImageUrlUploadedIdCard,
    onGetImageUrlUploadedIdDriver,
    onChangeAddNewCustomer,
    onChangeCustomerType,
    onChangeAmountOptions
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
            {/* <Col span={1}>
              <Button
                type="default"
                shape="circle"
                icon={<ArrowLeftOutlined />}
                onClick={onClickToPreviousePage}
              />
            </Col> */}
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
        onClickConfirmEdit={() => {saveBooking({status: statusBooking})}}
        onClickConfirmDelete={onClickConfirmDelete}
        mode={mode}
        rowSelectedTable={rowSelectedTable}
      />}
      {/* {<ModalConfirmCrud 
        isModalConfirmVisible={isModalConfirmVisible}
        onCloseModalConfirm={onCloseModalConfirm}
        onClickConfirmEdit={() => {saveBookingForm({status: statusBooking})}}
        onClickConfirmDelete={onClickConfirmDelete}
        mode={mode}
        rowSelectedTable={rowSelectedTable}
      />} */}
    </Row>
   
    {/* {renderModalConfirm(contentProps)} */}
    {renderModalCRUDForm(contentProps)}
    {/* {renderModalShortTermForm(contentProps)} */}
    {renderShortTermBookingForm(contentProps)}
  </>
  );
}


const renderOptionsAddAndRemove = (props: BookingContentProps): ReactElement => {
  return (
    <Row gutter={[ 8, 8 ]} justify={"start"} align={"middle"}>
      <Col >
        <Button className='button-primary' onClick={props.onClickToAdd}>เพิ่ม</Button>
      </Col>
      {/* <Col >
        <Button className='button-primary' onClick={props.onClickToAddBookingForm}>เพิ่ม ฟอร์มส่งมอบสัญญารถเช่าระยะสั้น</Button>
      </Col> */}
      <Col>
        <Button className='button-error' onClick={props.onClickShowModalConfirm}>ลบ</Button>
      </Col>
      
    </Row>
  );
}
const renderOptions = (props: BookingContentProps): ReactElement => {
  return (
    <>
      <Form onFinish={props.onSubmitSerach} layout='horizontal' form={props.formSearch} >
        <Card>
          <Row 
            gutter={[ 16, 8 ]} 
            // justify={"center"} 
            justify={'start'}
            align={"middle"}
          >
            {/* <Col xs={24} md={10}> */}
            <Col span={12}>
              <Form.Item
                name="bookingRequestNo"
                label={"สัญญาเช่าระยะสั้น เลขที่"}
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

const renderTable = (props: BookingContentProps): ReactElement => {
  console.log("props.useApiCustomer.data?.items?", props.useApiCustomer.data?.items)
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
              key: "bookingRequestNo",
              dataIndex: "bookingRequestNo",
              title: "สัญญาเช่าระยะสั้น เลขที่",                
              sorter: true,
              // render: (_, record) => {
              //   return record?.metaKeyword
              // }
            },
            {
              key: "status",
              dataIndex: "status",
              title: "สถานะ",                
              sorter: true,
              // render: (_, record) => {
              //   return record?.metaKeyword
              // }
            },
            {
              key: "bookingStatus",
              dataIndex: "bookingStatus",
              title: "สถานะ ฟอร์มส่งมอบระยะสั้น",                
              sorter: true,
              render: (_, record) => {
                return record?.bookingStatus !== "" ? record?.bookingStatus : "-"
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
                        props.onClickToEdit({ bookingRequestNo: record.bookingRequestNo || "", status: record.status || "" });
                      }}
                    />
                      {
                        record.status == "pending" && (
                          <Button
                            type="default"
                            // shape="circle"
                            onClick={() => {
                              props.onClickShowModalBookingForm({ bookingRequestNo: record.bookingRequestNo || "",status: record?.bookingStatus || "" });
                            }}
                          >
                            ฟอร์มส่งมอบ
                          </Button>
                        )
                      }
                       {/* <Button
                          type="default"
                          // shape="circle"
                          onClick={() => {
                            props.onClickShowModalBookingForm({ bookingRequestNo: record.bookingRequestNo || "",status: record?.bookingStatus || "" });
                          }}
                        >
                          ฟอร์มส่งมอบ
                        </Button> */}
                  </Space>
                );
              }
            }
          ]
        }
        rowKey={'bookingRequestNo'}
        dataSource = {props.useApiBookingGet.data?.items || []}
        loading = {props.useApiBookingGet.loading}
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
          total: props.useApiBookingGet.data?.totalItems,
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

const renderShortTermBookingForm = (props: BookingContentProps): ReactElement => {
  return(
    <Modal
      // open={props.isVisibleModalShortTerm}
      open={props.isVisibleFormBookingForm}
      centered={true}
      footer={null}
      width={1000}
      onCancel={props.onCloseModalForm}
      closable={false}
    >
      <FormBooking 
        bookingRequestNo={props.bookingRequestNo} 
        recordStatus={props.recordStatusBooking} 
        onCancleForm={props.onCloseModalForm}
        refetch={{
          pageIndex: props.pageIndex,
          pageSize: props.pageSize,
          onRefetchApiTable: props.packageItemApiRefetch
        }}
        // onRefetchApiTable={props.packageItemApiRefetch}
      />
    </Modal>
  )
}
const renderModalShortTermForm = (props: BookingContentProps): ReactElement =>{
  // console.log("props", props.selectedItems)
  return(
    <Modal
      // open={props.isVisibleModalShortTerm}
      open={props.isVisibleFormBookingForm}
      centered={true}
      footer={null}
      width={1000}
      onCancel={props.onCloseModalForm}
      closable={false}
    >
      <Form
        layout='vertical'
        onFinish={props.onSubmitFormShortTerm}
        form={props.formBookingForm}
        // onValuesChange={props.onValuesChange}
      >
        <Row gutter={[ 8, 8 ]}>
          <Col span={24}>
            <Row gutter={[8, 8]} justify={"space-between"} align={'middle'}>
              <Col>
                <Typography.Title level={3}>ฟอร์มส่งมอบสัญญารถเช่าระยะสั้น</Typography.Title>
              </Col>
              <Col>
                <Button
                  onClick={props.onClickToPrintPdf}
                  disabled={!props.useApiGetRequestForm.data?.data?.bookingNo}
                >
                  พิมพ์ใบส่งมอบ
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Form.Item
              label = "ประเภทการเช่า"
              name = "rentalType"
              rules={[
                { required: true, message: 'กรุณากรอก ประเภทการเช่า' },
              ]}
            >
              <Select
                options={props.useApiRentalType.data?.data?.map((item) => ({label: item.productName, value: item.id}))}
                // className='w-2/5'
                style={{ width: '40%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} >
            <Row gutter={[ 8, 8 ]} align={'middle'}>
              <Col>
                <Form.Item
                  label = "เลขที่ใบคำขอเช่า"
                  name = "bookingRequestNo"
                  rules={[
                    { required: true, message: 'กรุณากรอก เลขที่ใบคำขอเช่า' },
                  ]}
                >
                  <Input className='w-full' disabled/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label = " "
                  name = "upload"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก เลขที่ใบคำขอเช่า' },
                  // ]}
                >
                  <Upload
                    accept="image/*"
                    maxCount={1}
                    listType="picture"
                    onChange={props.onChangeUpload}
                    showUploadList={false}
                    
                  >
                    <Button>อัปโหลดไฟล์ รูปภาพ</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col>
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
              </Col>
            </Row>
          </Col>
        
          <Col xs={24} md={12} >
            <Form.Item
              label = "ส่งคำขอไปยังสาขา"
              name = "branchCode"
              rules={[
                { required: true, message: 'กรุณากรอก ส่งคำขอไปยังสาขา' },
              ]}
            >
              <Select 
                className='w-full' 
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={props.useApiBranch.data?.items?.map((item) => ({ value: item.branchCode, label: item.name }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>ข้อมูลการใช้งาน</Typography.Title>
          </Col>
          <Col span={24} >
            <Form.Item
              label = "รถยนต์ที่ขอเช่า"
              name = "vehicleMasterId"
              rules={[
                { required: true, message: 'กรุณากรอก รถยนต์ที่ขอเช่า' },
              ]}
            >
              <Select
                className='w-full custom-select'
                allowClear={false}
                showSearch
                onChange={props.onChangeVehicleMasterBookingForm}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  ...(props.useApiVehicleMaster.data?.items?.map((data) => {
                    return { value: data.id, label: `${data.brandName} ${data.modelName} ${data.id}` }
                  }) || [])  
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} >
            <Form.Item
              label = "สถานะการชำระเงิน"
              name = "paymentStatus"
              rules={[
                { required: true, message: 'กรุณากรอก สถานะการชำระเงิน' },
              ]}
            >
               {/* <Input className='w-full'/> */}
              <Select className='w-full' options = {props.useApiPaymentStatus.data?.data?.map((data) => ({ value: data.code, label: data.name }))}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} >
            <Form.Item
              label = "การชำระเงิน"
              name = "paymentMethod"
              rules={[
                { required: true, message: 'กรุณากรอก การชำระเงิน' },
              ]}
            >
              {/* <Input className='w-full'/> */}
              <Select 
                className='w-full'
                options={props.useApiMasterPayment.data?.items?.map((data) => ({ value: data.code, label: data.paymentChanel }))}
              />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item
              label = "วันที่คาดจะส่งมอบ - วันที่คาดจะรับคืน"
              name = "dateRange"
              rules={[
                { required: true, message: 'กรุณากรอก วันที่คาดจะส่งมอบ' },
              ]}
            >
              <DatePicker.RangePicker
                showTime 
                format={'DD/MM/YYYY HH:mm:ss'} 
                className='w-full'
                onChange={(date, dateRange) => {props.onChangeDateRange(dateRange)}}
              />
            </Form.Item>
          </Col>
          {/* <Col xs={24} md={12} >
            <Form.Item
              label = "วันที่คาดจะรับคืน"
              name = "endDate"
              rules={[
                { required: true, message: 'กรุณากรอก วันที่คาดจะรับคืน' },
              ]}
            >
              <DatePicker 
                showTime 
                format={'DD/MM/YYYY HH:mm:ss'} 
                className='w-full'
              />
            </Form.Item>
          </Col> */}
          <Col xs={24} md={12}>
            <Form.Item
              label = "สถานที่ส่งมอบรถยนต์"
              name = "receiveLocationCode"
              rules={[{ required: true, message: 'กรุณาเลือก สถานที่ส่งมอบรถยนต์' }]}
            >
              <Select
                className='w-full custom-select'
                allowClear={false}
                onChange={(value) => {props.onChangeReceiveLocation(value)}}
              >
                {props.responseLocation.data?.data?.items?.map((data) => {
                  return (
                    <Select.Option key={data.code} value={data.code}>
                      {data.name}
                    </Select.Option>
                  )
                })}
              </Select>  
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "สถานที่ส่งคืนรถยนต์"
              name = "returnLocationCode"
              rules={[{ required: true, message: 'กรุณาเลือก สถานที่ส่งคืนรถยนต์' }]}
            >
              <Select
                className='w-full custom-select'
                allowClear={false}
                onChange={(value) => {props.onChangeReturnLocation(value)}}
              >
                {props.responseLocation.data?.data?.items?.map((data) => {
                  return (
                    <Select.Option key={data.code} value={data.code}>
                      {data.name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "เลขไมล์ ณ วันส่งมอบ"
              name = "carReceiveMile"
              rules={[{ required: true, message: 'กรุณากรอก สถานที่ส่งคืนรถยนต์' },
                {pattern:/^[0-9]*$/,message: 'กรุณากรอก เลขไมล์ ณ วันส่งมอบ เป็นตัวเลข'}]}
            >
              <Input className='w-full' />
            </Form.Item>
           
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "เลขไมล์ ณ วันรับคืน"
              name = "carReturnMile"
              rules={[{ required: true, message: 'กรุณากรอก เลขไมล์ ณ วันรับคืน' },
                {pattern:/^[0-9]*$/,message: 'กรุณากรอก เลขไมล์ ณ วันรับคืน เป็นตัวเลข'}]}
            >
              <Input className='w-full'/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Typography.Title level={4}>ข้อมูลลูกค้า</Typography.Title>
          </Col>
          <Col xs={24} md={12} >
            <Form.Item
              label = "ประเภทลูกค้า"
              name = "customerType"
              rules={[
                { required: true, message: 'กรุณากรอก ประเภทลูกค้า' },
              ]}
            >
              {/* <Input className='w-full'/> */}
              <Select 
                className='w-full' 
                onChange={props.onChangeCustomerType}
                options={props.useApiCustomerType.data?.data?.map((data) => ({ value: data.code, label: data.name }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} >
            <Form.Item
              label = "ที่มาลูกค้า"
              name = "acquireMethod"
              rules={[
                { required: true, message: 'กรุณากรอก ที่มาลูกค้า' },
              ]}
            >
              {/* <Input className='w-full'/> */}
              <Select className='w-full' options={props.useApiCustomerSource.data?.data?.map((data) => ({ value: data.code, label: data.name }))}/>
            </Form.Item>
          </Col>
          {/* <Col span={24} hidden={props.customerTypeValue ? false : true}> 
            <Form.Item
              label = "เพิ่มลูกค้าใหม่"
              name = "addNewCustomer"
              valuePropName="checked"
              layout='horizontal'
            >
              <Checkbox 
                onChange={props.onChangeAddNewCustomer}
              />
            </Form.Item>
          </Col> */}
          {
            props.customerTypeValue  && (
              <Col xs={24} md={12} lg = {24} xl ={24} hidden={props.isAddNewCustomer }>
                <Form.Item
                  label = "ชื่อลูกค้าเดิม"
                  name = "customerId"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก ชื่อลูกค้า' },
                  // ]}
                >
                  {/* <InputNumber className='w-full'/> */}
                  <Select 
                    showSearch 
                    className='w-full' 
                    options={props.useApiCustomer.data?.items?.map((data) => ({ 
                      value: data.id, label: props.customerTypeValue == "CT0001" ? `${data.firstName} ${data.lastName} - ${data.identityId}` : `${data.name} - ${data.identityId}` 
                    }))}
                    onChange={props.onChangeCustomerId}
                    onSearch={debounceFn( props.onSearchCustomer, 1000)}
                    filterOption={false}
                    allowClear
                  />
                </Form.Item>
              </Col>
            )
          }
          {
            props.customerTypeValue && props.customerTypeValue == "CT0001" && (
              <>
                {/* <Col xs={24} md={12} lg = {8} xl ={8} hidden={!props.isAddNewCustomer}> */}
                <Col xs={24} md={12} lg = {6} xl = {6} >
                  <Form.Item
                    label = "คำนำหน้า"
                    name = "titleName"
                    rules={[
                      { required: true, message: 'กรุณากรอก คำนำหน้า' },
                    ]}
                  >
                    <Select className='w-full' options={props.useApiTitleApi.data?.items?.map((data) => ({label: data.titleDesc, value: data.titleDesc}))}/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg = {6} xl = {6} >
                  <Form.Item
                    label = "ชื่อจริง"
                    name = "firstName"
                    rules={[
                      { required: true, message: 'กรุณากรอก ชื่อจริง' },
                    ]}
                  >
                    <Input className='w-full'/>
                  </Form.Item>
                </Col>
                {/* <Col xs={24} md={12} lg = {8} xl ={8} hidden={!props.isAddNewCustomer}> */}
                <Col xs={24} md={12} lg = {6} xl = {6} >
                  <Form.Item
                    label = "นามสกุล"
                    name = "lastName"
                    rules={[
                      { required: props.isDisableCheckBoxSaveDb, message: 'กรุณากรอก นามสกุล' },
                    ]}
                  >
                    <Input className='w-full'/>
                  </Form.Item>
                </Col>
              </> 
            )
          }
          {
            props.customerTypeValue && props.customerTypeValue !== "CT0001" && (
              <Col xs={24} md={12} lg = {8} xl ={8} >
                <Form.Item
                  label = "ชื่อ"
                  name = "name"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่อ' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
            )
          }
          {

          }
          <Col xs={24} md={12} lg = {6} xl ={6} hidden ={props.customerTypeValue ? false : true}>
            <Form.Item
              label = {props.customerTypeValue == "CT0001" ? "เลขบัตรประชาชน/หนังสือเดินทาง" : "เลขประจําตัวผู้เสียภาษี"}
              name = "identityId"
              rules={[
                { required: true, message: `กรุณากรอก ${props.customerTypeValue == "CT0001" ? "เลขบัตรประชาชน/หนังสือเดินทาง" : "เลขประจําตัวผู้เสียภาษี"}` },
                // { validator: props.validateThaiIDCard },
              ]}
            >
              <Input  className='w-full' maxLength={13}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg = {24} xl ={24} >
            <Form.Item
              label = "เบอร์โทรศัพท์"
              name = "mobile"
              rules={[
                // { required: true, message: 'กรุณากรอก เบอร์โทรศัพท์' },
                {pattern:/^[0-9]*$/,message: 'กรุณากรอก เบอร์โทรศัพท์ เป็นตัวเลข'}
              ]}
            >
              <Input className='w-2/4' maxLength={10}/>
            </Form.Item>
          </Col>
          {
            props.customerTypeValue && props.customerTypeValue == "CT0001" && (
              <>
                <Col xs={24} md={12} xl ={12} >
                  {<UploadFileComponent 
                    name='attachIdentity'
                    label='ไฟล์บัตรประชาชนหรือหนังสือเดินทาง'
                    onGetImageUrlUploaded={props.onGetImageUrlUploadedIdCard} 
                    imageUrl={props.attachIdentity}
                  />}
                </Col>
                <Col xs={24} md={12} xl ={12} >
                  {<UploadFileComponent 
                    name='attachDrivingLicense'
                    label='ไฟล์ใบขับขี่'
                    onGetImageUrlUploaded={props.onGetImageUrlUploadedIdDriver} 
                    // onGetImageUrlUploaded={props.onGetImageUrlUploaded} 
                    imageUrl={props.attachDrivingLicense}
                  />}
                </Col>
                <Col xs={24} md={12} xl ={12} >
                  {<UploadFileComponent 
                    name="attachEmployeeCard"
                    label='ไฟล์หลักฐานการเป็นพนักงาน เช่น บัตรพนักงาน'
                    onGetImageUrlUploaded={props.onGetImageUrlEmployeeCard} 
                    // onGetImageUrlUploaded={props.onGetImageUrlUploaded} 
                    imageUrl={props.attachEmployeeCard}
                  />}
                </Col>
              </>
            )
          }
          
          <Col span={24}>
            <strong>ข้อมูลในการส่งเอกสาร</strong>
            {/* <Typography.Title level={4}>ข้อมูลลูกค้า</Typography.Title> */}
          </Col>
          <Col xs={24} md={12} lg = {12} xl = {12}>
            <Form.Item
              label = "ชื่อ"
              name = "nameDocument"
              rules={[
                { required: true, message: 'กรุณากรอก ชื่อ' },
              ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col>
          {/* <Col xs={24} md={12} lg = {12} xl = {12}>
            <Form.Item
              label = "นามสกุล"
              name = "lastName"
              rules={[
                { required: true, message: 'กรุณากรอก นามสกุล' },
              ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col> */}
          <Col xs={24} md={12}>
            <Form.Item
              label = "โทรศัพท์"
              name = "mobileNo"
              rules={[
                { required: true, message: 'กรุณากรอก โทรศัพท์' },
                {pattern:/^[0-9]*$/,message: 'กรุณากรอก เบอร์โทรศัพท์ เป็นตัวเลข'}
              ]}
            >
              <Input  className='w-full' maxLength={10}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "เลขที่"
              name = "addressNo"
              // rules={[
              //   { required: true, message: 'กรุณากรอก เลขที่' },
              // ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "หมู่"
              name = "moo"
              // rules={[
              //   { required: true, message: 'กรุณากรอก หมู่' },
              // ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "หมู่บ้าน/อาคาร/โครงการ"
              name = "building"
              // rules={[
              //   { required: true, message: 'กรุณากรอก หมู่บ้าน/อาคาร/โครงการ' },
              // ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "ซอย"
              name = "soi"
              // rules={[
              //   { required: true, message: 'กรุณากรอก หมู่บ้าน/อาคาร/โครงการ' },
              // ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "ถนน"
              name = "street"
              // rules={[
              //   { required: true, message: 'กรุณากรอก ถนน' },
              // ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "postCode"
              label={"รหัสไปรษณีย์"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก รหัสไปรษณีย์'}
              // ]}
            >
              <Select
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailand}
                  onSearch={debounceFn(props.onSearchPostCode, 1000)}
                  options={props.addressThailand.map((item) => ({
                    label: (
                      <span>
                        {item.p} &gt;&gt; {item.d} &gt;&gt; {item.s} &gt;&gt; <strong>{item.po}</strong>
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                    ,children: item.po
                  }))}
                  
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "provinceCode"
              label={"จังหวัด"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก รหัสไปรษณีย์'}
              // ]}
            >
              {/* {props.thailandAddressData.length } */}
              <Select
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailand}
                  onSearch={debounceFn(props.onSearchProvince, 1000)}
                  options={props.addressThailand.map((item) => ({
                    label: (
                      <span>
                        <strong>{item.p}</strong> &gt;&gt; {item.d} &gt;&gt; {item.s} &gt;&gt; {item.po}
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                  ,children: item.p
                }))}

              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "districtCode"
              label={"เขต/อำเภอ"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก เขต/อำเภอ'}
              // ]}
            >
              <Select
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailand}
                  onSearch={debounceFn(props.onSearchDistrict, 1000)}
                  options={props.addressThailand.map((item) => ({
                    label: (
                      <span>
                        {item.p} &gt;&gt; <strong >{item.d}</strong> &gt;&gt; {item.s} &gt;&gt; {item.po}
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                    ,children: item.d
                  }))}
      
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "subDistrictCode"
              label={"แขวง/ตำบล"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก แขวง/ตำบล'}
              // ]}
            >
              <Select
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailand}
                  onSearch={debounceFn(props.onSearchSubDistrict, 1000)}
                  options={props.addressThailand.map((item) => ({
                    label: (
                      <span>
                        {item.p} &gt;&gt; {item.d} &gt;&gt; <strong >{item.s}</strong> &gt;&gt; {item.po}
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                    ,children: item.s
                  }))}
                  
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              label = "ไม่อัพเดทข้อมูลลูกค้า"
              name = "isNotUpdateAddress"
              valuePropName="checked"
              layout='horizontal'
              // rules={[
              //   { required: true, message: 'กรุณากรอก ชื่อ' },
              // ]}
            >
              <Checkbox 
                disabled={props.isDisableCheckBoxSaveDb}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]} align={'middle'}>
              <Col>
                <strong>ข้อมูลในการส่งออกใบกำกับ ภาษี</strong>
              </Col>
              <Col>
                <Checkbox 
                  checked={props.isCheckedTax}
                  onChange={props.onClickCheckBoxFax}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12} lg = {12} xl = {12}>
            <Form.Item
              label = "ชื่อ"
              name = "nameTax"
              rules={[
                { required: true, message: 'กรุณากรอก ชื่อ' },
              ]}
            >
              <Input  className='w-full'/>
            </Form.Item>
          </Col>
          {/* <Col xs={24} md={12} lg = {12} xl = {12}>
            <Form.Item
              label = "นามสกุล"
              name = "lastNameTax"
              rules={[
                { required: true, message: 'กรุณากรอก นามสกุล' },
              ]}
            >
              <Input  className='w-full' disabled ={props.isCheckedTax}/>
            </Form.Item>
          </Col> */}
            <Col xs={24} md={12}>
            <Form.Item
              label = "เลขประจำตัวผู้เสียภาษี"
              name = "taxNo"
              rules={[
                // { required: true, message: 'กรุณากรอก เลขประจำตัวผู้เสียภาษี' },
                {pattern:/^[0-9]*$/,message: 'กรุณากรอก เลขประจำตัวผู้เสียภาษี เป็นตัวเลข'}
              ]}
            >
              <Input  className='w-full' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "โทรศัพท์"
              name = "mobileNoTax"
              rules={[
                // { required: true, message: 'กรุณากรอก โทรศัพท์' },
                {pattern:/^[0-9]*$/,message: 'กรุณากรอก เบอร์โทรศัพท์ เป็นตัวเลข'}
              ]}
            >
              <Input  className='w-full' disabled ={props.isCheckedTax}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "เลขที่"
              name = "addressNoTax"
              // rules={[
              //   { required: true, message: 'กรุณากรอก เลขที่' },
              // ]}
            >
              <Input  className='w-full' disabled ={props.isCheckedTax}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "หมู่"
              name = "mooTax"
              // rules={[
              //   { required: true, message: 'กรุณากรอก หมู่' },
              // ]}
            >
              <Input  className='w-full' disabled ={props.isCheckedTax}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "หมู่บ้าน/อาคาร/โครงการ"
              name = "buildingTax"
              // rules={[
              //   { required: true, message: 'กรุณากรอก หมู่บ้าน/อาคาร/โครงการ' },
              // ]}
            >
              <Input  className='w-full' disabled ={props.isCheckedTax}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "ซอย"
              name = "soiTax"
              // rules={[
              //   { required: true, message: 'กรุณากรอก หมู่บ้าน/อาคาร/โครงการ' },
              // ]}
            >
              <Input  className='w-full' disabled ={props.isCheckedTax}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label = "ถนน"
              name = "streetTax"
              // rules={[
              //   { required: true, message: 'กรุณากรอก ถนน' },
              // ]}
            >
              <Input  className='w-full'  disabled ={props.isCheckedTax}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "postCodeTax"
              label={"รหัสไปรษณีย์"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก รหัสไปรษณีย์'}
              // ]}
            >
              <Select
                  // disabled ={props.isCheckedTax}
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailandTax}
                  onSearch={debounceFn(props.onSearchPostCode, 1000)}
                  options={props.addressThailandTax.map((item) => ({
                    label: (
                      <span>
                        {item.p} &gt;&gt; {item.d} &gt;&gt; {item.s} &gt;&gt; <strong>{item.po}</strong>
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                    ,children: item.po
                  }))}
                  
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "provinceCodeTax"
              label={"จังหวัด"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก รหัสไปรษณีย์'}
              // ]}
            >
              {/* {props.thailandAddressData.length } */}
              <Select
                  // disabled ={props.isCheckedTax}
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailandTax}
                  onSearch={debounceFn(props.onSearchProvince, 1000)}
                  options={props.addressThailandTax.map((item) => ({
                    label: (
                      <span>
                        <strong>{item.p}</strong> &gt;&gt; {item.d} &gt;&gt; {item.s} &gt;&gt; {item.po}
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                  ,children: item.p
                }))}

              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "districtCodeTax"
              label={"เขต/อำเภอ"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก เขต/อำเภอ'}
              // ]}
            >
              <Select
                  // disabled ={props.isCheckedTax}
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailandTax}
                  onSearch={debounceFn(props.onSearchDistrict, 1000)}
                  options={props.addressThailandTax.map((item) => ({
                    label: (
                      <span>
                        {item.p} &gt;&gt; <strong >{item.d}</strong> &gt;&gt; {item.s} &gt;&gt; {item.po}
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                    ,children: item.d
                  }))}
      
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}> 
            <Form.Item
              name = "subDistrictCodeTax"
              label={"แขวง/ตำบล"}
              // rules={[
              //   {required: true, message: 'กรุณาเลือก แขวง/ตำบล'}
              // ]}
            >
              <Select
                  disabled ={props.isCheckedTax}
                  showSearch
                  optionLabelProp="children"
                  onChange={props.onChangeAddressThailandTax}
                  onSearch={debounceFn(props.onSearchSubDistrict, 1000)}
                  options={props.addressThailandTax.map((item) => ({
                    label: (
                      <span>
                        {item.p} &gt;&gt; {item.d} &gt;&gt; <strong >{item.s}</strong> &gt;&gt; {item.po}
                      </span>
                    ), 
                    value: `${item.p}_${item.d}_${item.s}_${item.pCode}_${item.dCode}_${item.sCode}_${item.po}`
                    ,children: item.s
                  }))}
                  
              />
            </Form.Item>
          </Col>
          <Col span = {24}>
            <Row gutter={[8, 8]} align={'middle'}> 
              <Col span={12}>
                <Form.Item
                  label = "email"
                  name = "email"
                  rules={[
                    { required: true, message: 'กรุณากรอก email' },
                  ]}
                >
                  <Input  className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label = "fax"
                  name = "fax"
                  rules={[
                    // { required: true, message: 'กรุณากรอก fax' },
                    {pattern:/^[0-9]*$/,message: 'กรุณากรอก เบอร์โทรศัพท์ เป็นตัวเลข'}
                  ]}
                >
                  <Input  className='w-full' maxLength={10}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}> 
              </Col>
              <Col xs={24} md={12}> 
                <Form.Item
                  label = "ไม่อัพเดทข้อมูลลูกค้า"
                  name = "isNotUpdateAddressTax"
                  valuePropName="checked"
                  layout='horizontal'
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก ชื่อ' },
                  // ]}
                >
                  <Checkbox 
                    disabled={props.isDisableCheckBoxSaveDb}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <strong>ผู้ขับ</strong>
              </Col>
              <Col xs={24}  >
                <Form.List name="bookingDrivers">
                  {(fields, { add, remove }) => (
                    <>
                      <Row gutter={[ 8, 8 ]}>
                        <Col>
                          <Button
                            // type="dashed"
                            className='button-primary'
                            onClick={() => {
                              add()
                              const newIndex = fields.length ;
                              props.onClickAddRow({id: newIndex})
                              
                            }}
                            block
                            // icon={<PlusOutlined />}
                          >
                            เพิ่ม
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            // type="dashed"
                            className='button-error'
                            onClick={() => {
                              // Remove only if the selected row is checked
                              props.rowSelectedTableDriver.forEach((key) => {
                                const index = fields.findIndex((field) => field.key === key);
                                remove(index);
                                props.onRemove(index);
                              });
                              props.setRowSelectedTableDriver([]);
                            }}
                            block
                            // icon={<PlusOutlined />}
                          >
                            ลบ
                          </Button>
                        </Col>
                        <Col span = {24}>
                          <Table
                            rowSelection={{
                              selectedRowKeys: props.rowSelectedTableDriver,
                              onChange: props.onChangeRowSelectionDriver,
                            }}
                            columns={
                              [
                                {
                                  title: 'No',
                                  dataIndex: 'no',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'no']}
                                      // rules={[{ required: true, message: 'Missing No' }]}
                                    >
                                      {index + 1}
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'ชื่อ-นามสกุล',
                                  dataIndex: 'driverName',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'driverName']}
                                      rules={[{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }]}
                                    >
                                      <Input placeholder="ชื่อ-นามสกุล" />
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'เลขที่ใบขับขี่',
                                  dataIndex: 'driverLicense',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'driverLicense']}
                                      rules={[
                                        { required: true, message: 'กรุณากรอก เลขที่ใบขับขี่' },
                                        {pattern:/^[0-9]*$/,message: 'กรุณากรอก เลขที่ใบขับขี่ เป็นตัวเลข'}
                                      ]}
                                    >
                                      <Input placeholder="เลขที่ใบขับขี่" />
                                    </Form.Item>
                                  ),
                                },
                                // {
                                //   title: 'Driver ID',
                                //   dataIndex: 'driverId',
                                //   render: (_, __, index) => (
                                //     <Form.Item
                                //       name={[index, 'driverId']}
                                //       rules={[{ required: true, message: 'กรุณากรอก Driver ID' }]}
                                //     >
                                //       <Input placeholder="Driver ID" />
                                //     </Form.Item>
                                //   ),
                                // },
                                // {
                                //   title: 'Action',
                                //   dataIndex: 'action',
                                //   render: (_, __, index) => (
                                //     <MinusCircleOutlined onClick={() => removeRow(index)} />
                                //   ),
                                // },
                              ]
                            }
                            dataSource={fields}
                            pagination={false}
                            // rowKey="key"
                            rowKey={(field) => field.key}
                          />
                        </Col>
                      </Row>
                    
                  
                    </>
                  )}
                </Form.List>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ทะเบียน"
                  name = "licensePlate"
                  rules={[
                    { required: true, message: 'กรุณากรอก ทะเบียน' },
                  ]}
                >
                  <Select  
                    className='w-full'
                    showSearch
                    onSearch={debounceFn( props.onSearchLicensePlate, 1000)}
                    filterOption={false}
                    options={props.useApiLicensePlate.data?.items?.map((data) => ({ label: data.licensePlate, value: data.licensePlate }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "วัตถุประสงค์การใช้รถ"
                  name = "carUseObjective"
                  rules={[
                    { required: true, message: 'กรุณากรอก วัตถุประสงค์การใช้รถ' },
                  ]}
                >
                  <Input  className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <strong>ตัวเลือกเสริม</strong>
              </Col>
              <Col span={24}  >
                <Form.List name="bookingOptionsAntd">
                  {(fields, { add, remove }) => (
                    <>
                      <Row gutter={[ 8, 8 ]}>
                        <Col>
                          <Button
                            // type="dashed"
                            className='button-primary'
                            onClick={() => {
                              add()
                              const newIndex = fields.length ;
                              props.onClickAddRow({id: newIndex})
                              // props.summmary();
                            }}
                            block
                            // icon={<PlusOutlined />}
                          >
                            เพิ่ม
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            // type="dashed"
                            className='button-error'
                            onClick={() => {
                              // Remove only if the selected row is checked
                              props.rowSelectedTableOptions.forEach((key) => {
                                const index = fields.findIndex((field) => field.key === key);
                                remove(index);
                                props.onRemove(index);
                                props.summmary();
                                props.calCulatePrice();
                              });
                              props.setRowSelectedTableOptions([]);
                            }}
                            block
                            // icon={<PlusOutlined />}
                          >
                            ลบ
                          </Button>
                        </Col>
                        <Col span = {24}>
                          <Table
                            rowSelection={{
                              selectedRowKeys: props.rowSelectedTableOptions,
                              onChange: props.onChangeRowSelectionOptions,
                            }}
                            columns={
                              [
                                {
                                  title: 'No',
                                  dataIndex: 'no',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'no']}
                                      // rules={[{ required: true, message: 'Missing No' }]}
                                    >
                                      {index + 1}
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'ชื่อตัวเลือกเสริม',
                                  dataIndex: 'optionCode',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'optionCode']}
                                      rules={[{ required: true, message: 'กรุณากรอก ชื่อตัวเลือกเสริม' }]}
                                    >
                                      <Select 
                                        showSearch
                                        filterOption={(input, option) =>
                                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        onChange={
                                          (value, obj : any) =>{
                                            // console.log("index==>>",index?.price)
                                            props.onChangeOptions({index: index, price: obj?.price})
                                          }
                                        }
                                        options={[
                                          ...(props.useApiAllOptions.data?.data?.items?.map((data) => {
                                            return { value: data.code, label: `${data.name}`, price: data.price }
                                          }) || [])  
                                        ]}
                                      />
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'จำนวน',
                                  dataIndex: 'amount',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'amount']}
                                      rules={[{ required: true, message: 'กรุณากรอก จำนวน' }]}
                                    >
                                      <InputNumber min={1} onChange={props.onChangeAmountOptions}/>
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'ราคารวมใน vocher',
                                  dataIndex: 'isVoucher',
                                  align: 'center',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'isVoucher']}
                                      valuePropName="checked"
                                    >
                                      <Checkbox  />
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'ราคา / ชิ้น',
                                  dataIndex: 'price',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'price']}
                                      rules={[{ required: true, message: 'กรุณากรอก ราคา / ชิ้น' }]}
                                    >
                                      <Input disabled/>
                                    </Form.Item>
                                  ),
                                },
                                // {
                                //   title: 'Action',
                                //   dataIndex: 'action',
                                //   render: (_, __, index) => (
                                //     <MinusCircleOutlined onClick={() => removeRow(index)} />
                                //   ),
                                // },
                              ]
                            }
                            dataSource={fields}
                            pagination={false}
                            // rowKey="key"
                            rowKey={(field) => field.key}
                          />
                        </Col>
                      </Row>
                    
                  
                    </>
                  )}
                </Form.List>
              </Col>
              <Col span={24}>
                <Row gutter={[ 8, 8 ]} justify={'end'} align={'middle'}>
                  <Form.Item
                    label = "ราคาต่อวัน"
                    name = "ราคาต่อวัน"
                    layout='horizontal'
                    // rules={[
                    //   { required: true, message: 'กรุณากรอก หมู่บ้าน/อาคาร/โครงการ' },
                    // ]}
                  >
                    <Input  className='w-full' disabled/>
                  </Form.Item>
                </Row>
              </Col>
             
              <Col span={24}  >
                <Form.List name="bookingVouchers">
                  {(fields, { add, remove }) => (
                    <>
                      <Row gutter={[ 8, 8 ]}>
                        <Col>
                          <Button
                            // type="dashed"
                            className='button-primary'
                            onClick={() => {
                              add()
                              const newIndex = fields.length ;
                              props.onClickAddRow({id: newIndex})
                              
                            }}
                            block
                            // icon={<PlusOutlined />}
                          >
                            เพิ่ม
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            // type="dashed"
                            className='button-error'
                            onClick={() => {
                              // Remove only if the selected row is checked
                              props.rowSelectedTableVoucher.forEach((key) => {
                                const index = fields.findIndex((field) => field.key === key);
                                remove(index);
                                props.onRemove(index);
                              });
                              props.setRowSelectedTableVoucher([]);
                            }}
                            block
                            // icon={<PlusOutlined />}
                          >
                            ลบ
                          </Button>
                        </Col>
                        <Col span = {24}>
                          <Table
                            rowSelection={{
                              selectedRowKeys: props.rowSelectedTableVoucher,
                              onChange: props.onChangeRowSelectionVoucher,
                            }}
                            columns={
                              [
                                {
                                  title: 'No',
                                  dataIndex: 'no',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'no']}
                                    >
                                      {index + 1}
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'Voucher No.',
                                  dataIndex: 'voucherNo',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'voucherNo']}
                                      rules={[
                                        { required: true, message: 'กรุณากรอก Voucher No.' },
                                        {pattern:/^[0-9]*$/,message: 'กรุณากรอก Voucher No. เป็นตัวเลข'}
                                      ]}
                                    >
                                      <Input placeholder="Voucher No." onChange={ debounceFn( props.onChangeVoucherNo, 1000)}/>
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'Remark',
                                  dataIndex: 'remark',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'remark']}
                                      // rules={[{ required: true, message: 'กรุณากรอก Remark' }]}
                                    >
                                      <Input placeholder="Remark" />
                                    </Form.Item>
                                  ),
                                },
                              ]
                            }
                            dataSource={fields}
                            pagination={false}
                            // rowKey="key"
                            rowKey={(field) => field.key}
                          />
                        </Col>
                      </Row>
                    
                  
                    </>
                  )}
                </Form.List>
              </Col>
              <Col span={24}>
                <Form.Item
                  label = "หมายเหตุ"
                  name = "remark"
                  // rules={[
                  //   { required: true, message: 'กรุณากรอก หมายเหตุ' },
                  // ]}
                >
                  <Input  className='w-full' min={0}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ราคา (Inc. Vat.)"
                  name = "totalAmount"
                  rules={[
                    { required: true, message: 'กรุณากรอก ราคา (Inc. Vat.)' },
                  ]}
                >
                  <InputNumber  className='w-full' min={0}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ส่วนลด"
                  name = "discount"
                  rules={[
                    { required: true, message: 'กรุณากรอก ส่วนลด' },
                  ]}
                >
                  <InputNumber  className='w-full' min={0}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ราคา สุทธิ"
                  name = "totalPrice"
                  rules={[
                    { required: true, message: 'กรุณากรอก สุทธิ' },
                  ]}
                >
                  <InputNumber  className='w-full' min={0}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ยอดเงินรับจริง"
                  name = "paidAmount"
                  rules={[
                    { required: true, message: 'กรุณากรอก ยอดเงินรับจริง' },
                  ]}
                >
                  <InputNumber  className='w-full' min={0}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "เงินประกันการเช่า"
                  name = "insuranceAmount"
                  rules={[
                    { required: true, message: 'กรุณากรอก เงินประกันการเช่า' },
                  ]}
                >
                  <InputNumber  className='w-full' min={0}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "วันที่รับเงินจริง"
                  name = "paidDate"
                  rules={[
                    { required: true, message: 'กรุณากรอก ยอดเงินรับจริง' },
                  ]}
                >
                  <DatePicker  className='w-full' format={'DD/MM/YYYY'}/>
                </Form.Item>
              </Col>
              {/* <Col xs={24}  >
                <Form.List name="test">
                  {(fields, { add, remove }) => (
                    <>
                      <Row gutter={[ 8, 8 ]}>
                        <Col>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add()
                              const newIndex = fields.length ;
                              props.onClickAddRow({id: newIndex})
                              
                            }}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Row
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            type="dashed"
                            onClick={() => {
                              // Remove only if the selected row is checked
                              props.rowSelectedTable.forEach((key) => {
                                const index = fields.findIndex((field) => field.key === key);
                                remove(index);
                                props.onRemove(index);
                              });
                              props.setRowSelectedTable([]);
                            }}
                            block
                            icon={<PlusOutlined />}
                          >
                            remove
                          </Button>
                        </Col>
                        <Col span = {24}>
                          <Table
                            rowSelection={{
                              selectedRowKeys: props.rowSelectedTable,
                              onChange: props.onChangeRowSelection,
                            }}
                            columns={
                              [
                                {
                                  title: 'No',
                                  dataIndex: 'no',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'no']}
                                      rules={[{ required: true, message: 'Missing No' }]}
                                    >
                                      <Input placeholder="No" />
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'Name',
                                  dataIndex: 'nameTest',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'test']}
                                      rules={[{ required: true, message: 'Missing Name' }]}
                                    >
                                      <Select 
                                        placeholder="Name" 
                                        value={props.selectedItems[index]?.value}
                                        onChange={(value) => props.onChangeDropdown(value, index)}
                                        options={props.selectedItems[index]?.options?.map((item) => ({ label: item.name, value: item.id }))}
                                      />
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'Name',
                                  dataIndex: 'name',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'name']}
                                      rules={[{ required: true, message: 'Missing Name' }]}
                                    >
                                      <Input placeholder="Name" />
                                    </Form.Item>
                                  ),
                                },
                                {
                                  title: 'Driver ID',
                                  dataIndex: 'driverId',
                                  render: (_, __, index) => (
                                    <Form.Item
                                      name={[index, 'driverId']}
                                      rules={[{ required: true, message: 'Missing Driver ID' }]}
                                    >
                                      <Input placeholder="Driver ID" />
                                    </Form.Item>
                                  ),
                                },
                                // {
                                //   title: 'Action',
                                //   dataIndex: 'action',
                                //   render: (_, __, index) => (
                                //     <MinusCircleOutlined onClick={() => removeRow(index)} />
                                //   ),
                                // },
                              ]
                            }
                            dataSource={fields}
                            pagination={false}
                            // rowKey="key"
                            rowKey={(field) => field.key}
                          />
                        </Col>
                      </Row>
                    
                  
                    </>
                  )}
                </Form.List>
              </Col> */}
            </Row>
          </Col>
          <Col span={24}>
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
              <Col 
                hidden={
                  props.recordStatusBooking == "pending" || 
                  props.recordStatusBooking == "complete"
                }
              >
                <Button
              
                  // type="primary"
                  // onClick={props.onCloseModalForm}
                  className="button-plain"
                  onClick={props.onClickBookingFormDraft}
                >
                  บันทึกแบบร่าง
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
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}


const renderModalCRUDForm = (props: BookingContentProps): ReactElement =>{
  console.log("rops.useApiBookingGetById.data?.items?.[0]", props.useApiBookingGetById.data?.items?.[0])
  return(
        <Modal
          title={props.mode == "add" ? "เพิ่ม รายการแพ็คเกจ" : "แก้ไข รายการแพ็คเกจ"}
          open={props.isVisibleFormBooking}
          centered={true}
          footer={null}
          onCancel={props.onCloseModalForm}
          // zIndex={10}
          width={1000}
        >
          <Form
            onFinish={props.onSubmitFormBooking}
            form={props.formBooking}
            layout='vertical'
          >
            <Row gutter={[ 8, 8 ]}>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "สัญญาเช่าระยะสั้น เลขที่"
                  name = "contractNo"
                  rules={[
                    { required: true, message: 'กรุณากรอก สัญญาเช่าระยะสั้น เลขที่' },
                  ]}
                >
                  <Input className='w-full' />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "ลงวันที่"
                  name = "documentDateBooking"
                  rules={[
                    { required: true, message: 'กรุณากรอก ลงวันที่' },
                  ]}
                >
                  <DatePicker className='w-full' format={'DD/MM/YYYY'}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "เลขที่ใบขอเช่า"
                  name = "bookingRequestNo"

                  // rules={[
                  //   { required: true, message: 'กรุณากรอก คำอธิบาย' },
                  // ]}
                >
                  <Input className='w-full' disabled/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "วันที่ขอเช่า"
                  name = "requestDateBooking"
                  rules={[
                    { required: true, message: 'กรุณากรอก เนื้อหา' },
                  ]}
                >
                  <DatePicker
                    className='w-full'
                    format={'DD/MM/YYYY'}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} >
                <Form.Item
                  label = "ชื่อผู้เช่า"
                  name = "requesterName"
                  rules={[
                    { required: true, message: 'กรุณากรอก ชื่อผู้เช่า' },
                  ]}
                >
                  <Input className='w-full'/>
                  {/* <Select 
                    placeholder="ชื่อผู้เช่า"
                    showSearch
                    filterOption={false}
                    onSearch={debounceFn(props.onSearchCustomerRental, 500)}
                    // filterOption={(input, option) =>
                    //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    // }
                    options={
                      props.useApiCustomerRental.data?.items?.map((data) => ({
                        label: `${data.firstName} ${data.lastName}`,
                        value: data.id
                      }))
                    }
                  /> */}
                </Form.Item>
              </Col>
            
              <Col xs={24} md={12} >
                <Form.Item
                  label = "วัตถุประสงค์การเช่า"
                  name = "objective"
                  rules={[
                    { required: true, message: 'กรุณากรอก วัตถุประสงค์การเช่า' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label = "ที่อยู่ผู้เช่า"
                  name = "address"
                  // rules={[{ required: true, message: 'กรุณาเลือก อัพโหลด Thumbnail  ' }]}
                >
                  <Input.TextArea rows={3} className='w-full'/>
                </Form.Item>
              </Col>
              <Col span={24} >
                <Form.Item
                  label = "รถยนต์ที่ขอเช่า"
                  name = "vehicleMasterId"
                  rules={[
                    { required: true, message: 'กรุณากรอก รถยนต์ที่ขอเช่า' },
                  ]}
                >
                  <Select
                    className='w-full custom-select'
                    allowClear={false}
                    showSearch
                    // disabled={props.useApiBookingGetById.data?.items?.[0].status == "complete"}
                    // onChange={props.onChangeVehicleMaster}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      ...(props.useApiVehicleMaster.data?.items?.map((data) => {
                        return { value: data.id, label: `${data.brandName} ${data.modelName} ` }
                      }) || [])  
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label = "วันที่ส่งมอบรถยนต์ - วันที่รับคืนรถยนต์"
                  name = "dateRange"
                  rules={[{ required: true, message: 'กรุณาเลือก วันที่ส่งมอบรถยนต์ - วันที่รับคืนรถยนต์' }]}
                >
                  <DatePicker.RangePicker
                    className='w-full'
                    showTime
                    format="DD/MM/YYYY HH:mm:ss"
                    onChange={props.onChangeStartDate}

                  />
                  
                </Form.Item>
              </Col>
              {/* <Col xs={24} md={12}>
                <Form.Item
                  label = "วันที่รับคืนรถยนต์"
                  name = "endDate"
                  rules={[{ required: true, message: 'กรุณาเลือก วันที่รับคืนรถยนต์' }]}
                >
                  <DatePicker
                    className='w-full'
                    showTime
                    format="DD/MM/YYYY HH:mm:ss"
                  />
                  
                </Form.Item>
              </Col> */}
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ระยะเวลาเช่า"
                  name = "totalDays"
                  rules={[{ required: true, message: 'กรุณากรอก ระยะเวลาเช่า' }]}
                  
                >
                  <InputNumber className='w-full' min={0} disabled/>  
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row gutter={[ 8, 8 ]}> 
                  <Col>
                    <Form.Item
                      label = "อัตราค่าเช่า (บาท)"
                      name = "rentalRate"
                      rules={[{ required: true, message: 'กรุณากรอก อัตราค่าเช่า (บาท)' }]}
                    >
                      <InputNumber className='w-full' min={0}/>  
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label = " "
                      name = "rateType"
                    >
                      <Radio.Group 
                        // onChange={props.onChangeRadioPriceTier}
                      >
                        <Space direction="horizontal">
                          {/* {
                            props.useApiMasterPriceTierGet.data?.data?.items?.map((data) => (
                              <Radio value={data.id} key={data.id}>{data.name}</Radio>
                            ))
                          } */}
                           <Radio value={"daily"} key={"daily"}>วัน</Radio>
                           <Radio value={"monthly"} key={"monthly"}>เดือน</Radio>
                          {/* <Radio value={1}>วัน</Radio>
                          <Radio value={2}>เดือน</Radio> */}
                        </Space>
                      </Radio.Group >
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ค่าปรับกรณีคืนรถล่าช้า"
                  name = "lateChargeFee"
                  rules={[{ required: true, message: 'กรุณากรอก ค่าปรับกรณีคืนรถล่าช้า' }]}
                >
                  <InputNumber className='w-full' min={0}/>  
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "กรณีรถยนต์ที่เช่าเกิดอุบัติเหตุ และ ผู้ใช้รถเป็นฝ่ายผิด"
                  name = "accidentFee"
                  rules={[{ required: true, message: 'กรุณากรอก กรณีรถยนต์ที่เช่าเกิดอุบัติเหตุ และ ผู้ใช้รถเป็นฝ่ายผิด' }]}
                >
                  <InputNumber className='w-full' min={0}/>  
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "สถานที่ส่งมอบรถยนต์"
                  name = "receiveLocationCode"
                  rules={[{ required: true, message: 'กรุณาเลือก สถานที่ส่งมอบรถยนต์' }]}
                >
                  <Select
                    className='w-full custom-select'
                    allowClear={false}
                  >
                    {props.responseLocation.data?.data?.items?.map((data) => {
                      return (
                        <Select.Option key={data.code} value={data.code}>
                          {data.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "สถานที่ส่งคืนรถยนต์"
                  name = "returnLocationCode"
                  rules={[{ required: true, message: 'กรุณาเลือก สถานที่ส่งคืนรถยนต์' }]}
                >
                  <Select
                    className='w-full custom-select'
                    allowClear={false}
                  >
                    {props.responseLocation.data?.data?.items?.map((data) => {
                      return (
                        <Select.Option key={data.code} value={data.code}>
                          {data.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
             
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ค่าบริการ กรณีส่งมอบรถยนต์ นอกภูมิลำเนาของผู้ให้เช่า" 
                  name = "deliveryCharge"
                  rules={[{ required: true, message: 'กรุณากรอก ค่าบริการ กรณีส่งมอบรถยนต์ นอกภูมิลำเนาของผู้ให้เช่า' }]}
                >
                  <InputNumber className='w-full' min={0}/>  
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ค่าบริการ กรณีรับคืนรถยนต์ นอกภูมิลำเนาของผู้ให้เช่า" 
                  name = "returnCharge"
                  rules={[{ required: true, message: 'กรุณากรอก ค่าบริการ กรณีรับคืนรถยนต์ นอกภูมิลำเนาของผู้ให้เช่า' }]}
                >
                  <InputNumber className='w-full' min={0}/>  
                </Form.Item>
              </Col>
              <Col span={24} >
                <Form.Item
                  label = "สถานที่เก็บรักษาทรัพย์สิน (ตามที่อยู่ของผู้เช่า เว้นแต่จะระบุไว้เป็นอย่างอื่น)"
                  name = "usageAddress"
                  // rules={[
                  //   { required: true, message: 'กรุณาเลือก สถานที่เก็บรักษาทรัพย์สิน (ตามที่อยู่ของผู้เช่า เว้นแต่จะระบุไว้เป็นอย่างอื่น)' },
                  // ]}
                >
              
                  <Select className='w-full' options={props.useApiUsageAddress.data?.data?.map((data) => {return {label: data.address, value: data.code}})}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "สถานที่ชำระค่าเช่า"
                  name = "paymentLocation"
                  rules={[
                    { required: true, message: 'กรุณากรอก สถานที่ชำระค่าเช่า' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "กำหนดชำระค่าเช่า" 
                  name = "paymentDateBooking"
                  // rules={[{ required: true, message: 'กรุณากรอก กำหนดชำระค่าเช่า' }]}
                >
                  <DatePicker className='w-full'  format={'DD/MM/YYYY'}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ประกันภัย" 
                  name = "includeInsurance"
                  rules={[{ required: true, message: 'กรุณาเลือก ประกันภัย' }]}
                >
                  <Radio.Group >
                    <Space direction="horizontal">
                      <Radio value={true}>ทำ</Radio>
                      <Radio value={false}>ไม่ทำ</Radio>
                    </Space>
                  </Radio.Group >
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ค่าปรับกรณีชำระล่าช้า" 
                  name = "paymentLateFee"
                  rules={[{ required: true, message: 'กรุณากรอก กำหนดชำระค่าเช่า' }]}
                >
                  <InputNumber className='w-full' min={0}/>  
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "คิดค่าเช่าเต็มเดือน" 
                  name = "isMonthlyCharge"
                  rules={[{ required: true, message: 'กรุณาเลือก ประกันภัย' }]}
                >
                  <Radio.Group >
                    <Space direction="horizontal">
                      <Radio value={true}>คิด</Radio>
                      <Radio value={false}>ไม่คิด</Radio>
                    </Space>
                  </Radio.Group >
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "ACCT Mgr."
                  name = "acctMgr"
                  // rules={[{ required: true, message: 'กรุณาเลือก ACCT Mgr.' }]}
                >
                  <Select className='w-full' options={props.useApiAcctMgr.data?.data?.map((item) => ({label: item.name, value: item.code}))}/>  
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "การชำระค่าเช่า"
                  name = "paymentRental"
                  // rules={[{ required: true, message: 'กรุณาเลือก การชำระค่าเช่า' }]}
                >
                  <Select className='w-full' options={props.useApiPaymentRental.data?.data?.map((item) => ({label: item.name, value: item.code}))} />  
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label = "Package (SD)"
                  name = "packageSd"
                  // rules={[{ required: true, message: 'กรุณาเลือก Package (SD)' }]}
                >
                  <Select className='w-full' options={props.useApiPackageSd.data?.data?.map((item) => ({label: item.name, value: item.code}))}/>  
                </Form.Item>
              </Col>
              {/* <Col xs={24} md={12}>
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
              </Col> */}
              <Col span={24}>
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
              {/* {props.useApiBookingGetById.data?.items?.[0].status } */}
              <Col
                 hidden={
                  props.useApiBookingGetById.data?.items?.[0].status == "pending" || 
                  props.useApiBookingGetById.data?.items?.[0].status == "complete"
                }
              >
                <Button
              
                  // type="primary"
                  // onClick={props.onCloseModalForm}
                  className="button-plain"
                  onClick={props.onClickBookingDraft}
                >
                  บันทึกแบบร่าง
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




// BookingListContainer.getLayout = (pageIndex: ReactElement) => (
//   <>
//       { pageIndex }
//   </> 
// )

export default BookingListContainer;