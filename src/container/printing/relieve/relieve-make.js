import React from 'react';
import { getWorkbook } from 'common/js/xlsx-util';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/relieve-make';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase,
    dateFormat,
    formatDate
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.printingRelieveMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RelieveMake extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    // 生成担保合同
    createHt(data) {
        const wb = getWorkbook();
        this.createData(wb, data);
        this.createZysqb(wb);
        this.createSqwts(wb);
        this.createTjysqwt(wb);
        this.createHxlsqwt(wb);
        this.createKhwts(wb);
        this.createGswts(wb);
        // download
        wb.downloadXls('解除抵押-' + data.realName);
    }
    // 内容
    createData(wb, data) {
      let arr = [
          ['主贷人姓名', data.realName],
          ['车牌号', data.budgetOrder.carNumber]
      ];
      var ws = wb.getSheet(arr, '内容');
      ws['!cols'] = [
        {wch: 27.2},
        {wch: 40.3}
      ];
    }
    // 质押申请表（解除抵押）
    createZysqb(wb) {
      var ws = this.getSheet(wb, 10, 7, '质押申请表（解除抵押）');
      ws['!merges'] = [{
        e: {c: 3, r: 5},
        s: {c: 2, r: 5}
      }, {
        e: {c: 3, r: 9},
        s: {c: 2, r: 9}
      }];
      ws['!cols'] = [
        {wch: 8},
        {wch: 8.3},
        {wch: 8},
        {wch: 8},
        {wch: 10.3},
        {wch: 18.5},
        {wch: 10.2}
      ];
      ws['!rows'] = [
        null,
        null,
        null,
        null,
        null,
        {hpt: 34.5, hpx: 34.5},
        null,
        null,
        {hpt: 29.25, hpx: 29.25},
        {hpt: 33.75, hpx: 33.75}
      ];
      ws['C6'] = {v: '小型汽车', t: 's', w: '小型汽车'};
      ws['C10'].f = '内容!B1';
      ws['G6'].f = '内容!B2';

      ws['C6'].s = {font: {sz: 18}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['C10'].s = {font: {sz: 18}, alignment: {horizontal: 'right', vertical: 'bottom'}};
      ws['G6'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'bottom'}};
    }
    // 授权委托书（公司）
    createSqwts(wb) {
      var ws = this.getSheet(wb, 11, 3, '授权委托书（公司）');
      ws['!cols'] = [
        {wch: 9.3},
        {wch: 6.3},
        {wch: 8}
      ];
      ws['!rows'] = [
        null,
        null,
        null,
        null,
        {hpt: 4.5, hpx: 4.5},
        {hpt: 9.75, hpx: 9.75},
        {hpt: 7.5, hpx: 7.5},
        {hpt: 18.75, hpx: 18.75},
        {hpt: 12, hpx: 12},
        {hpt: 33.75, hpx: 33.75},
        {hpt: 19.5, hpx: 19.5}
      ];
      ws['A8'] = {v: '温州', t: 's', w: '温州'};
      ws['C11'].f = '内容!B2';
      ws['A8'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'top'}};
      ws['C11'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    }
    // 滕洁瑜授权委托(解除抵押登记)
    createTjysqwt(wb) {
      var ws = this.getSheet(wb, 14, 7, '滕洁瑜授权委托(解除抵押登记)');
      ws['!merges'] = [{
        e: {c: 6, r: 6},
        s: {c: 4, r: 6}
      }, {
        e: {c: 7, r: 7},
        s: {c: 4, r: 7}
      }, {
        e: {c: 6, r: 9},
        s: {c: 5, r: 8}
      }, {
        e: {c: 2, r: 10},
        s: {c: 1, r: 10}
      }];
      ws['!cols'] = [
        {wch: 9.3},
        {wch: 8},
        {wch: 8},
        {wch: 8.8},
        {wch: 8},
        {wch: 8},
        {wch: 9.3}
      ];
      ws['!rows'] = [
        null,
        null,
        null,
        {hpt: 21, hpx: 21},
        {hpt: 21, hpx: 21},
        {hpt: 21.75, hpx: 21.75},
        {hpt: 20.25, hpx: 20.25},
        {hpt: 0.75, hpx: 0.75},
        {hpt: 9, hpx: 9},
        {hpt: 22.5, hpx: 22.5},
        {hpt: 20.25, hpx: 20.25}
      ];
      ws['A6'] = {v: '温州', t: 's', w: '温州'};
      ws['B11'] = {v: '解除抵押登记', t: 's', w: '解除抵押登记'};
      ws['C7'] = {v: '滕洁瑜', t: 's', w: '滕洁瑜'};
      ws['E7'] = {v: '330302198107084841', t: 's', w: '330302198107084841'};
      ws['F9'].f = '内容!B2';
      ws['G14'] = {v: 90, t: 'n', w: '90'};

      ws['A6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
      ws['B11'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'top'}};
      ws['C7'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['E7'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'center'}};
      ws['F9'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
      ws['G14'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    }
    // 黄秀丽授权委托(解除抵押登记)
    createHxlsqwt(wb) {
      var ws = this.getSheet(wb, 14, 7, '黄秀丽授权委托(解除抵押登记)');
      ws['!merges'] = [{
        e: {c: 6, r: 6},
        s: {c: 4, r: 6}
      }, {
        e: {c: 7, r: 7},
        s: {c: 4, r: 7}
      }, {
        e: {c: 6, r: 9},
        s: {c: 5, r: 8}
      }, {
        e: {c: 2, r: 10},
        s: {c: 1, r: 10}
      }];
      ws['!cols'] = [
        {wch: 9.3},
        {wch: 8},
        {wch: 8},
        {wch: 8.8},
        {wch: 8},
        {wch: 8},
        {wch: 9.3}
      ];
      ws['!rows'] = [
        null,
        null,
        null,
        null,
        {hpt: 21, hpx: 21},
        {hpt: 21.75, hpx: 21.75},
        {hpt: 20.25, hpx: 20.25},
        {hpt: 0.75, hpx: 0.75},
        {hpt: 9, hpx: 9},
        {hpt: 22.5, hpx: 22.5},
        {hpt: 20.25, hpx: 20.25}
      ];
      ws['A6'] = {v: '温州', t: 's', w: '温州'};
      ws['B11'] = {v: '解除抵押登记', t: 's', w: '解除抵押登记'};
      ws['C7'] = {v: '黄秀丽', t: 's', w: '黄秀丽'};
      ws['E7'] = {v: '330304198503136925', t: 's', w: '330304198503136925'};
      ws['F9'].f = '内容!B2';
      ws['G14'] = {v: 90, t: 'n', w: '90'};

      ws['A6'].s = {font: {sz: 14}, alignment: {horizontal: 'left', vertical: 'bottom'}};
      ws['B11'].s = {font: {sz: 10}, alignment: {horizontal: 'left', vertical: 'top'}};
      ws['C7'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
      ws['E7'].s = {font: {sz: 14}, alignment: {horizontal: 'right', vertical: 'center'}};
      ws['F9'].s = {alignment: {horizontal: 'right', vertical: 'center'}};
      ws['G14'].s = {font: {sz: 14}, alignment: {horizontal: 'center', vertical: 'bottom'}};
    }
    // 客户委托书
    createKhwts(wb) {
      var ws = this.getSheet(wb, 9, 5, '客户委托书');
      ws['!merges'] = [{
        e: {c: 7, r: 7},
        s: {c: 6, r: 7}
      }, {
        e: {c: 4, r: 9},
        s: {c: 3, r: 9}
      }];
      ws['!cols'] = [
        {wch: 9.3},
        {wch: 6.3},
        {wch: 8},
        {wch: 8},
        {wch: 8}
      ];
      ws['!rows'] = [
        null,
        null,
        null,
        null,
        {hpt: 12.75, hpx: 12.75},
        {hpt: 18.75, hpx: 18.75},
        {hpt: 12, hpx: 12},
        {hpt: 33.75, hpx: 33.75},
        {hpt: 19.5, hpx: 19.5}
      ];
      ws['D9'] = {v: '温州浩源控股有限', t: 's', w: '温州浩源控股有限'};
      ws['E6'] = {v: '瑞安', t: 's', w: '瑞安'};

      ws['D9'].s = ws['E6'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    }
    // 公司委托书
    createGswts(wb) {
      var ws = this.getSheet(wb, 27, 5, '公司委托书');
      ws['!cols'] = [
        {wch: 9.3},
        {wch: 6.3},
        {wch: 8},
        {wch: 8},
        {wch: 8}
      ];
      ws['!rows'] = [];
      ws['!rows'][4] = {hpt: 12.75, hpx: 12.75};
      ws['!rows'][5] = {hpt: 18.75, hpx: 18.75};
      ws['!rows'][6] = {hpt: 33.75, hpx: 33.75};
      ws['!rows'][7] = {hpt: 19.5, hpx: 19.5};
      ws['!rows'][25] = {hpt: 21, hpx: 21};

      ws['C27'].f = '内容!B1';
      ws['D7'].f = '内容!B1';
      ws['E6'] = {v: '瑞安', t: 's', w: '瑞安'};

      ws['C27'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
      ws['D7'].s = {alignment: {horizontal: 'right', vertical: 'bottom'}};
      ws['E6'].s = {alignment: {horizontal: 'left', vertical: 'bottom'}};
    }
    // 获取margins
    getMargins() {
      return {
        bottom: 0.75,
        footer: 0.5,
        header: 0.5,
        left: 0.7,
        right: 0.7,
        top: 0.75
      };
    }
    // 获取sheet
    getSheet(wb, row, col, name) {
      var tmp = [];
      for (let i = col; i > 0; i--) {
        tmp.push('');
      }
      var data = [];
      for (let i = row; i > 0; i--) {
        data.push(tmp);
      }
      let ws = wb.getSheet(data, name);
      ws['!margins'] = this.getMargins();
      return ws;
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            readonly: true
        }, {
            title: '解除日期',
            field: 'releaseDatetime',
            type: 'date',
            required: true
        }, {
            title: '套打模版',
            field: 'releaseTemplateId',
            type: 'select',
            key: 'release_print_template_id',
            required: true
        }, {
            title: '备注',
            field: 'releaseNote',
            type: 'textarea',
            normalArea: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            buttons: [{
                    title: '打印',
                    check: true,
                    handler: (param) => {
                        param.operator = getUserId();
                        let pageData = this.props.pageData;
                        this.props.doFetching();
                        fetch(630576, param).then((data) => {
                            this.createHt(data);
                            this.props.cancelFetching();
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    }
                },
                {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }
            ]
        });
    }
}

export default RelieveMake;
