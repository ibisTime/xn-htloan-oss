import React from 'react';
import { Select, Spin } from 'antd';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import fetch from 'common/js/fetch';

// const FormItem = Form.Item;
const { Option } = Select;

// @Form.create()
export default class Panalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: []
    };
  }
  componentDidMount() {
    const titles = ['20岁以下', '20岁至30岁', '30岁至40岁', '40岁至50岁', '50岁以上'];
    fetch(632803).then(data => {
      let result = data.map((d, i) => ({
        age: titles[i],
        count: d.count
      }));
      this.setState({
        loading: false,
        data: result
      });
    }).catch(() => {
      this.setState({ loading: false });
    });
  }
  render() {
    const cols = {
      'count': {tickInterval: 10}
    };
    return (
      <Spin spinning={this.state.loading}>
        <Chart height={400} data={this.state.data} scale={cols} forceFit>
          <Axis name="age" />
          <Axis name="count" />
          <Tooltip crosshairs={{type: 'y'}}/>
          <Geom type="interval" position="age*count" />
        </Chart>
      </Spin>
    );
  }
}
