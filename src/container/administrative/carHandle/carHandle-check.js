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
      field: 'code',
      listCode: 630066,
      type: 'select',
      keyName: 'userId',
      valueName: 'realName',
      required: true
    }, {
      title: '车牌号',
      field: 'carNo',
      required: true
    }, {
      title: '违法时间',
      field: 'code',
      required: true,
      type: 'date'
    }, {
      title: '违章地点',
      field: 'address',
      required: true
    }, {
      title: '违法行为',
      field: 'action',
      required: true
    }, {
      title: '罚款金额',
      field: 'code',
      required: true,
      amount: true
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
            fetch(630631, param).then(() => {
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
            fetch(630631, param).then(() => {
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
