/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  UploadFile - Model
 */

export namespace UploadFileProps {
  export interface Main {
    //
    imageUrl?: string;
    name?: string;
    label?: string;
    isRequired?: boolean;
    onGetImageUrlUploaded?: (imageUrl?: string) => void;
  }
}