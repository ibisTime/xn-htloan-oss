import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import ListComp from './lib/ListComp';

export const listWrapper = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return Form.create()(connect(mapStateToProps, mapDispatchToProps)(
    class ListComponent extends ListComp {
      render() {
        return <WrapComponent {...this.props} buildList={this.buildList} getPageData={this.getPageData}></WrapComponent>;
      }
    }
  ));
};
