import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';
import { noop, tempString } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const { Option } = Select;
const FormItem = Form.Item;

export default class CSelect extends React.Component {
  getSelectProps(multiple, onChange) {
    const props = {
      mode: multiple ? 'multiple' : '',
      showSearch: true,
      allowClear: true,
      optionFilterProp: 'children',
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      style: {width: '100%'},
      placeholder: '请选择'
    };
    if (onChange) {
      props.onChange = (v) => onChange(v);
    }
    return props;
  }
  getReadonlyValue(initVal, readonly, list, keyName, valueName, multiple) {
    let value = '';
    if (readonly && list) {
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
    let value = this.getReadonlyValue(initVal, readonly, list, multiple);
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
  getFieldDecorator: PropTypes.func.isRequired
};

CSelect.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldDecorator: noop,
  hidden: false,
  inline: false,
  list: [],
  keyName: 'dkey',
  valueName: 'dvalue'
};
