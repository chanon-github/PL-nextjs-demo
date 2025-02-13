import { CrudMode } from "@/utils/type/crud-types";

export interface VehicleItemCrudContainerProps {
    // Any additional props for the container
}

export interface VehicleItemCrudContentProps extends VehicleItemCrudContentState { 
   
    onSubmitForm: (values: VehicleItemCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  VehicleItemCrudContentState{
    mode: CrudMode;
}

export interface VehicleItemCrudContentForm {
    
}