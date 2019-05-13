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
// 是否融资数据字典
const isFinancingData = [
    {k: '0', v: '否'},
    {k: '1', v: '是'}
];
// gps设备类型
const gpsTypeData = [
    {dkey: '1', dvalue: '有线'},
    {dkey: '0', dvalue: '无线'}
];
// 是否通过
const isbankCreditResultPdf = [
    {dkey: '1', dvalue: '是'},
    {dkey: '0', dvalue: '否'}
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
            budgetOrderGps: '',
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
            // GPS列表
            cgps: [],
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
        this.column = [{
            title: 'GPS编号',
            dataIndex: 'gpsDevNo'
        }, {
            title: '安装位置',
            dataIndex: 'azLocation'
        }, {
            title: '安装时间',
            dataIndex: 'azDatetime',
            render: dateTimeFormat
        }, {
            title: '安装人员',
            dataIndex: 'azUser'
        }, {
            title: '备注',
            dataIndex: 'remark'
        }];
    }

    componentDidMount() {
        Promise.all([
            fetch(632177, {status: '2'}),
            getDictList({parentKey: 'politics'}),
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
                     loanProductData, politics, attAchment, cdBizCode, bizTypeData, loanPeriodData, regionData, carTypeData,
                     genderData, marryStateData, educationData, addressData, relationData,
                     industryData, propertyData, incomeData, noticeData, positionData, professionData,
                     interestData, loanRoleData, enterFileData, enterLocationData,
                     uploadToken, pageData
                 ]) => {
                if (pageData.creditUserList.length === 0 || pageData.creditUserList.length === 1) {
                    this.setState({
                        isShowTabPane01: true,
                        isShowTabPane02: false,
                        isShowTabPane03: false
                    });
                } else if (pageData.creditUserList.length === 2) {
                    this.setState({
                        isShowTabPane03: false
                    });
                } else {
                    let len = pageData.creditUserList.length - 1;
                    if (len === 1) {
                        if (pageData.creditUserList[len].relation === '2') {
                            this.setState({
                                isShowTabPane03: false
                            });
                        }
                        if (pageData.creditUserList[len].relation === '3') {
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
                this.setState({
                    politics,
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
                    credits: pageData,
                    budgetOrderGps: pageData.budgetOrderGps,
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
        fetch(632717, {code: this.code}).then((cgps) => {
            this.setState({cgps});
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
            isImg: item.type === 'img' || item.type === 'file',
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
    getTableProp() {
        return {
            columns: this.column,
            dataSource: this.state.budgetOrderGps,
            rowSelection: null,
            bordered: true,
            rowKey: record => record.id
        };
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
    // 获取1主贷人 2共同担保人 3担保人征信
    getCreditList(role) {
        const {pageData: {creditUserList}, interestData, relationData} = this.state;
        // console.log(creditUserList);
        this.creditUserList = creditUserList;
        if (creditUserList && creditUserList.length) {
                for (let i = 0; i < creditUserList.length; i++) {
                    if (creditUserList[i].loanRole == role) { // 主贷人 共同担保人  担保人
                        return (
                            <Card key={creditUserList[i].code}>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'userName', title: '姓名'}, 3, creditUserList[i])}
                                    {this.getSelectCol({
                                        field: 'relation',
                                        title: '与借款人关系'
                                    }, relationData, 3, creditUserList[i])}
                                    {this.getSelectCol({
                                        field: 'loanRole',
                                        title: '贷款角色'
                                    }, interestData, 3, creditUserList[i])}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'mobile', title: '手机号'}, 3, creditUserList[i])}
                                    {this.getInputCol({field: 'idNo',
                                        title: '身份证号'}, 3, creditUserList[i])}
                                    {this.getInputCol({
                                        field: 'bankCreditResultRemark',
                                        title: '征信结果说明'
                                    }, 3, creditUserList[i])}
                                </Row>
                                <Row gutter={54}>
                                    {this.getFileCol({
                                        field: 'idFront',
                                        title: '身份证正面',
                                        type: 'img',
                                        formatter(v, d) {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if(item.vname === '申请人身份证正面' || item.vname === '共还人身份证正面') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 3)}
                                    {this.getFileCol({
                                        field: 'idReverse',
                                        title: '身份证反面',
                                        type: 'img',
                                        formatter(v, d) {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if(item.vname === '申请人身份证反面' || item.vname === '共还人身份证反面') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 3)}
                                    {this.getFileCol({
                                        field: 'interviewPic',
                                        title: '面签照片',
                                        type: 'img',
                                        formatter(v, d) {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if(item.vname === '申请人面签照片' || item.vname === '共还人面签照片') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 3)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getFileCol({
                                        field: 'BankCreditReport',
                                        title: '征信报告',
                                        type: 'img',
                                        formatter(v, d) {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if(item.vname === '申请人银行征信报告' || item.vname === '共还人银行征信报告') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 3, creditUserList[i])}
                                    {this.getSelectCol({
                                        title: '银行征信结果是否通过',
                                        field: 'bankCreditResult' // bankCreditResultPdf
                                    }, isbankCreditResultPdf, 3, creditUserList[i])}
                                </Row>
                                <Row gutter={54}>
                                    {this.getFileCol({
                                        field: 'authPdf',
                                        title: '征信查询授权书',
                                        type: 'img',
                                        formatter(v, d) {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if(item.vname === '申请人征信查询授权书' || item.vname === '共还人征信查询授权书') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 3, creditUserList[i])}
                                    {this.getFileCols({
                                        title: '大数据征信报告(多张)',
                                        field: 'dataCreditReport',
                                        type: 'img',
                                        // required: true,
                                        readonly: true,
                                        formatter(v, d) {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if(item.vname === '申请人大数据报告' || item.vname === '共还人大数据报告') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 33, creditUserList[i])}

                                </Row>
                            </Card>
                        );
                    }
                }
        }
    }

    // 解析流转日志的节点
    formatDealNote = (v) => {
        const obj = this.state.dealNodeList.find(d => d.code === v);
        return obj ? obj.name : '';
    }

    render() {
        const {
            cdBizCode, politics,
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
                                            let aa = d.creditUser;
                                            return aa.userName;
                                        }
                                    })}
                                    {this.getInputCol({
                                        field: 'saleUserCompanyName',
                                        title: '业务公司'
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
                                            return moneyFormat(d.loanAmount);
                                        }
                                    }, 33)}
                                </Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="征信信息" key="2">
                            <Card>
                                <Tabs defaultActiveKey="1">
                                    {
                                        this.state.isShowTabPane01 ? (<TabPane tab="主贷人征信" key="2">
                                            {this.getCreditList(1)}
                                        </TabPane>) : null
                                    }
                                    {
                                        this.state.isShowTabPane02 ? (<TabPane tab="共同还款人征信" key="1">
                                            {this.getCreditList(2)}
                                        </TabPane>) : null
                                    }
                                    {
                                        this.state.isShowTabPane03 ? (<TabPane tab="担保人征信" key="3">
                                            {this.getCreditList(3)}
                                        </TabPane>) : null
                                    }
                                </Tabs>
                            </Card>
                        </TabPane>
                        <TabPane tab="车辆信息" key="3">
                            <Card>
                                <Row gutter={54}>
                                    {this.getSelectCol({
                                        field: 'bizType',
                                        title: '业务种类',
                                        keyName: 'dkey',
                                        valueName: 'dvalue',
                                        readonly: true
                                    }, bizTypeData, 2)}
                                    {this.getInputCol({
                                        field: 'loanPeriod',
                                        title: '贷款期限',
                                        amount: true,
                                        positive: true,
                                        formatter: (v, d) => {
                                            return d.loanInfo ? d.loanInfo.periods : '-';
                                        }
                                    }, 2)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getSelectCol({
                                        field: 'loanProductCode',
                                        title: '贷款产品',
                                        keyName: 'code',
                                        valueName: 'name',
                                        formatter: (v, d) => {
                                            return d.loanInfo.loanProductCode;
                                        }
                                    }, loanProductData, 4)}
                                    {this.getSelectCol({
                                        field: 'isAdvanceFund',
                                        title: '是否垫资',
                                        keyName: 'k',
                                        valueName: 'v',
                                        formatter: (v, d) => {
                                            return d.isAdvanceFund;
                                        }
                                    }, isAdvFundData, 4)}
                                    {this.getSelectCol({
                                        field: 'isFinancing',
                                        title: '是否融资',
                                        keyName: 'k',
                                        valueName: 'v',
                                        formatter: (v, d) => {
                                            return d.isFinacing;
                                        }
                                    }, isFinancingData, 4)}
                                    {this.getSelectCol({
                                        field: 'region',
                                        title: '所属区域',
                                        keyName: 'dkey',
                                        valueName: 'dvalue',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.region;
                                        }
                                    }, regionData, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'vehicleCompanyName',
                                        title: '机动车销售公司',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.invoiceCompany;
                                        }}, 4)}
                                    {this.getInputCol({field: 'invoiceCompany',
                                        title: '开票单位',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.invoiceCompany;
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'invoicePrice',
                                        title: '开票价(元)',
                                        amount: true,
                                        formatter: (v, d) => {
                                            return moneyFormat(d.carInfoRes.invoicePrice);
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'originalPrice',
                                        title: '市场指导价(元)',
                                        amount: true,
                                        formatter: (v, d) => {
                                            return moneyFormat(d.carInfoRes.originalPrice);
                                        }
                                    }, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'firstAmount',
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.sfAmount);
                                        },
                                        title: '首付金额(元)'
                                        })}
                                    {this.getInputCol({field: 'firstRate',
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.sfRate);
                                        },
                                        title: '首付比例(%)'})}
                                    {this.getInputCol({field: 'loanAmount',
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.loanAmount);
                                        },
                                        title: '贷款额(元)',
                                        amount: true}, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'monthDeposit',
                                        title: '月供保证金(元)',
                                        amount: true,
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.monthDeposit);
                                        }
                                    }, 2)}
                                    {this.getInputCol({field: 'teamFee',
                                        title: '服务费(元)',
                                        amount: true,
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.teamFee);
                                        }
                                    }, 2)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'gpsFee',
                                        title: 'GPS费用(元)',
                                        amount: true,
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.gpsFee);
                                        }
                                    }, 3)}
                                    {this.getInputCol({field: 'authFee',
                                        title: '公证费(元)',
                                        amount: true,
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.authFee);
                                        }
                                    }, 3)}
                                    {this.getInputCol({field: 'otherFee',
                                        title: '其他费用(元)',
                                        formatter: (v, d) => {
                                            return moneyFormat(d.loanInfo.otherFee);
                                        }
                                    }, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({
                                        field: 'carType',
                                        title: '车辆类型',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carType;
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'carBrand',
                                        title: '车辆品牌',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carBrand;
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'carSeries',
                                        title: '车系',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carSeries;
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'carModelName',
                                        title: '车型名称',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carModel + d.carInfoRes.carBrand;
                                        }
                                    }, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'carModel',
                                        title: '车辆型号',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carModel;
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'carColor',
                                        title: '车辆颜色',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carColor;
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'carFrameNo',
                                        title: '车架号',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carFrameNo;
                                        }
                                    }, 4)}
                                    {this.getInputCol({field: 'carEngineNo',
                                        title: '发动机号',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.carEngineNo;
                                        }
                                    }, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'settleAddress',
                                        title: '落户地点',
                                        formatter: (v, d) => {
                                            return d.carInfoRes.settleAddress;
                                        }
                                    }, 1)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getFileCol({field: 'carPic',
                                        title: '车辆照片',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '车照片') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        },
                                        type: 'img'}, 3)}
                                    {this.getFileCol({
                                        field: 'carHgzPic',
                                        title: bizType === '1' ? '绿大本扫描件' : '合格证照片',
                                        type: 'img',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '绿大本扫描件') {
                                                    url = item.url;
                                                } else if (item.vname === '合格证照片') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 3)}
                                    {this.getFileCol({
                                        field: 'secondCarReport',
                                        _keys: ['credit', 'secondCarReport'],
                                        title: '二手车评估报告',
                                        type: 'img',
                                        hidden: bizType !== '1',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '二手车评估报告') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getFileCol({
                                        field: 'driveLicenseFront',
                                        title: '行驶证正面',
                                        hidden: bizType !== '1',
                                        type: 'img',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '行驶证正面') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 2)}
                                    {this.getFileCol({
                                        field: 'driveLicenseReverse',
                                        title: '行驶证反面',
                                        hidden: bizType !== '1',
                                        type: 'img',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '行驶证反面') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    }, 2)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getNormalTextAreaCol({
                                        field: 'evaluateColumn',
                                        title: '评估栏',
                                        formatter: (v, d) => {
                                            return d.repayBiz.evaluateColumn;
                                        },
                                        hidden: bizType !== '1',
                                        required: bizType === '1'
                                    }, 1)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getFileCol({field: 'carPriceCheckReport',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '车辆价格核实报告') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        },
                                        title: '车辆价格核实报告',
                                        type: 'img'}, 1)}
                                </Row></Card>
                            <Card>
                                <Table {...this.getTableProp()}/>
                            </Card>
                        </TabPane>
                        <TabPane tab="客户信息" key="4">
                            <Card>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'applyUserName',
                                        title: '姓名',
                                        readonly: true,
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.userName : '';
                                        }
                                    })}
                                </Row>
                                <Row gutter={54}>
                                    {this.getSelectCol({
                                        field: 'gender',
                                        title: '性别',
                                        keyName: 'dkey',
                                        valueName: 'dvalue'
                                    }, genderData)}
                                    {this.getInputCol({field: 'age',
                                        title: '年龄',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.age : '';
                                        },
                                        number: true,
                                        positive: true})}
                                    {this.getInputCol({field: 'idNo',
                                        title: '身份证号',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.idNo : '';
                                        },
                                        positive: true}, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getSelectCol({
                                        field: 'marryState',
                                        title: '婚姻状况',
                                        keyName: 'dkey',
                                        valueName: 'dvalue',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.marryState : '';
                                        }
                                    }, marryStateData)}
                                    {this.getInputCol({field: 'nation',
                                        title: '民族',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.nation : '';
                                        }
                                    })}
                                    {this.getSelectCol({
                                        field: 'education',
                                        title: '学历',
                                        keyName: 'dkey',
                                        valueName: 'dvalue',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.education : '';
                                        }
                                    }, educationData, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getSelectCol({field: 'political',
                                        title: '政治面貌',
                                        keyName: 'dkey',
                                        valueName: 'dvalue',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.political : '';
                                        }
                                    }, politics, 33)}
                                    {this.getInputCol({field: 'familyNumber',
                                        title: '家庭人口',
                                        positive: true,
                                        'Z+': true,
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.familyNumber : '';
                                        }
                                    })}
                                    {this.getInputCol({field: 'mobile',
                                        title: '联系电话',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.mobile : '';
                                        },
                                        mobile: true}, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'nowAddress',
                                        title: '现居住地址',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.nowAddress : '';
                                        }
                                    })}
                                    {this.getInputCol({field: 'nowPostCode',
                                        title: '现居住地址邮编',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.nowPostCode : '';
                                        }
                                    })}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'residenceAddress',
                                        title: '户口所在地',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.birthAddress : '';
                                        }
                                    }, 2)}
                                    {this.getInputCol({field: 'postCode2',
                                        title: '户口所在地邮编',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.birthPostCode : '';
                                        }
                                    }, 2)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'familyMainAsset',
                                        title: '家庭主要财产(元)',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.familyMainAsset : '';
                                        }
                                    }, 2)}
                                    {this.getInputCol({field: 'mainAssetInclude',
                                        title: '主要财产说明',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.mainAssetInclude : '';
                                        }
                                        }, 2)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getFileCol({field: 'houseContract',
                                        title: '购房合同及房产本',
                                        type: 'img',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '购房合同及房产本') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    })}
                                    {this.getFileCol({field: 'assetPdf',
                                        title: '其他辅助资产',
                                        type: 'img',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '其他辅助资产') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    })}
                                    {this.getFileCol({field: 'housePicture',
                                        title: '家访照片',
                                        type: 'img',
                                        formatter: (v, d) => {
                                            let url = '';
                                            d.attachments.forEach(item => {
                                                if (item.vname === '家访照片') {
                                                    url = item.url;
                                                }
                                            });
                                            return url;
                                        }
                                    })}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'emergencyName1',
                                        title: '联系人1姓名',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.emergencyName1 : '';
                                        }
                                    })}
                                    {this.getSelectCol({
                                        field: 'emergencyRelation1',
                                        title: '与申请人关系',
                                        keyName: 'dkey',
                                        valueName: 'dvalue',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.emergencyRelation1 : '';
                                        }
                                    }, relationData)}
                                    {this.getInputCol({field: 'emergencyMobile1',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.emergencyMobile1 : '';
                                        },
                                        title: '手机号码'}, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'emergencyName2',
                                        title: '联系人2姓名',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.emergencyName2 : '';
                                        }})}
                                    {this.getSelectCol({
                                        field: 'emergencyRelation2',
                                        title: '与申请人关系',
                                        keyName: 'dkey',
                                        valueName: 'dvalue',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.emergencyRelation2 : '';
                                        }
                                    }, relationData)}
                                    {this.getInputCol({field: 'emergencyMobile2',
                                        title: '手机号码',
                                        formatter: (v, d) => {
                                            return d.creditUser ? d.creditUser.emergencyMobile2 : '';
                                        }}, 33)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'pledgeUser',
                                        title: '抵押代理人',
                                        formatter: (v, d) => {
                                            return d.carPledge ? d.carPledge.pledgeUser : '';
                                        }})}
                                    {this.getInputCol({field: 'pledgeAddress',
                                        title: '抵押地点',
                                        formatter: (v, d) => {
                                            return d.carPledge ? d.carPledge.pledgeAddress : '';
                                        }
                                    })}
                                    {this.getFileCol({
                                        field: 'pledgeUserIdCardCopy',
                                        title: '抵押代理人身份证复印件',
                                        type: 'img'
                                    }, 33)}
                                </Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="垫资信息" key="5">
                            <Card>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'backAdvanceStatus',
                                    title: '退客户垫资款状态',
                                    formatter: (v, d) => {
                                        return d.advance ? d.advance.backAdvanceStatus : '-';
                                    }
                                }, 4)}
                                {this.getInputCol({field: 'backAdvanceFundType',
                                    title: '收回垫资款类型',
                                    formatter: (v, d) => {
                                        return d.advance ? d.advance.backAdvanceFundType : '-';
                                    }
                                }, 4)}
                                {this.getDateItem({
                                    field: 'advanceFundDatetime',
                                    _keys: ['advance', 'advanceFundDatetime'],
                                    title: '垫资日期'
                                }, 4)}
                                {this.getInputCol({field: 'backAdvanceAmount',
                                    title: '退客户垫资款 退款金额',
                                    formatter: (v, d) => {
                                        return d.advance ? d.advance.backAdvanceAmount : '-';
                                    },
                                    amount: true}, 4)}

                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'advanceFundAmount',
                                    title: '垫资金额',
                                    formatter: (v, d) => {
                                        return d.advance ? moneyFormat(d.advance.advanceFundAmount) : '-';
                                    }
                                }, 4)}
                                {this.getInputCol({field: 'totalAdvanceFundCode',
                                    title: '垫资汇总单编号',
                                    formatter: (v, d) => {
                                        return d.advance ? d.advance.totalAdvanceFundCode : '-';
                                    }
                                }, 4)}
                                {this.getInputCol({field: 'billPdf', title: '水单'}, 4)}
                                {this.getInputCol({field: 'advanceNote',
                                    title: '垫资说明',
                                    formatter: (v, d) => {
                                        return d.advance ? d.advance.advanceNote : '-';
                                    }
                                }, 4)}
                            </Row>
                            <Row gutter={54}>
                                    {this.getMonthCol({field: 'backAdvanceAccount',
                                        title: '退客户垫资款 收款账号',
                                        formatter: (v, d) => {
                                            return d.advance ? d.advance.backAdvanceAccount : '-';
                                        }
                                    }, 4)}
                                {this.getMonthCol({field: 'backAdvanceOpenBank',
                                    title: '退客户垫资款 开户行'}, 4)}
                                {this.getInputCol({field: 'backAdvanceSubbranch',
                                    title: '退客户垫资款 开户支行'}, 4)}
                                {this.getMonthCol({field: 'backAdvanceWaterBill', title: '退客户垫资款 水单'}, 4)}
                            </Row>
                            <Row gutter={54}>
                             {this.getMonthCol({field: 'useAmount', title: '用款金额(应退按揭款)'}, 4)}
                                {this.getInputCol({field: 'fundSource', title: '金额来源'}, 4)}
                                {this.getMonthCol({field: 'makeBillNote', title: '制单意见说明'}, 4)}
                                {this.getMonthCol({field: 'cancelReason', title: '撤销理由'}, 4)}
                            </Row>
                            <Row gutter={54}>
                             </Row>
                            <Row gutter={54}>
                                {this.getDateItem({field: 'payBackDatetime', title: '付款时间', amount: true}, 4)}
                                {this.getMonthCol({field: 'payBackBankcardCode', title: '付款银行'}, 4)}
                                {this.getMonthCol({field: 'payBackBillPdf', title: '付款凭证'}, 4)}
                            </Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="放款信息" key="9">
                            <Card>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'repayBankCode',
                                    title: '还款卡银行编号',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.repayBankCode : '-';
                                    }
                                }, 4)}
                                {this.getInputCol({field: 'repayBankName',
                                    title: '还款卡银行名称',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.repayBankName : '-';
                                    }
                                }, 4)}
                                {this.getInputCol({field: 'repaySubbranch',
                                    title: '还款卡开户支行',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.repaySubbranch : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'repayBankcardNumber',
                                    title: '还款卡银行卡号',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.repayBankcardNumber : '-';
                                    }}, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'receiptBankCode',
                                    title: '收款银行编号',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.receiptBankCode : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'receiptBankName',
                                    title: '收款银行名称',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.receiptBankName : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'receiptSubbranch',
                                    title: '收款银行支行',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.receiptSubbranch : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'receiptBankcardNumber',
                                    title: '收款银行卡号',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.receiptBankcardNumber : '-';
                                    }}, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getDateItem({field: 'bankCommitDatetime',
                                    title: '银行提交时间',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.bankCommitDatetime : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'bankCommitNote',
                                    title: '银行提交说明',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.bankCommitNote : '-';
                                    }}, 4)}
                                {this.getDateItem({field: 'bankFkDatetime',
                                    title: '银行放款时间',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.bankFkDatetime : '-';
                                    }}, 4)}
                                {this.getDateItem({field: 'repayBillDate',
                                    title: '银行账单日',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.repayBillDate : '-';
                                    }}, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getDateItem({field: 'repayBankDate',
                                    title: '银行还款日',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.repayBankDate : '-';
                                    }}, 4)}
                                {this.getDateItem({field: 'repayCompanyDate',
                                    title: '公司还款日',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.repayCompanyDate : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'receiptPdf',
                                    title: '收款凭证',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.receiptPdf : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'receiptRemark',
                                    title: '收款备注',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.receiptRemark : '-';
                                    }}, 4)}
                            </Row>
                            <Row gutter={54}>
                                {this.getDateItem({field: 'bankFkSendDatetime',
                                    title: '银行放款进件时间',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.bankFkSendDatetime : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'hasLoanListPic',
                                    title: '已放款名单',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.hasLoanListPic : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'bankFkAmount',
                                    title: '银行放款金额',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.bankFkAmount : '-';
                                    }}, 4)}
                                {this.getInputCol({field: 'monthAmount',
                                    title: '月还款额',
                                    formatter: (v, d) => {
                                        return d.loanInfo ? d.loanInfo.monthAmount : '-';
                                    }}, 4)}
                            </Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="抵押信息" key="10">
                            <Card>
                                <Row gutter={54}>
                                    {this.getMonthCol({field: 'pledgeUser', title: '代理人'}, 4)}
                                    {this.getMonthCol({field: 'pledgeUserIdCard', title: '代理人身份证号'}, 4)}
                                    {this.getInputCol({field: 'pledgeAddress', title: '抵押地点'}, 4)}
                                    {this.getMonthCol({field: 'pledgeDatetime', title: '抵押日期'}, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getDateItem({field: 'pledgeBankCommitDatetime', title: '抵押提交银行时间'}, 4)}
                                    {this.getMonthCol({field: 'pledgeBankCommitNote', title: '抵押提交说明'}, 4)}
                                    {this.getInputCol({field: 'pledgeSupplementNote', title: '车辆抵押补充说明'}, 4)}
                                    {this.getMonthCol({field: 'pledgeContractCode', title: '抵押合同编号'}, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getMonthCol({field: 'pledgePrintTemplateId', title: '抵押套打模板'}, 4)}
                                    {this.getMonthCol({field: 'pledgePrintUser', title: '抵押打印人'}, 4)}
                                    {this.getInputCol({field: 'pledgePrintDatetime', title: '抵押打印日期'}, 4)}
                                </Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="返点信息" key="11">
                            <Card>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'teamName', title: '业务团队'}, 4)}
                                    {this.getInputCol({field: 'captainName', title: '团队队长'}, 4)}
                                    {this.getInputCol({field: 'shouldAmount', title: '应返金额'}, 4)}
                                    {this.getInputCol({field: 'bank', title: '收款银行'}, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'subbranch', title: '收款支行'}, 4)}
                                    {this.getInputCol({field: 'accountNo', title: '收款账号'}, 4)}
                                    {this.getInputCol({field: 'actualAmount', title: '实返金额'}, 4)}
                                    {this.getInputCol({field: 'waterBill', title: '水单'}, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'updater', title: '更新人'}, 4)}
                                    {this.getDateItem({field: 'updateDatetime', title: '更新时间'}, 4)}
                                    {this.getInputCol({field: 'remark', title: '备注'}, 4)}</Row>
                            </Card>
                        </TabPane>
                        <TabPane tab="手续费明细" key="12">
                            <Card>
                                <Row gutter={54}>
                                    {this.getInputCol({ field: 'gpsFee',
                                        title: 'GPS费用(元)',
                                        _keys: ['loanInfo', 'gpsFee'],
                                        amount: true,
                                        required: true}, 4)}
                                    {this.getInputCol({ field: 'authFee',
                                        title: '公证费用(元)',
                                        _keys: ['loanInfo', 'authFee'],
                                        amount: true,
                                        required: true
                                    }, 4)}
                                    {this.getInputCol({field: 'bankFee', title: '银行服务费'}, 4)}
                                    {this.getInputCol({field: 'companyFee',
                                        title: '公司服务费',
                                        _keys: ['carInfo', 'companyFee'],
                                        amount: true}, 4)}
                                </Row>
                                <Row gutter={54}>
                                    {this.getInputCol({field: 'teamFee',
                                        title: '团队服务费(元)',
                                        _keys: ['loanInfo', 'teamFee'],
                                        amount: true}, 4)}
                                    {this.getInputCol({field: 'otherFee', title: '杂费'}, 4)}
                                    {this.getInputCol({field: 'otherFee',
                                        _keys: ['loanInfo', 'otherFee'],
                                        amount: true,
                                        title: '其他费用'}, 4)}
                                </Row>
                            </Card>
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
