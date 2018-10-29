import React from 'react';
import { Spin, Form, Button } from 'antd';
import { getCreditReport } from 'api/biz';
import { showWarnMsg, getQueryString } from 'common/js/util';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const { Item: FormItem } = Form;

export default class IdCheckReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {},
      fetching: true
    };
    this.id = getQueryString('id', this.props.location.search);
  }
  componentDidMount() {
    if (this.id) {
      this.getCreditReport();
    } else {
      showWarnMsg('未传人报告编号');
      this.setState({ fetching: false });
    }
  }
  getCreditReport() {
    getCreditReport(this.id).then((data) => {
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
  back = () => this.props.history.go(-1)
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
          <FormItem key='buttons' {...tailFormItemLayout}>
            <Button style={{marginLeft: 20}} onClick={this.back}>返回</Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}
