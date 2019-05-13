import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, isExpressConfirm } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ArchivesAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
          field: 'operator',
          hidden: true,
          value: getUserId()
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true,
            formatter: (v, d) => {
                return <div>
                    {d.code}<a href={`/ywcx/ywcx/addedit?v=1&code=${d.code}`} style={{ marginLeft: 20 }}>查看详情</a>
                </div>;
            }
        }, {
            title: '客户姓名',
            field: 'applyUserName',
            readonly: true,
            formatter: (v, d) => {
                return d.creditUser ? d.creditUser.userName : '';
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            formatter: (v, d) => {
                if (d.loanBankName) {
                    return d.repaySubbranch ? d.loanBankName + d.repaySubbranch : d.loanBankName;
                } else if (d.repaySubbranch) {
                    return d.loanBankName ? d.loanBankName + d.repaySubbranch : d.repaySubbranch;
                }
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '业务类型',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer',
            required: true,
            readonly: true
        }, {
            title: '业务归属',
            field: 'ywyUser',
            formatter: (v, d) => {
                return d && d.saleUserCompanyName ? d.saleUserCompanyName + '-' + d.saleUserDepartMentName + '-' + d.saleUserPostName : '';
            },
            readonly: true
        }, {
            title: '指派归属',
            field: 'zfStatus',
            formatter: (v, d) => {
                return d && d.insideJobCompanyName ? d.insideJobCompanyName + '-' + d.insideJobDepartMentName + '-' + d.insideJobPostName + '-' + d.insideJobName : '';// hidden: !this.isEntry && !this.isCheck// 录入征信结果 审核才显示
            },
            readonly: true
        }, {
            title: '当前状态',
            field: 'fbhgpsNode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            params: { type: 'c' },
            readonly: true
        }, {
            title: '档案存放位置',
            field: 'enterLocation',
            type: 'select',
            key: 'enter_location',
            required: true
        // }, {
        //     title: '本次存放清单',
        //     field: 'fileList',
        //     type: 'o2m',
        //     listCode: 632227,
        //     options: {
        //         add: !this.view,
        //         edit: !this.view,
        //         delete: !this.view,
        //         detail: true,
        //         fields: [{
        //             title: '文件内容',
        //             field: 'content'
        //         }, {
        //             title: '份数',
        //             field: 'fileCount'
        //         }, {
        //             title: '存放人',
        //             field: 'operator'
        //         }, {
        //             title: '存放时间',
        //             field: 'depositDateTime',
        //             type: 'datetime'
        //         }, {
        //             title: '备注',
        //             field: 'remark'
        //         }]
        //     }
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            editCode: 632229
        });
    }
}

export default ArchivesAddEdit;
