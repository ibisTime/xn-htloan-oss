import React from 'react';
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
  poyhls, pozfbls, powxls, dbryhls, dbrzfbls, dbrwxls, checkFieldsMap
} from './config';
import { DetailWrapper } from 'common/js/build-detail';
import { listWrapper } from 'common/js/build-list';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const col1Props = { xs: 32, sm: 24, md: 24, lg: 24 };
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const col3Props = { xs: 32, sm: 24, md: 12, lg: 8 };
const col33Props = { xs: 32, sm: 24, md: 24, lg: 8 };
const col4Props = { xs: 32, sm: 24, md: 12, lg: 6 };

// 是否数据字典
const isAdvFundData = [
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
// 现住房屋类型
const houseTypeData = [
  { dkey: '0', dvalue: '自有' },
  { dkey: '1', dvalue: '租用' }
];
// 结息时间区间
const lsTimeDict = [{
  'dkey': '4',
  'dvalue': '12月'
}, {
  'dkey': '3',
  'dvalue': '9月'
}, {
  'dkey': '2',
  'dvalue': '6月'
}, {
  'dkey': '1',
  'dvalue': '3月'
}];

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
      dealNodeList: [],
      activeKey: '1',
      brandData: [],
      carSeriesData: [],
      carShapeData: [],
      // o2m选中的keys
      selectedRowKeys: {},
      // o2m下拉框中的数据
      oSelectData: {}
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(632036, { code: this.loanBank }), // 查贷款银行 计算银行利率
      fetch(632067, { curNodeCode: '006_03' }), // 查机动车销售公司
      fetch(632177, { status: '2', type: this.bizType, loanBank: this.loanBank }), // 查贷款产品
      fetch(630406, { status: '1' }),
      fetch(630416, { status: '1' }),
      fetch(630426, { status: '1' }),
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
    ]).then(([loanBankData, carSaleData, loanProductData, brandData, carSeriesData,
       carShapeData, bizTypeData, loanPeriodData, regionData, carTypeData, genderData,
       marryStateData, educationData, addressData, relationData, industryData,
       propertyData, incomeData, positionData, professionData, interestData,
       carFrameData, uploadToken, pageData]) => {
      // console.log(loanBankData);
      // console.log(pageData);
      // 初始化万元系数、公证费比例、gps费用
      if (pageData.loanProductCode) { // 选择贷款产品后初始化
        let product = loanProductData.find(v => v.code === pageData.loanProductCode);
        if (product) {
          this.wanFactor = product.wanFactor || 0;
          this.authRate = product.authRate || 0;
          this.gpsFee = product.gpsFee || 0;
        }
      }
      this.setState({
        loanBankData,
        carSaleData,
        loanProductData,
        brandData,
        carSeriesData,
        carShapeData,
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
    }).catch(() => {});
    fetch(630147).then((dealNodeList) => {
      this.setState({ dealNodeList });
    }).catch(() => {});
  }
  tabChange = (activeKey) => {
    this.setState({ activeKey });
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
    return split === 4 ? col4Props : split === 3 ? col3Props : split === 33 ? col33Props : split === 1 ? col1Props : col2Props;
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
  getCitySelectCol(item, split = 3) {
    let colProps = this.getColProps(split);
    item.readonly = this.isReadonly(item);
    const props = {
      initVal: getRealValue({...item, type: 'citySelect', pageData: this.state.pageData}),
      rules: getRules(item),
      hidden: item.hidden,
      inline: isUndefined(item.inline) ? true : item.inline,
      field: item.field,
      label: this.getLabel(item),
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
  // 获取o2m表格控件
  getTableItem(item, list, split = 1) {
    let colProps = this.getColProps(split);
    item.readonly = this.isReadonly(item);
    const props = {
      list,
      hidden: item.hidden,
      inline: true,
      field: item.field,
      title: item.title,
      label: null,
      readonly: item.readonly,
      options: item.options,
      selectedRowKeys: this.state.selectedRowKeys[item.field] || [],
      setO2MSelect: this.setO2MSelect,
      setO2MData: this.setO2MData
    };
    return (
      <Col {...colProps}>
        <CO2M key={item.field} {...props} setO2MSelectData={(d) => this.setO2MSelectData(item.field, d)}/>
      </Col>
    );
  }
  // o2m选择一行数据的回调
  setO2MSelect = (field, selectedRowKeys) => {
    this.setState(prevState => ({
      selectedRowKeys: {
        ...prevState.selectedRowKeys,
        [field]: selectedRowKeys
      }
    }));
  }
  // o2m数据变动的回调
  setO2MData = (field, list) => {
    this.setState(prevState => ({
      pageData: {
        ...prevState.pageData,
        [field]: list
      }
    }));
  }
  setO2MSelectData(field, oSelectData) {
    this.setState(prevState => ({
      oSelectData: {
        ...prevState.oSelectData,
        [field]: oSelectData
      }
    }));
  }
  // 审核时提交表单
  checkInfo = (approveResult) => {
    this.props.form.validateFieldsAndScroll(validateFieldsAndScrollOption, (err, values) => {
      if (!err) {
        this.beforeSubmit(values);
        let bizCode = this.getBizCode();
        values.code = this.code;
        values.approveResult = approveResult; // 审核结果
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
    const { activeKey } = this.state;
    let fields = checkFieldsMap[activeKey][0];
    this.props.form.validateFieldsAndScroll(fields, validateFieldsAndScrollOption, (err, values) => {
      if (err) {
        return;
      }
      values.code = this.code;
      values.dealType = dealType;
      values.operator = getUserId();
      let amountFields = checkFieldsMap[activeKey][1];
      this.packAmount(amountFields, values);
      switch(activeKey) {
        // 贷款信息
        case '1':
          this.sendDkxx(values);
          break;
        // 车辆信息
        case '2':
          this.sendClxx(values);
          break;
        // 客户信息
        case '3':
          this.sendKhxx(values);
          break;
        // 家庭信息
        case '4':
          this.sendJtxx(values);
          break;
        case '5':
          this.sendGzqq(values);
          break;
      }
    });
  }
  packAmount(amountFields, params) {
    amountFields.forEach(v => {
      if (!isUndefined(params[v])) {
        params[v] = moneyParse(params[v]);
      }
    });
  }
  // 贷款信息
  sendDkxx(params) {
    params.bankRate = this.state.pageData.bankRate;
    this.sendForm(632530, params, '2');
  }
  // 车辆信息
  sendClxx(params) {
    this.sendForm(632531, params, '3');
  }
  // 客户信息
  sendKhxx(params) {
    params.mainIncome = params.mainIncome.join(',');
    this.sendForm(632532, params, '4');
  }
  // 家庭信息
  sendJtxx(params) {
    this.sendForm(632533, params, '5');
  }
  // 工作情况
  sendGzqq(params) {
    if (!isUndefined(params['workDatetime'])) {
      params['workDatetime'] = params['workDatetime'].format(MONTH_FORMAT);
    }
    this.sendForm(632534, params, '6');
  }
  sendForm(bizCode, params, nextActiveKey) {
    this.setState({ fetching: true });
    fetch(bizCode, params).then(() => {
      showSucMsg('操作成功');
      this.setState({
        activeKey: nextActiveKey,
        fetching: false
      });
    }).catch(() => this.setState({ fetching: false }));
  }
  // 保存或提交表单
  // sendForm(values, dealType) {
  //   this.beforeSubmit(values);
  //   values.budgetOrderCode = this.code;
  //   values.dealType = dealType;
  //   values.operator = getUserId();
  //   values.creditCode = this.state.pageData.creditCode;
  //   values.applyUserName = this.state.pageData.applyUserName;
  //   values.bizType = this.state.pageData.bizType;
  //   values.idNo = this.state.pageData.idNo;
  //   this.setState({ fetching: true });
  //   fetch(632500, values).then(() => {
  //     showSucMsg('操作成功');
  //     this.setState({ fetching: false });
  //     // 如果是提交，则返回上一页；否则停留在当前页
  //     // if (dealType === 1) {
  //     setTimeout(() => {
  //       this.props.history.go(-1);
  //     }, 1000);
  //     // }
  //   }).catch(() => {
  //     this.setState({ fetching: false });
  //   });
  // }
  // 贷款期限改变 计算银行利率
  loanPeriodChange = (code) => {
    let bankRates = '';
    if (code === '12') {
       bankRates = this.state.loanBankData.rate12;
    } else if (code === '24') {
       bankRates = this.state.loanBankData.rate24;
    } else if (code === '36') {
       bankRates = this.state.loanBankData.rate36;
    }
    this.setState({
      pageData: {
        ...this.state.pageData,
        bankRate: bankRates
      }
    });
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
      let product = loanProductList.find((item) => {
        return item.code === code;
      });
      this.wanFactor = product.wanFactor || 0; // 万元系数
      this.authRate = product.authRate || 0; // 公证费比例
      this.gpsFee = product.gpsFee || 0; // GPS费用
      let loanAmount = this.props.form.getFieldValue('loanAmount'); // 获取贷款金额的值
      if (loanAmount) {
        this.props.form.setFieldsValue({ // 设置表单值
          monthDeposit: moneyFormat((this.wanFactor * moneyParse(loanAmount)) / 10000000),
          authFee: moneyFormat(this.authRate * moneyParse(loanAmount)),
          gpsFee: moneyFormat(this.gpsFee),
          teamFee: '',
          otherFee: '',
          preRate: this.preRate,
          backRate: this.backRate
        });
      }
    } else {
      this.wanFactor = 0;
      this.authRate = 0;
      this.gpsFee = 0;
      this.props.form.setFieldsValue({
        monthDeposit: '',
        authFee: '',
        gpsFee: '',
        teamFee: '',
        otherFee: '',
        preRate: '',
        backRate: ''
      });
    }
  }
  // 开票价格改变
  // 首付比例=首付金额/开票价格
  invoicePriceChange = (v, data) => {
    let firstAmount = this.props.form.getFieldValue('sfAmount');
    let loanAmount = this.props.form.getFieldValue('loanAmount');
    v = +moneyParse(v);
    // 如果已有首付金额，则改变贷款金额
    if (firstAmount) {
      firstAmount = +moneyParse(firstAmount);
      loanAmount = moneyFormat(v - firstAmount);
      this.props.form.setFieldsValue({
        loanAmount,
        sfRate: (firstAmount / v * 100).toFixed(2),
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
        sfRate: (v / invoicePrice * 100).toFixed(2),
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
        sfAmount: firstAmount,
        sfRate: (moneyParse(firstAmount) / invoicePrice).toFixed(2),
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
    return item.title ? (
        <span className={item.required && ((item.type === 'textarea' && !item.normalArea) || (item.type === 'o2m')) ? 'ant-form-item-required' : ''}>
        {item.title + (item.single ? '(单)' : '')}
          {item.help ? <Tooltip title={item.help}><Icon type="question-circle-o"/></Tooltip> : null}
      </span>
    ) : null;
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
      fetching, carSaleData, loanBankData, bizTypeData, loanPeriodData,
      loanProductData, regionData, carTypeData, genderData, marryStateData,
      educationData, addressData, relationData, industryData, propertyData,
      incomeData, positionData, professionData, carFrameData, showMate,
      showGua, showSqryhls, showSqrzfbls, showSqrwxls, showPoyhls, carShapeData,
      showPozfbls, showPowxls, showDbryhls, showDbrzfbls, showDbrwxls,
      pageData, isMarried, showMarry, activeKey, brandData, carSeriesData
    } = this.state;
    let readonly = false;
    let lsOptions = {
      add: true,
      edit: true,
      delete: true,
      fields: [{
        title: '征信人',
        field: 'creditUserCode'
      }, {
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
      }, {
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
        type: 'select',
        data: lsTimeDict,
        keyName: 'dkey',
        valueName: 'dvalue',
        noVisible: true
      }, {
        title: '结息时间2',
        field: 'jourInterest2',
        type: 'select',
        data: lsTimeDict,
        keyName: 'dkey',
        valueName: 'dvalue',
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
    };
    return (
        <Spin spinning={fetching}>
          <Form>
            <Tabs activeKey={activeKey} onChange={this.tabChange}>
              <TabPane tab="贷款信息" key="1">
                <Card style={{ marginTop: 16 }} title="贷款信息">
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'loanBankName',
                      title: '贷款银行',
                      _keys: ['repayBiz', 'loanBankName'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      readonly: true,
                      required: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'periods',
                      title: '贷款期限',
                      _keys: ['repayBiz', 'periods'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      onChange: this.loanPeriodChange
                    }, loanPeriodData, 4)}
                    {this.getInputCol({
                      field: 'bankRate',
                      title: '银行利率(%)',
                      _keys: ['repayBiz', 'bankRate'],
                      readonly: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'loanAmount',
                      title: '贷款金额(元)',
                      _keys: ['repayBiz', 'loanAmount'],
                      onChange: this.loanAmountChange,
                      amount: true,
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'loanProductCode',
                      title: '贷款产品',
                      _keys: ['repayBiz', 'loanProductCode'],
                      keyName: 'code',
                      valueName: 'name',
                      onChange: this.loanProductChange,
                      required: true
                    }, loanProductData, 4)}
                    {this.getInputCol({
                      field: 'monthDeposit',
                      title: '月供保证金(元)',
                      _keys: ['repayBiz', 'monthDeposit'],
                      amount: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'gpsFee',
                      title: 'GPS费用(元)',
                      _keys: ['repayBiz', 'gpsFee'],
                      amount: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'authFee',
                      title: '公证费用(元)',
                      _keys: ['repayBiz', 'authFee'],
                      amount: true,
                      required: true
                    }, 4)}
                   </Row>
                <Row gutter={54}>
                  {this.getInputCol({
                    field: 'teamFee',
                    title: '团队服务费(元)',
                    _keys: ['repayBiz', 'teamFee'],
                    amount: true,
                    required: true
                  }, 4)}
                  {this.getInputCol({
                    field: 'otherFee',
                    title: '其它费用(元)',
                    _keys: ['repayBiz', 'otherFee'],
                    amount: true,
                    required: true
                  }, 4)}
                  {this.getInputCol({
                    field: 'invoicePrice',
                    title: '开票价格(元)',
                    _keys: ['repayBiz', 'invoicePrice'],
                    required: true,
                    onChange: this.invoicePriceChange
                  }, 4)}
                  {this.getInputCol({
                    field: 'sfAmount',
                    title: '首付金额(元)',
                    _keys: ['repayBiz', 'sfAmount'],
                    onChange: this.firstAmountChange,
                    amount: true,
                    required: true
                  }, 4)}
                </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'sfRate',
                      _keys: ['repayBiz', 'sfRate'],
                      title: '首付比例(%)',
                      required: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'isAdvanceFund',
                      title: '是否垫资',
                      _keys: ['repayBiz', 'isAdvanceFund'],
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                    {this.getSelectCol({
                      field: 'isFinacing',
                      title: '是否融资',
                      _keys: ['repayBiz', 'isFinacing'],
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                    {this.getSelectCol({
                      field: 'isAzGps',
                      title: '是否安装GPS',
                      _keys: ['repayBiz', 'isAzGps'],
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                     </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'isPlatInsure',
                      title: '是否我司续保',
                      _keys: ['repayBiz', 'isPlatInsure'],
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="车辆信息" key="2">
                <Card title="车辆信息">
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'bizType',
                      title: '业务种类',
                      _keys: ['carInfo', 'bizType'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      readonly: true
                    }, bizTypeData, 4)}
                    {this.getSelectCol({
                      field: 'vehicleCompanyName',
                      title: '机动车销售公司',
                      _keys: ['carInfo', 'vehicleCompanyName'],
                      required: true,
                      keyName: 'code',
                      valueName: 'abbrName',
                      type: 'select'
                    }, carSaleData, 4)}
                    {this.getInputCol({
                      field: 'invoiceCompany',
                      title: '开票单位',
                      _keys: ['carInfo', 'invoiceCompany'],
                      required: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'carType',
                      title: '车辆类型',
                      _keys: ['carInfo', 'carType'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, carTypeData, 4)}
                  </Row>
                    <Row gutter={54}>
                      {this.getSelectCol({
                        field: 'carBrand',
                        title: '车辆品牌',
                        _keys: ['carInfo', 'carBrand'],
                        keyName: 'name',
                        valueName: 'name',
                        required: true
                      }, brandData, 4)}
                      {this.getSelectCol({
                        field: 'carSeries',
                        title: '车辆车系',
                        _keys: ['carInfo', 'carSeries'],
                        keyName: 'name',
                        valueName: 'name',
                        required: true
                      }, carSeriesData, 4)}
                      {this.getSelectCol({
                        field: 'carModel',
                        title: '车辆型号',
                        _keys: ['carInfo', 'carModel'],
                        keyName: 'name',
                        valueName: 'name',
                        required: true
                      }, carShapeData, 4)}
                      {this.getInputCol({
                        field: 'carColor',
                        title: '车辆颜色',
                        _keys: ['carInfo', 'carColor'],
                        required: true
                      }, 4)}
                    </Row>
                    <Row gutter={54}>
                      {this.getInputCol({
                        field: 'carFrameNo',
                        title: '车架号',
                        _keys: ['carInfo', 'carFrameNo'],
                        required: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'carEngineNo',
                        title: '发动机号',
                        _keys: ['carInfo', 'carEngineNo'],
                        required: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'originalPrice',
                        title: '市场指导价(元)',
                        _keys: ['carInfo', 'originalPrice'],
                        amount: true
                      }, 4)}
                      {this.getSelectCol({
                        field: 'region',
                        title: '所属区域',
                        _keys: ['carInfo', 'region'],
                        keyName: 'dkey',
                        valueName: 'dvalue',
                        required: true
                      }, regionData, 4)}
                    </Row>
                    <Row gutter={54}>
                      {this.getInputCol({
                        field: 'carDealerSubsidy',
                        title: '厂家贴息(元)',
                        _keys: ['carInfo', 'carDealerSubsidy'],
                        required: true,
                        amount: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'oilSubsidyKil',
                        title: '油补公里数',
                        _keys: ['carInfo', 'oilSubsidyKil'],
                        amount: true,
                        required: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'oilSubsidy',
                        title: '油补(元)',
                        _keys: ['carInfo', 'oilSubsidy'],
                        required: true,
                        amount: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'settleAddress',
                        title: '落户地点',
                        _keys: ['carInfo', 'settleAddress'],
                        required: true
                      }, 4)}
                     </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'carPic',
                      title: '车辆照片',
                      _keys: ['carInfo', 'carPic'],
                      type: 'img',
                      required: true
                    }, 3)}
                    {this.getFileCol({
                      field: 'carHgzPic',
                      title: this.bizType === '1' ? '绿大本' : '合格证照片',
                      type: 'img',
                      _keys: ['carInfo', 'carHgzPic'],
                      required: true
                    }, 3)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="客户信息" key="3">
                <Card style={{ marginTop: 16 }} title="主贷人基本信息">
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'applyUserName',
                      title: '姓名',
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'mobile',
                      title: '联系电话',
                      mobile: true,
                      required: true,
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'idNo',
                      title: '身份证号',
                      readonly: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'gender',
                      title: '性别',
                      _keys: ['creditUser', 'gender'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, genderData, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'age',
                      title: '年龄',
                      _keys: ['creditUser', 'age'],
                      number: true,
                      positive: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'nation',
                      title: '民族',
                      _keys: ['creditUser', 'nation'],
                      required: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'political',
                      title: '政治面貌',
                      _keys: ['creditUser', 'political'],
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, politicalData, 4)}
                    {this.getSelectCol({
                      field: 'education',
                      title: '学历',
                      _keys: ['creditUser', 'education'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, educationData, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'workProfession',
                      title: '职业',
                      _keys: ['creditUser', 'workProfession'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, professionData, 4)}
                    {this.getInputCol({
                      field: 'postTitle',
                      title: '职称',
                      _keys: ['creditUser', 'postTitle']
                    }, 4)}
                    {this.getSelectCol({
                      field: 'isDriceLicense',
                      title: '有无驾照',
                      _keys: ['creditUser', 'isDriceLicense'],
                      keyName: 'k',
                      valueName: 'v'
                    }, isDriverData, 4)}
                    {this.getInputCol({
                      field: 'carTypeNow',
                      title: '现有车辆',
                      _keys: ['creditUser', 'carType']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'mainIncome',
                      title: '主要收入来源',
                      _keys: ['creditUser', 'mainIncome'],
                      onChange: this.mainChange,
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      multiple: true,
                      required: true
                    }, incomeData, 4)}
                    {this.getInputCol({
                      field: 'otherIncomeNote',
                      title: '其他收入说明',
                      _keys: ['creditUser', 'otherIncomeNote']
                    }, 4)}
                    {this.getSelectCol({
                      field: 'isHouseProperty',
                      title: '有无房产',
                      _keys: ['creditUser', 'isHouseProperty'],
                      keyName: 'k',
                      valueName: 'v'
                    }, isDriverData, 4)}
                   </Row>
                </Card>
                <Card style={{ marginTop: 16 }} title="紧急联系人">
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'emergencyName1',
                      title: '联系人1姓名',
                      _keys: ['creditUser', 'emergencyName1'],
                      required: true
                    }, 3)}
                    {this.getSelectCol({
                      field: 'emergencyRelation1',
                      title: '与申请人关系',
                      _keys: ['creditUser', 'emergencyRelation1'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, relationData, 3)}
                    {this.getInputCol({
                      field: 'emergencyMobile1',
                      title: '手机号码',
                      _keys: ['creditUser', 'emergencyMobile1'],
                      mobile: true,
                      required: true
                    }, 33)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'emergencyName2',
                      title: '联系人2姓名',
                      _keys: ['creditUser', 'emergencyName2'],
                      required: true
                    }, 3)}
                    {this.getSelectCol({
                      field: 'emergencyRelation2',
                      title: '与申请人关系',
                      _keys: ['creditUser', 'emergencyRelation2'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, relationData, 3)}
                    {this.getInputCol({
                      field: 'emergencyMobile2',
                      title: '手机号码',
                      _keys: ['creditUser', 'emergencyMobile2'],
                      mobile: true,
                      required: true
                    }, 33)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="家庭情况" key="4">
                <Card title="家庭情况">
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'marryState',
                      title: '婚姻状况',
                      _keys: ['creditUser', 'marryState'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      onChange: this.marryChange
                    }, marryStateData, 4)}
                    {this.getInputCol({
                      field: 'familyNumber',
                      title: '家庭人口',
                      _keys: ['creditUser', 'familyNumber'],
                      required: true,
                      'Z+': true
                    }, 4)}
                    {this.getInputCol({
                      field: 'familyPhone',
                      title: '家庭电话',
                      _keys: ['creditUser', 'familyPhone'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'familyMainAsset',
                      title: '家庭主要财产(元)',
                      _keys: ['creditUser', 'familyMainAsset'],
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'mainAssetInclude',
                      title: '家庭主要财产说明',
                      _keys: ['creditUser', 'mainAssetInclude'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'residenceAddress',
                      title: '户籍地',
                      _keys: ['creditUser', 'residenceAddress'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'postCode2',
                      title: '户籍地邮编',
                      _keys: ['creditUser', 'postCode2'],
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'nowHouseType',
                      title: '现住房类型 ',
                      _keys: ['creditUser', 'nowHouseType'],
                      required: true
                    }, houseTypeData, 4)}
                    {this.getInputCol({
                      field: 'nowAddress',
                      title: '现居住地址 ',
                      _keys: ['creditUser', 'nowAddress'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'postCode',
                      title: '现居住地邮编',
                      _keys: ['creditUser', 'postCode'],
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'hkBookPdf',
                      title: '户口本',
                      _keys: ['creditUser', 'hkBookPdf'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'houseContract',
                      title: '购房合同及房产本',
                      _keys: ['creditUser', 'houseContract'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'houseInvoice',
                      title: '购房发票',
                      _keys: ['creditUser', 'houseInvoice'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'liveProvePdf',
                      title: '居住证明',
                      _keys: ['creditUser', 'liveProvePdf'],
                      type: 'img'
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'buildProvePdf',
                      title: '自建房证明',
                      _keys: ['creditUser', 'buildProvePdf'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'housePictureApply',
                      title: '家访照片',
                      _keys: ['creditUser', 'housePictureApply'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'marryPdf',
                      title: isMarried ? '结婚证' : '离婚证',
                      _keys: ['creditUser', 'marryPdf'],
                      type: 'img',
                      hidden: !showMarry
                    }, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="工作情况" key="5">
                <Card style={{ marginTop: 16 }} title="工作情况">
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'workBelongIndustry',
                      title: '所属行业',
                      _keys: ['creditUser', 'workBelongIndustry'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, industryData, 4)}
                    {this.getSelectCol({
                      field: 'workCompanyProperty',
                      title: '单位经济性质',
                      _keys: ['creditUser', 'workCompanyProperty'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, propertyData, 4)}
                    {this.getInputCol({
                      field: 'workCompanyName',
                      title: '工作单位名称',
                      _keys: ['creditUser', 'workCompanyName'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'workPhone',
                      title: '工作单位电话',
                      _keys: ['creditUser', 'workPhone']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'workCompanyAddress',
                      title: '工作单位地址',
                      _keys: ['creditUser', 'workCompanyAddress'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'employeeQuantity',
                      title: '员工数量',
                      _keys: ['creditUser', 'employeeQuantity']
                    }, 4)}
                    {this.getInputCol({
                      field: 'enterpriseMonthOutput',
                      title: '企业月产值',
                      _keys: ['creditUser', 'enterpriseMonthOutput']
                    }, 4)}
                    {this.getMonthCol({
                      field: 'workDatetime',
                      title: '何时进入该单位',
                      _keys: ['creditUser', 'workDatetime'],
                      type: 'date'
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'position',
                      title: '职务',
                      _keys: ['creditUser', 'position'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, positionData, 4)}
                    {this.getInputCol({
                      field: 'monthIncome',
                      title: '月收入(元)',
                      _keys: ['creditUser', 'monthIncome'],
                      amount: true,
                      required: true
                    }, 4)}
                    {this.getNormalTextAreaCol({
                      field: 'otherWorkNote',
                      title: '工作描述及还款来源分析',
                      _keys: ['creditUser', 'otherWorkNote']
                    }, 2)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'improvePdf',
                      title: '收入证明',
                      _keys: ['creditUser', 'improvePdf'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'frontTablePic',
                      title: '单位前台照片',
                      _keys: ['creditUser', 'frontTablePic'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'workPlacePic',
                      title: '办公场地照片',
                      _keys: ['creditUser', 'workPlacePic'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'salerAndcustomer',
                      title: '签约员与客户合影',
                      _keys: ['creditUser', 'salerAndcustomer'],
                      type: 'img'
                    }, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="共还人信息" key="6">
                <Card style={{ marginTop: 16 }} title="共还人信息">
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'mateName',
                      title: '姓名',
                      _keys: ['creditUser', 'mateName'],
                      readonly: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'relation',
                      title: '与主贷人关系',
                      _keys: ['creditUser', 'relation'],
                      readonly: true,
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, relationData, 4)}
                    {this.getInputCol({
                      field: 'mateMobile',
                      title: '手机号',
                      _keys: ['creditUser', 'mateMobile'],
                      mobile: true,
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateIdNo',
                      title: '身份证号',
                      _keys: ['creditUser', 'mateIdNo'],
                      idCard: true,
                      readonly: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'mateEducation',
                      title: '学历',
                      _keys: ['creditUser', 'mateEducation']
                    }, educationData, 4)}
                    {this.getCitySelectCol({
                      field: 'mateBirthAddressProvince',
                      title: '户籍地',
                      _keys: ['creditUser', 'mateBirthAddressProvince'],
                      cFields: ['mateBirthAddressProvince', 'mateBirthAddressCity', 'mateBirthAddressArea']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateDetailAddress',
                      title: '详细地址',
                      _keys: ['creditUser', 'mateDetailAddress']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'matePostCode',
                      title: '户籍地邮编',
                      _keys: ['creditUser', 'matePostCode']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateCompanyName',
                      title: '工作单位名称',
                      _keys: ['creditUser', 'mateCompanyName']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateCompanyAddress',
                      title: '工作单位地址',
                      _keys: ['creditUser', 'mateCompanyAddress']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateCompanyContactNo',
                      title: '工作单位电话',
                      _keys: ['creditUser', 'mateCompanyContactNo']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
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
                    {this.getCitySelectCol({
                      field: 'guaBirthAddressProvince',
                      title: '户籍地',
                      cFields: ['guaBirthAddressProvince', 'guaBirthAddressCity', 'guaBirthAddressArea'],
                      required: true
                    }, 4)}
                    {this.getInputCol({ field: 'guaDetailAddress',
                      title: '  详细地址',
                      required: true}, 4)}
                  </Row>
                  <Row gutter={54}>
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
                  </Row>
                  <Row gutter={54}>
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
                <Card style={{ marginTop: 16 }} title="担保人信息">
                  <Row gutter={54}>
                    {
                      this.getTableItem({
                        title: '流水信息',
                        field: 'lsfield',
                        options: lsOptions
                      }, [])
                    }
                  </Row>
                </Card>
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
