/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterHotel - Model
 */

import { ApiResponse } from "@/hooks/api/use-api";
import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlMstHotelCtlMstHotelPagination, HotelApiApiMasterHotelGetGetRequest, VehicleTypeApiApiMasterVehicleTypeGetGetRequest } from "@/services/central-api/generated";
import { CrudMode } from "@/utils/type/crud-types";
import { FormInstance } from "antd";

  export interface MasterHotelContainerProps {}

  export interface MasterHotelContentProps extends MasterHotelState {
    onChangePage: (page: number, pageSize: number) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {code: string}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: MasterHotelCrudContentForm) => void;
    onCloseModalForm: () => void;
    onClickDeleteSelected: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
  }

  export interface MasterHotelState {
    pageIndex: number;
    pageSize: number;
    useApiHotelGet: ApiResponse<CtlMstHotelCtlMstHotelPagination, HotelApiApiMasterHotelGetGetRequest | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<MasterHotelCrudContentForm>;
    isVisibleFormMasterHotel: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    keyword: string;
    status: string;
  }

  
  export interface MasterHotelCrudContentForm {

    nameTh: string;
    nameEn: string;
    address: string;
    status: string;
   
  }
  
  