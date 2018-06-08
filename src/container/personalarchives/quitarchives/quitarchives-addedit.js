import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/personalarchives/quitarchives-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.personalarchivesQuitarchivesAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class quitarchivesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        console.log('code==' + this.code);
    }
    render() {
        const fields = [{
            title: '姓名',
            field: 'code',
            listCode: 632807,
            type: 'select',
            keyName: 'code',
            valueName: 'realName',
            required: true
        }, {
            title: '离职日期',
            field: 'leaveDatetime',
            type: 'date',
            required: true
        }, {
            title: '交接人',
            field: 'heirPeople',
            listCode: 632807,
            type: 'select',
            keyName: 'userId',
            valueName: 'realName',
            required: true
        }, {
            title: '离职缘由',
            field: 'leaveReason',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                addCode: 632810,
                editCode: 632812,
                detailCode: 632816,
                beforeSubmit: (param) => {
                    console.log(this.props.selectData);
                    let code = this.props.selectData.code.find(v => v.code === param.code);
                    param.realName = code.realName;
                    param.code = code.code;
                    return param;
                }
            });
    }
}

export default quitarchivesAddedit;