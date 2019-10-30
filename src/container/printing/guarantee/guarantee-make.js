import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/printing/guarantee-make';
import {
  getQueryString,
  getUserId,
  showSucMsg,
  moneyFormat,
  moneyUppercase
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
  CollapseWrapper
} from 'component/collapse-detail/collapse-detail';
import { createHt } from '../../../common/js/contract/ICBC-dbht';
import { exportBOCZdzsxffq } from '../../../common/js/contract/BOC-zdzsxffq';
import { exportBOCSxfycx } from '../../../common/js/contract/BOC-sxfycx';
import { exportBOCDy } from '../../../common/js/contract/BOC-dy';
import { exportBOCCt } from '../../../common/js/contract/BOC-ct';
import { exportBOCJcdy } from '../../../common/js/contract/BOC-jcdy';
import { exportBOCZdzfjf } from '../../../common/js/contract/BOC-zdzfjf';
import { exportCCBDy } from '../../../common/js/contract/CCB-dy';
import { exportCCBFwf } from '../../../common/js/contract/CCB-fwf';
import { exportBOCFjd } from '../../../common/js/contract/CCB-fjd';
import { exportCCBJc } from '../../../common/js/contract/CCB-jc';
import { exportCCBXydb } from '../../../common/js/contract/CCB-xydb';
import './guarantee.css';

