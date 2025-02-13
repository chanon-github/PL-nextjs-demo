/**
 *  Antd Design Notification - Main
 */

import { notification } from 'antd';

import type { ReactNode, CSSProperties } from 'react';
export const notify = (args: NotificationArguments) => {
    const _now = Date.now();

    notification.open({
        key: `${ _now }`,
        message: args.title,
        description: args.message,
        type: args.type,
        placement: args.placement,
        style: args.style,
        icon: args.icon,
        duration: args.duration,
        onClose: args.onClose
    });
}

export interface NotificationArguments {
    title: ReactNode;
    message?: ReactNode;
    type?: NotifierType;
    placement?: NotifierPlacement;
    style?: CSSProperties;
    icon?: ReactNode;
  
    /** Duration in seconds (0 for no auto close) */
    duration?: number;
  
    onClose?: () => void;
  }
  
  type NotifierType = 'success' | 'info' | 'warning' | 'error';
  type NotifierPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';