import React from 'react';
import { Form, Input, Select, Row, Col, Spin, Button, Tabs, Divider,
  Table, DatePicker, Card, Popconfirm, Icon, Tooltip } from 'antd';
import moment from 'moment';
import CUpload from 'component/cUpload/cUpload';
import CInput from 'component/cInput/cInput';
import CTextArea from 'component/cTextArea/cTextArea';
import { UPLOAD_URL, tailFormItemLayout } from 'common/js/config';
import { getQueryString, dateFormat, showSucMsg, showErrMsg, moneyFormat,
  showWarnMsg, formatFile, isUndefined, moneyParse, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
import { getDictList } from 'api/dict';
import { getQiniuToken } from 'api/general';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const ruleRequired = { required: true, message: '必填字段' };
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const col3Props = { xs: 32, sm: 24, md: 12, lg: 8 };
const col33Props = { xs: 32, sm: 24, md: 24, lg: 8 };
const DATE_FORMAT = 'YYYY-MM-DD';

// 是否垫资数据字典
const isAdvFundData = [{
  k: '0',
  v: '否'
}, {
  k: '1',
  v: '是'
}];

@Form.create()
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.bizType = getQueryString('bizType', this.props.location.search);
    this.loanBank = getQueryString('loanBank', this.props.location.search);
    this.isCheckCommissioner = !!getQueryString('isCheckCommissioner', this.props.location.search);
    this.isCheckDirector = !!getQueryString('isCheckDirector', this.props.location.search);
    this.isCheckRegionalManager = !!getQueryString('isCheckRegionalManager', this.props.location.search);
    this.isCheckNq = !!getQueryString('isCheckNq', this.props.location.search);
    this.wanFactor = 0;

    this.state = {
      fetching: true,
      token: '',
      bizTypeData: [],
      loanPeriodData: [],
      loanProductData: [],
      regionData: [],
      carTypeData: [],
      genderData: [],
      marryStateData: [],
      educationData: [],
      addressData: [],
      pageData: {}
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'budget_orde_biz_typer' }),
      getDictList({ parentKey: 'loan_period' }),
      fetch(632177, { status: '2', type: this.bizType, loanBank: this.loanBank }),
      getDictList({ parentKey: 'region' }),
      getDictList({ parentKey: 'car_type' }),
      getDictList({ parentKey: 'gender' }),
      getDictList({ parentKey: 'marry_state' }),
      getDictList({ parentKey: 'education' }),
      getDictList({ parentKey: 'is_card_mail_address' }),
      getQiniuToken(),
      fetch(632146, { code: this.code })
    ]).then(([bizTypeData, loanPeriodData, loanProductData, regionData,
      carTypeData, genderData, marryStateData, educationData, uploadToken,
      addressData, pageData]) => {
      this.setState({
        bizTypeData,
        loanPeriodData,
        loanProductData,
        regionData,
        carTypeData,
        genderData,
        marryStateData,
        educationData,
        pageData,
        token: uploadToken.uploadToken,
        fetching: false
      });
    }).catch(() => this.setState({fetching: false}));
  }
  getColProps(split) {
    return split === 3 ? col3Props : split === 33 ? col33Props : split === 1 ? {} : col2Props;
  }
  getRules(rules) {
    let defaultRules = {
      required: true
    };
    rules = {...defaultRules, ...rules};
    let result = [];
    rules.required && result.push(ruleRequired);
    return result;
  }
  // 获取输入框类型的控件
  getInputCol({ key, label, onChange, split = 3, readonly = false,
    rules = {}, hidden = false }) {
    let colProps = this.getColProps(split);
    rules = this.getRules(rules);
    const props = {
      keyName: key,
      rules,
      label,
      readonly,
      onChange,
      hidden,
      getFieldDecorator: this.props.form.getFieldDecorator,
      pageData: this.state.pageData
    };
    return (
      <Col {...colProps}>
        <CInput {...props} />
      </Col>
    );
  }
  // 获取选择框类型的控件
  getSelectCol(key, label, keyName, valueName, data, changeFunc, split = 3, multiple = false, readonly = false, rules = {}) {
    let colProps = this.getColProps(split);
    rules = this.getRules(rules);
    const props = {
      mode: multiple ? 'multiple' : '',
      showSearch: true,
      allowClear: true,
      optionFilterProp: 'children',
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      style: {width: '100%'},
      placeholder: '请选择'
    };
    if (changeFunc) {
      props.onChange = (v) => {
        changeFunc(v, data);
      };
    }
    let initVal = this.state.pageData[key];
    if (readonly && data.length) {
      let result = data.find(v => v[keyName] === initVal);
      initVal = result ? result[valueName] : initVal;
    }
    return (
      <Col {...colProps}>
        {<FormItem label={label}>
          {
            readonly ? <div className="readonly-text">{initVal}</div>
              : this.props.form.getFieldDecorator(key, {
                rules,
                initialValue: initVal
              })(
                <Select {...props}>
                  {data.length ? data.map(d => <Option key={d[keyName]} value={d[keyName]}>{d[valueName]}</Option>) : null}
                </Select>
              )
          }
        </FormItem>}
      </Col>
    );
  }
  // 获取文件图片上传类型的控件
  getFileCol({ key, label, accept, split = 3, isImg = true,
    isSingle, readonly = false, rules = {}, onChange, hidden = false }) {
    let colProps = this.getColProps(split);
    rules = this.getRules(rules);
    const props = {
      keyName: key,
      rules,
      isImg,
      label,
      accept,
      hidden,
      readonly,
      isSingle,
      onChange,
      getFieldValue: this.props.form.getFieldValue,
      getFieldDecorator: this.props.form.getFieldDecorator,
      pageData: this.state.pageData,
      token: this.state.token,
      isLoaded: !this.code || !this.state.fetching
    };
    return (
      <Col {...colProps}>
        <CUpload {...props} />
      </Col>
    );
  }
  // 获取textarea的控件
  getTextAreaCol({ key, label, onChange, split = 3, readonly = false,
    rules = {}, hidden = false }) {
    let colProps = this.getColProps(split);
    rules = this.getRules(rules);
    const props = {
      keyName: key,
      rules,
      label,
      readonly,
      onChange,
      hidden,
      getFieldDecorator: this.props.form.getFieldDecorator,
      pageData: this.state.pageData
    };
    return (
      <Col {...colProps}>
        <CTextArea {...props} />
      </Col>
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(err, values);
    });
  }
  invoicePriceChange = () => {}
  firstAmountChange = () => {}
  loanAmountChange = () => {}
  render() {
    const { bizTypeData, loanPeriodData, loanProductData, regionData,
      carTypeData, genderData, marryStateData, educationData, addressData } = this.state;
    let readonly = false;
    return (
      <Spin spinning={this.state.fetching}>
        <Form onSubmit={this.handleSubmit}>
          <Card title="贷款信息">
            <Row gutter={54}>
              {this.getSelectCol('bizType', '业务种类', 'dkey', 'dvalue', bizTypeData, null, 3, false, true)}
              {this.getSelectCol('loanPeriod', '贷款期限', 'dkey', 'dvalue', loanPeriodData)}
              {this.getSelectCol('isAdvanceFund', '是否垫资', 'k', 'v', isAdvFundData, null, 33)}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol('loanProductCode', '贷款产品', 'code', 'name', loanProductData, this.loanProductChange, 2)}
              {this.getSelectCol('region', '所属区域', 'dkey', 'dvalue', regionData, null, 2)}
            </Row>
          </Card>
          <Card style={{ marginTop: 16 }} title="拟购车辆信息">
            <Row gutter={54}>
              {this.getInputCol({ key: 'invoiceCompany', label: '开票单位' })}
              {this.getInputCol({ key: 'invoicePrice', label: '开票价(元)', onChange: this.invoicePriceChange, rules: {amount: true} })}
              {this.getInputCol({ key: 'originalPrice', label: '市场指导价(元)', split: 33, rules: {amount: true} })}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ key: 'firstAmount', label: '首付金额(元)', onChange: this.firstAmountChange, rules: {amount: true} })}
              {this.getInputCol({ key: 'firstRate', label: '首付比例(%)' })}
              {this.getInputCol({ key: 'loanAmount', label: '贷款额(元)', onChange: this.loanAmountChange, split: 33, rules: {amount: true} })}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ key: 'monthDeposit', label: '月供(元)', split: 2, rules: {amount: true} })}
              {this.getInputCol({ key: 'teamFee', label: '服务费(元)', split: 2, rules: {amount: true} })}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ key: 'carBrand', label: '车辆品牌', split: 2 })}
              {this.getInputCol({ key: 'carSeries', label: '详细配置', split: 2 })}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol('carType', '车辆类型', 'dkey', 'dvalue', carTypeData, null, 2)}
              {this.getInputCol({ key: 'carColor', label: '颜色', split: 2 })}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ key: 'carModel', label: '车辆型号' })}
              {this.getInputCol({ key: 'carFrameNo', label: '车架号' })}
              {this.getInputCol({ key: 'carEngineNo', label: '发动机号', split: 33 })}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ key: 'settleAddress', label: '落户地点', split: 1 })}
            </Row>
            <Row gutter={54}>
              {this.getFileCol({ key: 'carPic', label: '车辆照片', split: 2, readonly })}
              {this.getFileCol({ key: 'carHgzPic', label: this.bizType === '1' ? '绿大本' : '合格证照片', split: 2, readonly })}
            </Row>
            <Row gutter={54}>
              {this.getFileCol({ key: 'driveLicenseFront', label: '行驶证正面', split: 2, hidden: this.bizType !== '1', readonly })}
              {this.getFileCol({ key: 'driveLicenseReverse', label: '行驶证反面', split: 2, hidden: this.bizType !== '1', readonly })}
            </Row>
            <Row gutter={54}>
              {this.getTextAreaCol({ key: 'evaluateColumn', label: '评估栏', split: 1, hidden: this.bizType !== '1', readonly })}
            </Row>
          </Card>
          <Card style={{ marginTop: 16 }} title="申请人信息">
            <Row gutter={54}>
              {this.getInputCol({ key: 'applyUserName', label: '姓名', readonly: true })}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol('gender', '性别', 'dkey', 'dvalue', genderData)}
              {this.getInputCol({ key: 'age', label: '年龄', rules: {amount: true, number: true, positive: true, required: true} })}
              {this.getInputCol({ key: 'idNo', label: '身份证号', split: 33, rules: {idCard: true, required: true} })}
            </Row>
            <Row gutter={54}>
              {this.getSelectCol('marryState', '婚姻状况', 'dkey', 'dvalue', marryStateData)}
              {this.getInputCol({ key: 'nation', label: '民族' })}
              {this.getSelectCol('education', '学历', 'dkey', 'dvalue', educationData, null, 33)}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ key: 'political', label: '政治面貌' })}
              {this.getInputCol({ key: 'familyNumber', label: '家庭人口' })}
              {this.getInputCol({ key: 'mobile', label: '联系电话', split: 33, rules: {mobile: true, required: true} })}
            </Row>
            <Row gutter={54}>
              {this.getInputCol({ key: 'nowAddress', label: '现居住地址' })}
              {this.getInputCol({ key: 'postCode1', label: '现居住地址邮编' })}
              {this.getSelectCol('isCardMailAddress', '是否卡邮寄地址', 'dkey', 'dvalue', addressData, null, 33)}
            </Row>
          </Card>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form>
      </Spin>
    );
  }
}

export default Demo;
