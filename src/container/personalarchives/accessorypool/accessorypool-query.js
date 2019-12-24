import React from 'react';
import {Form, Row, Tabs, Col, Spin, Button, Table, Card, Icon, Tooltip, message} from 'antd';
import moment from 'moment';
import CUpload from 'component/cUpload/cUpload';
import CInput from 'component/cInput/cInput';
import CSelect from 'component/cSelect/cSelect';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CMonth from 'component/cMonth/cMonth';
import CRangeDate from 'component/cRangeDate/cRangeDate';
import CDate from 'component/cDate/cDate';
import {tailFormItemLayout, validateFieldsAndScrollOption, PIC_PREFIX} from 'common/js/config';
import {
    getQueryString, showSucMsg, isUndefined, getUserId, getRules,
    getRealValue, dateTimeFormat, moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {getDictList} from 'api/dict';
import {getQiniuToken} from 'api/general';
import {
    sqryhls, sqrzfbls, sqrwxls, poyhls, pozfbls, powxls, dbryhls,
    dbrzfbls, dbrwxls
} from '../../loan/admittance-addedit/config';
import JSZip from 'jszip';
import saveAs from 'file-saver';

const FormItem = Form.Item;
const col2Props = {xs: 32, sm: 24, md: 12, lg: 12};
const col3Props = {xs: 32, sm: 24, md: 12, lg: 8};
const col33Props = {xs: 32, sm: 24, md: 24, lg: 8};
const col4Props = {xs: 32, sm: 24, md: 12, lg: 6};

// 是否垫资数据字典
const isAdvFundData = [
    {k: '1', v: '是'},
    {k: '0', v: '否'}
];
// gps设备类型
const gpsTypeData = [
    {dkey: '1', dvalue: '有线'},
    {dkey: '0', dvalue: '无线'}
];

@Form.create()
class ArchivesAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        // this.view = !!getQueryString('v', this.props.location.search);
        this.view = true;
        this.enter = !!getQueryString('e', this.props.location.search);

        this.state = {
            fetching: true,
            token: '',
            bizType: '',
            // 用于upload控件判断页面是否初始化完成
            isLoaded: false,
            // 贷款产品数据
            loanProductData: [],
            /* 页面所需数据字典start */
            bizTypeData: [],
            cdBizCode: [],
            attAchment: [],
            loanPeriodData: [],
            regionData: [],
            carTypeData: [],
            genderData: [],
            marryStateData: [],
            educationData: [],
            addressData: [],
            relationData: [],
            industryData: [],
            propertyData: [],
            incomeData: [],
            positionData: [],
            noticeData: [],
            professionData: [],
            loanRoleData: [],
            enterFileData: [],
            enterLocationData: [],
            /* 页面所需数据字典end */
            // 页面详情数据
            pageData: {},
            // 是否自营企业
            isSelfCompany: false,
            // 婚姻状况
            isMarried: false,
            showMarry: false,
            // 配偶信息
            showMate: false,
            // 担保人信息
            showGua: false,
            // 申请人银行流水
            showSqryhls: false,
            // 申请人支付宝流水
            showSqrzfbls: false,
            // 申请人微信流水
            showSqrwxls: false,
            // 配偶银行流水
            showPoyhls: false,
            // 配偶支付宝流水
            showPozfbls: false,
            // 配偶微信流水
            showPowxls: false,
            // 担保人银行流水
            showDbryhls: false,
            // 担保人支付宝流水
            showDbrzfbls: false,
            // 担保人微信流水
            showDbrwxls: false,
            // 流转日志
            records: [],
            // 所有节点（用于解析节点）
            dealNodeList: [],
            isFiles: true,
            picList: []
        };
        this.columns = [{
            title: '操作人',
            dataIndex: 'operatorName'
        }, {
            title: '开始时间',
            dataIndex: 'startDatetime',
            render: dateTimeFormat
        }, {
            title: '结束时间',
            dataIndex: 'endDatetime',
            render: dateTimeFormat
        }, {
            title: '花费时长',
            dataIndex: 'speedTime'
        }, {
            title: '审核意见',
            dataIndex: 'dealNote'
        }, {
            title: '当前节点',
            dataIndex: 'curNodeCode',
            render: this.formatDealNote
        }];
    }

    componentDidMount() {
        fetch(632516, {code: this.code}).then(data => {
            // 征信
            let creditUserArr = [];
            // 准入
            let carConfigArr = [];
            // 发保和
            let carProcedureArr = [];
            // 面签
            let interviewArr = [];
            // 抵押
            let carPledgeArr = [];
            // 垫资
            let advanceArr = [];
            // 其他
            let otherArr = [];
            for(let i = 0; i < data.attachments.length; i++) {
                if(data.attachments[i]['category'] === 'credit_user') {
                    creditUserArr.push(data.attachments[i]);
                } else if(data.attachments[i]['category'] === 'car_config') {
                    carConfigArr.push(data.attachments[i]);
                } else if(data.attachments[i]['category'] === 'car_procedure') {
                    carProcedureArr.push(data.attachments[i]);
                } else if(data.attachments[i]['category'] === 'interview') {
                    interviewArr.push(data.attachments[i]);
                } else if(data.attachments[i]['category'] === 'car_pledge') {
                    carPledgeArr.push(data.attachments[i]);
                } else if(data.attachments[i]['category'] === 'advance') {
                    advanceArr.push(data.attachments[i]);
                } else if(data.attachments[i]['category'] != 'credit_user' &&
                    data.attachments[i]['category'] != 'car_config' &&
                    data.attachments[i]['category'] != 'car_procedure' &&
                    data.attachments[i]['category'] != 'interview' &&
                    data.attachments[i]['category'] != 'car_pledge' &&
                    data.attachments[i]['category'] != 'advance'
                ) {
                    otherArr.push(data.attachments[i]);
                }
            }
            this.setState({
                attachments: data.attachments,
                picList: [{
                    title: '征信资料',
                    arr: creditUserArr
                }, {
                    title: '准入资料',
                    arr: carConfigArr
                }, {
                    title: '发保和资料',
                    arr: carProcedureArr
                }, {
                    title: '面签资料',
                    arr: interviewArr
                }, {
                    title: '抵押资料',
                    arr: carPledgeArr
                }, {
                    title: '垫资资料',
                    arr: advanceArr
                }, {
                    title: '其他资料',
                    arr: otherArr
                }]
            });
        });
        Promise.all([
            fetch(632177, {status: '2'}),
            getDictList({parentKey: 'attachment_name'}),
            getDictList({parentKey: 'cdbiz_status'}),
            getDictList({parentKey: 'budget_orde_biz_typer'}),
            getDictList({parentKey: 'loan_period'}),
            getDictList({parentKey: 'region'}),
            getDictList({parentKey: 'car_type'}),
            getDictList({parentKey: 'gender'}),
            getDictList({parentKey: 'marry_state'}),
            getDictList({parentKey: 'education'}),
            getDictList({parentKey: 'is_card_mail_address'}),
            getDictList({parentKey: 'credit_user_relation'}),
            getDictList({parentKey: 'work_belong_industry'}),
            getDictList({parentKey: 'work_company_property'}),
            getDictList({parentKey: 'main_income'}),
            getDictList({parentKey: 'position'}),
            getDictList({parentKey: 'work_profession'}),
            getDictList({parentKey: 'interest'}),
            getDictList({parentKey: 'credit_user_loan_role'}),
            fetch(632217),
            fetch(632827),
            fetch(632527, {bizCode: this.code}),
            getQiniuToken(),
            fetch(632516, {code: this.code})
        ]).then(([
                     loanProductData, attAchment, cdBizCode, bizTypeData, loanPeriodData, regionData, carTypeData,
                     genderData, marryStateData, educationData, addressData, relationData,
                     industryData, propertyData, incomeData, noticeData, positionData, professionData,
                     interestData, loanRoleData, enterFileData, enterLocationData,
                     uploadToken, pageData
                 ]) => {
            this.setState({
                loanProductData,
                attAchment,
                cdBizCode,
                bizTypeData,
                loanPeriodData,
                regionData,
                carTypeData,
                genderData,
                marryStateData,
                educationData,
                addressData,
                relationData,
                industryData,
                propertyData,
                incomeData,
                positionData,
                noticeData,
                professionData,
                interestData,
                loanRoleData,
                enterFileData,
                enterLocationData,
                uploadToken,
                pageData,
                bizType: pageData.bizType,
                showMate: (!!pageData.mateName || (pageData.marryState === '2' && this.view)),
                showGua: !!pageData.guaName,
                showSqryhls: this.isShowCard(sqryhls, pageData),
                showSqrzfbls: this.isShowCard(sqrzfbls, pageData),
                showSqrwxls: this.isShowCard(sqrwxls, pageData),
                showPoyhls: this.isShowCard(poyhls, pageData),
                showPozfbls: this.isShowCard(pozfbls, pageData),
                showPowxls: this.isShowCard(powxls, pageData),
                showDbryhls: this.isShowCard(dbryhls, pageData),
                showDbrzfbls: this.isShowCard(dbrzfbls, pageData),
                showDbrwxls: this.isShowCard(dbrwxls, pageData),
                isSelfCompany: pageData.mainIncome && pageData.mainIncome.includes('4'),
                isMarried: pageData.marryState === '2',
                showMarry: pageData.marryState === '2' || pageData.marryState === '3',
                token: uploadToken.uploadToken,
                fetching: false,
                isLoaded: true
            }, () => {
                const eleList = document.querySelectorAll('.ant-upload-list-picture-card');
                eleList.forEach(item => {
                    item.style.width = '600px';
                });
            });
        }).catch(() => this.setState({fetching: false}));
        fetch(623537, {bizCode: this.code}).then((records) => {
            this.setState({records});
        }).catch(() => {
        });
        fetch(632527, {bizCode: this.code}).then((noticeData) => {
            this.setState({noticeData});
        }).catch(() => {
        });
        fetch(630147).then((dealNodeList) => {
            this.setState({dealNodeList});
        }).catch(() => {
        });
    }

    isShowCard(fields, pageData) {
        for (let i = 0; i < fields.length; i++) {
            if (!isUndefined(pageData[fields[i]])) {
                return true;
            }
        }
        return false;
    }

    getColProps(split) {
        return split === 4 ? col4Props : split === 3 ? col3Props : split === 33 ? col33Props : split === 1 ? {} : col2Props;
    }

    // 获取输入框类型的控件
    getInputCol(item, split = 3, data = null) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        const props = {
            rules: getRules(item),
            initVal: getRealValue({...item, pageData: data || this.state.pageData}),
            inline: isUndefined(item.inline) ? true : item.inline,
            title: item.title,
            hidden: item.hidden,
            type: item.type,
            field: item.field,
            label: this.getLabel(item),
            readonly: item.readonly,
            onChange: item.onChange,
            placeholder: item.placeholder,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldError: this.props.form.getFieldError,
            getFieldValue: this.props.form.getFieldValue
        };
        return (
            <Col {...colProps}>
                <CInput key={item.field} {...props} />
            </Col>
        );
    }

    // 获取选择框类型的控件
    getSelectCol(item, list, split = 3, data = null) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        const props = {
            list,
            initVal: getRealValue({...item, pageData: data || this.state.pageData}),
            rules: getRules(item),
            multiple: item.multiple,
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            field: item.field,
            label: this.getLabel(item),
            keyName: item.keyName,
            valueName: item.valueName,
            readonly: item.readonly,
            onChange: item.onChange,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldValue: this.props.form.getFieldValue,
            getFieldError: this.props.form.getFieldError
        };
        return (
            <Col {...colProps}>
                <CSelect key={item.field} {...props} />
            </Col>
        );
    }

    getSelectCols(item, list, split = 3, data = null) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        const props = {
            list,
            initVal: getRealValue({...item, pageData: data || this.state.pageData}),
            rules: getRules(item),
            multiple: item.multiple,
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            field: item.field,
            label: null,
            keyName: item.keyName,
            valueName: item.valueName,
            readonly: item.readonly,
            onChange: item.onChange,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldValue: this.props.form.getFieldValue,
            getFieldError: this.props.form.getFieldError
        };
        return (
            <Col {...colProps}>
                <CSelect key={item.field} {...props} />
            </Col>
        );
    }

    // 获取文件图片上传类型的控件
    getFileCol(item, split = 3, data = null) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        const props = {
            initVal: getRealValue({...item, pageData: data || this.state.pageData}),
            rules: getRules(item),
            isImg: item.type === 'img',
            getFieldValue: this.props.form.getFieldValue,
            isFieldValidating: this.props.form.isFieldValidating,
            accept: item.accept,
            multiple: item.multiple,
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            field: item.field,
            label: this.getLabel(item),
            single: item.single,
            readonly: item.readonly,
            onChange: item.onChange,
            token: this.state.token,
            isLoaded: !this.code || this.state.isLoaded,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldError: this.props.form.getFieldError,
            setFieldsValue: this.props.form.setFieldsValue,
            doFetching: this.doFetching,
            cancelFetching: this.cancelFetching
        };
        return (
            <Col {...colProps}>
                <CUpload key={item.field} {...props} />
            </Col>
        );
    }

    getFileCols(item, split = 3, data = null) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        const props = {
            initVal: getRealValue({...item, pageData: data || this.state.pageData}),
            rules: getRules(item),
            isImg: item.type === 'img',
            isFile: item.type === 'file',
            getFieldValue: this.props.form.getFieldValue,
            isFieldValidating: this.props.form.isFieldValidating,
            accept: item.accept,
            multiple: item.multiple,
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            field: item.field,
            label: null,
            single: item.single,
            readonly: item.readonly,
            onChange: item.onChange,
            token: this.state.token,
            isLoaded: !this.code || this.state.isLoaded,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldError: this.props.form.getFieldError,
            setFieldsValue: this.props.form.setFieldsValue,
            doFetching: this.doFetching,
            cancelFetching: this.cancelFetching
        };
        return (
            <Col {...colProps}>
                <CUpload key={item.field} {...props} />
            </Col>
        );
    }

    // 获取textarea的控件
    getNormalTextAreaCol(item, split = 3) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        const props = {
            initVal: getRealValue({...item, pageData: this.state.pageData}),
            rules: getRules(item),
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            field: item.field,
            label: this.getLabel(item),
            readonly: item.readonly,
            onChange: item.onChange,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldError: this.props.form.getFieldError,
            getFieldValue: this.props.form.getFieldValue
        };
        return (
            <Col {...colProps}>
                <CNormalTextArea key={item.field} {...props} />
            </Col>
        );
    }

    // 获取月份选择控件
    getMonthCol(item, split = 3) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        item.type = 'month';
        const props = {
            initVal: getRealValue({...item, pageData: this.state.pageData}),
            rules: getRules(item),
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            field: item.field,
            label: this.getLabel(item),
            readonly: item.readonly,
            onChange: item.onChange,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldError: this.props.form.getFieldError,
            getFieldValue: this.props.form.getFieldValue
        };
        return (
            <Col {...colProps}>
                <CMonth key={item.field} {...props} />
            </Col>
        );
    }

    // 获取范围日期选择类型的控件
    getRangeDateCol(item, split = 3) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        const props = {
            initVal: getRealValue({...item, pageData: this.state.pageData}),
            rules: getRules(item),
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            isTime: item.type === 'datetime',
            field: item.field,
            label: this.getLabel(item),
            readonly: item.readonly,
            onChange: item.onChange,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldError: this.props.form.getFieldError,
            getFieldValue: this.props.form.getFieldValue
        };
        return (
            <Col {...colProps}>
                <CRangeDate key={item.field} {...props} />
            </Col>
        );
    }

    getSearchFields(fields) {
        const {getFieldDecorator} = this.props.form;
        const children = [];
        fields.forEach(v => {
            children.push(
                <FormItem key={v.field} label={v.title}>
                    {getFieldDecorator(`${v.field}`, {initialValue: this.props.searchParam[v.field]})(
                        this.getItemByType(v.type, v)
                    )}
                </FormItem>
            );
        });
        children.push(
            <FormItem key='searchBtn'>
                <Button type="primary" htmlType="submit">搜索</Button>
                <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
            </FormItem>
        );
        return children;
    }

    // 获取日期类型的控件
    getDateItem(item, split = 3, data = null) {
        let colProps = this.getColProps(split);
        item.readonly = this.isReadonly(item);
        item.type = item.isTime ? 'datetime' : 'date';
        const props = {
            initVal: getRealValue({...item, pageData: data || this.state.pageData}),
            rules: getRules(item),
            isTime: item.isTime,
            hidden: item.hidden,
            inline: isUndefined(item.inline) ? true : item.inline,
            field: item.field,
            label: this.getLabel(item),
            readonly: item.readonly,
            onChange: item.onChange,
            disabledDate: item.disabledDate,
            getFieldDecorator: this.props.form.getFieldDecorator,
            getFieldError: this.props.form.getFieldError,
            getFieldValue: this.props.form.getFieldValue
        };
        return (
            <Col {...colProps}>
                <CDate key={item.field} {...props} />
            </Col>
        );
    }

    // 审核时提交表单
    checkForm = () => {
        this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
            if (!err) {
                // let bizCode = this.getBizCode();
                // values.budgetOrderCode = this.code;
                // param.approveResult = '1';
                // param.approveNote = this.projectCode;
                // param.approveUser = getUserId();
                values.operator = getUserId();
                values.code = this.code;
                this.setState({fetching: true});
                fetch(632134, values).then((data) => {
                    this.setState({fetching: false});
                    showSucMsg('操作成功');
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }).catch(() => this.setState({fetching: false}));
            }
        });
    }

    // 获取label
    getLabel(item) {
        return (
            <span
                className={item.required && ((item.type === 'textarea' && !item.normalArea) || (item.type === 'o2m')) ? 'ant-form-item-required' : ''}>
        {item.title + (item.single ? '(单)' : '')}
                {item.help ? <Tooltip title={item.help}><Icon type="question-circle-o"/></Tooltip> : null}
      </span>
        );
    }
    // 返回
    onCancel = () => this.props.history.go(-1)

    // 获取控件readonly的值
    isReadonly(item) {
        return isUndefined(item.readonly) ? this.view : item.readonly;
    }

    // 获取table的props
    getTableProps() {
        return {
            columns: this.columns,
            dataSource: this.state.records,
            rowSelection: null,
            bordered: true,
            rowKey: record => record.id
        };
    }
    // 打包下载
    downLoadBiz = () => {
        const {pageData} = this.state;
        let picList = [];
        pageData.attachments.map((item, index) => {
            if (!item.kname.match(/second_car_report/) && !item.kname.match(/video/) && item.url) {
                let picArr = item.url.split('||');
                let arr = [];
                for(let i = 0; i < picArr.length; i++) {
                    arr.push({
                        vname: i,
                        kname: item.kname,
                        url: picArr[i]
                    });
                }
                picList.push({
                    title: item.vname,
                    arr: arr
                });
            }
        });
        console.log(picList);
        let picArr = [];
        let laseTime = null;
        const hasMsg = message.loading('');
        picList.forEach((arrItem, i) => {
            picArr.push({title: arrItem.title, arr: []});
            if (arrItem.arr.length > 0) {
                arrItem.arr.forEach((item) => {
                    if (!item.kname.match(/video/) && item.url) {
                        const img = new Image();
                        img.crossOrigin = '';
                        img.width = 200;
                        img.height = 200;
                        img.onload = function () {
                            picArr[i].arr.push({
                                name: item.vname,
                                url: getBase64Image(img)
                            });
                            if (laseTime) {
                                clearTimeout(laseTime);
                            }
                            laseTime = setTimeout(() => {
                                hasMsg();
                                const ZIP = new JSZip();
                                picArr.forEach((arrItem) => {
                                    const file = ZIP.folder(arrItem.title);
                                    arrItem.arr.forEach(item => {
                                        if (item.url) {
                                            file.file(`${item.name}.png`,
                                                item.url, {base64: true});
                                        }
                                    });
                                });
                                ZIP.generateAsync({type: 'blob'}).then(
                                    function (content) {
                                        saveAs(content, '附件池.zip');
                                    });
                            }, 1000);
                        };
                        img.src = PIC_PREFIX + item.url;
                    } else {
                        return false;
                    }
                });
            }
        });
        function getBase64Image(img, width, height) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width || img.width;
            canvas.height = height || img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return convertBase64UrlToBlob(canvas.toDataURL('image/jpeg', 1));
        }
        function convertBase64UrlToBlob(urlData) {
            const arr = urlData.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while(n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        }
    };
    getAccessorypool() {
        const {pageData, attAchment} = this.state;
        if (pageData.attachments && Array.isArray(pageData.attachments)) {
            let attachments = pageData.attachments.map(item => {
                if (item.attachType === '视频') {
                    return <Row gutter={54}>
                            {this.getSelectCols({
                                field: 'vname',
                                formatter(v, d) {
                                    let url = '';
                                    d.attachments.forEach(item => {
                                        if (item.url) {
                                            url = item.url;
                                        } else {
                                        }
                                    });
                                    return url;
                                }
                            }, attAchment, 3, item)}
                            {this.getFileCols({
                                field: 'url',
                                type: 'file'
                            }, 3, item)}
                        </Row>;
                }else if(item.attachType === '图片' && item.url) {
                    return <Row gutter={54}>
                            {this.getSelectCols({
                                field: 'vname',
                                formatter(v, d) {
                                    let url = '';
                                    d.attachments.forEach(item => {
                                        if (item.url) {
                                            url = item.url;
                                        } else {
                                        }
                                    });
                                    return url;
                                }
                            }, attAchment, 3, item)}
                            {this.getFileCols({
                                field: 'url',
                                type: 'img'
                            }, 3, item)}
                        </Row>;
                }else {
                    return null;
                }
            });
            return attachments.map(item => item && <Card key={item.code}>{item}</Card>);
        }
        return null;
    }

    // 解析流转日志的节点
    formatDealNote = (v) => {
        const obj = this.state.dealNodeList.find(d => d.code === v);
        return obj ? obj.name : '';
    }

    render() {
        const {
            cdBizCode,
            bizTypeData, loanRoleData, loanPeriodData, loanProductData, regionData, carTypeData,
            genderData, marryStateData, educationData, addressData, relationData,
            industryData, propertyData, incomeData, positionData, professionData,
            enterFileData, enterLocationData, noticeData, showMate, showGua, showSqryhls,
            showSqrzfbls, showSqrwxls, showPoyhls, showPozfbls, showPowxls,
            showDbryhls, showDbrzfbls, showDbrwxls, isMarried, showMarry, bizType
        } = this.state;
        const TabPane = Tabs.TabPane;
        return (
            <Spin spinning={this.state.fetching}>
                <Form>
                    <Card style={{ marginTop: 16 }} title="所有附件">
                        {this.getAccessorypool()}
                        <strong style={{float: 'right', marginTop: '20px'}} onClick={this.downLoadBiz}>文件打包下载</strong>
                    </Card>
                    <FormItem {...tailFormItemLayout} style={{marginTop: 20}}>
                            <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default ArchivesAddEdit;