@CollapseWrapper(
  state => state.printingGuaranteeMake, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class GuaranteeMake extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '用户信息',
      items: [
        [{
          title: '客户姓名',
          field: 'customerName',
          _keys: ['creditUser', 'userName'],
          readonly: true
        }, {
          title: '业务编号',
          field: 'code',
          readonly: true
        }, {
          title: '性别',
          field: 'customerSex',
          _keys: ['creditUser', 'gender'],
          readonly: true
        }, {
          title: '身份证',
          field: 'idNo',
          _keys: ['creditUser', 'idNo'],
          readonly: true
        }, {
          title: '生日',
          field: 'customerBirth',
          _keys: ['creditUser', 'customerBirth'],
          readonly: true
        }, {
          title: '现居住地址',
          field: 'applyNowAddress',
          formatter: (v, d) => {
            if (d && d.creditUser) {
              return `${d.creditUser.nowAddressProvince || ''} ${d.creditUser.nowAddressCity || ''} ${d.creditUser.nowAddressArea || ''} ${d.creditUser.nowAddress || ''}`;
            }
            return '-';
          },
          readonly: true
        }, {
          title: '现居住地邮政编码',
          field: 'postcode',
          _keys: ['creditUser', 'nowPostCode'],
          readonly: true
        }, {
          title: '家庭电话',
          field: 'familyPhone',
          _keys: ['creditUser', 'familyPhone'],
          readonly: true
        }, {
          title: '手机',
          field: 'mobile',
          _keys: ['creditUser', 'mobile'],
          readonly: true
        }, {
          title: '工作单位',
          field: 'applyUserCompany',
          _keys: ['creditUser', 'companyName'],
          readonly: true
        }, {
          title: '职务',
          field: 'position',
          _keys: ['creditUser', 'position'],
          readonly: true
        }, {
          title: '单位电话',
          field: 'companyContactNo',
          _keys: ['creditUser', 'companyContactNo'],
          readonly: true
        }]
      ]
    }, {
      title: '配偶信息',
      open: true,
      items: [
        [{
          title: '客户姓名',
          field: 'ghRealName',
          _keys: ['mateUser', 'userName'],
          readonly: true
        }, {
          title: '身份证',
          field: 'ghIdNo',
          _keys: ['mateUser', 'idNo'],
          readonly: true
        }, {
          title: '性别',
          field: 'ghSex',
          _keys: ['mateUser', 'gender'],
          readonly: true
        }, {
          title: '手机电话',
          field: 'ghMobile',
          _keys: ['mateUser', 'mobile'],
          readonly: true
        }, {
          title: '共还人公司名称',
          field: 'ghCompanyName',
          _keys: ['mateUser', 'companyName'],
          readonly: true
        }, {
          title: '与客户关系',
          field: 'applyUserGhrRelation',
          type: 'select',
          key: 'credit_contacts_relation',
          _key: ['mateUser', 'relation'],
          readonly: true
        }, {
          title: '是否垫资',
          field: 'isAdvanceFund',
          type: 'select',
          data: [{
            key: '0',
            value: '否'
          }, {
            key: '1',
            value: '是'
          }],
          keyName: 'key',
          valueName: 'value',
          readonly: true
        }]
      ]
    }, {
      title: '车辆信息',
      open: true,
      items: [
        [{
          title: '车辆品牌',
          field: 'carBrand',
          _keys: ['carInfo', 'carBrandName'],
          readonly: true
        }, {
          title: '车辆车系',
          field: 'carSeries',
          _keys: ['carInfo', 'carSeries'],
          readonly: true
        }, {
          title: '品牌型号',
          field: 'carModel',
          _keys: ['carInfo', 'carModelName'],
          readonly: true
        }, {
          title: '车架号码',
          field: 'frameNo',
          _keys: ['carInfo', 'carFrameNo'],
          readonly: true
        }, {
          title: '发动机号码',
          field: 'engineNo',
          _keys: ['carInfo', 'carEngineNo'],
          readonly: true
        }, {
          title: '车辆颜色',
          field: 'carColor',
          _keys: ['carInfo', 'carColor'],
          readonly: true
        }, {
          title: '市场指导价(元)',
          field: 'originalPrice',
          amount: true,
          _keys: ['carInfo', 'originalPrice'],
          readonly: true
        }, {
          title: '开票价格(元)',
          field: 'invoicePrice',
          amount: true,
          _keys: ['carInfo', 'invoicePrice'],
          readonly: true
        }, {
          title: '汽车经销商名称',
          field: 'shopCarGarageName',
          _keys: ['carInfo', 'shopCarGarageName'],
          readonly: true
        }]
      ]
    }, {
      title: '贷款银行信息',
      open: true,
      items: [
        [{
          title: '贷款银行',
          field: 'loanBankName',
          readonly: true
        }],
        [{
          title: '银行名称（支行）',
          field: 'subbranchBankName',
          readonly: true
        }],
        [{
          title: '贷款额(小写)',
          field: 'loanAmount',
          amount: true,
          readonly: true
        }],
        [{
          title: '还款卡号',
          field: 'bankCardNumber',
          _keys: ['bankLoan', 'repayBankcardNumber'],
          readonly: true
        }]
      ]
    }, {
      title: '档案信息',
      open: true,
      items: [
        [{
          title: '档案编号',
          field: 'code1',
          formatter: (v, d) => {
            return d.code;
          },
          readonly: true
        }, {
          title: '分期',
          field: 'loanPeriods',
          _keys: ['bankLoan', 'periods'],
          readonly: true
        }, {
          title: '服务费',
          field: 'fee',
          _keys: ['bankLoan', 'fee'],
          amount: true,
          readonly: true
        }, {
          title: '月还款额(元)',
          field: 'monthAmount',
          _keys: ['bankLoan', 'monthAmount'],
          amount: true,
          readonly: true
        }, {
          title: '银行利率',
          field: 'bankRate',
          formatter: (v, d) => {
            return d && d.bankLoan ? (d.bankLoan.bankRate * 100).toFixed(4) + '%' : '-';
          },
          readonly: true
        }, {
          title: '首付额(元)',
          field: 'repayFirstMonthAmount',
          _keys: ['bankLoan', 'repayFirstMonthAmount'],
          amount: true,
          readonly: true
        }]
      ]
    }, {
      title: '担保人信息',
      open: true,
      items: [
        [{
          title: '担保人姓名',
          field: 'guarantor1Name',
          _keys: ['dbUser1', 'userName'],
          readonly: true
        }, {
          title: '身份证',
          field: 'guarantor1IdNo',
          _keys: ['dbUser1', 'idNo'],
          readonly: true
        }, {
          title: '性别',
          field: 'guarantor1Sex',
          _keys: ['dbUser1', 'gender'],
          readonly: true
        }, {
          title: '家庭电话',
          field: 'guarantorFamilyPhone',
          _keys: ['dbUser1', 'familyPhone'],
          readonly: true
        }, {
          title: '手机电话',
          field: 'guarantor1Mobile',
          _keys: ['dbUser1', 'mobile'],
          readonly: true
        }, {
          title: '工作单位',
          field: 'guarantorCompanyName',
          _keys: ['dbUser1', 'companyName'],
          readonly: true
        }, {
          title: '担保人单位电话',
          field: 'guarantorCompanyPhone',
          _keys: ['dbUser1', 'companyContactNo'],
          readonly: true
        }, {
          title: '担保人单位地址',
          field: 'guarantorCompanyAddress',
          _keys: ['dbUser1', 'companyName'],
          readonly: true
        }, {
          title: '担保人现地址',
          field: 'guarantorNowAddress',
          formatter: (v, d) => {
            if (d && d.dbUser1) {
              return `${d.dbUser1.nowAddressProvince || ''} ${d.dbUser1.nowAddressCity || ''} ${d.dbUser1.nowAddressArea || ''} ${d.dbUser1.nowAddress || ''}`;
            }
            return '-';
          },
          readonly: true
        }]
      ]
    }, {
      title: '其他信息',
      open: true,
      items: [
        [{
          title: '套打模板',
          field: 'guarantPrintTemplateId',
          type: 'select',
          key: 'guarant_print_template_id',
          required: true
        }]
      ]
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632516,
      beforeSetDetail: (data) => {
        // loanRole: 2共还人，3担保人
        if (data.creditUserList) {
          data.creditUserList.forEach(user => {
            if (user.loanRole === '2') {
              data.mateUser = user;
            } else if (user.loanRole === '3') {
              if (!data.dbUser1) {
                data.dbUser1 = user;
              } else {
                data.dbUser2 = user;
              }
            }
          });
        }
        return data;
      },
      buttons: [{
          title: '打印',
          check: true,
          handler: (param) => {
            const data = this.props.pageData;
            let num = param.guarantPrintTemplateId;
            data.mateUser = data.mateUser || {};
            data.dbUser1 = data.dbUser1 || {};
            data.bankLoan = data.bankLoan || {};
            data.carInfo = data.carInfo || {};
            this.props.doFetching();
            setTimeout(() => {
              this.props.cancelFetching();
              // this.props.history.go(-1);
            }, 1000);
            if (num === '1') {
              createHt(data);
            } else if(num === '2') {
              exportBOCZdzsxffq(data);
            } else if(num === '3') {
              exportBOCSxfycx(data);
            } else if(num === '4') {
              exportBOCDy(data);
            } else if(num === '5') {
              exportBOCCt(data);
            } else if(num === '6') {
              exportBOCJcdy(data);
            } else if(num === '8') {
              exportBOCZdzfjf(data);
            } else if(num === '9') {
              exportCCBDy(data);
            } else if(num === '10') {
              exportCCBFwf(data);
            } else if(num === '11') {
              exportBOCFjd(data);
            } else if(num === '12') {
              exportCCBJc(data);
            } else if(num === '13') {
              exportCCBXydb(data);
            }
          }
        },
        {
          title: '返回',
          handler: (param) => {
            this.props.history.go(-1);
          }
        }
      ]
    });
  }
}

export default GuaranteeMake;
