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
        width: '30px',
        height: '60px',
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
        margin: '-85px 18px 0 0',
        width: '30px',
        height: '60px',
        cursor: 'pointer'
    },
    carousel_btn: {
        marginTop: 40,
        marginBottom: 20,
        display: 'flex',
        jujustifyContent: 'center',
        alignItems: 'center'
    }
};

const categoryObj = {
    'credit_user': '人员信息',
    'car_procedure': '车辆手续',
    'loan_material': '贷款材料',
    'door_investigate': '上门调查',
    'car_photo': '车辆照片'
};

export default class CarouselComponent extends React.Component {
    state = {
        visible: false,
        title: '轮播图',
        carousePic: '',
        attachmentsList: [],
        carouselBtnList: [],
        attachmentsObj: {}
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
                const {carouselBtnList, attachmentsObj} = this.state;
                let attachmentsList = [];
                if(Array.isArray(attachments)) {
                    attachments.forEach(item => {
                        if(carouselBtnList.indexOf(item.category) === -1) {
                            carouselBtnList.push(item.category);
                            attachmentsObj[item.category] = [];
                        }
                        if((item.dvalue).indexOf('||') !== -1) {
                            const urlList = item.dvalue.split('||');
                            urlList.forEach(itemUrl => {
                                attachmentsList.push({
                                    ...item,
                                    dvalue: itemUrl
                                });
                                attachmentsObj[item.category].push({
                                    ...item,
                                    dvalue: itemUrl
                                });
                            });
                        }else {
                            attachmentsList.push({
                                ...item
                            });
                            attachmentsObj[item.category].push({
                                ...item
                            });
                        }
                    });
                }
                attachmentsList.forEach((item, index) => {
                    if(item.dvalue === this.state.carousePic) {
                        setTimeout(() => {
                            this.setState({
                                title: attachmentsList[index].vname
                            });
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
    changeCarousel = (category) => {
        this.setState({
            attachmentsList: this.state.attachmentsObj[category]
        });
    };
    render() {
        const {attachmentsList, visible, title, carouselBtnList} = this.state;
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
                                        <img src={PIC_PREFIX + item.dvalue} alt="" style={{maxWidth: '100%', height: '550px', margin: '0 auto'}}/>
                                    </div>
                                ))
                            }
                        </Carousel>
                    )
                }
                <div style={styles.carousel_btn}>
                    {
                        carouselBtnList.map(item => (
                            <span
                                key={item}
                                style={{
                                    fontSize: 16,
                                    color: '#1791FF',
                                    marginRight: 20,
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    this.changeCarousel(item);
                                }}
                            >{categoryObj[item]}</span>
                        ))
                    }
                </div>
                <div style={styles.leftBox}>
                    <img src={require('./left.png')} style={styles.toLeft} onClick={() => {
                        this.welcome.prev();
                    }}/>
                </div>
                <div style={styles.rightBox}>
                    <img src={require('./right.png')} style={styles.toRight} onClick={() => {
                        this.welcome.next();
                    }}/>
                </div>
            </Modal>
        );
    }
}