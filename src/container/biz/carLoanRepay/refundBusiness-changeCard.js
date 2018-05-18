import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/refundBusiness-changeCard';
import {
  getQueryString,
  getUserId,
  showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizRefundBusinessChangeCard, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class refundBusinessChangeCard extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.userId = getQueryString('userId', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '贷款人',
      readonly: true,
      formatter: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      readonly: true,
      formatter: (v, d) => {
        return d.user.mobile;
      }
    }, {
      title: '身份证号',
      field: 'idNo',
      readonly: true,
      formatter: (v, d) => {
        return d.user.idNo;
      }
    }, {
      title: '原银行卡号',
      field: 'idNo',
      readonly: true,
      formatter: (v, d) => {
        return d.loanOrder.bankcardNumber;
      }
    }, {
      title: '银行卡号',
      field: 'bankcardCode',
      listCode: 802016,
      params: {
        userId: this.userId
      },
      keyName: 'code',
      valueName: 'bankcardNumber',
      type: 'select'
    }, {
      title: '开户行',
      field: 'bankName',
      select: true
    }, {
      title: '开户支行',
      field: 'subbranch',
      select: true
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630521,
        buttons: [{
          title: '确认',
          handler: (param) => {
            param.updater = getUserId();
            this.props.doFetching();
            fetch(630511, param).then(() => {
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

export default refundBusinessChangeCard;