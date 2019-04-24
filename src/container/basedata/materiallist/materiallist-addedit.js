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
            title: '类型',
            field: 'attachType',
            required: true,
            type: 'select',
            data: [{
                key: '图片',
                value: '图片'
            }, {
                key: '视频',
                value: '视频'
            }, {
                key: '文件',
                value: '文件'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '分类',
            field: 'category',
            hidden: true,
            value: 'node_file_list',
            required: true
        }, {
            title: '名称',
            field: 'vname',
            required: true
        }, {
            title: '份数',
            required: true,
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
