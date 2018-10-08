import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { showWarnMsg, getQueryString, getUserId } from 'common/js/util';

@Form.create()
export default class Demo extends DetailUtil {
  constructor(props) {
    super(props);
    // this.state = {
    //   entryVisible: false,
    //   creditResult: [],
    //   selectData: {},
    //   selectKey: ''
    // };
    this.code = getQueryString('code', this.props.location.search);
    // 发起征信
    this.isAddedit = !!getQueryString('isAddedit', this.props.location.search);
    // 录入征信结果
    this.isEntry = !!getQueryString('isEntry', this.props.location.search);
    // 信贷专员初审
    this.isCheck = !!getQueryString('isCheck', this.props.location.search);
    // 准入审查
    this.isCheckFirst = !!getQueryString('isCheckFirst', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.newCar = true;
    this.creditUserListIndex = 6;
    this.buttons = [];
    this.concatFalg = false;
  }
  render() {
    let fields = [{
        title: '业务团队',
        field: 'teamName',
        hidden: this.isAddedit
    }, {
        title: '银行',
        field: 'loanBankCode',
        type: 'select',
        listCode: 632037,
        keyName: 'code',
        valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
        required: true
    }, {
        title: '业务种类',
        field: 'bizType',
        type: 'select',
        key: 'budget_orde_biz_typer',
        required: true,
        onChange: (value) => {
            if (value) {
                this.newCar = value === '0';
            }
        }
    }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true,
        min: '1',
        required: true
    }, {
        title: '二手车评估报告',
        field: 'secondCarReport',
        type: 'file',
        hidden: this.newCar
    }, {
        title: '征信列表',
        field: 'creditUserList'
        // type: 'o2m',
        // options: {
        //     add: true,
        //     edit: true,
        //     delete: true,
        //     detail: !(this.isEntry || !this.view),
        //     check: this.isEntry,
        //     checkName: '录入',
        //     scroll: {x: 1300},
        //     fields: o2mFields
        // }
    }, {
        title: '说明',
        field: 'note',
        type: 'textarea',
        normalArea: true
    }, {
        title: '审核说明',
        field: 'approveNote',
        readonly: !this.isCheck,
        hidden: !this.isCheck
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632117,
      buttons: this.buttons,
      beforeSubmit: (param) => {
        if (!param.creditUserList) {
          showWarnMsg('至少新增一条征信列表');
          return false;
        } else {
          param.operator = getUserId();
          return param;
        }
      }
    });
  }
}
