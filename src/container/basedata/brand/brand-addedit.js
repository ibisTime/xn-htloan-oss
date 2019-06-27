import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class BrandAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '品牌名称',
            field: 'brandName',
            required: true
        }, {
            title: '品牌logo',
            field: 'brandLogo',
            type: 'img',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630486,
            addCode: 630480,
            editCode: 630482
        });
    }
}

export default BrandAddEdit;
