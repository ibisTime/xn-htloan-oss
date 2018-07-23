import React from 'react';
import { connect } from 'react-redux';
import { Form, Collapse, Row, Col, Spin, Modal, Carousel, Button } from 'antd';
import { isUndefined, moneyParse, getUserId } from 'common/js/util';
import DetailComp from 'common/js/lib/DetailComp';
import ModalDetail from 'common/js/build-modal-detail';
import {PIC_PREFIX} from 'common/js/config';

const { Panel } = Collapse;
const col1Props = {xs: 32, sm: 24, md: 24, lg: 24};
const col2Props = {xs: 32, sm: 24, md: 12, lg: 12};
const col3Props = {xs: 32, sm: 24, md: 12, lg: 8};
const col33Props = {xs: 32, sm: 24, md: 24, lg: 8};
const col4Props = {xs: 32, sm: 24, md: 12, lg: 6};
const col5Props = {xs: 32, sm: 24, md: 12, lg: 5};
const col55Props = {xs: 32, sm: 24, md: 12, lg: 4};
const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
let lengthList = [];

class CollapseDetail extends DetailComp {
  buildDetail = (options) => {
    this.options = {
      ...this.options,
      ...options
    };
    if (this.first) {
      this.options.code && this.options.detailCode && this.getDetailInfo();
      this.props.initStates({ code: this.options.code, view: this.options.view });
    }
    this.fields = [];

    const children = [];
    const children1 = [];
    lengthList = [];
    this.options.fields.forEach((field, i) => {
      let comp;
      if (field.items) {
        if (!field.close) {
            lengthList.push(String(i));
        }
        comp = (
          <Panel header={field.title} key={i} className={field.hidden ? 'hidden' : ''}>
            {
              field.items.map((fld, k) => (
                <Row gutter={24} key={k}>
                  {
                    fld.map((f, j) => {
                      this.fields.push(f);
                      f.readonly = isUndefined(f.readonly) ? this.options.view : f.readonly;
                      if (f.type === 'citySelect') {
                        f.cFields = f.cFields || ['province', 'city', 'area'];
                      } else if (f.type === 'select') {
                        f.keyName = f.keyName || 'dkey';
                        f.valueName = f.valueName || 'dvalue';
                        if (!f.data) {
                          f.data = this.props.selectData[f.field];
                          this.first && this.getSelectData(f);
                        } else if (!this.props.selectData[f.field]) {
                          this.props.setSelectData({ data: f.data, key: f.field });
                        }
                      } else if (f.type === 'treeSelect') {
                          if (!f.data) {
                              f.data = this.props.selectData[f.field];
                              this.first && this.getTreeSelectData(f);
                          } else if (!this.props.selectData[f.field]) {
                              this.props.setSelectData({ data: f.data, key: f.field });
                          }
                      }
                      let props = fld.length === 1
                        ? col1Props
                        : fld.length === 2
                          ? col2Props
                          : fld.length === 3
                            ? j < 2 ? col3Props : col33Props
                            : fld.length === 4
                              ? col4Props
                              : fld.length === 5
                                ? j < 4 ? col5Props : col55Props
                                : col1Props;
                      return (
                        <Col {...props} key={f.field}>
                          {this.getItemByType(f.type, f)}
                        </Col>
                      );
                    })
                  }
                </Row>
              ))
            }
          </Panel>
        );
        children.push(comp);
      } else {
        this.fields.push(field);
        field.readonly = isUndefined(field.readonly) ? this.options.view : field.readonly;
        if (field.type === 'citySelect') {
          field.cFields = field.cFields || ['province', 'city', 'area'];
        } else if (field.type === 'select') {
          if (field.key) {
            field.keyName = field.keyName || 'dkey';
            field.valueName = field.valueName || 'dvalue';
          }
          if (!field.data) {
            field.data = this.props.selectData[field.field];
            this.first && this.getSelectData(field);
          } else if (!this.props.selectData[field.field]) {
            this.props.setSelectData({ data: field.data, key: field.field });
          }
        } else if (field.type === 'treeSelect') {
            if (!field.data) {
                field.data = this.props.selectData[field.field];
                this.first && this.getTreeSelectData(field);
            } else if (!this.props.selectData[field.field]) {
                this.props.setSelectData({ data: field.data, key: field.field });
            }
        }
        comp = this.getItemByType(field.type, field);
        children1.push(comp);
      }
    });
    this.first = false;
    return this.getPageComponent(children, children1);
  }
  beforeSubmit(err, values) {
    if (err) {
      return false;
    }
    let areaKeys = Object.keys(this.state.textareas);
    if (areaKeys.length && areaKeys.filter(v => this.state.textareas[v].validateStatus !== 'success').length) {
      return false;
    }
    areaKeys.forEach(v => values[v] = this.textareas[v].editorContent);
    let key = this.options.key || 'code';
    values[key] = isUndefined(values[key]) ? this.props.code || '' : values[key];
    this.fields.forEach(v => {
      if (v.amount) {
        values[v.field] = moneyParse(values[v.field], v.amountRate);
      } else if (v.type === 'citySelect') {
        let mid = values[v.field].map(a => a === '全部' ? '' : a);
        v.cFields.forEach((f, i) => {
          values[f] = mid[i];
        });
      } else if (v.type === 'date' || v.type === 'datetime') {
        let format = v.type === 'date' ? DATE_FORMAT : DATETIME_FORMAT;
        if (v.rangedate) {
          let bDate = values[v.field] ? [...values[v.field]] : [];
          if (bDate.length) {
            v.rangedate.forEach((d, i) => {
              values[d] = bDate[i].format(format);
            });
          }
        } else {
          values[v.field] = values[v.field] ? values[v.field].format(format) : values[v.field];
        }
      } else if (v.type === 'o2m') {
        values[v.field] = this.props.pageData[v.field];
      } else if (v.multiple) {
        values[v.field] = values[v.field] ? values[v.field].join(',') : '';
      }
    });
    values.updater = values.updater || getUserId();
    return values;
  }
  getPageComponent = (children, children1) => {
    const { previewImage, previewVisible } = this.state;
    let imgUrl = '';
    if (this.state.previewImageField && this.props.form.getFieldValue(this.state.previewImageField).split('||')) {
        let url = this.props.form.getFieldValue(this.state.previewImageField).split('||')[0];
        imgUrl = PIC_PREFIX + '/' + url + '?attname=' + url + '.jpg';
    }
    return (
      <Spin spinning={this.props.fetching}>
        <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
          <Collapse defaultActiveKey={lengthList}>
            {children}
          </Collapse>
          <div style={{marginTop: 20}}>
            {children1}
          </div>
          <div style={{marginTop: 20}}>
            {this.getBtns(this.options.buttons)}
          </div>
        </Form>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <div className="previewImg-wrap">
                  <Carousel ref={(carousel => this.carousel = carousel)} afterChange={(a) => {
                      let url = this.props.form.getFieldValue(this.state.previewImageField).split('||')[a];
                      imgUrl = PIC_PREFIX + '/' + url + '?attname=' + url + '.jpg';
                  }}>
                      {
                          this.state.previewImageField && this.props.form.getFieldValue(this.state.previewImageField).split('||').map(v => {
                              let url = PIC_PREFIX + '/' + v;
                              return (<div className='img-wrap' key={v}><img alt="图片" style={{width: '100%'}} src={url}/></div>);
                          })
                      }
                  </Carousel>
              </div>
              <div className="down-wrap">
                  <Button icon="left" onClick={() => this.carousel.prev()}></Button>
                  <Button style={{marginLeft: 20}} icon="right" onClick={() => this.carousel.next()}></Button>
                  <Button style={{marginLeft: 20}} onClick={() => { location.href = imgUrl; }} icon="download">下载</Button>
              </div>
          </Modal>
      </Spin>
    );
  }
  getInputItemProps() {
   return {};
  }
}

export const CollapseWrapper = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return Form.create()(connect(mapStateToProps, mapDispatchToProps)(
    class CollapseComponent extends CollapseDetail {
      render() {
        return (
          <div>
            <WrapComponent {...this.props} buildDetail={this.buildDetail}></WrapComponent>
            <ModalDetail
              title={this.state.modalOptions.title || ''}
              visible={this.state.modalVisible}
              hideModal={() => this.setState({modalVisible: false})}
              options={this.state.modalOptions}></ModalDetail>
          </div>
        );
      }
    }
  ));
};
