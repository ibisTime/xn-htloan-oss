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
          readonly: true
        }, {
          title: '业务编号',
          field: 'code',
          readonly: true
        }, {
          title: '性别',
          field: 'customerSex',
          readonly: true
        }, {
          title: '身份证',
          field: 'idNo',
          readonly: true
        }, {
          title: '生日',
          field: 'customerBirth',
          readonly: true
        }, {
          title: '住所',
          field: 'applyNowAddress',
          readonly: true
        }, {
          title: '邮政编码',
          field: 'postcode',
          required: true
        }, {
          title: '家庭电话',
          field: 'familyPhone'
        }, {
          title: '手机',
          field: 'mobile',
          readonly: true
        }, {
          title: '工作单位',
          field: 'applyUserCompany',
          readonly: true
        }, {
          title: '职务',
          field: 'applyUserDuty',
          readonly: true
        }, {
          title: '单位电话',
          field: 'applyUserCompanyPhone'
        }]
      ]
    }, {
      title: '配偶信息',
      open: true,
      items: [
        [{
          title: '客户姓名',
          field: 'ghRealName',
          readonly: true
        }, {
          title: '身份证',
          field: 'ghIdNo',
          readonly: true
        }, {
          title: '性别',
          field: 'ghSex',
          readonly: true
        }, {
          title: '手机电话',
          field: 'ghMobile',
          mobile: true
        }, {
          title: '共还人公司名称',
          field: 'ghCompanyName'
        }, {
          title: '与客户关系',
          field: 'applyUserGhrRelation',
          type: 'select',
          key: 'emergency_contact_relation',
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
          field: 'carBrand'
        }, {
          title: '车架号码',
          field: 'frameNo'
        }, {
          title: '发动机号码',
          field: 'engineNo'
        }, {
          title: '车辆颜色',
          field: 'carColor'
        }, {
          title: '品牌型号',
          field: 'carModel',
          readonly: true
        }, {
          title: '汽车总价',
          field: 'originalPrice',
          amount: true,
          readonly: true
        }, {
          title: '汽车发票价',
          field: 'invoicePrice',
          amount: true,
          readonly: true
        }, {
          title: '汽车经销商名称',
          field: 'carDealerName',
          readonly: true
        }, {
          title: '汽车经销商（联系电话）',
          field: 'carDealerPhone',
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
          field: 'fullName',
          formatter: (v, d) => {
            return d.bankSubbranch.fullName;
          },
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
          field: 'bankCardNumber'
        }]
      ]
    }, {
      title: '档案信息',
      open: true,
      items: [
        [{
          title: '档案编号',
          field: 'customerName',
          formatter: (v, d) => {
            return d.code;
          },
          readonly: true
        }, {
          title: '分期',
          field: 'loanPeriods',
          readonly: true
        }, {
          title: '服务费',
          field: 'fee',
          amount: true,
          readonly: true
        }, {
          title: '月还款额',
          field: 'monthAmount',
          amount: true
        }, {
          title: '银行利率',
          field: 'bankRate',
          formatter: (v, d) => {
            return (d.bankRate * 100).toFixed(4) + '%';
          },
          readonly: true
        }, {
          title: '首付额',
          field: 'repayFirstMonthAmount',
          readonly: true
        }, {
          title: '总手续费(小写)',
          field: 'serviceCharge',
          amount: true,
          readonly: true
        }, {
          title: '总手续费(大写)',
          field: 'code',
          formatter: (v, d) => {
            return moneyUppercase(moneyFormat(d.serviceCharge));
          },
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
          readonly: true
        }, {
          title: '身份证',
          field: 'guarantor1IdNo',
          readonly: true
        }, {
          title: '性别',
          field: 'guarantor1Sex',
          readonly: true
        }, {
          title: '家庭电话',
          field: 'guarantorFamilyPhone'
        }, {
          title: '手机电话',
          field: 'guarantor1Mobile',
          readonly: true
        }, {
          title: '工作单位',
          field: 'guarantorCompanyName'
        }, {
          title: '担保人单位电话',
          field: 'guarantorCompanyPhone'
        }, {
          title: '担保人单位地址',
          field: 'guarantorCompanyAddress'
        }, {
          title: '担保人现地址',
          field: 'guarantorNowAddress'
        }]
      ]
    }, {
      title: '其他信息',
      open: true,
      items: [
        [{
          title: '承保公司',
          field: 'insuranceCompany',
          type: 'select',
          listCode: 632046,
          keyName: 'code',
          valueName: 'name'
        }],
        [{
          title: '客户分类',
          field: 'customerType',
          type: 'select',
          data: [{
            key: '1',
            value: '个人'
          }, {
            key: '2',
            value: '企业'
          }],
          keyName: 'key',
          valueName: 'value',
          readonly: true
        }],
        [{
          title: '客户具体情况说明',
          field: 'guarantApplyUserNote',
          type: 'textarea',
          normalArea: true
        }],
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
      detailCode: 632146,
      buttons: [{
          title: '打印',
          check: true,
          handler: (param) => {
            param.code = this.code;
            param.operator = getUserId();
            let num = param.guarantPrintTemplateId;
            this.props.doFetching();
            fetch(632142, param).then((data) => {
              if(num === '1') {
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
              this.props.cancelFetching();
              showSucMsg('操作成功');
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
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
