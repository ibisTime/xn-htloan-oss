import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/tool/tool';
import {
    showWarnMsg,
    getRoleCode,
    dateTimeFormat,
    getTeamCode,
    getUserId,
    formatDate,
    moneyFormat2
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    creditWithdraw
} from 'api/biz';
import { Modal } from 'antd';
import { PIC_PREFIX } from 'common/js/config';

@listWrapper(
    state => ({
        ...state.Tool,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData,
    }
)
class Tool extends React.Component {
    render() {
        const fields = [{
            title: '客户及分期信息',
            field: 'videoUrl',
            render(v, d) {
                return (
                  <div style={{'display': 'flex'}}>
                      <div style={{width: '300px', 'overflow': 'scroll', 'textOverflow': 'ellipsis', 'whiteSpace': 'nowrap', 'padding': '10px 0'}}>
                          <p>客户姓名：{d.creditUser.userName}</p>
                          <p>身份证号：{d.creditUser.idNo}</p>
                          <p>意向车型：{d.carInfoRes.carBrandName ? `${d.carInfoRes.carBrandName}-${d.carInfoRes.carSeriesName}-${d.carInfoRes.carModelName}-${d.carInfoRes.carColor}` : '-'}</p>
                      </div>
                  </div>
                );
            }
        }, {
            title: '面签视频',
            field: 'videoUrl',
            render(v, d) {
                if(d.attachments) {
                    let yhVideo = d.attachments.filter(item => item.vname === '银行视频')[0];
                    let gsVideo = d.attachments.filter(item => item.vname === '公司视频')[0];
                    if(!yhVideo.url.includes('http') && !gsVideo.url.includes('http')) {
                        return (
                          <div>
                              <p>银行视频：<a href={PIC_PREFIX + yhVideo.url} target="view_window">{yhVideo.url}</a></p>
                              <p>公司视频：<a href={PIC_PREFIX + gsVideo.url} target="view_window">{gsVideo.url}</a></p>
                          </div>
                        );
                    }else if(yhVideo.url.includes('http') && !gsVideo.url.includes('http')) {
                        return (
                          <div>
                              <p>银行视频：<a href={yhVideo.url} target="view_window">{yhVideo.url}</a></p>
                              <p>公司视频：<a href={PIC_PREFIX + gsVideo.url} target="view_window">{gsVideo.url}</a></p>
                          </div>
                        );
                    } else if(!yhVideo.url.includes('http') && gsVideo.url.includes('http')) {
                        return (
                          <div>
                              <p>银行视频：<a href={PIC_PREFIX + yhVideo.url} target="view_window">{yhVideo.url}</a></p>
                              <p>公司视频：<a href={gsVideo.url} target="view_window">{gsVideo.url}</a></p>
                          </div>
                        );
                    } else {
                        return (
                          <div>
                              <p>银行视频：<a href={yhVideo.url} target="view_window">{yhVideo.url}</a></p>
                              <p>公司视频：<a href={gsVideo.url} target="view_window">{gsVideo.url}</a></p>
                          </div>
                        );
                    }
                }
                return null;
            }
        }, {
            title: '身份证正面',
            field: 'startTime',
            render(v, d) {
                if(d.attachments) {
                    let zmPic = d.attachments.filter(item => item.vname === '申请人身份证正面')[0];
                    return <img style={{ width: '90%' }} src={PIC_PREFIX + zmPic.url}/>;
                }
            }
        }, {
            title: '身份证反面',
            field: 'endTime1',
            render(v, d) {
                if(d.attachments) {
                    let fmPic = d.attachments.filter(item => item.vname === '申请人身份证反面')[0];
                    return <img style={{ width: '90%' }} src={PIC_PREFIX + fmPic.url}/>;
                }
            }
        }, {
            title: '报告生成时间',
            field: 'intevDateTime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632957,
            searchParams: {
                userId: getUserId(),
                roleCode: getRoleCode(),
                intevCurNodeCodeList: ['b03']
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        window.open(selectedRows[0].videoUrl, '_bank');
                    }
                }
            }
        });
    }
}

export default Tool;
