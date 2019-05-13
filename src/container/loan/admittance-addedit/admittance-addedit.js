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
      activeKey: '0',
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
    fetch(632516, {code: this.code}).then((data) => {
      this.setState({ pageData: data, fetching: false });
      Promise.all([
        fetch(632516, { code: data.code }),
        fetch(632036, { code: data.loanBank }), // 查贷款银行 计算银行利率
        fetch(632067, { curNodeCode: '006_03' }), // 查机动车销售公司
        fetch(632177, { status: '2', type: data.bizType, loanBank: data.loanBank }), // 查贷款产品
        fetch(630406, { status: '1' }),
        fetch(630416, { status: '1' }),
        fetch(630429, { status: '1' }),
        getDictList({ parentKey: 'budget_orde_biz_typer' }),
        getDictList({ parentKey: 'loan_period' }),
        getDictList({ parentKey: 'region' }),
        getDictList({ parentKey: 'car_type' }),
        getDictList({ parentKey: 'gender' }),
        getDictList({ parentKey: 'marry_state' }),
        getDictList({ parentKey: 'education' }),
        getDictList({ parentKey: 'is_card_mail_address' }),
        getDictList({ parentKey: 'credit_contacts_relation' }),
        getDictList({ parentKey: 'work_belong_industry' }),
        getDictList({ parentKey: 'work_company_property' }),
        getDictList({ parentKey: 'main_income' }),
        getDictList({ parentKey: 'position' }),
        getDictList({ parentKey: 'work_profession' }),
        getDictList({ parentKey: 'interest' }),
        getDictList({ parentKey: 'car_frame_price_count' }),
        getQiniuToken()
      ]).then(([pageData, loanBankData, carSaleData, loanProductData, brandData, carSeriesData,
         carShapeData, bizTypeData, loanPeriodData, regionData, carTypeData, genderData,
         marryStateData, educationData, addressData, relationData, industryData,
         propertyData, incomeData, positionData, professionData, interestData,
         carFrameData, uploadToken]) => {
        // 初始化万元系数、公证费比例、gps费用
        if (pageData.loanProductCode) { // 选择贷款产品后初始化
          let product = loanProductData.find(v => v.code === pageData.loanProductCode);
          if (product) {
            this.wanFactor = product.wanFactor || 0;
            this.authRate = product.authRate || 0;
            this.gpsFee = product.gpsFee || 0;
          }
        }
        pageData.creditUserList.forEach(item => {
          // 申请人
          if (item.loanRole === '1') {
            pageData.creditUser1 = item;
            // 共同还款人
          } else if (item.loanRole === '2') {
            pageData.creditUser2 = item;
            // 担保人
          } else {
            pageData.creditUser3 = item;
          }
        });
        pageData.carInfoRes = pageData.carInfoRes || {};
        pageData.carPledge = pageData.carPledge || {};
        pageData.attachments.forEach(item => {
          if (item.kname === 'car_pic') {
            pageData.carInfoRes.carPic = item.url;
          } else if (item.kname === 'car_hgz_pic') {
            pageData.carInfoRes.carHgzPic = item.url;
          } else if (item.kname === 'hkb_apply') {
            pageData.creditUser1.hkBookPdf = item.url;
          } else if (item.kname === 'house_contract') {
            pageData.creditUser1.houseContract = item.url;
          } else if (item.kname === 'house_invoice') {
            pageData.creditUser1.houseInvoice = item.url;
          } else if (item.kname === 'live_prove_pdf') {
            pageData.creditUser1.liveProvePdf = item.url;
          } else if (item.kname === 'build_prove_pdf') {
            pageData.creditUser1.buildProvePdf = item.url;
          } else if (item.kname === 'house_picture_apply') {
            pageData.creditUser1.housePictureApply = item.url;
          } else if (item.kname === 'marry_pdf') {
            pageData.creditUser1.marryPdf = item.url;
          } else if (item.kname === 'improve_pdf') {
            pageData.creditUser1.improvePdf = item.url;
          } else if (item.kname === 'front_table_pic') {
            pageData.creditUser1.frontTablePic = item.url;
          } else if (item.kname === 'work_place_pic') {
            pageData.creditUser1.workPlacePic = item.url;
          } else if (item.kname === 'saler_and_customer') {
            pageData.creditUser1.salerAndcustomer = item.url;
          } else if (item.kname === 'asset_pdf_gh') {
            pageData.creditUser2.mateAssetPdf = item.url;
          } else if (item.kname === 'asset_pdf_gua') {
            pageData.creditUser3.guaAssetPdf = item.url;
          } else if (item.kname === 'pledge_user_id_card_front') {
            pageData.carPledge.pledgeUserIdCardFront = item.url;
          } else if (item.kname === 'pledge_user_id_card_reverse') {
            pageData.carPledge.pledgeUserIdCardReverse = item.url;
          }
        });
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
          isSelfCompany: pageData.mainIncome && pageData.mainIncome.includes('4'),
          isMarried: pageData.creditUser1.marryState === '2',
          showMarry: pageData.creditUser1.marryState === '2' || pageData.creditUser1.marryState === '3',
          token: uploadToken.uploadToken,
          fetching: false,
          isLoaded: true
        });
      }).catch(() => this.setState({ fetching: false }));
    }).catch(() => this.setState({ fetching: false }));
  }
  tabChange = (activeKey) => {
    if (this.state.activeKey < activeKey) {
      this.checkForm(0, () => {
        this.setState({ activeKey });
      });
    } else {
      this.setState({ activeKey });
    }
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
  getTableItem(item, split = 1) {
    let colProps = this.getColProps(split);
    item.readonly = this.isReadonly(item);
    let list = this.state.pageData.creditJours || [];
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
  // 保存或提交表单前的校验
  checkForm = (dealType, callback) => {
    const { activeKey, pageData } = this.state;
    if (dealType === 1) {
      return this.applyForm();
    }
    if (activeKey !== '8') {
      let fields = checkFieldsMap[activeKey][0];
      this.props.form.validateFieldsAndScroll(fields, validateFieldsAndScrollOption, (err, values) => {
        if (err) {
          return;
        }
        this.setState({ fetching: true });
        this.sendNormalForm(values, activeKey, callback)
          .then(() => {
            this.setState({ fetching: false }, () => {
              setTimeout(() => {
                callback && callback();
              }, 0);
            });
          })
          .catch(() => this.setState({ fetching: false }));
      });
    // 流水信息
    } else {
      this.setState({ fetching: true });
      this.sendLsxx({ code: this.code, operator: getUserId() }, callback)
        .then(() => {
          this.setState({ fetching: false }, () => {
            setTimeout(() => {
              callback && callback();
            }, 0);
          });
        })
        .catch(() => this.setState({ fetching: false }));
    }
  }
  applyForm() {
    const { activeKey, pageData } = this.state;
    if (activeKey !== '8') {
      let fields = checkFieldsMap[activeKey][0];
      this.props.form.validateFieldsAndScroll(fields, validateFieldsAndScrollOption, (err, values) => {
        if (err) {
          return;
        }
        this.setState({ fetching: true });
        this.sendNormalForm(values, activeKey)
          .then(() => this.applyAll())
          .catch(() => this.setState({ fetching: false }));
      });
    // 流水信息
    } else {
      this.setState({ fetching: true });
      this.sendLsxx({ code: this.code, operator: getUserId() })
        .then(() => this.applyAll())
        .catch(() => this.setState({ fetching: false }));
    }
  }
  applyAll() {
    return fetch(632538, {
      code: this.code,
      operator: getUserId()
    }).then(() => {
      showSucMsg('提交成功');
      setTimeout(() => {
          this.props.history.go(-1);
      }, 1000);
    });
  }
  sendNormalForm(values, activeKey, callback) {
    values.code = this.code;
    values.operator = getUserId();
    let amountFields = checkFieldsMap[activeKey][1];
    this.packAmount(amountFields, values);
    switch(activeKey) {
      // 贷款信息
      case '0':
        return this.sendDkxx(values, callback);
      // 车辆信息
      case '1':
        return this.sendClxx(values, callback);
      // 抵押信息
      case '2':
        return this.sendDyxx(values, callback);
      // 客户信息
      case '3':
        return this.sendKhxx(values, callback);
      // 家庭信息
      case '4':
        return this.sendJtxx(values, callback);
      // 工作情况
      case '5':
        return this.sendGzqq(values, callback);
      // 共还人信息
      case '6':
        return this.sendGhrxx(values, callback);
      // 担保人信息
      case '7':
        return this.sendDbrxx(values, callback);
    }
  }
  packAmount(amountFields, params) {
    amountFields.forEach(v => {
      if (!isUndefined(params[v])) {
        params[v] = moneyParse(params[v]);
      }
    });
  }
  // 贷款信息
  sendDkxx(params, callback) {
    params.bankRate = this.state.pageData.loanInfo.bankRate;
    return this.sendForm(632530, params, '1', callback);
  }
  // 车辆信息
  sendClxx(params, callback) {
    return this.sendForm(632531, params, '2', callback);
  }
  // 抵押信息
  sendDyxx(params, callback) {
      return this.sendForm(632539, params, '3', callback);
  }
  // 客户信息
  sendKhxx(params, callback) {
    params.carType = params.carTypeNow;
    params.mainIncome = params.mainIncome.join(',');
    return this.sendForm(632532, params, '4', callback);
  }
  // 家庭信息
  sendJtxx(params, callback) {
    params.birthAddressCity = params.birthAddressProvince[1];
    params.birthAddressArea = params.birthAddressProvince[2];
    params.birthAddressProvince = params.birthAddressProvince[0];
    params.nowAddressCity = params.nowAddressProvince[1];
    params.nowAddressArea = params.nowAddressProvince[2];
    params.nowAddressProvince = params.nowAddressProvince[0];
    return this.sendForm(632533, params, '5', callback);
  }
  // 工作情况
  sendGzqq(params, callback) {
    if (!isUndefined(params['workDatetime'])) {
      params['workDatetime'] = params['workDatetime'].format(MONTH_FORMAT);
    }
    return this.sendForm(632534, params, '6', callback);
  }
  // 共还人信息
  sendGhrxx(params, callback) {
    let newParams = {
      code: this.code,
      operator: getUserId(),
      education: params.mateEducation,
      birthAddressProvince: params.mateBirthAddressProvince[0],
      birthAddressCity: params.mateBirthAddressProvince[1],
      birthAddressArea: params.mateBirthAddressProvince[2],
      birthAddress: params.mateBirthAddress,
      birthPostCode: params.matePostCode,
      companyName: params.mateCompanyName,
      companyAddress: params.mateCompanyAddress,
      companyContactNo: params.mateCompanyContactNo,
      mateAssetPdf: params.mateAssetPdf
    };
    return this.sendForm(632535, newParams, '7', callback);
  }
  // 担保人信息
  sendDbrxx(params, callback) {
    let newParams = {
      code: this.code,
      operator: getUserId(),
      education: params.guaEducation,
      birthAddressProvince: params.guaBirthAddressProvince[0],
      birthAddressCity: params.guaBirthAddressProvince[1],
      birthAddressArea: params.guaBirthAddressProvince[2],
      birthAddress: params.guaBirthAddress,
      birthPostCode: params.guaPostCode,
      companyName: params.guaCompanyName,
      companyAddress: params.guaCompanyAddress,
      companyContactNo: params.guaCompanyContactNo,
      guaAssetPdf: params.guaAssetPdf
    };
    return this.sendForm(632536, newParams, '8', callback);
  }
  // 流水信息
  sendLsxx(params, callback) {
    const { pageData } = this.state;
    params.jourList = pageData.creditJours;
    return this.sendForm(632537, params, '8', callback);
  }
  sendForm(bizCode, params, nextActiveKey, callback) {
    return fetch(bizCode, params).then(() => {
      if (!callback) {
        showSucMsg('保存成功');
        setTimeout(() => {
          this.setState({
            activeKey: nextActiveKey
          });
        }, 0);
      }
    });
  }
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
        loanInfo: {
          ...this.state.pageData.loanInfo,
          bankRate: bankRates
        }
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
  prevStep = () => {
    let activeKey = +this.state.activeKey;
    activeKey -= 1;
    activeKey = Math.max(0, activeKey) + '';
    this.setState({ activeKey });
  }
  render() {
    const {
      fetching, carSaleData, loanBankData, bizTypeData, loanPeriodData,
      loanProductData, regionData, carTypeData, genderData, marryStateData,
      educationData, addressData, relationData, industryData, propertyData,
      incomeData, positionData, professionData, carFrameData, carShapeData,
      pageData, isMarried, showMarry, activeKey, brandData, carSeriesData
    } = this.state;
    const creditUserList = pageData.creditUserList || [];
    let readonly = false;
    let lsOptions = {
      add: true,
      edit: true,
      delete: true,
      fields: [{
        title: '征信人',
        field: 'creditUserCode',
        type: 'select',
        data: creditUserList,
        keyName: 'code',
        valueName: 'userName',
        required: true
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
        valueName: 'value',
        required: true
      }, {
        title: '流水日期区间',
        field: 'datetimeStart',
        rangedate: ['datetimeStart', 'datetimeEnd'],
        type: 'date',
        render: (v, d) => {
          return d && d.datetimeStart ? d.datetimeStart + '~' + d.datetimeEnd : '';
        },
        required: true
      }, {
        title: '结息时间1',
        field: 'jourInterest1',
        type: 'select',
        data: lsTimeDict,
        keyName: 'dkey',
        valueName: 'dvalue',
        noVisible: true,
        required: true
      }, {
        title: '结息时间2',
        field: 'jourInterest2',
        type: 'select',
        data: lsTimeDict,
        keyName: 'dkey',
        valueName: 'dvalue',
        noVisible: true,
        required: true
      }, {
        title: '结息1(元)',
        field: 'interest1',
        noVisible: true,
        required: true
      }, {
        title: '结息2(元)',
        field: 'interest2',
        noVisible: true,
        required: true
      }, {
        title: '总收入(元)',
        field: 'income',
        required: true
      }, {
        title: '总支出(元)',
        field: 'expend',
        required: true
      }, {
        title: '余额(元)',
        field: 'balance',
        required: true
      }, {
        title: '月均收入(元)',
        field: 'monthIncome',
        required: true
      }, {
        title: '月均支出(元)',
        field: 'monthExpend',
        required: true
      }, {
        title: '流水说明',
        field: 'remark',
        noVisible: true,
        type: 'textarea',
        normalArea: true,
        required: true
      }, {
        title: '流水图片',
        field: 'pic',
        type: 'img',
        noVisible: true,
        required: true
      }]
    };
    return (
        <Spin spinning={fetching}>
          <Form>
            <Tabs activeKey={activeKey} onChange={this.tabChange}>
              <TabPane tab="贷款信息" key="0">
                <Card style={{ marginTop: 16 }} title="贷款信息">
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'loanBankName',
                      title: '贷款银行',
                      readonly: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'periods',
                      title: '贷款期限',
                      _keys: ['loanInfo', 'periods'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true,
                      onChange: this.loanPeriodChange
                    }, loanPeriodData, 4)}
                    {this.getInputCol({
                      field: 'bankRate',
                      title: '银行利率(%)',
                      _keys: ['loanInfo', 'bankRate'],
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'loanAmount',
                      title: '贷款金额(元)',
                      _keys: ['loanInfo', 'loanAmount'],
                      onChange: this.loanAmountChange,
                      amount: true,
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'loanProductCode',
                      title: '贷款产品',
                      _keys: ['loanInfo', 'loanProductCode'],
                      keyName: 'code',
                      valueName: 'name',
                      onChange: this.loanProductChange,
                      required: true
                    }, loanProductData, 4)}
                    {this.getInputCol({
                      field: 'monthDeposit',
                      title: '月供保证金(元)',
                      _keys: ['loanInfo', 'monthDeposit'],
                      amount: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'gpsFee',
                      title: 'GPS费用(元)',
                      _keys: ['loanInfo', 'gpsFee'],
                      amount: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'authFee',
                      title: '公证费用(元)',
                      _keys: ['loanInfo', 'authFee'],
                      amount: true,
                      required: true
                    }, 4)}
                   </Row>
                <Row gutter={54}>
                  {this.getInputCol({
                    field: 'teamFee',
                    title: '团队服务费(元)',
                    _keys: ['loanInfo', 'teamFee'],
                    amount: true,
                    required: true
                  }, 4)}
                  {this.getInputCol({
                    field: 'otherFee',
                    title: '其它费用(元)',
                    _keys: ['loanInfo', 'otherFee'],
                    amount: true,
                    required: true
                  }, 4)}
                  {this.getInputCol({
                    field: 'invoicePrice',
                    title: '开票价格(元)',
                    _keys: ['loanInfo', 'invoicePrice'],
                    amount: true,
                    required: true,
                    onChange: this.invoicePriceChange
                  }, 4)}
                  {this.getInputCol({
                    field: 'sfAmount',
                    title: '首付金额(元)',
                    _keys: ['loanInfo', 'sfAmount'],
                    onChange: this.firstAmountChange,
                    amount: true,
                    required: true
                  }, 4)}
                </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'sfRate',
                      _keys: ['loanInfo', 'sfRate'],
                      title: '首付比例(%)',
                      required: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'isAdvanceFund',
                      title: '是否垫资',
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                    {this.getSelectCol({
                      field: 'isFinacing',
                      title: '是否融资',
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                    {this.getSelectCol({
                      field: 'isAzGps',
                      title: '是否安装GPS',
                      _keys: ['isGpsAz'],
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                     </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'isPlatInsure',
                      title: '是否我司续保',
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, isAdvFundData, 4)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="车辆信息" key="1">
                <Card title="车辆信息">
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'bizType',
                      title: '业务种类',
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      readonly: true
                    }, bizTypeData, 4)}
                    {this.getSelectCol({
                      field: 'vehicleCompanyName',
                      title: '机动车销售公司',
                      _keys: ['carInfoRes', 'vehicleCompanyName'],
                      required: true,
                      keyName: 'code',
                      valueName: 'abbrName',
                      type: 'select'
                    }, carSaleData, 4)}
                    {this.getInputCol({
                      field: 'invoiceCompany',
                      title: '开票单位',
                      _keys: ['carInfoRes', 'invoiceCompany'],
                      required: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'carType',
                      title: '车辆类型',
                      _keys: ['carInfoRes', 'carType'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, carTypeData, 4)}
                  </Row>
                    <Row gutter={54}>
                      {this.getSelectCol({
                        field: 'carBrand',
                        title: '车辆品牌',
                        _keys: ['carInfoRes', 'carBrand'],
                        keyName: 'name',
                        valueName: 'name',
                        required: true
                      }, brandData, 4)}
                      {this.getSelectCol({
                        field: 'carSeries',
                        title: '车辆车系',
                        _keys: ['carInfoRes', 'carSeries'],
                        keyName: 'name',
                        valueName: 'name',
                        required: true
                      }, carSeriesData, 4)}
                      {this.getSelectCol({
                        field: 'carModel',
                        title: '车辆型号',
                        _keys: ['carInfoRes', 'carModel'],
                        keyName: 'name',
                        valueName: 'name',
                        required: true
                      }, carShapeData, 4)}
                      {this.getInputCol({
                        field: 'carColor',
                        title: '车辆颜色',
                        _keys: ['carInfoRes', 'carColor'],
                        required: true
                      }, 4)}
                    </Row>
                    <Row gutter={54}>
                      {this.getInputCol({
                        field: 'carFrameNo',
                        title: '车架号',
                        _keys: ['carInfoRes', 'carFrameNo'],
                        required: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'carEngineNo',
                        title: '发动机号',
                        _keys: ['carInfoRes', 'carEngineNo'],
                        required: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'originalPrice',
                        title: '市场指导价(元)',
                        _keys: ['carInfoRes', 'originalPrice'],
                        amount: true
                      }, 4)}
                      {this.getSelectCol({
                        field: 'region',
                        title: '所属区域',
                        _keys: ['carInfoRes', 'region'],
                        keyName: 'dkey',
                        valueName: 'dvalue',
                        required: true
                      }, regionData, 4)}
                    </Row>
                    <Row gutter={54}>
                      {this.getInputCol({
                        field: 'carDealerSubsidy',
                        title: '厂家贴息(元)',
                        _keys: ['carInfoRes', 'carDealerSubsidy'],
                        required: true,
                        amount: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'oilSubsidyKil',
                        title: '油补公里数',
                        _keys: ['carInfoRes', 'oilSubsidyKil'],
                        amount: true,
                        required: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'oilSubsidy',
                        title: '油补(元)',
                        _keys: ['carInfoRes', 'oilSubsidy'],
                        required: true,
                        amount: true
                      }, 4)}
                      {this.getInputCol({
                        field: 'settleAddress',
                        title: '落户地点',
                        _keys: ['carInfoRes', 'settleAddress'],
                        required: true
                      }, 4)}
                     </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'carPic',
                      title: '车辆照片',
                      _keys: ['carInfoRes', 'carPic'],
                      type: 'img',
                      required: true
                    }, 3)}
                    {this.getFileCol({
                      field: 'carHgzPic',
                      title: this.bizType === '1' ? '绿大本' : '合格证照片',
                      type: 'img',
                      _keys: ['carInfoRes', 'carHgzPic']
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
                      _keys: ['creditUser1', 'userName'],
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'mobile',
                      title: '联系电话',
                      _keys: ['creditUser1', 'mobile'],
                      mobile: true,
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'idNo',
                      title: '身份证号',
                      _keys: ['creditUser1', 'idNo'],
                      readonly: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'gender',
                      title: '性别',
                      _keys: ['creditUser1', 'gender'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, genderData, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'age',
                      title: '年龄',
                      _keys: ['creditUser1', 'age'],
                      number: true,
                      positive: true,
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'nation',
                      title: '民族',
                      _keys: ['creditUser1', 'nation'],
                      required: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'political',
                      title: '政治面貌',
                      _keys: ['creditUser1', 'political'],
                      keyName: 'k',
                      valueName: 'v',
                      required: true
                    }, politicalData, 4)}
                    {this.getSelectCol({
                      field: 'education',
                      title: '学历',
                      _keys: ['creditUser1', 'education'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, educationData, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'workProfession',
                      title: '职业',
                      _keys: ['creditUser1', 'workProfession'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, professionData, 4)}
                    {this.getInputCol({
                      field: 'postTitle',
                      title: '职称',
                      _keys: ['creditUser1', 'postTitle']
                    }, 4)}
                    {this.getSelectCol({
                      field: 'isDriceLicense',
                      title: '有无驾照',
                      _keys: ['creditUser1', 'isDriceLicense'],
                      keyName: 'k',
                      valueName: 'v'
                    }, isDriverData, 4)}
                    {this.getInputCol({
                      field: 'carTypeNow',
                      title: '现有车辆',
                      _keys: ['creditUser1', 'carType']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'mainIncome',
                      title: '主要收入来源',
                      _keys: ['creditUser1', 'mainIncome'],
                      onChange: this.mainChange,
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      multiple: true,
                      required: true
                    }, incomeData, 4)}
                    {this.getInputCol({
                      field: 'otherIncomeNote',
                      title: '其他收入说明',
                      _keys: ['creditUser1', 'otherIncomeNote']
                    }, 4)}
                    {this.getSelectCol({
                      field: 'isHouseProperty',
                      title: '有无房产',
                      _keys: ['creditUser1', 'isHouseProperty'],
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
                      _keys: ['creditUser1', 'emergencyName1'],
                      required: true
                    }, 3)}
                    {this.getSelectCol({
                      field: 'emergencyRelation1',
                      title: '与申请人关系',
                      _keys: ['creditUser1', 'emergencyRelation1'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, relationData, 3)}
                    {this.getInputCol({
                      field: 'emergencyMobile1',
                      title: '手机号码',
                      _keys: ['creditUser1', 'emergencyMobile1'],
                      mobile: true,
                      required: true
                    }, 33)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'emergencyName2',
                      title: '联系人2姓名',
                      _keys: ['creditUser1', 'emergencyName2'],
                      required: true
                    }, 3)}
                    {this.getSelectCol({
                      field: 'emergencyRelation2',
                      title: '与申请人关系',
                      _keys: ['creditUser1', 'emergencyRelation2'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, relationData, 3)}
                    {this.getInputCol({
                      field: 'emergencyMobile2',
                      title: '手机号码',
                      _keys: ['creditUser1', 'emergencyMobile2'],
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
                      _keys: ['creditUser1', 'marryState'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      required: true
                    }, marryStateData, 4)}
                    {this.getInputCol({
                      field: 'familyNumber',
                      title: '家庭人口',
                      _keys: ['creditUser1', 'familyNumber'],
                      required: true,
                      'Z+': true
                    }, 4)}
                    {this.getInputCol({
                      field: 'familyPhone',
                      title: '家庭电话',
                      _keys: ['creditUser1', 'familyPhone'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'familyMainAsset',
                      title: '家庭主要财产(元)',
                      _keys: ['creditUser1', 'familyMainAsset'],
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'mainAssetInclude',
                      title: '家庭主要财产说明',
                      _keys: ['creditUser1', 'mainAssetInclude'],
                      required: true
                    }, 4)}
                    {this.getCitySelectCol({
                      field: 'birthAddressProvince',
                      title: '户籍地',
                      _keys: ['creditUser1'],
                      cFields: ['birthAddressProvince', 'birthAddressCity', 'birthAddressArea'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'birthAddress',
                      title: '户籍地详细地址',
                      _keys: ['creditUser1', 'birthAddress'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'birthPostCode',
                      title: '户籍地邮编',
                      _keys: ['creditUser1', 'birthPostCode'],
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'nowHouseType',
                      title: '现住房类型 ',
                      _keys: ['creditUser1', 'nowHouseType'],
                      required: true
                    }, houseTypeData, 4)}
                    {this.getCitySelectCol({
                      field: 'nowAddressProvince',
                      title: '现居住地',
                      _keys: ['creditUser1'],
                      cFields: ['nowAddressProvince', 'nowAddressCity', 'nowAddressArea'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'nowAddress',
                      title: '现居住地址 ',
                      _keys: ['creditUser1', 'nowAddress'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'nowPostCode',
                      title: '现居住地邮编',
                      _keys: ['creditUser1', 'nowPostCode'],
                      required: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'hkBookPdf',
                      title: '户口本',
                      _keys: ['creditUser1', 'hkBookPdf'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'houseContract',
                      title: '购房合同及房产本',
                      _keys: ['creditUser1', 'houseContract'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'houseInvoice',
                      title: '购房发票',
                      _keys: ['creditUser1', 'houseInvoice'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'liveProvePdf',
                      title: '居住证明',
                      _keys: ['creditUser1', 'liveProvePdf'],
                      type: 'img'
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'buildProvePdf',
                      title: '自建房证明',
                      _keys: ['creditUser1', 'buildProvePdf'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'housePictureApply',
                      title: '家访照片',
                      _keys: ['creditUser1', 'housePictureApply'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'marryPdf',
                      title: isMarried ? '结婚证' : '离婚证',
                      _keys: ['creditUser1', 'marryPdf'],
                      type: 'img'
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
                      _keys: ['creditUser1', 'workBelongIndustry'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, industryData, 4)}
                    {this.getSelectCol({
                      field: 'workCompanyProperty',
                      title: '单位经济性质',
                      _keys: ['creditUser1', 'workCompanyProperty'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, propertyData, 4)}
                    {this.getInputCol({
                      field: 'companyName',
                      title: '工作单位名称',
                      _keys: ['creditUser1', 'companyName'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'companyContactNo',
                      title: '工作单位电话',
                      _keys: ['creditUser1', 'companyContactNo']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'companyAddress',
                      title: '工作单位地址',
                      _keys: ['creditUser1', 'companyAddress'],
                      required: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'employeeQuantity',
                      title: '员工数量',
                      _keys: ['creditUser1', 'employeeQuantity']
                    }, 4)}
                    {this.getInputCol({
                      field: 'enterpriseMonthOutput',
                      title: '企业月产值',
                      _keys: ['creditUser1', 'enterpriseMonthOutput']
                    }, 4)}
                    {this.getMonthCol({
                      field: 'workDatetime',
                      title: '何时进入该单位',
                      _keys: ['creditUser1', 'workDatetime'],
                      type: 'date'
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'position',
                      title: '职务',
                      _keys: ['creditUser1', 'position'],
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, positionData, 4)}
                    {this.getInputCol({
                      field: 'monthIncome',
                      title: '月收入(元)',
                      _keys: ['creditUser1', 'monthIncome'],
                      amount: true,
                      required: true
                    }, 4)}
                    {this.getNormalTextAreaCol({
                      field: 'otherWorkNote',
                      title: '工作描述及还款来源分析',
                      _keys: ['creditUser1', 'otherWorkNote']
                    }, 2)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'improvePdf',
                      title: '收入证明',
                      _keys: ['creditUser1', 'improvePdf'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'frontTablePic',
                      title: '单位前台照片',
                      _keys: ['creditUser1', 'frontTablePic'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'workPlacePic',
                      title: '办公场地照片',
                      _keys: ['creditUser1', 'workPlacePic'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'salerAndcustomer',
                      title: '签约员与客户合影',
                      _keys: ['creditUser1', 'salerAndcustomer'],
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
                      _keys: ['creditUser2', 'userName'],
                      readonly: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'mateRelation',
                      title: '与主贷人关系',
                      _keys: ['creditUser2', 'relation'],
                      readonly: true,
                      keyName: 'dkey',
                      valueName: 'dvalue'
                    }, relationData, 4)}
                    {this.getInputCol({
                      field: 'mateMobile',
                      title: '手机号',
                      _keys: ['creditUser2', 'mobile'],
                      mobile: true,
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateIdNo',
                      title: '身份证号',
                      _keys: ['creditUser2', 'idNo'],
                      idCard: true,
                      readonly: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'mateEducation',
                      title: '学历',
                      _keys: ['creditUser2', 'education']
                    }, educationData, 4)}
                    {this.getCitySelectCol({
                      field: 'mateBirthAddressProvince',
                      title: '户籍地',
                      _keys: ['creditUser2'],
                      cFields: ['birthAddressProvince', 'birthAddressCity', 'birthAddressArea']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateBirthAddress',
                      title: '详细地址',
                      _keys: ['creditUser2', 'birthAddress']
                    }, 2)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'matePostCode',
                      title: '户籍地邮编',
                      _keys: ['creditUser2', 'birthPostCode']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateCompanyName',
                      title: '工作单位名称',
                      _keys: ['creditUser2', 'companyName']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateCompanyAddress',
                      title: '工作单位地址',
                      _keys: ['creditUser2', 'companyAddress']
                    }, 4)}
                    {this.getInputCol({
                      field: 'mateCompanyContactNo',
                      title: '工作单位电话',
                      _keys: ['creditUser2', 'companyContactNo']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'mateAssetPdf',
                      title: '其他资料',
                      type: 'img',
                      _keys: ['creditUser2', 'mateAssetPdf']
                    }, 1)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="担保人信息" key="7">
                <Card style={{ marginTop: 16 }} title="担保人信息">
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'userName',
                      title: '姓名',
                      _keys: ['creditUser3', 'userName'],
                      readonly: true
                    }, 4)}
                    {this.getSelectCol({
                      field: 'guaRelation',
                      title: '与主贷人关系',
                      _keys: ['creditUser3', 'relation'],
                      keyName: 'dkey',
                      valueName: 'dvalue',
                      readonly: true
                    }, relationData, 4)}
                    {this.getInputCol({
                      field: 'guaMobile',
                      title: '手机号',
                      _keys: ['creditUser3', 'mobile'],
                      mobile: true,
                      readonly: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'guaIdNo',
                      title: '身份证号',
                      _keys: ['creditUser3', 'idNo'],
                      idCard: true,
                      readonly: true
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getSelectCol({
                      field: 'guaEducation',
                      title: '学历',
                      _keys: ['creditUser3', 'education']
                    }, educationData, 4)}
                    {this.getCitySelectCol({
                      field: 'guaBirthAddressProvince',
                      title: '户籍地',
                      _keys: ['creditUser3'],
                      cFields: ['birthAddressProvince', 'birthAddressCity', 'birthAddressArea']
                    }, 4)}
                    {this.getInputCol({
                      field: 'guaBirthAddress',
                      title: '详细地址',
                      _keys: ['creditUser3', 'birthAddress']
                    }, 2)}
                  </Row>
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'guaPostCode',
                      title: '户籍地邮编',
                      _keys: ['creditUser3', 'birthPostCode']
                    }, 4)}
                    {this.getInputCol({
                      field: 'guaCompanyName',
                      title: '工作单位名称',
                      _keys: ['creditUser3', 'companyName']
                    }, 4)}
                    {this.getInputCol({
                      field: 'guaCompanyAddress',
                      title: '工作单位地址',
                      _keys: ['creditUser3', 'companyAddress']
                    }, 4)}
                    {this.getInputCol({
                      field: 'guaCompanyContactNo',
                      title: '工作单位电话',
                      _keys: ['creditUser3', 'companyContactNo']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'guaAssetPdf',
                      title: '其他资料',
                      _keys: ['creditUser3', 'guaAssetPdf'],
                      type: 'img'
                    }, 1)}
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="流水信息" key="2" className='liushui'>
                <Card style={{ marginTop: 16 }} title="流水信息">
                  <Row gutter={54}>
                    {
                      this.getTableItem({
                        title: '流水信息',
                        field: 'creditJours',
                        options: lsOptions
                      })
                    }
                  </Row>
                </Card>
              </TabPane>
              <TabPane tab="抵押信息" key="8">
                <Card style={{ marginTop: 16 }} title="抵押信息">
                  <Row gutter={54}>
                    {this.getInputCol({
                      field: 'pledgeUser',
                      title: '代理人',
                      _keys: ['carPledge', 'pledgeUser']
                    }, 4)}
                    {this.getInputCol({
                      field: 'pledgeUserIdCard',
                      title: '代理人身份证号',
                      _keys: ['carPledge', 'pledgeUserIdCard'],
                      idCard: true
                    }, 4)}
                    {this.getInputCol({
                      field: 'pledgeAddress',
                      title: '抵押地点',
                      _keys: ['carPledge', 'pledgeAddress']
                    }, 4)}
                  </Row>
                  <Row gutter={54}>
                    {this.getFileCol({
                      field: 'pledgeUserIdCardFront',
                      title: '代理人身份证正面',
                      _keys: ['carPledge', 'pledgeUserIdCardFront'],
                      type: 'img'
                    }, 4)}
                    {this.getFileCol({
                      field: 'pledgeUserIdCardReverse',
                      title: '代理人身份证反面',
                      _keys: ['carPledge', 'pledgeUserIdCardReverse'],
                      type: 'img'
                    }, 4)}

                  </Row>
                </Card>
              </TabPane>
            </Tabs>
            <FormItem {...tailFormItemLayout} style={{marginTop: 20}}>
              <div>
                {
                  activeKey !== '0'
                    ? <Button style={{marginLeft: 20}} onClick={this.prevStep}>上一步</Button>
                    : null
                }
                <Button style={{marginLeft: 20}} type="primary" onClick={() => this.checkForm(0)}>保存当前页</Button>
                {
                  activeKey === '8'
                    ? <Button style={{marginLeft: 20}} type="primary" onClick={() => this.checkForm(1)}>提交</Button>
                    : null
                }
                <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
              </div>
            </FormItem>
          </Form>
        </Spin>
    );
  }
}

export default AdmittanceAddEdit;
