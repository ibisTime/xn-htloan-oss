import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/public/hotLine-addedit';
import { showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.publicHotLineAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class HotLineAddEdit extends React.Component {
  render() {
    const fields = [{
      field: 'id',
      hidden: true
    }, {
      title: '内容',
      field: 'cvalue',
      required: true
    }, {
      field: 'remark',
      hidden: true,
      value: '服务热线'
    }];
    return this.props.buildDetail({
      fields,
      detailCode: 630025,
      key: 'ckey',
      ckey: 'telephone',
      // beforeDetail: (param) => {
      //   param['companyCode'] = COMPANY_CODE;
      // },
      buttons: [{
        title: '保存',
        check: true,
        handler: (params) => {
          this.props.doFetching();
          fetch(630002, params).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
          }).catch(this.props.cancelFetching);
        }
      }]
    });
  }
}

export default HotLineAddEdit;
