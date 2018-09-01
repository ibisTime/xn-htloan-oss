import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { noop } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const FormItem = Form.Item;

export default class CInput extends React.Component {
  getInputProps(onChange, type, hidden) {
    let t;
    if (hidden) {
      t = 'hidden';
    } else if (type) {
      t = type;
    } else {
      t = 'text';
    }
    let props = { type: t };
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
      onChange, type, initVal, inline } = this.props;
    console.log(initVal);
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} {...layoutProps} className={hidden ? 'hidden' : ''} label={label}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(<Input {...this.getInputProps(onChange, type, hidden)} />)
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
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CInput.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
