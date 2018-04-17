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
} from '@redux/general/text-param';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.generalTextParam,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class TextParam extends React.Component {
  render() {
    const fields = [{
      field: 'remark',
      title: '参数说明'
    }, {
      field: 'cvalue',
      title: '参数值',
      formatter: (e, t) => {
        return t.type === 'richText'
          ? <div dangerouslySetInnerHTML={{__html: e}}></div>
          : t.ckey === 'VALID_TIME'
              ? t.cvalue + '分钟'
              : t.ckey === 'weixinID' ? JSON.parse(t.cvalue).id : t.cvalue;
      }
    }];
    return this.props.buildList({
      fields,
      pageCode: 805915,
      rowKey: 'id',
      searchParams: {
        type: 'text'
      },
      btnEvent: {
        edit: (key, item) => {
          if (!key || !key.length || !item || !item.length) {
            showWarnMsg('请选择记录');
          } else {
            this.props.history.push(`/general/textParam/addedit?code=${key[0]}&ckey=${item[0].ckey}&type=${item[0].type}`);
          }
        }
      }
    });
  }
}

export default TextParam;
