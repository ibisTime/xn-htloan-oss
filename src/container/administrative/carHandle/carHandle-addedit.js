import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/administrative/carHandle-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.administrativeCarHandleAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class carHandleAddedit extends React.Component {
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
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 632630,
        detailCode: 632636
      });
  }
}

export default carHandleAddedit;
