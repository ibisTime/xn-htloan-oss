import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/brand-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper, beforeDetail } from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
  state => state.bizBrandAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class BrandAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'logo',
      title: 'logo',
      type: 'img',
      required: true,
      single: true
    }, {
      field: 'description',
      title: '品牌介绍'
    }, {
      title: '名称',
      field: 'name',
      required: true
    }, {
      title: '字母顺序',
      field: 'letter',
      type: 'select',
      required: true,
      search: true,
      data: [{
        key: '0',
        value: 'A'
      }, {
        key: '1',
        value: 'B'
      }, {
        key: '2',
        value: 'C'
      }, {
        key: '3',
        value: 'D'
      }, {
        key: '4',
        value: 'E'
      }, {
        key: '5',
        value: 'F'
      }, {
        key: '6',
        value: 'G'
      }, {
        key: '7',
        value: 'H'
      }, {
        key: '8',
        value: 'I'
      }, {
        key: '9',
        value: 'G'
      }, {
        key: '2',
        value: 'K'
      }, {
        key: '10',
        value: 'L'
      }, {
        key: '11',
        value: 'M'
      }, {
        key: '12',
        value: 'N'
      }, {
        key: '13',
        value: 'O'
      }, {
        key: '14',
        value: 'P'
      }, {
        key: '15',
        value: 'Q'
      }, {
        key: '16',
        value: 'L'
      }, {
        key: '17',
        value: 'S'
      }, {
        key: '18',
        value: 'T'
      }, {
        key: '19',
        value: 'U'
      }, {
        key: '20',
        value: 'V'
      }, {
        key: '21',
        value: 'W'
      }, {
        key: '22',
        value: 'X'
      }, {
        key: '23',
        value: 'Y'
      }, {
        key: '24',
        value: 'Z'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630400,
      editCode: 630402,
      detailCode: 630407
    });
  }
}

export default BrandAddedit;
