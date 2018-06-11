import React from 'react';
import { TreeSelect, Form, Spin, Input, Button, Select } from 'antd';
import { getQueryString, showSucMsg, tempString } from 'common/js/util';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';
import { getPostList, getRoleList, addUser } from 'api/company';
import { getUserById, setUserPost } from 'api/user';

const { TreeNode } = TreeSelect;
const { Item } = Form;
const { Option } = Select;
const rules = [{
    required: true,
    message: '必填字段'
}];
const mobileRules = [{
    required: true,
    message: '必填字段'
}, {
    pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
    message: '手机格式不对'
}];

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            treeData: [],
            roleData: [],
            roleCode: [{
                title: '角色',
                field: 'roleCode',
                keyName: 'code',
                valueName: 'name'
            }]
        };
    }
    componentDidMount() {
        Promise.all([
            getRoleList(),
            getPostList()
        ]).then(([roleData, postData]) => {
            this.getTree(postData);
            this.setState({ roleData: roleData, fetching: false });
        }).catch(() => this.setState({ fetching: false }));
    }
    getTree(data) {
        let result = {};
        data.forEach(v => {
            v.parentCode = v.parentCode === '0' ? 'ROOT' : v.parentCode;
            if (!result[v.parentCode]) {
                result[v.parentCode] = [];
            }
            result[v.parentCode].push({
                title: v.name,
                key: v.code,
                type: v.type
            });
        });
        this.result = result;
        let tree = [];
        this.getTreeNode(result['ROOT'], tree);
        this.setState({ treeData: tree });
    }
    getTreeNode(arr, children) {
        arr.forEach(a => {
            if (this.result[a.key]) {
                a.children = [];
                children.push(a);
                this.getTreeNode(this.result[a.key], a.children);
            } else {
                children.push(a);
            }
        });
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} value={item.key} disabled>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.title} key={item.key} value={item.key} disabled={item.type !== '3'}/>;
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ fetching: true });
                addUser(values).then(() => {
                    this.setState({ fetching: false });
                    showSucMsg('操作成功');
                    setTimeout(() => {
                        this.props.history.go(-1);
                    }, 1000);
                }).catch(() => {
                    this.setState({ fetching: false });
                });
            }
        });
    }

    getSelectProps = (item) => {
        const props = {
            showSearch: true,
            allowClear: true,
            optionFilterProp: 'children',
            filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            style: {width: '100%'},
            placeholder: '请选择'
        };
        if (item.onChange) {
            props.onChange = (v) => {
                item.onChange(v, this.props.selectData[item.field] ? this.props.selectData[item.field].find(v1 => v1.code === v) : {}, this.props);
            };
        }
        return props;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.fetching}>
                <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
                    <Item className="hidden" key='type' {...formItemLayout} label='类型'>
                        {getFieldDecorator('type', {
                            rules,
                            initialValue: 'P'
                        })(<Input type="hidden"/>)}
                    </Item>
                    <Item key='loginName' {...formItemLayout} label='登录名'>
                        {getFieldDecorator('loginName', {
                            rules,
                            initialValue: ''
                        })(<Input/>)}
                    </Item>
                    <Item key='realName' {...formItemLayout} label='真实姓名'>
                        {getFieldDecorator('realName', {
                            rules,
                            initialValue: ''
                        })(<Input/>)}
                    </Item>
                    <Item key='mobile' {...formItemLayout} label='手机号'>
                        {getFieldDecorator('mobile', {
                            rules: mobileRules,
                            initialValue: ''
                        })(<Input/>)}
                    </Item>
                    <Item key='loginPwd' {...formItemLayout} label='密码'>
                        {getFieldDecorator('loginPwd', {
                            rules,
                            initialValue: ''
                        })(<Input type="password"/>)}
                    </Item>
                    <Item key='roleCode' {...formItemLayout} label='角色'>
                        {getFieldDecorator('roleCode', {
                            rules,
                            initialValue: ''
                        })(<Select {...this.getSelectProps(this.state.roleCode[0])}>
                            {this.state.roleData.map(d => (
                                <Option key={d['code']}
                                        value={d['code']}>{d['name']}</Option>))}
                        </Select>)}
                    </Item>
                    <Item key='treeMenu' {...formItemLayout} label='岗位名称'>
                        {getFieldDecorator('postCode', {
                            rules,
                            initialValue: this.state.postCode
                        })(
                            <TreeSelect
                                showSearch
                                style={{ width: 300 }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="选择岗位"
                                allowClear
                                treeDefaultExpandAll
                            >
                                {this.renderTreeNodes(this.state.treeData)}
                            </TreeSelect>
                        )}
                    </Item>
                    <Item key='btns' {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
                        <Button style={{marginLeft: 20}} onClick={() => this.props.history.go(-1)}>返回</Button>
                    </Item>
                </Form>
            </Spin>
        );
    }
}

export default Form.create()(Post);
