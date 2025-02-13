/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  Car - Model
 */
import {
  
  FormInstance,
  
} from 'antd';

  export interface CarContainerProps {}

  export interface CarContentProps extends CarState {
    onChangePage: (
      page: number, pageSize: number
    ) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitSearch: () => void;
    onClearSearch: () => void;
    onClickCheckAll: (param: boolean) => void;
    showTotal: (total: number, range: [number, number]) => string; 
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;
    onSetSelectedValue:()=>void;
    onHandleTableChange: (
      pagination: any,
      filters: any,
      sorter: any
    ) => void;

    onHandleRowSelectionChange: (
      selectedRowKeys: string[], 
      selectedRows: any[]
    ) => void; // Handle row selection changes
    
    onHandleRowSelectionAll: (
      selected: any, 
      selectedRows: any[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:any,
      selected: any, 
      selectedRows: any[]
    ) => void; // Handle row selection changes

  }

  export interface CarState {
    page: number;
    pageSize: number;
    totalData:number;
    vehicleTypeData:any,
    visible:boolean,
    isAllChecked:boolean,
    isLoading:boolean,
    form: FormInstance<any>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysStore:string[]
    myExData:any,
    isTableLoading:boolean
  }

  export interface FormSearch{
    search: string
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
  