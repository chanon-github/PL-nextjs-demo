/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  UploadFile - Main
 */

import {
  type FC,
  type ReactElement,
  useEffect,
  useState
} from 'react';

import type { UploadFileProps } from './upload-file.model';
import { Col, Form, Row, Upload, UploadFile, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import useApi from '@/hooks/api/use-api';
import { fileApi } from '@/services/central-api';
import { notify } from '@/utils/functions/notification';

// import {} from './upload-file.presets';

const UploadFileMain: FC<UploadFileProps.Main> = (props: UploadFileProps.Main): ReactElement => {
  /** Hook section */
  const [ imageUrl, setImageUrl ] = useState<string | undefined>(undefined);
   
  const useApiFileUpload = useApi(fileApi, fileApi.apiFileUploadPost);
  useEffect(() => {
    // if(props.imageUrl){
    //   console.log('test==>>', props.imageUrl)
    //   setImageUrl(props.imageUrl);
    // }
    setImageUrl(props.imageUrl);
  }, [props.imageUrl]);

  /** Functionality section */
  const onChangeUploadImg = (params: { file: UploadFile;}) =>{
      if (params.file.status === 'done') {
        const originFileObj = params.file.originFileObj;
        // console.log('test==>>', originFileObj)
        if (originFileObj) {
          useApiFileUpload.fetch({
            fileType: "pub-content",
            file: originFileObj,
            docType: "vehicle"
          }).then((res) => {
            if(res.data){
              setImageUrl(res.data?.url || undefined);
              if(props.onGetImageUrlUploaded){
                props.onGetImageUrlUploaded(res.data?.url || undefined);
              }
             
              // formSearch.setFieldsValue({imageUrl: res.data?.url || ""});
              notify({ title: 'ทำการ อัพโหลดรูป สำเร็จ', type: 'success' });
            }
            else{
              notify({ title: 'ทำการ อัพโหลดรูป ไม่สำเร็จ', type: 'error' });
            }
          });
        } else {
          console.error("No original file object available.");
        }
      }
  }
  return (
    // <Col xs={24} md={12}>
      <Row gutter={[ 8, 8 ]}>
        <Col >
          <Form.Item
            label = {props.label ? props.label : "อัพโหลด รูปภาพ"}
            name = {props.name ? props.name : "imageUrl"}
            rules={[{ required: props.isRequired ? true : false, message: 'กรุณาเลือก อัพโหลด รูปภาพ' }]}
          >
            {/* <Upload
              accept="image/*"
              maxCount={1}
              listType="picture"
              onChange={(info) => {props.onChangeUploadImg({file: info.file})}}
              showUploadList={false}
              style={{ width: "100%" }}
            >
              <Button   style={{ width: "100%" }}>อัปโหลด รูปภาพ</Button>
            </Upload> */}
            {/* <UploadFileComponent onGetImageUrlUploaded={props.onGetImageUrlUploaded} /> */}
            <Upload.Dragger
              accept="image/*"
              maxCount={1}
              listType="picture"
              onChange={(info) => {onChangeUploadImg({file: info.file})}}
              showUploadList={false}
              customRequest={({ onSuccess }) => setTimeout(() => { 
                if(onSuccess){
                  onSuccess("ok"); 
                }
                
              }, 0) }
              // style={{ width: "100%" }}
              // beforeUpload={() => (false)}
            >
               <Row justify={'center'} align={'middle'}>
                  <Col span={24} className='flex justify-center'>
                    <InboxOutlined />
                  </Col>
                  <Col span={24} className='flex justify-center'>
                    <div className='p-1 flex items-center'>
                      <div className='text-[#6DC067] mr-1'>อัปโหลด </div>
                      หรือวางไฟล์ที่นี่
                    </div>
                  </Col>
                  <Col span={24} className='flex justify-center'>
                    <p className="ant-upload-hint">
                      SVG, PNG, JPG (max. 800x400px)
                    </p>
                  </Col>
                </Row>
            </Upload.Dragger>
          </Form.Item>
        </Col>
        {
          imageUrl && (
            <Col>
              <Form.Item
                  label = " "
              >
                <Image  src={imageUrl} style={{ width: "2rem", height: "2rem", marginLeft: "1rem" }} /> 
              </Form.Item>
            
            </Col>
          )
        }           
      </Row>     
    // </Col>
  );
}

export default UploadFileMain;