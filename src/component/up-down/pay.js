import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import {getQueryString, showSucMsg, getUserName} from 'common/js/util';

class UpDown extends React.Component {
    render() {
        let {code, key = 'code', biz, onOk, hideLoc, locKey} = this.props;
        const options = {
            fields: [{
                field: key,
                value: code,
                hidden: true
            }, {
                field: 'amount',
                title: '奖励金额',
                required: true,
                number: true
            }, {
                field: 'payNote',
                title: '奖励说明',
                required: true,
                maxlength: 30
            }],
            addCode: biz,
            beforeSubmit: (data) => {
                data.payUser = getUserName();
                return data;
            }
        };
        if (onOk) {
            options.onOk = () => onOk();
        }
        return (
            <ModalDetail
                title='支付'
                visible={this.props.updownVisible}
                hideModal={() => this.props.setModalVisible(false)}
                options={options}/>
        );
    }
}

export default UpDown;
