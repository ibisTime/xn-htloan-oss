import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { noop, getRealValue } from 'common/js/util';

const { TextArea } = Input;
const FormItem = Form.Item;

export default class CTextArea extends React.Component {
  render() {
    const { label, keyName, rules, readonly, hidden, getFieldDecorator,
      pageData, onChange, type, amount, amountRate, formatter, _keys, value } = this.props;
    let initVal = getRealValue({ pageData, type, _keys, value, formatter, amount, amountRate, readonly, key: keyName });
    return (
      <FormItem label={label} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(keyName, {
              rules,
              initialValue: initVal
            })(<TextArea className="textarea-normalArea" autosize/>)
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
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  _keys: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  amount: PropTypes.bool,
  amountRate: PropTypes.number,
  formatter: PropTypes.func,
  keyName: PropTypes.string.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  pageData: PropTypes.object.isRequired
};

CTextArea.defaultProps = {
  label: 'title',
  keyName: 'key',
  getFieldDecorator: noop,
  pageData: {},
  hidden: false
};
