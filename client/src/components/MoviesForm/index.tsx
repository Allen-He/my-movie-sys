import React, { useState, useRef, useEffect } from 'react'
import style from './index.less'
import { Spin, Form, Input, InputNumber, Button, Select, Tag, Space, Switch, message } from 'antd';
import MovieService, { Movie, MovieExtraInfo } from '@/services/MovieService';
import { getRandomColor } from '../common';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'umi';
import ImgUploader from '../ImgUploader';

interface MoviesFormProps extends RouteComponentProps {
  isEdit?: boolean,
  initialValues: Partial<Movie>
}

/** 自定义hook，获取的types、areas数据 */
function useMovieExtraInfo() {
  const [extraInfo, setExtraInfo] = useState({
    types: [],
    areas: []
  } as MovieExtraInfo);
  const [typesToColor, setTypesToColor] = useState(new Map());

  /** 使每一种type随机对应一种颜色 */
  function getTypesToColor(types: string[]) {
    const map = new Map();
    types.forEach(it => {
      map.set(it, getRandomColor());
    });
    return map;
  }

  useEffect(() => {
    MovieService.getExtraInfo().then(extraInfo => {
      setExtraInfo(extraInfo.data);
      setTypesToColor(getTypesToColor(extraInfo.data.types));      
    });
  }, []);
  return {
    extraInfo,
    typesToColor
  };
}

const MoviesForm: React.FC<MoviesFormProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { extraInfo, typesToColor } = useMovieExtraInfo();
  const [curImgFileUrl, setCurImgFileUrl] = useState(props.initialValues.poster);
  const formRef: any = useRef();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    let resp;
    if (props.isEdit) {
      const _id = (props.match.params as any).id;
      resp = await MovieService.eidt(_id, values);
    } else {
      resp = await MovieService.add(values);
    }
    setIsLoading(false);
    if (resp.err === '') {
      const msg = typeof resp.data === 'object' ? '添加成功' : '修改成功';
      message.success(msg, 1);
      if (props.isEdit) {
        console.log(values, resp);
        
        // props.history.push('/movies'); //修改成功后：跳转到“学生查询”页
      } else {
        formRef.current.resetFields(); //提交成功后：重置当前表单
      }
    } else {
      message.error(`添加失败：${resp.err}`, 1);
    }
  };

  const getTypesOptions = () => {
    return extraInfo.types.map(type => ({
      value: type,
    }));
  }
  const getAreasOptions = () => {
    return extraInfo.areas.map(area => ({
      value: area,
    }));
  }

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    };
    return (
      <Tag
        color={typesToColor.get(value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, marginBottom: 1, marginTop: 1 }}
      >
        {label}
      </Tag>
    );
  }

  return (
    <div className={style.formWrap}>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form name="studentForm" ref={formRef}
          labelCol={{ span: 4 }}
          initialValues={props.initialValues}
          onFinish={onFinish}
        >
          <Form.Item label="电影名称" name="name"
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="类型" name="types"
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              options={getTypesOptions()}
            />
          </Form.Item>

          <Form.Item label="地区" name="areas"
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              options={getAreasOptions()}
            />
          </Form.Item>
          
          <Form.Item label="时长" name="duration"
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <InputNumber min={30} max={300} addonAfter="分钟（30~300）" />
          </Form.Item>

          <Form.Item label="即将上映" name="isComing"
            valuePropName='checked'
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
          
          <Form.Item label="是否热门" name="isHot"
            valuePropName='checked'
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>

          <Form.Item label="是否经典" name="isClassic"
            valuePropName='checked'
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
          
          <Form.Item label="电影简介" name="desc"
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <Input.TextArea showCount maxLength={300} style={{ height: 120 }} />
          </Form.Item>

          <Form.Item label="宣传海报" name="poster"
            rules={[
              { required: true, message: '${label} 必填' }
            ]}
          >
            <ImgUploader
              value={curImgFileUrl}
              onChange={(newImgUrl) => {
                setCurImgFileUrl(newImgUrl);
              }}
            />
          </Form.Item>

          <Form.Item style={{textAlign: 'center'}}>
            <Space>
              <Button type="primary" htmlType="reset">
                重置
              </Button>
              <Button type="primary" htmlType="submit">
                {props.isEdit ? '修改' : '添加'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

MoviesForm.defaultProps = {
  isEdit: false
}

export default withRouter(MoviesForm);
