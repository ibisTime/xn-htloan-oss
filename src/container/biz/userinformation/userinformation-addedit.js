import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/userinformation-addedit';
import {getQueryString, getUserId, isExpressConfirm, getUserName} from 'common/js/util';
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
        const fields = [
           {
            title: '标题',
            field: 'title',
            required: true
        }, {
                title: '标题',
                field: 'picNumber',
                required: true,
                hidden: true
            },
            {
                title: '作者',
                field: 'author',
                required: true
            },
           {
                title: '缩略图',
                field: 'pic',
                required: true,
                type: 'img',
                single: true,
                help: '240*160'
            }, {
                title: '广告图',
                field: 'advPic',
                type: 'img',
                required: true,
                help: '240*160'
            }, {
                title: '标签',
                field: 'tag',
                required: true
            }, {
                title: '资讯内容',
                field: 'context',
                normalArea: true,
                type: 'textarea',
                required: true
            }, {
                title: '备注',
                field: 'remark'
            }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 630450,
            editCode: 630452,
            detailCode: 630456,
            beforeSubmit: (params) => {
                // console.log(params);
                // // 暂时判断广告图中有几张图片
                // var arr = params.advPic;
                // var map = [];
                // for(var i = 0; i < arr.length; i++) {
                //     var ai = arr[i];
                //     if(!map[ai]) {
                //         map[ai] = 1;
                //     }else if (arr[i] === '|') {
                //         var ww = map[ai];
                //         map[ai]++;
                //     }
                // }
                // let ee = (ww + 3) / 2;
                // if (ee) {
                //     params.picNumber = ee;
                // } else {
                //    params.picNumber = 1;
                // }
                params.picNumber = params.advPic.split('||').length;
                return params;
            }
        });
    }
}

export default UserinformationAddedit;
