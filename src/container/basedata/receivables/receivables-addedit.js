import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class receivablesAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.index = 0;
        this.state = {
            ...this.state,
            // 当前是否是垫资账号
            isDz: false
        };
    }
    setCompanySelectData(list) {
        this.setState({
            selectData: {
                ...this.state.selectData,
                companyCode: list
            }
        });
    }
    render() {
        const { isDz } = this.state;
        const fields = [{
            title: '账号类型',
            field: 'type',
            required: true,
            type: 'select',
            key: 'collect_type',
            keyName: 'dkey',
            valueName: 'dvalue',
            onChange: (v, d) => {
                if (!v) {
                    this.setCompanySelectData([]);
                    this.props.form.setFieldsValue({
                        companyCode: ''
                    });
                } else if (v === '1' || v === '4') {
                    fetch(630106, {
                        typeList: [1],
                        status: '1'
                    }).then(data => {
                        this.setCompanySelectData(data);
                    });
                } else {
                    fetch(632067).then(data => {
                        let list = data.map(item => ({
                            code: item.code,
                            name: item.fullName
                        }));
                        this.setCompanySelectData(list);
                    });
                }
                this.setState({
                    isDz: v === '4'
                });
            }
        }, {
            title: '类型',
            field: 'advanceType',
            type: 'select',
            keyName: 'dkey',
            valueName: 'dvalue',
            data: [{
                dkey: '1',
                dvalue: '收款'
            }, {
                dkey: '2',
                dvalue: '出款'
            }],
            required: isDz,
            hidden: !isDz
        }, {
            title: '公司名称',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1],
                status: '1'
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '户名',
            field: 'realName',
            required: true
        }, {
            title: '开户行',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            required: true
        }, {
            title: '支行',
            field: 'subbranch',
            required: true
        }, {
            title: '账号',
            field: 'bankcardNumber',
            required: true,
            bankCard: true
        }, {
            title: '收款比例',
            required: true,
            number3: true,
            help: '请输入0~1之间的小数',
            field: 'pointRate'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632000,
            editCode: 632002,
            detailCode: 632006
        });
    }
}

export default receivablesAddedit;
