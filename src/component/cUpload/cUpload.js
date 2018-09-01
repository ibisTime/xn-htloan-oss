import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Carousel, Modal, Button, Icon, Form } from 'antd';
import { showErrMsg, formatFile, formatImg, noop, getRealValue } from 'common/js/util';
import { UPLOAD_URL, PIC_PREFIX, PIC_BASEURL_L } from 'common/js/config';

const FormItem = Form.Item;
const fileUploadBtn = <Button><Icon type="upload"/> 上传</Button>;
const imgUploadBtn = (
  <div>
    <Icon type="plus"/>
    <div className="ant-upload-text">上传</div>
  </div>
);

export default class CUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: '',
      previewVisible: false,
      previewId: ''
    };
  }
  // 预览图片
  handlePreview = (file, previewId) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      previewId
    });
  }
  // 隐藏图片
  handleCancel = () => this.setState({previewVisible: false})
  // 获取文件上传的属性
  getUploadProps = ({ initValue, token, keyName, readonly = false,
    single = false, isImg = true, onChange, accept }) => {
    const commProps = {
      action: UPLOAD_URL,
      multiple: !single,
      defaultFileList: initValue,
      data: { token },
      showUploadList: {
        showPreviewIcon: true,
        showRemoveIcon: !readonly
      }
    };
    const fileProps = {
      ...commProps,
      onChange: ({ fileList }) => this.setUploadFileUrl(fileList, false, onChange),
      onPreview: this.handleFilePreview
    };
    const imgProps = {
      ...commProps,
      onChange: ({ fileList }) => {
        this.setUploadFileUrl(fileList, true, onChange);
      },
      onPreview: (file) => {
        this.handlePreview(file, keyName);
      },
      listType: 'picture-card',
      accept: 'image/*'
    };
    if (accept) {
      fileProps.accept = accept;
      imgProps.accept = accept;
    }
    return isImg ? imgProps : fileProps;
  }
  // 获取文件上传的初始值
  getFileInitVal(keyName, initVal, isImg = true) {
    let initValue = [];
    if (initVal) {
      initValue = initVal.split('||').map(key => ({
        key,
        uid: key,
        name: key,
        status: 'done',
        url: isImg ? formatImg(key) : formatFile(key),
        thumbUrl: isImg ? formatImg(key) : formatFile(key)
      }));
    }
    return initValue;
  }
  // 获取文件上传后的key
  normFile = (e) => {
    if (e) {
      return e.fileList.map(v => {
        if (v.status === 'done') {
          return v.key || v.response.key;
        } else if (v.status === 'error') {
          showErrMsg('文件上传失败');
        }
        return '';
      }).filter(v => v).join('||');
    }
    return '';
  };
  // 获取上传按钮
  getUploadBtn(key, getFieldValue, readonly, single, isImg) {
    let btn = isImg ? imgUploadBtn : fileUploadBtn;
    return readonly
      ? null
      : single
        ? getFieldValue(key)
          ? null : btn
        : btn;
  }

  // 格式化文件的url
  setUploadFileUrl(fileList, isImg, callback) {
    let format = isImg ? formatImg : formatFile;
    fileList.forEach(f => {
      if (!f.url && f.status === 'done' && f.response) {
        f.url = format(f.response.key);
        callback && callback(f.response.key);
      }
    });
  }

  // 预览文件
  handleFilePreview = (file) => {
    if (file.status === 'done') {
      let key = file.key || (file.response && file.response.key) || '';
      window.open(formatFile(key), true);
    } else {
      let msg = file.status === 'uploading' ? '文件还未上传完成' : '文件上传失败';
      showErrMsg(msg);
    }
  }
  render() {
    const { keyName, pageData, isLoaded, getFieldDecorator, token, rules, _keys,
      readonly, isSingle, isImg, onChange, accept, getFieldValue, label, hidden,
      formatter, value } = this.props;
    const { previewVisible, previewId } = this.state;
    let initVal = getRealValue({ pageData, _keys, value, formatter, readonly, key: keyName });
    const initValue = this.getFileInitVal(keyName, initVal, isImg);

    return (
      hidden ? null : (
        <FormItem label={label}>
          {
            isLoaded ? (
              getFieldDecorator(keyName, {
                rules,
                initialValue: initVal,
                getValueFromEvent: this.normFile
              })(
                <Upload {...this.getUploadProps({
                  keyName,
                  token,
                  isImg,
                  accept,
                  readonly,
                  isSingle,
                  onChange,
                  initValue
                })}>
                  {this.getUploadBtn(keyName, getFieldValue, readonly, isSingle, isImg)}
                </Upload>
              )
            ) : null
          }
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <div className="previewImg-wrap">
              <Carousel ref={(carousel => this.carousel = carousel)} afterChange={(a) => {
                let url = getFieldValue(previewId).split('||')[a];
                this.imgUrl = PIC_PREFIX + '/' + url + '?attname=' + url + '.jpg';
              }}>{
                previewId && getFieldValue(previewId).split('||').map(v => {
                  let url = PIC_PREFIX + '/' + v + PIC_BASEURL_L;
                  return (<div className='img-wrap' key={v}><img alt="图片" style={{width: '100%'}} src={url}/></div>);
                })
              }</Carousel>
            </div>
            <div className="down-wrap">
              <Button icon="left" onClick={() => this.carousel.prev()}></Button>
              <Button style={{marginLeft: 20}} icon="right" onClick={() => this.carousel.next()}></Button>
              <Button style={{marginLeft: 20}} onClick={() => { location.href = this.imgUrl; }} icon="download">下载</Button>
            </div>
          </Modal>
        </FormItem>
      )
    );
  }
}

CUpload.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  rules: PropTypes.array,
  token: PropTypes.string,
  isImg: PropTypes.bool,
  _keys: PropTypes.array,
  value: PropTypes.string,
  accept: PropTypes.string,
  readonly: PropTypes.bool,
  isSingle: PropTypes.bool,
  hidden: PropTypes.bool,
  onChange: PropTypes.func,
  formatter: PropTypes.func,
  keyName: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  pageData: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

CUpload.defaultProps = {
  label: 'title',
  keyName: 'key',
  getFieldValue: noop,
  getFieldDecorator: noop,
  pageData: {},
  isLoaded: false,
  hidden: false
};
