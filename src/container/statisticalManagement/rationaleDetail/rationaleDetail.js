import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/statisticalManagement/rationaleDetail/rationaleDetail';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase
} from 'common/js/util';
import {
    CollapseWrapper
} from 'component/collapse-detail/collapse-detail';

@CollapseWrapper(
    state => state.rationaleDetail, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class rationaleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [
            {
                title: '打件',
                items: [
                    [{
                        title: '打件时间',
                        field: 'hitPieceDatetime',
                        type: 'date',
                        readonly: true
                    }, {
                        title: '打件说明',
                        field: 'hitPieceNote',
                        readonly: true
                    }]
                ]
            },
            {
                title: '理件',
                items: [
                    [{
                        title: '理件时间',
                        field: 'rationaleDatetime',
                        type: 'date',
                        readonly: true
                    }, {
                        title: '打件说明',
                        field: 'rationaleNote',
                        readonly: true
                    }]
                ]
            }
        ];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632516,
            buttons: [
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

export default rationaleDetail;
