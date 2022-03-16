import React from "react";
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import './index.css'
import Index from "../Index";
import HouseList from "../HouseList";
import News from "../News";
import Profile from "../Profile";

// TabBar 数据
const tabItems = [
    {
        title: '首页',
        icon: 'icon-ind',
        path: '/home',
    },
    {
        title: '找房',
        icon: 'icon-findHouse',
        path: '/home/list',
    },
    {
        title: '资讯',
        icon: 'icon-infom',
        path: '/home/news',
    },
    {
        title: '我的',
        icon: 'icon-my',
        path: '/home/profile',
    },
]

export default class Home extends React.Component {
    state = {
        // 默认选中的TabBar菜单
        selectedTab: this.props.location.pathname,
    };
    componentDidUpdate(prevProps) {
        // console.log('上一次路由信息', prevProps.location);
        // console.log('当前路由信息', this.props.location);
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                selectedTab: this.props.location.pathname,
            })
        }
    }
    // 渲染TabBar.Item
    renderTabBarItem() {
        return tabItems.map(item => <TabBar.Item
            title={item.title}
            key={item.title}
            icon={<i className={`iconfont ${item.icon}`} />}
            selectedIcon={<i className={`iconfont ${item.icon}`} />}
            selected={this.state.selectedTab === item.path}
            onPress={() => {
                this.setState({
                    selectedTab: item.path,
                });
                // 路由切换
                this.props.history.push(item.path)
            }}
        />)
    }
    render() {
        return (
            <div className="home">
                {/* 渲染子路由 */}
                <Route exact path="/home" component={Index} />
                <Route path="/home/list" component={HouseList} />
                <Route path="/home/news" component={News} />
                <Route path="/home/profile" component={Profile} />
                {/* TabBar */}
                <TabBar tintColor="#21b92a" noRenderContent={true} barTintColor="white">
                    {this.renderTabBarItem()}
                </TabBar>
            </div>
        )

    }
}