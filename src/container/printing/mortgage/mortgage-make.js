import React from 'react';
import { getWorkbook } from 'common/js/xlsx-util';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/mortgage-make';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase,
    dateFormat,
    formatDate,
    numUppercase,
    moneyReplaceComma,
    moneyParse
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';
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
@DetailWrapper(
    state => state.printingMortgageMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class MortgageMake extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '主贷人姓名',
            field: 'customerName',
            _keys: ['creditUser', 'userName'],
            readonly: true
        }, {
            title: '身份证号码',
            field: 'idNo',
            _keys: ['creditUser', 'idNo'],
            readonly: true
        }, {
            title: '配偶姓名',
            field: 'ghRealName',
            _keys: ['mateUser', 'userName'],
            readonly: true
        }, {
            title: '身份证号码',
            field: 'ghIdNo',
            _keys: ['mateUser', 'idNo'],
            readonly: true
        }, {
            title: '家庭地址',
            field: 'applyNowAddress',
            formatter: (v, d) => {
              if (d && d.creditUser) {
                return `${d.creditUser.nowAddressProvince || ''} ${d.creditUser.nowAddressCity || ''} ${d.creditUser.nowAddressArea || ''} ${d.creditUser.nowAddress || ''}`;
              }
              return '-';
            },
            readonly: true
        }, {
            title: '合同编号',
            field: 'bankContractCode',
            readonly: true
        }, {
            title: '账单日',
            field: 'billDatetime',
            _keys: ['bankLoan', 'repayBankDate'],
            readonly: true
        }, {
            title: '车牌号',
            field: 'carNumber',
            _keys: ['carInfo', 'carNumber'],
            readonly: true
        }, {
            title: '车架号',
            field: 'frameNo',
            _keys: ['carInfo', 'carFrameNo'],
            readonly: true
        }, {
            title: '发动机号',
            field: 'engineNo',
            _keys: ['carInfo', 'carEngineNo'],
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '银行贷款额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '服务费',
            field: 'fee',
            amount: true,
            _keys: ['bankLoan', 'fee'],
            readonly: true
        }, {
            title: '履约保证金',
            field: 'lyDeposit',
            amount: true,
            readonly: true
        }, {
            title: '贷款期限（年）',
            field: 'loanPeriods',
            _keys: ['bankLoan', 'periods'],
            readonly: true
        }, {
            title: '银行全称',
            field: 'fullName',
            formatter: (v, d) => {
                return d && d.bankName ? d.bankName.bankName + d.bankName.subbranch : '';
            },
            readonly: true
        }, {
            title: '银行委托人',
            field: 'bankClient',
            _keys: ['bank', 'bankClient'],
            readonly: true
        }, {
            title: '银行地址',
            field: 'address',
            _keys: ['bank', 'address'],
            readonly: true
        }, {
            title: '银行电话',
            field: 'phoneNumber',
            _keys: ['bank', 'mobile'],
            readonly: true
        }, {
            title: '委托数有效期',
            field: 'clientValidDate',
            _keys: ['bank', 'clientValidDate'],
            readonly: true
        }, {
            title: '授权人姓名',
            field: 'autherName',
            _keys: ['bank', 'autherName'],
            readonly: true
        }, {
            title: '授权人身份证',
            field: 'autherIdNo',
            _keys: ['bank', 'autherIdNo'],
            readonly: true
        }, {
            title: '授权人电话',
            field: 'autherPhoneNumber',
            _keys: ['bank', 'autherPhoneNumber'],
            readonly: true
        }, {
            title: '授权人地址',
            field: 'autherAddress',
            _keys: ['bank', 'autherAddress'],
            readonly: true
        }, {
            title: '信用卡类型',
            field: 'creditCardType',
            _keys: ['bank', 'creditCardType'],
            type: 'select',
            key: 'credit_card_type',
            readonly: true
        }, {
            title: '信用卡名称',
            field: 'creditCardName',
            _keys: ['bank', 'creditCardName'],
            readonly: true
        }, {
            title: '所属地区',
            field: 'belongArea',
            _keys: ['bank', 'belongArea'],
            readonly: true
        }, {
            title: '套打模版',
            field: 'pledgePrintTemplateId',
            type: 'select',
            key: 'pledge_print_template_id',
            required: true
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
                        let num = param.pledgePrintTemplateId;
                        data.mateUser = data.mateUser || {};
                        data.dbUser1 = data.dbUser1 || {};
                        data.bankLoan = data.bankLoan || {};
                        data.carInfo = data.carInfo || {};
                        this.props.doFetching();
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
                        setTimeout(() => {
                          this.props.cancelFetching();
                          this.props.history.go(-1);
                        }, 1000);
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

export default MortgageMake;
