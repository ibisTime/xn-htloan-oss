import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/trailer-addedit';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizYellowListAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class trailerAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
          }, {
            field: 'user',
            title: '贷款人',
            formatter: (v, d) => {
              return d.user.realName;
            }
          }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date'
          }, {
            title: '标识日期',
            field: 'overdueHandleDatetime',
            type: 'date'
          }, {
            title: '为还清收成本',
            field: 'restTotalCost',
            amount: true
          }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541
            });
    }
}

export default trailerAddedit;