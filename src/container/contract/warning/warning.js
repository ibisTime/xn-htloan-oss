import React from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import fetch from 'common/js/fetch';

export default class Warning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [{
        contractNo: '1',
        name: '张三',
        endDatetime: '2018-06-14'
      }, {
        contractNo: '2',
        name: '小米',
        endDatetime: '2018-06-14'
      }, {
        contractNo: '3',
        name: '王五',
        endDatetime: '2018-07-04'
      }, {
        contractNo: '4',
        name: '王2',
        endDatetime: '2018-07-04'
      }],
      contractsMap: null,
      modalVisible: false,
      modalOptions: null
    };
  }
  componentDidMount() {
    fetch(632837).then(data => {
      this.createDateMap(data);
    }).catch(() => {});
    // this.createDateMap(this.state.contracts);
  }
  createDateMap(data) {
    let result = {};
    data.forEach(d => {
      let key = moment(d.endDatetime).format('YYYY-MM-DD');
      result[key] = result[key] || [];
      result[key].push(d);
    });
    this.setState({ contractsMap: result });
  }
  dateCellRender = (date) => {
    let todayStr = date.format('YYYY-MM-DD');
    if (!this.state.contractsMap || !this.state.contractsMap[todayStr]) {
      return null;
    }
    return (
      <div>
        {
          this.state.contractsMap[todayStr].map(item => (

            <a style={{display: 'block'}} key={item.code} onClick={() => this.goDetail(item.contractNo)}>
              {item.archive.realName}
            </a>
          ))
        }
      </div>
    );
  }
  goDetail(contractNo) {
    // 档案详情
  }
  render() {
    return (
      <Calendar dateCellRender={this.dateCellRender} />
    );
  }
}
