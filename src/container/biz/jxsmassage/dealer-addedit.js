import React from 'react';
import { Form, Input, Select, Row, Col, Spin, Button, Tabs, Divider,
  Table, DatePicker, Card, Popconfirm, Icon, Upload, Tooltip } from 'antd';
import moment from 'moment';
import { UPLOAD_URL, tailFormItemLayout } from 'common/js/config';
import { getQueryString, dateFormat, showSucMsg, showErrMsg, moneyFormat,
  showWarnMsg, formatFile, isUndefined, moneyParse, getUserId } from 'common/js/util';
import fetch from 'common/js/fetch';
import { getJxsDetail, getBankList } from 'api/biz';
import { getCompanyList } from 'api/company';
import { getDictList } from 'api/dict';
import { getQiniuToken } from 'api/general';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const fileUploadBtn = (
  <Button><Icon type="upload"/> 上传</Button>
);
const ruleRequired = {
  required: true,
  message: '必填字段'
};
const col2Props = { xs: 32, sm: 24, md: 12, lg: 12 };
const col3Props = { xs: 32, sm: 24, md: 12, lg: 8 };
const col33Props = { xs: 32, sm: 24, md: 24, lg: 8 };
const DATE_FORMAT = 'YYYY-MM-DD';
const feeTypeList = (
  <Select>
    <Option value="1" >固定金额</Option>
    <Option value="2" >百分比</Option>
  </Select>
);
const insuAgencyList = (
  <Select>
    <Option value='1'>平台</Option>
    <Option value='2'>车行</Option>
  </Select>
);
const feeTypeDict = {
  '1': '固定金额',
  '2': '百分比'
};
const insuAgencyDict = {
  '1': '平台',
  '2': '车行'
};
const tfDict = {
  '0': '否',
  '1': '是'
};
const jyxzDict = {
  '0': '综合店',
  '1': '4S店'
};
const yxDict = {
  '0': '注销',
  '1': '正常'
};
const comFields = ['platCtRate12', 'platZkRate12', 'platCtRate24', 'platZkRate24',
  'platCtRate36', 'platZkRate36', 'assureType', 'assureFee', 'dzType',
  'dzFee', 'lyAmountType', 'lyAmountFee', 'gpsType', 'gpsFee', 'otherType',
  'otherFee', 'introduceType', 'introduceFee', 'returnPointType', 'returnPointFee',
  'isDz', 'insuAgencyYear1Type', 'insuAgencyYear2Type', 'insuAgencyYear3Type'];
