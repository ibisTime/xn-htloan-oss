import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import E from 'wangeditor';
import { formItemLayout, PIC_PREFIX, UPLOAD_URL } from 'common/js/config';

const FormItem = Form.Item;

export default class CTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaState: {
        validateStatus: 'success',
        errorMsg: null
      }
    };
  }
  componentDidMount() {
    let _this = this;
    if (this.area) {
      _this.editor = new E(this.area);
      _this.editor.customConfig.uploadFileName = 'file';
      _this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
      _this.editor.customConfig.showLinkImg = false;
      _this.editor.customConfig.uploadImgHooks = {
        customInsert: (insertLinkImg, result) => {
          insertLinkImg(PIC_PREFIX + result.key);
        },
        before: (formdata, xhr, editor, file) => {
          formdata.append('token', _this.props.token);
          formdata.append('key', file.name + '_' + new Date().getTime());
        }
      };
      _this.editor.customConfig.uploadImgServer = UPLOAD_URL;
      _this.editor.customConfig.onchange = html => {
        let areaState;
        if (!html) {
          areaState = { validateStatus: 'error', errorMsg: '必填字段' };
        } else {
          areaState = { validateStatus: 'success', errorMsg: '' };
        }
        _this.props.textareaChange(_this.props.field, html ? 'success' : 'error', html);
        _this.setState({ areaState });
      };
      _this.editor.create();
    }
  }
  componentDidUpdate() {
    const { isLoaded, initVal } = this.props;
    this.initEditorVal(isLoaded, initVal);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.isPropsChange(nextProps) || this.isStateChange(nextState);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, hidden, token, initVal, inline } = this.props;
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden ||
      nextProps.token !== token || nextProps.initVal !== initVal || nextProps.inline !== inline;
  }
  isStateChange(nextState) {
    let { areaState } = this.state;
    return nextState.areaState.validateStatus !== areaState.validateStatus ||
      nextState.areaState.errorMsg !== areaState.errorMsg;
  }
  // 第一次加载完为富文本框设值
  initEditorVal(isLoaded, initVal) {
    if (isLoaded && initVal && this.editor && !this.hasInitVal) {
      this.hasInitVal = true;
      this.editor.txt.html(initVal);
      this.props.textareaChange(this.props.field, 'success', initVal);
    }
  }
  getItemProps(field, label, areaState) {
    return {
      label,
      key: field,
      help: areaState.errorMsg,
      validateStatus: areaState.validateStatus
    };
  }
  render() {
    const { label, field, rules, readonly, hidden, initVal, inline } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    const { areaState } = this.state;
    return (
      <FormItem {...this.getItemProps(field, label, areaState)} {...layoutProps} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text" dangerouslySetInnerHTML={{__html: initVal}}></div>
            : <div ref={area => this.area = area}></div>
        }
      </FormItem>
    );
  }
}

CTextArea.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  initVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  inline: PropTypes.bool,
  token: PropTypes.string,
  isLoaded: PropTypes.bool,
  textareaChange: PropTypes.func,
  field: PropTypes.string.isRequired
};

CTextArea.defaultProps = {
  label: 'title',
  field: 'key',
  hidden: false,
  inline: false
};
