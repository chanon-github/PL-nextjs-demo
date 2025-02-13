/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleModel - Model
 */


import { 
  CtlMstCarBrand,
  VehicleModelSearchOutput
} from '@/services/central-api/generated';
import {
  
  FormInstance,
  TablePaginationConfig,
  
} from 'antd';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';


  export interface VehicleModelContainerProps {}

  export interface VehicleModelContentProps extends VehicleModelState {
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

    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<VehicleModelSearchOutput> | SorterResult<VehicleModelSearchOutput>[],
      extra: TableCurrentDataSource<VehicleModelSearchOutput>
    ) => void
 
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: VehicleModelSearchOutput[] ,
      changeRows: VehicleModelSearchOutput[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:VehicleModelSearchOutput,
      selected: boolean, 
    ) => void; // Handle row selection changes
  }

  export interface VehicleModelState {
    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:VehicleModelSearchOutput[] | undefined,
    visible:boolean,
    isAllChecked:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
    carBrandLookpData:CtlMstCarBrand[] | undefined |null
  }

  
  export interface FormSearch{
    status: string
    carModel:string
    carBrand:string
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
  export interface FormValues {
    carBrand:string|null;
    carModel: string|null;
    status: string | undefined;
  }
  
  export interface GetDataParams {
    currentPage: number;
    currentPageSize: number;
    sortOrder?: string; // Optional
    sortField?: string; // Optional
    keywordSearch?: string; // Optional
    status?: string; // Optional
    isLoadingTable?: boolean; // Optional
    carBrand?:string;
    carModel?:string;
  }