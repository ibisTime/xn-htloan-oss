import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/public/times-addedit';
import { showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.publicTimesAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class TimesAddEdit extends React.Component {
  render() {
    const fields = [{
      field: 'id',
      hidden: true
    }, {
      field: 'remark',
      value: '服务时间',
      hidden: true
    }, {
      title: '热线',
      field: 'cvalue',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      key: 'key',
      code: 'kf_phone',
      view: false,
      detailCode: 630047,
      editCode: 630042,
      buttons: [{
        title: '保存',
        check: true,
        handler: (params) => {
          this.props.doFetching();
          params.ckey = 'kf_phone';
          fetch(630042, params).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
          }).catch(this.props.cancelFetching);
        }
      }]
    });
  }
}

export default TimesAddEdit;
