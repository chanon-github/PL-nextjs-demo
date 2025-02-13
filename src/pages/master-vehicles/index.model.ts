/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterVehicles - Model
 */

import { ApiResponse } from "@/hooks/api/use-api";
import { 
  // CrtVehicle, 
  // CrtVehicleCrtVehiclePagination, 
  VehicleMasterSearchOutput,
  CrtVehicleMasterVehicleMasterSearchOutputPagination,
  // CrtVehicleVehicleSearchOutputPagination,
  VehicleTypeApiApiMasterVehicleTypeGetGetRequest } from "@/services/central-api/generated";
import { CrudMode } from "@/utils/type/crud-types";
import { FormInstance, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

  export interface MasterVehiclesContainerProps {}

  export interface MasterVehiclesContentProps extends MasterVehiclesState {
    onChangePage: (page: number, pageSize: number) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: MasterVehiclesCrudContentForm) => void;
    onCloseModalForm: () => void;
    onClickDeleteSelected: () => void;
    onClickClearForm: () => void;
    // onChangeTable: (
    //   pagination: TablePaginationConfig,
    //   filters: Record<string, FilterValue | null>,
    //   // sorter: SorterResult<CrtVehicle> | SorterResult<CrtVehicle>[],
    //   // extra: TableCurrentDataSource<CrtVehicle>
    //   sorter: SorterResult<VehicleMasterSearchOutput> | SorterResult<VehicleMasterSearchOutput>[],
    //   extra: TableCurrentDataSource<VehicleMasterSearchOutput>
    // ) => void
  }

  export interface MasterVehiclesState {
    page: number;
    pageSize: number;
    responseMasterVehicle: ApiResponse<CrtVehicleMasterVehicleMasterSearchOutputPagination, VehicleTypeApiApiMasterVehicleTypeGetGetRequest | undefined>;

    // responseMasterVehicle: ApiResponse<CrtVehicleCrtVehiclePagination, VehicleTypeApiApiMasterVehicleTypeGetGetRequest | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<MasterVehiclesCrudContentForm>;
    isVisibleFormMasterVehicle: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
  }

  
  export interface FormSearch{
    search: string;
    status: string;
  }

  export interface MasterVehiclesCrudContentForm {
    chassisNo: string;
    year: number;
    licensePlate: string;
    price: number;
    brandCode: string;
    modelCode: string;
    fuelCode: string;
    colorCode: string;
    engineSize: number;
    vehicleTypeCode: string;
    door: number;
    seat: number;
    gearCode: string;
    status: string;
  }
  