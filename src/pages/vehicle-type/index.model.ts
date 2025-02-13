/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleType - Model
 */
import { 
  CtlMstVehicleType
} from '@/services/central-api/generated';
import {
  
  FormInstance,
  TablePaginationConfig,
  
} from 'antd';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
  export interface VehicleTypeContainerProps {}

  export interface VehicleTypeContentProps extends VehicleTypeState {
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
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;

    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlMstVehicleType> | SorterResult<CtlMstVehicleType>[],
      extra: TableCurrentDataSource<CtlMstVehicleType>
    ) => void
 
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: CtlMstVehicleType[] ,
      changeRows: CtlMstVehicleType[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:CtlMstVehicleType,
      selected: boolean, 
    ) => void; // Handle row selection changes
  }

  export interface VehicleTypeState {
    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:CtlMstVehicleType[] | undefined,
    visible:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
  }

  
  export interface FormSearch{
    typeName: string;
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
  }
  