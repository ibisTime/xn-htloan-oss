import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getMenuList,
  setTopCode,
  setSubMenuCode,
  setSubOpenCode,
  clearSubOpenCode,
  restoreSubOpenCode
} from '@redux/menu';
import { clearUser } from 'common/js/util';
import asyncComponent from '../async-component/async-component';
import EditPwd from 'component/edit-pwd/edit-pwd';
import ROUTES from 'src/route';
import './dashboard.css';
import logo from './logo.svg';

const { SubMenu, Item } = Menu;
const { Header, Content, Sider } = Layout;
const Home = asyncComponent(() => import('../../container/home/home'));

@connect(
  state => ({ ...state.menu, loginName: state.user.loginName }),
  { getMenuList, setTopCode, setSubMenuCode, setSubOpenCode, clearSubOpenCode, restoreSubOpenCode }
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editPwdVisible: false
    };
    this.handleTopMenuClick = this.handleTopMenuClick.bind(this);
    this.handleSubMenuClick = this.handleSubMenuClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }
  componentDidMount() {
    this.props.getMenuList(this.props.location.pathname);
  }
  handleTopMenuClick(e) {
    if (e.key && e.key !== 'user') {
      this.props.setTopCode(e.key);
      let leftMenu = this.props.top2SubObj[e.key][0];
      leftMenu = leftMenu.children ? leftMenu.children[0] : leftMenu;
      let url = leftMenu.url.split('.')[0];
      this.props.history.push(url);
    }
  }
  handleSubMenuClick(e) {
    if (e.key) {
      this.props.setSubMenuCode(e.key);
      let url = this.props.menus[e.key].url.split('.')[0];
      this.props.history.push(url);
    }
  }
  handleTitleClick(e) {
    if (e.key) {
      this.props.setSubOpenCode(e.key);
    }
  }
  logout = (e) => {
    clearUser();
    window.location.href = '/login';
  }
  setEditPwdVisible = (editPwdVisible) => {
    this.setState({ editPwdVisible });
  }
  getRoutes() {
    return ROUTES.map(v => <Route key={v.path} exact path={v.path} component={v.component}></Route>);
  }
  getBreadcrumb() {
    if (!this.props.topMenuCode || !this.props.subMenuCode) {
      return null;
    }
    let menuArr = [
      this.props.menus[this.props.topMenuCode],
      this.props.menus[this.props.menus[this.props.subMenuCode].parentCode],
      this.props.menus[this.props.subMenuCode]
    ];
    if (this.props.menus[this.props.subMenuCode].parentCode === this.props.topMenuCode) {
      menuArr.splice(1, 1);
    }
    return menuArr.map(v => (
      <Breadcrumb.Item key={v.code}>
        {v.url !== '#'
          ? <Link to={v.url.split('.')[0]}>
            {v.name}
          </Link> : v.name}
      </Breadcrumb.Item>
    ));
  }
  getHeader() {
    const userShow = (
      <Menu>
        <Menu.Item><a href="#" onClick={() => this.setEditPwdVisible(true)}>修改密码</a></Menu.Item>
        <Menu.Item><a href="#" onClick={this.logout}>退出</a></Menu.Item>
      </Menu>
    );
    return (
      <Header className="header">
        <div className="logo">
          <img src={logo}/>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          onClick={this.handleTopMenuClick}
          selectedKeys={[this.props.topMenuCode]}
        >
          {this.props.topMenuList.map(v => (
            <Item key={v.code}>{v.name}</Item>
          ))}
          <Item key="user" style={{float: 'right'}}>
            <Dropdown overlay={userShow}>
              <a href="#" style={{display: 'inline'}}>
                {this.props.loginName} <Icon type="down" />
              </a>
            </Dropdown>
          </Item>
        </Menu>
        <EditPwd editPwdVisible={this.state.editPwdVisible} setEditPwdVisible={this.setEditPwdVisible}/>
      </Header>
    );
  }
  getLeftSlider() {
    return this.props.subMenuList.length ? (
      <Menu
        mode="inline"
        selectedKeys={[this.props.subMenuCode]}
        openKeys={[...this.props.subOpenCode]}
        onClick={this.handleSubMenuClick}
      >
        {this.props.subMenuList.map(v => (
          v.children ? (
            <SubMenu
              key={`${v.code}`}
              onTitleClick={this.handleTitleClick}
              title={<span><Icon type="desktop"/><span>{v.name}</span></span>}
            >
              {v.children.map(c => <Item key={c.code}>{c.name}</Item>)}
            </SubMenu>
          ) : (
            <Item key={v.code}>
              <Icon type="" />
              <span>{v.name}</span>
            </Item>
          )
        ))}
      </Menu>
    ) : null;
  }
  getContent(rightCls, innerCls) {
    return (
      <Layout className={rightCls}>
        <Breadcrumb className={innerCls} style={{ margin: '16px 0' }}>
          {this.getBreadcrumb()}
        </Breadcrumb>
        <Content className="right-content">
          <Switch>
            <Route path='/' exact component={Home}></Route>
            {this.props.topMenuList.length ? this.getRoutes() : null}
          </Switch>
        </Content>
      </Layout>
    );
  }
  render() {
    const innerCls = this.props.topMenuCode ? '' : 'hidden';
    let rightCls = 'right-layout';
    if (!this.props.topMenuCode) {
      rightCls += ' full-right-content';
    }
    return (
      <Layout className="dashboard-layout">
        {this.getHeader()}
        <Layout>
          <Sider
            trigger={null}
            className={`left-slider ${innerCls}`}
          >
            {this.getLeftSlider()}
          </Sider>
          {this.getContent(rightCls, innerCls)}
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
