import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect, Form } from 'antd';
import { noop, isUndefined } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const { TreeNode } = TreeSelect;
const FormItem = Form.Item;

export default class CTreeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: []
    };
  }
  componentDidMount() {
    const { list, isLoaded } = this.props;
    this.buildTreeData(list, isLoaded);
  }
  componentDidUpdate() {
    const { list, isLoaded } = this.props;
    this.buildTreeData(list, isLoaded);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.isPropsChange(nextProps) || this.isStateChange(nextState);
  }
  isPropsChange(nextProps) {
    const { field, isLoaded, rules, readonly, bParams, keyName, valueName,
      getFieldValue, hidden, initVal, inline, list, getFieldError } = this.props;
    let nowValue = getFieldValue(field);
    let flag = this.prevValue !== nowValue;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = isUndefined(this.prevValue) && isUndefined(nowValue) ? false : this.prevValue !== nowValue;
    }
    if (flag) {
      this.prevValue = nowValue;
    }
    let nowErr = getFieldError(field);
    let errFlag = this.isErrChange(nowErr);
    if (errFlag) {
      this.prevErr = nowErr;
    }
    return nextProps.field !== field || nextProps.isLoaded !== isLoaded ||
      nextProps.rules.length !== rules.length || nextProps.readonly !== readonly ||
      nextProps.bParams.length !== bParams.length || nextProps.keyName !== keyName ||
      nextProps.valueName !== valueName || nextProps.hidden !== hidden || flag ||
      nextProps.initVal !== initVal || nextProps.inline !== inline ||
      nextProps.list !== list || errFlag;
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
  isStateChange(nextState) {
    return nextState.treeData.length !== this.state.treeData.length;
  }
  // 第一次加载完list的时候，生成treeData
  buildTreeData(list, isLoaded) {
    if (isLoaded && list.length) {
      if (!this.lastList || this.lastList.length !== list.length) {
        this.lastList = list;
        this.getTree(list);
      }
    }
  }
  // 生成tree
  getTree(data) {
    const { keyName, valueName, bParams, field } = this.props;
    let result = {};
    data.forEach(v => {
      v.parentCode = v.parentCode === '0' ? 'ROOT' : v.parentCode;
      if (!result[v.parentCode]) {
        result[v.parentCode] = [];
      }
      let obj = {
          title: v[valueName],
          key: v[keyName]
      };
      if (bParams) {
          bParams.forEach(p => {
            obj[p] = v[p];
          });
      }
      result[v.parentCode].push(obj);
    });
    this.result = result;
    let tree = [];
    this.getTreeNode(result['ROOT'], tree, field);
    this.setState({ treeData: tree });
  }
  // 生成treeNode
  getTreeNode(arr, children, field) {
    arr.forEach(a => {
      if (this.result[a.key]) {
        a.children = [];
        children.push(a);
        this.getTreeNode(this.result[a.key], a.children, field);
      } else {
        children.push(a);
      }
    });
  }
  // 生成treeSelect结构
  renderTreeNodes = (data, disabled) => {
    if (!data) return null;
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} value={item.key} disabled={disabled ? disabled(item) : false}>
            {this.renderTreeNodes(item.children, disabled)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} value={item.key} disabled={disabled ? disabled(item) : false}/>;
    });
  }
  getTreeProps(onChange, readonly) {
    let props = {
      showSearch: true,
      filterTreeNode: (input, treeNode) => treeNode.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      allowClear: true,
      treeDefaultExpandAll: true,
      style: { maxWidth: 400 },
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      placeholder: '请选择'
    };
    if (onChange) {
      props.onChange = (value, label, extra) => onChange(value, label, extra);
    }
    return props;
  }
  getReadonlyValue(initVal, readonly, list, keyName, valueName) {
    let value = '';
    if (readonly && list && initVal) {
      value = list.filter(v => v[keyName] === initVal);
      value = value && value.length ? value[0][valueName] : initVal;
    }
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      onChange, initVal, inline, list, keyName, valueName, isLoaded, disabled } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    let value = this.getReadonlyValue(initVal, readonly, list, keyName, valueName);
    return (
      <FormItem key={field} label={label} {...layoutProps} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text">{value}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(<TreeSelect {...this.getTreeProps(onChange, readonly)}>{this.renderTreeNodes(this.state.treeData, disabled)}</TreeSelect>)
        }
      </FormItem>
    );
  }
}

CTreeSelect.propTypes = {
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
  inline: PropTypes.bool,
  bParams: PropTypes.array,
  isLoaded: PropTypes.bool,
  disabled: PropTypes.func,
  keyName: PropTypes.string.isRequired,
  valueName: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
};

CTreeSelect.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldError: noop,
  getFieldDecorator: noop,
  hidden: false,
  inline: false,
  list: [],
  keyName: 'dkey',
  valueName: 'dvalue'
};
