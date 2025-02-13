import { CrudMode } from "@/utils/type/crud-types";

export interface CarCrudContainerProps {
    // Any additional props for the container
}

export interface CarCrudContentProps extends CarCrudContentState { 
   
    onSubmitForm: (values: CarCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  CarCrudContentState{
    mode: CrudMode;
}

export interface CarCrudContentForm {
    
}