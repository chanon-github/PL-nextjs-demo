import React, { ReactElement } from 'react';
import { Modal, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { CustomButton } from '../button/button';
export interface ConfirmModalProps {
    visible: boolean;
    icon?: React.ReactNode;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void; // Corrected the return type
    onCancel?: () => void;
    confirmButtonColor?: string;
    hoverConfirmColor?:string;
    iconBackgroundColor?: string;
  }
export const ConfirmModal = ({
  visible,
  icon = <EditOutlined style={{ fontSize: '36px' }} />, // Default icon
  title,
  confirmText = 'ตกลง', // Default confirm button text
  cancelText = 'ยกเลิก', // Default cancel button text
  onConfirm,
  onCancel,
  hoverConfirmColor ='',
  confirmButtonColor = '#FFC107', // Default color for confirm button
  iconBackgroundColor = 'bg-yellow-400', // Default icon background color
}: ConfirmModalProps): ReactElement => {
  return (
    <Modal
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={null} // Custom footer
      centered
      width={400}
    >
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`text-white rounded-full p-4 ${iconBackgroundColor}`}>
            {icon}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-6">{title}</h2>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">

          <CustomButton
                          text={cancelText}
                          // type="primary"
                          onClick={onCancel}
                          className="bg-white text-pl-primary border-pl-primary !important w-full md:w-auto mr-3"
           />
         
          { onConfirm && <CustomButton
                          text={confirmText}
                          type="primary"
                          onClick={onConfirm}
                          hoverColor={hoverConfirmColor}
                          className= {`${confirmButtonColor} text-white  !important w-full md:w-auto mr-3`}
                          
           />}
        </div>
      </div>
    </Modal>
  );
};
