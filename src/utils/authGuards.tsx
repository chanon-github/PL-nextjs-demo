import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Constants } from './constants-menu';

const useAuthGuard = (props?: AuthGuardProps) => {
  const router = useRouter();
  const { isReady, asPath, pathname } = router;
  const menu = Constants.menus;
  const [isInWhiteList, setIsInWhiteList] = useState(false);

  console.log('authGuaed => ', props);
  console.log('Constants => ', menu);
  console.log('pathname => ', pathname);

  useEffect(() => {
    const whiteListDefult = ['/', '/appraisal-cms'];
    const roleMenu = props?.whiteList || [];
    const whiteListMenu = menu
      .map((item: any) => item.children)
      .flat(2)
      .filter((item: any) => roleMenu.includes(item.key));
    const whiteListMenuArray = whiteListMenu.map((item: any) => item.link);
    const whiteList = [...whiteListDefult, ...whiteListMenuArray];
    const checkInWhiteList = whiteList.some((item: any) => item.startsWith(pathname));

    console.log('whiteList => ', whiteList);
    console.log('checkInWhiteList => ', checkInWhiteList);
    setIsInWhiteList(checkInWhiteList);
  }, []);

  useEffect(() => {
    if (isInWhiteList != true) {
      //router.push('/403');
    }
  }, [isInWhiteList]);

  //let defaultWhiteList = ['401', '404', '403', '405', 'login', 'welcome'];
  // let whiteList = [''];
  //   const generateRoutes = (type: Array<string>): string[] => {
  //     const baseRoute = type;
  //     return [
  //       `${baseRoute}/view/[id]`,
  //       `${baseRoute}/[id]`,
  //       `${baseRoute}/create`,
  //       `${baseRoute}/reset-password/[id]`,
  //     ];
  //   };
  //   let generatePaths: any = [];
  //   if (props?.whiteList) {
  //     generatePaths = props?.whiteList.flatMap((type: any) =>
  //       generateRoutes(type)
  //     );
  //   }

  //   whiteList = [...whiteList, ...defaultWhiteList, ...(generatePaths || [])].map(
  //     (path: string) => '/' + path
  //   );
  // console.log('🚀 ~ useAuthGuard ~ whiteList:', whiteList);

  //   useEffect(() => {
  //     // info: this condition are not found in whitelist
  //     if (props?.isLoadingPermission) return;

  //     // info: this condition are not found in whitelist
  //     //whiteList.some(item => pathname.includes(item))
  //     //whiteList.includes(pathname)
  //     const isInWhiteList = !whiteList.some((item) => item.includes(pathname));

  //     console.log(
  //       '🚀 ~ file: auth.tsx:30 ~ combinedCondition ~ pathname:',
  //       // whiteList,
  //       // isInWhiteList,
  //       // props?.whiteList,
  //       pathname
  //     );
  //     if (isInWhiteList && props?.whiteList) {
  //       router.push({
  //         query: {
  //           defaultPage: 'welcome',
  //         },
  //         pathname: `/403`,
  //       });
  //     }
  //   }, [props?.whiteList, pathname]);
};

export default useAuthGuard;

export interface AuthGuardProps {
  whiteList?: Array<string>;
  isLoadingPermission?: boolean;
}
