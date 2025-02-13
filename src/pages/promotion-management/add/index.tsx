/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PromotionManagement - Container
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
    DatePicker,
    Select,
    InputNumber,
    Table,
    Upload,
    UploadFile,
    Image,
    Modal,
    Tag
} from 'antd';
import type { NextPageWithLayout } from '@/pages/_app';
import { productApi, vehicleMasterApi, vehicleModelApi, carBrandApi, fileApi, } from '@/services/central-api';
import { promotionApi, packageApi, packageItemApi } from '@/services/rental-api';
import { constantBranch } from '@/utils/constants/branchCode';
import useApi from '@/hooks/api/use-api';
import {useBeforeUnload} from '@/hooks/alert-close-window/use-alert-close-window';
import { convertToFormattedNumeric } from '@/utils/functions/convert-numeric';
import { CrudMode } from '@/utils/type/crud-types';
import { v4 as uuidv4 } from 'uuid';
import {  RcFile, UploadChangeParam } from 'antd/es/upload';
import { notify } from '@/utils/functions/notification';
import { FileUploadOutput } from '@/services/central-api/generated';
import dayjs from '@/utils/dayjs-config';


import type { PromotionManagementCrudContentProps, PromotionManagementCrudContainerProps, TableCar, TableGift, FormSelect, ErrorsGift, ImagePromotion, ErrorsCar, TableCarCondition, ErrorsDisCount } from './index.model';
import { EditOutlined, InboxOutlined, InfoOutlined } from '@ant-design/icons';
import { ModalConfirmCrud } from '@/components/common';
import { set } from 'lodash';
import { PackageItemSearchOutputPackageItemSearchOutputPagination } from '@/services/rental-api/generated';



