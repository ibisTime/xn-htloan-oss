import React from 'react';
import { Form } from 'antd';
import { getQueryString, showWarnMsg, showSucMsg, getUserId,
  isExpressConfirm } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class applyGpsCheck extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.type = !!getQueryString('type', this.props.location.search);// 公司0  个人1
  }
  render() {
    const fields = [
    //     {
    //   title: '申请人姓名',
    //   field: 'applyUserName',
    //   formatter: (v, d) => `${d.applyUserName}-${d.roleName}`,
    //   readonly: true
    // },
      {
      title: '申领团队',
      field: 'teamName',
      hidden: !this.state.pageData || !this.state.pageData.teamName,
      readonly: true,
      required: true
    },
      {
      title: '申领个数',
      field: 'applyCount',
      readonly: true,
      required: true
    },
      {
          title: '申领人',
          field: 'applyUserName',
          formatter: (v, d) => `${d.applyUserName}-${d.roleName}`,
          readonly: true,
        required: true
      },
      {
      title: '申领原因',
      field: 'applyReason',
      readonly: true
    }, {
      title: 'GPS列表',
      field: 'gpsList',
      required: true,
      type: 'o2m',
      options: {
        add: true,
        delete: true,
        fields: [{
          field: 'gpsType',
          title: 'GPS类型',
          type: 'select',
          data: [{
            dkey: '0',
            dvalue: '无线'
          }, {
            dkey: '1',
            dvalue: '有线'
          }],
          keyName: 'dkey',
          valueName: 'dvalue',
          required: true,
          onChange: (v, l, updateSelectData) => {
            if (updateSelectData && this.state.oSelectData['gpsList']) {
              let list = this.state.oSelectData['gpsList'].code.filter((c) => c.gpsType === v);
              updateSelectData('code', list);
            }
          }
        }, {
          title: 'GPS设备号',
          field: 'code',
          type: 'select',
          listCode: 632707,
          params: {
            applyStatus: '0',
            useStatus: '0'
          },
          keyName: 'code',
          valueName: 'gpsDevNo',
          nowrap: true,
          required: true
        }]
      }
    }, {
      title: '审核说明',
      field: 'approveNote',
      textarea: true,
      normalArea: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632716,
      buttons: [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '0';
          param.code = this.code;
          param.approveUser = getUserId();
          let bizCode = this.type ? 632713 : 632712;
          // if (this.type) { // 个人审核
          //
          // } else{
          //
          // }
          if (!param.gpsList || param.gpsList.length < 1) {
            showWarnMsg('请添加GPS列表');
            return;
          }
          this.doFetching();
          fetch(bizCode, param).then((data) => {
            showSucMsg('操作成功');
            isExpressConfirm(data);
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '不通过',
        handler: (param) => {
          param.approveResult = '1';
          param.operator = getUserId();
          let bizCode = this.type ? 632713 : 632712;
          // if (this.type) { // 个人审核
          //
          // } else{
          //
          // }
          this.doFetching();
          fetch(bizCode, param).then(() => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.cancelFetching);
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

export default applyGpsCheck;
