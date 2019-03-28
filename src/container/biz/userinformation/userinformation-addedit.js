import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/userinformation-addedit';
import {getQueryString, getUserId, isExpressConfirm} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizUserInformationAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class UserinformationAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '作者',
            field: 'author',
            required: true
        },
            {
                title: '标题',
                field: 'title',
                required: true
            }, {
                title: '标签',
                field: 'tag',
                required: true
            }, {
                title: '缩略图',
                field: 'pic',
                required: true,
                type: 'img',
                help: '240*160',
                single: true
            }, {
                title: '广告图',
                field: 'advPic',
                type: 'img',
                required: true,
                help: '240*160',
                single: true
            }, {
                title: '图片数量',
                field: 'picNumber',
                number: true,
                required: true
            }, {
                title: '资讯内容',
                field: 'context',
                type: 'textarea',
                required: true
            }, {
                title: '状态',
                field: 'status'
            }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630456,
            addCode: 630450,
            editCode: 630452
        });
    }
}

export default UserinformationAddedit;
