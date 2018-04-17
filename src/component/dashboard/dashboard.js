import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
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
import asyncComponent from '../async-component/async-component';
import ROUTES from 'src/route';
import './dashboard.css';
import logo from './logo.svg';

const { SubMenu, Item } = Menu;
const { Header, Content, Sider } = Layout;
const Home = asyncComponent(() => import('../../container/home/home'));

@connect(
  state => state.menu,
  { getMenuList, setTopCode, setSubMenuCode, setSubOpenCode, clearSubOpenCode, restoreSubOpenCode }
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleTopMenuClick = this.handleTopMenuClick.bind(this);
    this.handleSubMenuClick = this.handleSubMenuClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }
  componentDidMount() {
    this.props.getMenuList(this.props.location.pathname);
  }
  toggle() {
    if (this.state.collapsed) {
      this.props.restoreSubOpenCode();
    } else {
      this.props.clearSubOpenCode();
    }
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  handleTopMenuClick(e) {
    this.props.setTopCode(e.key);
    let url = this.props.top2SubObj[e.key][0].children[0].url.split('.')[0];
    this.props.history.push(url);
  }
  handleSubMenuClick(e) {
    this.props.setSubMenuCode(e.key);
    let url = this.props.menus[e.key].url.split('.')[0];
    this.props.history.push(url);
  }
  handleTitleClick(e) {
    this.props.setSubOpenCode(e.key);
  }
  getRoutes() {
    return ROUTES.map(v => <Route key={v.path} exact path={v.path} component={v.component}></Route>);
  }
  getBreadcrumb() {
    if (!this.props.topMenuCode || !this.props.subMenuCode) {
      return null;
    }
    return [
      this.props.menus[this.props.topMenuCode],
      this.props.menus[this.props.menus[this.props.subMenuCode].parentCode],
      this.props.menus[this.props.subMenuCode]
    ].map(v => (
      <Breadcrumb.Item key={v.code}>
        {v.url !== '#'
          ? <Link to={v.url.split('.')[0]}>
            {v.name}
          </Link> : v.name}
      </Breadcrumb.Item>
    ));
  }
  render() {
    const innerCls = this.props.topMenuCode ? '' : 'hidden';
    let rightCls = 'right-layout';
    if (!this.props.topMenuCode) {
      rightCls += ' full-right-content';
    } else if (this.state.collapsed) {
      rightCls += ' collapsed';
    }

    return (
      <Layout className="dashboard-layout">
        <Header className="header">
          <div className="logo">
            <img src={logo} alt=""/>
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
          </Menu>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            className={`left-slider ${innerCls}`}
          >
            <Menu
              mode="inline"
              selectedKeys={[this.props.subMenuCode]}
              openKeys={[...this.props.subOpenCode]}
              onClick={this.handleSubMenuClick}
              inlineCollapsed={this.state.collapsed}
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
                    <Icon type="desktop" />
                    <span>{v.name}</span>
                  </Item>
                )
              ))}
            </Menu>
          </Sider>
          <Layout className={rightCls}>
            <Icon
              className={`trigger ${innerCls}`}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Breadcrumb className={innerCls} style={{ margin: '16px 0', paddingLeft: 30 }}>
              {this.getBreadcrumb()}
            </Breadcrumb>
            <Content className="right-content">
              <Switch>
                <Route path='/' exact component={Home}></Route>
                {this.props.topMenuList.length ? this.getRoutes() : null}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
