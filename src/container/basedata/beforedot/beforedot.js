import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/beforedot';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizBeforedot, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class Beforedot extends React.Component {
    constructor(props) {
        super(props);
        this.code = 'budget_back_rate';
    }

    render() {
        const fields = [{
            title: 'id',
            field: 'id',
            hidden: true
        }, {
            title: '返点比例',
            field: 'cvalue',
            amount: true,
            help: '请输入0～1之间的数值',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            key: 'key',
            code: this.code,
            detailCode: 630047,
            buttons: [{
                title: '确认',
                handler: (param) => {
                  param.ckey = this.props.pageData.ckey;
                  fetch(630042, param).then(() => {
                      showSucMsg('操作成功');
                      this.props.cancelFetching();
                  }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }]
        });
    }
}

export default Beforedot;
