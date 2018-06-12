import React from 'react';
import {Calendar, Badge, Form, Checkbox} from 'antd';
import moment from 'moment';
import fetch from 'common/js/fetch';
import { formatDate } from 'common/js/util';
import { formItemLayout } from 'common/js/config';

const {Item: FormItem} = Form;
const CheckboxGroup = Checkbox.Group;

export default class RestDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: [{
                contractNo: '1',
                name: '张三',
                endDatetime: '2018-06-14'
            }],
            contractsMap: null,
            modalVisible: false,
            modalOptions: null
        };
    }

    componentDidMount() {
        // fetch(632685, {
        //     date: formatDate(new Date(), 'yyyy-MM-01')
        // }).then(data => {
        //     this.createDateMap(data);
        // }).catch(() => {});

        fetch(632837).then(data => {
            this.createDateMap(data);
        }).catch(() => {});
    }

    createDateMap = (data) => {
        let result = {};
        data.forEach(d => {
            let key = moment(d.endDatetime).format('YYYY-MM-DD');
            result[key] = result[key] || [];
            result[key].push(d);
        });
        console.log(result);
        this.setState({contractsMap: result});
    }

    handleCheckboxOnChange = () => {
        console.log(1);
    }

    dateCellRender = (date) => {
        let todayStr = date.format('YYYY-MM-DD');
        if (!this.state.contractsMap || !this.state.contractsMap[todayStr]) {
            return null;
        }
        return (
            <div>
                {
                    this.state.contractsMap[todayStr].map(item => (
                        <FormItem key={todayStr}>
                            <CheckboxGroup>
                                {<Checkbox key={todayStr} value={todayStr} onChange={this.handleCheckboxOnChange()}>休息日</Checkbox>}
                            </CheckboxGroup>
                        </FormItem>
                    ))
                }
            </div>
        );
    }

    goDetail(contractNo) {
        // 档案详情
    }

    render() {
        return (
            <Calendar dateCellRender={this.dateCellRender}/>
        );
    }
}
