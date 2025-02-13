import { CrudMode } from "@/utils/type/crud-types";

export interface VehicleTypeCrudContainerProps {
    // Any additional props for the container
}

export interface VehicleTypeCrudContentProps extends VehicleTypeCrudContentState { 
   
    onSubmitForm: (values: VehicleTypeCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  VehicleTypeCrudContentState{
    mode: CrudMode;
}

export interface VehicleTypeCrudContentForm {
    
}