import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/transmit/collection-check';
import {
  getQueryString,
  getUserId,
  showSucMsg,
  isExpressConfirm
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(state => state.transmitCollectionCheck, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class CollectionCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
      this.toNodeCode = getQueryString('toNodeCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
      this.buttons = [];
      if(this.toNodeCode === 'e8') {
          this.buttons = [{
              title: '收件并审核通过',
              handler: (param) => {
                  param.operator = getUserId();
                  param.approveResult = '1';
                  fetch(632152, param).then((data) => {
                      this.doSuccess(data);
                  }).catch(this.props.cancelFetching);
              },
              check: true
          }, {
              title: '返回',
              handler: (param) => {
                  this.props.history.go(-1);
              }
          }];
      }else {
          this.buttons = [{
              title: '收件并审核通过',
              handler: (param) => {
                  param.operator = getUserId();
                  param.approveResult = '1';
                  fetch(632151, param).then((data) => {
                      this.doSuccess(data);
                  }).catch(this.props.cancelFetching);
              },
              check: true
          }, {
              title: '收件待补件',
              handler: (param) => {
                  param.operator = getUserId();
                  param.approveResult = '0';
                  fetch(632151, param).then((data) => {
                      this.doSuccess(data);
                  }).catch(this.props.cancelFetching);
              },
              check: true
          }, {
              title: '返回',
              handler: (param) => {
                  this.props.history.go(-1);
              }
          }];
      }
      }
    doSuccess = (data) => {
        showSucMsg('操作成功');
        isExpressConfirm(data);
        this.props.cancelFetching();
        setTimeout(() => {
            this.props.history.go(-1);
        }, 1000);
    }
  render() {
    const fields = [{
        title: '客户姓名',
        field: 'customerName',
        readonly: true
    }, {
        title: '业务编号',
        field: 'bizCode',
        readonly: true,
        formatter: (v, d) => {
            return <div>
                {d.code}<a href="javascript:void(0);" style={{ marginLeft: 20 }} onClick={() => {
                window.location.href = '/ywcx/ywcx/addedit?v=1&code' + '=' + this.code;
            }}>查看详情</a>
            </div>;
        }
    }, {
        title: '发件节点',
        field: 'fromNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        params: {type: 'a'},
        hidden: !this.props.pageData.fromNodeCode,
        readonly: true
    }, {
        title: '收件节点',
        field: 'toNodeCode',
        type: 'select',
        listCode: 630147,
        keyName: 'code',
        valueName: 'name',
        readonly: true
    }, {
        title: '业务团队',
        field: 'teamName',
        readonly: true
    }, {
        title: '信贷专员',
        field: 'saleUserName',
        readonly: true
    }, {
        title: '内勤专员',
        field: 'insideJobName',
        readonly: true
    }, {
        title: '发件人',
        field: 'senderName',
        hidden: !this.props.pageData.senderName,
        readonly: true
    }, {
        title: '收件人',
        field: 'receiverName',
        hidden: !this.props.pageData.receiverName,
        readonly: true
    }, {
        title: '材料清单',
        field: 'filelist',
        type: 'checkbox',
        listCode: 632217,
        keyName: 'id',
        valueName: '{{no.DATA}}-{{vname.DATA}}-{{number.DATA}}份',
        render: (v, d) => {
            if (d.filelist) {
                return d.filelist.split(',');
             } else {
                return [];
            }
        },
        readonly: true
    }, {
        title: '传递方式',
        field: 'sendType',
        type: 'select',
        data: [{
            key: '1',
            value: '线下'
        }, {
            key: '2',
            value: '快递'
        }],
        keyName: 'key',
        valueName: 'value',
        readonly: true
    }, {
        title: '快递公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        readonly: true
    }, {
        title: '快递单号',
        field: 'logisticsCode',
        readonly: true
    }, {
        title: '发货时间',
        field: 'sendDatetime',
        type: 'datetime',
        readonly: true
    }, {
        title: '发货说明',
        field: 'sendNote',
        readonly: true
    }, {
        title: '备注',
        field: 'remark'
    }];
    return this.props.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632156,
        buttons: this.buttons
      });
  }
}

export default CollectionCheck;
