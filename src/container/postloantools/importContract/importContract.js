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
} from '@redux/postloantools/importContract';
import { showWarnMsg } from 'common/js/util';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.postloantoolsImportContract,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class ImportContract extends React.Component {
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款编号',
            field: 'loanCode'
        }, {
            title: '身份证号',
            field: 'idNo'
        }, {
            title: '车贷卡号',
            field: 'loanCardNumber'
        }, {
            title: '贷款金额（万元）',
            field: 'loanAmount',
            render(v) {
                return v && v / 10000000;
            }
        }, {
            title: '费率(%)',
            field: 'rate',
            render(v) {
                return v && v * 100;
            }
        }, {
            title: '期数',
            field: 'periods'
        }, {
            title: '放款日期',
            field: 'fkDatetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632235,
            btnEvent: {
                import: () => {
                    this.props.history.push(`/postloantools/importContract/import`);
                }
            }
        });
    }
}

export default ImportContract;
