import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/contract/manage-continue.js';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.contractManageContinue, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class manageContinue extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        title: '姓名',
        field: 'archiveCode',
        listCode: 632807,
        type: 'select',
        keyName: 'code',
        valueName: 'realName',
        readonly: true
    }, {
        title: '合同编号',
        field: 'contractNo',
        required: true
    }, {
        title: '合同类型',
        field: 'type',
        type: 'select',
        key: 'contract_type',
        required: true
    }, {
        title: '开始日期',
        field: 'startDatetime',
        type: 'date',
        required: true
    }, {
        title: '结束日期',
        field: 'endDatetime',
        type: 'date',
        required: true
    }, {
        title: '合同附件',
        field: 'pdf',
        type: 'img'
    }, {
        title: '说明',
        field: 'remark'
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632836,
        buttons: [{
          title: '确认',
          handler: (param) => {
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632830, param).then(() => {
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
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }]
      });
  }
}

export default manageContinue;
