import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basedata/materiallist-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basedataMateriallistAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class materiallistAddedit extends React.Component {
        constructor(props) {
            super(props);
            this.code = getQueryString('code', this.props.location.search);
            this.view = !!getQueryString('v', this.props.location.search);
        }
        render() {
            const fields = [{
                    title: '节点名称',
                    field: 'bankName'
                }, {
                    title: '材料清单',
                    field: 'subbranch'
                }, {
                    title: '最新修改人',
                    field: 'updater'
                }, {
                    title: '最新修改时间',
                    field: 'updateDatetime',
                    type: 'date'
                }, {
                    title: '备注',
                    field: 'remark'
                }];
                return this.props.buildDetail({
                    fields,
                    code: this.code,
                    view: this.view,
                    addCode: 632030,
                    editCode: 632032,
                    detailCode: 632036
                });
            }
        }

        export default materiallistAddedit;
