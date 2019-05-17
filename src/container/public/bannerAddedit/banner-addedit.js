import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/public/banner-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { SYSTEM_CODE } from 'common/js/config';
import UpDown from 'component/up-down/repetition';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.publicBannerAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class BannerAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
      this.state = {
          // 窗口是否显示
          biz: '',
          code: '',
          updownVisible: false
      };
      this.buttons = [{
          title: '跳转',
          check: true,
          handler: (params) => {
              this.props.doFetching();
              this.setState({
                  updownVisible: true});
          }
      }, {
          title: '保存',
          check: true,
          handler: (params) => {
              params.systemCode = SYSTEM_CODE;
              params.companyCode = SYSTEM_CODE;
              this.props.doFetching();
              fetch(805802, params).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                      this.props.history.go(-1);
                  }, 1000);
              }).catch(this.props.cancelFetching);
          }
      }, {
          title: '返回',
          handler: (param) => {
              this.props.history.go(-1);
          }
      }];
  }
    setModalVisible = (updownVisible) => {
        this.setState({updownVisible});
    }

    render() {
      const fields = [{
          field: 'status',
          value: 1,
          hidden: true
      }, {
          field: 'companyCode',
          hidden: true
          // value: COMPANY_CODE
      }, {
          field: 'type',
          value: 2,
          hidden: true
      }, {
          field: 'belong',
          value: 1,
          hidden: true
      }, {
          field: 'parentCode',
          value: 0,
          hidden: true
      }, {
          field: 'contentType',
          value: 1,
          hidden: true
      }, {
          field: 'isCompanyEdit',
          value: 0,
          hidden: true
      }, {
          title: 'banner名称',
          field: 'name',
          required: true
      }, {
          title: '位置',
          field: 'location',
          type: 'select',
          // key: 'banner_location',
          data: [{
              dkey: 'index_banner',
              dvalue: '首页'
          }],
          keyName: 'dkey',
          valueName: 'dvalue',
          value: 'index_banner',
          required: true
      }, {
          title: '顺序',
          field: 'orderNo',
          help: '数字越小，排序越靠前',
          required: true
      }, {
          title: 'banner图片',
          field: 'pic',
          type: 'img',
          help: '750*379',
          required: true,
          single: true
      }, {
          title: 'url地址',
          field: 'url'
      }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return (
        <div>
            {this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '805800',
            editCode: '805802',
            detailCode: '805807',
                buttons: this.buttons
        //     beforeSubmit: (params) => {
        //     params.systemCode = SYSTEM_CODE;
        //     params.companyCode = SYSTEM_CODE;
        //     return params;
        // }
        })};
            <UpDown
                updownVisible={this.state.updownVisible}
                setModalVisible={this.setModalVisible}
                code={this.state.code}
                onOk={() => {
                    this.setModalVisible(false);
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                    this.props.getPageData();
                }}/>
        </div>
    );
  }
}

export default BannerAddEdit;
