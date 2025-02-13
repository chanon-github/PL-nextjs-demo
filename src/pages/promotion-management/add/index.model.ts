import { CrudMode } from "@/utils/type/crud-types";
import { ApiResponse } from "@/hooks/api/use-api";
import { CarBrandApiApiMasterCarBrandGetGetRequest, CrtProductCrtProductPagination, CrtVehicleMasterVehicleMasterSearchOutputPagination, CrtVehicleModelVehicleModelSearchOutputPagination, CtlMstCarBrandCtlMstCarBrandPagination, FileUploadOutput, ProductApiApiProductGetGetRequest, VehicleMasterSearchOutput, VehicleModelApiApiMasterVehicleModelGetGetRequest, VehicleModelSearchOutput } from "@/services/central-api/generated";
import { CrtPackageCrtPackagePagination, CrtPromotionPromotionSearchOutputPagination, PackageApiApiPackageSearchGetRequest, PackageItemSearchOutputPackageItemSearchOutputPagination, PromotionApiApiPromotionGetIdGetRequest, PromotionApiApiPromotionSearchGetRequest, PromotionItem, PromotionOutput } from "@/services/rental-api/generated";
import { UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { Dayjs } from "dayjs";
export interface PromotionManagementCrudContainerProps {
    // Any additional props for the container
}

export interface PromotionManagementCrudContentProps extends PromotionManagementCrudContentState { 
    onChangePage: (page: number, pageSize: number) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitForm: () => void;
    onClickAddGiftList: () => void;
    onClickDeleteGiftList: () => void;
    onChangeRowSelectionGift: (selectedRowKeys: Array<number | string>)=> void;
    onChangeRowSelectionCar: (selectedRowKeys: Array<number | string>)=> void;
    onChangeRowSelectionDisCount: (selectedRowKeys: Array<number | string>)=> void;
    onChangeGiftGroup: (params :{ no: number; value: string}) => void;
    // onChangeGiftList: (params :{ recordNo: number,no: number; value: string}) => void;
    onChangeGiftList: (params :{ no: number; value: string; price: number;}) => void;
    // onChangeGiftValue: (params :{ no: number; recordNo: number; value: number}) => void;
    onChangeGiftValue: (params :{ no: number; value: number}) => void;
    onClickAddCarTable: () => void;
    onClickDeleteCarTalbe: () => void;
    onChangeDiscountPercent: (params :{ no: number; value: number}) => void;
    onChangeDiscountBaht: (params :{ no: number; value: number}) => void;
    onChangeCoverPrice: (params :{ no: number; value: number}) => void;
    onClickAddAllData: () => void;
    onChangeCarBrand: (params :{ no: number; vehicleMasterId: number; brandName?: string; modelName?: string;}) => void;
    onClickAddChoiceGift: (params :{recordNo: number}) => void;
    onDeleteChoice: (params :{recordNo: number,no: number;}) => void;
    onChangeUploadImgPromotion: (params: { file: UploadFile, fileList: UploadFile[] })=> void;
    onChangeUploadImgGift: (params: { file: UploadFile; no: number })=> void;
    onChangeStatusCar: (params :{ no: number; value: boolean}) => void;
    onChangeStatusGift: (params :{ no: number; value: boolean}) => void;
    onChangeGiftChoiceStatus: (params :{ no: number; recordNo: number; value: boolean}) => void;
    onCloseModalConfirm: () => void;
    onClickToPreviousePage: () => void;
    onClickShowModalConfirmDeleteCarList: () => void;
    onClickShowModalConfirmDeleteGiftList: () => void;
    onClickSetCondition: (params :{ no: number;}) => void;
    onChangeMinDay: (params :{ no: number; value: number}) => void;
    onChangeCoverPriceCondition: (params :{ no: number; value: number}) => void;
    onChangeDiscountPercentCondition: (params :{ no: number; value: number}) => void;
    onChangeDiscountBahtCondition: (params :{ no: number; value: number}) => void;
    onChangStatusDisCountPrice: (params :{ no: number; value: boolean}) => void;
    onClickAddCarTableCondition: () => void;
    onClickShowModalConfirmDeleteCarListCondition: () => void;
    onChangePricePackageCondition: (params :{ no: number; value: number}) => void;
    onChangeMinDayPackageCondition: (params :{ no: number; value: number}) => void;
    onChangeStatusPackageCondition: (params :{ no: number; value: boolean}) => void;
    onChangeUploadImgPackageCondition: (params: { file: UploadFile; no: number })=> void;
    onChangePackageIdCondition: (params :{ no: number; value: string; }) => void;
    onChangePackageItemCodeCondition: (params :{ no: number; value: string; price: number;}) => void;

    onChangePriceGiftCondition: (params :{ no: number; value: number}) => void;
    onChangeMinDayGiftCondition: (params :{ no: number; value: number}) => void;
    onChangeStatusGiftCondition: (params :{ no: number; value: boolean}) => void;
    onChangeUploadImgGiftCondition: (params: { file: UploadFile; no: number })=> void;
    onChangeGiftCondition: (params :{ no: number; value: string}) => void;
    onChangeGiftItemCodeCondition: (params :{ no: number; value: string; price: number;}) => void;


    onClickDeleteDiscountCondition: () => void;
    onCloseModalDiscountCondition: () => void;

    onClickAddPackage: () => void;
    onClickShowModalDeletePackage: () => void;
    onChangeRowSelectionPackage: (selectedRowKeys: Array<number | string>)=> void;
    onClickDeletePackage: () => void;
    onCloseModalPackage: () => void;

    onClickAddGiftCondition: () => void;
    onClickShowModalDeleteGiftCondition: () => void;
    onChangeRowSelectionGiftCondition: (selectedRowKeys: Array<number | string>)=> void;
    onClickDeleteGiftCondition: () => void;
    onCloseModalGiftCondition: () => void;

    onClickSubmitModalConditon: () => void;
    onCloseModalConditon: () => void;

    onClickCloseAlertChangePage: () => void;
    onClickOpenAlertChangePage: () => void;
    onClickConfirmAlertChangePage: () => void;
}

export interface  PromotionManagementCrudContentState{
    mode: CrudMode;
    page: number;
    pageSize: number;
    datasourceGift?: Array<TableGift>;
    datasourceCar?: Array<TableCar>;
    dataSourceCarCondition?: TableCarCondition;
    noRecordCar: number;
    rowSelectedTableCar:  Array<number | string>;
    rowSelectedTableGift: Array<number | string>;
    rowSelectedTableDisCount: Array<number | string>;
    rowSelectedTablePackage: Array<number | string>;
    rowSelectedTableGiftCondition: Array<number | string>;
    errorsGiftGroup: Record<number, string>;
    errorsGiftList: Record<number, string>;
    errorsGiftValue: Record<number, string>;
    useApiProduct:  ApiResponse<CrtProductCrtProductPagination, ProductApiApiProductGetGetRequest | undefined>;
    useApiVehicleMaster:  ApiResponse<CrtVehicleMasterVehicleMasterSearchOutputPagination, VehicleModelApiApiMasterVehicleModelGetGetRequest  | undefined>;
    useApiCarBrand: ApiResponse<CtlMstCarBrandCtlMstCarBrandPagination, CarBrandApiApiMasterCarBrandGetGetRequest | undefined>;
    useApiVehicleModel: ApiResponse<CrtVehicleModelVehicleModelSearchOutputPagination, VehicleModelApiApiMasterVehicleModelGetGetRequest | undefined>;
    useApiPromotionGet: ApiResponse<CrtPromotionPromotionSearchOutputPagination, PromotionApiApiPromotionSearchGetRequest | undefined>;
    useApiPromotionGetById: ApiResponse<PromotionOutput, PromotionApiApiPromotionGetIdGetRequest>;
    useApiPackageMainApi:  ApiResponse<CrtPackageCrtPackagePagination, PackageApiApiPackageSearchGetRequest | undefined>;
    useApiPackageSubMainApi: ApiResponse<CrtPackageCrtPackagePagination, PackageApiApiPackageSearchGetRequest | undefined>;
    errorsGift: ErrorsGift;
    errorsCar: ErrorsCar;

    errorsGiftCondition: ErrorsGift;
    errorsPackageCondition: ErrorsGift;
    errorsDiscountCondition: ErrorsDisCount;

    imagePromotion?: ImagePromotion;
    isModalConfirmVisible: boolean;
    isShowModalDeleteCar: boolean;
    isShowModalDeleteGift: boolean;
    isShowModalConditionCar: boolean;
    isShowModalDeleteDiscountCar: boolean;
    isShowModalDeletePackage: boolean;
    isShowModalDeletGiftCondition: boolean;
    isShowAlertChangePage: boolean;
    // imagePromotionCash?: RcFile;
}

export interface FormSelect{
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
    startDateToUse: Date;
    endDateToUse: Date;
    productId: number;
    productNumber: number;
    method: string;
    payment: string[];
    isActive: boolean;
    img: string;
////
    minimumDay: number;
    discountPerDay: number;
    discountPercentPerDay: number;
  }

  export interface ImagePromotion{
    imagUrl: string; 
    file?: RcFile;
  }
  export interface ErrorsGift {
    [recordNo: number]: {
      packageCode?: string;
      packageItemCode?: string;
      price?: string;
      imageUrl?: string;
      minDay?:string;
      // [choiceNo: number]: {
      //   nameTh?: string;
      //   price?: string;
      //   imageUrl?: string;
      // };
    };
  }

  export interface ErrorsCar {
    [recordNo: number]: {
      vehicleMasterId?: string;
      price?: string;
      netPrice?: string;
      priceDiscount?: string;
      percentDiscount?: string;
    };
  }

  export interface ErrorsDisCount {
    [recordNo: number]: {
      price?: string;
      priceDiscount?: string;
      discountPercent?: string;
      minDay?: string;
    };
  }

  export interface TableGift {
    promotionId?: number;
    id?: number;
    no: number;
    nameTh?: string;
    // choices?: Array<Choices>;
    // packageItemCode?: string;
    imageUrl?: string | null;
    giftValue?: number;
    price?: number | null;
    minDay?: number | null;
    packageCode?: string;
    packageItemCode?: string | null;
    isFromDataBase: boolean;
    vehicleMasterId?: number;
    dataSourcePacakgeItem?: PackageItemSearchOutputPackageItemSearchOutputPagination | null
    // isDelete: boolean;
    isActive?: boolean;
  }

  export interface Choices{
    no: number;
    id?: number;
    promotionItemId?: number;
    nameTh?: string;
    price?: number;
    isFromDataBase: boolean;
    // isDelete: boolean;
    imageUrl?: string;
    imageFile?: RcFile;
    fileUpload?:FileUploadOutput;
    isActive?: boolean;
  }

  export interface TableCar{
    id?: number;
    no: number;
    promotionId?: number;
    vehicleMasterId?: number;
    brandName?: string;
    modelName?: string;
    price?: number;
    netPrice?: number;
    priceDiscount?: number;
    percentDiscount?: number;
    isActive?: boolean;
    dataSourceVehicleMaster?: VehicleMasterSearchOutput[] | null;
    // modelCarDataSource?: Array<VehicleModelSearchOutput> | null;
    isFromDataBase: boolean;
    
    mainPackage?: Array<TableGift> | null;
    miscPackage?: Array<TableGift> | null;
    packageDiscounts?: Array<TableDiscount> | null;

    dataSourceCarCondition?: TableCarCondition;
    // isDelete: boolean;
  }

  export interface TableCarCondition{
    id?: number;
    no?: number;
    promotionId?: number;
    vehicleMasterId?: number;
    brandName?: string;
    modelName?: string;
    // price?: number;
    // netPrice?: number;
    // priceDiscount?: number;
    // percentDiscount?: number;
    isActive?: boolean;
    mainPackage?: Array<TableGift> | null;
    miscPackage?: Array<TableGift> | null;
    packageDiscounts?: Array<TableDiscount> | null;
    // modelCarDataSource?: Array<VehicleModelSearchOutput> | null;
    isFromDataBase?: boolean;
    // isDelete: boolean;
  }

  export interface TableDiscount{
    no?: number;
    price?: number;
    totalPrice?: number;
    discountPercent?: number;
    discountPrice?: number;
    minDay?: number;
    isActive?: boolean;
    isFromDataBase: boolean;
    promotionId?: number;
    vehicleMasterId?: number;
    id?: number;
  }

  export interface TablePackage{
    no: number;
    price?: number;
    minDay?: number;
    packageId?: string;
    packageItemCode?: string;
    isFromDataBase: boolean;
    isActive?: boolean;
    vehicleMasterId?: number;
    imageUrl?: string;
    dataSourcePacakgeItem?: PackageItemSearchOutputPackageItemSearchOutputPagination | null
  }