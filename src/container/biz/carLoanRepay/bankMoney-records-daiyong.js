import React from 'react';
import { Form, Row, Col, Spin, Button, Table, Card, Icon, Tooltip } from 'antd';
import moment from 'moment';
import CUpload from 'component/cUpload/cUpload';
import CInput from 'component/cInput/cInput';
import CSelect from 'component/cSelect/cSelect';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CMonth from 'component/cMonth/cMonth';
import CRangeDate from 'component/cRangeDate/cRangeDate';
import { tailFormItemLayout, DATE_FORMAT, MONTH_FORMAT, validateFieldsAndScrollOption } from 'common/js/config';
import {
  getQueryString, showSucMsg, isUndefined, getUserId, getRules,
  getRealValue, moneyFormat, moneyParse, dateTimeFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { getDictList } from 'api/dict';
import { getQiniuToken } from 'api/general';
import {
  amountFields, rangeDateFields, sqryhls, sqrzfbls, sqrwxls,
  poyhls, pozfbls, powxls, dbryhls, dbrzfbls, dbrwxls
} from '../../loan/admittance-addedit/config';

const FormItem = Form.Item;
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const col3Props = { xs: 32, sm: 24, md: 12, lg: 8 };
const col33Props = { xs: 32, sm: 24, md: 24, lg: 8 };
const col4Props = { xs: 32, sm: 24, md: 12, lg: 6 };

// 是否垫资数据字典
const isAdvFundData = [
  { k: '0', v: '否' },
  { k: '1', v: '是' }
];

@Form.create()
class BankMoneyRecord extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.bizType = getQueryString('bizType', this.props.location.search);

    this.state = {
      fetching: true,
      token: '',
      // 用于upload控件判断页面是否初始化完成
      isLoaded: false,
      // 贷款产品数据
      loanProductData: [],
      /* 页面所需数据字典start */
      bizTypeData: [],
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
      professionData: [],
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
      fetch(632177, { status: '2', type: this.bizType }),
      getDictList({ parentKey: 'budget_orde_biz_typer' }),
      getDictList({ parentKey: 'loan_period' }),
      getDictList({ parentKey: 'region' }),
      getDictList({ parentKey: 'car_type' }),
      getDictList({ parentKey: 'gender' }),
      getDictList({ parentKey: 'marry_state' }),
      getDictList({ parentKey: 'education' }),
      getDictList({ parentKey: 'is_card_mail_address' }),
      getDictList({ parentKey: 'credit_user_relation' }),
      getDictList({ parentKey: 'work_belong_industry' }),
      getDictList({ parentKey: 'work_company_property' }),
      getDictList({ parentKey: 'main_income' }),
      getDictList({ parentKey: 'position' }),
      getDictList({ parentKey: 'work_profession' }),
      getDictList({ parentKey: 'interest' }),
      getQiniuToken(),
      fetch(632516, { code: this.code })
    ]).then(([loanProductData, bizTypeData, loanPeriodData, regionData,
      carTypeData, genderData, marryStateData, educationData, addressData,
      relationData, industryData, propertyData, incomeData, positionData,
      professionData, interestData, uploadToken, pageData]) => {
      this.setState({
        loanProductData,
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
        pageData,
        showMate: (!!pageData.mateName || pageData.marryState === '2'),
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
    }).catch(() => this.setState({ fetching: false }));
    fetch(630176, { refOrder: this.code }).then((records) => {
      this.setState({ records });
    }).catch(() => {});
    fetch(630147).then((dealNodeList) => {
      this.setState({ dealNodeList });
    }).catch(() => {});
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
  getInputCol(item, split = 3) {
    let colProps = this.getColProps(split);
    item.readonly = this.isReadonly(item);
    const props = {
      rules: getRules(item),
      initVal: getRealValue({...item, pageData: this.state.pageData}),
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
  getSelectCol(item, list, split = 3) {
    let colProps = this.getColProps(split);
    item.readonly = this.isReadonly(item);
    const props = {
      list,
      initVal: getRealValue({...item, pageData: this.state.pageData}),
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
  getFileCol(item, split = 3) {
    let colProps = this.getColProps(split);
    item.readonly = this.isReadonly(item);
    const props = {
      initVal: getRealValue({...item, pageData: this.state.pageData}),
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
  // 表单提交前的处理
  beforeSubmit(values) {
    values.code = isUndefined(values.code) ? this.code || '' : values.code;
    // 金额*1000
    amountFields.forEach(v => {
      if (!isUndefined(values[v])) {
        values[v] = moneyParse(values[v]);
      }
    });
    // 日期
    rangeDateFields.forEach(v => {
      if (!isUndefined(values[v[0]])) {
        let bDate = [...values[v[0]]];
        if (bDate.length) {
          delete values[v[0]];
          values[v[1]] = bDate[0].format(DATE_FORMAT);
          values[v[2]] = bDate[1].format(DATE_FORMAT);
        }
      }
    });
    // 月份
    if (!isUndefined(values['workDatetime'])) {
      values['workDatetime'] = values['workDatetime'].format(MONTH_FORMAT);
    }
    // 多选
    if (!isUndefined(values['mainIncome'])) {
      values['mainIncome'] = values['mainIncome'].join(',');
    }
    values.updater = getUserId();
  }
  // 保存表单前的校验
  checkForm = () => {
    this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
      if (!err) {
        this.beforeSubmit(values);
        this.setState({ fetching: true });
        fetch(632141, values).then(() => {
          this.setState({ fetching: false });
          showSucMsg('操作成功');
          setTimeout(() => {
            this.props.history.go(-1);
          }, 1000);
        }).catch(() => this.setState({ fetching: false }));
      }
    });
  }
  // 流水时间改变
  jourDatetimeChange(dates, incomeStr, expendStr, monIncomeStr, monExpendStr) {
    let jourIncome = this.props.form.getFieldValue(incomeStr);
    let jourExpend = this.props.form.getFieldValue(expendStr);
    let num = dates[1].diff(dates[0], 'months', true);
    num = num.toFixed(1);
    if (jourIncome) {
      jourIncome = moneyParse(jourIncome);
      this.props.form.setFieldsValue({
        [monIncomeStr]: moneyFormat(jourIncome / num)
      });
    }
    ;
    if (jourExpend) {
      jourExpend = moneyParse(jourExpend);
      this.props.form.setFieldsValue({
        [monExpendStr]: moneyFormat(jourExpend / num)
      });
    }
  }
  // 总收入、总支出改变
  moneyChange(v, jourDatetimeStr, jourMonStr) {
    let jourDatetime = this.props.form.getFieldValue(jourDatetimeStr);
    if (jourDatetime) {
      let num = jourDatetime[1].diff(jourDatetime[0], 'months', true);
      v = moneyParse(v);
      this.props.form.setFieldsValue({
        [jourMonStr]: moneyFormat(v / num)
      });
    }
  }
  // 获取label
  getLabel(item) {
    return (
      <span className={item.required && ((item.type === 'textarea' && !item.normalArea) || (item.type === 'o2m')) ? 'ant-form-item-required' : ''}>
        {item.title + (item.single ? '(单)' : '')}
          {item.help ? <Tooltip title={item.help}><Icon type="question-circle-o"/></Tooltip> : null}
      </span>
    );
  }
  // 获取银行、支付宝、微信流水控件
  getJourComp(title, fields) {
    const { interestData } = this.state;
    return (
      <Card style={{ marginTop: 16 }} title={title + '数据'}>
        <Row gutter={54}>
          {this.getRangeDateCol({ field: fields[0], title: '流水时间', onChange: (dates) => this.jourDatetimeChange(dates, fields[7], fields[8], fields[10], fields[11]), type: 'date', rangedate: [fields[1], fields[2]], readonly: false }, 1)}
        </Row>
        <Row gutter={54}>
          {this.getSelectCol({ field: fields[3], title: '结息时间1', readonly: false }, interestData, 2)}
          {this.getSelectCol({ field: fields[4], title: '结息时间2', readonly: false }, interestData, 2)}
        </Row>
        <Row gutter={54}>
          {this.getInputCol({ field: fields[5], title: '结息1(元)', amount: true, readonly: false }, 2)}
          {this.getInputCol({ field: fields[6], title: '结息2(元)', amount: true, readonly: false }, 2)}
        </Row>
        <Row gutter={54}>
          {this.getInputCol({ field: fields[7], title: '总收入(元)', onChange: (v) => this.moneyChange(v, fields[0], fields[10]), amount: true, readonly: false }, 2)}
          {this.getInputCol({ field: fields[8], title: '总支出(元)', onChange: (v) => this.moneyChange(v, fields[0], fields[11]), amount: true, readonly: false }, 2)}
        </Row>
        <Row gutter={54}>
          {this.getInputCol({ field: fields[9], title: '账户余额(元)', amount: true, readonly: false })}
          {this.getInputCol({ field: fields[10], title: '月均收入(元)', amount: true, readonly: false })}
          {this.getInputCol({ field: fields[11], title: '月均支出(元)', amount: true, readonly: false }, 33)}
        </Row>
        <Row gutter={54}>
          {this.getNormalTextAreaCol({ field: fields[12], title: '流水说明', readonly: false }, 1)}
        </Row>
        <Row gutter={54}>
          {this.getFileCol({ field: fields[13], title: title, type: 'img', readonly: false }, 1)}
        </Row>
      </Card>
    );
  }
  // 返回
  onCancel = () => this.props.history.go(-1)
  // 获取控件readonly的值
  isReadonly(item) {
    return isUndefined(item.readonly) ? true : item.readonly;
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
  render() {
    const {
      bizTypeData, loanPeriodData, loanProductData, regionData, carTypeData,
      genderData, marryStateData, educationData, addressData, relationData,
      industryData, propertyData, incomeData, positionData, professionData,
      showMate, showGua, showSqryhls, showSqrzfbls, showSqrwxls, showPoyhls,
      showPozfbls, showPowxls, showDbryhls, showDbrzfbls, showDbrwxls,
      isMarried, showMarry
    } = this.state;
    return (
      <Spin spinning={this.state.fetching}>
        <Form>
          <Card title="贷款车辆信息">
            <Row gutter={54}>
              {this.getSelectCol({ field: 'bizType', title: '业务种类', keyName: 'dkey', valueName: 'dvalue' }, bizTypeData, 2)}
              {this.getSelectCol({ field: 'loanPeriod', title: '贷款期限', keyName: 'dkey', valueName: 'dvalue' }, loanPeriodData, 2)}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol({ field: 'loanProductCode', title: '贷款产品', keyName: 'code', valueName: 'name' }, loanProductData, 4)}
              {this.getSelectCol({ field: 'isAdvanceFund', title: '是否垫资', keyName: 'k', valueName: 'v' }, isAdvFundData, 4)}
              {this.getSelectCol({ field: 'isFinancing', title: '是否融资', keyName: 'k', valueName: 'v' }, isAdvFundData, 4)}
              {this.getSelectCol({ field: 'region', title: '所属区域', keyName: 'dkey', valueName: 'dvalue' }, regionData, 4)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'vehicleCompanyName', title: '机动车销售公司' }, 4)}
              {this.getInputCol({ field: 'invoiceCompany', title: '开票单位' }, 4)}
              {this.getInputCol({ field: 'invoicePrice', title: '开票价(元)', onChange: this.invoicePriceChange, amount: true }, 4)}
              {this.getInputCol({ field: 'originalPrice', title: '市场指导价(元)', amount: true }, 4)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'firstAmount', title: '首付金额(元)', onChange: this.firstAmountChange, amount: true })}
              {this.getInputCol({ field: 'firstRate', title: '首付比例(%)' })}
              {this.getInputCol({ field: 'loanAmount', title: '贷款额(元)', onChange: this.loanAmountChange, amount: true }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'monthDeposit', title: '月供保证金(元)', amount: true }, 2)}
              {this.getInputCol({ field: 'teamFee', title: '服务费(元)', amount: true }, 2)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'gpsFee', title: 'GPS费用(元)', amount: true }, 3)}
              {this.getInputCol({ field: 'authFee', title: '公证费(元)', amount: true }, 3)}
              {this.getInputCol({ field: 'otherFee', title: '其他费用(元)', amount: true }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol({ field: 'carType', title: '车辆类型', keyName: 'dkey', valueName: 'dvalue' }, carTypeData, 4)}
              {this.getInputCol({ field: 'carBrand', title: '车辆品牌' }, 4)}
              {this.getInputCol({ field: 'carSeries', title: '车系' }, 4)}
              {this.getInputCol({ field: 'carModelName', title: '车型名称' }, 4)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'carModel', title: '车辆型号' }, 4)}
              {this.getInputCol({ field: 'carColor', title: '车辆颜色' }, 4)}
              {this.getInputCol({ field: 'carFrameNo', title: '车架号' }, 4)}
              {this.getInputCol({ field: 'carEngineNo', title: '发动机号' }, 4)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'settleAddress', title: '落户地点' }, 1)}
            </Row>
            <Row gutter={54}>
              {this.getFileCol({ field: 'carPic', title: '车辆照片', type: 'img' }, 3)}
              {this.getFileCol({ field: 'carHgzPic', title: this.bizType === '1' ? '绿大本' : '合格证照片', type: 'img' }, 3)}
              {this.getFileCol({ field: 'secondCarReport', _keys: ['credit', 'secondCarReport'], title: '二手车评估报告', type: 'file', hidden: this.bizType !== '1' }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getFileCol({ field: 'driveLicenseFront', title: '行驶证正面', hidden: this.bizType !== '1', type: 'img' }, 2)}
              {this.getFileCol({ field: 'driveLicenseReverse', title: '行驶证反面', hidden: this.bizType !== '1', type: 'img' }, 2)}
            </Row>
            <Row gutter={54}>
              {this.getNormalTextAreaCol({ field: 'evaluateColumn', title: '评估栏', hidden: this.bizType !== '1' }, 1)}
            </Row>
            {this.getFileCol({ field: 'carPriceCheckReport', title: '车辆价格核实报告', type: 'img' }, 1)}
          </Card>
          <Card style={{ marginTop: 16 }} title="申请人基本信息">
            <Row gutter={54}>
              {this.getInputCol({ field: 'applyUserName', title: '姓名' })}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol({ field: 'gender', title: '性别', keyName: 'dkey', valueName: 'dvalue' }, genderData)}
              {this.getInputCol({ field: 'age', title: '年龄', number: true, positive: true })}
              {this.getInputCol({ field: 'idNo', title: '身份证号' }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol({ field: 'marryState', title: '婚姻状况', keyName: 'dkey', valueName: 'dvalue' }, marryStateData)}
              {this.getInputCol({ field: 'nation', title: '民族' })}
              {this.getSelectCol({ field: 'education', title: '学历', keyName: 'dkey', valueName: 'dvalue' }, educationData, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'political', title: '政治面貌' })}
              {this.getInputCol({ field: 'familyNumber', title: '家庭人口', 'Z+': true })}
              {this.getInputCol({ field: 'mobile', title: '联系电话', mobile: true }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'nowAddress', title: '现居住地址' })}
              {this.getInputCol({ field: 'postCode1', title: '现居住地址邮编' })}
              {this.getSelectCol({ field: 'isCardMailAddress', title: '是否卡邮寄地址', keyName: 'dkey', valueName: 'dvalue' }, addressData, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'residenceAddress', title: '户口所在地' }, 2)}
              {this.getInputCol({ field: 'postCode2', title: '户口所在地邮编' }, 2)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'familyMainAsset', title: '家庭主要财产(元)' }, 2)}
              {this.getInputCol({ field: 'mainAssetInclude', title: '主要财产说明' }, 2)}
            </Row>
            <Row gutter={54}>
              {this.getFileCol({ field: 'houseContract', title: '购房合同及房产本', type: 'img' })}
              {this.getFileCol({ field: 'assetPdf', title: '其他辅助资产', type: 'img' })}
              {this.getFileCol({ field: 'housePicture', title: '家访照片', type: 'img' })}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'emergencyName1', title: '联系人1姓名' })}
              {this.getSelectCol({ field: 'emergencyRelation1', title: '与申请人关系', keyName: 'dkey', valueName: 'dvalue' }, relationData)}
              {this.getInputCol({ field: 'emergencyMobile1', title: '手机号码', mobile: true }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'emergencyName2', title: '联系人2姓名' })}
              {this.getSelectCol({ field: 'emergencyRelation2', title: '与申请人关系', keyName: 'dkey', valueName: 'dvalue' }, relationData)}
              {this.getInputCol({ field: 'emergencyMobile2', title: '手机号码', mobile: true }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'pledgeUser', title: '抵押代理人' })}
              {this.getInputCol({ field: 'pledgeAddress', title: '抵押地点' })}
              {this.getFileCol({ field: 'pledgeUserIdCardCopy', title: '抵押代理人身份证复印件', type: 'img' }, 33)}
            </Row>
          </Card>
          <Card style={{ marginTop: 16 }} title="工作情况">
            <Row gutter={54}>
              {this.getInputCol({ field: 'workCompanyName', title: '单位名称' }, 1)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'workCompanyAddress', title: '单位地址' }, 2)}
              {this.getSelectCol({ field: 'workIsCardMailAddress', title: '是否卡邮寄地址', keyName: 'dkey', valueName: 'dvalue' }, addressData, 2)}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol({ field: 'workBelongIndustry', title: '所属行业', keyName: 'dkey', valueName: 'dvalue' }, industryData)}
              {this.getSelectCol({ field: 'workCompanyProperty', title: '单位经济性质', keyName: 'dkey', valueName: 'dvalue' }, propertyData)}
              {this.getSelectCol({ field: 'mainIncome', title: '主要收入来源', onChange: this.mainChange, keyName: 'dkey', valueName: 'dvalue', multiple: true }, incomeData, 33)}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol({ field: 'position', title: '职务', keyName: 'dkey', valueName: 'dvalue' }, positionData)}
              {this.getSelectCol({ field: 'workProfession', title: '职业', keyName: 'dkey', valueName: 'dvalue' }, professionData)}
              {this.getInputCol({ field: 'postTitle', title: '职称' }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'monthIncome', title: '月收入(元)', amount: true }, 2)}
              {this.getMonthCol({ field: 'workDatetime', title: '何时进入现单位工作' }, 2)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ field: 'selfCompanyArea', title: '自营公司单位面积', hidden: !this.state.isSelfCompany })}
              {this.getInputCol({ field: 'employeeQuantity', title: '员工数量', number: true, hidden: !this.state.isSelfCompany })}
              {this.getInputCol({ field: 'enterpriseMonthOutput', title: '企业月产值', number: true, hidden: !this.state.isSelfCompany }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getNormalTextAreaCol({ field: 'otherWorkNote', title: '工作描述及还款来源分析' }, 2)}
              {this.getFileCol({ field: 'workAssetPdf', title: '工作资料上传', type: 'img' }, 2)}
            </Row>
          </Card>
          <Card style={{ marginTop: 16 }} title="其他基本资料上传">
            <Row gutter={54}>
              {this.getFileCol({ field: 'hkBookPdf', title: '户口本', type: 'img' })}
              {this.getFileCol({ field: 'idCardPdf', title: '身份证', type: 'img' })}
              {this.getFileCol({ field: 'marryPdf', title: isMarried ? '结婚证' : '离婚证', type: 'img', hidden: !showMarry }, 33)}
            </Row>
            <Row gutter={54}>
              {this.getFileCol({ field: 'otherPdf', title: '其他资料', type: 'img' }, 1)}
            </Row>
          </Card>
          {showMate ? (
            <Card style={{ marginTop: 16 }} title="配偶信息">
              <Row gutter={54}>
                {this.getInputCol({ field: 'mateName', title: '姓名', readonly: false }, 2)}
                {this.getInputCol({ field: 'mateMobile', title: '手机号', mobile: true, readonly: false }, 2)}
              </Row>
              <Row gutter={54}>
                {this.getInputCol({ field: 'mateIdNo', title: '身份证号', idCard: true, readonly: false }, 2)}
                {this.getSelectCol({ field: 'mateEducation', title: '学历', readonly: false }, educationData, 2)}
              </Row>
              <Row gutter={54}>
                {this.getInputCol({ field: 'mateCompanyName', title: '工作单位名称', readonly: false }, 2)}
                {this.getInputCol({ field: 'mateCompanyContactNo', title: '工作单位联系电话', readonly: false }, 2)}
              </Row>
              <Row gutter={54}>
                {this.getInputCol({ field: 'mateCompanyAddress', title: '工作单位地址', readonly: false }, 1)}
              </Row>
              <Row gutter={54}>
                {this.getFileCol({ field: 'mateAssetPdf', title: '其他辅助资产', type: 'img', readonly: false }, 1)}
              </Row>
            </Card>
          ) : null}
          {showGua ? (
            <Card style={{ marginTop: 16 }} title="担保人信息">
              <Row gutter={54}>
                {this.getInputCol({ field: 'guaName', title: '姓名', readonly: false }, 2)}
                {this.getInputCol({ field: 'guaMobile', title: '手机号', mobile: true, readonly: false }, 2)}
              </Row>
              <Row gutter={54}>
                {this.getInputCol({ field: 'guaIdNo', title: '身份证号', idCard: true, readonly: false }, 2)}
                {this.getInputCol({ field: 'guaPhone', title: '固定电话', readonly: false }, 2)}
              </Row>
              <Row gutter={54}>
                {this.getInputCol({ field: 'guaCompanyName', title: '工作单位名称', readonly: false })}
                {this.getInputCol({ field: 'guaCompanyAddress', title: '工作单位地址', readonly: false })}
                {this.getInputCol({ field: 'guaHouseAssetAddress', title: '担保人房产地址', readonly: false }, 33)}
              </Row>
              <Row gutter={54}>
                {this.getFileCol({ field: 'mateAssetPdf', title: '其他辅助资产', type: 'img', readonly: false }, 1)}
              </Row>
            </Card>
          ) : null}
          {showSqryhls ? this.getJourComp('申请人银行流水', sqryhls) : null}
          {showSqrzfbls ? this.getJourComp('申请人支付宝流水', sqrzfbls) : null}
          {showSqrwxls ? this.getJourComp('申请人微信流水', sqrwxls) : null}
          {showPoyhls ? this.getJourComp('配偶银行流水', poyhls) : null}
          {showPozfbls ? this.getJourComp('配偶支付宝流水', pozfbls) : null}
          {showPowxls ? this.getJourComp('配偶微信流水', powxls) : null}
          {showDbryhls ? this.getJourComp('担保人银行流水', dbryhls) : null}
          {showDbrzfbls ? this.getJourComp('担保人支付宝流水', dbrzfbls) : null}
          {showDbrwxls ? this.getJourComp('担保人微信流水', dbrwxls) : null}
          {!showMate ? (
            <Button onClick={() => this.setState({ showMate: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 配偶信息
            </Button>
          ) : null}
          {!showGua ? (
            <Button onClick={() => this.setState({ showGua: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 担保人信息
            </Button>
          ) : null}
          {!showSqryhls ? (
            <Button onClick={() => this.setState({ showSqryhls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 申请人银行流水
            </Button>
          ) : null}
          {!showSqrzfbls ? (
            <Button onClick={() => this.setState({ showSqrzfbls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 申请人支付宝流水
            </Button>
          ) : null}
          {!showSqrwxls ? (
            <Button onClick={() => this.setState({ showSqrwxls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 申请人微信流水
            </Button>
          ) : null}
          {!showPoyhls ? (
            <Button onClick={() => this.setState({ showPoyhls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 配偶银行流水
            </Button>
          ) : null}
          {!showPozfbls ? (
            <Button onClick={() => this.setState({ showPozfbls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 配偶支付宝流水
            </Button>
          ) : null}
          {!showPowxls ? (
            <Button onClick={() => this.setState({ showPowxls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 配偶微信流水
            </Button>
          ) : null}
          {!showDbryhls ? (
            <Button onClick={() => this.setState({ showDbryhls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 担保人银行流水
            </Button>
          ) : null}
          {!showDbrzfbls ? (
            <Button onClick={() => this.setState({ showDbrzfbls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 担保人支付宝流水
            </Button>
          ) : null}
          {!showDbrwxls ? (
            <Button onClick={() => this.setState({ showDbrwxls: true })} style={{width: '100%', marginTop: 10}} type="dashed">
              <Icon type="plus" />新增 担保人微信流水
            </Button>
          ) : null}
          <Card style={{ marginTop: 16 }} title="流转日志">
            <Table {...this.getTableProps()} />
          </Card>
          <FormItem {...tailFormItemLayout} style={{marginTop: 20}}>
            <div>
              <Button type="primary" onClick={() => this.checkForm()}>保存</Button>
              <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
            </div>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default BankMoneyRecord;
