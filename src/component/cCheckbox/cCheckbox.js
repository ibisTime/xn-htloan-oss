import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Form } from 'antd';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

export default class CCheckbox extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.isPropsChange(nextProps);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, getFieldValue, hidden, initVal,
      inline, list, keyName, valueName, getFieldError } = this.props;
    let nowValue = getFieldValue(field);
    let flag;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = isUndefined(this.prevValue) && isUndefined(nowValue) ? false : this.prevValue !== nowValue;
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
    let nowErr = getFieldError(field);
    let errFlag = this.isErrChange(nowErr);
    if (errFlag) {
      this.prevErr = nowErr;
    }
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden ||
      nextProps.initVal !== initVal || nextProps.inline !== inline || flag ||
      nextProps.list.length !== list.length || nextProps.keyName !== keyName ||
      nextProps.valueName !== valueName || errFlag;
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
  getCheckProps(onChange, readonly) {
    let props = { disabled: readonly };
    if (onChange) {
      props.onChange = (checkedValue) => onChange(checkedValue);
    }
    return props;
  }
  getReadonlyValue(initVal, readonly, list, keyName, valueName) {
    let value = '';
    if (readonly && list && initVal) {
      value = initVal.map(v => list.find(d => d[keyName] === v)[valueName]).join('、');
    }
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      onChange, initVal, inline, list, keyName, valueName } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    let value = this.getReadonlyValue(initVal, readonly, list, keyName, valueName);
    return (
      <FormItem key={field} label={label} {...layoutProps} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text">{value}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(
              <CheckboxGroup {...this.getCheckProps(onChange, readonly)}>
                {list && list.length
                  ? list.map(d => <Checkbox key={d[keyName]} value={d[keyName]}>{d[valueName]}</Checkbox>)
                  : null}
              </CheckboxGroup>)
        }
      </FormItem>
    );
  }
}

CCheckbox.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  list: PropTypes.array.isRequired,
  initVal: PropTypes.array,
  inline: PropTypes.bool,
  keyName: PropTypes.string.isRequired,
  valueName: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CCheckbox.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldDecorator: noop,
  getFieldError: noop,
  hidden: false,
  inline: false,
  list: [],
  keyName: 'dkey',
  valueName: 'dvalue'
};
