import React, { useState } from 'react';
import { Upload, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface'
import { parseFilenameByUrl } from '../common';
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { ResponseData, ResponseError } from '@/services/CommonTypes';

interface ImgUploaderProps {
  value?: string
  onChange: (newImgUrl: string) => void;
}

const ImgUploader: React.FC<ImgUploaderProps> = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const getUploadContent = () => {
    if (props.value) {
      return null;
    }
    return (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>点击上传</div>
      </div>
    )
  }
  const getFileList = (): UploadFile[] => {
    if (props.value) {
      return [{
        uid: props.value,
        name: parseFilenameByUrl(props.value),
        url: props.value
      }];
    }
    return [];
  }
  const customRequestHandle = async (p: UploadRequestOption) => {
    const formData = new FormData();
    formData.append(p.filename as string, p.file);
    const request = new Request(p.action, {
      method: 'POST',
      body: formData
    });
    const resp: ResponseData<string> | ResponseError = await fetch(request).then(resp => resp.json());
    if (resp.err) {
      message.error(`上传失败：${resp.err}`);
    } else {
      props.onChange(resp.data!);
    }
  }
  const removeHandle = () => {
    props.onChange('');
  }
  const previewHandle = () => {
    setPreviewVisible(true);
  }
  const hidePreviewHandle = () => {
    setPreviewVisible(false);
  }

  return (
    <>
      <Upload
        action="/api/upload"
        name="imgFile"
        accept=".jpeg,.jpg,.png,.gif"
        listType="picture-card"
        fileList={getFileList()}
        customRequest={customRequestHandle}
        onRemove={removeHandle}
        onPreview={previewHandle}
      >
        {getUploadContent()}
      </Upload>
      <Modal
        visible={previewVisible}
        title="图片预览"
        onCancel={hidePreviewHandle}
        onOk={hidePreviewHandle}
      >
        <img style={{ width: '100%' }} src={props.value} />
      </Modal>
    </>
  );
};

export default ImgUploader;
