import React from 'react';
import {
    showWarnMsg,
    showSucMsg,
    getQueryString,
    findDsct,
    dsctList1,
    getNowTime,
    dateTimeFormat
} from 'common/js/util';
import {Row, Col, Select, Table, Button} from 'antd';
import {
    accessSlipStatus,
    accessSlipDetail,
    carBuyingList,
    accountBlankList,
    archivesPath,
    executorList,
    fileCtList
} from '../../../api/preLoan.js';

const {Option} = Select;
class fileDetail extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.state = {
            columns: [
                {
                    title: '文件内容',
                    dataIndex: 'content',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '存放人',
                    dataIndex: 'operator',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '存放时间',
                    dataIndex: 'depositDateTime',
                    width: '20%',
                    align: 'center'
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    width: '20%',
                    align: 'center'
                }
            ],
            baseInfo: {},
            carBuyingListArrs: [],
            accessSlipStatusArr: [],
            bankListArr: [],
            bankCode: '',
            bankObject: {},
            rmkText: '',
            collectBankcard: {},
            isDz: '',
            missionList: [],
            information: {
                key: '',
                content: '',
                contentName: '',
                count: '',
                savePp: '',
                getUserCode: '',
                time: '',
                rmk: ''
            },
            visible: false,
            visibleChange: false,
            iptInfoArr: {
                code: '',
                path: ''
            },
            loanBankCode: '',
            archivesPathArr: [],
            executorListArr: [],
            regDate: '',
            fileLists: [],
            fileCtListArr: [],
            getUserNames: '',
            fileName: '',
            fileCode: ''
        };
        this.count = 1;
        this.selectedRowKeys = [];
        this.selectedRowKeysArr = [];
        this.selectedRows = [];
        this.rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeysArr = selectedRowKeys;
                this.selectedRows = selectedRows;
                console.log('selectedRowKeysArr', this.selectedRowKeysArr);
                console.log('selectedRows', this.selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name
            })
        };
        this.arr = [];
    }
    componentDidMount(): void {
        // 购车行
        carBuyingList(1, 100).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].fullName
                });
            }
            this.setState({
                carBuyingListArrs: arr
            });
        });
        this.getAccessSlipStatus();
        accessSlipDetail(this.code).then(data => {
            let arr = [];
            for(let i = 0; i < data.fileList.length; i++) {
                arr.push({
                    key: i,
                    content: data.fileList[i].content,
                    contentCode: data.fileList[i].code,
                    fileCount: data.fileList[i].fileCount,
                    operator: data.fileList[i].operator,
                    getUserCode: data.fileList[i].operator,
                    depositDateTime: dateTimeFormat(data.fileList[i].depositDateTime),
                    remark: data.fileList[i].remark
                });
            }
            this.arr = arr;
            this.setState({
                baseInfo: {
                    code: data.code,
                    customerName: data.customerName,
                    loanBankName: data.loanBankName,
                    loanAmount: data.loanAmount,
                    bizType: data.bizType === '0' ? '新车' : '二手车',
                    shopCarGarage: data.carInfo ? data.carInfo.shopCarGarageName : '',
                    saleGroup: data.saleUserCompanyName + '-' + data.saleUserDepartMentName + '-' + data.saleUserPostName + '-' + data.saleUserName,
                    curNodeCode: data.curNodeCode ? data.curNodeCode : ''
                },
                collectBankcard: data.advance ? data.advance.collectBankcard : '',
                fileLists: data.fileList,
                missionList: [...arr],
                enterLocationCode: data.enterLocation,
                fileCode: data.enterCode
            });
        });
        accountBlankList(1, 1000, '').then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].bankName
                });
            }
            this.setState({
                bankListArr: arr
            });
        });
        archivesPath(1, 10000).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].code,
                    dvalue: data.list[i].name
                });
            }
            this.setState({
                archivesPathArr: arr
            });
        });
        executorList(1, 1000).then(data => {
            let arr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].userId,
                    dvalue: data.list[i].realName ? data.list[i].realName : ''
                });
            }
            this.setState({
                executorListArr: arr
            });
        });
        fileCtList(1, 1000).then(data => {
            console.log('fileCtList', data);
            let arr = [];
            let countArr = [];
            for(let i = 0; i < data.list.length; i++) {
                arr.push({
                    dkey: data.list[i].id,
                    dvalue: `${data.list[i].vname} - ${data.list[i].number}份`
                });
                countArr.push({
                    dkey: data.list[i].id,
                    dvalue: data.list[i].number
                });
            }
            this.setState({
                fileCtListArr: arr,
                countArr: countArr
            });
        });
    }
    // 以下是关于对话框的相关
    showModal = (type) => {
        if(type === 'dataEdit') {
            this.setState({
                visible: true
            });
        }else if(type === 'dataDetail') {
            this.setState({
                visibleDetail: true
            });
        }else if(type === 'dataChange') {
            if(this.selectedRowKeysArr.length < 0) {
                showWarnMsg('请选择记录');
            }else {
                this.setState({
                    visibleChange: true
                });
                this.editMission();
            }
        }
    };
    hideModal = (type) => {
        if(type === 'dataEdit') {
            this.setState({
                visible: false,
                information: {
                    content: '',
                    contentName: '',
                    count: '',
                    savePp: '',
                    getUserCode: '',
                    time: '',
                    rmk: ''
                },
                getUserNames: '',
                fileName: ''
            });
        }else if(type === 'dataChange') {
            this.setState({
                visibleChange: false,
                information: {
                    key: '',
                    content: '',
                    contentName: '',
                    count: '',
                    savePp: '',
                    getUserCode: '',
                    time: '',
                    rmk: ''
                },
                getUserNames: '',
                fileName: ''
            });
        }
    };
    // missionList修改
    editMission = () => {
        const {regDate} = this.state;
        console.log(this.selectedRows[0]);
        this.setState({
            information: {
                key: this.selectedRows[0].key,
                content: this.selectedRows[0].contentCode,
                contentName: this.selectedRows[0].content,
                count: this.selectedRows[0].fileCount,
                savePp: this.selectedRows[0].operator,
                getUserCode: this.selectedRows[0].getUserCode,
                time: this.selectedRows[0].depositDateTime,
                rmk: this.selectedRows[0].remark
            },
            getUserNames: this.selectedRows[0].operator,
            fileName: this.selectedRows[0].content
        });
    }
    // 状态
    getAccessSlipStatus = () => {
        accessSlipStatus().then(data => {
            let arr = dsctList1(data);
            this.setState({
                accessSlipStatusArr: arr
            });
        });
    }
    // 是否垫资
    handleChange = (value) => {
        this.setState({
            isDz: value
        });
    }
    // 返回
    goBack = () => {
        this.props.history.go(-1);
    }
    iupChange = (e, name) => {
        const {information} = this.state;
        information[name] = e.target.value;
        this.setState({
            information
        });
    };
    handleChangeBank = (value) => {
        this.setState({
            loanBankCode: value,
            enterLocationCode: value
        });
    }
    showDetail = () => {
        this.props.history.push(`/preLoan/Access/detail?code=${this.code}`);
    }
    render() {
        const {missionList, archivesPathArr, enterLocationCode, fileCode} = this.state;
        return (
            <div className="afp-body">
                <span className="afp-body-tag">档案入档</span>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>档案编号：</span>
                        <span>{fileCode}</span>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>档案存放位置：</span>
                        <Select className="preLoan-body-select" value={enterLocationCode} style={{width: '300px'}} onChange={this.handleChangeBank}>
                            {
                                archivesPathArr.map(data => {
                                    return (
                                        <Option key={data.dkey} value={data.dkey}>{data.dvalue}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={12}>
                        <span className="afp-body-title" style={{width: '120px'}}>本次存放清单：</span>
                    </Col>
                </Row>
                <Table
                    className="afp-body-table"
                    style={{width: '900px'}}
                    dataSource={missionList}
                    rowSelection={this.rowSelection}
                    columns={this.state.columns}
                />
                <div className="afp-body-btn-group">
                    <Button onClick={this.goBack} style={{marginLeft: '30%'}}>返回</Button>
                </div>
            </div>
        );
    }
}

export default fileDetail;
