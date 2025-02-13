import { CrudMode } from "@/utils/type/crud-types";

export interface VehicleColorCrudContainerProps {
    // Any additional props for the container
}

export interface VehicleColorCrudContentProps extends VehicleColorCrudContentState { 
   
    onSubmitForm: (values: VehicleColorCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  VehicleColorCrudContentState{
    mode: CrudMode;
}

export interface VehicleColorCrudContentForm {
    
}