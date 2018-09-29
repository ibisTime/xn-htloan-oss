import {
  getQueryString,
  showSucMsg,
  getUserId,
  getRoleCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class applyGpsApply extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      flag: false,
      haveUser: false
    };
  }
  render() {
    const fields = [{
      title: '类型',
      field: 'type',
      type: 'select',
      data: [{
        key: '0',
        value: '无线'
      }, {
        key: '1',
        value: '有线'
      }],
      value: '0',
      keyName: 'key',
      valueName: 'value',
      onChange: (v) => {
        this.setState({
          flag: v === 1
        });
      }
    }, {
      title: '申领有线个数',
      field: 'applyWiredCount',
      hidden: !this.state.flag,
      required: true
    }, {
      title: '申领无线个数',
      field: 'applyWirelessCount',
      hidden: this.state.flag,
      required: true
    }, {
      title: '申领原因',
      field: 'applyReason',
      required: true
    }, {
      title: '客户姓名',
      field: 'applyUserName',
      type: 'select',
      pageCode: 632148,
      params: {
        roleCode: getRoleCode()
      },
      keyName: 'applyUserName',
      valueName: 'applyUserName',
      onChange: (v) => {
        this.setState({
          haveUser: v !== ''
        });
        fetch(632147, {applyUserName: v}).then((data) => {
          this.setState({
              pageData: {
                  ...this.state.pageData,
                  applyUserName: data.applyUserName,
                  carFrameNo: data.carFrameNo,
                  mobile: data.mobile
              }
          });
          this.cancelFetching();
      }).catch(this.cancelFetching);
      }
    }, {
      title: '车架号',
      field: 'carFrameNo',
      hidden: !this.state.haveUser
    }, {
      title: '手机号',
      field: 'mobile',
      hidden: !this.state.haveUser
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          params.applyUser = getUserId();
          params.type = '2';
          this.doFetching();
          fetch(632710, params).then(() => {
            showSucMsg('操作成功');
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
            this.cancelFetching();
          }).catch(this.cancelFetching);
        }
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}
