import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/security/node-setMateriallist';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
import {getNodeList} from 'api/menu';

@DetailWrapper(
    state => state.securityNodeSetMateriallist, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class nodeSetMateriallist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeDict: null
        };
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    componentDidMount() {
        getNodeList().then(nodeDict => {
            this.setState({ nodeDict });
        });
    }

    render() {
        const {nodeDict} = this.state;
        const fields = [{
            title: '节点名称',
            field: 'currentNode',
            type: 'select',
            data: nodeDict,
            keyName: 'code',
            valueName: 'name',
            readonly: true
        }, {
            title: '材料清单',
            field: 'fileStrs',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {x: 300},
                fields: [{
                    title: '名称',
                    field: 'content',
                    nowrap: true,
                    required: true
                }]
            }
        }, {
            title: '备注',
            field: 'remark',
            hidden: !this.view
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: 630153,
            editCode: 630153,
            detailCode: 630156
        });
    }
}

export default nodeSetMateriallist;
