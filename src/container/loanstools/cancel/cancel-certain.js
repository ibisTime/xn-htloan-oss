import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/cancel-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsCancelCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class CancelCertain extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
      const fields = [{
        title: '业务编号',
        field: 'code',
        readonly: true,
        formatter: (v, d) => {
          return <div>
            {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
            window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + d.code;
          }}>查看详情</a>
          </div>;
        }
      }, {
        title: '客户姓名',
        field: 'userName',
        readonly: true,
        formatter: (v, d) => {
          return d ? d.creditUser.userName : '';
        }
      }, {
        title: '贷款银行',
        field: 'loanBankName',
        type: 'select',
        listCode: 632037,
        keyName: 'code',
        readonly: true,
        valueName: '{{bankName.DATA}}{{subbranch.DATA}}'
      }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true,
        min: '1',
        readonly: true
      }, {
        title: '业务种类',
        field: 'bizType',
        type: 'select',
        key: 'budget_orde_biz_typer',
        readonly: true
      }, {
        title: '业务归属',
        field: 'ywyUser',
        readonly: true,
        formatter: (v, d) => {
          return d && d.saleUserCompanyName ? d.saleUserCompanyName + '-' + d.saleUserDepartMentName + '-' + d.saleUserPostName + '-' + d.saleUserName : '';
        }
      }, {
        title: '指派归属',
        field: 'zfStatus',
        readonly: true,
        formatter: (v, d) => {
          return d && d.insideJobCompanyName ? d.insideJobCompanyName + '-' + d.insideJobDepartMentName + '-' + d.insideJobPostName + '-' + d.insideJobName : '';// hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
        }
      }, {
        title: '当前状态',
        field: 'status',
        key: 'cdbiz_status',
        type: 'select',
        readonly: true,
        formatter: (v, d) => {
          return d ? d.cdbiz.status : '';
        }
      }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true,
        readonly: true
      }, {
        title: '作废原因',
        field: 'remark',
        readonly: true
      }, {
        title: '是否垫资',
        field: 'isAdvanceFund',
        type: 'select',
        data: [{
          key: '1',
          value: '是'
        }, {
          key: '0',
          value: '否'
        }],
        keyName: 'key',
        valueName: 'value',
        readonly: true
      }, {
        title: '垫资时间',
        field: 'advanceFundDatetime',
        type: 'date',
        readonly: true
      }, {
        title: '垫资金额',
        field: 'advanceFundAmount',
        amount: true,
        readonly: true
      }, {
        title: '审核说明',
        field: 'approveNote',
        required: true
      }];
      return this.props.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632516,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.operator = getUserId();
            this.props.doFetching();
            fetch(632192, param).then(() => {
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
            param.approveNote = this.projectCode;
            param.operator = getUserId();
            this.props.doFetching();
            fetch(632192, param).then(() => {
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

export default CancelCertain;
