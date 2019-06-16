import React from 'react';
import { Form } from 'antd';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class tdunzhengxingAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            tdData: []
        };
    }
    componentDidMount() {
        fetch(632117, {creditUserCode: this.code}).then(data => {
            console.log(data);
            if(data) {
                let str = data.replace(/,/g, `,\\n`);
                str.replace(/{/, `{\\n`);
                str.replace(/}/, `}\\n`);
                str.replace(/:/, `:\\n`);
                let list = str.split('\\n');
                this.setState({
                    tdData: list
                });
            }
        });
    }
    render() {
        const fields = [{
            title: '征信结果',
            field: 'description',
            formatter: () => {
                return (<div id="description">{
                    this.state.tdData.map(item => (
                      <p><pre>{item}</pre></p>
                    ))
                }</div>);
            }
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: true
        });
    }
}

export default tdunzhengxingAddedit;
