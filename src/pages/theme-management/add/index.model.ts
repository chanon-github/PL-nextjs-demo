import { CrudMode } from "@/utils/type/crud-types";

export interface ThemeManagementCrudContainerProps {
    // Any additional props for the container
}

export interface ThemeManagementCrudContentProps extends ThemeManagementCrudContentState { 
   
    onSubmitForm: (values: ThemeManagementCrudContentForm) => void;
    onClickBack: () => void;
}

export interface  ThemeManagementCrudContentState{
    mode: CrudMode;
}

export interface ThemeManagementCrudContentForm {
    
}