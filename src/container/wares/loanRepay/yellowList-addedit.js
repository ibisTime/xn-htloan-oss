import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/wares/yellowList-addedit';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.waresYellowListAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class yellowListAddedit extends React.Component {
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
            title: '为还清收成本',
            field: 'restTotalCost',
            formatter: (v, d) => {
                return moneyFormat(d.repayBiz.restTotalCost);
            }
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

export default yellowListAddedit;