import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/administrative/welfare-check';
import {
  getQueryString,
  getUserId,
  showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.administrativeWelfareCheck, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class welfareCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '申请事宜',
      field: 'applyNote',
      readonly: true,
      required: true
    }, {
      title: '发放人员',
      field: 'welfareUserList',
      readonly: true,
      type: 'o2m',
      options: {
        add: true,
        edit: true,
        delete: true,
        fields: [{
          title: '姓名',
          field: 'userId',
          type: 'select',
          listCode: 632807,
          keyName: 'userId',
          valueName: 'realName'
        }, {
          title: '备注说明',
          field: 'remark'
        }]
      }
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632666,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632661, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true,
          type: 'primary'
        }, {
          title: '不通过',
          handler: (param) => {
            param.approveResult = '0';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632661, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          },
          check: true
        }, {
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default welfareCheck;
