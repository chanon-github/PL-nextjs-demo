/**
 *  NextHead - Main
 */

import Helm from 'next/head';
import { useEffect, type FC, type ReactElement } from 'react';

import type { INextHeadProps } from './next-head.model';

const INextHead: FC<INextHeadProps.Main> = (props: INextHeadProps.Main): ReactElement => {
  /** Hook section */

  useEffect(() => {}, []);

  /** Functionality section */

  return (
    <Helm>
      <meta name={'description'} content={props.description || ''} />
      <meta charSet={'UTF-8'} />
      <meta name={'viewport'} content={'initial-scale=1.0, width=device-width'} />
      <meta property={'og:url'} content={props.ogUrl || ''} />
      <meta property={'og:title'} content={props.title || ''} />
      <meta property={'og:description'} content={props.description || ''} />
      <meta property={'og:image'} content={props.ogImage || ''} />
      <meta property={'og:image:width'} content={'1200'} />
      <meta property={'og:image:height'} content={'630'} />
      <meta name={'twitter:site'} content={props.twitterUrl || ''} />
      <meta name={'twitter:card'} content={'summary_large_image'} />
      <meta name={'twitter:image'} content={props.twitterImage || ''} />
      <link rel="icon" type="image/svg+xml" href="/static/images/Group 11440.svg" />
      <title>{` Rental-Car-Cms  ${""}` || ''}</title>
    </Helm>
  );
};

export default INextHead;