const fieldsMap = {
  'tab1': comFields.map(v => v + '_tab1'),
  'tab2': comFields.map(v => v + '_tab2'),
  'tab3': comFields.map(v => v + '_tab3')
};
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'select') {
      return (
        <Select style={{minWidth: 160}}>
          {this.props.banklist.map(b => (
            <Option value={b.bankCode} key={b.bankCode}>{b.bankName}</Option>
          ))}
        </Select>
      );
    }
    return <Input placeholder={this.props.placeholder}/>;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入 ${title}!`
                    }],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class DealerAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.check = !!getQueryString('check', this.props.location.search);
    this.state = {
      gsData: [],
      zhData: [],
      jhData: [],
      tabKey: 'tab1',
      editingCode: '',
      fetching: false,
      pageData: {},
      compList: [],
      settleWayList: [],
      banklist: [],
      token: '',
      loaded: false
    };
    const columns = [{
      title: '户名',
      dataIndex: 'realName',
      editable: true
    }, {
      title: '开户行',
      dataIndex: 'bankCode',
      render: (v) => {
        let bank = this.state.banklist.find(b => b.bankCode === v);
        return bank ? bank.bankName : '';
      },
      editable: true
    }, {
      title: '开户支行',
      dataIndex: 'subbranch',
      editable: true
    }, {
      title: '账号',
      dataIndex: 'bankcardNumber',
      editable: true
    }, {
      title: '返点比例',
      dataIndex: 'pointRate',
      editable: true
    }];

    if (!this.view) {
      this.gsColumns = [...columns, this.getOperator('gsData')];
      this.zhColumns = [...columns, this.getOperator('zhData')];
      this.jhColumns = [...columns, this.getOperator('jhData')];
    } else {
      this.gsColumns = columns;
      this.zhColumns = columns;
      this.jhColumns = columns;
    }
  }
  getOperator(tab) {
    return {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a href="javascript:;"
                      onClick={() => this.save(form, record.code, tab)}
                    >保存</a>
                  )}
                </EditableContext.Consumer>
                <Divider type="vertical" />
                <Popconfirm
                  cancelText='取消'
                  okText='确定'
                  title='确定取消吗?'
                  onConfirm={() => this.cancel(record.code, tab)}
                >
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
              <span>
                <a onClick={() => this.edit(record.code)}>修改</a>
                <Divider type="vertical" />
                <Popconfirm
                  cancelText='取消'
                  okText='确定'
                  title='确定删除吗?'
                  onConfirm={() => this.delete(record.code, tab)}
                ><a>删除</a></Popconfirm>
              </span>
            )}
          </div>
        );
      }
    };
  }
  componentDidMount() {
    if (this.code) {
      this.doFetching();
      getJxsDetail(this.code).then((data) => {
        data.agreementValidDate = this.getRangeDateVal(data);
        let bankCard = data.jxsCollectBankcardList[0];
        if (bankCard) {
          data.bankCode = bankCard.bankCode;
          data.subbranch = bankCard.subbranch;
          data.realName = bankCard.realName;
          data.bankcardNumber = bankCard.bankcardNumber;
        }
        if (data.carDealerProtocolList.length) {
          this.getCollectBankcardList('ICBC', 'tab1', data);
          this.getCollectBankcardList('BOC', 'tab2', data);
          this.getCollectBankcardList('CCB', 'tab3', data);
        }
        this.setState({
          pageData: data,
          gsData: data.gsCollectBankcardList || [],
          zhData: data.zhCollectBankcardList || [],
          jhData: data.jhCollectBankcardList || [],
          fetching: false,
          loaded: true
        });
      }).catch(this.cancelFetching);
    }
    // 获取7牛上传token
    getQiniuToken().then((data) => {
      this.setState({ token: data.uploadToken });
    }).catch(() => {});
    // 获取公司列表
    getCompanyList().then((data) => {
      this.setState({ compList: data });
    }).catch(() => {});
    // 获取结算方式列表
    getDictList({ parentKey: 'settle_way' }).then((data) => {
      console.log('1111');
      console.log(data);
      this.setState({ settleWayList: data });
    }).catch(() => {});
    // 获取银行列表
    getBankList().then((banklist) => {
      this.setState({ banklist });
    }).catch(() => {});
  }
  getCollectBankcardList(key, tab, data) {
    let obj = data.carDealerProtocolList.find(v => v.bankCode === key);
    if (obj) {
      const fields1 = ['platCtRate12', 'platZkRate12', 'platCtRate24', 'platZkRate24',
        'platCtRate36', 'platZkRate36', 'insuAgencyYear1Type', 'insuAgencyYear2Type',
        'insuAgencyYear3Type', 'isDz', 'assureType', 'dzType', 'lyAmountType', 'gpsType',
        'otherType', 'introduceType', 'returnPointType'];
      fields1.forEach(f => {
        data[f + '_' + tab] = obj[f];
      });
      data['assureFee_' + tab] = obj.assureFee || (!isUndefined(obj.assureRate) && (obj.assureRate * 100).toFixed(2)) || '';
      data['dzFee_' + tab] = obj.dzFee || (!isUndefined(obj.dzRate) && (obj.dzRate * 100).toFixed(2)) || '';
      data['lyAmountFee_' + tab] = obj.lyAmountFee || (!isUndefined(obj.lyAmountRate) && (obj.lyAmountRate * 100).toFixed(2)) || '';
      data['gpsFee_' + tab] = obj.gpsFee || (!isUndefined(obj.gpsRate) && (obj.gpsRate * 100).toFixed(2)) || '';
      data['otherFee_' + tab] = obj.otherFee || (!isUndefined(obj.otherRate) && (obj.otherRate * 100).toFixed(2)) || '';
      data['introduceFee_' + tab] = obj.introduceFee || (!isUndefined(obj.introduceRate) && (obj.introduceRate * 100).toFixed(2)) || '';
      data['returnPointFee_' + tab] = obj.returnPointFee || (!isUndefined(obj.returnPointRate) && (obj.returnPointRate * 100).toFixed(2)) || '';
    }
  }
  // 新增table的tr
  handleAdd = (code) => {
    const data = this.state[code];
    const newData = {
      code: new Date().getTime(),
      realName: '',
      bankCode: '',
      subbranch: '',
      bankcardNumber: '',
      pointRate: ''
    };
    this.setState({
      [code]: [...data, newData],
      editingCode: newData.code
    });
  }
  getTipLabel(title) {
    return (
      <span>
        {title}
        <Tooltip title='请输入0~1之间的小数'>
          <Icon type="question-circle-o"/>
        </Tooltip>
      </span>
    );
  }
  // 获取tab的内容
  getTabComp(key) {
    const { pageData } = this.state;
    let fields = fieldsMap[key];
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title='我司基准利率' type='inner'>
          <Row gutter={54}>
            <Col {...col2Props}>
              <FormItem label={this.getTipLabel('12期传统利率')}>
                {
                  this.view ? <div className="readonly-text">{pageData[fields[0]]}</div>
                    : getFieldDecorator(fields[0], {
                      rules: [ruleRequired],
                      initialValue: pageData[fields[0]]
                    })(<Input />)
                }
              </FormItem>
            </Col>
            <Col {...col2Props}>
              <FormItem label={this.getTipLabel('12期直客利率')}>
                {
                  this.view ? <div className="readonly-text">{pageData[fields[1]]}</div>
                    : getFieldDecorator(fields[1], {
                      rules: [ruleRequired],
                      initialValue: pageData[fields[1]]
                    })(<Input />)
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={54}>
            <Col {...col2Props}>
              <FormItem label={this.getTipLabel('24期传统利率')}>
                {
                  this.view ? <div className="readonly-text">{pageData[fields[2]]}</div>
                    : getFieldDecorator(fields[2], {
                      rules: [ruleRequired],
                      initialValue: pageData[fields[2]]
                    })(<Input />)
                }
              </FormItem>
            </Col>
            <Col {...col2Props}>
              <FormItem label={this.getTipLabel('24期直客利率')}>
                {
                  this.view ? <div className="readonly-text">{pageData[fields[3]]}</div>
                    : getFieldDecorator(fields[3], {
                      rules: [ruleRequired],
                      initialValue: pageData[fields[3]]
                    })(<Input />)
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={54}>
            <Col {...col2Props}>
              <FormItem label={this.getTipLabel('36期传统利率')}>
                {
                  this.view ? <div className="readonly-text">{pageData[fields[4]]}</div>
                    : getFieldDecorator(fields[4], {
                      rules: [ruleRequired],
                      initialValue: pageData[fields[4]]
                    })(<Input />)
                }
              </FormItem>
            </Col>
            <Col {...col2Props}>
              <FormItem label={this.getTipLabel('36期直客利率')}>
                {
                  this.view ? <div className="readonly-text">{pageData[fields[5]]}</div>
                    : getFieldDecorator(fields[5], {
                      rules: [ruleRequired],
                      initialValue: pageData[fields[5]]
                    })(<Input />)
                }
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title='其他费用' type='inner' style={{ marginTop: 16 }}>
          <Row gutter={54}>
            <Col {...col2Props}>
              <FormItem label="担保费">
                <Row gutter={8}>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{feeTypeDict[pageData[fields[6]]] || ''}</div>
                        : getFieldDecorator(fields[6], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[6]]
                        })(feeTypeList)
                    }
                  </Col>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{pageData[fields[6]] === '1' ? moneyFormat(pageData[fields[7]]) : pageData[fields[7]]}</div>
                        : getFieldDecorator(fields[7], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[6]] === '1' ? moneyFormat(pageData[fields[7]]) : pageData[fields[7]]
                        })(<Input />)
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
            <Col {...col2Props}>
              <FormItem label="垫资费">
                <Row gutter={8}>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{feeTypeDict[pageData[fields[8]]] || ''}</div>
                        : getFieldDecorator(fields[8], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[8]]
                        })(feeTypeList)
                    }
                  </Col>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{pageData[fields[8]] === '1' ? moneyFormat(pageData[fields[9]]) : pageData[fields[9]]}</div>
                        : getFieldDecorator(fields[9], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[8]] === '1' ? moneyFormat(pageData[fields[9]]) : pageData[fields[9]]
                        })(<Input />)
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={54}>
            <Col {...col2Props}>
              <FormItem label="履约保证金">
                <Row gutter={8}>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{feeTypeDict[pageData[fields[10]]] || ''}</div>
                        : getFieldDecorator(fields[10], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[10]]
                        })(feeTypeList)
                    }
                  </Col>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{pageData[fields[10]] === '1' ? moneyFormat(pageData[fields[11]]) : pageData[fields[11]]}</div>
                        : getFieldDecorator(fields[11], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[10]] === '1' ? moneyFormat(pageData[fields[11]]) : pageData[fields[11]]
                        })(<Input />)
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
            <Col {...col2Props}>
              <FormItem label="GPS">
                <Row gutter={8}>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{feeTypeDict[pageData[fields[12]]] || ''}</div>
                        : getFieldDecorator(fields[12], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[12]]
                        })(feeTypeList)
                    }
                  </Col>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{pageData[fields[12]] === '1' ? moneyFormat(pageData[fields[13]]) : pageData[fields[13]]}</div>
                        : getFieldDecorator(fields[13], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[12]] === '1' ? moneyFormat(pageData[fields[13]]) : pageData[fields[13]]
                        })(<Input />)
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={54}>
            <Col {...col2Props}>
              <FormItem label="杂费">
                <Row gutter={8}>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{feeTypeDict[pageData[fields[14]]] || ''}</div>
                        : getFieldDecorator(fields[14], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[14]]
                        })(feeTypeList)
                    }
                  </Col>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{pageData[fields[14]] === '1' ? moneyFormat(pageData[fields[15]]) : pageData[fields[15]]}</div>
                        : getFieldDecorator(fields[15], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[14]] === '1' ? moneyFormat(pageData[fields[15]]) : pageData[fields[15]]
                        })(<Input />)
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
            <Col {...col2Props}>
              <FormItem label="介绍费">
                <Row gutter={8}>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{feeTypeDict[pageData[fields[16]]] || ''}</div>
                        : getFieldDecorator(fields[16], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[16]]
                        })(feeTypeList)
                    }
                  </Col>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{pageData[fields[16]] === '1' ? moneyFormat(pageData[fields[17]]) : pageData[fields[17]]}</div>
                        : getFieldDecorator(fields[17], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[16]] === '1' ? moneyFormat(pageData[fields[17]]) : pageData[fields[17]]
                        })(<Input />)
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={54}>
            <Col {...col2Props}>
              <FormItem label="返点税点">
                <Row gutter={8}>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{feeTypeDict[pageData[fields[18]]] || ''}</div>
                        : getFieldDecorator(fields[18], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[18]]
                        })(feeTypeList)
                    }
                  </Col>
                  <Col span={12}>
                    {
                      this.view ? <div className="readonly-text">{pageData[fields[18]] === '1' ? moneyFormat(pageData[fields[19]]) : pageData[fields[19]]}</div>
                        : getFieldDecorator(fields[19], {
                          rules: [ruleRequired],
                          initialValue: pageData[fields[18]] === '1' ? moneyFormat(pageData[fields[19]]) : pageData[fields[19]]
                        })(<Input />)
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
            <Col {...col2Props}>
              <FormItem label="是否垫资">
                {
                  this.view ? <div className="readonly-text">{tfDict[pageData[fields[20]]] || ''}</div>
                    : getFieldDecorator(fields[20], {
                      rules: [ruleRequired],
                      initialValue: pageData[fields[20]]
                    })(
                      <Select>
                        <Option value='1'>是</Option>
                        <Option value='0'>否</Option>
                      </Select>
                    )
                }
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card title='保险代理费' type='inner' style={{ marginTop: 16 }}>
          <Row gutter={54}>
            <Col {...col3Props}>
              <FormItem label="1年">
                {
                  this.view ? <div className="readonly-text">{insuAgencyDict[pageData[fields[21]]] || ''}</div>
                    : getFieldDecorator(fields[21], {
                      initialValue: pageData[fields[21]]
                    })(insuAgencyList)
                }
              </FormItem>
            </Col>
            <Col {...col3Props}>
              <FormItem label="2年">
                {
                  this.view ? <div className="readonly-text">{insuAgencyDict[pageData[fields[22]]] || ''}</div>
                    : getFieldDecorator(fields[22], {
                      initialValue: pageData[fields[22]]
                    })(insuAgencyList)
                }
              </FormItem>
            </Col>
            <Col {...col3Props}>
              <FormItem label="3年">
                {
                  this.view ? <div className="readonly-text">{insuAgencyDict[pageData[fields[23]]] || ''}</div>
                    : getFieldDecorator(fields[23], {
                      initialValue: pageData[fields[23]]
                    })(insuAgencyList)
                }
              </FormItem>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
  // 获取合作协议有效期的值
  getRangeDateVal(pageData) {
    let start = pageData.agreementValidDateStart;
    let end = pageData.agreementValidDateStart;
    if (this.view) {
      return start ? dateFormat(start, DATE_FORMAT) + '~' + dateFormat(end, DATE_FORMAT) : null;
    }
    return start ? [moment(dateFormat(start), DATE_FORMAT), moment(dateFormat(end), DATE_FORMAT)] : null;
  }
  // 返点账号当前行是否可修改
  isEditing = (record) => {
    return record.code === this.state.editingCode;
  }
  // 点击删除返点账号
  delete(code, tab) {
    const data = [...this.state[tab]];
    this.setState({ [tab]: data.filter(item => item.code !== code) });
  }
  // 点击修改返点账号
  edit(code) {
    this.setState({ editingCode: code });
  }
  // 保存返点账号修改
  save(form, code, tab) {
    form.validateFields((error, row) => {
      if (error) {
        console.log(error);
        return;
      }
      const newData = [...this.state[tab]];
      const index = newData.findIndex(item => code === item.code);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ [tab]: newData, editingCode: '' });
      } else {
        newData.push(row);
        this.setState({ [tab]: newData, editingCode: '' });
      }
    });
  }
  // 取消返点账号修改
  cancel = () => {
    this.setState({ editingCode: '' });
  };
  // 工行、建行、中行切换
  onTabChange = (code) => {
    this.setState({ tabKey: code });
  }
  // 返回
  back = () => {
    this.props.history.go(-1);
  }
  // 审核
  handleCheck(auditResult) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.code = this.code;
        values.auditor = getUserId();
        values.auditResult = auditResult;
        this.doFetching();
        fetch(632063, values).then((data) => {
          showSucMsg('操作成功');
          this.cancelFetching();
          setTimeout(() => {
            this.back();
          }, 1000);
        }).catch(this.cancelFetching);
      }
    });
  }
  // 保存经销商协议
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = this.beforeSubmit(values);
        if (params) {
          let code = 632060;
          if (this.code) {
            code = 632062;
            params.code = this.code;
          } else {
            params.operator = getUserId();
          }
          this.doFetching();
          fetch(code, params).then((data) => {
            showSucMsg('操作成功');
            this.cancelFetching();
            setTimeout(() => {
              this.back();
            }, 1000);
          }).catch(this.cancelFetching);
        }
      }
    });
  }
  // 拼接参数
  beforeSubmit(values) {
    let params = {};
    // 协议政策
    let carDealerProtocolList = this.getProtocols(values);
    if (!carDealerProtocolList) return;
    params.carDealerProtocolList = carDealerProtocolList;
    // 基本信息
    this.getNormalInfo(values, params);
    // // 收款账号
    // this.getAccountInfo(values, params);
    // 返点账号
    // const { gsData, zhData, jhData } = this.state;
    // if (!gsData.length || !zhData.length || !jhData.length) {
    //   showWarnMsg('三家银行的返点账号未填写全');
    //   return;
    // }
    // this.getFdInfo(values, params);
    // // 车商合作协议
    // if (params.agreementPic.push) {
    //   let str = '';
    //   params.agreementPic.forEach(v => str += v.key);
    //   params.agreementPic = str;
    // }
    return params;
  }
  // 返点账号
  getFdInfo(values, params) {
    params.gsCollectBankcardList = this.state.gsData;
    params.zhCollectBankcardList = this.state.zhData;
    params.jhCollectBankcardList = this.state.jhData;
  }
  // 收款账号
  getAccountInfo(values, params) {
    params.jxsCollectBankcardList = [{
      bankCode: values.bankCode,
      bankcardNumber: values.bankcardNumber,
      realName: values.realName,
      subbranch: values.subbranch
    }];
  }
  // 获取协议政策
  getProtocols(values) {
    let carDealerProtocolList = [];
    let protocol = this.getTabProtocol(values, 'tab1');
    if (!protocol.flag) return;
    carDealerProtocolList.push(protocol.obj);
    protocol = this.getTabProtocol(values, 'tab2');
    if (!protocol.flag) return;
    carDealerProtocolList.push(protocol.obj);
    protocol = this.getTabProtocol(values, 'tab3');
    if (!protocol.flag) return;
    carDealerProtocolList.push(protocol.obj);
    return carDealerProtocolList;
  }
  // 获取政策
  getTabProtocol(values, tab) {
    let map = {
      'tab1': '工行',
      'tab2': '中行',
      'tab3': '建行'
    };
    let result = {
      obj: {},
      flag: true
    };
    if (values['assureType_' + tab]) {
      if (isUndefined(values['assureFee_' + tab])) {
        showWarnMsg(map[tab] + '担保费不能为空');
        result.flag = false;
        return result;
      }
      result.obj['assureType'] = values['assureType_' + tab];
      if (values['assureType_' + tab] === '1') {
        result.obj['assureFee'] = moneyParse(values['assureFee_' + tab]);
      } else {
        result.obj['assureRate'] = (values['assureFee_' + tab] / 100).toFixed(2);
      }
    }
    if (values['dzType_' + tab]) {
      if (isUndefined(values['dzFee_' + tab])) {
        showWarnMsg(map[tab] + '垫资费不能为空');
        result.flag = false;
        return result;
      }
      result.obj['dzType'] = values['dzType_' + tab];
      if (values['dzType_' + tab] === '1') {
        result.obj['dzFee'] = moneyParse(values['dzFee_' + tab]);
      } else {
        result.obj['dzRate'] = (values['dzFee_' + tab] / 100).toFixed(2);
      }
    }
    if (values['lyAmountType_' + tab]) {
      if (isUndefined(values['lyAmountFee_' + tab])) {
        showWarnMsg(map[tab] + '履约保证金不能为空');
        result.flag = false;
        return result;
      }
      result.obj['lyAmountType'] = values['lyAmountType_' + tab];
      if (values['lyAmountType_' + tab] === '1') {
        result.obj['lyAmountFee'] = moneyParse(values['lyAmountFee_' + tab]);
      } else {
        result.obj['lyAmountRate'] = (values['lyAmountFee_' + tab] / 100).toFixed(2);
      }
    }
    if (values['gpsType_' + tab]) {
      if (isUndefined(values['gpsFee_' + tab])) {
        showWarnMsg(map[tab] + 'GPS费不能为空');
        result.flag = false;
        return result;
      }
      result.obj['gpsType'] = values['gpsType_' + tab];
      if (values['gpsType_' + tab] === '1') {
        result.obj['gpsFee'] = moneyParse(values['gpsFee_' + tab]);
      } else {
        result.obj['gpsRate'] = (values['gpsFee_' + tab] / 100).toFixed(2);
      }
    }
    if (values['otherType_' + tab]) {
      if (isUndefined(values['otherFee_' + tab])) {
        showWarnMsg(map[tab] + '杂费不能为空');
        result.flag = false;
        return result;
      }
      result.obj['otherType'] = values['otherType_' + tab];
      if (values['otherType_' + tab] === '1') {
        result.obj['otherFee'] = moneyParse(values['otherFee_' + tab]);
      } else {
        result.obj['otherRate'] = (values['otherFee_' + tab] / 100).toFixed(2);
      }
    }
    if (values['introduceType_' + tab]) {
      if (isUndefined(values['introduceFee_' + tab])) {
        showWarnMsg(map[tab] + '介绍费不能为空');
        result.flag = false;
        return result;
      }
      result.obj['introduceType'] = values['introduceType_' + tab];
      if (values['introduceType_' + tab] === '1') {
        result.obj['introduceFee'] = moneyParse(values['introduceFee_' + tab]);
      } else {
        result.obj['introduceRate'] = (values['introduceFee_' + tab] / 100).toFixed(2);
      }
    }
    if (values['returnPointType_' + tab]) {
      if (isUndefined(values['returnPointFee_' + tab])) {
        showWarnMsg(map[tab] + '返点税点不能为空');
        result.flag = false;
        return result;
      }
      result.obj['returnPointType'] = values['returnPointType_' + tab];
      if (values['returnPointType_' + tab] === '1') {
        result.obj['returnPointFee'] = moneyParse(values['returnPointFee_' + tab]);
      } else {
        result.obj['returnPointRate'] = (values['returnPointFee_' + tab] / 100).toFixed(2);
      }
    }
    ['isDz', 'platCtRate12', 'platCtRate24', 'platCtRate36', 'platZkRate12',
      'platZkRate24', 'platZkRate36', 'insuAgencyYear1Type', 'insuAgencyYear2Type',
      'insuAgencyYear3Type'].forEach(v => {
      result.obj[v] = values[v + '_' + tab];
    });
    result.obj.bankCode = tab === 'tab1' ? 'ICBC' : tab === 'tab2' ? 'BOC' : 'CCB';
    return result;
  }
  // 获取基本信息
  getNormalInfo(values, params) {
    params.fullName = values.fullName;
    params.abbrName = values.abbrName;
    params.isSelfDevelop = values.isSelfDevelop;
    params.address = values.address;
    params.carDealerType = values.carDealerType;
    params.mainBrand = values.mainBrand;
    params.mainContact = values.mainContact;
    params.contactPhone = values.contactPhone;
    params.parentGroup = values.parentGroup;
    params.agreementStatus = values.agreementStatus;
    params.settleWay = values.settleWay;
    params.agreementPic = values.agreementPic;
    params.belongBranchCompany = values.belongBranchCompany;
    params.businessArea = values.businessArea;
    params.remark = values.remark;
    let bDate = values.agreementValidDateStart;
    params.agreementValidDateStart = bDate[0].format(DATE_FORMAT);
    params.agreementValidDateEnd = bDate[1].format(DATE_FORMAT);
  }
  // 显示loading
  doFetching() {
    this.setState({ fetching: true });
  }
  // 隐藏loading
  cancelFetching = () => {
    this.setState({ fetching: false });
  }
  // 获取文件上传后的key
  normFile = (e) => {
    if (e) {
      return e.fileList.map(v => {
        if (v.status === 'done') {
          return v.key || v.response.key;
        } else if (v.status === 'error') {
          showErrMsg('文件上传失败');
        }
        return '';
      }).filter(v => v).join('||');
    }
    return '';
  }
  // 获取文件上传的属性
  getUploadProps(initValue) {
    return {
      action: UPLOAD_URL,
      multiple: true,
      defaultFileList: initValue,
      data: { token: this.state.token },
      showUploadList: {
        showPreviewIcon: true,
        showRemoveIcon: !this.view
      },
      onChange: ({ fileList }) => this.setUploadFileUrl(fileList),
      onPreview: this.handleFilePreview
    };
  }
  // 格式化文件的url
  setUploadFileUrl(fileList) {
    fileList.forEach(f => {
      if (!f.url && f.status === 'done' && f.response) {
        f.url = formatFile(f.response.key);
      }
    });
  }
  // 预览文件
  handleFilePreview = (file) => {
    if (file.status === 'done') {
      let key = file.key || (file.response && file.response.key) || '';
      window.open(formatFile(key), true);
    } else {
      let msg = file.status === 'uploading' ? '文件还未上传完成' : '文件上传失败';
      showErrMsg(msg);
    }
  }
  // 获取文件上传的初始值
  getFileInitVal() {
    const { token } = this.state;
    let initVal = this.state.pageData.agreementPic;
    let initValue = [];
    if (initVal) {
      initValue = initVal.split('||').map(key => ({
        key,
        uid: key,
        name: key,
        status: 'done',
        url: formatFile(key),
        thumbUrl: formatFile(key)
      }));
    }
    return initValue;
  }
  getColumns(columns) {
    return columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'bankCode' ? 'select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          banklist: this.state.banklist,
          placeholder: col.dataIndex === 'pointRate' ? '请输入0~1之间的小数' : '',
          editing: this.isEditing(record)
        })
      };
    });
  }
  getRealDictVal(val, list, keyName = 'dkey', valueName = 'dvalue') {
    if (!isUndefined(val) && list.length) {
      let obj = list.find(l => l[keyName] === val);
      return obj ? obj[valueName] : '';
    }
    return '';
  }
  render() {
    const { gsData, zhData, jhData, pageData } = this.state;
    const RangePicker = DatePicker.RangePicker;
    const { getFieldDecorator } = this.props.form;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const gsColumns = this.getColumns(this.gsColumns);
    const zhColumns = this.getColumns(this.zhColumns);
    const jhColumns = this.getColumns(this.jhColumns);
    let agreementPic = this.getFileInitVal();
    return (
      <Spin spinning={this.state.fetching}>
        <Form onSubmit={this.handleSubmit}>
          <Card title="基本信息">
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="全称">
                  {
                    this.view ? <div className="readonly-text">{pageData.fullName}</div>
                      : getFieldDecorator('fullName', {
                        rules: [ruleRequired],
                        initialValue: pageData.fullName
                      })(<Input />)
                  }
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="简称">
                  {
                    this.view ? <div className="readonly-text">{pageData.abbrName}</div>
                      : getFieldDecorator('abbrName', {
                        rules: [ruleRequired],
                        initialValue: pageData.abbrName
                      })(<Input />)
                  }
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="是否自主研发">
                  {
                    this.view ? <div className="readonly-text">{tfDict[pageData.isSelfDevelop] || ''}</div>
                      : getFieldDecorator('isSelfDevelop', {
                        rules: [ruleRequired],
                        initialValue: pageData.isSelfDevelop
                      })(
                        <Select>
                          <Option value="0" >否</Option>
                          <Option value="1" >是</Option>
                        </Select>
                      )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="地址">
                  {
                    this.view ? <div className="readonly-text">{pageData.address}</div>
                      : getFieldDecorator('address', {
                        rules: [ruleRequired],
                        initialValue: pageData.address
                      })(<TextArea />)
                  }
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="车行经营性质">
                  {
                    this.view ? <div className="readonly-text">{jyxzDict[pageData.carDealerType] || ''}</div>
                      : getFieldDecorator('carDealerType', {
                        rules: [ruleRequired],
                        initialValue: pageData.carDealerType
                      })(
                        <Select>
                          <Option value="0" >综合店</Option>
                          <Option value="1" >4S店</Option>
                        </Select>
                      )
                  }
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="主营品牌">
                  {
                    this.view ? <div className="readonly-text">{pageData.mainBrand}</div>
                      : getFieldDecorator('mainBrand', {
                        rules: [ruleRequired],
                        initialValue: pageData.mainBrand
                      })(<Input />)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="主要联系人">
                  {
                    this.view ? <div className="readonly-text">{pageData.mainContact}</div>
                      : getFieldDecorator('mainContact', {
                        rules: [ruleRequired],
                        initialValue: pageData.mainContact
                      })(<Input />)
                  }
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="联系人电话">
                  {
                    this.view ? <div className="readonly-text">{pageData.contactPhone}</div>
                      : getFieldDecorator('contactPhone', {
                        rules: [ruleRequired],
                        initialValue: pageData.contactPhone
                      })(<Input />)
                  }
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="所属集团">
                  {
                    this.view ? <div className="readonly-text">{pageData.parentGroup}</div>
                      : getFieldDecorator('parentGroup', {
                        rules: [ruleRequired],
                        initialValue: pageData.parentGroup
                      })(<Input />)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="合作协议有效期">
                  {
                    this.view ? <div className="readonly-text">{pageData.agreementValidDate}</div>
                      : getFieldDecorator('agreementValidDateStart', {
                        rules: [ruleRequired],
                        initialValue: pageData.agreementValidDate
                      })(<RangePicker />)
                  }
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="协议状态">
                  {
                    this.view ? <div className="readonly-text">{yxDict[pageData.agreementStatus] || ''}</div>
                      : getFieldDecorator('agreementStatus', {
                        rules: [ruleRequired],
                        initialValue: pageData.agreementStatus
                      })(
                        <Select>
                          <Option value="1" >正常</Option>
                          <Option value="0" >注销</Option>
                        </Select>
                      )
                  }
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="结算方式">
                  {
                    this.view ? <div className="readonly-text">{this.getRealDictVal(pageData.settleWay, this.state.settleWayList)}</div>
                      : getFieldDecorator('settleWay', {
                        rules: [ruleRequired],
                        initialValue: pageData.settleWay
                      })(
                        <Select>
                          {this.state.settleWayList.map(v => (
                            <Option key={v.dkey} value={v.dkey}>{v.dvalue}</Option>
                          ))}
                        </Select>
                      )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="车商合作协议">
                  {
                    this.code && !this.state.loaded ? null : (
                      getFieldDecorator('agreementPic', {
                          rules: [ruleRequired],
                          initialValue: agreementPic,
                          getValueFromEvent: this.normFile
                      })(
                        <Upload {...this.getUploadProps(agreementPic)}>
                          {this.view ? null : fileUploadBtn}
                        </Upload>
                      )
                    )
                  }
                </FormItem>
              </Col>
              <Col {...col3Props}>
                <FormItem label="所属分公司">
                  {
                    this.view ? <div className="readonly-text">{this.getRealDictVal(pageData.belongBranchCompany, this.state.compList, 'code', 'name')}</div>
                      : getFieldDecorator('belongBranchCompany', {
                        rules: [ruleRequired],
                        initialValue: pageData.belongBranchCompany
                      })(
                        <Select>
                          {this.state.compList.map(v => (
                            <Option key={v.code} value={v.code}>{v.name}</Option>
                          ))}
                        </Select>
                      )
                  }
                </FormItem>
              </Col>
              <Col {...col33Props}>
                <FormItem label="业务区域">
                  {
                    this.view ? <div className="readonly-text">{pageData.businessArea}</div>
                      : getFieldDecorator('businessArea', {
                        rules: [ruleRequired],
                        initialValue: pageData.businessArea
                      })(<Input />)
                  }
                </FormItem>
              </Col>
            </Row>
            <Row gutter={54}>
              <Col {...col3Props}>
                <FormItem label="备注">
                  {
                    this.view ? <div className="readonly-text">{pageData.remark}</div>
                      : getFieldDecorator('remark', {
                        initialValue: pageData.remark
                      })(<TextArea />)
                  }
                </FormItem>
              </Col>
            </Row>
          </Card>
          {this.check ? (
             <Card title="审核" style={{ marginTop: 16 }}>
              <FormItem label="审核意见">
                {getFieldDecorator('approveNote', {
                  initialValue: pageData.approveNote
                })(<TextArea />)}
              </FormItem>
            </Card>
          ) : null}
          <FormItem key='btns' {...tailFormItemLayout}>
            {this.check ? (
              <div>
                <Button type="primary" onClick={() => { this.handleCheck(1); }}>通过</Button>
                <Button style={{marginLeft: 20}} type="primary" onClick={() => { this.handleCheck(0); }}>不通过</Button>
                <Button style={{marginLeft: 20}} onClick={this.back}>返回</Button>
              </div>
            ) : this.view
                ? <Button style={{marginLeft: 20}} onClick={this.back}>返回</Button>
                : (
                    <div>
                      <Button type="primary" htmlType="submit">保存</Button>
                      <Button style={{marginLeft: 20}} onClick={this.back}>返回</Button>
                    </div>
                )
            }
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default Form.create()(DealerAddedit);
