import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { noop } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const { TextArea } = Input;
const FormItem = Form.Item;

export default class CTextArea extends React.Component {
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      onChange, initVal, inline } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} label={label} {...layoutProps} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
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
  initVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CTextArea.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
