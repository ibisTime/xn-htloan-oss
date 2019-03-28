import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/vehicleconfiguration-addedit';
import {getQueryString, getUserId, isExpressConfirm} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizVehicleconfigurationAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class VehicleconfigurationAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [
            {
                title: '名称',
                field: 'name',
                required: true
            }, {
                title: '缩略图',
                field: 'pic',
                required: true,
                type: 'img',
                help: '240*160',
                single: true
            }, {
                title: '备注',
                field: 'remark'
            }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630446,
            addCode: 630440,
            editCode: 630442
        });
    }
}

export default VehicleconfigurationAddedit;
