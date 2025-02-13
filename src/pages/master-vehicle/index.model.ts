/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterVehicle - Model
 */
import {
  
  FormInstance,
  TablePaginationConfig,
  UploadFile,
  
} from 'antd';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

import { 
  CtlMstCarBrand,
  CtlMstColor,
  CtlMstVehicleType,
  VehicleModelSearchOutput,
  CtlMstGear,
  CtlMstFuelType,
  CtlMstEngineType,
  VehicleMasterSearchOutput
} from '@/services/central-api/generated';
import { Dayjs } from 'dayjs';
  export interface MasterVehicleContainerProps {}

  export interface MasterVehicleContentProps extends MasterVehicleState {
    imageUrl: any;
    onChangePage: (
      page: number, pageSize: number
    ) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: () => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitSearch: () => void;
    onClearSearch: () => void;
    onClickCheckAll: (param: boolean) => void;
    showTotal: (total: number, range: [number, number]) => string; 
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;
    onCarBrandChange:(carBrandCode:string)=>void;
    onChangeUploadImg: (params: { file: UploadFile;}) => void;
    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleMasterSearchOutput> | SorterResult<VehicleMasterSearchOutput>[],
      extra: TableCurrentDataSource<VehicleMasterSearchOutput>
    ) => void
 
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: VehicleMasterSearchOutput[] ,
      changeRows: VehicleMasterSearchOutput[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:VehicleMasterSearchOutput,
      selected: boolean, 
    ) => void; // Handle row selection changes

    onGetImageUrlUploaded: (value?: string) => void;

  }

  export interface MasterVehicleState {

    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:VehicleMasterSearchOutput[]|undefined
    visible:boolean,
    isAllChecked:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
    getVehicleTypeData:CtlMstVehicleType[] | undefined,
    carBrandLookupData:CtlMstCarBrand[] | undefined |null
    carModelLookupData:VehicleModelSearchOutput[] | undefined |null
    carColorLookupData:CtlMstColor[] |  undefined |null
    gearTypeLookupData:CtlMstGear[] |  undefined |null
    engineTypeLookupData: CtlMstEngineType[]|  undefined |null
    fuelTypeLookupData: CtlMstFuelType[] |  undefined |null
    
  }

  export interface FormValues extends  Omit<FormSearch,  'carModel'> {
    carModel:string|null|number

  }

  export interface FormSearch {
    carBrand?:string;
    carModel?:string;
    carType?:string;
    imageUrl:string;
    carColor?:string;
    engineType?:string;
    fuelType?:string;
    gearType?:string;
    seatNum?:number;
    door?:number;
    status?:string;
    year?:Dayjs;
    description?:string 
}

  export interface TailwindConfig {
    theme: {
      extend: {
        colors: {
          'pl-primary': string;
          'pl-primay-hover': string;
          'pl-red-hover':string;
          'pl-secondary-hover':string

        };
      };
    };
  }
  export interface GetDataParams {
    currentPage: number;
    currentPageSize: number;
    sortOrder?: string; // Optional
    sortField?: string; // Optional
    keywordSearch?: string; // Optional
    status?: string; // Optional
    isLoadingTable?: boolean; // Optional
    chassisNo?:string
    licensePlate?: string
    brandCode?: string
    modelCode?: string
    colorCode?: string
    vehiclePortId?: number
    vehicleLocationId?: number
    year?:string
    description?:string 

  }
  