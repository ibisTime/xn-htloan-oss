import React from 'react';
import {
    Form, Spin, Row, Col, Input, Select, Collapse,
    Table, Popconfirm, DatePicker, Icon, Button, Upload, Modal
} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {formatFile, formatImg, getQueryString, showErrMsg} from 'common/js/util';
import {UPLOAD_URL, PIC_PREFIX, tailFormItemLayout} from 'common/js/config';
import {getQiniuToken} from 'api/general';
import locale from 'common/js/lib/date-locale';

moment.locale('zh-cn');
const {Item} = Form;
const {Option} = Select;
const {Panel} = Collapse;
const {TextArea} = Input;
const colProps = {xs: 32, sm: 24, md: 12, lg: 8};
const col2Props = {xs: 32, sm: 24, md: 12, lg: 12};
const col3Props = {xs: 32, sm: 24, md: 24, lg: 8};
const col21Props = {xs: 32, sm: 24, md: 12, lg: 16};
const col4Props = {xs: 32, sm: 24, md: 12, lg: 6};
const col5Props = {xs: 32, sm: 24, md: 12, lg: 5};
const col55Props = {xs: 32, sm: 24, md: 12, lg: 4};
const col24Props = {xs: 32, sm: 24, md: 24, lg: 24};
const rules = [{
    required: true,
    message: '必填字段'
}];
const imgUploadBtn = (
    <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传</div>
    </div>
);
const fileUploadBtn = (
    <Button>
        <Icon type="upload"/> 上传
    </Button>
);
const {RangePicker} = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class AdmittanceAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            fetching: true,
            formData: [],
            selectedRowKeys: [],
            selectedRows: [],
            previewVisible: false,
            previewImage: '',
            token: ''
        };
    }

    // 获取上传按钮
    getUploadBtn(item, isImg) {
        let btn = isImg ? imgUploadBtn : fileUploadBtn;
        return item.readonly
            ? null
            : item.single
                ? this.props.form.getFieldValue(item.field)
                    ? null : btn
                : btn;
    }

    setUploadFileUrl(fileList, isImg) {
        let format = isImg ? formatImg : formatFile;
        fileList.forEach(f => {
            if (!f.url && f.status === 'done' && f.response) {
                f.url = format(f.response.key);
            }
        });
    }

    // 获取文件上传的值
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
    // 隐藏展示图片的modal
    handleCancel = () => this.setState({previewVisible: false})
    // 显示展示图片的modal
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }
    // 文件点击事件
    handleFilePreview = (file) => {
        if (file.status === 'done') {
            let key = file.key || (file.response && file.response.key) || '';
            window.open(formatFile(key), true);
        } else {
            let msg = file.status === 'uploading' ? '文件还未上传完成' : '文件上传失败';
            showErrMsg(msg);
        }
    }

    getLabel(item) {
        return (
            <span>
        {item.title + (item.single ? '(单)' : '')}
      </span>
        );
    }

    // 获取7牛token
    getToken() {
        if (!this.tokenFetch) {
            this.tokenFetch = true;
            getQiniuToken().then(data => {
                this.setState({token: data.uploadToken});
            }).catch(() => this.tokenFetch = false);
        }
    }

    // 获取图片上传的额外参数
    getUploadData = (file) => {
        return {token: this.state.token};
    }

    getFileComp(item, initVal, rules, getFieldDecorator, isImg) {
        let initValue = this.getFileInitVal(initVal);
        return (
            item.hidden ? null : (
                <Item key={item.field} label={this.getLabel(item)}>
                    {getFieldDecorator(item.field, {
                        rules,
                        initialValue: initVal,
                        getValueFromEvent: this.normFile
                    })(
                        this.check && !initValue.length && item.required
                            ? <div></div>
                            : (
                                <Upload {...this.getUploadProps(item, initValue, isImg)}>
                                    {this.getUploadBtn(item, isImg)}
                                </Upload>
                            )
                    )}
                </Item>
            )
        );
    }

    getImgComp(item, initVal, rules, getFieldDecorator) {
        return this.getFileComp(item, initVal, rules, getFieldDecorator, true);
    }

    getUploadProps(item, initValue, isImg) {
        const commProps = {
            action: UPLOAD_URL,
            multiple: !item.single,
            defaultFileList: initValue,
            data: this.getUploadData,
            showUploadList: {
                showPreviewIcon: true,
                showRemoveIcon: !item.readonly
            }
        };
        const fileProps = {
            ...commProps,
            onChange: ({fileList}) => this.setUploadFileUrl(fileList),
            onPreview: this.handleFilePreview
        };
        const imgProps = {
            ...commProps,
            onChange: ({fileList}) => this.setUploadFileUrl(fileList, true),
            onPreview: this.handlePreview,
            listType: 'picture-card',
            accept: 'image/*'
        };
        return isImg ? imgProps : fileProps;
    }

    getFileInitVal(initVal, isImg) {
        const {token} = this.state;
        !token && this.getToken();
        let initValue = [];
        if (initVal) {
            initValue = initVal.split('||').map(key => ({
                key,
                uid: key,
                name: key,
                status: 'done',
                url: isImg ? formatImg(key) : formatFile(key),
                thumbUrl: isImg ? formatImg(key) : formatFile(key)
            }));
        }
        return initValue;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
            }
        });
    }
    onCancel = () => {
        this.props.history.go(-1);
    }
    handleAdd = () => {
        this.setGpsVisible(true);
    }
    handleEdit = () => {
        let {selectedRows} = this.state;
        if (selectedRows.length) {
            this.setState({
                gpsData: selectedRows[0],
                gpsdVisible: true
            });
        }
    }
    handleDelete = () => {
        let {selectedRowKeys} = this.state;
        if (selectedRowKeys.length) {
            this.setState({
                selectedRows: [],
                selectedRowKeys: []
            });
        }
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys, selectedRows});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            selectedRowKeys, previewVisible,
            previewImage, rebateSource
        } = this.state;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            type: 'radio'
        };

        let format = DATE_FORMAT;
        let places = '选择日期';

        return (
            <div>
                <Form className="budget-addedit-form" onSubmit={this.handleSubmit}>
                    <Item key='type' label="贷款产品">
                        {
                            this.view ? <div className="readonly-text">{this.state.formData.loanProductCode}</div> : getFieldDecorator('loanProductCode', {
                            rules,
                            initialValue: this.code ? this.state.formData.loanProductCode : ''
                        })(<Select>
                            <Option key='1' value='1'>新车</Option>
                            <Option key='2' value='2'>二手车</Option>
                        </Select>)}
                    </Item>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="拟购车辆信息" key="1">
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='type' label="业务种类">
                                        {getFieldDecorator('type', {
                                            rules,
                                            initialValue: '1'
                                        })(<Select>
                                            <Option key='1' value='1'>新车</Option>
                                            <Option key='2' value='2'>二手车</Option>
                                        </Select>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='type' label="贷款期限">
                                        {getFieldDecorator('dkqx', {
                                            rules,
                                            initialValue: '1'
                                        })(<Select>
                                            <Option key='1' value='1'>一年</Option>
                                            <Option key='2' value='2'>二年</Option>
                                            <Option key='2' value='2'>三年</Option>
                                        </Select>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="开票单位">
                                        {getFieldDecorator('kpdw', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="品牌(具体)">
                                        {getFieldDecorator('pajt', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="市场指导价">
                                        {getFieldDecorator('sczdj', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="开票价">
                                        {getFieldDecorator('kpj', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="颜色">
                                        {getFieldDecorator('ys', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="月供(元)">
                                        {getFieldDecorator('yg', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="首付金额">
                                        {getFieldDecorator('sfje', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="首付比例(%)">
                                        {getFieldDecorator('sfbl', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="贷款额">
                                        {getFieldDecorator('loanAmount', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col4Props}>
                                    <Item key='carXh' label="落户地点">
                                        {getFieldDecorator('yg', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="申请人信息" key="2">
                            <Row gutter={24}>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="申请人姓名">
                                        {getFieldDecorator('sqrname', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='type' label="性别">
                                        {getFieldDecorator('sex', {
                                            rules,
                                            initialValue: '1'
                                        })(<Select>
                                            <Option key='1' value='1'>男</Option>
                                            <Option key='2' value='2'>女</Option>
                                        </Select>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='type' label="婚姻状况">
                                        {getFieldDecorator('hyzz', {
                                            rules,
                                            initialValue: '1'
                                        })(<Select>
                                            <Option key='1' value='1'>一年</Option>
                                            <Option key='2' value='2'>二年</Option>
                                            <Option key='2' value='2'>三年</Option>
                                        </Select>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="民族">
                                        {getFieldDecorator('mz', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='type' label="学历">
                                        {getFieldDecorator('xl', {
                                            rules,
                                            initialValue: '1'
                                        })(<Select>
                                            <Option key='1' value='1'>小学</Option>
                                            <Option key='2' value='2'>初中</Option>
                                            <Option key='3' value='3'>中专</Option>
                                            <Option key='4' value='4'>高中</Option>
                                            <Option key='5' value='5'>大专</Option>
                                            <Option key='6' value='6'>本科</Option>
                                            <Option key='7' value='7'>研究生</Option>
                                        </Select>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col3Props}>
                                    <Item key='carXh' label="身份证号">
                                        {getFieldDecorator('idNo', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="家庭人口">
                                        {getFieldDecorator('jtrk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="手机号">
                                        {getFieldDecorator('mobile', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col21Props}>
                                    <Item key='carXh' label="现居住地址">
                                        {getFieldDecorator('xjzdz', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="邮编1">
                                        {getFieldDecorator('yb1', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col21Props}>
                                    <Item key='carXh' label="户口所在地">
                                        {getFieldDecorator('hkszd', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="邮编2">
                                        {getFieldDecorator('yb2', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...colProps}>
                                    <Item key='carXh' label="家庭主要财产">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col21Props}>
                                    <Item key='carXh' label="主要财产包括">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col24Props}>
                                    <Item key='type' label="主要收入来源">
                                        {getFieldDecorator('zysrly', {
                                            rules,
                                            initialValue: '1'
                                        })(<Select>
                                            <Option key='1' value='1'>工资</Option>
                                            <Option key='2' value='2'>分红</Option>
                                        </Select>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="工作单位名称">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="工作单位地址">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...colProps}>
                                    <Item key='carXh' label="自营公司单位面积">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="员工数量">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col3Props}>
                                    <Item key='carXh' label="企业月产值">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...colProps}>
                                    <Item key='carXh' label="职位">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="职称">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col3Props}>
                                    <Item key='carXh' label="月收入">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="配偶信息" key="3">
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="姓名">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="手机号">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="身份证号">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='type' label="学历">
                                        {getFieldDecorator('xl', {
                                            rules,
                                            initialValue: '1'
                                        })(<Select>
                                            <Option key='1' value='1'>小学</Option>
                                            <Option key='2' value='2'>初中</Option>
                                            <Option key='3' value='3'>中专</Option>
                                            <Option key='4' value='4'>高中</Option>
                                            <Option key='5' value='5'>大专</Option>
                                            <Option key='6' value='6'>本科</Option>
                                            <Option key='7' value='7'>研究生</Option>
                                        </Select>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="工作单位名称">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="工作单位联系电话">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="工作单位地址">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="担保人信息" key="3">
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="姓名">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="手机号">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    <Item key='carXh' label="身份证号">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>

                                <Col {...col2Props}>
                                    <Item key='carXh' label="固定电话">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="工作单位名称">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="工作单位地址">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="担保人房产地址">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Item key='carXh' label="家庭紧急联系人1信息">
                                </Item>
                            </Row>
                            <Row gutter={24}>
                                <Col {...colProps}>
                                    <Item key='carXh' label="姓名">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="与申请人关系">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col3Props}>
                                    <Item key='carXh' label="手机号码">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Item key='carXh' label="家庭紧急联系人2信息">
                                </Item>
                            </Row>
                            <Row gutter={24}>
                                <Col {...colProps}>
                                    <Item key='carXh' label="姓名">
                                        {getFieldDecorator('jtzycc', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...colProps}>
                                    <Item key='carXh' label="与申请人关系">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col3Props}>
                                    <Item key='carXh' label="手机号码">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                    <Collapse defaultActiveKey={['1']} style={{marginTop: 30}}>
                        <Panel header="流水数据" key="1">

                            <Row gutter={24}>
                                <Col {...col24Props}>

                                    <Item key='carXh' label="流水时间">
                                        <RangePicker
                                            allowClear={false}
                                            locale={locale}
                                            placeholder={places}
                                            ranges={{
                                                '今天': [moment(), moment()],
                                                '本月': [moment(), moment().endOf('month')]
                                            }}
                                            format={format}/>
                                    </Item>
                                </Col></Row>
                            <Row gutter={24}>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="收入">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="支出">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="账户余额">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="月均收入">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="备注">
                                        {getFieldDecorator('zyccbk', {})(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                    <Collapse defaultActiveKey={['1']} style={{marginTop: 30}}>
                        <Panel header="家庭房产情况及家访" key="1">
                            <Row gutter={24}>
                                <Col {...col24Props}>
                                    <Item key='carXh' label="家庭住址">
                                        {getFieldDecorator('zyccbk', {
                                            rules
                                        })(<Input/>)}
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col {...col2Props}>
                                    {this.getImgComp({
                                        field: 'fczPic',
                                        title: '购房合同'
                                    }, null, [], getFieldDecorator)}
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                    <Item key='btns' {...tailFormItemLayout}>
                        <div style={{marginTop: 20}}>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button style={{marginLeft: 20}} onClick={this.onCancel}>返回</Button>
                        </div>
                    </Item>
                </Form>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="图片" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(AdmittanceAddEdit);
