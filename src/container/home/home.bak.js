import React from 'react';
import { Link } from 'react-router-dom';
import {
    getUserName,
    getRoleCode,
    dateFormat,
    getNowCurNodePageUrl
} from 'common/js/util';
import { getRoleList } from 'api/company';
import { getDictList } from 'api/dict';
import { getPageMyNotice, getPageMyCompanysystem, getPageMyToDoList, getCurNodeCode } from 'api/home';
import './home.css';
import userPhoto from '../../images/home-userPhoto.png';
import iconMore from '../../images/home-icon-more.png';
import noData from '../../images/noData.png';
import iconLi from '../../images/home-icon-li.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
            noticeData: [],
            companysystemData: [],
            toDoListData: [],
            curNodeData: {},
            nodeTypeData: {}
        };
    }
    componentDidMount() {
        Promise.all([
            getRoleList(),
            getPageMyNotice(),
            getPageMyCompanysystem(),
            getPageMyToDoList(),
            getCurNodeCode(),
            getDictList({parentKey: 'node_type'})
        ]).then(([roleData, noticeData, companysystemData, toDoListData, curNodeData, nodeType]) => {
            let curNodeD = {};
            let nodeTypeD = {};
            curNodeData.map(v => {
                curNodeD[v.code] = v.name;
            });
            nodeType.map(v => {
                nodeTypeD[v.dkey] = v.dvalue;
            });
            this.getUserRole(roleData);
            this.setState({
                roleData: roleData,
                noticeData: noticeData.list,
                companysystemData: companysystemData.list,
                toDoListData: toDoListData.list,
                curNodeData: curNodeD,
                nodeTypeData: nodeTypeD});
        }).catch(() => this.setState({ fetching: false }));
    }

    getUserRole = (roleData) => {
        let roleCode = getRoleCode();
        roleData.map(v => {
            if (v.code === roleCode) {
                this.setState({role: v.name});
                return false;
            }
        });
    }

    render() {
        return (
            <div className="home-wrap">
                <div className="top-wrap">
                    <div className="card user-wrap">
                        <div className="card-top">
                            <div className="photo">
                                <img src={userPhoto}/>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="user-name">{getUserName()}</div>
                            <div className="user-role">{this.state.role}</div>
                        </div>
                    </div>
                    <div className="card top-right">
                        <div className="card-top">
                            <div className="title">待办事项</div>
                            <div className="more" onClick={() => {
                                this.props.history.push(`/home/toDoList`);
                            }}>MORE <img src={iconMore}/></div>
                        </div>
                        <div className="card-content">
                            { this.state.toDoListData && this.state.toDoListData.length > 1 ? this.state.toDoListData.map(d => (
                                <div className="content-item" key={d.id}>
                                    <Link to={getNowCurNodePageUrl(d)}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.companyName} 客户{d.userName} {this.state.nodeTypeData[d.flowTypeCode]} {this.state.curNodeData[d.curNodeCode]}</p>
                                        <samp className="date">{dateFormat(d.updateDatetime)}</samp>
                                    </Link>
                                </div>
                            )) : <div className="noData"><img src={noData}/><p>暂无待办事项</p></div>}
                        </div>
                    </div>
                </div>
                <div className="below-wrap">
                    <div className="card notice-wrap">
                        <div className="card-top">
                            <div className="title">公司公告</div>
                        </div>
                        <div className="card-content">
                            { this.state.noticeData && this.state.noticeData.length > 1 ? this.state.noticeData.map(d => (
                                <div className="content-item" key={d.notice.code}>
                                    <Link to={'/home/noticeDetail?code=' + d.notice.code}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.notice.title}</p>
                                        <samp className="date">{dateFormat(d.notice.updateDatetime)}</samp>
                                    </Link>
                                </div>
                            )) : <div className="noData"><img src={noData}/><p>暂无公司公告</p></div>}
                        </div>
                    </div>
                    <div className="card companysystem-wrap">
                        <div className="card-top">
                            <div className="title">公司制度</div>
                        </div>
                        <div className="card-content">
                            { this.state.companysystemData && this.state.companysystemData.length > 1 ? this.state.companysystemData.map(d => (
                                <div className="content-item" key={d.regime.code}>
                                    <Link to={'/home/companysystemDetail?code=' + d.regime.code}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.regime.content}</p>
                                        <samp className="date">{dateFormat(d.regime.updateDatetime)}</samp>
                                    </Link>
                                </div>
                            )) : <div className="noData"><img src={noData}/><p>暂无公司制度</p></div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
