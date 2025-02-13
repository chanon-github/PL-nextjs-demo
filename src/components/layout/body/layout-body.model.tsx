/**
 *  LayoutBody - Model
 */

import type { CSSProperties, ReactNode } from 'react';

export namespace LayoutBodyProps {
  export interface Main {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }
}
