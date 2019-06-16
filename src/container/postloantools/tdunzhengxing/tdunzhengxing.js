import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/tdunzhengxing';
import { getQueryString, showWarnMsg, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.bizTdunzhengxing,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class bizTdunzhengxing extends React.Component {
    constructor(props) {
        super(props);
        this.name = getQueryString('n', this.props.location.search);
        this.identityNo = getQueryString('no', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'code',
            type: 'select',
            pageCode: 632515,
            valueName: '{{code.DATA}}- {{saleUserName.DATA}}',
            keyName: 'code',
            title: '业务编号',
            params: {
                userId: getUserId()
            }
        }];
        return this.props.buildDetail({
            fields,
            buttons: [{
                title: '查询',
                check: true,
                type: 'primary',
                handler: (params) => {
                    this.props.doFetching();
                    fetch(632516, params).then((data) => {
                        this.props.cancelFetching();
                        if (data.id !== '-1') {
                            this.props.history.push(`/postloantools/tdunzhengxing/query?code=${params.code}`);
                        } else {
                            let result = JSON.parse(data.result);
                            showWarnMsg(result.msg || '查询失败');
                        }
                    }).catch(() => this.props.cancelFetching());
                }
            }]
        });
    }
}

export default bizTdunzhengxing;
