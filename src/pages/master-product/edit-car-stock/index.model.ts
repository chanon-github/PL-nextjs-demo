import { CrudMode } from "@/utils/type/crud-types";


import { 
  CtlMstCarBrand,
    CtlMstVehicleType,
    VehicleItemSearchOutput,
    VehicleModelSearchOutput,
    VehicleStockSearchOutput,
    VehicleMasterSearchOutput
  } from '@/services/central-api/generated';
  import {
    
    FormInstance,
    TablePaginationConfig,
    
  } from 'antd';
  
  import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

export interface MasterProductCrudContainerProps {
    // Any additional props for the container
}

export interface MasterProductCrudContentProps extends MasterProductCrudContentState { 
   
  onClickToAdd: () => void;
  onSubmitSearch: () => void;
  onClearSearch: () => void;
  onCloseFormModal :() => void;
  onSaveFormModal :() => void;


  //=== For Master Product Table ===//
    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleStockSearchOutput> | SorterResult<VehicleStockSearchOutput>[],
      extra: TableCurrentDataSource<VehicleStockSearchOutput>
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

export interface  MasterProductCrudContentState{
     //=== For Master Product Table ===//
     page: number;
     pageSize: number;
     totalData:number|undefined;
     dataList:VehicleStockSearchOutput[] | undefined,
     // form: FormInstance<FormValues>, 
   // ============================ //
 
 
     visible:boolean,
     isLoadingPage:boolean,
     selectedRowKeysList:(string|number)[]
     isTableLoading:boolean,
     productName:string,
     carBrandLookupData:CtlMstCarBrand[] | undefined |null
     carModelLookupData:VehicleModelSearchOutput[] | undefined |null
     carTypeLookupData:CtlMstVehicleType[] | undefined |null
 
 
 
   //=== For Vehicle Master Table ===//
     pageItemTable: number;
     pageSizeItemTable: number;
     totalDataItemTable:number|undefined;
     // dataList:VehicleProductOutput[] | undefined,
     vehicleMasterList:VehicleMasterSearchOutput[]| undefined 
     formSearchManageItem: FormInstance<FormSearch> | undefined
   //=================================//
}

export interface MasterProductCrudContentForm {
    
}


export interface FormSearch{
    chassisNo: string;
    carBrand:string;
    carType:string;
    carModel:string;
    status: string;
  }

  // export interface FormSearch{
  //   chassisNo: string;
  //   carBrand:string;
  //   carType:string;
  //   carModel:string;
  //   status: string;
  // }

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
  