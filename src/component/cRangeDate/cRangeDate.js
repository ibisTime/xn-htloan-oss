import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout, DATETIME_FORMAT, DATE_FORMAT } from 'common/js/config';
import locale from 'common/js/lib/date-locale';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

export default class CRangeDate extends React.Component {
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
    } else if (this.prevValue.length !== nowValue.length) {
      flag = true;
    } else {
      flag = !(this.prevValue[0].isSame(nowValue[0]) && this.prevValue[1].isSame(nowValue[1]));
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
  getDateProps(onChange, isTime) {
    let props = {
      locale,
      allowClear: false,
      placeholder: isTime ? ['开始时间', '结束时间'] : ['开始日期', '结束日期'],
      ranges: {'今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')]},
      format: isTime ? DATETIME_FORMAT : DATE_FORMAT,
      showTime: isTime
    };
    if (onChange) {
      props.onChange = (dates, dateStrings) => onChange(dates, dateStrings);
    }
    return props;
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      isTime, initVal, inline, onChange } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    return (
      <FormItem key={field} {...layoutProps} className={hidden ? 'hidden' : ''} label={label}>
        {
          readonly ? <div className="readonly-text">{initVal}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal || null
              })(<RangePicker {...this.getDateProps(onChange, isTime)} />)
        }
      </FormItem>
    );
  }
}

CRangeDate.propTypes = {
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
  getFieldValue: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CRangeDate.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldValue: noop,
  getFieldError: noop,
  getFieldDecorator: noop,
  hidden: false,
  inline: false
};
