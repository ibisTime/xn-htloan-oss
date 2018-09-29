import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';
import { noop, tempString, isUndefined } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const { Option } = Select;
const FormItem = Form.Item;

export default class CSelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.isPropsChange(nextProps);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, getFieldValue, hidden, initVal, inline,
      keyName, valueName, getFieldError, multiple, list } = this.props;
    let nowValue = getFieldValue(field);
    let flag = this.prevValue !== nowValue;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = isUndefined(this.prevValue) && isUndefined(nowValue) ? false : this.prevValue !== nowValue;
    }
    this.prevValue = flag ? nowValue : this.prevValue;
    let nowErr = getFieldError(field);
    let errFlag = this.isErrChange(nowErr);
    if (errFlag) {
      this.prevErr = nowErr;
    }
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden ||
      nextProps.initVal !== initVal || nextProps.inline !== inline ||
      nextProps.keyName !== keyName || nextProps.valueName !== valueName ||
      nextProps.list !== list || nextProps.multiple !== multiple || flag || errFlag;
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
  getSelectProps(multiple, onChange) {
    const props = {
      mode: multiple ? 'multiple' : '',
      showSearch: true,
      allowClear: true,
      style: { maxWidth: 350 },
      optionFilterProp: 'children',
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      placeholder: '请选择'
    };
    if (onChange) {
      props.onChange = (v) => onChange(v, this.props.list);
    }
    return props;
  }
  getReadonlyValue(initVal, readonly, list, keyName, valueName, multiple) {
    let value = '';
    if (readonly && list && initVal) {
      if (multiple) {
        value = initVal.map(i => {
          let obj = list.find(v => v[keyName] === i);
          return obj[valueName] || tempString(valueName, obj) || '';
        }).join('、');
      } else {
        value = list.filter(v => v[keyName] === initVal);
        value = value && value.length
          ? value[0][valueName] || tempString(valueName, value[0])
          : initVal;
      }
    }
    return value;
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      onChange, initVal, inline, list, multiple, keyName, valueName } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    let value = this.getReadonlyValue(initVal, readonly, list, keyName, valueName, multiple);
    return (
      <FormItem key={field} label={label} {...layoutProps} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text">{value}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(
              <Select {...this.getSelectProps(multiple, onChange)}>
                {list && list.length ? list.map(d => (
                  <Option key={d[keyName]} value={d[keyName]}>
                    {d[valueName] ? d[valueName] : tempString(valueName, d)}
                  </Option>
                )) : null}
              </Select>)
        }
      </FormItem>
    );
  }
}

CSelect.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  list: PropTypes.array.isRequired,
  initVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  multiple: PropTypes.bool,
  inline: PropTypes.bool,
  keyName: PropTypes.string.isRequired,
  valueName: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CSelect.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldError: noop,
  getFieldDecorator: noop,
  getFieldValue: noop,
  hidden: false,
  inline: false,
  list: [],
  keyName: 'dkey',
  valueName: 'dvalue'
};
