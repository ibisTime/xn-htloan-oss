import React from 'react';
import { Form } from 'antd';
import DetailComp from 'common/js/lib/DetailComp';
import CO2M from 'component/cO2M/cO2M';

const { Item: FormItem } = Form;

export default class DetailUtil extends DetailComp {
  // o2m选择一行数据的回调
  setO2MSelect = (field, selectedRowKeys) => {
    this.setState(prevState => ({
      selectedRowKeys: {
        ...prevState.selectedRowKeys,
        [field]: selectedRowKeys
      }
    }));
  }
  // o2m数据变动的回调
  setO2MData = (field, list) => {
    this.setState(prevState => ({
      pageData: {
        ...prevState.pageData,
        [field]: list
      }
    }));
  }
  // 获取o2m表格控件
  getTableItem(item, list) {
    const props = {
      list,
      hidden: item.hidden,
      inline: item.inline,
      field: item.field,
      title: item.title,
      label: this.getLabel(item),
      readonly: item.readonly,
      options: item.options,
      selectedRowKeys: this.state.selectedRowKeys[item.field] || [],
      setO2MSelect: this.setO2MSelect,
      setO2MData: this.setO2MData
    };
    return <CO2M key={item.field} {...props} />;
  }
}
