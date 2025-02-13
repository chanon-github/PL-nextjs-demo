/**
 *  LayoutHeader - Model
 */
import { ReactNode, CSSProperties } from 'react';
export namespace LayoutHeaderProps {
  export interface Main {
    className?: string;
    style?: CSSProperties; 
    children?: ReactNode;
    isCollapse?: boolean;
    setIsCollapse?: () => void;
  }
}