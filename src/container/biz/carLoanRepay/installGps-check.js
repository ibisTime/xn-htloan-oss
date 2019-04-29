import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/installGps-check';
import { getQueryString, showSucMsg, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.bizinstallGpsCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class installGpsCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
      const fields = [
          {
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
              field: 'applyUserName',
              readonly: true,
              formatter: (v, d) => {
                  return d.creditUser ? d.creditUser.userName : '';
              }
          }, {
              title: '贷款银行',
              field: 'loanBankName',
              formatter: (v, d) => {
                  if (d.loanBankName) {
                      return d.repaySubbranch ? d.loanBankName + d.repaySubbranch : d.loanBankName;
                  } else if (d.repaySubbranch) {
                      return d.loanBankName ? d.loanBankName + d.repaySubbranch : d.repaySubbranch;
                  }
              },
              readonly: true
          }, {
              title: '贷款金额',
              field: 'loanAmount',
              amount: true,
              readonly: true
          }, {
              title: '业务类型',
              field: 'bizType',
              type: 'select',
              key: 'budget_orde_biz_typer',
              required: true,
              readonly: true
          }, {
              title: '业务归属',
              field: 'ywyUser',
              formatter: (v, d) => {
                  return d ? d.companyName + '-' + d.teamName + '-' + d.saleUserName : '';
              },
              readonly: true
              // hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
          }, {
              title: '指派归属',
              field: 'zfStatus',
              readonly: true,
              formatter: (v, d) => {
                  if (d.teamName) {
                      return d.insideJobName ? d.companyName + '-' + d.teamName + '-' + d.insideJobName : d.companyName + d.teamName;
                  } else if (d.insideJobName) {
                      return d.teamName ? d.companyName + '-' + d.teamName + '-' + d.insideJobName : d.companyName + d.insideJobName;
                  }
              }
              // hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
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
              title: 'GPS安装列表',
              field: 'budgetOrderGpsList',
              required: true,
              type: 'o2m',
              options: {
                  add: true,
                  edit: true,
                  delete: true,
                  fields: [{
                      title: 'GPS设备号',
                      field: 'code',
                      type: 'select',
                      listCode: 632707,
                      params: {
                          applyStatus: '1',
                          applyUser: getUserId(),
                          useStatus: '0'
                      },
                      keyName: 'code',
                      valueName: 'gpsDevNo',
                      nowrap: true,
                      required: true
                  }, {
                      title: 'GPS类型',
                      field: 'gpsType',
                      type: 'select',
                      data: [{
                          key: '1',
                          value: '有线'
                      }, {
                          key: '0',
                          value: '无线'
                      }],
                      keyName: 'key',
                      valueName: 'value',
                      required: true
                  }, {
                      title: '安装位置',
                      field: 'azLocation',
                      nowrap: true,
                      required: true
                  }, {
                      title: '安装时间',
                      field: 'azDatetime',
                      type: 'date',
                      nowrap: true,
                      required: true
                  }, {
                      title: '安装人员',
                      field: 'azUser',
                      nowrap: true,
                      required: true
                  }, {
                      title: '备注',
                      field: 'remark',
                      nowrap: true
                  }]
              }
          }, {
              title: '审核意见',
              field: 'remark'
          }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632146,
      buttons: [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '1';
          param.operator = getUserId();
          this.props.doFetching();
          fetch(632127, param).then(() => {
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
          param.operator = getUserId();
          this.props.doFetching();
          fetch(632127, param).then(() => {
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

export default installGpsCheck;
