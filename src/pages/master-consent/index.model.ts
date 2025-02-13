/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterConsent - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import {  ConsentApiApiConsentGetAllGetRequest, ConsentApiApiConsentGetGetRequest, ConsentApiApiConsentSubjectGetAllGetRequest, GetAllConsentItemOutput, GetAllConsentOutputDataResponse, GetConsentOutput, GetConsentOutputDataResponse, GetConsentSubjectOutputDataResponse } from "@/services/central-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import ReactQuill from "react-quill";

  export interface MasterConsentContainerProps {}

  export interface MasterConsentContentProps extends MasterConsentState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {code: string; lang: string; uuid: string;}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: FormSubmit) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<GetAllConsentItemOutput > | SorterResult<GetAllConsentItemOutput >[],
      extra: TableCurrentDataSource<GetAllConsentItemOutput >
    ) => void;
    onChangeSelectionType: (value: string, option: {
        label: string;
        value: string;
    } | {
        label: string;
        value: string;
    }[]) => void;
    onChangeReactQuill: (content: string) => void;
    onChangeSubjectCode: (value: string) => void;
    onChangeLang: (value: string) => void;
  }

  export interface MasterConsentState {
    pageIndex: number;
    pageSize: number;
    useApiMasterConsentGet: ApiResponse<GetAllConsentOutputDataResponse, ConsentApiApiConsentGetAllGetRequest | undefined>
    useApiMasterConsentGetSubjectCode: ApiResponse<GetConsentSubjectOutputDataResponse, ConsentApiApiConsentSubjectGetAllGetRequest | undefined>
    useApiMasterConsentById: ApiResponse<GetConsentOutputDataResponse, ConsentApiApiConsentGetGetRequest | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<FormSubmit>;
    setIsVisibleForm: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
    isDisableAddChoice: boolean;
    isUsedSubjectCode: boolean;
  }

  
  export interface FormSearch{
    subject: string;
    langauge: string;
  }
  export interface FormSubmit{
    name: string;
    lang: string;
    content: string;
    selectionType: string;
    choices: Array<{description: string; value: string;}>;
    subjectCode: string;
    // choices: Array<SaveConsentDetailInput>;
  }
  