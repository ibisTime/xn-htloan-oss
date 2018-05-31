import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loan/admittance-check';
import {
    getQueryString,
    showWarnMsg,
    showSucMsg,
    getUserId
} from 'common/js/util';
import { CollapseWrapper } from 'component/collapse-detail/collapse-detail';
import { COMPANY_CODE } from 'common/js/config';
import LoanCreditEnteringEdit from 'component/loanCreditEntering-edit/loanCreditEntering-edit';
import LoanCreditReport from 'component/loanCredit-report/loanCredit-report';
import fetch from 'common/js/fetch';

@CollapseWrapper(
    state => state.loanAdmittanceCheck,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class AdmittanceCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // 风控专员审核
        this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
        // 风控主管审核
        this.isCheckDirector = !!getQueryString('isCheckDirector', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
      const fields = [{
        title: '贷款信息',
        items: [
          [
            {
              field: 'loanProductCode',
              title: '贷款产品',
              type: 'select',
              listCode: '632177',
              params: {
                status: '2'
              },
              keyName: 'code',
              valueName: 'name',
              required: true
            }, {
              field: 'isAdvanceFund',
              title: '是否垫资',
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
              required: true
            }
          ]
        ]
      }, {
        title: '拟购车辆信息',
        items: [
          [
            {
              field: 'bizType',
              title: '业务种类',
              type: 'select',
              key: 'budget_orde_biz_typer',
              required: true
            }, {
              field: 'loanPeriod',
              title: '贷款期限',
              type: 'select',
              key: 'loan_period',
              required: true
            }
          ],
          [
            {
              field: 'invoiceCompany',
              title: '开票单位',
              required: true
            }, {
              field: 'carBrand',
              title: '品牌',
              required: true
            }
          ],
          [
            {
              field: 'originalPrice',
              title: '市场指导价',
              amount: true,
              required: true
            }, {
              field: 'invoicePrice',
              title: '开票价',
              amount: true,
              required: true
            }, {
              field: 'carColor',
              title: '颜色',
              required: true
            }, {
              field: 'monthDeposit',
              title: '月供(元)',
              amount: true,
              required: true
            }
          ],
          [
            {
              field: 'firstAmount',
              title: '首付金额',
              amount: true,
              required: true
            }, {
              field: 'firstRate',
              title: '首付比例(%)',
              required: true
            }, {
              field: 'loanAmount',
              title: '贷款额',
              amount: true,
              required: true
            }, {
              field: 'settleAddress',
              title: '落户地点',
              required: true
            }
          ]
        ]
      }, {
        title: '申请人信息',
        items: [
          [
            {
              field: 'applyUserName',
              title: '申请人姓名',
              required: true
            }
          ],
          [
            {
              field: 'gender',
              title: '性别',
              type: 'select',
              key: 'gender',
              required: true
            }, {
              field: 'marryState',
              title: '婚姻状况',
              type: 'select',
              key: 'marry_state',
              required: true
            }
          ],
          [
            {
              field: 'nation',
              title: '民族',
              required: true
            }, {
              field: 'education',
              title: '学历',
              type: 'select',
              key: 'education',
              required: true
            }
          ],
          [
            {
              field: 'idNo',
              title: '身份证号',
              idCard: true,
              required: true
            }, {
              field: 'familyNumber',
              title: '家庭人口',
              required: true
            }, {
              field: 'mobile',
              title: '手机号',
              mobile: true,
              required: true
            }
          ],
          [
            {
              field: 'nowAddress',
              title: '现居住地址',
              required: true
            }, {
              field: 'postCode1',
              title: '邮编1',
              required: true
            }
          ],
          [
            {
              field: 'residenceAddress',
              title: '户口所在地',
              required: true
            }, {
              field: 'postCode2',
              title: '邮编2',
              required: true
            }
          ],
          [
            {
              field: 'familyMainAsset',
              title: '家庭主要财产',
              required: true
            }, {
              field: 'mainAssetInclude',
              title: '主要财产包括',
              required: true
            }
          ],
          [
            {
              field: 'mainIncome',
              title: '主要收入来源',
              type: 'select',
              key: 'main_income',
              required: true
            }
          ],
          [
            {
              field: 'workCompanyName',
              title: '工作单位名称',
              required: true
            }, {
              field: 'workCompanyAddress',
              title: '工作单位地址',
              required: true
            }
          ],
          [
            {
              field: 'selfCompanyArea',
              title: '自营公司单位面积'
            }, {
              field: 'employeeQuantity',
              title: '员工数量'
            }, {
              field: 'enterpriseMonthOutput',
              title: '企业月产值'
            }
          ],
          [
            {
              field: 'position',
              title: '职位'
            }, {
              field: 'postTitle',
              title: '职称'
            }, {
              field: 'monthIncome',
              title: '月收入'
            }
          ]
        ]
      }, {
        title: '配偶信息',
        items: [
          [
            {
              field: 'mateName',
              title: '姓名'
            }, {
              field: 'mateMobile',
              title: '手机号',
              mobile: true
            }
          ],
          [
            {
              field: 'mateIdNo',
              title: '身份证号'
            }, {
              field: 'mateEducation',
              title: '学历',
              type: 'select',
              key: 'education'
            }
          ],
          [
            {
              field: 'mateCompanyName',
              title: '工作单位名称'
            }, {
              field: 'mateCompanyContactNo',
              title: '工作单位联系电话'
            }
          ],
          [
            {
              field: 'mateCompanyAddress',
              title: '工作单位地址'
            }
          ]
        ]
      }, {
        title: '担保人信息',
        items: [
          [
            {
              field: 'guaName',
              title: '姓名'
            }, {
              field: 'guaMobile',
              title: '手机号',
              mobile: true
            }
          ],
          [
            {
              field: 'guaIdNo',
              title: '身份证号'
            }, {
              field: 'guaPhone',
              title: '固定电话'
            }
          ],
          [
            {
              field: 'guaCompanyName',
              title: '工作单位名称'
            }, {
              field: 'guaCompanyAddress',
              title: '工作单位地址'
            }, {
              field: 'guaHouseAssetAddress',
              title: '担保人房产地址'
            }
          ]
        ]
      }, {
        title: '紧急联系人',
        items: [
          [
            {
              field: 'emergencyName1',
              title: '联系人1姓名'
            }, {
              field: 'emergencyRelation1',
              title: '与申请人关系'
            }, {
              field: 'emergencyMobile1',
              title: '手机号码',
              mobile: true
            }
          ],
          [
            {
              field: 'emergencyName2',
              title: '联系人2姓名'
            }, {
              field: 'emergencyRelation2',
              title: '与申请人关系'
            }, {
              field: 'emergencyMobile2',
              title: '手机号码',
              mobile: true
            }
          ]
        ]
      }, {
        title: '流水数据',
        items: [
          [
            {
              field: 'jourDatetime',
              title: '流水时间',
              type: 'date',
              rangedate: ['jourDatetimeStart', 'jourDatetimeEnd'],
              required: true
            }
          ],
          [
            {
              field: 'jourIncome',
              title: '收入',
              required: true
            },
            {
              field: 'jourExpend',
              title: '支出',
              required: true
            }
          ],
          [
            {
              field: 'jourBalance',
              title: '账户余额',
              required: true
            },
            {
              field: 'jourMonthIncome',
              title: '月均收入',
              required: true
            },
            {
              field: 'jourMonthExpend',
              title: '月均支出',
              required: true
            }
          ],
          [
            {
              field: 'jourRemark',
              title: '备注',
              type: 'textarea',
              normalArea: true,
              required: true
            }
          ]
        ]
      }, {
        title: '家庭房产情况及家访',
        items: [
          [
            {
              field: 'houseContract',
              title: '购房合同',
              type: 'img'
            },
            {
              field: 'housePicture',
              title: '房屋照片',
              type: 'img'
            }
          ]
        ]
      }, {
        field: 'approveNote',
        title: '审核说明',
        type: 'textarea',
        normalArea: true,
        readonly: false
      }];
      return this.props.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632146,
        editCode: this.isCheckCommissioner ? 632121 : 632122,
        buttons: [{
          title: '通过',
          check: true,
          handler: (params) => {
            params.approveResult = 1;
            params.operator = getUserId();
            let bizCode = this.isCheckCommissioner ? 632121 : 632122;
            this.props.doFetching();
            fetch(bizCode, params).then(() => {
              this.props.cancelFetching();
              showSucMsg('操作成功');
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(() => {
              this.props.cancelFetching();
            });
          }
        }, {
          title: '不通过',
          check: true,
          handler: (params) => {
            params.approveResult = 0;
            params.operator = getUserId();
            let bizCode = this.isCheckCommissioner ? 632121 : 632122;
            this.props.doFetching();
            fetch(bizCode, params).then(() => {
              this.props.cancelFetching();
              showSucMsg('操作成功');
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(() => {
              this.props.cancelFetching();
            });
          }
        }, {
          title: '返回',
          handler: () => {
            this.props.history.go(-1);
          }
        }]
      });
    }
}

export default AdmittanceCheck;
