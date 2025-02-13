import React, { ReactElement, useEffect, useState } from 'react';
import {
    Spin,
    SpinProps,
    Button,
  theme
} from 'antd';
const { useToken } = theme;

export const CustomLoading = (props: CustomLoadingProps&SpinProps): ReactElement => {
 

  return  (
    <div className="flex justify-center items-center ">
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <Spin tip="Loading..." size="large" />
        </div>
    </div>
  );
};

interface CustomLoadingProps{
//  isShowLoading : boolean
}
