import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/public/banner-addedit';
import {getQueryString, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {SYSTEM_CODE} from 'common/js/config';
import UpDown from 'component/up-down/repetition';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.publicBannerAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class BannerAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.contentType = getQueryString('contentType', this.props.location.search) || '1';
        // 是否是车型
        this.state = {
            // 窗口是否显示
            biz: '',
            code: '',
            updownVisible: false
        };
    }

    setModalVisible = (updownVisible) => {
        this.setState({updownVisible});
    }

    render() {
        const fields = [{
            field: 'status',
            value: 1,
            hidden: true
        }, {
            field: 'companyCode',
            hidden: true
            // value: COMPANY_CODE
        }, {
            field: 'type',
            value: 2,
            hidden: true
        }, {
            field: 'belong',
            value: 1,
            hidden: true
        }, {
            field: 'isCompanyEdit',
            value: 0,
            hidden: true
        }, {
            title: 'banner名称',
            field: 'name',
            required: true
        }, {
            title: '位置',
            field: 'location',
            type: 'select',
            // key: 'banner_location',
            data: [{
                dkey: 'index_banner',
                dvalue: '首页'
            }],
            keyName: 'dkey',
            valueName: 'dvalue',
            value: 'index_banner',
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            help: '数字越小，排序越靠前',
            required: true
        }, {
            title: 'banner图片',
            field: 'pic',
            type: 'img',
            help: '750*379',
            required: true,
            single: true
        }, {
            title: '跳转类型',
            field: 'contentType',
            type: 'select',
            data: [{
                key: '1',
                value: '网页'
            }, {
                key: '2',
                value: '车型'
            }, {
                key: '3',
                value: '资讯'
            }],
            keyName: 'key',
            valueName: 'value',
            value: '1',
            required: true,
            onChange: (value) => {
                if (value) {
                    this.contentType = value;
                }
            }
        }, {
            title: '资讯',
            field: 'parentCode',
            type: 'select',
            hidden: this.contentType !== '3',
            listCode: '630457',
            params: {
                status: '1'
            },
            keyName: 'code',
            valueName: 'title'
        }, {
            title: 'url地址',
            field: 'url',
            hidden: this.contentType !== '1'
        }, {
            title: '车辆品牌',
            field: 'brandCode',
            type: 'select',
            params: {
                status: '1'
            },
            listCode: '630406',
            keyName: 'code',
            valueName: 'name',
            required: true,
            hidden: this.contentType !== '2',
            formatter: (value, data) => {
                if(data.contentType === '2') {
                    fetch(630416, { status: '1', brandCode: value }).then((data) => {
                        this.props.setSelectData({
                            data: data,
                            key: 'seriesCode'
                        });
                    }).catch();
                    fetch(630429, { status: '1', seriesCode: data.seriesCode }).then((data) => {
                        this.props.setSelectData({
                            data: data,
                            key: 'parentCode'
                        });
                    }).catch();
                    this.flag = false;
                }
                return value;
            },
            onChange: (value) => {
                if(value) {
                    this.props.doFetching();
                    fetch(630416, { status: '1', brandCode: value }).then((data) => {
                        this.props.setSelectData({
                            data: data,
                            key: 'seriesCode'
                        });
                        this.props.form.setFieldsValue({
                            seriesCode: '',
                            parentCode: ''
                        });
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }
        }, {
            title: '车辆车系',
            field: 'seriesCode',
            type: 'select',
            required: true,
            hidden: this.contentType !== '2',
            keyName: 'code',
            valueName: 'name',
            onChange: (value) => {
                if(value) {
                    this.props.doFetching();
                    fetch(630429, { status: '1', seriesCode: value }).then((data) => {
                        this.props.setSelectData({
                            data: data,
                            key: 'parentCode'
                        });
                        this.props.form.setFieldsValue({
                            parentCode: ''
                        });
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }
        }, {
            title: '车辆型号',
            field: 'parentCode',
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true,
            hidden: this.contentType !== '2'
        }, {
            title: '备注',
            field: 'remark',
            maxlength: 250
        }];
        return (
            <div>
                {this.props.buildDetail({
                    fields,
                    code: this.code,
                    view: this.view,
                    addCode: '805800',
                    editCode: '805802',
                    detailCode: '805807',
                    beforeSubmit: (params) => {
                        params.systemCode = SYSTEM_CODE;
                        params.companyCode = SYSTEM_CODE;
                        return params;
                    }
                })};
                <UpDown
                    updownVisible={this.state.updownVisible}
                    setModalVisible={this.setModalVisible}
                    code={this.state.code}
                    onOk={() => {
                        this.setModalVisible(false);
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                        this.props.getPageData();
                    }}/>
            </div>
        );
    }
}

export default BannerAddEdit;
