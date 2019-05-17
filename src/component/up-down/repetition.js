import React from 'react';
import { getQueryString, showSucMsg, getUserName } from 'common/js/util';
import ModalDetail from 'common/js/build-modal-detail';
import fetch from 'common/js/fetch';
class UpDown extends React.Component {
    render() {
        let { code, key = 'code', biz, onOk } = this.props;
        let locationField = {
            title: '跳转类型',
            required: true,
            type: 'select',
            data: [{
            key: '1',
            value: '车型'
        }, {
            key: '2',
            value: '资讯'
        }],
            keyName: 'key',
            valueName: 'value',
            field: 'level'
        };
        const options = {
            fields: [{
                field: key,
                value: code,
                hidden: true
            }, locationField, {
                field: 'carBrand',
                title: '车辆品牌',
                required: true,
                listCode: 630406,
                params: {
                    status: 1
                },
                type: 'select',
                keyName: 'code',
                valueName: 'name',
                onChange: (v) => {
                    if (!v) {
                        this.props.setSelectData({
                            key: 'carSeries',
                            data: []
                        });
                        // return;
                    } else {
                        fetch(630416, {
                            status: '1'
                        }).then(data => {
                            this.props.setSelectData({
                                key: 'carSeries',
                                data: data
                            });
                        });
                    }
                }
            }, {
                field: 'carSeries',
                title: '车辆车系',
                required: true,
                pageCode: 630415,
                params: {
                    status: 1
                },
                type: 'select',
                keyName: 'code',
                valueName: 'name'
            }, {
                field: 'carModel',
                title: '车辆型号',
                required: true,
                listCode: 630429,
                params: {
                    status: 1
                },
                type: 'select',
                keyName: 'code',
                valueName: 'name'
            }],
            addCode: 805800,
            beforeSubmit: (data) => {
                    data.code = data.code;
                    data.approveResult = 1;
                    data.approveUser = getUserName();
                return data;
            }
        };
        if (onOk) {
            options.onOk = () => onOk();
        }
        return (
            <ModalDetail
                title='复现'
                visible={this.props.updownVisible}
                hideModal={() => this.props.setModalVisible(false)}
                options={options} />
        );
    }
}

export default UpDown;
