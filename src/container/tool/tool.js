import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/tool/tool';
import {
    showWarnMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode,
    getUserId
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    creditWithdraw
} from 'api/biz';
import { Modal } from 'antd';

@listWrapper(
    state => ({
        ...state.Tool,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData,
    }
)
class Tool extends React.Component {
    render() {
        const fields = [{
            title: '视频地址',
            field: 'videoUrl'
        }, {
            title: '格式',
            field: 'fileFormat'
        }, {
            title: '大小(K)',
            field: 'fileSize'
        }, {
            title: '开始时间',
            field: 'startTime',
            type: 'datetime'
        }, {
            title: '结束时间',
            field: 'endTime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632965,
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        window.open(selectedRows[0].videoUrl, '_bank');
                    }
                }
            }
        });
    }
}

export default Tool;
