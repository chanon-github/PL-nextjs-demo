import { CrudMode } from "@/utils/type/crud-types";

export interface MasterVehicleCrudContainerProps {
    // Any additional props for the container
}

export interface MasterVehicleCrudContentProps extends MasterVehicleCrudContentState { 
   
    onSubmitForm: (values: MasterVehicleCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  MasterVehicleCrudContentState{
    mode: CrudMode;
}

export interface MasterVehicleCrudContentForm {
    
}