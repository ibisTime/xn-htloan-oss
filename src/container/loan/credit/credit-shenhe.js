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
    getRealValue, dateTimeFormat
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
        // 信贷专员初审
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
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
            loanPeriodData: [],
            cdBizCode: [],
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
            dealNodeList: []
        };

        this.loanRole = ''; // 角色
        this.creditUserList = '';
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
            getQiniuToken(),
            fetch(632117, {code: this.code})
        ]).then(([
                     loanProductData, cdBizCode, bizTypeData, loanPeriodData, regionData, carTypeData,
                     genderData, marryStateData, educationData, addressData, relationData,
                     industryData, propertyData, incomeData, positionData, professionData,
                     interestData, loanRoleData, enterFileData, enterLocationData,
                     uploadToken, pageData
                 ]) => {
            this.setState({
                loanProductData,
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
                professionData,
                interestData,
                loanRoleData,
                enterFileData,
                enterLocationData,
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
            });
        }).catch(() => this.setState({fetching: false}));
        fetch(630176, {refOrder: this.code}).then((records) => {
            this.setState({records});
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
                values.creditUserList = this.creditUserList;
                // let bizCode = this.getBizCode();
                // values.budgetOrderCode = this.code;
                 values.approveResult = '1';
                // param.approveNote = this.projectCode;
                // param.approveUser = getUserId();
                values.operator = getUserId();
                values.code = this.code;
                this.setState({fetching: true});
                fetch(632113, values).then((data) => {
                    this.setState({fetching: false});
                    showSucMsg('操作成功');
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }).catch(() => this.setState({fetching: false}));
            }
        });
    }
    checkForms= () => {
        this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
            if (!err) {
                values.creditUserList = this.creditUserList;
                values.approveResult = '0';
                values.operator = getUserId();
                values.code = this.code;
                this.setState({fetching: true});
                fetch(632113, values).then((data) => {
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

    // 解析流转日志的节点
    formatDealNote = (v) => {
        const obj = this.state.dealNodeList.find(d => d.code === v);
        return obj ? obj.name : '';
    }

    // 获取gps列表
    getGpsList() {
        const {budgetOrderGpsList} = this.state.pageData;
        if (budgetOrderGpsList && budgetOrderGpsList.length) {
            return budgetOrderGpsList.map(b => (
                <Card key={b.code}>
                    <Row gutter={54}>
                        {this.getInputCol({field: 'gpsDevNo', title: 'GPS设备号'}, 3, b)}
                        {this.getSelectCol({field: 'gpsType', title: 'GPS类型'}, gpsTypeData, 3, b)}
                        {this.getInputCol({field: 'azLocation', title: '安装位置'}, 33, b)}
                    </Row>
                    <Row gutter={54}>
                        {this.getDateItem({field: 'azDatetime', title: '安装时间'}, 3, b)}
                        {this.getInputCol({field: 'azUser', title: '安装人员', type: 'img'}, 3, b)}
                        {this.getFileCol({field: 'devPhotos', title: '设备图片', type: 'img'}, 33, b)}
                    </Row>
                    <Row gutter={54}>
                        {this.getFileCol({field: 'azPhotos', title: '安装图片', type: 'img'}, 2, b)}
                        {this.getInputCol({field: 'remark', title: '备注'}, 2, b)}
                    </Row>
                </Card>
            ));
        }
        return null;
    }
    // 获取主贷人信息
    getCreditList(i) {
        const {pageData: {creditUserList}, loanRoleData, relationData} = this.state;
        this.creditUserList = creditUserList;
        // console.log(loanRoleData);
        if (creditUserList && creditUserList.length) {
            // 判断creditUserList中征信人个数是否小于3个
            if (creditUserList.length <= i) { // i=2时,若creditUserList中只有2条数据就会报错
                return null;
            } else {
                if (creditUserList[i].loanRole === '1') { // 主贷人
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
                                }, loanRoleData, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'mobile', title: '手机号'}, 3, creditUserList[i])}
                                {this.getInputCol({field: 'idNo', title: '身份证号'}, 3, creditUserList[i])}
                                {this.getInputCol({
                                    field: 'bankCreditResultRemark',
                                    title: '征信结果说明'
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'idNoFront',
                                    title: '身份证正面',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    field: 'idNoReverse',
                                    title: '身份证反面',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    field: 'interviewPic',
                                    title: '面签照片',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'bankReport',
                                    title: '征信报告',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getSelectCol({
                                    title: '银行征信结果是否通过',
                                    field: 'bankCreditResultPdf'
                                }, isbankCreditResultPdf, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'authPdf',
                                    title: '征信查询授权书',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    title: '大数据征信报告(多张)',
                                    field: 'dataReport',
                                    type: 'img',
                                    // required: true,
                                    readonly: true
                                }, 3, creditUserList[i])}

                            </Row>
                            <Row>
                                {this.getNormalTextAreaCol({
                                    field: 'approveNote',
                                    title: '审核意见',
                                    type: 'textarea',
                                    readonly: false
                                }, 33)}
                            </Row>
                        </Card>
                    );
                } else if (creditUserList[i].loanRole === '2') { // 共同还款人
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
                                }, loanRoleData, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'mobile', title: '手机号'}, 3, creditUserList[i])}
                                {this.getInputCol({field: 'idNo', title: '身份证号'}, 3, creditUserList[i])}
                                {this.getInputCol({
                                    field: 'bankCreditResultRemark',
                                    title: '征信结果说明'
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'idNoFront',
                                    title: '身份证正面',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    field: 'idNoReverse',
                                    title: '身份证反面',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    field: 'interviewPic',
                                    title: '面签照片',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'bankReport',
                                    title: '征信报告',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getSelectCol({
                                    title: '银行征信结果是否通过',
                                    field: 'bankCreditResultPdf'
                                }, isbankCreditResultPdf, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'authPdf',
                                    title: '征信查询授权书',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    title: '大数据征信报告(多张)',
                                    field: 'dataReport',
                                    type: 'img',
                                    // required: true,
                                    readonly: true
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row>
                                {this.getNormalTextAreaCol({
                                    field: 'approveNote',
                                    title: '审核意见',
                                    type: 'textarea',
                                    readonly: false
                                }, 33)}
                            </Row>
                        </Card>
                    );
                } else if (creditUserList[i].loanRole === '3') { // 担保人
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
                                }, loanRoleData, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getInputCol({field: 'mobile', title: '手机号'}, 3, creditUserList[i])}
                                {this.getInputCol({field: 'idNo', title: '身份证号'}, 3, creditUserList[i])}
                                {this.getInputCol({
                                    field: 'bankCreditResultRemark',
                                    title: '征信结果说明'
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'idNoFront',
                                    title: '身份证正面',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    field: 'idNoReverse',
                                    title: '身份证反面',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    field: 'interviewPic',
                                    title: '面签照片',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'bankReport',
                                    title: '征信报告',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getSelectCol({
                                    field: 'bankCreditResultPdf',
                                    title: '银行征信结果是否通过'
                                }, isbankCreditResultPdf, 3, creditUserList[i])}
                            </Row>
                            <Row gutter={54}>
                                {this.getFileCol({
                                    field: 'authPdf',
                                    title: '征信查询授权书',
                                    type: 'img'
                                }, 3, creditUserList[i])}
                                {this.getFileCol({
                                    title: '大数据征信报告(多张)',
                                    field: 'dataReport',
                                    type: 'img',
                                    // required: true,
                                    readonly: true
                                }, 3, creditUserList[i])}
                            </Row>
                            <Row>
                                {this.getNormalTextAreaCol({
                                    field: 'approveNote',
                                    title: '审核意见',
                                    type: 'textarea',
                                    readonly: false
                                }, 33)}
                            </Row>
                        </Card>
                    );
                }
            }
        }
    }

    render() {
        const {
            cdBizCode,
            bizTypeData, loanPeriodData, loanProductData, regionData, carTypeData,
            genderData, marryStateData, educationData, addressData, relationData,
            industryData, propertyData, incomeData, positionData, professionData,
            enterFileData, enterLocationData, showMate, showGua, showSqryhls,
            showSqrzfbls, showSqrwxls, showPoyhls, showPozfbls, showPowxls,
            showDbryhls, showDbrzfbls, showDbrwxls, isMarried, showMarry, bizType
        } = this.state;
        const TabPane = Tabs.TabPane;
        return (
            <Spin spinning={this.state.fetching}>
                <Form>
                    <Card style={{ marginTop: 16 }}>
                        <Row gutter={54}>
                            {this.getInputCol({ field: 'userName', title: '客户姓名', required: true })}
                            {this.getInputCol({ field: 'code', title: '业务编号', required: true })}
                            {this.getInputCol({field: 'companyName', title: '业务公司'})}
                        </Row>
                        <Row gutter={54}>
                            {this.getInputCol({field: 'loanBankName', title: '贷款银行'}, 33)}
                            {this.getSelectCol({
                                field: 'bizType',
                                title: '业务种类',
                                keyName: 'dkey',
                                valueName: 'dvalue',
                                readonly: true
                            }, bizTypeData)}
                            {this.getInputCol({field: 'loanAmount', title: '贷款金额', amount: true}, 33)}
                        </Row>
                        <Row gutter={54}>
                        {this.getInputCol({
                            field: 'ywyUser',
                            title: '业务归属',
                            formatter: (v, d) => {
                                return d ? d.companyName + '-' + d.teamName + '-' + d.saleUserName : '';
                            },
                            readonly: true
                        }, 33)}
                        {this.getInputCol({
                            field: 'zfStatus',
                            title: '指派归属',
                            formatter: (v, d) => {
                                return d ? d.companyName + '-' + d.teamName + '-' + d.insideJobName : '';
                            },
                            readonly: true
                        }, 33)}
                            {this.getSelectCol({
                                field: 'status',
                                title: '当前状态',
                                keyName: 'dkey',
                                valueName: 'dvalue',
                                formatter: (v, d) => {
                                    return d ? d.cdbiz.status : '';
                                },
                                readonly: true
                            }, cdBizCode)}
                        </Row>
                    </Card>
                    <Tabs defaultActiveKey="1" className= 'query-form'>
                        <TabPane tab="主贷人征信" key="1">
                            {this.getCreditList(0)}
                        </TabPane>
                        <TabPane tab="共同还款人征信" key="2">
                            {this.getCreditList(1)}
                        </TabPane>
                        <TabPane tab="担保人征信" key="3">
                            {this.getCreditList(2)}
                        </TabPane>
                    </Tabs>
                    <FormItem {...tailFormItemLayout} style={{marginTop: 20}}>
                        {this.isCheck
                            ? <div>
                                <Button type="primary" onClick={() => this.checkForm()}>通过</Button>
                                <Button style={{marginLeft: 20}} onClick={this.checkForms}>不通过</Button>
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
