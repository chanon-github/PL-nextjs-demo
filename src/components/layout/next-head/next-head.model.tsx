/**
 *  NextHead - Model
 */

export namespace INextHeadProps {
  export interface Main {
    title?: string;
    description?: string;
    ogUrl?: string;
    ogImage?: string;
    twitterUrl?: string;
    twitterImage?: string;
    showSidebar?: boolean;
    allowAnonymous?: boolean;
  }
}