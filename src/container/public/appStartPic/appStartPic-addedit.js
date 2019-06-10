import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/public/appStartPic-addedit';
import { showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.publicAppStartPicAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class AppStartPicAddedit extends React.Component {
  render() {
    const fields = [{
      field: 'id',
      hidden: true
    }, {
      field: 'remark',
      hidden: true
    }, {
      title: '启动图',
      field: 'cvalue',
      type: 'img',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      key: 'key',
      code: 'app_start_pic',
      view: false,
      detailCode: 630047,
      editCode: 630042,
      buttons: [{
        title: '保存',
        check: true,
        handler: (params) => {
          this.props.doFetching();
          params.ckey = 'app_start_pic';
          fetch(630042, params).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
          }).catch(this.props.cancelFetching);
        }
      }]
    });
  }
}

export default AppStartPicAddedit;
