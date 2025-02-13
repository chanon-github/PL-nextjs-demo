import { CrudMode } from "@/utils/type/crud-types";

export interface VehicleModelCrudContainerProps {
    // Any additional props for the container
}

export interface VehicleModelCrudContentProps extends VehicleModelCrudContentState { 
   
    onSubmitForm: (values: VehicleModelCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  VehicleModelCrudContentState{
    mode: CrudMode;
}

export interface VehicleModelCrudContentForm {
    
}