import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanarchives/locationcode-addedit';
import {
    getQueryString,
    getUserId
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanarchivesLocationcodeAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class LocationcodeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        this.fields = [{
            title: '位置名称',
            field: 'name',
            required: true
        }];
        return (
            <div>
                {
                    this.props.buildDetail({
                        fields: this.fields,
                        code: this.code,
                        view: this.view,
                        addCode: 632820,
                        editCode: 632822,
                        detailCode: 632826
                    })
                }
            </div>
        );
    }
}

export default LocationcodeAddedit;
