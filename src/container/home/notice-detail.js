import React from 'react';
import { Spin, Button } from 'antd';
import { getQueryString, dateFormat, dsctList, findDsct } from 'common/js/util';
import fetch from 'common/js/fetch';
import { getDictList } from 'api/dict';
import './home.css';

class NoticeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            noticeData: {},
            noticeType: []
        };
        this.code = getQueryString('code', this.props.location.search);
    }
    componentDidMount() {
        fetch(632726, {code: this.code}).then((data) => {
            this.setState({ noticeData: data, fetching: false });
        }).catch(() => this.setState({ fetching: false }));

        Promise.all([
            getDictList({ parentKey: 'notice_type' })
        ]).then(([
            noticeType
        ]) => {
            this.setState({
                noticeType: dsctList(noticeType)
            });
        });
    }
    render() {
        const { noticeData, noticeType } = this.state;
        return (
            <Spin spinning={this.state.fetching}>
                <div className="detail-wrap">
                    <div className="title">{noticeData.title}</div>
                    <div className="sub-title">发布部门：{noticeData.publishDepartmentName}<span>消息类型:{findDsct(noticeType, noticeData.type)}</span><span>发布时间：{dateFormat(noticeData.updateDatetime)}</span></div>
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
