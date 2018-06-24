import React from 'react';
import {
    getUserName,
    getRoleCode,
    dateFormat
} from 'common/js/util';
import { getRoleList } from 'api/company';
import { getPageMyNotice, getPageMyCompanysystem } from 'api/home';
import './home.css';
import userPhoto from '../../images/home-userPhoto.png';
import iconMore from '../../images/home-icon-more.png';
import iconLi from '../../images/home-icon-li.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            role: null,
            noticeData: [],
            companysystemData: []
        };
    }
    componentDidMount() {
        Promise.all([
            getRoleList(),
            getPageMyNotice(),
            getPageMyCompanysystem()
        ]).then(([roleData, noticeData, companysystemData]) => {
            this.getUserRole(roleData);
            this.setState({ roleData: roleData, noticeData: noticeData.list, companysystemData: companysystemData.list, fetching: false });
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
                    <div className="card top-right notice-wrap">
                        <div className="card-top">
                            <div className="title">公司公告</div>
                            {/* <div className="more">MORE<img src={iconMore}/></div> */}
                        </div>
                        <div className="card-content">
                            { this.state.noticeData && this.state.noticeData.length > 1 ? this.state.noticeData.map(d => (
                                <div className="content-item" key={d.code}>
                                    <img className="icon" src={iconLi}/>
                                    <p className="txt">{d.notice.title}</p>
                                    <samp className="date">{dateFormat(d.notice.updateDatetime)}</samp>
                                </div>
                            )) : <div className="noData">暂无公司公告</div>}
                        </div>
                    </div>
                </div>
                <div className="below-wrap">
                    <div className="card companysystem-wrap">
                        <div className="card-top">
                            <div className="title">公司制度</div>
                        </div>
                        <div className="card-content">
                            { this.state.companysystemData && this.state.companysystemData.length > 1 ? this.state.companysystemData.map(d => (
                                <div className="content-item" key={d.code}>
                                    <img className="icon" src={iconLi}/>
                                    <p className="txt">{d.regime.content}</p>
                                    <samp className="date">{dateFormat(d.regime.updateDatetime)}</samp>
                                </div>
                            )) : <div className="noData">暂无公司制度</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