const PromotionManagementCrudContainer = ( props: PromotionManagementCrudContainerProps ): ReactElement => {
  /** Hook section */

  const Router = useRouter();
  
  const [ page, setPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);
  const [ imagePromotion, setImagePromotion ] = useState<ImagePromotion>();
  // const [ imagePromotionCash, setImagePromotionCash ] = useState<RcFile>();
  const [id, setId] = useState<number | undefined>();
  
  const [noRecordCar, setNoRecordCar] = useState(0);
  const [ errorsGiftGroup, setErrorsGiftGroup] = useState<Record<number, string>>({});
  const [ errorsGiftList, setErrorsGiftList] = useState<Record<number, string>>({});
  const [ errorsGiftValue, setErrorsGiftValue] = useState<Record<number, string>>({});
  const [ mode, setMode ] = useState<CrudMode>('add');
  const [ antdForm ] = Form.useForm<FormSelect>();
  const [ errorsGift, setErrorsGift] = useState<ErrorsGift>({});
  const [ errorsCar, setErrorsCar] = useState<ErrorsCar>({});

  const [ errorsGiftCondition, setErrorsGiftCondition] = useState<ErrorsGift>({});
  const [ errorsDiscountCondition, setErrorsDiscountCondition] = useState<ErrorsDisCount>({});
  const [ errorsPackageCondition, setErrorsPackageCondition] = useState<ErrorsGift>({});

  const [isShowAlertChangePage, setIsShowAlertChangePage] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [isShowModalDeleteCar, setIsShowModalDeleteCar] = useState(false);
  const [isShowModalDeleteGift, setIsShowModalDeleteGift] = useState(false);
  const [isShowModalConditionCar, setIsShowModalConditionCar] = useState(false);
  const [isShowModalDeletePackage, setIsShowModalDeletePackage] = useState(false);
  const [isShowModalDeleteDiscountCar, setIsShowModalDeleteDiscountCar] = useState(false);
  const [isShowModalDeletGiftCondition, setIsShowModalDeletGiftCondition] = useState(false);
  const [resPackageItem, setResPackageItem] = useState<PackageItemSearchOutputPackageItemSearchOutputPagination | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<Record<number, boolean>>({});
  const [dataSourceCarCondition, setDataSourceCarCondition] = useState<TableCarCondition | undefined>({
    packageDiscounts: [{no: 1, isFromDataBase: false, isActive: true}],
    mainPackage: [{no: 1, isFromDataBase: false, isActive: true}],
    miscPackage: [{no: 1, isFromDataBase: false, isActive: true}],


  });
  const [ datasourceCar, setDatasourceCar ] = useState<TableCar[]>([
    {no: 1, isFromDataBase: false, isActive: true },
  ]);
  const [ datasourceGift, setDatasourceGift ] = useState<TableGift[]>([
    // {no: 1, isFromDataBase: false, choices: [{no: 1, isFromDataBase: false, isActive: true }], isActive: true },
    {no: 1, isFromDataBase: false, isActive: true },
    // {
    //   no:1,
    //   id: 1,
    //   nameTh: "คาร์ซีท",
    //   choices:[],
    //   giftValue: 400,
    //   isFromDataBase: true,
    //   isDelete: false
    // },
    // {
    //   no:2,
    //   id: 2,
    //   nameTh: "อื่นๆ",
    //   choices:[],
    //   giftValue: 250,
    //   isFromDataBase: true,
    //   isDelete: false
    // },
    // {
    //   no:3,
    //   id: 3,
    //   nameTh: "อื่นๆ",
    //   choices:[],
    //   giftValue: 1000,
    //   isFromDataBase: true,
    //   isDelete: false
    // },
  ]);
  const [ rowSelectedTableGift, setRowSelectedTableGift ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableCar, setRowSelectedTableCar ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableDisCount, setRowSelectedTableDisCount ] = useState<Array<number | string>>([]);
  const [ rowSelectedTablePackage, setRowSelectedTablePackage ] = useState<Array<number | string>>([]);
  const [ rowSelectedTableGiftCondition, setRowSelectedTableGiftCondition ] = useState<Array<number | string>>([]);
  //** Hook for call api Example
  // useBeforeUnload({enabled: true});
  const useApiProduct = useApi(productApi,  productApi.apiProductGetGet);
  const useApiCarBrand = useApi(carBrandApi,  carBrandApi.apiMasterCarBrandGetGet)
  const useApiVehicleMaster = useApi( vehicleMasterApi,  vehicleMasterApi.apiMasterVehicleMasterGetGet)
  const useApiVehicleModel = useApi( vehicleModelApi,  vehicleModelApi.apiMasterVehicleModelGetGet)
  const useApiPromotionSave = useApi(promotionApi, promotionApi.apiPromotionSavePost);
  const useApiPromotionGet = useApi(promotionApi, promotionApi.apiPromotionSearchGet);
  const useApiPromotionGetById = useApi(promotionApi, promotionApi.apiPromotionGetIdGet);
  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);
  const useApiPackageMainApi = useApi(packageApi, packageApi.apiPackageSearchGet);
  const useApiPackageSubMainApi = useApi(packageApi, packageApi.apiPackageSearchGet);
  const useApiPackageItemApi = useApi(packageItemApi, packageItemApi.apiPackageItemSearchGet);

  useEffect(() => {
    if(Router.isReady){
      callApi();
      checkPathUrl();
    }
  }, [Router.isReady, Router.route]);

  useEffect(() => {
    
  }, [ Router.isReady, Router.route ]);

    const checkPathUrl = async () => {
      if(Router.isReady) {
        useApiProduct.fetch({
          branchCode: constantBranch.branchCode,
          tenantCode: constantBranch.tenantCode,
          pageIndex: 0,
          pageSize: 100,
          status: 'active'
        });
        useApiPackageMainApi.fetch({...constantBranch, type: "main", pageIndex: 1, pageSize: 400, isActive: true});
        useApiPackageSubMainApi.fetch({...constantBranch, type: "misc", pageIndex: 1, pageSize: 400, isActive: true});
       
        // useApiCarBrand.fetch({
        //   branchCode: constantBranch.branchCode,
        //   tenantCode: constantBranch.tenantCode,
        //   pageIndex: 0,
        //   pageSize: 100,
        //   isActive: true
        // })
        const responseVehicle = await useApiVehicleMaster.fetch({
          branchCode: constantBranch.branchCode,
          tenantCode: constantBranch.tenantCode,
          pageIndex: 0,
          pageSize: 1000,
           status: 'active'
        });
        const resPackageItem = await useApiPackageItemApi.fetch({...constantBranch, pageIndex: 1, pageSize: 400, isActive: true});
        setResPackageItem(resPackageItem);
        // responseVehicle.items
        switch(Router.route){
          case '/promotion-management/add': {
            const newUuid = uuidv4();
            // antdForm.setFieldsValue({
            //   method: "normal",
            //   payment: ["prompt-pay", "credit-card"]
            // });
            setDatasourceCar((prev) => {
              return prev.map((item) => {
                return {
                  ...item,
                  dataSourceVehicleMaster: responseVehicle.items
                }
              })
            })
            setMode('add'); 
            
            break
          };
          case '/promotion-management/edit/[id]': {
            setMode('edit'); 
           
            const id = setIdFromPath();
          
            useApiPromotionGetById.fetch({
              id: id
            }).then((res) => {
              if(res){
             
               
                console.log("datasiSourceSubDropDown", resPackageItem)
                antdForm.setFieldsValue({
                  code: res.code || "",
                  discountPercentPerDay: res.discountPercentPerDay || 0,
                  discountPerDay: res.discountPerDay || 0,
                  startDate: dayjs(res.startDate) || undefined,
                  endDate:  dayjs(res.endDate || "") || undefined,
                  startDateToUse:dayjs(res.startDateToUse || "") || undefined,
                  endDateToUse:  dayjs(res.endDateToUse || "") || undefined,
                  isActive: res?.isActive || false,
                  minimumDay: res.minimumDay || 0,
                  productId: res.productId || undefined,
                  payment: res.payment?.split(",") || [],
                  method: res.method || "",
                  productNumber: res.productNumber || 0,
                  name: res.name || "", 
                  img: res.imageUrl || "",
                });
                setImagePromotion({imagUrl: res.imageUrl || ""});

                if (res.promotionItems && res.promotionItems.length > 0) {
                  setDatasourceGift(res.promotionItems.map((data, index) => {
                    // const dataSourcePacakgeItem =  useApiPackageItemApi.data?.items?.filter((item) => 
                    //   data.packageCodes.includes(item.packageCode)
                    // );
                    const dataSourcePackageItems = resPackageItem.items?.filter((item) => item.packageCode === data.packageCode);
                    console.log("dataSourcePackageItems", dataSourcePackageItems)
                    return {
                      no: index + 1,
                      isFromDataBase: true,
                      id: data.id || undefined,
                      isActive: data.isActive || false,
                      promotionId: data.promotionId || undefined,
                      packageCode: data.packageCode || undefined,
                      packageItemCode: data.packageItemCode || undefined,
                      price: data.price || undefined,
                      imageUrl: data.imageUrl || undefined,
                      dataSourcePacakgeItem: {
                        items: dataSourcePackageItems,
                      },
                      // choices: data.promotionItemChoices?.map((choice, index) => ({
                  
                      //   no: index + 1 ,
                      //   isFromDataBase: true,
                      //   id: choice.id || undefined,
                      //   isActive: choice.isActive || false,
                      //   promotionItemId: choice.promotionItemId || 0,
                      //   nameTh: choice.nameTh || "",
                      //   imageUrl: choice.imageUrl || "",
                      //   price: choice.price || 0,
    
                      // })) || undefined
                    }
                  }));
                }
                
                if(res.vehicleMasters && res.vehicleMasters?.length > 0){
                  const vehicleMastersids = res.vehicleMasters.map((item) => item.vehicleMasterId);
                  setDatasourceCar(res.vehicleMasters?.map((data, index)=> {
                    const mainPackage = data.mainPackage?.map((item, index) => {
                      const dataSourcePackageItems = resPackageItem.items?.filter((value) => item.packageCode === value.packageCode);
                      console.log("mainPackage", dataSourcePackageItems)
                      return{
                        no: index + 1,
                        isFromDataBase: true,
                        id: item.id || undefined,
                        isActive: item.isActive || false,
                        promotionId: item.promotionId || undefined,
                        packageItemCode: item.packageItemCode || undefined,
                        vehicleMasterId: item.vehicleMasterId || undefined,
                        packageCode: item.packageCode || undefined,
                        imageUrl: item.imageUrl || undefined,
                        price: item.price || undefined,
                        minDay: item.minDay || undefined,
                        dataSourcePacakgeItem: {
                          items: dataSourcePackageItems,
                        }
                      }
                    });
                    const miscPackage = data.miscPackage?.map((item, index) => {
                      const dataSourcePackageItems = resPackageItem.items?.filter((value) => item.packageCode === value.packageCode);
                      return{
                        no: index + 1,
                        isFromDataBase: true,
                        id: item.id || undefined,
                        isActive: item.isActive || false,
                        promotionId: item.promotionId || undefined,
                        packageItemCode: item.packageItemCode || undefined,
                        vehicleMasterId: item.vehicleMasterId || undefined,
                        packageCode: item.packageCode || undefined,
                        imageUrl: item.imageUrl || undefined,
                        price: item.price || undefined,
                        minDay: item.minDay || undefined,
                        dataSourcePacakgeItem: {
                          items: dataSourcePackageItems,
                        }
                      }
                    })
                
                    const packageDiscounts = data.promotionDiscounts?.map((item, index) => ({
                      id: item.id || undefined,
                      no: index + 1,
                      isFromDataBase: true,
                      vehicleMasterId: data.vehicleMasterId || undefined,
                      promotionId: item.promotionId || undefined,
                      price: item.price || undefined,
                      totalPrice: item.totalPrice || undefined,
                      discountPercent: item.discountPercent || undefined,
                      discountPrice: item.discountPrice || undefined,
                      minDay: item.minDay || undefined,
                      isActive: data.isActive || false,
                      
  
                    }))
                    const otherVehicleId = vehicleMastersids.filter((item) => item !== data.vehicleMasterId);
                    return {
                      id: data.id || undefined,
                      isFromDataBase: true,
                      isActive: data.isActive || false,
                      no: index + 1,
                      vehicleMasterId: data.vehicleMasterId || undefined,
                      promotionId: data.promotionId || undefined,
                      brandName: data.brandName || undefined,
                      modelName: data.modelName || undefined,
                      price: data.price || undefined,
                      netPrice: data.netPrice || undefined,
                      priceDiscount: data.priceDiscount || undefined,
                      percentDiscount: data.percentDiscount || undefined,
                      mainPackage: mainPackage,
                      miscPackage: miscPackage,
                      packageDiscounts: packageDiscounts,
                      dataSourceVehicleMaster: responseVehicle.items?.filter((item) => !otherVehicleId.includes(item.id)),
                      dataSourceCarCondition: {
                        brandName: data.brandName || "",
                        modelName: data.modelName || "",
                        mainPackage: mainPackage,
                        miscPackage: miscPackage,
                        packageDiscounts: packageDiscounts,
                        promotionId: data.promotionId || undefined,
                        vehicleMasterId: data.vehicleMasterId || undefined
                      }
                      // netPrice: data.n || 0,
                    }
                  }));
  
                } 
               
                
              }
             
            }).catch((err) => {
              notify({title: 'เกิดข้อผิดพลาด', type: 'error'});
            })
            // console.log("idPromotion ==>",id);
  
            break
          };
          case '/promotion-management/view/[id]': {
            setMode('view'); 
            setIdFromPath();
            break;
          }
          default: setMode('add');
        }
      }
    }
  /** Functionality section */

    const callApi = async () => {
      
    }
    const onChangePage = ( page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);
    };

    const onChangePageSize = (param: {pageSize: number}) => {
        setPageSize(pageSize);
    };

    const onClickToAdd = () => {
      Router.push('/promotion-management/add');
    }

    const onClickToEdit = (param: {id: number}) => {
      Router.push(`/promotion-management/edit/${param.id}`);
    }

    const onClickRemove = (param: {id: number}) => {
        
    }

    const onClikToView = (param: {id: number}) => {
       Router.push(`/promotion-management/view/${param.id}`);
    }

    const onSubmitForm = () =>{
      const isValid = validateInputs();
      antdForm.validateFields().then(()=>{
        if (isValid.isValidCar && isValid.isValidGift) {
          if(mode == 'add'){
            onClickAddAllData();
          }
          if(mode == 'edit'){
    
            setIsModalConfirmVisible(true);
          }
        }
      })
            // console.log("antdForm ==>", antdForm.validateFields())
      // const isValid = validateInputs();
      // const isValid = validateInputs();
      // if (isValid.isValidCar && isValid.isValidGift) {
      //   if(mode == 'add'){
      //     onClickAddAllData();
      //   }
      //   if(mode == 'edit'){
  
      //     setIsModalConfirmVisible(true);
      //   }
      // }
      
      // console.log(value);
    }
    const onClickAddGiftList = () => {
      // validateInputs();
      setDatasourceGift((prev) => {
        return [
          ...prev,
          {
            no: prev[prev.length - 1]?.no ? prev[prev.length - 1].no + 1 : 1,

            // id: prev[prev.length - 1].id  ? prev[prev.length - 1].id : undefined,
            choices: [{
              // isDelete: false, 
              isFromDataBase: false, 
              isActive: true,
              no: 1,
            }],
            isFromDataBase: false,
            // isDelete: false,
            isActive: true
          }
        ]
      });
    }

  const onChangeRowSelectionGift = (selectedRowKeys: Array<number | string>)=> {
    setRowSelectedTableGift(selectedRowKeys);
  }

  const onChangeRowSelectionCar = (selectedRowKeys: Array<number | string>)=> {
    setRowSelectedTableCar(selectedRowKeys);
  }

    const onClickAddChoiceGift = (params :{ recordNo: number}) => {
      // setDatasourceGift((prevGift) => {
      //   return prevGift.map((gift) => {
      //     if (gift.no === params.recordNo) {
      //       return {
      //         ...gift,
      //         choices: [
      //           ...(gift.choices || []),
      //           { no: (gift.choices?.length || 0) + 1, isFromDataBase: false, isActive: true },
      //         ],
      //       };
      //     }
      //     return gift;
      //   });
      // });
    };

    const onDeleteChoice = (params :{recordNo: number,no: number;}) =>{
      // setDatasourceGift((prevGift) => {
      //   return prevGift.map((gift) => {
      //     if (gift.no === params.recordNo) {
      //       return {
      //         ...gift,
      //         choices: gift.choices?.filter((choice) => choice.no !== params.no),
      //       };
      //     }
      //     return gift;
      //   });
      // });
    }

    const onChangeStatusGift = (params :{ no: number; value: boolean}) => {
      setDatasourceGift(prevData =>
        prevData.map(item =>
          item.no === params.no ? { ...item, isActive: params.value } : item
        )
      );
    }
    const onClickDeleteGiftList = () => {
      // const isValid = validateInputs();
      // if(isValid){
      //   console.log("yes")
      // }
      // else{
      //   console.log("no")
      // }
      console.log("rowSelectedTableGift ==>",rowSelectedTableGift);
      setDatasourceGift(prevData =>
        prevData.filter(item => !rowSelectedTableGift.includes(item.no))
      );
      setRowSelectedTableCar([]);
      setIsShowModalDeleteGift(false);
      // setDatasourceGift(prevData =>
      //   prevData.map(item =>
      //     rowSelectedTableGift.includes(item.no) ? { ...item, isDelete: true } : item
      //   )
      // );
      // setRowSelectedTableGift([]);
    }

    const onChangeGiftGroup = (params :{ no: number; value: string;}) => {
      setDatasourceGift(prevData =>
        prevData.map(item =>
          item.no === params.no ? { ...item, packageCode: params.value, packageItemCode: undefined, price: undefined } : item
        )
      );
      // const clonePackageItem = resPackageItem
      useApiPackageItemApi.fetch({...constantBranch, packageCode: params.value, pageIndex: 1, pageSize: 400, isActive: true}).then((res) => {
        if(res.items){
          setDatasourceGift(prevData =>
            prevData.map(item =>
              item.no === params.no ? { ...item, dataSourcePacakgeItem: res} : item
            )
          );
        }
      });
      // setErrorsGift((prevErrors) => {
      //   const newErrors = { ...prevErrors };
      //   if (params.value.trim() !== '') {
      //     delete newErrors[params.no].nameTh;
      //   }
      //   else{
      //     newErrors[params.no] = { ...newErrors[params.no], nameTh: 'Name is required' };
      //   }
      //   return newErrors;
      // });
    }
    
    const onChangeGiftChoiceStatus = (params :{ recordNo: number,no: number; value: boolean}) => {
      // setDatasourceGift((prevGift) => {
      //   return prevGift.map((gift) => {
      //     if (gift.no === params.recordNo) {
      //       return {
      //         ...gift,
      //         choices: gift.choices?.map((choice) => {
      //           if (choice.no === params.no) {
      //             return { ...choice, isActive: params.value };
      //           }
      //           return choice;
      //         }),
      //       };
      //     }
      //     return gift;
      //   });
      // });

    }

    const onChangeGiftList = (params :{ no: number; value: string; price: number}) => {
      setDatasourceGift(prevData =>
        prevData.map(item =>
          item.no === params.no ? { ...item, packageItemCode: params.value, price: params.price } : item
        )
      );
      // setDatasourceGift((prevGift) => {
      //   return prevGift.map((gift) => {
      //     if (gift.no === params.recordNo) {
      //       return {
      //         ...gift,
      //         choices: gift.choices?.map((choice) => {
      //           if (choice.no === params.no) {
      //             return { ...choice, nameTh: params.value };
      //           }
      //           return choice;
      //         }),
      //       };
      //     }
      //     return gift;
      //   });
      // });
      // setErrorsGift((prevErrors) => {
      //   const newErrors = { ...prevErrors };
    
      //   if (params.value.trim() !== '') {
      //     if (newErrors[params.recordNo] && newErrors[params.recordNo][params.no]) {
      //       delete newErrors[params.recordNo][params.no].nameTh;
      //     }
      //   } else {
      //     if (!newErrors[params.recordNo]) {
      //       newErrors[params.recordNo] = {};
      //     }
      //     newErrors[params.recordNo][params.no] = {
      //       ...newErrors[params.recordNo][params.no],
      //       nameTh: 'Choice name is required',
      //     };
      //   }
    
      //   return newErrors;
      // });
    }

    const onChangeGiftValue = (params :{ no: number; value: number}) => {
      setDatasourceGift(prevData =>
        prevData.map(item =>
          item.no === params.no ? { ...item, price: params.value } : item
        )
      );
      // setDatasourceGift((prevGift) => {
      //   return prevGift.map((gift) => {
      //     if (gift.no === params.recordNo) {
      //       return {
      //         ...gift,
      //         choices: gift.choices?.map((choice) => {
      //           if (choice.no === params.no) {
      //             return { ...choice, price: params.value || 0 };
      //           }
      //           return choice;
      //         }),
      //       };
      //     }
      //     return gift;
      //   });
      // });
      // setErrorsGift((prevErrors) => {
      //   const newErrors = { ...prevErrors };
    
      //   if (params.value) {
      //     if (newErrors[params.recordNo] && newErrors[params.recordNo][params.no]) {
      //       delete newErrors[params.recordNo][params.no].price;
      //     }
      //   } else {
      //     if (!newErrors[params.recordNo]) {
      //       newErrors[params.recordNo] = {};
      //     }
      //     newErrors[params.recordNo][params.no] = {
      //       ...newErrors[params.recordNo][params.no],
      //       price: 'Choice name is required',
      //     };
      //   }
    
      //   return newErrors;
      // });
      // setErrorsGiftValue(prev => ({ ...prev, [params.no]: '' }));
    }
 

    const calculateNetPrice = (price: number, percentDiscount: number, priceDiscount: number) => {
      const percentDiscountVlaue = price * (percentDiscount / 100);
      const totalDiscount = Math.max(percentDiscountVlaue, priceDiscount);
      return Math.max(price - totalDiscount, 1);
    };
    const onChangeDiscountPercent = (params: { no: number; value: number }) => {
      setDatasourceCar(prevData =>
        prevData.map(item => {
          if (item.no === params.no) {
            const newDiscountPercent = params.value;
            const newDiscountBaht = parseFloat(((item.price || 1) * (newDiscountPercent / 100)).toFixed(2));
            const newNetPrice = parseFloat(calculateNetPrice(item.price || 1, newDiscountPercent, newDiscountBaht).toFixed(2));
            return {
              ...item,
              percentDiscount: parseFloat(newDiscountPercent.toFixed(2)),
              priceDiscount: newDiscountBaht,
              netPrice: newNetPrice
            };
          }
          return item;
        })
      );
    };

    const onChangeDiscountPercentCondition = (params :{ no: number; value: number}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        packageDiscounts: prev?.packageDiscounts?.map(item => {
          if (item.no === params.no) {
            const newDiscountPercent = params.value;
            const newDiscountBaht = parseFloat(((item.price || 1) * (newDiscountPercent / 100)).toFixed(2));
            // const newNetPrice = parseFloat(calculateNetPrice(item.price || 1, newDiscountPercent, newDiscountBaht).toFixed(2));
            const newNetPrice =  parseFloat(calculateNetPrice(item.price || 1, newDiscountPercent, newDiscountBaht).toFixed(2));
            return {
              ...item,
              discountPrice: newDiscountBaht,
              discountPercent: newDiscountPercent,
              totalPrice: newNetPrice
            };
          }
          return item;
        }
        
        )
      }));
    }
    
    const onChangeDiscountBaht = (params: { no: number; value: number }) => {
      setDatasourceCar(prevData =>
        prevData.map(item => {
          if (item.no === params.no) {
            const newDiscountBaht = parseFloat(params.value.toFixed(2));
            const newDiscountPercent = parseFloat(((newDiscountBaht / (item.price || 1)) * 100).toFixed(2));
            const newNetPrice = parseFloat(calculateNetPrice(item.price || 1, newDiscountPercent, newDiscountBaht).toFixed(2));
            return {
              ...item,
              priceDiscount: newDiscountBaht,
              percentDiscount: newDiscountPercent,
              netPrice: newNetPrice
            };
          }
          return item;
        })
      );
    };

    const onChangeCoverPrice = (params: { no: number; value: number }) => {
      setDatasourceCar(prevData =>
        prevData.map(item => {
          if (item.no === params.no) {
            const newCoverPrice = params.value;
            const newDiscountBaht = parseFloat((newCoverPrice * ((item.percentDiscount || 0) / 100)).toFixed(2));
            const newNetPrice = parseFloat(calculateNetPrice(newCoverPrice, (item.percentDiscount || 0), newDiscountBaht).toFixed(2));
            return {
              ...item,
              price: parseFloat(newCoverPrice.toFixed(2)),
              priceDiscount: newDiscountBaht,
              percentDiscount: (item.percentDiscount || 0),
              netPrice: newNetPrice
            };
          }
          return item;
        })
      );
    };


    const onClickAddAllData = async () => {
      const isValid = validateInputs();
      const formValue = antdForm.getFieldsValue();
      console.log("formValue ==>", formValue);
      // console.log("datasourceGift ==>", datasourceGift);
      // console.log("resUploadImagePromotion==>",datasourceCar);
      // if (isValid.isValidCar && isValid.isValidGift) {
        try {
          console.log("resUploadImagePromotion==>",datasourceCar);

        const resSavePromotion = await useApiPromotionSave.fetch({
          promotionInput:{
            ...formValue,
            id: id,
            imageUrl: imagePromotion?.imagUrl,
            promotionVehicles: datasourceCar,
            promotionItems: datasourceGift,
            payment: formValue.payment.join(","),
            startDate: dayjs(formValue.startDate).toISOString(),
            startDateToUse: dayjs(formValue.startDateToUse).toISOString(),
            endDate: dayjs(formValue.endDate).toISOString(),
            endDateToUse: dayjs(formValue.endDateToUse).toISOString(),
            
            ...constantBranch
          }
        }).then((res) => {
          if(res.data){
            notify({title: 'ทำการ บันทึก สำเร็จ', type: 'success'});
            Router.push('/promotion-management');
          }
          else{
            notify({title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error'});
          }
        })
        setIsModalConfirmVisible(false);
      } 
      catch (error) {
        console.error("ทำการ บันทึก ไม่สำเร็จ", error);
        notify({ title: 'ทำการ บันทึก ไม่สำเร็จ', type: 'error' });
      }
      // }
    }
    const onClickAddCarTable = () => {
      setDatasourceCar((prev) => {
        // Get all vehicleMasterIds from the previous state
        const existingVehicleMasterIds = prev.map(item => item.vehicleMasterId)
      
        return [
          ...prev,
          {
            no: prev[prev.length - 1]?.no ? prev[prev.length - 1].no + 1 : 1,
            dataSourceVehicleMaster: useApiVehicleMaster.data?.items?.filter(item => 
              !existingVehicleMasterIds.includes(item.id)
            ),
            isFromDataBase: false,
            isDelete: false,
            isActive: true,
            promotionId: id,
          }
        ]
      })
    }


    const onClickDeleteCarTalbe = () => {
       const cloneVehicleMaster = useApiVehicleMaster.data?.items ?? [];
        const vehicleMasterIds = datasourceCar
          .filter(item => rowSelectedTableCar.includes(item.no))
          .map(item => item.vehicleMasterId);
        const getVehicalMasterDeleted = cloneVehicleMaster.filter(item => vehicleMasterIds.includes(item?.id));

        setDatasourceCar(prevData => {
          const remainingItems = prevData.filter(item => !rowSelectedTableCar.includes(item.no));
          
          return remainingItems.map(item => ({
            ...item,
            dataSourceVehicleMaster: [
              ...(item.dataSourceVehicleMaster ?? []),
              ...getVehicalMasterDeleted
            ]
          }));
        });

        setRowSelectedTableCar([]);
        setIsShowModalDeleteCar(false);
    }
    
  const onChangeCarBrand = async (params :{ no: number; vehicleMasterId: number; brandName?: string; modelName?: string;}) =>{
    try{
      // const res = await useApiVehicleModel.fetch({
      //   branchCode: constantBranch.branchCode,
      //   tenantCode: constantBranch.tenantCode,
      //   brandCode: params.brandCode,
      //   pageIndex: 1,
      //   pageSize: 100,
      //   isActive: true
      // })
     // Update selectedOptions directly
    setSelectedOptions((prev) => {
      const newSelected = { ...prev };
      if (params.vehicleMasterId) {
        newSelected[params.vehicleMasterId] = true;
      }
      // Remove the previously selected option if it exists
      const oldSelectedId = datasourceCar.find(car => car.no === params.no)?.vehicleMasterId;
      if (oldSelectedId && oldSelectedId !== params.vehicleMasterId) {
        delete newSelected[oldSelectedId];
      }
      return newSelected;
    });

    // Update the data source
    setDatasourceCar((prevData) => {
      const cloneVehicleMaster = useApiVehicleMaster?.data?.items ?? [];
      const vehicleMasterWasChange = cloneVehicleMaster.filter(
        (item) => item.id === prevData[params.no - 1]?.vehicleMasterId
      );
      
      return prevData.map((item) =>
        item.no === params.no
          ? {
              ...item,
              vehicleMasterId: params.vehicleMasterId,
              brandName: params.brandName,
              modelName: params.modelName,
            }
          : {
              ...item,
              dataSourceVehicleMaster: [
                  ...(item.dataSourceVehicleMaster?.filter(
                    (vehicleMaster) => vehicleMaster.id !== params.vehicleMasterId
                  ) || []),
                  ...vehicleMasterWasChange,
                ],
              }
        );
      });
    }
    catch(e){
      console.log("ErrorApiVehicleModel ==>",e);
    }
  }

  const onChangeStatusCar = (params :{ no: number; value: boolean}) =>{
    setDatasourceCar(prevData =>
      prevData.map(item =>
        item.no === params.no ? { ...item, isActive: params.value} : item
      )
    );
  }
  
  const validateInputsModalCondition = (): { isValidPackage: boolean; isValidPackageItem: boolean; isValidDiscount: boolean;  } => {
    let newErrorsPackage: ErrorsGift = {};
    let newErrorsPackageItem: ErrorsGift = {};
    let newErrorsDiscount: ErrorsDisCount = {};

    let isValidPackage = true;
    let isValidDiscount = true;
    let isValidPackageItem = true;

    if(dataSourceCarCondition?.packageDiscounts && dataSourceCarCondition?.packageDiscounts?.length > 0){
      // console.log("datasourceGift ==>",datasourceGift);
      dataSourceCarCondition?.packageDiscounts.forEach((item) => {
        if (!item.minDay ) {
          newErrorsDiscount[item.no || 0] = { ...newErrorsDiscount[item.no || 0], minDay: 'กรุณากรอก เช่าขั้นต่ำ (วัน)' };
          isValidDiscount = false;
        }
        if (!item.discountPrice ) {
          newErrorsDiscount[item.no || 0] = { ...newErrorsDiscount[item.no || 0], price: 'กรุณากรอก ส่วนลด (บาท/วัน)' };
          isValidDiscount = false;
        }
        if (!item.discountPercent) {
          newErrorsDiscount[item.no || 0] = { ...newErrorsDiscount[item.no || 0], discountPercent: 'กรุณากรอก ส่วนลด (%/วัน)' };
          isValidDiscount = false;
        }
        if (!item.price) {
          newErrorsDiscount[item.no || 0] = { ...newErrorsDiscount[item.no || 0], priceDiscount: 'กรุณากรอ กราคา (บาท / วัน)' };
          isValidDiscount = false;
        }
        
        // if(!item.imageUrl || item.imageUrl.trim() === '') {
        //   newErrorsPackage[item.no || 0] = { ...newErrorsPackage[item.no || 0], imageUrl: 'กรุณา อัพโหลดรูปภาพ' };
        //   isValidPackage = false;
        // }
      })
    }
   
    if(dataSourceCarCondition?.miscPackage && dataSourceCarCondition?.miscPackage?.length > 0){
      // console.log("datasourceGift ==>",datasourceGift);
      dataSourceCarCondition?.miscPackage.forEach((gift) => {
        if (!gift.packageCode ) {
          newErrorsPackageItem[gift.no] = { ...newErrorsPackageItem[gift.no], packageCode: 'กรุณาเลือก กลุ่มแพ็กเกจเสริม' };
          isValidPackageItem = false;
        }
        if (!gift.packageItemCode ) {
          newErrorsPackageItem[gift.no] = { ...newErrorsPackageItem[gift.no], packageItemCode: 'กรุณาเลือก รายการ' };
          isValidPackageItem = false;
        }
        if (!gift.price) {
          newErrorsPackageItem[gift.no] = { ...newErrorsPackageItem[gift.no], price: 'กรุณากรอก มูลค่า (บาท)' };
          isValidPackageItem = false;
        }
        if (!gift.minDay) {
          newErrorsPackageItem[gift.no] = { ...newErrorsPackageItem[gift.no], minDay: 'กรุณากรอก เช่าขั้นต่ำ (วัน)' };
          isValidPackageItem = false;
        }
        
        // if(!gift.imageUrl || gift.imageUrl.trim() === '') {
        //   newErrorsPackageItem[gift.no] = { ...newErrorsPackageItem[gift.no], imageUrl: 'กรุณา อัพโหลดรูปภาพ' };
        //   isValidPackageItem = false;
        // }
      })
    }
    console.log("newErrorsDiscount", newErrorsPackageItem)

    if(dataSourceCarCondition?.mainPackage && dataSourceCarCondition?.mainPackage?.length > 0){
      // console.log("datasourceGift ==>",datasourceGift);
      dataSourceCarCondition?.mainPackage.forEach((gift) => {
        if (!gift.packageCode ) {
          newErrorsPackage[gift.no] = { ...newErrorsPackage[gift.no], packageCode: 'กรุณาเลือก กลุ่มของแถม' };
          isValidPackage = false;
        }
        if (!gift.packageItemCode ) {
          newErrorsPackage[gift.no] = { ...newErrorsPackage[gift.no], packageItemCode: 'กรุณาเลือก รายการ' };
          isValidPackage = false;
        }
        if (!gift.price) {
          newErrorsPackage[gift.no] = { ...newErrorsPackage[gift.no], price: 'กรุณากรอก มูลค่า (บาท)' };
          isValidPackage = false;
        }
        if (!gift.minDay) {
          newErrorsPackage[gift.no] = { ...newErrorsPackage[gift.no], minDay: 'กรุณากรอก เช่าขั้นต่ำ (วัน)' };
          isValidPackage = false;
        }
        
        // if(!gift.imageUrl || gift.imageUrl.trim() === '') {
        //   newErrorsPackage[gift.no] = { ...newErrorsPackage[gift.no], imageUrl: 'กรุณา อัพโหลดรูปภาพ' };
        //   isValidPackage = false;
        // }
      })
    }
    setErrorsDiscountCondition(newErrorsDiscount);
    setErrorsGiftCondition(newErrorsPackageItem);
    setErrorsPackageCondition(newErrorsPackage);

    return { isValidPackage, isValidDiscount, isValidPackageItem };
  }
  const validateInputs = (): { isValidGift: boolean; isValidCar: boolean } => {
    let newErrors: ErrorsGift = {};
    let newErrorsCar: ErrorsCar = {};
    let isValidGift = true;
    let isValidCar = true;

    // Validate Gifts
    if(datasourceGift.length > 0){
      // console.log("datasourceGift ==>",datasourceGift);
      datasourceGift.forEach((gift) => {
        if (!gift.packageCode ) {
          newErrors[gift.no] = { ...newErrors[gift.no], packageCode: 'กรุณาเลือก กลุ่มของแถม' };
          isValidGift = false;
        }
        if (!gift.packageItemCode ) {
          newErrors[gift.no] = { ...newErrors[gift.no], packageItemCode: 'กรุณาเลือก รายการ' };
          isValidGift = false;
        }
        if (!gift.price) {
          newErrors[gift.no] = { ...newErrors[gift.no], price: 'กรุณากรอก มูลค่า (บาท)' };
          isValidGift = false;
        }
        
        // if(!gift.imageUrl || gift.imageUrl.trim() === '') {
        //   newErrors[gift.no] = { ...newErrors[gift.no], imageUrl: 'กรุณา อัพโหลดรูปภาพ' };
        //   isValidGift = false;
        // }
        // gift.choices?.forEach((choice) => {
        //     if (!choice.nameTh || choice.nameTh.trim() === '') {
        //       newErrors[gift.no] = {
        //         ...newErrors[gift.no],
        //         [choice.no]: { ...newErrors[gift.no]?.[choice.no], nameTh: 'กรุณากรอก รายการ' },
        //       };
        //       isValidGift = false;
        //     }
        //     if (choice.price == null || choice.price < 0) {
        //       newErrors[gift.no] = {
        //         ...newErrors[gift.no],
        //         [choice.no]: { ...newErrors[gift.no]?.[choice.no], price: 'กรุณากรอก มูลค่า (บาท)' },
        //       };
        //       isValidGift = false;
        //     }
        //     if (!choice.imageUrl) {
        //       newErrors[gift.no] = {
        //         ...newErrors[gift.no],
        //         [choice.no]: { ...newErrors[gift.no]?.[choice.no], imageUrl: 'กรุณา อัพโหลดรูปภาพ' },
        //       };
        //       isValidGift = false;
        //     }
        //   });
      })
    }

    if(datasourceCar.length > 0){
      datasourceCar.forEach((car) => {
        if (!car.priceDiscount || car.priceDiscount < 0) {
          newErrorsCar[car.no] = {
            ...newErrorsCar[car.no],
            priceDiscount: 'กรุณากรอก ส่วนลด (บาท/วัน)',
          };
          isValidCar = false;
        }
        if (!car.percentDiscount || car.percentDiscount < 0) {
          newErrorsCar[car.no] = {
            ...newErrorsCar[car.no],
            percentDiscount: 'กรุณากรอก ส่วนลด (%/วัน)',
          };
          isValidCar = false;
        }
        if (!car.price || car.price < 0) {
          newErrorsCar[car.no] = {
            ...newErrorsCar[car.no],
            price: 'กรุณากรอก ราคาปก',
          };
          isValidCar = false;
        }
        if (!car.vehicleMasterId) {
          newErrorsCar[car.no] = {
            ...newErrorsCar[car.no],
            vehicleMasterId: 'กรุณาเลือก ยี่ห้อ',
          };
          isValidCar = false;
        }
      });
    }
    setErrorsGift(newErrors);
    setErrorsCar(newErrorsCar);
    return { isValidGift, isValidCar };
  };



    const setIdFromPath = (): number =>{
        const { id } = Router.query as { id: string; };
        const _id = Number.parseInt(id);
        if(_id && !Number.isNaN(_id)) {
            setId(_id);
        }
        return _id;
    }

 

    const onChangeUploadImgPromotion = (params: { file: UploadFile, fileList: UploadFile[] }) => {
      if (params.file.status === 'done') {
        const originFileObj = params.file.originFileObj;
        // const imageUrl = URL.createObjectURL(originFileObj as RcFile);
        // console.log("file == >", originFileObj);
    
        // Uncomment and use this block for actual upload
        if (originFileObj) {
          // setImagePromotionCash(originFileObj);
        
          useApiFileUpload.fetch({
            fileType: "pub-content",
            file: originFileObj,
            docType: "promotion"
          }).then((res) => {
            if(res.data){
              setImagePromotion({imagUrl: res.data?.url || ""});
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

    const onChangeUploadImgGift = (params: { file: UploadFile; no: number }) => {
      if (params.file.status === 'done') {
        const originFileObj =  params.file.originFileObj;
        const imageUrl = URL.createObjectURL(params.file.originFileObj as RcFile);

        if (originFileObj) {
          // setImagePromotionCash(originFileObj);
        
          useApiFileUpload.fetch({
            fileType: "pub-content",
            file: originFileObj,
            docType: "promotion"
          }).then((res) => {
            if(res.data){
              setDatasourceGift((prevGift) => {
                return prevGift.map((gift) => {
                  if (gift.no === params.no) {
                    return {
                      ...gift,
                      imageUrl: res.data?.url || "",
                      // choices: gift.choices?.map((choice) => {
                      //   if (choice.no === params.no) {
                      //     return { ...choice, imageUrl: res.data?.url || "" };
                      //   }
                      //   return choice;
                      // }),
                    };
                  }
                  return gift;
                });
              });
              notify({ title: 'ทำการ อัพโหลดรูป สำเร็จ', type: 'success' });
            }
            else{
              notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
            }
  
          });
        } else {
          console.error("No original file object available.");
        }
        // console.log("imageUrl", imageUrl)
       
      }
    }

    const onCloseModalConfirm = () => {
      setIsModalConfirmVisible(false);
      setIsShowModalDeleteCar(false);
      setIsShowModalDeleteGift(false);
    }

    const onClickToPreviousePage = () =>{
      Router.push('/promotion-management');
    }
    const onClickShowModalConfirmDeleteCarList = () => {
      setIsShowModalDeleteCar(true);
    }

    const onClickShowModalConfirmDeleteGiftList = () => {
      setIsShowModalDeleteGift(true);
    }

    const onClickSetCondition = (params :{ no: number;}) => {
      setNoRecordCar(params.no);
      setIsShowModalConditionCar(true);
      const dataSourceCarByNo = datasourceCar?.find((item) => item.no === params.no)
      // console.log("dataSourceCarByNo?.brandName",dataSourceCarByNo?.dataSourceCarCondition)
      setDataSourceCarCondition(dataSourceCarByNo?.dataSourceCarCondition || {
        brandName: dataSourceCarByNo?.brandName,
        modelName: dataSourceCarByNo?.modelName,
        vehicleMasterId: dataSourceCarByNo?.vehicleMasterId,
        promotionId: id,
        // packageDiscounts: [{no: 1, isFromDataBase: false, isActive: true, vehicleMasterId: dataSourceCarByNo?.vehicleMasterId, promotionId: id}],
        // mainPackage: [{no: 1, isFromDataBase: false, isActive: true, vehicleMasterId: dataSourceCarByNo?.vehicleMasterId, promotionId: id}],
        // miscPackage: [{no: 1, isFromDataBase: false, isActive: true, vehicleMasterId: dataSourceCarByNo?.vehicleMasterId, promotionId: id}],
      })
      // setDataSourceCarCondition((prev) =>{
      //   if(dataSourceCarByNo?.dataSourceCarCondition?.packageDiscounts 
      //     && dataSourceCarByNo?.dataSourceCarCondition?.mainPackage 
      //     && dataSourceCarByNo?.dataSourceCarCondition?.miscPackage){
      //     return dataSourceCarByNo.dataSourceCarCondition
      //   }
      //   return prev
      // });
    
    }
    const onChangeMinDay = (params :{ no: number; value: number}) => {
      // setDatasourceCar((prev) =>{
      //   return prev.map(item => {
      //     if(item.no === noRecordCar){
      //       return{
      //         ...item,
      //         dataSourceCarCondition: {
      //           ...item.dataSourceCarCondition,
      //           packageDiscounts: item.dataSourceCarCondition?.packageDiscounts?.map(
      //             (disCount) =>{
      //               if(disCount.no === params.no){
      //                 return{
      //                   ...disCount,
      //                   minDay: params.value
      //                 }
      //               }
      //               return disCount
      //             }
      //           )
      //         }
      //       }
      //     }
      //     return item
      //   })
      // })
      // setDatasourceGift((prevGift) => {
      //   return prevGift.map((gift) => {
      //     if (gift. === params.recordNo) {
      //       return {
      //         ...gift,
      //         choices: gift.choices?.map((choice) => {
      //           if (choice.no === params.no) {
      //             return { ...choice, isActive: params.value };
      //           }
      //           return choice;
      //         }),
      //       };
      //     }
      //     return gift;
      //   });
      // });
      setDataSourceCarCondition((prev) =>({
        ...prev,
        packageDiscounts: prev?.packageDiscounts?.map(item =>
          item.no === params.no ? { ...item, minDay: params.value} : item
        )
      }));
    }

    const onChangeCoverPriceCondition = (params: { no: number; value: number }) => {
      setDataSourceCarCondition(prev => ({
        ...prev,
        packageDiscounts: prev?.packageDiscounts?.map(item => {
          if (item.no === params.no) {
            const newCoverPrice = parseFloat(params.value.toFixed(2));
            const newDiscountBaht = parseFloat((newCoverPrice * ((item.discountPercent || 0) / 100)).toFixed(2));
            const newNetPrice = parseFloat(calculateNetPrice(newCoverPrice, (item.discountPercent || 0), newDiscountBaht).toFixed(2));
            return {
              ...item,
              price: newCoverPrice,
              discountPrice: newDiscountBaht,
              discountPercent: parseFloat((item.discountPercent || 0).toFixed(2)),
              totalPrice: newNetPrice,
            };
          }
          return item;
        })
      }));
    };
 

    const onChangeDiscountBahtCondition = (params: { no: number; value: number }) => {
      setDataSourceCarCondition(prev => ({
        ...prev,
        packageDiscounts: prev?.packageDiscounts?.map(item => {
          if (item.no === params.no) {
            const newDiscountBaht = parseFloat(params.value.toFixed(2));
            const newDiscountPercent = parseFloat(((newDiscountBaht / (item.price || 1)) * 100).toFixed(2));
            const newNetPrice = parseFloat(calculateNetPrice(item.price || 0, newDiscountPercent, newDiscountBaht).toFixed(2));
            return {
              ...item,
              discountPrice: newDiscountBaht,
              discountPercent: newDiscountPercent,
              totalPrice: newNetPrice
            };
          }
          return item;
        })
      }));
    };

    const onChangStatusDisCountPrice = (params :{ no: number; value: boolean}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        packageDiscounts: prev?.packageDiscounts?.map(item =>
          item.no === params.no ? { ...item, isActive: params.value} : item
        )
      }));
    }

    const onClickAddCarTableCondition = () => {
      console.log("dataSourceCarCondition",dataSourceCarCondition)
      setDataSourceCarCondition((prev) =>{
        // console.log("vhId",prev?.vehicleMasterId)
        return {
          ...prev,
          packageDiscounts: [...prev?.packageDiscounts || [], {
            no: prev?.packageDiscounts?.[prev?.packageDiscounts.length - 1]?.no ? (prev.packageDiscounts?.[prev.packageDiscounts.length - 1]?.no || 0) + 1 : 1,
            isFromDataBase: false,
            isActive: true,
            vehicleMasterId: prev?.vehicleMasterId,
            promotionId: id
            // vehicleMasterId: prev?.[noRecordCar - 1]?.vehicleMasterId
          }]
        }
      })
    }

    const onClickShowModalConfirmDeleteCarListCondition = () => {
      setIsShowModalDeleteDiscountCar(true);
    }

    const onChangeRowSelectionDisCount = (selectedRowKeys: Array<number | string>)=> {
      setRowSelectedTableDisCount(selectedRowKeys);
    }
    const onClickAddPackage = () => {

      setDataSourceCarCondition((prev) =>({
        ...prev,
        mainPackage: [...prev?.mainPackage || [], {
          no: prev?.mainPackage?.[prev?.mainPackage.length - 1]?.no ? (prev?.mainPackage?.[prev.mainPackage.length - 1]?.no || 0) + 1 : 1,
          isFromDataBase: false,
          isActive: true,
          vehicleMasterId: prev?.vehicleMasterId,
          promotionId: id
        }]
      }))
    }

    const onChangeRowSelectionPackage = (selectedRowKeys: Array<number | string>)=> {
      setRowSelectedTablePackage(selectedRowKeys);
    }

    
    const onClickDeletePackage = () => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        mainPackage: prev?.mainPackage?.filter(item => !rowSelectedTablePackage.includes(item.no || 0))
      }))
      setRowSelectedTablePackage([]);
      setIsShowModalDeletePackage(false);
    }

    const onCloseModalPackage = () => {
      setIsShowModalDeletePackage(false);
    }

    const onClickShowModalDeletePackage = () => {
      setIsShowModalDeletePackage(true);
    }

    const onClickDeleteDiscountCondition = () => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        packageDiscounts: prev?.packageDiscounts?.filter(item => !rowSelectedTableDisCount.includes(item.no || 0))
      }))
      setRowSelectedTableDisCount([]);
      setIsShowModalDeleteDiscountCar(false);
    }

    const onCloseModalDiscountCondition = () => {
      setIsShowModalDeleteDiscountCar(false);
    }

    const onChangePricePackageCondition = (params :{ no: number; value: number}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        mainPackage: prev?.mainPackage?.map(item =>
          item.no === params.no ? { ...item, price: params.value} : item
        )
      }));
    }

    const onChangeUploadImgPackageCondition = (params :{file: UploadFile; no: number }) => {
      if (params.file.status === 'done') {
        const originFileObj =  params.file.originFileObj;
        const imageUrl = URL.createObjectURL(params.file.originFileObj as RcFile);

        if (originFileObj) {
          // setImagePromotionCash(originFileObj);
        
          useApiFileUpload.fetch({
            fileType: "pub-content",
            file: originFileObj,
            docType: "promotion"
          }).then((res) => {
            if(res.data){
              setDataSourceCarCondition((prev) =>({
                ...prev,
                mainPackage: prev?.mainPackage?.map(item =>
                  item.no === params.no ? { ...item, imageUrl: res.data?.url || ""} : item
                )
              }));
              notify({ title: 'ทำการ อัพโหลดรูป สำเร็จ', type: 'success' });
            }
            else{
              notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
            }
  
          });
        } else {
          console.error("No original file object available.");
        }
        // console.log("imageUrl", imageUrl)
       
      }
    }

    const onChangeUploadImgGiftCondition = (params :{file: UploadFile; no: number }) => {
      if (params.file.status === 'done') {
        const originFileObj =  params.file.originFileObj;
        const imageUrl = URL.createObjectURL(params.file.originFileObj as RcFile);

        if (originFileObj) {
          // setImagePromotionCash(originFileObj);
        
          useApiFileUpload.fetch({
            fileType: "pub-content",
            file: originFileObj,
            docType: "promotion"
          }).then((res) => {
            if(res.data){
              setDataSourceCarCondition((prev) =>({
                ...prev,
                miscPackage: prev?.miscPackage?.map(item =>
                  item.no === params.no ? { ...item, imageUrl: res.data?.url || ""} : item
                )
              }));
              notify({ title: 'ทำการ อัพโหลดรูป สำเร็จ', type: 'success' });
            }
            else{
              notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
            }
  
          });
        } else {
          console.error("No original file object available.");
        }
        // console.log("imageUrl", imageUrl)
       
      }
    }
    const onChangeMinDayPackageCondition  = (params :{ no: number; value: number}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        mainPackage: prev?.mainPackage?.map(item =>
          item.no === params.no ? { ...item, minDay: params.value} : item
        )
      }));
    }

    const onChangeStatusPackageCondition = (params :{ no: number; value: boolean}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        mainPackage: prev?.mainPackage?.map(item =>
          item.no === params.no ? { ...item, isActive: params.value} : item
        )
      }));
    }
    const onChangePackageIdCondition = (params :{ no: number; value: string}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        mainPackage: prev?.mainPackage?.map(item =>
          item.no === params.no ? { ...item, packageCode: params.value, price: undefined, packageItemCode: undefined} : item
        )
      }));

      useApiPackageItemApi.fetch({...constantBranch, packageCode: params.value, pageIndex: 1, pageSize: 400, isActive: true}).then((res) => {
        if(res.items){
          console.log("res.items",res.items)
          setDataSourceCarCondition((prev) =>({
            ...prev,
            mainPackage: prev?.mainPackage?.map(item =>
              item.no === params.no ? { ...item, dataSourcePacakgeItem: res} : item
            )
          }));
        }
      });
    }

    const onChangePackageItemCodeCondition = (params :{ no: number; value: string; price: number}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        mainPackage: prev?.mainPackage?.map(item =>
          item.no === params.no ? { ...item,packageItemCode: params.value, price: params.price} : item
        )
      }));
    }

   const onClickAddGiftCondition = () => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        miscPackage: [...prev?.miscPackage || [], {
          no: prev?.miscPackage?.[prev?.miscPackage.length - 1]?.no ? (prev.miscPackage?.[prev.miscPackage.length - 1]?.no || 0) + 1 : 1,
          isFromDataBase: false,
          isActive: true,
          vehicleMasterId: prev?.vehicleMasterId,
          promotionId: id
        }]
      }))
    }

    const onClickShowModalDeleteGiftCondition = () => {
      setIsShowModalDeletGiftCondition(true);
    }

    const onChangeRowSelectionGiftCondition = (selectedRowKeys: Array<number | string>)=> {
      setRowSelectedTableGiftCondition(selectedRowKeys);
    }

    const onClickDeleteGiftCondition = () => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        miscPackage: prev?.miscPackage?.filter(item => !rowSelectedTableGiftCondition.includes(item.no || 0))
      }))
      setRowSelectedTableGiftCondition([]);
      setIsShowModalDeletGiftCondition(false);
    }

    const onCloseModalGiftCondition = () => {
      setIsShowModalDeletGiftCondition(false);
    }

    const onChangeGiftCondition = (params :{ no: number; value: string}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        miscPackage: prev?.miscPackage?.map(item =>
          item.no === params.no ? { ...item, packageCode: params.value, packageItemCode: undefined, price: undefined} : item
        )
      }));
      useApiPackageItemApi.fetch({...constantBranch, packageCode: params.value, pageIndex: 1, pageSize: 400, isActive: true}).then((res) => {
        if(res.items){
          console.log("res.items",res.items)
          setDataSourceCarCondition((prev) =>({
            ...prev,
            miscPackage: prev?.miscPackage?.map(item =>
              item.no === params.no ? { ...item, dataSourcePacakgeItem: res} : item
            )
          }));
        }
      });
     
    }

    const onChangeGiftItemCodeCondition = (params :{ no: number; value: string; price: number;}) =>{
      setDataSourceCarCondition((prev) =>({
        ...prev,
        miscPackage: prev?.miscPackage?.map(item =>
          item.no === params.no ? { ...item,packageItemCode: params.value, price: params.price} : item
        )
      }));
    }
    const onChangeStatusGiftCondition = (params :{ no: number; value: boolean}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        miscPackage: prev?.miscPackage?.map(item =>
          item.no === params.no ? { ...item, isActive: params.value} : item
        )
      }));
    }

    const onChangeMinDayGiftCondition = (params :{ no: number; value: number}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        miscPackage: prev?.miscPackage?.map(item =>
          item.no === params.no ? { ...item, minDay: params.value} : item
        )
      }));
    }

    const onChangePriceGiftCondition = (params :{ no: number; value: number}) => {
      setDataSourceCarCondition((prev) =>({
        ...prev,
        miscPackage: prev?.miscPackage?.map(item =>
          item.no === params.no ? { ...item, price: params.value} : item
        )
      }));
    }

    const onClickSubmitModalConditon = () => {
     
      const isValid = validateInputsModalCondition();
      console.log("dataSource ==> ", dataSourceCarCondition)

      if(isValid.isValidDiscount && isValid.isValidPackage && isValid.isValidPackageItem){
        let dataSourceCarClone = [...datasourceCar];
        const newDataSourceCar = dataSourceCarClone.map((data) => 
          data.no === noRecordCar ? {...data, 
            dataSourceCarCondition: dataSourceCarCondition, 
            mainPackage: dataSourceCarCondition?.mainPackage,
            miscPackage: dataSourceCarCondition?.miscPackage,
            packageDiscounts: dataSourceCarCondition?.packageDiscounts
          } : data
        )
        setDatasourceCar(newDataSourceCar);
        console.log("newDataSourceCar", newDataSourceCar);
  
        setIsShowModalConditionCar(false);
        removeErrorConditionModal();
      }
     
    }

    const removeErrorConditionModal = () =>{
      setErrorsDiscountCondition({});
      setErrorsGiftCondition({});
      setErrorsPackageCondition({});
    }

    const onCloseModalConditon = () => {
      setIsShowModalConditionCar(false);
      removeErrorConditionModal();
    }

    const onClickCloseAlertChangePage = () =>{
      setIsShowAlertChangePage(false);
    }

    const onClickOpenAlertChangePage = () =>{
      setIsShowAlertChangePage(true);
    }

    const onClickConfirmAlertChangePage = ()=>{
      if(isShowModalConditionCar){
        setIsShowModalConditionCar(false);
        onClickCloseAlertChangePage();
      }
      else{
        onClickToPreviousePage();
      }
     
    }
    const contentProps: PromotionManagementCrudContentProps = {
        mode,
        page,
        pageSize,
        datasourceGift,
        rowSelectedTableGift,
        errorsGiftGroup,
        errorsGiftList,
        errorsGiftValue,
        rowSelectedTableCar,
        datasourceCar,
        useApiProduct,
        useApiVehicleMaster,
        useApiCarBrand,
        useApiVehicleModel,
        useApiPromotionGet,
        useApiPromotionGetById,
        errorsGift,
        imagePromotion,
        errorsCar,
        isModalConfirmVisible,
        isShowModalDeleteCar,
        isShowModalDeleteGift,
        isShowModalConditionCar,
        dataSourceCarCondition,
        rowSelectedTableDisCount,
        isShowModalDeleteDiscountCar,
        isShowModalDeletePackage,
        rowSelectedTablePackage,
        isShowModalDeletGiftCondition,
        rowSelectedTableGiftCondition,
        noRecordCar,
        useApiPackageMainApi,
        useApiPackageSubMainApi,

        errorsDiscountCondition,
        errorsGiftCondition,
        errorsPackageCondition,
        isShowAlertChangePage,
        onClickCloseAlertChangePage,
        onClickOpenAlertChangePage,
        onClickConfirmAlertChangePage,
        onCloseModalConfirm,
        onChangePage,
        onChangePageSize,
        onClickToEdit,
        onClikToView,
        onClickRemove,
        onClickToAdd,
        onSubmitForm,
        onClickAddGiftList,
        onClickDeleteGiftList,
        onChangeRowSelectionGift,
        onChangeGiftGroup,
        onChangeGiftList,
        onChangeGiftValue,
        onClickAddCarTable,
        onClickDeleteCarTalbe,
        onChangeRowSelectionCar,
        onChangeDiscountPercent,
        onChangeDiscountBaht,
        onChangeCoverPrice,
        onClickAddAllData,
        onChangeCarBrand,
        onClickAddChoiceGift,
        onDeleteChoice,
        onChangeUploadImgPromotion,
        onChangeUploadImgGift,
        onChangeStatusCar,
        onChangeStatusGift,
        onChangeGiftChoiceStatus,
        onClickToPreviousePage,
        onClickShowModalConfirmDeleteCarList,
        onClickShowModalConfirmDeleteGiftList,
        onClickSetCondition,
        onChangeMinDay,
        onChangeCoverPriceCondition,
        onChangeDiscountPercentCondition,
        onChangeDiscountBahtCondition,
        onChangStatusDisCountPrice,
        onClickAddCarTableCondition,
        onClickShowModalConfirmDeleteCarListCondition,
        onChangePricePackageCondition,
        onChangeMinDayPackageCondition,
        onChangeStatusPackageCondition,
        onChangeRowSelectionDisCount,
        onClickDeleteDiscountCondition,
        onCloseModalDiscountCondition,
        onChangeRowSelectionPackage,
        onClickDeletePackage,
        onCloseModalPackage,
        onClickShowModalDeletePackage,
        onClickAddPackage,
        onClickAddGiftCondition,
        onChangeRowSelectionGiftCondition,
        onClickDeleteGiftCondition,
        onClickShowModalDeleteGiftCondition,
        onCloseModalGiftCondition,
        onChangePriceGiftCondition,
        onChangeMinDayGiftCondition,
        onChangeStatusGiftCondition,
        onClickSubmitModalConditon,
        onCloseModalConditon,
        onChangeUploadImgPackageCondition,
        onChangeUploadImgGiftCondition,
        onChangeGiftCondition,
        onChangePackageIdCondition,
        onChangePackageItemCodeCondition,
        onChangeGiftItemCodeCondition
    };

  return (
    <>
      <Form 
        // onFinish={onSubmitForm} 
        layout='horizontal'
        form={antdForm}
        // className="flex flex-col md:space-y-4"
      >
        <Row gutter={[ 8, 16 ]}>
          <Col span={24}>
              <Card  
                className={'shadow-effect'} 
                // title={<Typography.Title type={'secondary'} level={3}>test</Typography.Title>}
              >
                  <Row gutter={[ 8, 16 ]} justify={'center'}>
                    <Col span={24}>
                      {renderOptions(contentProps)}
                    </Col>
                    <Col span={24}>
                      {renderGiftTable(contentProps)}
                    </Col>
                    <Col span={24}>
                      {renderCarTable(contentProps)}
                    </Col>
                    <Col>
                      <Button  onClick = {onClickOpenAlertChangePage}>ยกเลิก</Button>
                    </Col>
                    <Col >
                      <Button 
                        className='button-primary' 
                        // htmlType="submit"
                        onClick={onSubmitForm}
                      >
                        บันทึก
                      </Button>
                    </Col>
                   
                  </Row>
              </Card>
          </Col>
        </Row>
      </Form>
      {renderModalConfirm(contentProps)}
      <ModalConfirmCrud 
        isModalConfirmVisible={isShowModalDeleteGift}
        onCloseModalConfirm={onCloseModalConfirm}
        // onClickConfirmEdit={onClickConfirmEdit}
        onClickConfirmDelete={onClickDeleteGiftList}
        mode={'add'}
        rowSelectedTable={rowSelectedTableGift}
      />
      <ModalConfirmCrud 
        isModalConfirmVisible={isShowModalDeleteCar}
        onCloseModalConfirm={onCloseModalConfirm}
        onClickConfirmDelete={onClickDeleteCarTalbe}
        mode={'add'}
        rowSelectedTable={rowSelectedTableCar}
      />
      <ModalConfirmCrud 
        isModalConfirmVisible={isShowModalDeleteDiscountCar}
        onCloseModalConfirm={onCloseModalDiscountCondition}
        onClickConfirmDelete={onClickDeleteDiscountCondition}
        mode={'add'}
        rowSelectedTable={rowSelectedTableDisCount}
      />
       <ModalConfirmCrud 
        isModalConfirmVisible={isShowModalDeletePackage}
        onCloseModalConfirm={onCloseModalPackage}
        onClickConfirmDelete={onClickDeletePackage}
        mode={'add'}
        rowSelectedTable={rowSelectedTablePackage}
      />
      <ModalConfirmCrud 
        isModalConfirmVisible={isShowModalDeletGiftCondition}
        onCloseModalConfirm={onCloseModalGiftCondition}
        onClickConfirmDelete={onClickDeleteGiftCondition}
        mode={'add'}
        rowSelectedTable={rowSelectedTableGiftCondition}
      />
      {renderModalConditionCar(contentProps)}
      {renderAlertChangePage(contentProps)}
    </>
  );
}
const renderAlertChangePage = (props: PromotionManagementCrudContentProps): ReactElement => {
  return(
    <Modal
      open={props.isShowAlertChangePage}
      closable={false}
      footer={null}
      centered
      zIndex={10}
    >
      <Row gutter={[8, 8]} justify={'center'} align={'middle'}>
        <Col span={24} className='flex justify-center'>
          <InfoOutlined style={{ fontSize: '36px' }} className='bg-pl-yellow text-white rounded-full p-4'/>
        </Col>
        <Col span={24} className='flex justify-center text-xl font-semibold'>
          คุณต้องการออกจากหน้านี้หรือไม่?
        </Col>
        <Col >
          <Button 
            // className={`button-error`}
            onClick={props.onClickCloseAlertChangePage}
          >
           ยกเลิก
          </Button>
        </Col>
        <Col >
          <Button 
            
            className={`button-primary`}
            onClick={props.onClickConfirmAlertChangePage}
          >
           ยืนยัน
          </Button>
        </Col>
       
      </Row>
    </Modal>
  )
}
const renderModalConditionCar = (props: PromotionManagementCrudContentProps): ReactElement => {
  
  return(
    <Modal
      open={props.isShowModalConditionCar}
      closable={false}
      footer={null}
      centered
      width="75%"
      zIndex={5}
    >
      <Row gutter={[8, 8]} justify={'center'} align={'middle'}>
        <Col span={24} className='text-xl'>
          {/* {props.datasourceCar?.[props.noRecordCar]?.brandName} {props.datasourceCar?.[props.noRecordCar]?.modelName} */}
          {props.dataSourceCarCondition?.brandName}  {props.dataSourceCarCondition?.modelName} 
        </Col>
        <Col span={24}>
          ส่วนลด
        </Col>
        <Col span={24}>
          {renderDisCountTable(props)}
        </Col>
        <Col span={24}>
          {renderPackageTable(props)}
        </Col>
        <Col span={24}>
          {renderGiftConditionTable(props)}
        </Col>
        <Col>
          <Button  onClick={props.onClickOpenAlertChangePage}>ยกเลิก</Button>
        </Col>
        <Col>
          <Button className='button-primary' onClick={props.onClickSubmitModalConditon}>บันทึก</Button>
        </Col>
       
      </Row>
    </Modal>
  )
}


