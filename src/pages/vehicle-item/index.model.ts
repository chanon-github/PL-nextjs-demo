/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleItem - Model
 */

  export interface VehicleItemContainerProps {}
  import {
  
    FormInstance,
    TablePaginationConfig,
    
  } from 'antd';
  
  import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

  import { 
    CtlMstCarBrand,
    CtlMstColor ,
    CrtVehiclePort,
    CrtVehicleLocation,
    VehicleModelSearchOutput,
    VehicleItemSearchOutput,
    VehicleItemApiApiMasterVehicleItemGetGetRequest,
    VehicleMasterSearchOutput
    
    
    
  } from '@/services/central-api/generated';
  export interface VehicleItemContentProps extends VehicleItemState {
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
  

    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleItemSearchOutput> | SorterResult<VehicleItemSearchOutput>[],
      extra: TableCurrentDataSource<VehicleItemSearchOutput>
    ) => void
 
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: VehicleItemSearchOutput[] ,
      changeRows: VehicleItemSearchOutput[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:VehicleItemSearchOutput,
      selected: boolean, 
    ) => void; // Handle row selection changes

  }

  export interface VehicleItemState {
    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:VehicleItemSearchOutput[] | undefined,
    visible:boolean,
    isAllChecked:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
    carBrandLookupData:CtlMstCarBrand[] | undefined |null
    carModelLookupData:VehicleModelSearchOutput[] | undefined |null
    carColorLookupData:CtlMstColor[] |  undefined |null
    carPortLookupData:CrtVehiclePort[] |  undefined |null
    carLocationLookupData:CrtVehicleLocation[] |  undefined |null
    masterVehicleLookupData:VehicleMasterSearchOutput[] |  undefined |null

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
  export interface FormValues extends  Omit<FormSearch,  'carModel'|'carPort'|'carLocation'> {
    carModel:string|null|number
    carPort?:string|null|number;
    carLocation?:string|null|number;
    masterVehicle?:number;
  }

  export interface FormSearch {
    // Add any additional properties specific to FormSearch here if needed
    carBrand?:string;
    carModel?:string;
    licensePlate?:string;
    carChassisNo?:string;
    carPort?:string;
    carLocation?:string;
    carColor?:string;
    status?:string;
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
    

  }
  