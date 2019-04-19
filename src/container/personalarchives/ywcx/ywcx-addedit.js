import React from 'react';
import {Form, Row, Tabs, Col, Spin, Button, Table, Card, Icon, Tooltip} from 'antd';
import moment from 'moment';
import CUpload from 'component/cUpload/cUploads';
import CInput from 'component/cInput/cInputs';
import CSelect from 'component/cSelect/cSelects';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextAreas';
import CMonth from 'component/cMonth/cMonth';
import CRangeDate from 'component/cRangeDate/cRangeDate';
import CDate from 'component/cDate/cDates';
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
    {k: '0', v: '否'},
    {k: '1', v: '是'}
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
            credits: '',
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
            isShowTabPane01: true,
            isShowTabPane02: true,
            isShowTabPane03: true
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
            dataIndex: 'dealNode',
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
            console.log('22222', interestData);
            if (pageData.credit.creditUserList.length === 0) {
                this.setState({
                    isShowTabPane01: false
                });
            } else if (pageData.credit.creditUserList.length === 2) {
                this.setState({
                    isShowTabPane03: false
                });
            } else {
                    let len = pageData.credit.creditUserList.length - 1;
                    if (len === 1) {
                        if (pageData.credit.creditUserList[len].relation === '2') {
                            this.setState({
                                isShowTabPane03: false
                            });
                        }
                        if (pageData.credit.creditUserList[len].relation === '3') {
                            this.setState({
                                isShowTabPane02: false
                            });
                        }
                    }
                    if (len === 1) {
                        if (pageData.credit.creditUserList[len].relation === '2') {
                            this.setState({
                                isShowTabPane03: false
                            });
                        }
                        if (pageData.credit.creditUserList[len].relation === '3') {
                            this.setState({
                                isShowTabPane02: false
                            });
                        }
                    }
                    if (len === 0) {
                        this.setState({
                            isShowTabPane02: false,
                            isShowTabPane03: false
                        });
                    }
                    if (len === -1) {
                        this.setState({
                            isShowTabPane01: false,
                            isShowTabPane02: false,
                            isShowTabPane03: false
                        });
                    }
                }
                console.log('219', pageData.credit.creditUserList.length);
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
                    credits: pageData.credits,
                    bizType: pageData.bizType,
                    showMate: ((pageData.marryState === '2' && this.view)),
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
                    showMarry: this.isShowCard(pageData),
                    token: uploadToken.uploadToken,
                    fetching: false,
                    isLoaded: true
                }, () => {
                    const eleList = document.querySelectorAll('.ant-form-item-label');
                    eleList.forEach(item => {
                        item.style.float = 'left';
                    });
                });
            }
        ).catch(() => this.setState({fetching: false}));
        fetch(623537, {bizCode: this.code}).then((records) => {
            this.setState({records});
        }).catch(() => {
        });
        fetch(632527, {bizCode: this.code}).then((noticeData) => {
            this.setState({noticeData});
        }).catch(() => {
        });
        fetch(630147).then((dealNodeList) => {
            console.log('222222');
            console.log(dealNodeList);
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

    showMarry(fields, pageData) {
        const {pageData: {credit}, loanRoleData, relationData} = this.state;
        let creditUserLists = [];
        let aa = credit.creditUserList;
        for (let i = 0; i < aa.length; i++) {
            if (aa[i].loanRole === '1') {
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

    // 获取银行、支付宝、微信流水控件
    getJourComp(title, fields) {
        const {interestData} = this.state;
        return (
            <Card style={{marginTop: 16}} title={title + '数据'}>
                <Row gutter={54}>
                    {this.getRangeDateCol({
                        field: fields[0],
                        title: '流水时间',
                        type: 'date',
                        rangedate: [fields[1], fields[2]]
                    }, 1)}
                </Row>
                <Row gutter={54}>
                    {this.getSelectCol({field: fields[3], title: '结息时间1'}, interestData, 2)}
                    {this.getSelectCol({field: fields[4], title: '结息时间2'}, interestData, 2)}
                </Row>
                <Row gutter={54}>
                    {this.getInputCol({field: fields[5], title: '结息1(元)', amount: true}, 2)}
                    {this.getInputCol({field: fields[6], title: '结息2(元)', amount: true}, 2)}
                </Row>
                <Row gutter={54}>
                    {this.getInputCol({field: fields[7], title: '总收入(元)', amount: true}, 2)}
                    {this.getInputCol({field: fields[8], title: '总支出(元)', amount: true}, 2)}
                </Row>
                <Row gutter={54}>
                    {this.getInputCol({field: fields[9], title: '账户余额(元)', amount: true})}
                    {this.getInputCol({field: fields[10], title: '月均收入(元)', amount: true})}
                    {this.getInputCol({field: fields[11], title: '月均支出(元)', amount: true}, 33)}
                </Row>
                <Row gutter={54}>
                    {this.getNormalTextAreaCol({field: fields[12], title: '流水说明'}, 1)}
                </Row>
                <Row gutter={54}>
                    {this.getFileCol({field: fields[13], title: title, type: 'img'}, 1)}
                </Row>
            </Card>
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

// 获取征信列表
    getCreditList() {
        const {pageData: {credit}, loanRoleData, relationData} = this.state;
        if (credit && credit.creditUserList.length) {
            return credit.creditUserList.map(c => (
                <Card key={c.code}>
                    <Row gutter={54}>
                        {this.getInputCol({field: 'userName', title: '姓名'}, 3, c)}
                        {this.getSelectCol({field: 'relation', title: '与借款人关系'}, relationData, 3, c)}
                        {this.getSelectCol({
                            field: 'loanRole',
                            title: '贷款角色',
                            keyName: 'dkey',
                            valueName: 'dvalue'
                        }, loanRoleData, 33, c)}
                    </Row>
                    <Row gutter={54}>
                        {this.getInputCol({field: 'mobile', title: '手机号'}, 2, c)}
                        {this.getInputCol({field: 'idNo', title: '身份证号'}, 2, c)}
                    </Row>
                    <Row gutter={54}>
                        {this.getFileCol({field: 'idNoFront', title: '身份证正面', type: 'img'}, 2, c)}
                        {this.getFileCol({field: 'idNoReverse', title: '身份证反面', type: 'img'}, 2, c)}
                    </Row>
                    <Row gutter={54}>
                        {this.getFileCol({field: 'authPdf', title: '征信查询授权书', type: 'img'}, 2, c)}
                        {this.getFileCol({field: 'interviewPic', title: '面签照片', type: 'img'}, 2, c)}
                    </Row>
                    <Row gutter={54}>
                        {this.getFileCol({field: 'bankCreditResultPdf', title: '银行征信报告', type: 'img'}, 3, c)}
                        {this.getFileCol({
                            title: '大数据征信报告(多张)',
                            field: 'dataReport',
                            type: 'img',
                            // required: true,
                            readonly: true
                        }, 3)}        {this.getInputCol({field: 'bankCreditResultRemark', title: '征信结果说明'}, 3, c)}
                    </Row>
                </Card>
            ));
        }
        return null;
    }

    getNotice() {
        const {pageData: {bizTasks}, interestData} = this.state;
        if (bizTasks && bizTasks.length) {
            return bizTasks.map(c => (
                <Card key={c.code}>
                    <Row gutter={54}>
                        {this.getInputCol({field: 'code', title: '业务编号'}, 3, c)}
                        {this.getInputCol({field: 'content', title: '消息内容'}, 3, c)}
                        {this.getInputCol({
                            field: 'refNode',
                            title: '推送节点',
                            formatter: this.formatDealNote
                        }, 3, c)}
                    </Row>
                    <Row gutter={54}>
                        {this.getFileCol({field: 'refOrder', title: '银行征信报告', type: 'img'}, 3, c)}
                        {this.getDateItem({field: 'createDatetime', title: '创建时间'}, 3, c)}
                        {this.getDateItem({field: 'finishDatetime', title: '处理时间'}, 3, c)}
                    </Row>
                </Card>
            ));
        }
        return null;
    }

    getAccessorypool() {
        const {pageData: {credit}, attAchment} = this.state;
        if (credit && credit.attachments.length) {
            return credit.attachments.map(c => (
                <Card key={c.code}>
                    <Row style={{marginTop: '20px', marginLeft: '20px'}} gutter={54}>
                        {this.getSelectCols({field: 'name'}, attAchment, 3, c)}
                        {this.getFileCols({field: 'url', type: 'img'}, 3, c)}
                    </Row>
                </Card>
            ));
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
            showSqrzfbls, showSqrwxls, interestData, showPoyhls, showPozfbls, showPowxls,
            showDbryhls, showDbrzfbls, showDbrwxls, isMarried, showMarry, bizType
        } = this.state;
        const TabPane = Tabs.TabPane;
        return (
            <Spin spinning={this.state.fetching}>
                <Form className='query-form'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="基本信息" key="1">
                            <Card>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'code', title: '业务编号', required: true})}
                                {this.getInputCol({
                                    field: 'userName',
                                    title: '客户姓名',
                                    formatter: (v, d) => {
                                        let aa = d.credit;
                                        return aa.creditUser.userName;
                                    }
                                })}
                                {this.getInputCol({
                                    field: 'companyName',
                                    title: '业务公司',
                                    formatter: (v, d) => {
                                        let aa = d.credit;
                                        return aa.companyName;
                                    }
                                })}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({
                                    field: 'loanBankName',
                                    title: '贷款银行',
                                    formatter: (v, d) => {
                                        return d.credit.loanBankName;
                                    }
                                }, 33)}
                                {this.getSelectCol({
                                    field: 'bizType',
                                    title: '业务种类',
                                    keyName: 'dkey',
                                    valueName: 'dvalue',
                                    readonly: true
                                }, bizTypeData)}
                                {this.getSelectCol({
                                    field: 'status',
                                    title: '当前状态',
                                    keyName: 'dkey',
                                    valueName: 'dvalue',
                                    readonly: true
                                }, cdBizCode)}
                                {this.getInputCol({
                                    field: 'loanAmount',
                                    title: '贷款金额',
                                    amount: true,
                                    formatter: (v, d) => {
                                        return moneyFormat(d.credit.loanAmount);
                                    }
                                }, 33)}
                            </Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="征信列表" key="2">
                            <Card>
                            <Tabs defaultActiveKey="2">
                                {
                                    this.state.isShowTabPane01 ? (<TabPane tab="主贷人征信" key="2">
                                        <Row gutter={54}>
                                            {this.getInputCol({
                                                field: 'userName',
                                                title: '姓名',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.userName;
                                                }
                                            })}
                                            {this.getSelectCol({
                                                field: 'relation',
                                                title: '与借款人关系',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.relation;
                                                }
                                            }, relationData)}
                                            {this.getSelectCol({
                                                field: 'loanRole',
                                                title: '贷款角色',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.loanRole;
                                                }
                                            }, interestData, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getInputCol({
                                                field: 'mobile',
                                                title: '手机号',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.mobile;
                                                }
                                            })}
                                            {this.getInputCol({
                                                field: 'idNo',
                                                title: '身份证号',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.idNo;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'idNoFront',
                                                title: '身份证正面',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.idNoFront;
                                                }
                                            }, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getFileCol({
                                                field: 'idNoReverse',
                                                title: '身份证反面',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.idNoReverse;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'authPdf',
                                                title: '征信查询授权书',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.authPdf;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'interviewPic',
                                                title: '面签照片',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.interviewPic;
                                                }
                                            }, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getFileCol({
                                                field: 'bankCreditResultPdf',
                                                title: '银行征信报告',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.bankCreditResultPdf;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'bankCreditResultPdf',
                                                title: '大数据征信报告',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.bankCreditResultPdf;
                                                }
                                            })}
                                            {this.getInputCol({
                                                field: 'bankCreditResultRemark',
                                                title: '征信结果说明',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUser.bankCreditResultRemark;
                                                }
                                            }, 33)}
                                        </Row>
                                    </TabPane>) : null
                                }
                                {
                                    this.state.isShowTabPane02 ? (<TabPane tab="共同还款人征信" key="1">
                                        <Row gutter={54}>
                                            {this.getInputCol({
                                                field: 'userName',
                                                title: '姓名',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].userName;
                                                }
                                            })}
                                            {this.getSelectCol({
                                                field: 'relation',
                                                title: '与借款人关系',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].relation;
                                                }
                                            }, relationData)}
                                            {this.getSelectCol({
                                                field: 'loanRole',
                                                title: '贷款角色',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].loanRole;
                                                }
                                            }, interestData, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getInputCol({
                                                field: 'mobile',
                                                title: '手机号',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].mobile;
                                                }
                                            })}
                                            {this.getInputCol({
                                                field: 'idNo',
                                                title: '身份证号',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].idNo;
                                                }
                                            })}
                                            <Row gutter={54}>
                                                {this.getFileCol({
                                                    field: 'idNoFront',
                                                    title: '身份证正面',
                                                    type: 'img',
                                                    formatter: (v, d) => {
                                                        return d.credit.creditUserList[1].idNoFront;
                                                    }
                                                }, 33)}
                                        </Row>
                                            {this.getFileCol({
                                                field: 'idNoReverse',
                                                title: '身份证反面',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].idNoReverse;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'authPdf',
                                                title: '征信查询授权书',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].authPdf;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'interviewPic',
                                                title: '面签照片',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].interviewPic;
                                                }
                                            }, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getFileCol({
                                                field: 'bankCreditResultPdf',
                                                title: '银行征信报告',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].bankCreditResultPdf;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'bankCreditResultPdf',
                                                title: '大数据征信报告',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].bankCreditResultPdf;
                                                }
                                            })}
                                            {this.getInputCol({
                                                field: 'bankCreditResultRemark',
                                                title: '征信结果说明',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[1].bankCreditResultRemark;
                                                }
                                            }, 33)}
                                        </Row>
                                    </TabPane>) : null
                                }
                                {
                                    this.state.isShowTabPane03 ? (<TabPane tab="担保人征信" key="3">
                                        <Row gutter={54}>
                                            {this.getInputCol({
                                                field: 'userName',
                                                title: '姓名',
                                                formatter: (v, d) => {
                                                    console.log('222333', d.credit.creditUserList);
                                                    return d.credit.creditUserList[2].userName;
                                                }
                                            })}
                                            {this.getSelectCol({
                                                field: 'relation',
                                                title: '与借款人关系',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].relation;
                                                }
                                            }, relationData)}
                                            {this.getSelectCol({
                                                field: 'loanRole',
                                                title: '贷款角色',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].loanRole;
                                                }
                                            }, interestData, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getInputCol({
                                                field: 'mobile',
                                                title: '手机号',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].mobile;
                                                }
                                            })}
                                            {this.getInputCol({
                                                field: 'idNo',
                                                title: '身份证号',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].idNo;
                                                }
                                            })}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getFileCol({
                                                field: 'idNoFront',
                                                title: '身份证正面',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].idNoFront;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'idNoReverse',
                                                title: '身份证反面',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].idNoReverse;
                                                }
                                            }, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getFileCol({
                                                field: 'authPdf',
                                                title: '征信查询授权书',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].authPdf;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'interviewPic',
                                                title: '面签照片',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].interviewPic;
                                                }
                                            })}
                                            {this.getFileCol({
                                                field: 'bankCreditResultPdf',
                                                title: '银行征信报告',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].bankCreditResultPdf;
                                                }
                                            }, 33)}
                                        </Row>
                                        <Row gutter={54}>
                                            {this.getFileCol({
                                                field: 'bankCreditResultPdf',
                                                title: '大数据征信报告',
                                                type: 'img',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].bankCreditResultPdf;
                                                }
                                            })}
                                            {this.getInputCol({
                                                field: 'bankCreditResultRemark',
                                                title: '征信结果说明',
                                                formatter: (v, d) => {
                                                    return d.credit.creditUserList[2].bankCreditResultRemark;
                                                }
                                            })}
                                        </Row>
                                    </TabPane>) : null
                                }
                            </Tabs>
                            </Card>
                        </TabPane>
                        <TabPane tab="车辆信息" key="3">
                            <Card>  <Row gutter={54}>
                                {this.getSelectCol({
                                    field: 'bizType',
                                    title: '业务种类',
                                    keyName: 'dkey',
                                    valueName: 'dvalue',
                                    readonly: true
                                }, bizTypeData, 2)}
                                {this.getSelectCol({
                                    field: 'loanPeriod',
                                    title: '贷款期限',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, loanPeriodData, 2)}
                            </Row>
                            <Row gutter={54}>
                                {this.getSelectCol({
                                    field: 'loanProductCode',
                                    title: '贷款产品',
                                    keyName: 'code',
                                    valueName: 'name'
                                }, loanProductData, 4)}
                                {this.getSelectCol({
                                    field: 'isAdvanceFund',
                                    title: '是否垫资',
                                    keyName: 'k',
                                    valueName: 'v'
                                }, isAdvFundData, 4)}
                                {this.getSelectCol({
                                    field: 'isFinancing',
                                    title: '是否融资',
                                    keyName: 'k',
                                    valueName: 'v'
                                }, isAdvFundData, 4)}
                                {this.getSelectCol({
                                    field: 'region',
                                    title: '所属区域',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, regionData, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'vehicleCompanyName', title: '机动车销售公司'}, 4)}
                                {this.getInputCol({field: 'invoiceCompany', title: '开票单位'}, 4)}
                                {this.getInputCol({field: 'invoicePrice', title: '开票价(元)', amount: true}, 4)}
                                {this.getInputCol({field: 'originalPrice', title: '市场指导价(元)', amount: true}, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'firstAmount', title: '首付金额(元)', amount: true})}
                                {this.getInputCol({field: 'firstRate', title: '首付比例(%)'})}
                                {this.getInputCol({field: 'loanAmount', title: '贷款额(元)', amount: true}, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'monthDeposit', title: '月供保证金(元)', amount: true}, 2)}
                                {this.getInputCol({field: 'teamFee', title: '服务费(元)', amount: true}, 2)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'gpsFee', title: 'GPS费用(元)', amount: true}, 3)}
                                {this.getInputCol({field: 'authFee', title: '公证费(元)', amount: true}, 3)}
                                {this.getInputCol({field: 'otherFee', title: '其他费用(元)', amount: true}, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getSelectCol({
                                    field: 'carType',
                                    title: '车辆类型',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, carTypeData, 4)}
                                {this.getInputCol({field: 'carBrand', title: '车辆品牌'}, 4)}
                                {this.getInputCol({field: 'carSeries', title: '车系'}, 4)}
                                {this.getInputCol({field: 'carModelName', title: '车型名称'}, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'carModel', title: '车辆型号'}, 4)}
                                {this.getInputCol({field: 'carColor', title: '车辆颜色'}, 4)}
                                {this.getInputCol({field: 'carFrameNo', title: '车架号'}, 4)}
                                {this.getInputCol({field: 'carEngineNo', title: '发动机号'}, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'settleAddress', title: '落户地点'}, 1)}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({field: 'carPic', title: '车辆照片', type: 'img'}, 3)}
                                {this.getFileCol({
                                    field: 'carHgzPic',
                                    title: bizType === '1' ? '绿大本' : '合格证照片',
                                    type: 'img'
                                }, 3)}
                                {this.getFileCol({
                                    field: 'secondCarReport',
                                    _keys: ['credit', 'secondCarReport'],
                                    title: '二手车评估报告',
                                    type: 'file',
                                    required: bizType === '1' && !this.view,
                                    hidden: bizType !== '1'
                                }, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'driveLicenseFront',
                                    title: '行驶证正面',
                                    hidden: bizType !== '1',
                                    required: bizType === '1',
                                    type: 'img'
                                }, 2)}
                                {this.getFileCol({
                                    field: 'driveLicenseReverse',
                                    title: '行驶证反面',
                                    hidden: bizType !== '1',
                                    required: bizType === '1',
                                    type: 'img'
                                }, 2)}
                            </Row>
                            <Row gutter={54}>
                                {this.getNormalTextAreaCol({
                                    field: 'evaluateColumn',
                                    title: '评估栏',
                                    hidden: bizType !== '1',
                                    required: bizType === '1'
                                }, 1)}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({field: 'carPriceCheckReport', title: '车辆价格核实报告', type: 'img'}, 1)}
                            </Row></Card>
                        </TabPane>
                        <TabPane tab="客户基本信息" key="4">
                            <Card>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'applyUserName', title: '姓名', readonly: true})}
                            </Row>
                            <Row gutter={54}>
                                {this.getSelectCol({
                                    field: 'gender',
                                    title: '性别',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, genderData)}
                                {this.getInputCol({field: 'age', title: '年龄', number: true, positive: true})}
                                {this.getInputCol({field: 'idNo', title: '身份证号', readonly: true}, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getSelectCol({
                                    field: 'marryState',
                                    title: '婚姻状况',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, marryStateData)}
                                {this.getInputCol({field: 'nation', title: '民族'})}
                                {this.getSelectCol({
                                    field: 'education',
                                    title: '学历',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, educationData, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'political', title: '政治面貌'})}
                                {this.getInputCol({field: 'familyNumber', title: '家庭人口', 'Z+': true})}
                                {this.getInputCol({field: 'mobile', title: '联系电话', mobile: true}, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'nowAddress', title: '现居住地址'})}
                                {this.getInputCol({field: 'postCode1', title: '现居住地址邮编'})}
                                {this.getSelectCol({
                                    field: 'isCardMailAddress',
                                    title: '是否卡邮寄地址',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, addressData, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'residenceAddress', title: '户口所在地'}, 2)}
                                {this.getInputCol({field: 'postCode2', title: '户口所在地邮编'}, 2)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'familyMainAsset', title: '家庭主要财产(元)'}, 2)}
                                {this.getInputCol({field: 'mainAssetInclude', title: '主要财产说明'}, 2)}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({field: 'houseContract', title: '购房合同及房产本', type: 'img'})}
                                {this.getFileCol({field: 'assetPdf', title: '其他辅助资产', type: 'img'})}
                                {this.getFileCol({field: 'housePicture', title: '家访照片', type: 'img'})}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'emergencyName1', title: '联系人1姓名'})}
                                {this.getSelectCol({
                                    field: 'emergencyRelation1',
                                    title: '与申请人关系',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, relationData)}
                                {this.getInputCol({field: 'emergencyMobile1', title: '手机号码', mobile: true}, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'emergencyName2', title: '联系人2姓名'})}
                                {this.getSelectCol({
                                    field: 'emergencyRelation2',
                                    title: '与申请人关系',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, relationData)}
                                {this.getInputCol({field: 'emergencyMobile2', title: '手机号码', mobile: true}, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'pledgeUser', title: '抵押代理人'})}
                                {this.getInputCol({field: 'pledgeAddress', title: '抵押地点'})}
                                {this.getFileCol({
                                    field: 'pledgeUserIdCardCopy',
                                    title: '抵押代理人身份证复印件',
                                    type: 'img'
                                }, 33)}
                            </Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="工作情况" key="5">
                            <Row gutter={54}>
                                {this.getInputCol({field: 'workCompanyName', title: '单位名称'}, 1)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'workCompanyAddress', title: '单位地址'}, 2)}
                                {this.getSelectCol({
                                    field: 'workIsCardMailAddress',
                                    title: '是否卡邮寄地址',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, addressData, 2)}
                            </Row>
                            <Row gutter={54}>
                                {this.getSelectCol({
                                    field: 'workBelongIndustry',
                                    title: '所属行业',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, industryData)}
                                {this.getSelectCol({
                                    field: 'workCompanyProperty',
                                    title: '单位经济性质',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, propertyData)}
                                {this.getSelectCol({
                                    field: 'mainIncome',
                                    title: '主要收入来源',
                                    keyName: 'dkey',
                                    valueName: 'dvalue',
                                    multiple: true
                                }, incomeData, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getSelectCol({
                                    field: 'position',
                                    title: '职务',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, positionData)}
                                {this.getSelectCol({
                                    field: 'workProfession',
                                    title: '职业',
                                    keyName: 'dkey',
                                    valueName: 'dvalue'
                                }, professionData)}
                                {this.getInputCol({field: 'postTitle', title: '职称'}, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'monthIncome', title: '月收入(元)', amount: true}, 2)}
                                {this.getMonthCol({field: 'workDatetime', title: '何时进入现单位工作'}, 2)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({
                                    field: 'selfCompanyArea',
                                    title: '自营公司单位面积',
                                    hidden: !this.state.isSelfCompany
                                })}
                                {this.getInputCol({
                                    field: 'employeeQuantity',
                                    title: '员工数量',
                                    number: true,
                                    hidden: !this.state.isSelfCompany
                                })}
                                {this.getInputCol({
                                    field: 'enterpriseMonthOutput',
                                    title: '企业月产值',
                                    number: true,
                                    hidden: !this.state.isSelfCompany
                                }, 33)}
                            </Row>
                            <Row gutter={54}>
                                {this.getNormalTextAreaCol({field: 'otherWorkNote', title: '工作描述及还款来源分析'}, 2)}
                                {this.getFileCol({field: 'workAssetPdf', title: '工作资料上传', type: 'img'}, 2)}
                            </Row>
                        </TabPane>
                        <TabPane tab="附件池" key="9">
                            {this.getAccessorypool()}
                        </TabPane>
                        <TabPane tab="待办消息" key="10">
                            {this.getNotice()}
                        </TabPane>
                        <TabPane tab="流转日志" key="15">
                            <Table {...this.getTableProps()} />
                        </TabPane>
                    </Tabs>
                    <FormItem {...tailFormItemLayout} style={{marginTop: 20}}>
                        {this.enter
                            ? <div>
                                <Button type="primary" onClick={() => this.checkForm()}>确认入档</Button>
                                <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
                            </div>
                            : <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
                        }
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default ArchivesAddEdit;
