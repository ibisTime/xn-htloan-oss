import React from 'react';
import PropTypes from 'prop-types';
import { Cascader, Form } from 'antd';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout, MONTH_FORMAT } from 'common/js/config';
import cityData from 'common/js/lib/city';

const FormItem = Form.Item;

export default class CCitySelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.isPropsChange(nextProps);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, hidden, getFieldValue, initVal,
      inline, getFieldError } = this.props;
    let nowValue = getFieldValue(field);
    let flag;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = !(isUndefined(this.prevValue) && isUndefined(nowValue));
    } else if (this.prevValue.length !== nowValue.length) {
      flag = true;
    } else {
      this.prevValue.forEach((v, i) => {
        if (v !== nowValue[i]) {
          flag = true;
        }
      });
    }
    if (flag) {
      this.prevValue = nowValue;
    }
    let initFlag = nextProps.initVal.length !== initVal.length;
    if (nextProps.initVal.length === initVal.length) {
      nextProps.initVal.forEach((v, i) => {
        if (v !== initVal[i]) {
          initFlag = true;
        }
      });
    }
    let nowErr = getFieldError(field);
    let errFlag = this.isErrChange(nowErr);
    if (errFlag) {
      this.prevErr = nowErr;
    }
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden || flag ||
      initFlag || nextProps.inline !== inline || errFlag;
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

  getCasProps(onChange) {
    let props = {
      placeholder: '请选择',
      options: cityData,
      style: { maxWidth: 400 },
      showSearch: {
        filter: (inputValue, path) => {
          return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
        }
      }
    };
    if (onChange) {
      props.onChange = (value, selectedOptions) => onChange(value, selectedOptions);
    }
    return props;
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      initVal, inline, onChange } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} {...layoutProps} className={hidden ? 'hidden' : ''} label={label}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(<Cascader {...this.getCasProps(onChange)}/>)
        }
      </FormItem>
    );
  }
}

CCitySelect.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  initVal: PropTypes.array,
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CCitySelect.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldValue: noop,
  getFieldError: noop,
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
