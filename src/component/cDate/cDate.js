import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout, DATETIME_FORMAT, DATE_FORMAT } from 'common/js/config';
import locale from 'common/js/lib/date-locale';

const FormItem = Form.Item;

export default class CDate extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.isPropsChange(nextProps);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, hidden, getFieldValue, isTime, initVal,
      inline, getFieldError } = this.props;
    let nowValue = getFieldValue(field);
    let flag;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = isUndefined(this.prevValue) && isUndefined(nowValue) ? false : this.prevValue !== nowValue;
    } else {
      flag = !this.prevValue.isSame(nowValue);
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
      nextProps.readonly !== readonly || nextProps.hidden !== hidden || flag ||
      nextProps.isTime !== isTime || nextProps.initVal !== initVal ||
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
  getDateProps(onChange, isTime, disabledDate) {
    let props = {
      locale,
      style: { maxWidth: 400 },
      allowClear: false,
      placeholder: isTime ? '选择时间' : '选择日期',
      format: isTime ? DATETIME_FORMAT : DATE_FORMAT,
      showTime: isTime
    };
    if (onChange) {
      props.onChange = (date, dateString) => onChange(date, dateString);
    }
    if (disabledDate) {
      props.disabledDate = disabledDate;
    }
    return props;
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      isTime, initVal, inline, onChange, disabledDate } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} {...layoutProps} className={hidden ? 'hidden' : ''} label={label}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal || null
            })(
            <DatePicker {...this.getDateProps(onChange, isTime, disabledDate)}/>)
        }
      </FormItem>
    );
  }
}

CDate.propTypes = {
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
  isTime: PropTypes.bool,
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  disabledDate: PropTypes.func,
  getFieldValue: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CDate.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldValue: noop,
  getFieldError: noop,
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
