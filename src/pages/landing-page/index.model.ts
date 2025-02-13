/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  LandingPage - Model
 */

import { Breakpoint } from "antd";

  export interface LandingPageContainerProps {}

  export interface LandingPageContentProps extends LandingPageState {

    onClickSystemCard : (sysName:string) => void;

  }

  export interface LandingPageState {

    nameUser:string;
    userDisplayName?: string;
    screen: Partial<Record<Breakpoint, boolean>>;
  }

  
  export interface FormSearch{
    search: string
  }
  export enum SystemName {
    CAR_RENTAL = 'CAR_RENTAL',
    MASTER_CENTRAL = 'MASTER_CENTRAL',
    SYSTEM_ADMIN = 'SYSTEM_ADMIN'
  }
  