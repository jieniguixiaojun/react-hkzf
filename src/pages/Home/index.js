import React from "react";
import { Route } from 'react-router-dom'
import News from "../News";
import { TabBar } from 'antd-mobile';
import './index.css'

export default class Home extends React.Component {
    state = {
        // 默认选中的TabBar菜单
        selectedTab: 'redTab',
    };
    // 渲染每个TabBar内容
    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                    }}
                >
                    Click to show/hide tab-bar
                </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            fullScreen: !this.state.fullScreen,
                        });
                    }}
                >
                    Click to switch fullscreen
                </a>
            </div>
        );
    }
    render() {
        return (
            <div className="home">
                {/* 渲染子路由 */}
                <Route path="/home/news" component={News} />

                {/* TabBar */}
                <TabBar
                    tintColor="#21b92a"
                    noRenderContent={true}
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={<i className="iconfont icon-ind" />}
                        selectedIcon={<i className="iconfont icon-ind" />}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                            // 路由切换
                            this.props.history.push('/home/index')
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-findHouse" />}
                        selectedIcon={<i className="iconfont icon-findHouse" />}
                        title="找房"
                        key="Koubei"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                            // 路由切换
                            this.props.history.push('/home/list')
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-infom" />}
                        selectedIcon={<i className="iconfont icon-infom" />}
                        title="资讯"
                        key="Friend"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                            // 路由切换
                            this.props.history.push('/home/news')
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-my" />}
                        selectedIcon={<i className="iconfont icon-my" />}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                            // 路由切换
                            this.props.history.push('/home/profile')
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        )

    }
}