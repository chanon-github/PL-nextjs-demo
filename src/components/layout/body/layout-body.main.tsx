/**
 *  LayoutBody - Main
 */

import { Layout } from 'antd';
import { useEffect, type FC, type ReactElement } from 'react';

import type { LayoutBodyProps } from './layout-body.model';

const LayoutBodyMain: FC<LayoutBodyProps.Main> = (props: LayoutBodyProps.Main): ReactElement => {
  /** Hook section */

  useEffect(() => {}, []);

  return (
    <Layout.Content className={['mini-scrollbar w-full h-full overflow-y-scroll p-[24px]'].join(' ')} 
     
    >
      {props.children}
    </Layout.Content>
  );
};

export default LayoutBodyMain;