const renderGiftConditionTable = (props: PromotionManagementCrudContentProps): ReactElement => {
  return(
    <Row gutter={[8, 8]}>
      <Col span={24}>
        รายการของแถม
      </Col>
      <Col >
        <Button className='button-primary' onClick={props.onClickAddGiftCondition}>เพิ่ม</Button>
      </Col>
      <Col>
        <Button className='button-error' onClick={props.onClickShowModalDeleteGiftCondition}>ลบ</Button>
      </Col>
      <Col span={24}>
        <Table 
          columns={[
            {
              key: 'no',
              dataIndex: 'no',
              title: 'No.',
              render: (_, __, idx) => (
                  <Typography.Text>
                      {idx + 1}
                  </Typography.Text>
              )
            },
            {
              key: 'packageCode',
              dataIndex: 'packageCode',
              title: 'กลุ่มของแถม',
              width: 250,
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.price,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <Select
                        className='w-full'
                        value={record.packageCode}
                        onChange={(value) => props.onChangeGiftCondition({no: record.no || 1, value: value.toLocaleString()})}
                        options={props.useApiPackageSubMainApi.data?.items?.map((data) => ({ label: data.name, value: data.code }))}
                        status={props.errorsGiftCondition[record.no]?.packageCode ? 'error' : ''}
                      />
                      {
                        props.errorsGiftCondition[record.no]?.packageCode &&  
                        <div className='text-[#ff4d4f]'>{props.errorsGiftCondition[record.no]?.packageCode}</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'packageItemCode',
              dataIndex: 'packageItemCode',
              title: 'รายการ',
              width: 250,
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.price,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <Select
                         className='w-full'
                         options={record.dataSourcePacakgeItem?.items?.map((item) => ({ label: item.name, value: item.code }))}
                         value={record.packageItemCode}
                         status={props.errorsGiftCondition[record.no]?.packageItemCode ? 'error' : ''}
                         onChange={(e) => {
                           const selectedItem = record.dataSourcePacakgeItem?.items?.find((item) => item.code === e);
                           props.onChangeGiftItemCodeCondition({ no: record.no, value: e, price: selectedItem?.price || 0 })
                 
                         }}

                      />
                      {
                        props.errorsGiftCondition[record.no]?.packageItemCode &&  
                        <div className='text-[#ff4d4f]'>{props.errorsGiftCondition[record.no]?.packageItemCode}</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'price',
              dataIndex: 'price',
              title: 'มูลค่า (บาท)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.percentDiscount,minFractionDigits: 2, maxFractionDigits: 2})
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.price}
                        onChange={(e) => props.onChangePriceGiftCondition({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsGiftCondition[record.no]?.price ? 'error' : ''}
                        min={0}
                        // max={100}
                        className='w-full'
                        precision={2}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      />
                      {
                        props.errorsGiftCondition[record.no]?.price  &&  
                        <div className='text-[#ff4d4f]'>{props.errorsGiftCondition[record.no]?.price }</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'minDay',
              dataIndex: 'minDay',
              title: 'เช่าขั้นต่ำ (วัน)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.priceDiscount,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.minDay}
                        onChange={(e) => props.onChangeMinDayGiftCondition({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsGiftCondition[record.no]?.minDay ? 'error' : ''}
                        min={0}
                         className='w-full'
                        // precision={2}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      />
                      {
                        props.errorsGiftCondition[record.no]?.minDay &&  
                        <div className='text-[#ff4d4f]'>{props.errorsGiftCondition[record.no]?.minDay}</div>
                      }
                    </>
                  )
                // }
              }
            },
            // {
            //   key: "image",
            //   dataIndex: "image",
            //   title: "รูปภาพ รายการ",
            //   width: 300,
            //   render: (_, record) => {
            //     return(
            //       <Row gutter={[ 8, 8 ]} align={'top'}>
            //         <Col  span={12}>
            //           <Upload
            //             accept="image/*"
            //             maxCount={1}
            //             listType="picture"
            //             onChange={(info) => {props.onChangeUploadImgGiftCondition({file: info.file, no: record.no})}}
            //             showUploadList={false}
            //             style={{ width: "100%" }}
            //           >
            //             <Button   style={{ width: "100%" }}>อัปโหลด รูปภาพ</Button>
            //           </Upload>
            //           { props.errorsGiftCondition[record.no]?.imageUrl && (
            //             <div className='text-[#ff4d4f]'>{props.errorsGiftCondition[record.no]?.imageUrl}</div>
            //           )}
            //         </Col>
            //         <Col  span={12}>
            //           {record.imageUrl && 
            //             (
                        
            //               <Image key={record.no} src={record.imageUrl} alt="Uploaded Image"  style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                
            //             )
            //           }
            //         </Col>
            //       </Row>
            //     )
                
            //   }
            // },
            {
              key: "isActive",
              dataIndex: "isActive",
              title: "สถานะ",
              render: (_, record) => {
                return (
                  <Select
                    value={record.isActive}
                    options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                    onChange={(e) => props.onChangeStatusGiftCondition({ no: record.no || 1, value: e })}
                    // labelInValue={false}
                     className='w-full'
                  />
                )
              }
            },
          ]}
          dataSource={props.dataSourceCarCondition?.miscPackage || []}

          rowKey={'no'}
          pagination={false}
          rowSelection = {{
            selectedRowKeys: props.rowSelectedTableGiftCondition,
            onChange: props.onChangeRowSelectionGiftCondition,
            // getCheckboxProps: (record) => ({
            //   style: record.no === 1 ? { display: 'none' } : {},
            // }),
          }}
          scroll={{ x: 'max-content' }}

        />
      </Col>
    </Row>
  )
}
const renderPackageTable = (props: PromotionManagementCrudContentProps): ReactElement => {
  return(
    <Row gutter={[8, 8]}>
      <Col span={24}>
        รายการแพ็กเกจเสริม
      </Col>
      <Col >
        <Button className='button-primary' onClick={props.onClickAddPackage}>เพิ่ม</Button>
      </Col>
      <Col>
        <Button className='button-error' onClick={props.onClickShowModalDeletePackage}>ลบ</Button>
      </Col>
      <Col span={24}>
        <Table 
          columns={[
            {
              key: 'no',
              dataIndex: 'no',
              title: 'No.',
              render: (_, __, idx) => (
                  <Typography.Text>
                      {idx + 1}
                  </Typography.Text>
              )
            },
            {
              key: 'packageCode',
              dataIndex: 'packageCode',
              title: 'กลุ่มแพ็กเกจเสริม',
              width: 250,
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.price,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <Select
                        className='w-full'
                        options={props.useApiPackageMainApi.data?.items?.map((item) => ({ label: item.name, value: item.code }))}
                        status={props.errorsPackageCondition[record.no]?.packageCode ? 'error' : ''}
                        value={record.packageCode}
                        onChange={(value) => {props.onChangePackageIdCondition({no: record.no, value: value.toLocaleString()})}}
                      />
                      {
                        props.errorsPackageCondition[record.no]?.packageCode &&  
                        <div className='text-[#ff4d4f]'>{props.errorsPackageCondition[record.no]?.packageCode}</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'packageItemCode',
              dataIndex: 'packageItemCode',
              title: 'รายการ',
              width: 250,
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.price,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <Select
                        className='w-full'
                        options={record.dataSourcePacakgeItem?.items?.map((item) => ({ label: item.name, value: item.code }))}
                        value={record.packageItemCode}
                        status={props.errorsPackageCondition[record.no]?.packageItemCode ? 'error' : ''}
                        onChange={(e) => {
                          const selectedItem = record.dataSourcePacakgeItem?.items?.find((item) => item.code === e);
                          props.onChangePackageItemCodeCondition({ no: record.no, value: e, price: selectedItem?.price || 0 })
                
                        }}
                        // onChange={(value) => {props.onChangePackageIdCondition({no: record.no, value: value.toLocaleString()})}}
                      />
                      {
                        props.errorsPackageCondition[record.no]?.packageItemCode &&  
                        <div className='text-[#ff4d4f]'>{props.errorsPackageCondition[record.no]?.packageItemCode}</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'price',
              dataIndex: 'price',
              title: 'มูลค่า (บาท)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.percentDiscount,minFractionDigits: 2, maxFractionDigits: 2})
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.price}
                        onChange={(e) => props.onChangePricePackageCondition({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsPackageCondition[record.no]?.price ? 'error' : ''}
                        min={0}
                        // max={100}
                        className='w-full'
                        precision={2}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      />
                      {
                        props.errorsPackageCondition[record.no]?.price  &&  
                        <div className='text-[#ff4d4f]'>{props.errorsPackageCondition[record.no]?.price }</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'minDay',
              dataIndex: 'minDay',
              title: 'เช่าขั้นต่ำ (วัน)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.priceDiscount,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.minDay}
                        onChange={(e) => props.onChangeMinDayPackageCondition({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsPackageCondition[record.no]?.minDay ? 'error' : ''}
                        min={0}
                         className='w-full'
                        // precision={2}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      />
                      {
                        props.errorsPackageCondition[record.no]?.minDay &&  
                        <div className='text-[#ff4d4f]'>{props.errorsPackageCondition[record.no]?.minDay}</div>
                      }
                    </>
                  )
                // }
              }
            },
            // {
            //   key: "image",
            //   dataIndex: "image",
            //   title: "รูปภาพ รายการ",
            //   width: 300,
            //   render: (_, record) => {
            //     return(
            //       <Row gutter={[ 8, 8 ]} align={'top'}>
            //         <Col  span={12}>
            //           <Upload
            //             accept="image/*"
            //             maxCount={1}
            //             listType="picture"
            //             onChange={(info) => {props.onChangeUploadImgPackageCondition({file: info.file, no: record.no})}}
            //             showUploadList={false}
            //             style={{ width: "100%" }}
            //           >
            //             <Button   style={{ width: "100%" }}>อัปโหลด รูปภาพ</Button>
            //           </Upload>
            //           {props.errorsPackageCondition[record.no]?.imageUrl  && (
            //             <div className='text-[#ff4d4f]'>{props.errorsPackageCondition[record.no]?.imageUrl}</div>
            //           )}
            //         </Col>
            //         <Col  span={12}>
            //           {record.imageUrl && 
            //             (
                        
            //               <Image key={record.no} src={record.imageUrl} alt="Uploaded Image"  style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                
            //             )
            //           }
            //         </Col>
            //       </Row>
            //     )
                
            //   }
            // },
            {
              key: "isActive",
              dataIndex: "isActive",
              title: "สถานะ",
              render: (_, record) => {
                return (
                  <Select
                    value={record.isActive}
                    options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                    onChange={(e) => props.onChangeStatusPackageCondition({ no: record.no || 1, value: e })}
                    // labelInValue={false}
                     className='w-full'
                  />
                )
              }
            },
          ]}
          dataSource={props.dataSourceCarCondition?.mainPackage || []}

          rowKey={'no'}
          pagination={false}
          rowSelection = {{
            selectedRowKeys: props.rowSelectedTablePackage,
            onChange: props.onChangeRowSelectionPackage,
            // getCheckboxProps: (record) => ({
            //   style: record.no === 1 ? { display: 'none' } : {},
            // }),
          }}
          scroll={{ x: 'max-content' }}
        />
      </Col>
    </Row>
  )
}
const renderDisCountTable = (props: PromotionManagementCrudContentProps): ReactElement => {
  return(
    <Row gutter={[8, 8]}>
      <Col >
        <Button className='button-primary' onClick={props.onClickAddCarTableCondition}>เพิ่ม</Button>
      </Col>
      <Col>
        <Button className='button-error' onClick={props.onClickShowModalConfirmDeleteCarListCondition}>ลบ</Button>
      </Col>
      <Col span={24}>
        <Table 
          columns={[
            {
              key: 'no',
              dataIndex: 'no',
              title: 'No.',
              render: (_, __, idx) => (
                  <Typography.Text>
                      {idx + 1}
                  </Typography.Text>
              )
            },
            {
              key: 'minDay',
              dataIndex: 'minDay',
              title: 'เช่าขั้นต่ำ (วัน)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.price,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.minDay}
                        onChange={(e) => props.onChangeMinDay({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsDiscountCondition[record.no || 0]?.minDay ? 'error' : ''}
                        className='w-full'
                        min={0}
                        formatter={(value) => {
                          if (value === undefined || value === null) return '';
                          const [integer, decimal] = `${value}`.split('.');
                          const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
                        }}
                        parser={(value) => {
                          const parsedValue = value?.replace(/,/g, '');
                          return parsedValue ? Number(parsedValue) : 0;
                        }}
                      />
                      {
                        props.errorsDiscountCondition[record.no || 0]?.minDay &&  
                        <div className='text-[#ff4d4f]'>{props.errorsDiscountCondition[record.no || 0]?.minDay}</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'price',
              dataIndex: 'price',
              title: 'ราคา (บาท / วัน)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.price,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.price}
                        onChange={(e) => props.onChangeCoverPriceCondition({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsDiscountCondition[record.no || 0]?.price ? 'error' : ''}
                        className='w-full'
                        min={0}
                        formatter={(value) => {
                          if (value === undefined || value === null) return '';
                          const [integer, decimal] = `${value}`.split('.');
                          const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
                        }}
                        parser={(value) => {
                          const parsedValue = value?.replace(/,/g, '');
                          return parsedValue ? Number(parsedValue) : 0;
                        }}
                      />
                      {
                        props.errorsDiscountCondition[record.no || 0]?.price &&  
                        <div className='text-[#ff4d4f]'>{props.errorsDiscountCondition[record.no || 0]?.price}</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'percentDiscount',
              dataIndex: 'percentDiscount',
              title: 'ส่วนลด (%/วัน)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.percentDiscount,minFractionDigits: 2, maxFractionDigits: 2})
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.discountPercent}
                        onChange={(e) => props.onChangeDiscountPercentCondition({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsDiscountCondition[record.no || 0]?.discountPercent ? 'error' : ''}
                         className='w-full'
                        min={0}
                        max={100}
                        precision={2}
                        formatter={(value) => {
                          if (value === undefined || value === null) return '';
                          const [integer, decimal] = `${value}`.split('.');
                          const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
                        }}
                        parser={(value) => {
                          const parsedValue = value?.replace(/,/g, '');
                          return parsedValue ? Number(parsedValue) : 0;
                        }}
                      />
                      {
                        props.errorsDiscountCondition[record.no || 0]?.discountPercent &&  
                        <div className='text-[#ff4d4f]'>{props.errorsDiscountCondition[record.no || 0]?.discountPercent}</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'priceDiscount',
              dataIndex: 'priceDiscount',
              title: 'ส่วนลด (บาท/วัน)',
              render: (_, record) => {
                // if(record.isFromDataBase){
                //   return convertToFormattedNumeric({value: record.priceDiscount,minFractionDigits: 2, maxFractionDigits: 2});
                // }
                // else{
                  return (
                    <>
                      <InputNumber
                        value={record.discountPrice}
                        onChange={(e) => props.onChangeDiscountBahtCondition({ no: record.no || 1, value: e || 0 })}
                        status={props.errorsDiscountCondition[record.no || 0]?.priceDiscount ? 'error' : ''}
                        min={0}
                        max={record.price}
                        precision={2}
                      formatter={(value) => {
                          if (value === undefined || value === null) return '';
                          const [integer, decimal] = `${value}`.split('.');
                          const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
                        }}
                        parser={(value) => {
                          const parsedValue = value?.replace(/,/g, '');
                          return parsedValue ? Number(parsedValue) : 0;
                        }}
                      />
                      {
                        props.errorsDiscountCondition[record.no || 0]?.priceDiscount  &&  
                        <div className='text-[#ff4d4f]'>{props.errorsDiscountCondition[record.no || 0]?.priceDiscount }</div>
                      }
                    </>
                  )
                // }
              }
            },
            {
              key: 'netPrice',
              dataIndex: 'netPrice',
              title: 'ราคาสุทธิ',
              render: (_, record) => {
                return convertToFormattedNumeric({value: record.totalPrice,minFractionDigits: 2, maxFractionDigits: 2});
              }
            },
            {
              key: "isActive",
              dataIndex: "isActive",
              title: "สถานะ",
              render: (_, record) => {
                return (
                  <Select
                    value={record.isActive}
                    options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                    onChange={(e) => props.onChangStatusDisCountPrice({ no: record.no || 1, value: e })}
                     className='w-full'
                    // labelInValue={false}
                  />
                )
              }
            },
          ]}
          dataSource={props.dataSourceCarCondition?.packageDiscounts || []}

          rowKey={'no'}
          pagination={false}
          rowSelection = {{
            selectedRowKeys: props.rowSelectedTableDisCount,
            onChange: props.onChangeRowSelectionDisCount,
            // getCheckboxProps: (record) => ({
            //   style: record.no === 1 ? { display: 'none' } : {},
            // }),
          }}
          scroll={{ x: 'max-content' }}
        />
      </Col>
    </Row>
  )
}

const renderModalConfirm = (props: PromotionManagementCrudContentProps): ReactElement => {
  return (
    <Modal
      open={props.isModalConfirmVisible}
      closable={false}
      footer={null}
      centered
      width={400}
      zIndex={99999}
    >
       <Row gutter={[ 8, 16 ]} justify={'center'} align={'middle'}>
        <Col span={24} className='flex justify-center'>
          <EditOutlined style={{ fontSize: '36px' }} className='bg-pl-yellow text-white rounded-full p-4'/>
        </Col>
        <Col span={24} className='flex justify-center text-xl font-semibold'>
          ยืนยันแก้ไขข้อมูล
        </Col>
        <Col>
          <Button className='button-plain' onClick={props.onCloseModalConfirm}> ยกเลิก</Button>
        </Col>
        <Col >
          <Button 
            onClick={props.onClickAddAllData}
            className={`button-warning`}
          >
           แก้ไข
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

const renderOptions = (props: PromotionManagementCrudContentProps): ReactElement => {
    return (
      <>
        <Row align={'middle'} gutter={[ 16, 8 ]}>
          <Col span={24} className='flex justify-end'>
            <Tag color="warning" className='rounded-full '><span className='text-[20px]'>{props.useApiPromotionGetById.data?.status}</span></Tag>
          </Col>
          <Col xs={24} md={10} >
          
            <Form.Item
              name="code"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  รหัสโปรโมชั่น
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
            >
              <Input allowClear disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={10} >
            <Form.Item
              name="name"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  ชื่อโปรโมชั่น
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              rules={[{ required: true, message: 'กรุณากรอก ชื่อ ชื่อโปรโมชั่น' }]}
              // wrapperCol={{ span: 14 }} 
              // wrapperCol={{ span: 16 }} 
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} md={10} xl={10}>
            <Form.Item
              name="startDate"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  ระยะเวลาโปรโมชั่น เริ่ม
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก ระยะเวลาโปรโมชั่น เริ่ม' }]}
              // wrapperCol={{ span: 16 }} 
            >
              <DatePicker 
                showTime
                className='w-full'
                format={'DD/MM/YYYY HH:mm'}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              name="endDate"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  สิ้นสุด
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก สิ้นสุด' }]}
              // wrapperCol={{ span: 16 }} 
            >
              <DatePicker 
                showTime
                className='w-full'
                format={'DD/MM/YYYY HH:mm'}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              name="startDateToUse"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  ระยะเวลาใช้โปรโมชั่น เริ่ม
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก ระยะเวลาใช้โปรโมชั่น เริ่ม' }]}
              // wrapperCol={{ span: 16 }} 
            >
              <DatePicker 
                showTime
                className='w-full'
                format={'DD/MM/YYYY HH:mm'}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              name="endDateToUse"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  สิ้นสุด
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก สิ้นสุด' }]}
              // wrapperCol={{ span: 16 }} 
            >
              <DatePicker 
                showTime
                className='w-full'
                format={'DD/MM/YYYY HH:mm'}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              name="productId"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  ผลิตภัณฑ์
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก ผลิตภัณฑ์' }]}
              // wrapperCol={{ span: 16 }} 
            >
              <Select
                showSearch
                placeholder="เลือกผลิตภัณฑ์"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={
                  props.useApiProduct.data?.items?.map((data) => ({
                    label: data.productName,
                    value: data.id
                  }))
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              name="productNumber"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  จำนวนที่สามารถใช้ได้
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก จำนวนที่สามารถใช้ได้' }]}
              // wrapperCol={{ span: 16 }} 
            >
              <InputNumber className='w-full' min={0}/>
            </Form.Item>
          </Col> 
          <Col xs={24} md={10}>
            <Form.Item
              name="method"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  วิธีการใช้
                </span>
              }
              className="w-full md:ml-10 "
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก วิธีการใช้' }]}
            >
              <Radio.Group >
                <Space direction={'horizontal'}>
                    <Radio value={'normal'}>ใช้ได้ทันที</Radio>
                    <Radio value={'admin-approve'}>รอ Admin อนุมัติ</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>   
          <Col xs={24} md={10}>
            <Form.Item
              name="payment"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  วิธีการชำระเงิน
                </span>
              }
              className="w-full md:ml-10"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก วิธีการชำระเงิน' }]}
            >
              <Checkbox.Group
                options={[
                  { label: 'พร้อมเพย์', value: 'prompt-pay' },
                  { label: 'บัตรเครดิต', value: 'credit-card' },
                  { label: 'ชำระกับเจ้าหน้าที่วันรับรถ', value: 'payment-at-counter' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item
              name="isActive"
              label={
                <span className="text-start md:text-end whitespace-normal" >
                  สถานะ
                </span>
              }
              className="w-full md:ml-10"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }} 
              rules={[{ required: true, message: 'กรุณาเลือก สถานะ' }]}
            >
              <Select
                options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                // labelInValue={false}
              />
            </Form.Item>
          </Col> 
          <Col xs={24} md={10}>
            <Form.Item
              name="img"
              label={
                <span className="text-start md:text-end whitespace-normal">
                  รูปภาพ
                </span>
              }
              className="w-full md:ml-10"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true, message: 'กรุณาอัปโหลด รูปภาพ' }]}
            >
              <div className="flex items-center">
                <Upload.Dragger
                  accept="image/*"
                  maxCount={1}
                  listType="picture"
                  onChange={props.onChangeUploadImgPromotion}
                  showUploadList={false}
                  customRequest={({ onSuccess }) => setTimeout(() => { 
                    if(onSuccess){
                      onSuccess("ok"); 
                    }
                    
                  }, 0) }
                >
                  <Row justify={'center'} align={'middle'}>
                    <Col span={24} className='flex justify-center'>
                      <InboxOutlined />
                    </Col>
                    <Col span={24} className='flex justify-center'>
                      <div className='p-1 flex items-center'>
                        <div className='text-[#6DC067] mr-1'>อัปโหลด </div>
                        หรือวางไฟล์ที่นี่
                      </div>
                    </Col>
                    <Col span={24} className='flex justify-center'>
                      <p className="ant-upload-hint">
                        SVG, PNG, JPG (max. 800x400px)
                      </p>
                    </Col>
                  </Row>
                </Upload.Dragger>
                {props.imagePromotion?.imagUrl && (
                  <Image
                    style={{ width: "3rem", height: "3rem", marginLeft: "1rem" }}
                    src={props.imagePromotion.imagUrl || ""}
                    preview
                  />
                )}
              </div>
            </Form.Item>
            {/* <Row gutter={[100,100]}>
              <Col>
                <Form.Item
                  name="img"
                  label={
                    <span className="text-start md:text-end whitespace-normal" >
                      รูปภาพ
                    </span>
                  }
                  className="w-full md:ml-10"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }} 
                >
                  <Upload
                    accept={'image/*'}
                    maxCount={1}
                    // beforeUpload={() => false}
                    listType={'picture'}
                    onChange={props.onChangeUploadImgPromotion}
                    showUploadList={false}
                  >
                    <Button>อัปโหลดไฟล์ รูปภาพ</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col>
              {
                props.imagePromotion && <Image style={{width: "2rem", height: "2rem"}} src={props.imagePromotion.url || ""} preview/>
              }
              </Col>
            </Row> */}
          </Col>                          
        </Row>
      </>
    )
  }
  const renderCarTable = (props: PromotionManagementCrudContentProps) => {
    const dataSourceVehicelMaster = props.useApiVehicleMaster.data?.items;
    return (
      <>
        <Row gutter={[ 8, 8 ]}>
          <Col span={24}>
            รายการถยนต์
          </Col>
          <Col >
            <Button className='button-primary' onClick={props.onClickAddCarTable}>เพิ่ม</Button>
          </Col>
          <Col>
            {/* <Popconfirm
              title={(
                <Typography.Text>
                    ต้องการ ที่จะลบ<br/>
                    ยืนยันหรือไม่ ?
                </Typography.Text>
              )}
              trigger={'click'}
              okText={'ยืนยัน'}
              onConfirm={ props.onClickDeleteCarTalbe }
              okButtonProps={{ size: 'middle',
                disabled: (props.rowSelectedTableCar.length === 0),
                className: 'button-primary',
              }}
              
              cancelText={'ยกเลิก'}
              cancelButtonProps={{ size: 'middle' }}
            > */}
              <Button className='button-error' onClick={props.onClickShowModalConfirmDeleteCarList}>ลบ</Button>
            {/* </Popconfirm> */}
          </Col>
          <Col span={24}>
            <Table
              columns={[
                {
                  key: 'no',
                  dataIndex: 'no',
                  title: 'No.',
                  render: (_, __, idx) => (
                      <Typography.Text>
                          {idx + 1}
                      </Typography.Text>
                  )
                },
                {
                  key: 'brandName',
                  dataIndex: 'brandName',
                  title: 'ยี่ห้อ',
                  width: 300,
                  render: (_, record) => {
                    // if(record.isFromDataBase){
                    //   return record.brandName;
                    // }
                    // else{
                      return (
                        <>
                          {/* <Input
                            value={record.brandName}
                            onChange={(e) => props.onChangeGiftGroup({ id: record.id, value: e.target.value })}
                            isActive={props.errorsGiftGroup[record.id] ? 'error' : ''}
                          /> */}
                          <Select 
                            showSearch
                            placeholder="กรุณาเลือกยี่ห้อ"
                            className='w-full'
                            value={record.vehicleMasterId}
                            // onChange={(e) => {console.log("e==>", e)}}
                            onChange={(value) => {
                              const selectedItem = dataSourceVehicelMaster?.find((item) => item.id === value);
                              if (selectedItem) {
                                props.onChangeCarBrand({
                                  no: record.no,
                                  vehicleMasterId: value,
                                  brandName: selectedItem.brandName || "",
                                  modelName: selectedItem.modelName || ""
                                });
                              }
                            }}
                            filterOption={(input, option) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={
                              props.useApiVehicleMaster.data?.items?.map((data) => ({
                              // record.dataSourceVehicleMaster?.map((data) => ({
                                label: `${data.vehicleMasterName}`,
                                value: data.id,
                              }))
                            }
                            status={props.errorsCar[record.no]?.vehicleMasterId ? 'error' : ''}
                          />
                          {
                            props.errorsCar[record.no]?.vehicleMasterId &&  
                            <div className='text-[#ff4d4f]'>{props.errorsCar[record.no].vehicleMasterId}</div>
                          }
  
                        </>
                      )
                    // }
                  }
                },
                // {
                //   key: 'model',
                //   dataIndex: 'model',
                //   title: 'รุ่น',
                //   render: (_, record) => {
                //     if(record.isFromDataBase){
                //       return record.model;
                //     }
                //     else{
                //       return (
                //         <>
                //            <Select 
                //             showSearch
                //             placeholder="กรุณาเลือก รุ่น"
                //             disabled={!record.brandName}
                //             // onChange={(e) => {console.log("e==>", e)}}
                //             // onChange={(value) => props.onChangeCarBrand({ id: record.vehicleMasterId, brandCode: value })}
                //             filterOption={(input, option) =>
                //               (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                //             }
                //             options={
                //               record.modelCarDataSource?.map((data) => ({
                //                 label: data.modelName,
                //                 value: data.id
                //               }))
                //             }
                //           />
                //           {
                //             props.errorsGiftList[record.no] &&  
                //             <div className='text-[#ff4d4f]'>{props.errorsGiftList[record.no]}</div>
                //           }
                //         </>
                //       )
                //     }
                //   }
                // },
                {
                  key: 'price',
                  dataIndex: 'price',
                  title: 'ราคาปก',
                  render: (_, record) => {
                    // if(record.isFromDataBase){
                    //   return convertToFormattedNumeric({value: record.price,minFractionDigits: 2, maxFractionDigits: 2});
                    // }
                    // else{
                      return (
                        <>
                          <InputNumber
                            value={record.price}
                            onChange={(e) => props.onChangeCoverPrice({ no: record.no, value: e || 0 })}
                            status={props.errorsCar[record.no]?.price ? 'error' : ''}
                            min={0}
                            formatter={(value) => {
                              if (value === undefined || value === null) return '';
                              const [integer, decimal] = `${value}`.split('.');
                              const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                              return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
                            }}
                            parser={(value) => {
                              const parsedValue = value?.replace(/,/g, '');
                              return parsedValue ? Number(parsedValue) : 0;
                            }}
                          />
                          {
                            props.errorsCar[record.no]?.price &&  
                            <div className='text-[#ff4d4f]'>{props.errorsCar[record.no].price}</div>
                          }
                        </>
                      )
                    // }
                  }
                },
                {
                  key: 'percentDiscount',
                  dataIndex: 'percentDiscount',
                  title: 'ส่วนลด (%/วัน)',
                  render: (_, record) => {
                    // if(record.isFromDataBase){
                    //   return convertToFormattedNumeric({value: record.percentDiscount,minFractionDigits: 2, maxFractionDigits: 2})
                    // }
                    // else{
                      return (
                        <>
                          <InputNumber
                            value={record.percentDiscount}
                            onChange={(e) => props.onChangeDiscountPercent({ no: record.no, value: e || 0 })}
                            status={props.errorsCar[record.no]?.percentDiscount ? 'error' : ''}
                            min={0}
                            max={100}
                            precision={2}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          />
                          {
                            props.errorsCar[record.no]?.percentDiscount &&  
                            <div className='text-[#ff4d4f]'>{props.errorsCar[record.no]?.percentDiscount}</div>
                          }
                        </>
                      )
                    // }
                  }
                },
                {
                  key: 'priceDiscount',
                  dataIndex: 'priceDiscount',
                  title: 'ส่วนลด (บาท/วัน)',
                  render: (_, record) => {
                    // if(record.isFromDataBase){
                    //   return convertToFormattedNumeric({value: record.priceDiscount,minFractionDigits: 2, maxFractionDigits: 2});
                    // }
                    // else{
                      return (
                        <>
                          <InputNumber
                            value={record.priceDiscount}
                            onChange={(e) => props.onChangeDiscountBaht({ no: record.no, value: e || 0 })}
                            status={props.errorsCar[record.no]?.priceDiscount ? 'error' : ''}
                            min={0}
                            max={record.price}
                            precision={2}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          />
                          {
                            props.errorsCar[record.no]?.priceDiscount &&  
                            <div className='text-[#ff4d4f]'>{props.errorsCar[record.no]?.percentDiscount}</div>
                          }
                        </>
                      )
                    // }
                  }
                },
                {
                  key: 'netPrice',
                  dataIndex: 'netPrice',
                  title: 'ราคาสุทธิ',
                  render: (_, record) => {
                    return convertToFormattedNumeric({value: record.netPrice,minFractionDigits: 2, maxFractionDigits: 2});
                  }
                },
                {
                  key: "isActive",
                  dataIndex: "isActive",
                  title: "สถานะ",
                  render: (_, record) => {
                    return (
                      <Select
                        value={record.isActive}
                        options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                        onChange={(e) => props.onChangeStatusCar({ no: record.no, value: e })}
                        // labelInValue={false}
                      />
                    )
                  }
                },
                {
                  key: 'action',
                  dataIndex: 'action',
                  title: 'เพิ่มเติม',
                  render: (_, record) => {
                    return(
                      <Button className='button-warning' 
                        disabled ={!record.vehicleMasterId } 
                        onClick={() => {props.onClickSetCondition({ no: record.no })}}
                      >
                          กำหนดเงื่อนไขชั้นสูง
                      </Button>
                    )
                  }
                }
              ]}
              dataSource={props.datasourceCar || []}
              rowKey={'no'}
              pagination={false}
              rowSelection = {{
                selectedRowKeys: props.rowSelectedTableCar,
                onChange: props.onChangeRowSelectionCar,
                // getCheckboxProps: (record) => ({
                //   style: record.no === 1 ? { display: 'none' } : {},
                // }),
                
              }}
              scroll={{ x: 'max-content' }}
            />
          </Col>
        </Row>
      </>
    )
  }
  
  
  const renderGiftTable = (props: PromotionManagementCrudContentProps): ReactElement => {
    console.log("props.error",props.errorsGift)
    return(
      <>
        <Card>
          <Row gutter={[ 8, 8 ]}>
            <Col span={24}>
              กำหนดเงื่อนไขแบบรวมทั้งโปรโมชั่น
            </Col>
            <Col xs={24} md={10} >
              <Form.Item
                name="minimumDay"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    ขั้นต่ำ (วัน)
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }} 
                rules={[{ required: true, message: 'กรุณากรอก ขั้นต่ำ (วัน)' }]}
              >
                <InputNumber  className='w-full' />
              </Form.Item>
            </Col>
            <Col xs={24} md={10} >
              <Form.Item
                name="discountPerDay"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    ลดราคา (บาท/วัน)
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                rules={[{ required: true, message: 'กรุณากรอก ลดราคา (บาท/วัน)' }]}
                // wrapperCol={{ span: 14 }} 
                // wrapperCol={{ span: 16 }} 
              >
                <InputNumber  className='w-full'/>
              </Form.Item>
            </Col>
            <Col xs={24} md={10} >
            </Col>
            <Col xs={24} md={10} >
              <Form.Item
                name="discountPercentPerDay"
                label={
                  <span className="text-start md:text-end whitespace-normal" >
                    ลดราคา (%/วัน)
                  </span>
                }
                className="w-full md:ml-10 "
                labelCol={{ span: 10 }}
                rules={[{ required: true, message: 'กรุณากรอก  ลดราคา (%/วัน)' }]}
                // wrapperCol={{ span: 14 }} 
                // wrapperCol={{ span: 16 }} 
              >
                <InputNumber  className='w-full'/>
              </Form.Item>
            </Col>
            <Col span={24}>
              รายการของแถม
            </Col>
            <Col >
              <Button className='button-primary' onClick={props.onClickAddGiftList}>เพิ่ม</Button>
            </Col>
            
            <Col>
              {/* <Popconfirm
                title={(
                  <Typography.Text>
                      ต้องการ ที่จะลบ<br/>
                      ยืนยันหรือไม่ ?
                  </Typography.Text>
                )}
                trigger={'click'}
                okText={'ยืนยัน'}
                onConfirm={ props.onClickDeleteGiftList }
                okButtonProps={{ size: 'middle',
                  disabled: (props.rowSelectedTableGift.length === 0),
                  className: 'button-primary',
                }}
                cancelText={'ยกเลิก'}
                cancelButtonProps={{ size: 'middle' }}
              > */}
                <Button className='button-error' onClick={props.onClickShowModalConfirmDeleteGiftList}>ลบ</Button>
              {/* </Popconfirm> */}
            </Col>
            <Col span={24}>
              <Table
                columns={[
                  {
                    key: 'no',
                    dataIndex: 'no',
                    title: 'No.',
                    width: 50,
                    render: (_, __, idx) => (
                        <Typography.Text>
                            {idx + 1}
                        </Typography.Text>
                    )
                  },
                  {
                    key: 'packageCode',
                    dataIndex: 'packageCode',
                    title: 'กลุ่มของแถม',
                    width: 250,
                    render: (_, record) => {
                      // if(record.isFromDataBase){
                      //   return record.nameTh;
                      // }
                      // else{
                        return (
                          // <Form.Item
                          //   validateStatus={props.errorsGift[record.id] ? 'error' : ''}
                          //   help={props.errorsGift[record.id]}
                          // >
                            <>
                              <Select 
                                 value={record.packageCode}
                                 className='w-full'
                                 onChange={(e) => props.onChangeGiftGroup({ no: record.no, value: e.toLocaleString() })}
                                 options={props.useApiPackageSubMainApi.data?.items?.map((data) => ({ label: data.name, value: data.code }))}
                                 status={props.errorsGift[record.no]?.packageCode ? 'error' : ''}
                              />
                              {
                                props.errorsGift[record.no]?.packageCode && 
                                <div className='text-[#ff4d4f]'>{props.errorsGift[record.no]?.packageCode}</div>
                              }
                              {/* <Input
                                value={record.nameTh}
                                onChange={(e) => props.onChangeGiftGroup({ no: record.no, value: e.target.value })}
                                status={props.errorsGift[record.no]?.nameTh ? 'error' : ''}
                              />
                              {
                                props.errorsGift[record.no]?.nameTh && 
                                <div className='text-[#ff4d4f]'>{props.errorsGift[record.no]?.nameTh}</div>
                              } */}
  
                            </>
                          
                            
                          // </Form.Item>
                        )
                      // }
                    }
                  },
                  {
                    key: 'packageItemCode',
                    dataIndex: 'packageItemCode',
                    title: 'รายการ',
                    align: 'left', 
                    width: 250,
                    render: (_, record) => {
                      // if(record.isFromDataBase){
                      //   return record.choices;
                      // }
                      // else{
                      // return (
                      //   <Row gutter={[ 8, 8 ]} align={'middle'}>
                         
                      //     {
                      //       record.choices?.map((data, index)=>{
                      //         return(
                      //           <Col span = {24}>
                      //             <Row gutter={[3, 3 ]} align={'middle'}>
                      //               <Col span={18}>
                      //                 <Input
                      //                   value={data.nameTh}
                      //                   onChange={
                      //                     (e) => props.onChangeGiftList({
                      //                       no: data.no, recordNo: record.no, value: e.target.value
                      //                   })}
                      //                   className='w-full'
                      //                   // isActive={props.errorsGiftList[record.no] ? 'error' : ''}
                      //                   placeholder='รายการ'
                      //                   status={props.errorsGift[record.no]?.[data.no]?.nameTh ? 'error' : ''}
                      //                 />
                      //                 {props.errorsGift[record.no]?.[data.no]?.nameTh && (
                      //                   <div className='text-[#ff4d4f]'>{props.errorsGift[record.no][data.no].nameTh}</div>
                      //                 )}
                      //               </Col>
                      //             </Row>
                      //           </Col>
                            
                      //         )
                      //        }) 
                      //     }
                      //   </Row>
                      // )
                      return(
                        <>  
                          <Select 
                            className='w-full'
                            value={record.packageItemCode}
                            options={record.dataSourcePacakgeItem?.items?.map((data) => ({ label: data.name, value: data.code }))}
                            
                            onChange={(e) => {
                              const selectedItem = record.dataSourcePacakgeItem?.items?.find((item) => item.code === e);
                              props.onChangeGiftList({ no: record.no, value: e, price: selectedItem?.price || 0 })
                    
                            }}
                          
                            status={props.errorsGift[record.no]?.packageItemCode ? 'error' : ''}
                          />
                          {
                            props.errorsGift[record.no]?.packageItemCode && 
                            <div className='text-[#ff4d4f]'>{props.errorsGift[record.no]?.packageItemCode}</div>
                          }
                        </>
                     
                      )
                    }
                  },
                  {
                    key: "value",
                    dataIndex: "value",
                    title: "มูลค่า (บาท)",
                    width: 200,
                    render: (_, record) => {
                      return(
                        <>
                          <InputNumber 
                            min={0}
                            placeholder='มูลค่า (บาท)'
                            className='w-full'
                            value={record.price}
                            onChange={(e) => props.onChangeGiftValue({ no: record.no, value: e || 0 })}
                            status={props.errorsGift[record.no]?.price ? 'error' : ''}
                            precision={2}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          />
                          {props.errorsGift[record.no]?.price && (
                            <div className='text-[#ff4d4f]'>{props.errorsGift[record.no]?.price}</div>
                          )}
                        </>
                        
                          // {props.errorsGift[record.no]?.[data.no]?.price && (
                          //   <div className='text-[#ff4d4f]'>{props.errorsGift[record.no][data.no].price}</div>
                          // )}
                                 
                      )
                      // return (
                      //   <Row gutter={[ 8, 8 ]} align={'middle'}>
                         
                      //     {
                      //       record.choices?.map((data, index)=>{
                      //         return(
                      //           <>
                      //             <Col span = {12}>
                      //               <InputNumber 
                      //                 min={0}
                      //                 placeholder='มูลค่า (บาท)'
                      //                 className='w-full'
                      //                 value={data.price}
                      //                 onChange={(e) => props.onChangeGiftValue({ no: data.no, recordNo: record.no, value: e || 0 })}
                      //                 status={props.errorsGift[record.no]?.[data.no]?.price ? 'error' : ''}
                      //                 precision={2}
                      //                 formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      //               />
                      //               {props.errorsGift[record.no]?.[data.no]?.price && (
                      //                 <div className='text-[#ff4d4f]'>{props.errorsGift[record.no][data.no].price}</div>
                      //               )}
                      //             </Col>
                      //             <Col span={12}>
                      //               <Select
                      //                 value={data.isActive}
                      //                 onChange={(e) => props.onChangeGiftChoiceStatus({ no: data.no, recordNo: record.no, value: e })}
                      //                 style={{ width: "100%" }}
                      //               >
                      //                 <Select.Option value={true}>ใช้งาน</Select.Option>
                      //                 <Select.Option value={false}>ไม่ใช้งาน</Select.Option>
                      //               </Select>
                      //             </Col>
                      //           </>
                               
                      //         )
                      //        }) 
                      //     }
                      //   </Row>
                      // )
                      
                    }
                  },
                  // {
                  //   key: "image",
                  //   dataIndex: "image",
                  //   title: "รูปภาพ รายการ",
                  //   width: 300,
                  //   render: (_, record) => {
                  //     return(
                  //       <Row gutter={[ 8, 8 ]} align={'top'}>
                  //         <Col  span={12}>
                  //           <Upload
                  //             accept="image/*"
                  //             maxCount={1}
                  //             listType="picture"
                  //             onChange={(info) => {props.onChangeUploadImgGift({file: info.file, no: record.no})}}
                  //             showUploadList={false}
                  //             style={{ width: "100%" }}
                  //           >
                  //             <Button   style={{ width: "100%" }}>อัปโหลด รูปภาพ</Button>
                  //           </Upload>
                  //           {props.errorsGift[record.no]?.imageUrl  && (
                  //             <div className='text-[#ff4d4f]'>{props.errorsGift[record.no]?.imageUrl}</div>
                  //           )}
                  //         </Col>
                  //         <Col  span={12}>
                  //           {record.imageUrl && 
                  //             (
                              
                  //               <Image key={record.no} src={record.imageUrl} alt="Uploaded Image"  style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                      
                  //             )
                  //           }
                  //         </Col>
                  //       </Row>
                  //     )
                  //     // return (
                  //     //   <Row gutter={[ 8, 8 ]} align={'top'}>
                         
                  //     //     {
                  //     //       record.choices?.map((data, index)=>{
                  //     //         return(
                  //     //           <>
                  //     //             <Col  span={12}>
                  //     //               <Upload
                  //     //                 accept="image/*"
                  //     //                 maxCount={1}
                  //     //                 listType="picture"
                  //     //                 onChange={(info) => {props.onChangeUploadImgGift({file: info.file, no: data.no, recordNo: record.no})}}
                  //     //                 showUploadList={false}
                  //     //                 style={{ width: "100%" }}
                  //     //               >
                  //     //                 <Button   style={{ width: "100%" }}>อัปโหลด รูปภาพ</Button>
                  //     //               </Upload>
                  //     //               {props.errorsGift[record.no]?.[data.no]?.imageUrl && (
                  //     //                 <div className='text-[#ff4d4f]'>{props.errorsGift[record.no][data.no].imageUrl}</div>
                  //     //               )}
                  //     //             </Col>
                  //     //             <Col  span={12}>
                  //     //               {data.imageUrl && 
                  //     //                 (
                                      
                  //     //                   <Image key={data.no} src={data.imageUrl} alt="Uploaded Image"  style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
                              
                  //     //                 )
                  //     //               }
                  //     //             </Col>
                  //     //           </>
                               
                  //     //         )
                  //     //        }) 
                  //     //     }
                  //     //   </Row>
                  //     // )
                      
                  //   }
                  // },
                  {
                    key: "isActive",
                    dataIndex: "isActive",
                    title: "สถานะ",
                    width: 150,
                    render: (_, record) => {
                      return (
                        <Select
                          value={record.isActive}
                          options={[{label: "ใช้งาน", value: true}, {label: "ไม่ใช้งาน", value: false}]}
                          onChange={(e) => props.onChangeStatusGift({ no: record.no, value: e })}
                          className='w-full'
                          // labelInValue={false}
                        />
                      )
                    }
                  }
                  // {
                  //   key: 'giftValue',
                  //   dataIndex: 'giftValue',
                  //   title: 'มูลค่า (บาท)',
                  //   render: (_, record) => {
                  //     if(record.isFromDataBase){
                  //       return record.giftValue;
                  //     }
                  //     else{
                  //       return (
                  //         <>
                  //           <InputNumber
                  //             value={record.giftValue}
                  //             onChange={(e) => props.onChangeGiftValue({ id: record.id, value: e || 0 })}
                  //             isActive={props.errorsGiftValue[record.id] ? 'error' : ''}
                  //             min={0}
                  //           />
                  //           {
                  //             props.errorsGiftValue[record.id] &&  
                  //             <div className='text-[#ff4d4f]'>{props.errorsGiftValue[record.id]}</div>
                  //           }
                  //         </>
                  //       )
                  //     }
                  //   }
                  // }
                ]}
                dataSource={props.datasourceGift || []}
                rowKey={'no'}
                pagination={false}
                rowSelection = {{
                  selectedRowKeys: props.rowSelectedTableGift,
                  onChange: props.onChangeRowSelectionGift,
                  // getCheckboxProps: (record) => ({
                  //   style: record.no === 1 ? { display: 'none' } : {},
                  // }),
                }}
                scroll={{ x: 'max-content' }}
              />
            </Col>
          </Row>
        </Card>
      </>
    )
  }
  
  

export default PromotionManagementCrudContainer;