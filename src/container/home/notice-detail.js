import React from 'react';
import { Spin, Button } from 'antd';
import { getQueryString, dateFormat } from 'common/js/util';
import fetch from 'common/js/fetch';
import './home.css';

class NoticeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            noticeData: {}
        };
        this.code = getQueryString('code', this.props.location.search);
    }
    componentDidMount() {
        fetch(632726, {code: this.code}).then((data) => {
            this.setState({ noticeData: data, fetching: false });
        }).catch(() => this.setState({ fetching: false }));
    }
    render() {
        const { noticeData } = this.state;
        return (
            <Spin spinning={this.state.fetching}>
                <div className="detail-wrap">
                    <div className="title">{noticeData.title}</div>
                    <div className="sub-title">发布部门：{noticeData.publishDepartmentName}<span>发布时间：{dateFormat(noticeData.updateDatetime)}</span></div>
                    <div className="content">{noticeData.content}</div>
                    <div className="button">
                        <Button onClick={() => {
                            this.props.history.go(-1);
                        }}>返回</Button>
                    </div>
                </div>
            </Spin>
        );
    }
}

export default NoticeDetail;
