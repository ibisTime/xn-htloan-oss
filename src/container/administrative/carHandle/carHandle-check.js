import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/administrative/carHandle-check';
import {
  getQueryString,
  getUserId,
  showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.administrativeCarHandleCheck, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class carHandleCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '违章人',
      field: 'userId',
      listCode: 630066,
      type: 'select',
      keyName: 'userId',
      valueName: 'realName',
      readonly: true
    }, {
      title: '车牌号',
      field: 'carNo',
      readonly: true
    }, {
      title: '违法时间',
      field: 'happenDatetime',
      readonly: true,
      type: 'datetime'
    }, {
      title: '违章地点',
      field: 'address',
      readonly: true
    }, {
      title: '违法行为',
      field: 'action',
      readonly: true
    }, {
      title: '罚款金额',
      field: 'punishAmount',
      readonly: true,
      amount: true
    }, {
      title: '处理情况',
      field: 'handleNote',
      readonly: true
    }, {
      title: '记分',
      field: 'score',
      readonly: true
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
        detailCode: 632636,
        buttons: [{
          title: '通过',
          handler: (param) => {
            param.approveResult = '1';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632631, param).then(() => {
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
            param.approveResult = '2';
            param.updater = getUserId();
            this.props.doFetching();
            fetch(632631, param).then(() => {
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

export default carHandleCheck;
