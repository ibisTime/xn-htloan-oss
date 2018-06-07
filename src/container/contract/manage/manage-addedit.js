import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/contract/manage-addedit.js';
import {
  getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.contractManageAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class manageAddedit extends React.Component {
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
        required: true
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
        addCode: 632830,
        detailCode: 632836
      });
  }
}

export default manageAddedit;
