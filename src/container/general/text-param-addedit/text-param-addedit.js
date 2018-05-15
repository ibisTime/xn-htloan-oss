import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/general/text-param-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.generalTextParamAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class TextParamAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.ckey = getQueryString('ckey', this.props.location.search);
    this.type = getQueryString('type', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '参数说明',
      field: 'remark',
      readonly: true,
      maxlength: 250
    }];
    let vField = {
      title: '参数值',
      field: 'cvalue',
      type: 'textarea',
      normalArea: this.type !== 'richText',
      required: true
    };
    let wxConfig;
    if (this.ckey === 'weixinID') {
      vField.type = 'text';
      vField.title = '微信号';
      vField.formatter = (v) => (JSON.parse(v).id);
      wxConfig = {
        title: '微信号二维码',
        field: 'wximg',
        type: 'img',
        required: true,
        single: true,
        formatter: function (v, data) {
            return JSON.parse(data.cvalue).pic;
        }
      };
    }
    fields.push(vField);
    wxConfig && fields.push(wxConfig);

    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      beforeDetail: (param) => {
        param.id = this.code;
      },
      beforeSubmit: (param) => {
        param.id = this.code;
        param.remark = this.props.pageData['remark'];
        if (wxConfig) {
          let cvalue = {
            id: param.cvalue,
            pic: param.wximg
          };
          param.cvalue = JSON.stringify(cvalue);
        }
        return param;
      },
      detailCode: 805916,
      addCode: 805910,
      editCode: 805911
    });
  }
}

export default TextParamAddEdit;
