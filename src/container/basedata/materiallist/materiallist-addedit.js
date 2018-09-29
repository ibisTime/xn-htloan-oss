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
            title: '序号',
            field: 'no'
        }, {
            title: '名称',
            field: 'name'
        }, {
            title: '份数',
            field: 'number'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            key: 'id',
            addCode: 632210,
            editCode: 632212,
            detailCode: 632216
        });
    }
}

export default materiallistAddedit;