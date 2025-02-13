import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

export const messageAntdCustom = (error: string, type: 'error' | 'success' | 'warning', callback: MessageInstance, config?: any) => {
  message.config({
    rtl: true, // Enable right-to-left text direction
    prefixCls: 'my-message', // Set the prefix for the CSS class name
  });

  const icon =
    type === 'success' ? (
      <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
    ) : type === 'error' ? (
      <CloseCircleOutlined style={{ fontSize: '24px', color: '#ff0000' }} />
    ) : (
      <WarningOutlined style={{ fontSize: '24px', color: '#FAAD14' }} />
    );

  callback.open({
    key: 1,
    duration: config?.duration || 2,
    type: type,
    icon: <></>, // hidden icon
    content: (
      <div className=" w-[fit-content] text-[24px] flex space-x-2 justify-center items-center ">
        {icon}
        <span>{error}</span>
      </div>
    ),
    className: 'custom-class',
    style: {
      marginTop: '50vh',
      padding: 4,
    },
  });
};
