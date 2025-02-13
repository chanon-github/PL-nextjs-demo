/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ModalConfirmCrud - Model
 */

import { CrudMode } from "@/utils/type/crud-types";

export namespace ModalConfirmCrudProps {
  export interface Main {
    //
    mode: CrudMode
    isModalConfirmVisible: boolean;
    rowSelectedTable: Array<number | string>;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit?: () => void;
    onClickConfirmDelete: () => void;
  }
}