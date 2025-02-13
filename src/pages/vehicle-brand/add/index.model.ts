import { CrudMode } from "@/utils/type/crud-types";

export interface VehicleBrandCrudContainerProps {
    // Any additional props for the container
}

export interface VehicleBrandCrudContentProps extends VehicleBrandCrudContentState { 
   
    onSubmitForm: (values: VehicleBrandCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  VehicleBrandCrudContentState{
    mode: CrudMode;
}

export interface VehicleBrandCrudContentForm {
    
}