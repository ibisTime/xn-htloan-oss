import React from 'react';
import {
    cancelFetching,
    clearSearchParam,
    doFetching,
    setBtnList,
    setPagination,
    setSearchData,
    setSearchParam,
    setTableData
} from '@redux/personalarchives/ywcx';
import {dateTimeFormat, getUserId, showWarnMsg} from 'common/js/util';
import {listWrapper} from 'common/js/build-list';

@listWrapper(
  state => ({
      ...state.ywCx,
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
class ywCx extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '业务编号',
            hidden: true
        }, {
            field: 'code',
            title: '业务编号'
        }, {
            field: 'customerName',
            title: '客户姓名',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '业务种类',
            field: 'bizType',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1],
                status: '1'
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '业务团队',
            field: 'teamName'
        }, {
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }
        ];
        return this.props.buildList({
            fields,
            pageCode: 632515,
            searchParams: {
                isMy: '1',
                userId: getUserId()
            },
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/ywcx/ywcx/addedit?v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ywCx;
