import { ReactNode, CSSProperties } from 'react';

export namespace LayoutSidebarProps {
    export interface Main {
        className?: string;
        style?: CSSProperties; 
        children?: ReactNode;
        menus?: any
        isCollapse?: boolean;
    }
  }