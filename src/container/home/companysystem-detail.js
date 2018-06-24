import React from 'react';
import {
    Spin, Button
} from 'antd';
import { Link } from 'react-router-dom';
import {
    getQueryString,
    getUserName,
    getRoleCode,
    dateFormat
} from 'common/js/util';
import { getRoleList } from 'api/company';
import fetch from 'common/js/fetch';
import './home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            regimeData: {}
        };
        this.code = getQueryString('code', this.props.location.search);
    }
    componentDidMount() {
        this.setState({ fetching: true });
        fetch(632736, {code: this.code}).then((data) => {
            this.setState({ regimeData: data, fetching: false });
        }).catch(this.setState({ fetching: false }));
    }

    render() {
        return (
            <Spin spinning={this.state.fetching}>
                <div className="detail-wrap">
                    <div className="title">{this.state.regimeData.regimeCode}</div>
                    <div className="content">{this.state.regimeData.content}</div>
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

export default Home;
