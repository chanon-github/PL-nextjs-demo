import { CrudMode } from "@/utils/type/crud-types";

import {
    
    FormInstance,
    TablePaginationConfig,
    
  } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { 
        CtlMstCarBrand,
        CtlMstVehicleType,
        VehicleMasterSearchOutput,
        VehicleModelSearchOutput,
        VehicleGroupDetailOutput
    } from '@/services/central-api/generated';
export interface VehicleGroupCrudContainerProps  {
    // Any additional props for the container
}

export interface VehicleGroupCrudContentProps extends VehicleGroupCrudContentState { 

  onClickToAdd: () => void;
  onSubmitSearch: () => void;
  onClearSearch: () => void;
  onCloseFormModal :() => void;
  onSaveFormModal :() => void;


  //=== For Master Product Table ===//
    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleGroupDetailOutput> | SorterResult<VehicleGroupDetailOutput>[],
      extra: TableCurrentDataSource<VehicleGroupDetailOutput>
    ) => void
    onChangePage: (
      page: number, pageSize: number
    ) => void;
    // onChangePageSize: (param : {pageSize: number}) => void;
  //=================================//

 
  
  //=== For Vehicle Item Table ===//
    onSubmitSearchItemTable: () => void;
    onClearSearchItemTable:()=>void;
    onHandleTableItemChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleMasterSearchOutput> | SorterResult<VehicleMasterSearchOutput>[],
      extra: TableCurrentDataSource<VehicleMasterSearchOutput>
    ) => void
    onChangePageTableItem: (
      page: number, pageSize: number
    ) => void;
    // onChangePageSizeTableItem: (param : {pageSize: number}) => void;

    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: VehicleMasterSearchOutput[] ,
      changeRows: VehicleMasterSearchOutput[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:VehicleMasterSearchOutput,
      selected: boolean, 
    ) => void; // Handle row selection changes
  //===============================//

}

export interface  VehicleGroupCrudContentState{
  page: number;
  pageSize: number;
  totalData:number|undefined;
  dataList:VehicleGroupDetailOutput[] | undefined,
  visible:boolean,
  isLoadingPage:boolean,
  form: FormInstance<FormValues>, 
  saveMode:"ADD"|"EDIT"|null ,
  selectedRowKeysList:(string|number)[]
  isTableLoading:boolean,
  groupName:string| undefined,
  carBrandLookupData:CtlMstCarBrand[] | undefined |null
  carModelLookupData:VehicleModelSearchOutput[] | undefined |null
  carTypeLookupData:CtlMstVehicleType[] | undefined |null
  vehicleItemList:VehicleMasterSearchOutput[]| undefined 


     //=== For Vehicle Master Table ===//
     pageItemTable: number;
     pageSizeItemTable: number;
     totalDataItemTable:number|undefined;
     // dataList:VehicleProductOutput[] | undefined,
     vehicleMasterList:VehicleMasterSearchOutput[]| undefined 
     formSearchManageItem: FormInstance<FormSearch> | undefined
   //=================================//

}

export interface VehicleGroupCrudContentForm {
    
}

export interface FormSearch{
  chassisNo: string;
  carBrand:string;
  carType:string;
  carModel:string;
  status: string;
}


export interface FormValues {
  typeName: string;
  status: string|null;

}


  export interface GetDataParams {
    currentPage: number;
    currentPageSize: number;
    sortOrder?: string; // Optional
    sortField?: string; // Optional
    keywordSearch?: string; // Optional
    status?: string; // Optional
    isLoadingTable?: boolean; // Optional

    carBrand?:string
    carModel?:string
    carType?:string
    carChassisNo?:string
  }
  