import React from 'react';
import { initStates, doFetching, cancelFetching, setSelectData, setPageData,
  restore } from '@redux/loan/admittance-addedit';
import { Form, Tabs, Row, Col, Spin, Button, Table, Card, Icon, Tooltip } from 'antd';
import moment from 'moment';
import CUpload from 'component/cUpload/cUpload';
import CO2M from 'component/cO2M/cO2M';
import CInput from 'component/cInput/cInput';
import CSelect from 'component/cSelect/cSelect';
import CCitySelect from 'component/cCitySelect/cCitySelect';
import CNormalTextArea from 'component/cNormalTextArea/cNormalTextArea';
import CMonth from 'component/cMonth/cMonth';
import CRangeDate from 'component/cRangeDate/cRangeDate';
import { tailFormItemLayout, DATE_FORMAT, MONTH_FORMAT, validateFieldsAndScrollOption } from 'common/js/config';
import {
  getQueryString, showWarnMsg, showSucMsg, isUndefined, getUserId, getRules,
  getRealValue, moneyFormat, moneyParse, getUserName, dateTimeFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { getDictList } from 'api/dict';
import { getQiniuToken } from 'api/general';
import {
  amountFields, rangeDateFields, sqryhls, sqrzfbls, sqrwxls,
  poyhls, pozfbls, powxls, dbryhls, dbrzfbls, dbrwxls
} from './config';
import { DetailWrapper } from 'common/js/build-detail';
import { listWrapper } from 'common/js/build-list';

const TabPane = Tabs.TabPane;
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
// 是否融资数据字典
const isFinancingData = [
  { k: '0', v: '否' },
  { k: '1', v: '是' }
];
// 是否安装GPS
const isGPSData = [
  { k: '0', v: '否' },
  { k: '1', v: '是' }
];
// 是否抵押
const isDYData = [
  { k: '0', v: '否' },
  { k: '1', v: '是' }
];
// 是否我司保
const isMyCompanyData = [
  { k: '0', v: '否' },
  { k: '1', v: '是' }
];
// 是否自己工作单位
const isCompanyData = [
  { k: '0', v: '否' },
  { k: '1', v: '是' }
];
// 有无驾照
const isDriverData = [
  { k: '0', v: '无' },
  { k: '1', v: '有' }
];
// 政治面貌
const politicalData = [
  { k: '1', v: '共青团员' },
  { k: '2', v: '党员' }
];
@DetailWrapper(
    state => state.loanAdmittanceAddedit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
@Form.create()
class AdmittanceAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.creditUserCode = '';// 征信人编号
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.b = !!getQueryString('b', this.props.location.search);
    this.bizType = getQueryString('bizType', this.props.location.search);
    this.loanBank = getQueryString('loanBank', this.props.location.search);
    // 万元系数
    this.wanFactor = 0;
    // 公证费比例
    this.authRate = 0;
    // gps费用
    this.gpsFee = 0;
    // 年利率
    this.yearRate = 0;
    // 前置利率
    this.preRate = 0;
    // 返点利率
    this.backRate = 0;
    this.state = {
      fetching: true,
      token: '',
      // 用于upload控件判断页面是否初始化完成
      isLoaded: false,
      // 贷款银行数据
      loanBankData: [],
      // 单位性质数据
      // 机动车销售公司
      carSaleData: [],
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
      carFrameData: [],
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
      // 共还人信息
      // 流转日志
      records: [],
      // 流水数据
      records2: [],
      // 所有节点（用于解析节点）
      dealNodeList: []
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(632036, { code: this.loanBank }), // 查贷款银行 计算银行利率
      fetch(632067, { curNodeCode: '006_03' }), // 查机动车销售公司
      fetch(632177, { status: '2', type: this.bizType, loanBank: this.loanBank }), // 查贷款产品
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
      getDictList({ parentKey: 'car_frame_price_count' }),
      getQiniuToken(),
      fetch(632146, { code: this.code })
    ]).then(([loanBankData, carSaleData, loanProductData, bizTypeData, loanPeriodData, regionData,
               carTypeData, genderData, marryStateData, educationData, addressData,
               relationData, industryData, propertyData, incomeData, positionData,
               professionData, interestData, carFrameData, uploadToken, pageData]) => {
      // console.log('单位性质：');
      // console.log(companyData);
      // 初始化万元系数、公证费比例、gps费用
      if (pageData.loanProductCode) { // 选择贷款产品后初始化
        let product = loanProductData.find(v => v.code === pageData.loanProductCode);
        if (product) {
          console.log(product);
          this.wanFactor = product.wanFactor || 0;
          this.authRate = product.authRate || 0;
          this.gpsFee = product.gpsFee || 0;
        }
      }
      this.setState({
        loanBankData,
        carSaleData,
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
        carFrameData,
        pageData,
        // showMate: (!!pageData.mateName || (pageData.marryState === '2' && this.view)),
        showMate: !!this.mateName,
        // showGua: !!pageData.guaName,
        showGua: !!this.guaName,
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
    fetch(630176, { refOrder: this.code }).then((records) => { // 流转日志接口
      this.setState({ records });
      // console.log('流转日志返回数据：');
      // console.log(records);
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
  // 获取城市选择框控件
  getCitySelectCol(item, list, split = 3) {
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
          <CCitySelect key={item.field} {...props} />
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
  // 审核时提交表单
  checkInfo = (approveResult) => {
    this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
      if (!err) {
        this.beforeSubmit(values);
        let bizCode = this.getBizCode();
        values.code = this.code;
        values.approveResult = approveResult; // 审核结果
        // values.approveNoteQUERY = approveNoteQUERY; // 审核意见
        values.operator = getUserId();
        this.setState({ fetching: true });
        fetch(bizCode, values).then((data) => {
          this.setState({ fetching: false });
          showSucMsg('操作成功');
          setTimeout(() => {
            this.props.history.go(-1);
          }, 1000);
        }).catch(() => this.setState({ fetching: false }));
      }
    });
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
    values.updater = values.updater || getUserName();
  }
  // 保存或提交表单前的校验
  checkForm = (dealType) => {
    // 保存无需校验表单
    if (dealType === 0) {
      let values = this.props.form.getFieldsValue();
      this.sendForm(values, dealType);
    }else {
      this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
        if (!err) {
          this.sendForm(values, dealType);
        }
      });
    }
  }
  // 保存或提交表单
  sendForm(values, dealType) {
    this.beforeSubmit(values);
    values.budgetOrderCode = this.code;
    values.dealType = dealType;
    values.operator = getUserId();
    values.creditCode = this.state.pageData.creditCode;
    values.applyUserName = this.state.pageData.applyUserName;
    values.bizType = this.state.pageData.bizType;
    values.idNo = this.state.pageData.idNo;
    this.setState({ fetching: true });
    fetch(632500, values).then(() => {
      showSucMsg('操作成功');
      this.setState({ fetching: false });
      // 如果是提交，则返回上一页；否则停留在当前页
      // if (dealType === 1) {
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
      // }
    }).catch(() => {
      this.setState({ fetching: false });
    });
  }
  // 贷款期限改变 计算银行利率
  loanPeriodChange = (code) => {
          let bankRates = '';
          if (code === '12') {
             bankRates = this.state.loanBankData.rate12 / 1000;
          }else if (code === '24') {
             bankRates = this.state.loanBankData.rate24 / 1000;
          }else if (code === '36') {
             bankRates = this.state.loanBankData.rate36 / 1000;
          }
          this.props.form.setFieldsValue({
            bankRate: bankRates
          });
          // console.log(code, this.state.loanBankData);
  }
  // 贷款产品改变
  loanProductChange = (code) => {
    // 万元系数：wanFactor；公证费比例：authRate；GPS费用：gpsFee
    // 团队服务费teamFee、其它费用otherFee手填
    // 月供保证金=万元系数*贷款额/10000；monthDeposit
    // 公证费=贷款额*公证费比例；authFee
    // GPS费用=GPS费用；gpsFee
    // 月供保证金、团队服务费、GPS费用、公证费、其他费用
    let loanProductList = this.state.loanProductData;
    if (code) {
      console.log(code);
      let product = loanProductList.find((item) => {
        return item.code === code;
      });
      console.log(product);
      this.wanFactor = product.wanFactor || 0; // 万元系数
      this.authRate = product.authRate || 0; // 公证费比例
      this.gpsFee = product.gpsFee || 0; // GPS费用
      this.yearRate = product.yearRate || 0; // 年化费率
      let loanAmount = this.props.form.getFieldValue('loanAmount'); // 获取贷款金额的值
      if (loanAmount) {
        console.log('moneyFormat格式化：除以1000，保留两位小数');
        // console.log(moneyFormat(1000));
        console.log('moneyParse格式化：乘以1000');
        // console.log(moneyParse(1000));
        console.log(this.preRate);
        this.props.form.setFieldsValue({ // 设置表单值
          monthDeposit: moneyFormat((this.wanFactor * moneyParse(loanAmount)) / 10000000),
          authFee: moneyFormat(this.authRate * moneyParse(loanAmount)),
          gpsFee: moneyFormat(this.gpsFee),
          teamFee: '',
          otherFee: '',
          yearRate: this.yearRate,
          preRate: this.preRate,
          backRate: this.backRate
        });
      }
    } else {
      this.wanFactor = 0;
      this.authRate = 0;
      this.gpsFee = 0;
      this.yearRate = 0;
      this.props.form.setFieldsValue({
        monthDeposit: '',
        authFee: '',
        gpsFee: '',
        teamFee: '',
        otherFee: '',
        yearRate: '',
        preRate: '',
        backRate: ''
      });
    }
  }
  // 开票价格改变
  // 首付比例=首付金额/开票价格
  invoicePriceChange = (v, data) => {
     console.log(v);
    let firstAmount = this.props.form.getFieldValue('firstAmount');
    let loanAmount = this.props.form.getFieldValue('loanAmount');
    v = +moneyParse(v);
    console.log(v);
    // 如果已有首付金额，则改变贷款金额
    if (firstAmount) {
      firstAmount = +moneyParse(firstAmount);
      loanAmount = moneyFormat(v - firstAmount);
      this.props.form.setFieldsValue({
        loanAmount,
        firstRate: (firstAmount / v * 100).toFixed(2),
        monthDeposit: moneyFormat((this.wanFactor * moneyParse(loanAmount)) / 10000000),
        authFee: moneyFormat(this.authRate * moneyParse(loanAmount))
      });
    }
  }
  // 首付金额改变
  firstAmountChange = (v) => {
    let invoicePrice = this.props.form.getFieldValue('invoicePrice');// 开票价格
    let loanAmount = this.props.form.getFieldValue('loanAmount');// 贷款金额
    v = +moneyParse(v);
    if (invoicePrice) {
      invoicePrice = +moneyParse(invoicePrice);
      loanAmount = moneyFormat(invoicePrice - v);
      this.props.form.setFieldsValue({
        loanAmount,
        firstRate: (v / invoicePrice * 100).toFixed(2),
        monthDeposit: moneyFormat((this.wanFactor * moneyParse(loanAmount)) / 10000000),
        authFee: moneyFormat(this.authRate * moneyParse(loanAmount))
      });
    }
  }
  // 贷款金额改变
  loanAmountChange = (v) => {
    let invoicePrice = this.props.form.getFieldValue('invoicePrice');
    // 如果有发票价格了，则改变首付金额
    if (invoicePrice) {
      invoicePrice = +moneyParse(invoicePrice);
      let firstAmount = moneyFormat(invoicePrice - v);
      this.props.form.setFieldsValue({
        firstAmount,
        firstRate: (moneyParse(firstAmount) / invoicePrice).toFixed(2),
        monthDeposit: moneyFormat((this.wanFactor * v) / 10000000),
        authFee: moneyFormat(this.authRate * v)
      });
    }
  }
  // 主要收入来源改变
  mainChange = (v) => {
    if (v.includes('4')) {
      this.setState({ isSelfCompany: true });
    } else {
      this.setState({ isSelfCompany: false });
      this.props.form.setFieldsValue({
        selfCompanyArea: '',
        employeeQuantity: '',
        enterpriseMonthOutput: ''
      });
    }
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
  // 婚姻情况改变
  marryChange = (v) => {
    this.setState({
      isMarried: v === '2',
      showMarry: v === '2' || v === '3'
    });
    if (v === '2' && !this.state.showMate) {
      this.setState({ showMate: true });
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
            {this.getRangeDateCol({ field: fields[0], title: '流水时间', onChange: (dates) => this.jourDatetimeChange(dates, fields[7], fields[8], fields[10], fields[11]), type: 'date', rangedate: [fields[1], fields[2]] }, 1)}
          </Row>
          <Row gutter={54}>
            {this.getSelectCol({ field: fields[3], title: '结息时间1' }, interestData, 2)}
            {this.getSelectCol({ field: fields[4], title: '结息时间2' }, interestData, 2)}
          </Row>
          <Row gutter={54}>
            {this.getInputCol({ field: fields[5], title: '结息1(元)', amount: true }, 2)}
            {this.getInputCol({ field: fields[6], title: '结息2(元)', amount: true }, 2)}
          </Row>
          <Row gutter={54}>
            {this.getInputCol({ field: fields[7], title: '总收入(元)', onChange: (v) => this.moneyChange(v, fields[0], fields[10]), amount: true }, 2)}
            {this.getInputCol({ field: fields[8], title: '总支出(元)', onChange: (v) => this.moneyChange(v, fields[0], fields[11]), amount: true }, 2)}
          </Row>
          <Row gutter={54}>
            {this.getInputCol({ field: fields[9], title: '账户余额(元)', amount: true })}
            {this.getInputCol({ field: fields[10], title: '月均收入(元)', amount: true })}
            {this.getInputCol({ field: fields[11], title: '月均支出(元)', amount: true }, 33)}
          </Row>
          <Row gutter={54}>
            {this.getNormalTextAreaCol({ field: fields[12], title: '流水说明' }, 1)}
          </Row>
          <Row gutter={54}>
            {this.getFileCol({ field: fields[13], title: title, type: 'img' }, 1)}
          </Row>
        </Card>
    );
  }
  // 返回
  onCancel = () => this.props.history.go(-1)
  // 当前是否时审核环节
  isCheck() {
    return this.isCheckCommissioner || this.isCheckDirector ||
        this.isCheckRegionalManager || this.isCheckNq ||
        this.checkCommissionerTwo || this.isbusinessCheck;
  }
  // 获取控件readonly的值
  isReadonly(item) {
    // 家访照片、车辆价格核实报告在二审时可修改，特殊处理
    if (this.checkCommissionerTwo && (item.field === 'housePicture' ||
        item.field === 'carPriceCheckReport')) {
      return false;
    }
    return isUndefined(item.readonly) ? this.view || this.isCheck() : item.readonly;
  }

  render() {
    const {
      carSaleData, loanBankData, bizTypeData, loanPeriodData, loanProductData, regionData, carTypeData,
      genderData, marryStateData, educationData, addressData, relationData,
      industryData, propertyData, incomeData, positionData, professionData,
      carFrameData, showMate, showGua, showSqryhls, showSqrzfbls, showSqrwxls,
      showPoyhls, showPozfbls, showPowxls, showDbryhls, showDbrzfbls,
      showDbrwxls, pageData, isMarried, showMarry
    } = this.state;
    let readonly = false;
    let fields = [{
      title: '流水信息',
      field: 'list',
      type: 'o2m',
      readonly: false,
      options: {
        add: true,
        edit: true,
        delete: true,
        fields: [{
          title: '征信人',
          field: 'creditUserCode'
        },
        {
          title: '分类',
          field: 'type',
          type: 'select',
          data: [{
            key: '1',
            value: '支付宝'
          }, {
            key: '2',
            value: '微信'
          }, {
            key: '3',
            value: '银行'
          }],
          keyName: 'key',
          valueName: 'value'
        },
          {
          title: '流水日期区间',
          field: 'endDatetime',
          rangedate: ['datetimeStart', 'datetimeEnd'],
          type: 'date',
          render: dateTimeFormat,
          hidden: true
        }, {
          title: '流水时间起',
          field: 'datetimeStart',
          type: 'date',
          render: dateTimeFormat,
          noVisible: true
        }, {
          title: '流水时间止',
          field: 'datetimeEnd',
          type: 'date',
          render: dateTimeFormat,
          noVisible: true
        }, {
          title: '结息时间1',
          field: 'jourInterest1',
          type: 'date',
          render: dateTimeFormat,
          noVisible: true
        }, {
          title: '结息时间2',
          field: 'jourInterest2',
          type: 'date',
          render: dateTimeFormat,
          noVisible: true
        }, {
            title: '结息1(元)',
            field: 'interest1',
            noVisible: true
          }, {
            title: '结息2(元)',
            field: 'interest2',
            noVisible: true
          }, {
          title: '总收入(元)',
          field: 'income'
        }, {
          title: '总支出(元)',
          field: 'expend'
        }, {
          title: '余额(元)',
          field: 'balance'
        }, {
          title: '月均收入(元)',
          field: 'monthIncome'
        }, {
          title: '月均支出(元)',
          field: 'monthExpend'
        }, {
          title: '流水说明',
          field: 'remark',
            noVisible: true
        }, {
            title: '流水图片',
            field: 'pic',
            type: 'img',
            noVisible: true
        }]
      }
    }];
    return (
        <Spin spinning={this.state.fetching}>
          <Form>
            <Tabs defaultActiveKey="1">
              <TabPane tab="贷款信息" key="1">
                <Card style={{ marginTop: 16 }} title="贷款信息">
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'loanBankName',
                      title: '贷款银行',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      readonly: true,
                      required: true }, 4)}
                    {this.getSelectCol({ field: 'loanPeriod',
                      title: '贷款期限',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      onChange: this.loanPeriodChange
                      // formatter(v, d) {
                      //   return d.repayBiz ? d.repayBiz.periods : '';
                      // }
                    }, loanPeriodData, 4)}
                    {this.getInputCol({ field: 'bankRate',
                      title: '银行利率(%)',
                      readonly: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({ field: 'loanAmount', title: '贷款金额(元)', onChange: this.loanAmountChange, amount: true, required: true }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'loanProductCode',
                      title: '贷款产品',
                      keyName: 'code',
                      valueName: 'name',
                      onChange: this.loanProductChange,
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.repayBiz.loanProductName : '';
                      }
                    }, loanProductData, 4)}
                    {this.getInputCol({ field: 'yearRate',
                      title: '年化费率(%)',
                      required: true
                    //   formatter: (v, d) => {
                    //   return d ? d.repayBiz.loanProductName : '';
                    // }
                      }, 4)}
                    {this.getInputCol({ field: 'gpsFee',
                      title: 'GPS费用(元)',
                      amount: true,
                      required: true,
                      formatter: (v, d) => {
                        return d.carInfo ? d.carInfo.gpsFee : '';
                      }
                      }, 4)}
                    {this.getInputCol({ field: 'authFee',
                      title: '公证费用(元)',
                      amount: true,
                      required: true,
                      formatter: (v, d) => {
                        return d.carInfo ? d.carInfo.authFee : '';
                      }}, 4)}
                   </Row>
                <Row gutter={54}>
                  {this.getInputCol({ field: 'backRate', title: '返点利率', required: true }, 4)}
                  {this.getInputCol({ field: 'preRate', title: '前置利率', required: true }, 4)}
                  {this.getInputCol({ field: 'invoicePrice',
                    title: '开票价格(元)',
                    required: true,
                    // formatter: (v, d) => {
                    // let invoicePrice = d.carInfo.invoicePrice / 1000;
                    //   return d ? invoicePrice : '';
                    // },
                    onChange: this.invoicePriceChange
                  }, 4)}
                  {this.getInputCol({ field: 'firstAmount',
                    title: '首付金额(元)',
                    onChange: this.firstAmountChange,
                    amount: true,
                    required: true,
                    formatter: (v, d) => {
                    let sfAmount = d.repayBiz.sfAmount / 1000;
                      return d.repayBiz ? sfAmount : '';
                    }}, 4)}
                </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'firstRate',
                      title: '首付比例(%)',
                      required: true,
                      formatter: (v, d) => {
                        let sfRate = d.repayBiz.sfRate;
                        return d.repayBiz ? sfRate : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'firstRepayAmount',
                      title: '首月月供(元)',
                      amount: true,
                      required: true,
                      formatter: (v, d) => {
                        let firstRepayAmount = d.repayBiz.firstRepayAmount;
                        return d.repayBiz ? firstRepayAmount : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'monthAmount',
                      title: '月供金额(元)',
                      amount: true,
                      required: true,
                      formatter: (v, d) => {
                        let monthAmount = d.repayBiz.monthAmount;
                        return d.repayBiz ? monthAmount : '';
                      }}, 4)}
                    {this.getSelectCol({ field: 'isAdvanceFund', title: '是否垫资', keyName: 'k', valueName: 'v', required: true }, isAdvFundData, 4)}
                     </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'isFinancing',
                      title: '是否融资',
                      keyName: 'k',
                      valueName: 'v',
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.isFinacing : '';
                      }}, isFinancingData, 4)}
                    {this.getSelectCol({ field: 'isAzGps',
                      title: '是否安装GPS',
                      keyName: 'k',
                      valueName: 'v',
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.isGpsAz : '';
                      }}, isGPSData, 4)}
                    {this.getSelectCol({ field: 'isDY',
                      title: '是否抵押',
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                      }, isDYData, 4)}
                    {this.getSelectCol({ field: 'isMyCompany',
                      title: '是否我司保',
                      keyName: 'k',
                      valueName: 'v',
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.isGpsAz : '';
                      }}, isMyCompanyData, 4)}
                     </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'monthDeposit',
                      title: '月供保证金(元)',
                      amount: true,
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.carInfo.monthDeposit : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'lyDeposit',
                      title: '履约保证金(元)',
                      amount: true,
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.repayBiz.lyDeposit : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'teamFee',
                      title: '团队服务费(元)',
                      amount: true,
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.carInfo.teamFee : '';
                      }
                    }, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="车辆信息" key="2">
                <Card title="车辆信息">
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'bizType',
                      title: '业务种类',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      readonly: true }, bizTypeData, 4)}
                    {this.getSelectCol({ field: 'vehicleCompanyName',
                      title: '机动车销售公司',
                      required: true,
                      keyName: 'code',
                      valueName: 'abbrName',
                      type: 'select',
                      formatter: (v, d) => {
                        return d ? d.carInfo.vehicleCompanyName : '';
                      }}, carSaleData, 4)}
                    {this.getInputCol({ field: 'invoiceCompany',
                      title: '开票单位',
                      required: true,
                      formatter: (v, d) => {
                      return d ? d.carInfo.invoiceCompany : '';
                    }
                    }, 4)}
                    {this.getSelectCol({ field: 'carType',
                      title: '车辆类型',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.carInfo.carType : '';
                      }
                    }, carTypeData, 4)}
                  </Row>
                    <Row gutter={54}>
                      {this.getInputCol({ field: 'carBrand',
                        title: '车辆品牌',
                        required: true,
                        formatter: (v, d) => {
                          return d ? d.carInfo.carBrand : '';
                        }
                      }, 4)}
                      {this.getInputCol({ field: 'carSeries',
                        title: '车辆车系',
                        required: true,
                        formatter: (v, d) => {
                          return d ? d.carInfo.carSeries : '';
                        }}, 4)}
                      {this.getInputCol({ field: 'carModel',
                        title: '车辆型号',
                        required: true,
                        formatter: (v, d) => {
                          return d ? d.carInfo.carModel : '';
                        }}, 4)}
                      {this.getInputCol({ field: 'carModelName',
                        title: '车型名称',
                        required: true,
                        formatter: (v, d) => {
                          return d ? d.carInfo.carModelName : '';
                        }
                      }, 4)}
                    </Row>
                    <Row gutter={54}>
                      {this.getInputCol({ field: 'carColor',
                        title: '车辆颜色',
                        required: true,
                        formatter: (v, d) => {
                          return d ? d.carInfo.carColor : '';
                        }}, 4)}
                      {this.getInputCol({ field: 'carFrameNo',
                        title: '车架号',
                        required: true,
                        formatter: (v, d) => {
                          return d ? d.carInfo.carFrameNo : '';
                        }}, 4)}
                      {this.getInputCol({ field: 'carEngineNo',
                        title: '发动机号',
                        required: true,
                        formatter: (v, d) => {
                          return d ? d.carInfo.carEngineNo : '';
                        }}, 4)}
                      {this.getInputCol({ field: 'originalPrice',
                        title: '市场指导价(元)',
                        amount: true,
                        required: true
                        // formatter: (v, d) => {
                        //   let originalPrice = d.carInfo.originalPrice / 1000;
                        //   return d ? originalPrice : '';
                        // }
                        }, 4)}
                    </Row>
                    <Row gutter={54}>
                      {this.getSelectCol({ field: 'region',
                        title: '所属区域',
                        keyName: 'dkey',
                        valueName: 'dvalue',
                        required: true,
                        formatter: (v, d) => {
                          return d.carInfo ? d.carInfo.region : '';
                        }}, regionData, 4)}
                      {this.getInputCol({ field: 'carDealerSubsidy',
                        title: '厂家贴息(元)',
                        required: true,
                        amount: true,
                        formatter: (v, d) => {
                          return d.carInfo ? d.carInfo.carDealerSubsidy : '';
                        }}, 4)}
                      {this.getInputCol({ field: 'oilSubsidyKil',
                        title: '油补公里数',
                        amount: true,
                        required: true,
                        formatter: (v, d) => {
                          return d.carInfo ? d.carInfo.oilSubsidyKil : '';
                        }}, 4)}
                      {this.getInputCol({ field: 'oilSubsidy',
                        title: '油补(元)',
                        required: true,
                        formatter: (v, d) => {
                          return d.carInfo ? d.carInfo.oilSubsidy : '';
                        }}, 4)}
                       </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'pledgeUser',
                      title: '抵押代理人',
                      required: true,
                      formatter: (v, d) => {
                        return d.carInfo ? d.carPledge.pledgeUser : '';
                      }
                      }, 4)}
                    {this.getInputCol({ field: 'pledgeAddress',
                      title: '抵押地点',
                      required: true }, 4)}
                    {this.getInputCol({ field: 'settleAddress',
                      title: '落户地点',
                      required: true,
                      formatter: (v, d) => {
                        return d ? d.carInfo.settleAddress : '';
                      }}, 4)}
                    {this.getFileCol({ field: 'carPic',
                      title: '车辆照片',
                      type: 'img',
                      required: true,
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '车照片') {
                            url = item.url;
                          }
                        });
                        return url;
                      }}, 3)}
                    {this.getFileCol({ field: 'carHgzPic',
                      title: this.bizType === '1' ? '绿大本' : '合格证照片',
                      type: 'img',
                      required: true,
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '合格证') {
                            url = item.url;
                          }
                        });
                        return url;
                      }}, 3)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="客户信息" key="3">
                <Card style={{ marginTop: 16 }} title="主贷人基本信息">
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'applyUserName',
                      title: '姓名',
                      readonly: true,
                      formatter(v, d) {
                        let userName = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            userName = item.userName;
                            // this.creditUserCode = item.code;
                          }
                        });
                        return userName;
                      }
                    }, 4)}
                    {this.getInputCol({ field: 'mobile',
                      title: '联系电话',
                      mobile: true,
                      required: true,
                      readonly: true,
                      formatter(v, d) {
                        let mobile = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            mobile = item.mobile;
                          }
                        });
                        return mobile;
                      }
                    }, 4)}
                    {this.getInputCol({ field: 'idNo',
                      title: '身份证号',
                      readonly: true,
                      formatter(v, d) {
                        let idNo = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            idNo = item.idNo;
                          }
                        });
                        return idNo;
                      }
                    }, 4)}
                    {this.getSelectCol({ field: 'gender',
                      title: '性别',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      formatter(v, d) {
                      return d ? d.creditUserExt.gender : '';
                       }
                    }, genderData, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'age',
                      title: '年龄',
                      number: true,
                      positive: true,
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.age : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'nation',
                      title: '民族',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.nation : '';
                      }}, 4)}
                    {this.getSelectCol({ field: 'political',
                      title: '政治面貌',
                      keyName: 'k',
                      valueName: 'v',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.political : '';
                      }}, politicalData, 4)}
                    {this.getSelectCol({ field: 'education',
                      title: '学历',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      formatter(v, d) {
                        let eduction = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            eduction = item.eduction;
                          }
                        });
                        return eduction;
                      }
                    }, educationData, 4)}
                 </Row>
                  <Row gutter={54}>
                  {this.getSelectCol({ field: 'workProfession',
                    title: '职业',
                    keyName: 'dkey',
                    valueName: 'dvalue',
                    formatter(v, d) {
                      return d ? d.creditUserExt.workProfession : '';
                    }
                  }, professionData, 4)}
                  {this.getInputCol({ field: 'postTitle',
                    title: '职称',
                    formatter(v, d) {
                      return d ? d.creditUserExt.postTitle : '';
                    }
                  }, 4)}
                  {this.getSelectCol({ field: 'isDriceLicense',
                    title: '有无驾照',
                    keyName: 'k',
                    valueName: 'v',
                    formatter(v, d) {
                      return d ? d.creditUserExt.isDriceLicense : '';
                    }}, isDriverData, 4)}
                  {this.getInputCol({ field: 'carTypeNow',
                    title: '现有车辆',
                    formatter(v, d) {
                      return d.creditUserExt ? d.creditUserExt.carType : '';
                    }
                  }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'mainIncome',
                      title: '主要收入来源',
                      onChange: this.mainChange,
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      multiple: true,
                      required: true
                      // formatter(v, d) {
                      //     return d ? d.creditUserExt.mainIncome : '';
                      //   }
                        }, incomeData, 4)}
                   </Row>
                </Card>
                <Card style={{ marginTop: 16 }} title="紧急联系人">
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'emergencyName1',
                      title: '联系人1姓名',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.emergencyName1 : '';
                      }}, 4)}
                    {this.getSelectCol({ field: 'emergencyRelation1',
                      title: '与申请人关系',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.emergencyRelation1 : '';
                      }}, relationData, 4)}
                    {this.getInputCol({ field: 'emergencyMobile1',
                      title: '手机号码',
                      mobile: true,
                      required: true,
                          formatter(v, d) {
                      return d ? d.creditUserExt.emergencyMobile1 : '';
                    }}, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'emergencyName2',
                      title: '联系人2姓名',
                      formatter(v, d) {
                        return d ? d.creditUserExt.emergencyName1 : '';
                      }}, 4)}
                    {this.getSelectCol({ field: 'emergencyRelation2',
                      title: '与申请人关系',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      formatter(v, d) {
                        return d ? d.creditUserExt.emergencyRelation2 : '';
                      }}, relationData, 4)}
                    {this.getInputCol({ field: 'emergencyMobile2',
                      title: '手机号码',
                      mobile: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.emergencyMobile2 : '';
                      }}, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="家庭情况" key="4">
                <Card title="家庭情况">
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'marryState',
                      title: '婚姻状况',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      onChange: this.marryChange,
                      formatter(v, d) {
                        return d ? d.creditUserExt.marryState : '';
                      }}, marryStateData, 4)}
                    {this.getInputCol({ field: 'familyNumber',
                      title: '家庭人口',
                      required: true,
                      'Z+': true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.familyNumber : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'familyPhone',
                      title: '家庭电话',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.familyPhone : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'familyMainAsset',
                      title: '家庭主要财产(元)',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.familyMainAsset : '';
                      }}, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'mainAssetInclude',
                      title: '家庭主要财产说明',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.mainAssetInclude : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'residenceAddress',
                      title: '户籍地',
                      required: true,
                      formatter(v, d) {
                        let birthAddress = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            birthAddress = item.birthAddress;
                          }
                        });
                        return birthAddress;
                      }
                      }, 4)}
                    {this.getInputCol({ field: 'postCode2',
                      title: '户籍地邮编',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.postCode : '';
                      }}, 4)}
                    {this.getInputCol({ field: 'nowAddress',
                      title: '现居住地址 ',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.nowAddress : '';
                      }}, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'postCode',
                      title: '现居住地邮编',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.postCode : '';
                      }}, 4)}
                    {this.getFileCol({ field: 'hkBookPdf',
                      title: '户口本',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '申请人户口本') {
                            url = item.url;
                          }
                        });
                        return url;
                      }}, 4)}
                    {this.getFileCol({ field: 'houseContract',
                      title: '购房合同及房产本',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '购房合同') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                    {this.getFileCol({ field: 'houseInvoice',
                      title: '购房发票',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '购房发票') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({ field: 'liveProvePdf',
                      title: '居住证明',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '居住证明') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                    {this.getFileCol({ field: 'buildProvePdf',
                      title: '自建房证明',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '自建房证明') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                    {this.getFileCol({ field: 'housePictureApply',
                      title: '家访照片',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '申请人家访照片') {
                            url = item.url;
                          }
                        });
                        return url;
                      }}, 4)}
                    {this.getFileCol({ field: 'marryPdf',
                      title: isMarried ? '结婚证' : '离婚证',
                      type: 'img',
                      hidden: !showMarry,
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '结婚证资料') {
                            url = item.url;
                          }
                        });
                        return url;
                      }}, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="工作情况" key="5">
                <Card style={{ marginTop: 16 }} title="工作情况">
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'isSelfCompany',
                      title: '是否自己工作单位',
                      keyName: 'k',
                      valueName: 'v',
                      required: true,
                      formatter(v, d) {
                      return d ? d.creditUserExt.isSiteProve : '';
                    }
                    }, isCompanyData, 4)}
                    {this.getSelectCol({ field: 'workBelongIndustry',
                      title: '所属行业',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.workBelongIndustry : '';
                      }}, industryData, 4)}
                    {this.getSelectCol({ field: 'workCompanyProperty',
                      title: '单位经济性质',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      formatter(v, d) {
                        return d ? d.creditUserExt.workCompanyProperty : '';
                      }}, propertyData, 4)}
                    {this.getInputCol({ field: 'workCompanyName',
                      title: '工作单位名称',
                      required: true,
                      formatter(v, d) {
                        let companyName = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            companyName = item.companyName;
                          }
                        });
                        return companyName;
                      }}, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'workPhone',
                      title: '工作单位电话',
                      required: true,
                      formatter(v, d) {
                        let companyContactNo = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            companyContactNo = item.companyContactNo;
                          }
                        });
                        return companyContactNo;
                      }}, 4)}
                    {this.getInputCol({ field: 'workCompanyAddress',
                      title: '工作单位地址',
                      required: true,
                      formatter(v, d) {
                        let companyAddress = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '1') {
                            companyAddress = item.companyAddress;
                          }
                        });
                        return companyAddress;
                      }}, 4)}
                    {this.getMonthCol({ field: 'workDatetime',
                      title: '何时进入该单位',
                      type: 'date',
                      required: true
                      // formatter(v, d) {
                      //   return d.creditUserExt ? d.creditUserExt.workDatetime : '';
                      // }
                      }, 4)}
                    {this.getSelectCol({ field: 'position',
                      title: '职务',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      formatter(v, d) {
                        return d.creditUserExt ? d.creditUserExt.position : '';
                      }}, positionData, 4)}
                     </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'monthIncome',
                      title: '月收入(元)',
                      amount: true,
                      required: true,
                      formatter(v, d) {
                      let monthIncome = d.creditUserExt.monthIncome / 1000;
                        return d.creditUserExt ? monthIncome : '';
                      }
                    }, 4)}
                    {this.getNormalTextAreaCol({ field: 'otherWorkNote',
                      title: '工作描述及还款来源分析',
                      formatter(v, d) {
                        return d.creditUserExt ? d.creditUserExt.otherWorkNote : '';
                      }
                    }, 2)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({ field: 'improvePdf',
                      title: '收入证明',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '收入证明') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                    {this.getFileCol({ field: 'frontTablePic',
                      title: '单位前台照片',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '单位前台照片') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                    {this.getFileCol({ field: 'workPlacePic',
                      title: '办公场地照片',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '单位场地照片') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                    {this.getFileCol({ field: 'salerAndcustomer',
                      title: '签约员与客户合影',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '业务员与客户合影') {
                            url = item.url;
                          }
                        });
                        return url;
                      }
                    }, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="共还人信息" key="6">
                <Card style={{ marginTop: 16 }} title="共还人信息">
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'mateName',
                      title: '姓名',
                      required: true,
                      readonly: true,
                      formatter(v, d) {
                        let userName = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            userName = item.userName;
                          }
                        });
                        return userName;
                      }}, 4)}
                    {this.getSelectCol({ field: 'relation',
                      title: '与主贷人关系',
                      required: true,
                      readonly: true,
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      formatter(v, d) {
                        let relation = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            relation = item.relation;
                          }
                        });
                        return relation;
                      }
                      }, relationData, 4)}
                    {this.getInputCol({ field: 'mateMobile',
                      title: '手机号',
                      mobile: true,
                      required: true,
                      readonly: true,
                      formatter(v, d) {
                        let mobile = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            mobile = item.mobile;
                          }
                        });
                        return mobile;
                      }
                    }, 4)}
                    {this.getInputCol({ field: 'mateIdNo',
                      title: '身份证号',
                      idCard: true,
                      readonly: true,
                      required: true,
                      formatter(v, d) {
                        let idNo = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            idNo = item.idNo;
                          }
                        });
                        return idNo;
                      }
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'mateEducation',
                      title: '学历',
                      required: true,
                      formatter(v, d) {
                        let mateEducation = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            mateEducation = item.Education;
                          }
                        });
                        return mateEducation;
                      }
                    }, educationData, 4)}
                    {this.getInputCol({ field: 'mateBirthAddressProvince',
                      title: '户籍地(省)',
                      required: true,
                      formatter(v, d) {
                        let birthAddressProvince = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            birthAddressProvince = item.birthAddressProvince;
                          }
                        });
                        return birthAddressProvince;
                      }
                    }, 4)}
                    {this.getInputCol({ field: 'mateBirthAddressCity',
                      title: '(市)',
                      required: true,
                      formatter(v, d) {
                        let birthAddressCity = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            birthAddressCity = item.birthAddressCity;
                          }
                        });
                        return birthAddressCity;
                      }}, 4)}
                    {this.getInputCol({ field: 'mateBirthAddressArea',
                      title: '(区)',
                      required: true,
                      formatter(v, d) {
                        let birthAddressArea = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            birthAddressArea = item.birthAddressArea;
                          }
                        });
                        return birthAddressArea;
                      }}, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'mateDetailAddress',
                    title: '  详细地址',
                    required: true}, 4)}
                    {this.getInputCol({ field: 'matePostCode',
                      title: '户籍地邮编',
                      required: true,
                      formatter(v, d) {
                        let postCode = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            postCode = item.postCode;
                          }
                        });
                        return postCode;
                      }}, 4)}
                    {this.getInputCol({ field: 'mateCompanyName',
                      title: '工作单位名称',
                      required: true,
                      formatter(v, d) {
                        let companyName = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            companyName = item.companyName;
                          }
                        });
                        return companyName;
                      }}, 4)}
                    {this.getInputCol({ field: 'mateCompanyAddress',
                      title: '工作单位地址',
                      required: true,
                      formatter(v, d) {
                        let companyAddress = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            companyAddress = item.companyAddress;
                          }
                        });
                        return companyAddress;
                      }}, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'mateCompanyContactNo',
                      title: '工作单位电话',
                      required: true,
                      formatter(v, d) {
                        let companyContactNo = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '2') {
                            companyContactNo = item.companyContactNo;
                          }
                        });
                        return companyContactNo;
                      }}, 4)}
                    {this.getFileCol({ field: 'mateAssetPdf',
                      title: '其他资料',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '共还人资产资料') {
                            url = item.url;
                          }
                        });
                        return url;
                      }}, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="担保人信息" key="7">
                <Card style={{ marginTop: 16 }} title="担保人信息">
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'userName',
                      title: '姓名',
                      required: true,
                      readonly: true,
                      formatter(v, d) {
                        let userName = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            userName = item.userName;
                          }
                        });
                        return userName;
                      }
                    }, 4)}
                    {this.getSelectCol({ field: 'relation',
                      title: '与主贷人关系',
                      required: true,
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      readonly: true,
                      formatter(v, d) {
                        let relation = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            relation = item.relation;
                          }
                        });
                        return relation;
                      }
                    }, relationData, 4)}
                    {this.getInputCol({ field: 'guaMobile',
                      title: '手机号',
                      mobile: true,
                      readonly: true,
                      required: true,
                      formatter(v, d) {
                        let mobile = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            mobile = item.mobile;
                          }
                        });
                        return mobile;
                      }}, 4)}
                    {this.getInputCol({ field: 'guaIdNo',
                      title: '身份证号',
                      idCard: true,
                      required: true,
                      readonly: true,
                      formatter(v, d) {
                        let idNo = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            idNo = item.idNo;
                          }
                        });
                        return idNo;
                      }}, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({ field: 'guaEducation',
                      title: '学历',
                      required: true,
                      formatter(v, d) {
                        let education = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            education = item.education;
                          }
                        });
                        return education;
                      }}, educationData, 4)}
                    {this.getInputCol({ field: 'guaBirthAddressProvince',
                      title: '户籍地(省)',
                      formatter(v, d) {
                        let birthAddressProvince = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            birthAddressProvince = item.birthAddressProvince;
                          }
                        });
                        return birthAddressProvince;
                      },
                      required: true }, 4)}
                    {this.getInputCol({ field: 'guaBirthAddressCity',
                      title: '(市)',
                      formatter(v, d) {
                        let birthAddressCity = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            birthAddressCity = item.birthAddressCity;
                          }
                        });
                        return birthAddressCity;
                      },
                      required: true }, 4)}
                    {this.getInputCol({ field: 'guaBirthAddressArea',
                      title: '(区)',
                      formatter(v, d) {
                        let birthAddressArea = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            birthAddressArea = item.birthAddressArea;
                          }
                        });
                        return birthAddressArea;
                      },
                      required: true }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'guaDetailAddress',
                      title: '  详细地址',
                      required: true}, 4)}
                    {this.getInputCol({ field: 'guaPostCode',
                      title: '户籍地邮编',
                      required: true,
                      formatter(v, d) {
                        let postCode = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            postCode = item.postCode;
                          }
                        });
                        return postCode;
                      }}, 4)}
                    {this.getInputCol({ field: 'guaCompanyName',
                      title: '工作单位名称',
                      formatter(v, d) {
                        let companyName = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            companyName = item.companyName;
                          }
                        });
                        return companyName;
                      },
                      required: true }, 4)}
                    {this.getInputCol({ field: 'guaCompanyAddress',
                      title: '工作单位地址',
                      formatter(v, d) {
                        let companyAddress = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            companyAddress = item.companyAddress;
                          }
                        });
                        return companyAddress;
                      },
                      required: true }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({ field: 'guaCompanyContactNo',
                      title: '工作单位电话',
                      formatter(v, d) {
                        let companyContactNo = '';
                        d.creditUserList.forEach(item => {
                          if(item.loanRole == '3') {
                            companyContactNo = item.companyContactNo;
                          }
                        });
                        return companyContactNo;
                      },
                      required: true }, 4)}
                    {this.getFileCol({ field: 'mateAssetPdf',
                      title: '其他资料',
                      type: 'img',
                      formatter(v, d) {
                        let url = '';
                        d.attachments.forEach(item => {
                          if(item.vname == '担保人其他资料') {
                            url = item.url;
                          }
                        });
                        return url;
                      }}, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="流水信息" key="8" className='liushui'>
                  {
                    this.props.buildDetail({
                      fields,
                      code: this.code,
                      view: this.view,
                      detailCode: 632497
                    })
                  }
              </TabPane>
            </Tabs>
            <FormItem {...tailFormItemLayout} style={{marginTop: 20}}>
                 <div>
                    <Button style={{marginLeft: 20}} type="primary" onClick={() => this.checkForm(0)}>保存</Button>
                    <Button style={{marginLeft: 20}} type="primary" onClick={() => this.checkForm(1)}>提交</Button>
                    <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
                  </div>
            </FormItem>
          </Form>
        </Spin>
    );
  }
}

export default AdmittanceAddEdit;
