import { CrudMode } from "@/utils/type/crud-types";

export interface MasterVehiclesCrudContainerProps {
    // Any additional props for the container
}

export interface MasterVehiclesCrudContentProps extends MasterVehiclesCrudContentState { 
   
    onSubmitForm: (values: MasterVehiclesCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  MasterVehiclesCrudContentState{
    mode: CrudMode;
}

export interface MasterVehiclesCrudContentForm {
    
}