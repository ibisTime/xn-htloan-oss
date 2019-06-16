import React from 'react';
import {Form, Row, Tabs, Col, Spin, Button, Table, Card, Icon, Tooltip} from 'antd';
import moment from 'moment';
import CUpload from 'component/cUpload/cUpload';
import CInput from 'component/cInput/cInput';
import CSelect from 'component/cSelect/cSelect';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CMonth from 'component/cMonth/cMonth';
import CRangeDate from 'component/cRangeDate/cRangeDate';
import CDate from 'component/cDate/cDate';
import {tailFormItemLayout, validateFieldsAndScrollOption} from 'common/js/config';
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
            isFiles: true
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
