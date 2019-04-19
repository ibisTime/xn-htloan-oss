import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Carousel, Modal, Button, Icon, Form } from 'antd';
import { showErrMsg, formatFile, formatImg, noop, getRealValue, isUndefined } from 'common/js/util';
import { UPLOAD_URL, PIC_PREFIX, PIC_BASEURL_L, formItemLayout } from 'common/js/config';

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
  shouldComponentUpdate(nextProps, nextState) {
    return this.isPropsChange(nextProps) || this.isStateChange(nextState);
  }
  // props是否改变
  isPropsChange(nextProps) {
    const { field, isLoaded, token, rules, readonly, isSingle, isImg, isFieldValidating,
      accept, getFieldValue, hidden, initVal, inline, getFieldError } = this.props;
    let nowFiles = getFieldValue(field);
    let flag = this.prevFiles !== nowFiles;
    this.prevFiles = flag ? nowFiles : this.prevFiles;
    let nowErr = getFieldError(field);
    let errFlag = this.isErrChange(nowErr);
    this.prevErr = errFlag ? nowErr : this.prevErr;
    let nowValid = isFieldValidating(field);
    let validFlag = this.isValidChange(nowValid);
    this.prevValid = validFlag ? nowValid : this.prevValid;
    return nextProps.field !== field || nextProps.isLoaded !== isLoaded ||
      nextProps.token !== token || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.isSingle !== isSingle ||
      nextProps.isImg !== isImg || nextProps.accept !== accept ||
      nextProps.hidden !== hidden || nextProps.initVal !== initVal ||
      nextProps.inline !== inline || flag || errFlag || validFlag;
  }
  // 控件的错误信息是否改变
  isErrChange(nextErr) {
    if (isUndefined(this.prevErr) || isUndefined(nextErr)) {
      return isUndefined(this.prevErr) && isUndefined(nextErr) ? false : this.prevErr !== nextErr;
    } else if (this.prevErr.length !== nextErr.length) {
      return true;
    }
    let flag = false;
    this.prevErr.forEach((e, i) => {
      if (e !== nextErr[i]) {
        flag = true;
      }
    });
    return flag;
  }
  // 判断校验状态是否改变
  isValidChange(nowValid) {
    if (isUndefined(this.prevValid) || isUndefined(nowValid)) {
      return isUndefined(this.prevValid) && isUndefined(nowValid) ? false : this.prevValid !== nowValid;
    }
    return this.prevValid !== nowValid;
  }
  // state是否改变
  isStateChange(nextState) {
    const { previewImage, previewVisible, previewId } = this.state;
    return nextState.previewImage !== previewImage || nextState.previewVisible !== previewVisible ||
      nextState.previewId !== previewId;
  }
  // 预览图片
  handlePreview = (file, previewId) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      previewId
    });
    this.imgUrl = PIC_PREFIX + file.key + '?attname=' + file.key + '.jpg';
  }
  // 隐藏图片
  handleCancel = () => this.setState({previewVisible: false})
  // 获取文件上传的属性
  getUploadProps = ({ initValue, token, field, readonly = false,
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
      onChange: ({ fileList }) => this.setUploadFileUrl(fileList, true, onChange),
      onPreview: (file) => {
        this.handlePreview(file, field);
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
  getFileInitVal(initVal, isImg = true) {
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
        const { setFieldsValue, doFetching, cancelFetching } = this.props;
        callback && callback(f.response.key, setFieldsValue, doFetching, cancelFetching);
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
    const { field, isLoaded, getFieldDecorator, token, rules, readonly, single,
      isImg, onChange, accept, getFieldValue, label, hidden, initVal, inline } = this.props;
    const { previewVisible, previewId } = this.state;
    const initValue = this.getFileInitVal(initVal, isImg);
    let layoutProps = inline ? {} : formItemLayout;
    return (
      hidden ? null : (
        <FormItem key={field} {...layoutProps} label={label}>
          {
            isLoaded ? (
              getFieldDecorator(field, {
                rules,
                initialValue: initVal,
                getValueFromEvent: this.normFile
              })(
                <Upload {...this.getUploadProps({
                  field,
                  token,
                  isImg,
                  accept,
                  readonly,
                  single,
                  onChange,
                  initValue
                })}>
                  {this.getUploadBtn(field, getFieldValue, readonly, single, isImg)}
                </Upload>
              )
            ) : null
          }
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <div className="previewImg-wrap">
              <Carousel dots={true} ref={(carousel => this.carousel = carousel)} afterChange={(a) => {
                let url = getFieldValue(previewId).split('||')[a];
                this.imgUrl = PIC_PREFIX + url + '?attname=' + url + '.jpg';
              }}>{
                previewId && getFieldValue(previewId).split('||').map(v => {
                  let url = PIC_PREFIX + v + PIC_BASEURL_L;
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
  initVal: PropTypes.string,
  accept: PropTypes.string,
  readonly: PropTypes.bool,
  single: PropTypes.bool,
  hidden: PropTypes.bool,
  onChange: PropTypes.func,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  isFieldValidating: PropTypes.func.isRequired,
  doFetching: PropTypes.func.isRequired,
  cancelFetching: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

CUpload.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldValue: noop,
  setFieldsValue: noop,
  getFieldError: noop,
  getFieldDecorator: noop,
  isFieldValidating: noop,
  doFetching: noop,
  cancelFetching: noop,
  isLoaded: false,
  hidden: false
};
