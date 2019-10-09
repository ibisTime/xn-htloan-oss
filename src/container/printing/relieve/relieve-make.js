import React from 'react';
import { getWorkbook } from 'common/js/xlsx-util';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/relieve-make';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase,
    dateFormat,
    formatDate
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
    state => state.printingRelieveMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RelieveMake extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            _keys: ['creditUser', 'userName'],
            readonly: true
        }, {
            title: '业务编号',
            field: 'code1',
            formatter: () => this.code,
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            _keys: ['creditUser', 'idNo'],
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            readonly: true
        }, {
            title: '解除日期',
            field: 'releaseDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '套打模版',
            field: 'releaseTemplateId',
            type: 'select',
            key: 'release_print_template_id',
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
                      let num = param.releaseTemplateId;
                      data.mateUser = data.mateUser || {};
                      data.dbUser1 = data.dbUser1 || {};
                      data.bankLoan = data.bankLoan || {};
                      data.carInfo = data.carInfo || {};
                      this.props.doFetching();
                      setTimeout(() => {
                        this.props.cancelFetching();
                        this.props.history.go(-1);
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

export default RelieveMake;
