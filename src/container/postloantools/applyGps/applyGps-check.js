import React from 'react';
import { Form, Row } from 'antd';
import { getQueryString, showWarnMsg, showSucMsg, getUserId,
  isExpressConfirm } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';
import './applyGps.css';

@Form.create()
class applyGpsCheck extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.type = !!getQueryString('type', this.props.location.search);// 公司0  个人1
    this.state = {
      checkboxItems: [],
      remark: '',
      userInfoObject: {},
        searchValue: ''
    };
    fetch(632707, {applyStatus: '0', useStatus: '0'}).then(data => {
      console.log(data);
      let gpsList = [];
      data.map((item, index) => {
        gpsList.push({
          code: item.code,
          gpsDevNo: item.gpsDevNo,
          checked: false
        });
        this.setState({
          checkboxItems: gpsList
        });
      });
    });
    // 获取信息
    fetch(632716, {code: this.code}).then(data => {
        this.setState({
            userInfoObject: data
        });
    });
  }
  getVal = (index) => {
    let items = [...this.state.checkboxItems];
    items[index].checked = !items[index].checked;
    this.setState({
      checkboxItems: items
    });
  }
  handleChange = (e) => {
    this.setState({
        remark: e.target.value
    });
  }
    handleChangeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }
  sendOk = () => {
      const {checkboxItems, remark} = this.state;
      let gpsList = [];
      checkboxItems.map((item) => {
          if(item.checked) {
              gpsList.push({
                  code: item.code
              });
          }
      });
      if(gpsList.length > 0) {
          fetch(632711, {code: this.code, operator: getUserId(), gpsList: gpsList, remark: remark}).then((data) => {
              showSucMsg('操作成功');
              setTimeout(() => {
                  this.props.history.go(-1);
              }, 1000);
          });
      }else {
          showWarnMsg('GPS列表不能为空!');
      }
  }
  sendError = () => {
      const {remark} = this.state;
      fetch(632712, {code: this.code, operator: getUserId(), remark: remark}).then((data) => {
          showSucMsg('操作成功');
          setTimeout(() => {
              this.props.history.go(-1);
          }, 1000);
      });
  }
    // 返回
    toBack = () => {
        this.props.history.go(-1);
    };
    searchInfo = () => {
        const {searchValue} = this.state;
        this.setState({
            checkboxItems: []
        });
        fetch(632707, {gpsDevNo: searchValue, applyStatus: '0', useStatus: '0'}).then(data => {
            let gpsList = [];
            data.map((item, index) => {
                gpsList.push({
                    code: item.code,
                    gpsDevNo: item.gpsDevNo,
                    checked: false
                });
                this.setState({
                    checkboxItems: gpsList
                });
            });
        });
    }
  render() {
    const {remark, userInfoObject, searchValue, checkboxItems} = this.state;
    return (
        <div style={{width: '100%'}}>
          <div className="title-line">
            <strong>申领团队:</strong>
              <span>{userInfoObject.teamName}</span>
          </div>
          <div className="title-line">
            <strong>有线个数:</strong>
              <span>{userInfoObject.applyWiredCount}</span>
          </div>
          <div className="title-line">
            <strong>无线个数:</strong>
              <span>{userInfoObject.applyWirelessCount}</span>
          </div>
          <div className="title-line">
            <strong>申领人:</strong>
              <span>{userInfoObject.applyUserName + '-' + userInfoObject.roleName}</span>
          </div>
          <div className="title-line">
            <strong>申领原因:</strong>
              <span>{userInfoObject.applyReason}</span>
          </div>
          <div style={{marginLeft: '36%'}}>
            <strong>请选择GPS编号:</strong>
            <div>
                <input type="text" value={searchValue} onChange={(e) => this.handleChangeSearch(e)} className="preLoan-body-input" />
                <button onClick={this.searchInfo} style={{width: '80px', height: '32px', marginLeft: '20px', borderRadius: '2px'}}>搜索</button>
            </div>
            <div style={{width: '400px', height: '300px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '20px'}}>
              {
                checkboxItems.map((ele, index) => {
                  return (
                      <span key={index} style={{marginRight: '30px', display: 'block', float: 'left'}}>
                       <input
                           type="checkbox"
                           name=""
                           value={index}
                           checked={ele.checked}
                           onChange={() => this.getVal(index)}
                           style={{marginRight: '10px'}}
                       />
                       <span>{ele.gpsDevNo}</span>
                    </span>
                  );
                })
              }
            </div>
          </div>
          <div className="title-line">
              <strong><span style={{color: 'red'}}>* </span>审核意见:</strong>
            <input type="text" value={remark} onChange={(e) => this.handleChange(e)} className="preLoan-body-input" />
          </div>
            <Row>
                <div className="preLoan-body-btn-group">
                    <span className="preLoan-body-btn-gray" onClick={this.sendOk}>通过</span>
                    <span className="preLoan-body-btn-gray" onClick={this.sendError} style={{marginLeft: '60px'}}>不通过</span>
                    <span className="preLoan-body-btn-gray" style={{float: 'right'}} onClick={this.toBack}>返回</span>
                    <div className="clear"></div>
                </div>
            </Row>
        </div>
    );
  }
}

export default applyGpsCheck;
