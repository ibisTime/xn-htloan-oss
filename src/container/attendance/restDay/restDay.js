import React from 'react';
import {Calendar, Badge, Spin, Icon, Modal} from 'antd';
import moment from 'moment';
import fetch from 'common/js/fetch';
import {formatDate, getUserId} from 'common/js/util';
import {formItemLayout} from 'common/js/config';

export default class RestDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contractsMap: {},
            month: formatDate(new Date(), 'yyyy-MM-01'),
            fetching: true
        };
    }

    componentDidMount() {
        this.getDate(new Date());
    }

    // 按月列表查询休息日记录
    getDate = (date) => {
        this.setState({fetching: true});
        fetch(632685, {
            date: formatDate(date, 'yyyy-MM-01')
        }).then(res => {
            this.createDateMap(res);
            this.setState({month: formatDate(date, 'yyyy-MM-01'), fetching: false});
        }).catch(() => {
            this.setState({fetching: false});
        });
    }

    // 格式化数据
    createDateMap = (data) => {
        let result = {};
        data.forEach(d => {
            let key = moment(d.date).format('YYYY-MM-DD');
            result[key] = result[key] || {};
            result[key] = d;
        });
        this.setState({contractsMap: result});
    }

    // 自定义渲染日期单元格
    dateCellRender = (date) => {
        let todayStr = date.format('YYYY-MM-DD');
        if (!this.state.contractsMap || !this.state.contractsMap[todayStr]) {
            let result = {...this.state.contractsMap};
            if(!result[todayStr]) {
                let tmpl = {
                    date: todayStr,
                    isRest: '0'
                };
                result[todayStr] = tmpl;
                this.setState({contractsMap: result});
            }
            return null;
        } else if (this.state.contractsMap[todayStr].isRest !== '1') {
            return null;
        }
        return (
            <div className="restDay-div">休息日</div>
        );
    }

    // 日期面板变化回调
    panelChange = (moment, mode) => {
        // 判断是否切换月份
        if (formatDate(moment, 'yyyy-MM-01') !== this.state.month) {
            this.getDate(moment);
        }
    }

    // 点击选择日期回调
    handleSelect = (moment) => {
        // 判断是否切换月份
        if (formatDate(moment, 'yyyy-MM-01') !== this.state.month) {
            this.getDate(moment);
            return;
        }
        let result = {...this.state.contractsMap};
        let key = moment.format('YYYY-MM-DD');
        if (result[key]) {
            let str = '';
            if (result[key].isRest === '0') {
                str = '确定设为休息日？';
            } else {
                str = '确定取消休息日？';
            }

            Modal.confirm({
                okText: '确定',
                cancelText: '取消',
                content: str,
                onOk: () => {
                    this.handleSubmit(result, moment);
                }
            });
        }
    }

    // 保存休息日设置
    handleSubmit = (data, moment) => {
        let dateList = [];
        let contracts = this.state.contractsMap;
        let key = moment.format('YYYY-MM-DD');
        let isRest = contracts[key].isRest;

        if (contracts[key].isRest === '0') {
            contracts[key].isRest = '1';
        } else {
            contracts[key].isRest = '0';
        }
        Object.keys(this.state.contractsMap).map(key => {
            if (formatDate(key, 'yyyy-MM-01') === this.state.month) {
                dateList.push(contracts[key]);
            }
        });
        let params = {
            operateDate: this.state.month,
            dateList: dateList,
            updater: getUserId()
        };
        this.setState({fetching: true});
        fetch(632680, params).then(() => {
            this.setState({contractsMap: contracts, fetching: false});
        }).catch(() => {
            contracts[key].isRest = isRest;
            this.setState({fetching: false});
        });
    }

    render() {
        let props = {
            dateCellRender: this.dateCellRender,
            onSelect: this.handleSelect,
            onPanelChange: this.panelChange
        };
        return (
            <Spin spinning={this.state.fetching}>
                <Calendar {...props}/>
            </Spin>
        );
    }
}
