/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ThemeManagement - Model
 */
import {
  
  FormInstance,
  TablePaginationConfig,
  
} from 'antd';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

import { 
  // CtlMstVehicleType,
  CtlMstColor
} from '@/services/central-api/generated';

  export interface ThemeManagementContainerProps {}

  export interface ThemeManagementContentProps extends ThemeManagementState {

    onClickToAdd: () => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitForm: () => void;
    onClearSearch: () => void;
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;

 
  }

  export interface ThemeManagementState {

    totalData:number|undefined;
    dataList:CtlMstColor[] | undefined,
    visible:boolean,
    isLoadingPage:boolean,
    form: FormInstance<any>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
    colorValue:string|undefined|null
  }

  
  export interface FormSearch{
    search: string
  }

  export interface FormValues {
    color: string;
    upload:string;
    // status: string|null;
  
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
  
  