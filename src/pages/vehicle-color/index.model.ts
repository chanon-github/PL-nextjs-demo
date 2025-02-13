/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleColor - Model
 */
import {
  
  FormInstance,
  TablePaginationConfig,
  
} from 'antd';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { 
  CtlMstColor 
} from '@/services/central-api/generated';
  export interface VehicleColorContainerProps {}

  export interface VehicleColorContentProps extends VehicleColorState {
    onChangePage: (
      page: number, pageSize: number
    ) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: () => void;
    onClickToEdit: (param : {id: string}) => void;
    onSubmitSearch: () => void;
    onClearSearch: () => void;
    onClickCheckAll: (param: boolean) => void;
    showTotal: (total: number, range: [number, number]) => string; 
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;

    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlMstColor> | SorterResult<CtlMstColor>[],
      extra: TableCurrentDataSource<CtlMstColor>
    ) => void
 
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: CtlMstColor[] ,
      changeRows: CtlMstColor[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:CtlMstColor,
      selected: boolean, 
    ) => void; // Handle row selection changes
  }

  export interface VehicleColorState {
    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:CtlMstColor[] | undefined,
    visible:boolean,
    isAllChecked:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
  }

  
  export interface FormSearch{
    carColor: string
    status:string
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
    carColor: string;
    status: string | null ;
  }

  export interface GetDataParams {
    currentPage: number;
    currentPageSize: number;
    sortOrder?: string; // Optional
    sortField?: string; // Optional
    keywordSearch?: string; // Optional
    status?: string; // Optional
    isLoadingTable?: boolean; // Optional
  }