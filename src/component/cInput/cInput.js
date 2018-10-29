import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const FormItem = Form.Item;

export default class CInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.isPropsChange(nextProps);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, hidden, getFieldValue, type, initVal, inline,
      getFieldError } = this.props;
    let nowValue = getFieldValue(field);
    let flag = this.prevValue !== nowValue;
    if (flag) {
      this.prevValue = nowValue;
    }
    let nowErr = getFieldError(field);
    let errFlag = this.isErrChange(nowErr);
    if (errFlag) {
      this.prevErr = nowErr;
    }
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden || flag ||
      nextProps.type !== type || nextProps.initVal !== initVal ||
      nextProps.inline !== inline || errFlag;
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
  getInputProps(onChange, type, hidden, placeholder) {
    let t;
    if (hidden) {
      t = 'hidden';
    } else if (type) {
      t = type;
    } else {
      t = 'text';
    }
    let props = {
      type: t,
      style: { maxWidth: 400 },
      placeholder
    };
    if (onChange) {
      props.onChange = (e) => {
        const { value } = e.target;
        onChange(value);
      };
    }
    return props;
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      onChange, type, initVal, inline, title, placeholder } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} {...layoutProps} className={hidden ? 'hidden' : ''} label={title ? label : ''}>
        {title ? '' : <samp>&nbsp;</samp>}
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(<Input {...this.getInputProps(onChange, type, hidden, placeholder)} />)
        }
      </FormItem>
    );
  }
}

CInput.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  initVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CInput.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldValue: noop,
  getFieldError: noop,
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
