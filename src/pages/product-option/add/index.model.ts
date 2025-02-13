import { CrudMode } from "@/utils/type/crud-types";

export interface ProductOptionCrudContainerProps {
    // Any additional props for the container
}

export interface ProductOptionCrudContentProps extends ProductOptionCrudContentState { 
   
    onSubmitForm: (values: ProductOptionCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  ProductOptionCrudContentState{
    mode: CrudMode;
}

export interface ProductOptionCrudContentForm {
    
}