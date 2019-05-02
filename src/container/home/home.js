import React from 'react';
import {
    Button, Icon, Spin, Upload, Modal
} from 'antd';
import { Link } from 'react-router-dom';
import {
    getUserName,
    getRoleCode,
    dateFormat,
    formatImg,
    showWarnMsg,
    showSucMsg,
    getNowCurNodePageUrl
} from 'common/js/util';
import { getRoleList } from 'api/company';
import { getDictList } from 'api/dict';
import { getQiniuToken } from 'api/general';
import { getUser, setUserPhoto } from 'api/user';
import { getPageMyNotice, getPageMyCompanysystem, getPageMyToDoList, getCurNodeCode } from 'api/home';
// import { getPageMyNotice, getPageMyCompanysystem, getCurNodeCode } from 'api/home';
import { PIC_PREFIX, PIC_BASEURL_L, UPLOAD_URL } from 'common/js/config';
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
            nodeTypeData: {},
            userData: null,
            loading: false,
            imgVisible: false,
            imageUrl: null,
            previewVisible: false,
            previewImage: '',
            qiniuToken: '',
            fileList: null
        };
    }
    componentDidMount() {
        this.setState({ fetching: true });
        Promise.all([
            getQiniuToken(),
            getRoleList(),
            getPageMyNotice(),
            getPageMyCompanysystem(),
            getUser(),
            getPageMyToDoList(),
            getCurNodeCode(),
            getDictList({parentKey: 'node_type'})
        ]).then(([qiniuToken, roleData, noticeData, companysystemData, userData, toDoListData, curNodeData, nodeType]) => {
            console.log(toDoListData);
            let curNodeD = {};
            let nodeTypeD = {};
            curNodeData.map(v => {
                curNodeD[v.code] = v.name;
            });
            nodeType && nodeType.map(v => {
                nodeTypeD[v.dkey] = v.dvalue;
            });
            if (userData && !userData.photo) {
                userData.photo = userPhoto;
            } else {
                userData.photo = formatImg(userData.photo, '?imageMogr2/auto-orient/thumbnail/!400x400r');
            }
            roleData && this.getUserRole(roleData);
            this.setState({
                qiniuToken: qiniuToken.uploadToken,
                roleData: roleData,
                noticeData: noticeData.list,
                companysystemData: companysystemData.list,
                userData: userData,
                fetching: false,
                toDoListData: toDoListData.list,
                curNodeData: curNodeD,
                nodeTypeData: nodeTypeD
            });
        }).catch(() => this.setState({ fetching: false }));
    }

    // 获取用户角色
    getUserRole = (roleData) => {
        let roleCode = getRoleCode();
        roleData.map(v => {
            if (v.code === roleCode) {
                this.setState({role: v.name});
                return false;
            }
        });
    }

    handleCancel = () => this.setState({ imgVisible: false, fileList: [] })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }

    setUploadFileUrl(file) {
        this.setState({ fileList: [file] });
        let format = formatImg;
        if (!file.url && file.status === 'done' && file.response) {
            file.url = format(file.response.key);
        }
    }

    // 头像上传
    handlerSetUserPhoto = () => {
        if (!this.state.fileList || this.state.fileList.length > 1) {
            showWarnMsg('请上传头像');
            return false;
        }
        this.setState({ fetching: true });
        let key = this.state.fileList[0].key ? this.state.fileList[0].key : this.state.fileList[0].response.key;
        setUserPhoto(key).then(() => {
            showSucMsg('操作成功！');
            this.setState({
                imgVisible: false,
                fileList: [],
                userData: { ...this.state.userData, photo: formatImg(key, '?imageMogr2/auto-orient/thumbnail/!400x400r') },
                fetching: false
            });
        }).catch(() => this.setState({ fetching: false }));
    }

    render() {
        const imgProps = {
            action: UPLOAD_URL,
            multiple: false,
            className: 'avatar-uploader',
            defaultFileList: [],
            data: {token: this.state.qiniuToken},
            showUploadList: {
                showPreviewIcon: true,
                showRemoveIcon: true
            },
            onChange: ({file}) => this.setUploadFileUrl(file, true),
            onPreview: (file) => this.handlePreview(file),
            listType: 'picture-card',
            accept: 'image/*',
            fileList: this.state.fileList,
            onRemove: () => this.setState({ fileList: [] })
        };
        return (

            <Spin spinning={this.state.fetching}>
            <div className="home-wrap">
                <div className="top-wrap">
                    <div className="card user-wrap">
                        <div className="card-top">
                            <div className="photo" onClick={() => this.setState({imgVisible: true})}>
                                {this.state.userData && (<div style={{backgroundImage: 'url(' + this.state.userData.photo + ')'}}></div>)}
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="user-name">
                                {this.state.userData && this.state.userData.realName}
                            </div>
                            <div className="user-post">岗位：{this.state.userData && this.state.userData.postName}</div>
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
                            { this.state.toDoListData && this.state.toDoListData.length >= 1 ? this.state.toDoListData.map(d => (
                                <div className="content-item" key={d.id}>
                                    <Link to={getNowCurNodePageUrl(d)}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.companyName} 客户{d.userName} {this.state.nodeTypeData[d.flowTypeCode]} {this.state.curNodeData[d.curNodeCode]}</p>
                                        <samp className="date">{dateFormat(d.startDatetime)}</samp>
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
                            { this.state.noticeData && this.state.noticeData.length >= 1 ? this.state.noticeData.map(d => (
                                <div className="content-item" key={d.code}>
                                    <Link to={'/home/noticeDetail?code=' + d.code}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.title}</p>
                                        <samp className="date">{dateFormat(d.updateDatetime)}</samp>
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
                            { this.state.companysystemData && this.state.companysystemData.length >= 1 ? this.state.companysystemData.map(d => (
                                <div className="content-item" key={d.code}>
                                    <Link to={'/notice/companysystem/addedit?v=1&code=' + d.code}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.content}</p>
                                        <samp className="date">{dateFormat(d.updateDatetime)}</samp>
                                    </Link>
                                </div>
                            )) : <div className="noData"><img src={noData}/><p>暂无公司制度</p></div>}
                        </div>
                    </div>
                </div>
                <div className="home-avatar-wrap">
                    <Modal width={360} visible={this.state.imgVisible} footer={null} onCancel={this.handleCancel}>
                        <Upload {...imgProps}>
                            <div>
                                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </Upload>
                        <div className="down-wrap">
                            <Button type="primary" onClick={this.handlerSetUserPhoto}>修改</Button>
                        </div>
                    </Modal>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.setState({previewVisible: false})}>
                        {
                            this.state.previewVisible && this.state.fileList.map(v => {
                                let key = v.key ? v.key : v.response.key;
                                let url = PIC_PREFIX + '/' + key + PIC_BASEURL_L;
                                return (<div className='img-wrap' key={key}><img alt="图片" style={{width: '100%'}} src={url}/></div>);
                            })
                        }
                    </Modal>
                </div>
            </div>
            </Spin>
        );
    }
}

export default Home;
