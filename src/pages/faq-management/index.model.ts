/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { ContentApiApiContentGetGetRequest, ContentCategoryApiApiContentCategoryGetGetRequest, CtlContent, CtlContentCategoryCtlContentCategoryPagination, CtlContentCtlContentPagination } from "@/services/central-api/generated";
import {  PackageItemSearchOutput} from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";
import { MutableRefObject } from "react";

  export interface FaqManagementListContainerProps {}

  export interface FaqManagementContentProps extends FaqManagementState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number;}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: MasterFaqForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onClickToPackageItem: (param: {code: string}) => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlContent> | SorterResult<CtlContent>[],
      extra: TableCurrentDataSource<CtlContent>
    ) => void;
    onChangeUploadImg: (params: { file: UploadFile;}) => void;
    onClickToPreviousePage: () => void;
    handleImageUpload: () => void;
    onGetImageUrlUploaded: (imageUrl?: string) => void;
    // onChange?: (content: string) => void;
  }

  export interface FaqManagementState {
    pageIndex: number;
    pageSize: number;
    useApiFaqGet: ApiResponse<CtlContentCtlContentPagination, ContentApiApiContentGetGetRequest | undefined>
    useApiContentCategory: ApiResponse<CtlContentCategoryCtlContentCategoryPagination, ContentCategoryApiApiContentCategoryGetGetRequest | undefined>
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<MasterFaqForm>;
    isVisibleFormMasterPackage: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
    imageUrl?: string;
    quillRef: MutableRefObject<any>;
  }

  
  export interface FormSearch{
    metaKeyword: string;
    isActive: boolean;
  }

  export interface MasterFaqForm{
    metaKeyword: string;
    metaDescription: Array<string>;
    isActive: boolean;
    description: string;
    content: string;
    imageUrl: string;
    slug: string;
    categoryCode: string;
  }
  