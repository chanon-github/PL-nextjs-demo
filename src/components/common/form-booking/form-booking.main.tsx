/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  FormBooking - Main
 */
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

import {
  type FC,
  type ReactElement,
  useCallback,
  useEffect,
  useState
} from 'react';
import dayjs from '@/utils/dayjs-config';
import { CrudMode } from '@/utils/type/crud-types';
import { constantBranch } from '@/utils/constants/branchCode';
import useApi from '@/hooks/api/use-api';
import { bookingApi, carRentalApi, dropdownApi } from '@/services/rental-api';
import { notify } from '@/utils/functions/notification';
import thailandAddress from '@/utils/constants/thailand-address.min.json'
import type { FormBookingProps, BookingFormRequest, Address, ThailandAddress, Selected, ModelTest } from './form-booking.model';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { branchApi, contentApi, customerApi, fileApi, locationApi, paymentApi, titleApi, vehicleMasterApi } from '@/services/central-api';
import { debounceFn } from '@/utils/functions/debounce';
import { UploadFileComponent } from '../upload-file';
import { ModalConfirmCrud } from '../modal-confirm-crud';


// import {} from './form-booking.presets';

const FormBookingMain: FC<FormBookingProps.Main> = (props: FormBookingProps.Main): ReactElement => {
  /** Hook section */
  const [ formBookingForm ] = Form.useForm<BookingFormRequest>();
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [ statusBooking, setStatusBooking ] = useState<"draft" | "pending">("draft");
  const [ customerAddressId, setCustomerAddressId] = useState<number[]>();
  const [ bookingNo, setBookingNo ] = useState<string | undefined>();
  const [ bookingRequestNo, setBookingRequestNo] = useState<string | undefined>();

  const [ rowSelectedTableDriver, setRowSelectedTableDriver ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableOptions, setRowSelectedTableOptions ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableVoucher, setRowSelectedTableVoucher ] = useState<Array<number | string>>([]);
  const [ rowSelectedTable, setRowSelectedTable ] = useState<Array<number | string>>([]);

  const [ imageUrl, setImageUrl ] = useState<string | undefined | null>();
  const [ attachIdentity, setAttachIdentity ]  = useState<string | undefined >();
  const [ attachDrivingLicense, setAttachDrivingLicense ]  = useState<string | undefined>();
  const [ attachEmployeeCard, setAttachEmployeeCard ]  = useState<string | undefined >();
  const [ isVisibleFormBookingForm, setIsVisibleFormBookingForm ] = useState<boolean>(false);

  

  const [addressThailand, setAddressThailand]  = useState<ThailandAddress[] | []>(thailandAddress.slice(0, 9));
  const [addressThailandTax, setAddressThailandTax]  = useState<ThailandAddress[] | []>(thailandAddress.slice(0, 9));

  const [isCheckedTax, setIsCheckedTax] = useState<boolean>(false);
  const [customerTypeValue, setCustomerTypeValue] = useState<string | undefined>(undefined);

  const [isDisableCheckBoxSaveDb, setIsDisableCheckBoxSaveDb] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<Selected>({});

   const [dataTest, setDataTest] = useState<ModelTest[]>([{id: 1, name: 'test 1'}, {id: 2, name: 'test 2'}, {id: 3, name: 'test 3'}, {id: 4, name: 'test 4'}]);

  const useApiRentalType = useApi(dropdownApi, dropdownApi.apiDropdownGetRentalTypeGet);

  const useAPiSaveDraftBooking = useApi(bookingApi, bookingApi.apiBookingBookingSaveDraftPost);
  const formBookingFormSave = useApi(bookingApi, bookingApi.apiBookingCreateBookingPost);

  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);
  const useApiBranch = useApi(branchApi, branchApi.apiMasterBranchGetGet);

  const useApiCalculatePrice = useApi(carRentalApi, carRentalApi.apiCarRentalCalculatePricePost);

  const useApiVehicleMaster = useApi(vehicleMasterApi, vehicleMasterApi.apiMasterVehicleMasterGetGet);
  const useApiPaymentStatus = useApi(dropdownApi, dropdownApi.apiDropdownGetPaymentStatusGet);

  const useApiMasterPayment = useApi(paymentApi, paymentApi.apiMasterPaymentGetGet);
  const useApiGetRequestForm = useApi(bookingApi, bookingApi.apiBookingGetRequestFromGet);
  const useApiGetPdf = useApi(bookingApi, bookingApi.apiBookingGetPdfGet);
  const responseLocation = useApi(
    locationApi,  locationApi.apiMasterLocationGetAllGet
  );

  const useApiCustomer = useApi(customerApi, customerApi.apiCustomerSearchGet);
  const useApiCustomerType = useApi(dropdownApi, dropdownApi.apiDropdownGetCustomerTypeGet);

  const useApiCustomerSource = useApi(dropdownApi, dropdownApi.apiDropdownGetCustomerSourceGet);
  const useApiCustomerById = useApi(customerApi, customerApi.apiCustomerSearchGet);

  const useApiTitleApi = useApi(
    titleApi,  titleApi.apiMasterTitleGetGet
  );
  const useApiLicensePlate = useApi(dropdownApi, dropdownApi.apiDropdownGetLicensePlateGet);
  const useApiAllOptions = useApi(carRentalApi, carRentalApi.apiCarRentalGetAllOptionsGet);

  const useApiBookingGetById = useApi(bookingApi, bookingApi.apiBookingSearchGet);
  const useApiBookingDelete = useApi(contentApi, contentApi.apiContentDeleteDelete);

  const useApiGetByBookingDraft = useApi(bookingApi, bookingApi.apiBookingGetBookingDraftBookingRequestNoGet);


  useEffect(() => {
    useApiTitleApi.fetch({pageIndex: 1, pageSize: 1000,status: "active", ...constantBranch});
    useApiCustomerSource.fetch({});
    useApiPaymentStatus.fetch({});
    useApiCustomerType.fetch({});
    useApiRentalType.fetch({});
    useApiLicensePlate.fetch({
      pageIndex: 1,
      pageSize: 10,

    });
    useApiMasterPayment.fetch({
      pageIndex: 1,
      pageSize: 1000,
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
    useApiBranch.fetch({
      pageIndex: 1,
      pageSize: 1000
    })
    useApiAllOptions.fetch({
      ...constantBranch,
      pageIndex: 1,
      pageSize: 1000
    })
    // useApiPacakge.
    // formBookingFormSave.fetch({});
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
  }, []);

  useEffect(() => {
    setBookingRequestNo(props.bookingRequestNo);
    if(props.bookingRequestNo && props.recordStatus){
      onClickShowModalBookingForm({bookingRequestNo: props.bookingRequestNo, status: props.recordStatus})
    }
  }, [props.bookingRequestNo, props.recordStatus]);
  

  /** Functionality section */
  const onClickShowModalBookingForm = async (params: {bookingRequestNo: string; status: string}) =>{
    console.log("bookingRequestNo", params.bookingRequestNo)
    setBookingRequestNo(params.bookingRequestNo || undefined);
    
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
  const onSubmitFormShortTerm = () =>{
    console.log(55555)
    setIsModalConfirmVisible(mode === 'edit');
    setStatusBooking("pending");
    if(mode == 'add'){
      saveBookingForm({status: "pending"});
    }
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
            // packageItemApiRefetch({
            //   pageIndex: pageIndex, 
            //   pageSize: pageSize, 
            // });
            if(props.refetch){
              props.refetch.onRefetchApiTable({
                pageIndex: props.refetch.pageIndex, 
                pageSize: props.refetch.pageSize, 
              })
            }
            notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
            setImageUrl(undefined)
            onCloseModalConfirm();


            props.onCancleForm();
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
          // packageItemApiRefetch({
          //   pageIndex: pageIndex, 
          //   pageSize: pageSize, 
          // });
          if(props.refetch){
            props.refetch.onRefetchApiTable({
              pageIndex: props.refetch.pageIndex, 
              pageSize: props.refetch.pageSize, 
            })
          }
          notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
          setImageUrl(undefined)
          onCloseModalConfirm();
          props.onCancleForm();
        }
        else if (res.status == 400){
          notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
        }
      }).catch((error) => {
        notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
      })
    // console.log("formBookingFormSave ==> ", formBookingFormSave)
      
  }

  const onCloseModalForm = () =>{
    setMode("add");
    formBookingForm.resetFields();
    setIsCheckedTax(false);
    setIsVisibleFormBookingForm(false);
    // setIsAddNewCustomer(false);
    setCustomerAddressId(undefined);
  }


  const onCloseModalConfirm = () =>{
   
    setIsModalConfirmVisible(false);

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

  const onSearchCustomer = async (value: string) =>{
    const res = await useApiCustomer.fetch({
        keyword: value,
        pageIndex: 1,
        pageSize: 10,
        customerType: customerTypeValue
      });
    if(res.items){
      // setDataSourceCustomer(res.items);
    }

    // useApiCustomer.data?.items
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


  const onChangeRowSelectionDriver = (selectedRowKeys: Array<number | string>) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setRowSelectedTableDriver(selectedRowKeys);
  }
  const onSearchLicensePlate = (value: string) =>{
    useApiLicensePlate.fetch({
      licensePlate: value,
      pageIndex: 1,
      pageSize: 10
    })
  }

   const onChangeRowSelectionOptions = (selectedRowKeys: Array<number | string>) => {
    setRowSelectedTableOptions(selectedRowKeys);
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

  const onChangeRowSelectionVoucher = (selectedRowKeys: Array<number | string>) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setRowSelectedTableVoucher(selectedRowKeys);
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
        // packageItemApiRefetch({ pageIndex: pageIndex, pageSize: pageSize });
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

  return (
   
    <>
    <Form
      onFinish={onSubmitFormShortTerm}
      form={formBookingForm}
      layout='vertical'
    >
      <Row gutter={[ 8, 8 ]}>
        <Col span={24}>
          <Row gutter={[8, 8]} justify={"space-between"} align={'middle'}>
            <Col>
              <Typography.Title level={3}>ฟอร์มส่งมอบสัญญารถเช่าระยะสั้น</Typography.Title>
            </Col>
            <Col>
              <Button
                onClick={onClickToPrintPdf}
                disabled={!useApiGetRequestForm.data?.data?.bookingNo}
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
              options={useApiRentalType.data?.data?.map((item) => ({label: item.productName, value: item.id}))}
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
                // rules={[
                //   { required: true, message: 'กรุณากรอก เลขที่ใบคำขอเช่า' },
                // ]}
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
                  onChange={onChangeUpload}
                  showUploadList={false}
                  
                >
                  <Button>อัปโหลดไฟล์ รูปภาพ</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col>
              {
                imageUrl && (
                  <Col>
                    <Form.Item
                        label = " "
                    >
                      <Image  src={imageUrl} style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
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
              options={useApiBranch.data?.items?.map((item) => ({ value: item.branchCode, label: item.name }))}
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
              onChange={onChangeVehicleMasterBookingForm}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                ...(useApiVehicleMaster.data?.items?.map((data) => {
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
            <Select className='w-full' options = {useApiPaymentStatus.data?.data?.map((data) => ({ value: data.code, label: data.name }))}/>
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
              options={useApiMasterPayment.data?.items?.map((data) => ({ value: data.code, label: data.paymentChanel }))}
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
              onChange={(date, dateRange) => {onChangeDateRange(dateRange)}}
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
              onChange={(value) => {onChangeReceiveLocation(value)}}
            >
              {responseLocation.data?.data?.items?.map((data) => {
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
              onChange={(value) => {onChangeReturnLocation(value)}}
            >
              {responseLocation.data?.data?.items?.map((data) => {
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
              onChange={onChangeCustomerType}
              options={useApiCustomerType.data?.data?.map((data) => ({ value: data.code, label: data.name }))}
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
            <Select className='w-full' options={useApiCustomerSource.data?.data?.map((data) => ({ value: data.code, label: data.name }))}/>
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
          customerTypeValue  && (
            <Col xs={24} md={12} lg = {24} xl ={24} >
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
                  options={useApiCustomer.data?.items?.map((data) => ({ 
                    value: data.id, label: customerTypeValue == "CT0001" ? `${data.firstName} ${data.lastName} - ${data.identityId}` : `${data.name} - ${data.identityId}` 
                  }))}
                  onChange={onChangeCustomerId}
                  onSearch={debounceFn( onSearchCustomer, 1000)}
                  filterOption={false}
                  allowClear
                />
              </Form.Item>
            </Col>
          )
        }
        {
          customerTypeValue && customerTypeValue == "CT0001" && (
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
                  <Select className='w-full' options={useApiTitleApi.data?.items?.map((data) => ({label: data.titleDesc, value: data.titleDesc}))}/>
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
                    { required: isDisableCheckBoxSaveDb, message: 'กรุณากรอก นามสกุล' },
                  ]}
                >
                  <Input className='w-full'/>
                </Form.Item>
              </Col>
            </> 
          )
        }
        {
          customerTypeValue && customerTypeValue !== "CT0001" && (
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
        <Col xs={24} md={12} lg = {6} xl ={6} hidden ={customerTypeValue ? false : true}>
          <Form.Item
            label = {customerTypeValue == "CT0001" ? "เลขบัตรประชาชน/หนังสือเดินทาง" : "เลขประจําตัวผู้เสียภาษี"}
            name = "identityId"
            rules={[
              { required: true, message: `กรุณากรอก ${customerTypeValue == "CT0001" ? "เลขบัตรประชาชน/หนังสือเดินทาง" : "เลขประจําตัวผู้เสียภาษี"}` },
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
          customerTypeValue && customerTypeValue == "CT0001" && (
            <>
              <Col xs={24} md={12} xl ={12} >
                {<UploadFileComponent 
                  name='attachIdentity'
                  label='ไฟล์บัตรประชาชนหรือหนังสือเดินทาง'
                  onGetImageUrlUploaded={onGetImageUrlUploadedIdCard} 
                  imageUrl={attachIdentity}
                />}
              </Col>
              <Col xs={24} md={12} xl ={12} >
                {<UploadFileComponent 
                  name='attachDrivingLicense'
                  label='ไฟล์ใบขับขี่'
                  onGetImageUrlUploaded={onGetImageUrlUploadedIdDriver} 
                  // onGetImageUrlUploaded={props.onGetImageUrlUploaded} 
                  imageUrl={attachDrivingLicense}
                />}
              </Col>
              <Col xs={24} md={12} xl ={12} >
                {<UploadFileComponent 
                  name="attachEmployeeCard"
                  label='ไฟล์หลักฐานการเป็นพนักงาน เช่น บัตรพนักงาน'
                  onGetImageUrlUploaded={onGetImageUrlEmployeeCard} 
                  // onGetImageUrlUploaded={props.onGetImageUrlUploaded} 
                  imageUrl={attachEmployeeCard}
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
                onChange={onChangeAddressThailand}
                onSearch={debounceFn(onSearchPostCode, 1000)}
                options={addressThailand.map((item) => ({
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
                onChange={onChangeAddressThailand}
                onSearch={debounceFn(onSearchProvince, 1000)}
                options={addressThailand.map((item) => ({
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
                onChange={onChangeAddressThailand}
                onSearch={debounceFn(onSearchDistrict, 1000)}
                options={addressThailand.map((item) => ({
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
                onChange={onChangeAddressThailand}
                onSearch={debounceFn(onSearchSubDistrict, 1000)}
                options={addressThailand.map((item) => ({
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
              disabled={isDisableCheckBoxSaveDb}
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
                checked={isCheckedTax}
                onChange={onClickCheckBoxFax}
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
            <Input  className='w-full' disabled ={isCheckedTax}/>
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
            <Input  className='w-full' disabled ={isCheckedTax}/>
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
            <Input  className='w-full' disabled ={isCheckedTax}/>
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
            <Input  className='w-full' disabled ={isCheckedTax}/>
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
            <Input  className='w-full' disabled ={isCheckedTax}/>
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
            <Input  className='w-full'  disabled ={isCheckedTax}/>
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
                onChange={onChangeAddressThailandTax}
                onSearch={debounceFn(onSearchPostCode, 1000)}
                options={addressThailandTax.map((item) => ({
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
                onChange={onChangeAddressThailandTax}
                onSearch={debounceFn(onSearchProvince, 1000)}
                options={addressThailandTax.map((item) => ({
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
                onChange={onChangeAddressThailandTax}
                onSearch={debounceFn(onSearchDistrict, 1000)}
                options={addressThailandTax.map((item) => ({
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
                disabled ={isCheckedTax}
                showSearch
                optionLabelProp="children"
                onChange={onChangeAddressThailandTax}
                onSearch={debounceFn(onSearchSubDistrict, 1000)}
                options={addressThailandTax.map((item) => ({
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
                  disabled={isDisableCheckBoxSaveDb}
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
                            onClickAddRow({id: newIndex})
                            
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
                            rowSelectedTableDriver.forEach((key) => {
                              const index = fields.findIndex((field) => field.key === key);
                              remove(index);
                              onRemove(index);
                            });
                            setRowSelectedTableDriver([]);
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
                            selectedRowKeys: rowSelectedTableDriver,
                            onChange: onChangeRowSelectionDriver,
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
                // rules={[
                //   { required: true, message: 'กรุณากรอก ทะเบียน' },
                // ]}
              >
                <Select  
                  className='w-full'
                  showSearch
                  onSearch={debounceFn( onSearchLicensePlate, 1000)}
                  filterOption={false}
                  options={useApiLicensePlate.data?.items?.map((data) => ({ label: `${data.licensePlate}/ ${data.chassisNo}/ ${data.status}`, value: data.licensePlate }))}
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
                            onClickAddRow({id: newIndex})
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
                            rowSelectedTableOptions.forEach((key) => {
                              const index = fields.findIndex((field) => field.key === key);
                              remove(index);
                              onRemove(index);
                              summmary();
                              calCulatePrice();
                            });
                            setRowSelectedTableOptions([]);
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
                            selectedRowKeys: rowSelectedTableOptions,
                            onChange: onChangeRowSelectionOptions,
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
                                          onChangeOptions({index: index, price: obj?.price})
                                        }
                                      }
                                      options={[
                                        ...(useApiAllOptions.data?.data?.items?.map((data) => {
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
                                    <InputNumber min={1} onChange={onChangeAmountOptions}/>
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
                            onClickAddRow({id: newIndex})
                            
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
                            rowSelectedTableVoucher.forEach((key) => {
                              const index = fields.findIndex((field) => field.key === key);
                              remove(index);
                              onRemove(index);
                            });
                            setRowSelectedTableVoucher([]);
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
                            selectedRowKeys: rowSelectedTableVoucher,
                            onChange: onChangeRowSelectionVoucher,
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
                                    <Input placeholder="Voucher No." onChange={ debounceFn( onChangeVoucherNo, 1000)}/>
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
                onClick={props.onCancleForm}
                className="button-plain"
              >
                ยกเลิก
              </Button>
            </Col>
            <Col 
              hidden={
                props.recordStatus == "pending" || 
                props.recordStatus == "complete"
              }
            >
              <Button
            
                // type="primary"
                // onClick={props.onCloseModalForm}
                className="button-plain"
                onClick={onClickBookingFormDraft}
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
    {<ModalConfirmCrud 
        isModalConfirmVisible={isModalConfirmVisible}
        onCloseModalConfirm={onCloseModalConfirm}
        onClickConfirmEdit={() => {saveBookingForm({status: statusBooking})}}
        onClickConfirmDelete={onClickConfirmDelete}
        mode={mode}
        rowSelectedTable={rowSelectedTable}
      />}
    </>
    
  );
}

export default FormBookingMain;