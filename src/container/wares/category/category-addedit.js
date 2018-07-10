import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/wares/category-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(state => state.waresCategoryAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class categoryAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [
      {
        title: '名称',
        field: 'name',
        required: true
      }, {
        title: '图片',
        field: 'img',
        type: 'img'
      }, {
        title: 'UI次序',
        field: 'orderNo',
        number: true
      }
    ];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 808000,
        editCode: 808002,
        detailCode: 808006,
        beforeSubmit: (data) => {
          data.parentCode = '0';
          return data;
        }
      });
  }
}

export default categoryAddedit;
