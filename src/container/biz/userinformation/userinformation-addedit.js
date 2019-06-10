import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/userinformation-addedit';
import {Form, message} from 'antd';
import {getQueryString, getUserId, showSucMsg, isExpressConfirm, getUserName} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';
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
        if (!this.code) {
            this.buttons = [{
                title: '保存',
                check: true,
                type: 'primary',
                handler: (param) => {
                    param.code = this.code;
                    param.picNumber = param.advPic;
                    if (param.context) {
                        fetch(630450, param).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else {
                        message.warning('请填写资讯内容');
                    }
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        } else {
            this.buttons = [{
                title: '保存',
                check: true,
                type: 'primary',
                handler: (param) => {
                    param.code = this.code;
                    param.picNumber = 1;
                    if(!param.context) {
                        fetch(630452, param).then(() => {
                            showSucMsg('操作成功');
                            this.props.cancelFetching();
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else {
                        message.warning('请填写资讯内容');
                    }
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
    }

    render() {
        const fields = [
            {
                field: 'advPic',
                value: '2',
                hidden: true
            }, {
                value: 2,
                field: 'picNumber',
                hidden: true
            },
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
                title: '标签',
                field: 'tag',
                required: true
            }, {
                title: '资讯内容',
                field: 'context',
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
            buttons: this.buttons
        });
    }
}

export default UserinformationAddedit;
