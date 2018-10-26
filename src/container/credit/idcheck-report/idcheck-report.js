import React from 'react';
import { Spin, Form } from 'antd';
import { getCreditReport } from 'api/biz';
import { showWarnMsg } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;

export default class IdCheckReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {},
      fetching: true
    };
    this.idcard = '14272719950821351X';
  }
  componentDidMount() {
    getCreditReport('identity', this.idcard).then((data) => {
      if (!data.result) {
        showWarnMsg('未获取到身份证认证报告');
        this.setState({ fetching: false });
        return;
      }
      this.setState({
        fetching: false,
        report: JSON.parse(data.result).data
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  render() {
    const { report, fetching } = this.state;
    return (
      <Spin spinning={this.state.fetching}>
        <Form className="detail-form-wrapper">
          <FormItem key='name' {...formItemLayout} label="姓名">
            <div className="readonly-text">{report.name}</div>
          </FormItem>
          <FormItem key='identityNo' {...formItemLayout} label="身份证号">
            <div className="readonly-text">{report.identityNo}</div>
          </FormItem>
          <FormItem key='resultMsg' {...formItemLayout} label="匹配结果">
            <div className="readonly-text">{report.resultMsg}</div>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}
