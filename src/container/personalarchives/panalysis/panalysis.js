import React from 'react';
import { Form, Select } from 'antd';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
export default class Panalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { year: '20岁以下', sales: 38 },
        { year: '20岁至30岁', sales: 52 },
        { year: '30岁至40岁', sales: 61 },
        { year: '40岁至50岁', sales: 145 },
        { year: '50岁以上', sales: 48 }
      ],
      selectData: [{
        dkey: '0',
        dvalue: '按年龄段分析'
      }, {
        dkey: '1',
        dvalue: '按年度员工月离职率分析'
      }, {
        dkey: '2',
        dvalue: '按人员编制分析'
      }]
    };
  }
  render() {
    const cols = {
      'sales': {tickInterval: 20}
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form style={{marginBottom: 20}} className="search-form" layout="inline">
          <FormItem label='分析口径'>
            {getFieldDecorator('type', {
              initialValue: '0'
            })(
              <Select
                showSearch
                notFoundContent='暂无数据'
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                style={{ width: 200 }}
                placeholder="请选择">
                {this.state.selectData.length
                  ? this.state.selectData.map(v => <Option key={v.dkey} value={v.dkey}>{v.dvalue}</Option>)
                  : null}
              </Select>
            )}
          </FormItem>
        </Form>
        <Chart height={400} data={this.state.data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="sales" />
          <Tooltip crosshairs={{type: 'y'}}/>
          <Geom type="interval" position="year*sales" />
        </Chart>
      </div>
    );
  }
}
