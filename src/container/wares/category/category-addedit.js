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

@DetailWrapper(state => state.bizCategoryAddedit, {
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
        detailCode: 808006
      });
  }
}

export default categoryAddedit;
