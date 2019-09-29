import React from 'react';
import { Carousel, Modal } from 'antd';
import {PIC_PREFIX} from 'common/js/config';

const styles = {
    leftBox: {
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '70px',
        fontSize: '48px'
    },
    toLeft: {
        position: 'absolute',
        left: '50%',
        top: '60%',
        margin: '-85px 0 0 -18px',
        width: '40px',
        height: '72px',
        color: '#a5a5a5',
        cursor: 'pointer'
    },
    rightBox: {
        position: 'absolute',
        right: '0',
        top: '0',
        bottom: '0',
        fontSize: '48px'
    },
    toRight: {
        position: 'absolute',
        right: '50%',
        top: '60%',
        margin: '-85px 0 0 -18px',
        width: '40px',
        height: '72px',
        color: '#a5a5a5',
        cursor: 'pointer'
    }
};

export default class CarouselComponent extends React.Component {
    state = {
        visible: false,
        title: '轮播图',
        carousePic: '',
        attachmentsList: []
    };
    welcome = null;
    onChange = (a) => {
        const {attachmentsList} = this.state;
        this.setState({
            title: attachmentsList[a].vname
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    shouldComponentUpdate(nextProps) {
        if(nextProps.visibleCarouse !== this.props.visibleCarouse) {
            this.setState({
                visible: true,
                carousePic: nextProps.carousePic
            }, () => {
                const {attachments} = this.props;
                let attachmentsList = [];
                if(Array.isArray(attachments)) {
                    attachments.forEach(item => {
                        if((item.dvalue).indexOf('||') !== -1) {
                            const urlList = item.dvalue.split('||');
                            urlList.forEach(itemUrl => {
                                attachmentsList.push({
                                    ...item,
                                    dvalue: itemUrl
                                });
                            });
                        }else {
                            attachmentsList.push({
                                ...item
                            });
                        }
                    });
                }
                attachmentsList.forEach((item, index) => {
                    if(item.dvalue === this.state.carousePic) {
                        setTimeout(() => {
                            this.welcome.goTo(index);
                        }, 100);
                    }
                });
                this.setState({
                    attachmentsList
                });
            });
        }
        return true;
    }
    render() {
        const {attachmentsList, visible, title} = this.state;
        return (
            <Modal
                title={title}
                visible={visible}
                footer={null}
                onCancel={this.handleCancel}
                width={800}
            >
                {
                    visible && (
                        <Carousel
                            afterChange={this.onChange}
                            ref={(ev) => {
                                this.welcome = ev;
                            }}
                            dots={false}
                            style={{marginTop: '100px', paddingBottom: '60px'}}
                        >
                            {
                                Array.isArray(attachmentsList) && attachmentsList.map((item, index) => (
                                    <div key={`attac_${index}`}>
                                        <img src={PIC_PREFIX + item.dvalue} alt="" style={{width: '100%', height: '400px'}}/>
                                    </div>
                                ))
                            }
                        </Carousel>
                    )
                }
                <div style={styles.leftBox}>
                    <span style={styles.toLeft} onClick={() => {
                        this.welcome.prev();
                    }}> &lt; </span>
                </div>
                <div style={styles.rightBox}>
                    <span style={styles.toRight} onClick={() => {
                        this.welcome.next();
                    }}>&gt;</span>
                </div>
            </Modal>
        );
    }
}