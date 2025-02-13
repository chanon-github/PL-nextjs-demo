export interface UserToken {
    nameid: string;
    unique_name: string;
    email: string;
    Role: string;
    TenantCode: string;
    BranchCode: string;
    DivisionCode: string;
    DivisionName: string;
    DepartmentCode: string;
    DepartmentName: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
}