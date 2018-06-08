import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/administrative/fixedAssets-addedit';
import {getQueryString, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.administrativeFixedAssetsAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class fixedAssetsAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.hideStatus = true;

        this.buttons = [];

        if (this.isCheck) {
            this.buttons = [{
                title: '通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.remark = params.remark;
                    data.approveResult = '1';
                    data.updater = getUserId();
                    this.props.doFetching();
                    fetch(632641, data).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                }
            }, {
                title: '不通过',
                check: true,
                handler: (params) => {
                    let data = {};
                    data.code = this.code;
                    data.remark = params.remark;
                    data.approveResult = '2';
                    data.updater = getUserId();
                    this.props.doFetching();
                    fetch(632641, data).then(() => {
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
    }

    render() {
        const fields = [{
            title: '申请概要',
            field: 'applyNote',
            required: true
        }, {
            title: '类型',
            field: 'type',
            value: '2',
            hidden: true
        }, {
            title: '是否印刷品制作',
            field: 'isPrint',
            type: 'select',
            data: [{
                dkey: '1',
                dvalue: '是'
            }, {
                dkey: '2',
                dvalue: '否'
            }],
            keyName: 'dkey',
            valueName: 'dvalue',
            value: this.code ? '' : '2',
            required: true,
            onChange: (value) => {
                this.hideStatus = value === '2';
            }
        }, {
            title: '物品列表',
            field: 'assertGoodsList',
            type: 'o2m',
            hidden: !this.hideStatus,
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {x: 800},
                fields: [{
                    title: '产品',
                    field: 'productCode',
                    type: 'select',
                    listCode: '632767',
                    params: {},
                    keyName: 'productCode',
                    valueName: 'productName',
                    required: true,
                    onChange: (v, data, props) => {
                        props.setPageData({
                            price: data.price
                        });
                    }
                }, {
                    title: '出库价格',
                    field: 'price',
                    readonly: true,
                    required: true
                }, {
                    title: '申请数量',
                    field: 'quantity',
                    number: true,
                    required: true
                }, {
                    title: '备注',
                    field: 'remark'
                }]
            }
        }, {
            title: '制作用户列表',
            field: 'assertUserList',
            type: 'o2m',
            hidden: this.hideStatus,
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {x: 800},
                fields: [{
                    title: '用户',
                    field: 'userId',
                    type: 'select',
                    listCode: 632807,
                    keyName: 'userId',
                    valueName: '{{departmentName.DATA}}{{postName.DATA}}-{{realName.DATA}}',
                    searchName: 'realName',
                    required: true,
                    render: (v, data) => {
                        return data.archive ? data.archive.realName : '-';
                    }
                }, {
                    title: '印刷数量',
                    field: 'printQuantity',
                    number: true,
                    required: true
                }]
            }
        }, {
            title: '附件',
            field: 'pdf',
            type: 'img'
        }, {
            title: '备注',
            field: 'remark',
            readonly: !(this.isCheck || !this.code)
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632640,
            detailCode: 632646,
            buttons: this.buttons,
            beforeSubmit: (data) => {
                data.applyUser = getUserId();
                return data;
            }
        });
    }
}

export default fixedAssetsAddedit;
