import React from "react";
// 导入组件
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import Item from "antd-mobile/lib/popover/Item";
// 导入axios
import axios from 'axios'
// 导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
// 导入样式文件
import './index.scss'
import { HOST } from "../../cofing/address";
import { getCurrentCity } from "../../utils";
// 导航菜单数据
const navs = [
    {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/home/list'
    },
    {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/home/list'
    },
    {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/home/list'
    },
    {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/home/list'
    },

]
// 获取地理位置信息
navigator.geolocation.getCurrentPosition(position => {
    console.log(position, '当前位置信息');
})
export default class Index extends React.Component {
    state = {
        // 轮播图状态数据
        swipers: [],
        isSwipersLoaded: false,
        // 租房小组数据
        groups: [],
        //咨询的数据
        news: [],
        // 当前城市名称
        curCityName: "上海",
    }

    // 获取轮播图数据的方法
    async getSwipers() {
        const res = await axios.get(HOST + `/home/swiper`)
        this.setState(() => {
            return {
                swipers: res.data.body,
                isSwipersLoaded: true,
            }
        })
    }

    // 获取租房小组数据
    async getGroups() {
        const res = await axios.get(HOST + '/home/groups?', {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        })
        // console.log(res);
        this.setState({
            groups: res.data.body,
        })
    }

    // 获取咨询的数据
    async getNews() {
        const res = await axios.get(HOST + '/home/news?', {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        })
        // console.log(res);
        this.setState({
            news: res.data.body,
        })
    }

    // 城市信息
    async getMycity() {
        // 通过ip定位获取当前城市名称
        // const myCity = new window.BMapGL.LocalCity();
        // myCity.get(async res => {
        //     // console.log(res, '当前城市信息');
        //     const result = await axios.get(HOST + `/area/info?name=${res.name}`)
        //     // console.log(result);
        //     this.setState({
        //         curCityName: result.data.body.label,
        //     })
        // })
        const curCity = await getCurrentCity()
        this.setState({
            curCityName: curCity.label
        })

    }
    //组件都render完之后调用
    componentDidMount() {
        this.getSwipers()
        this.getGroups()
        this.getNews()
        this.getMycity()
    }

    // 渲染轮播图结构
    renderSwiprs() {
        return this.state.swipers.map(item => (
            <a
                key={Item.id}
                href="https://itcast.cn"
                style={{
                    display: 'inline-block',
                    width: '100%',
                    height: 212
                }}
            >
                <img
                    src={HOST + item.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                />
            </a>
        ))
    }
    // 渲染导航菜单
    renderNavs() {
        return navs.map(item => (
            <Flex.Item
                key={item.id} onClick={() => this.props.history.push(item.path)}>
                <img src={item.img} alt="" />
                <h2>{item.title}</h2>
            </Flex.Item>)
        )
    }
    // 渲染最新资讯
    renderNews() {
        return this.state.news.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img
                        className="img"
                        src={HOST + item.imgSrc}
                        alt=""
                    />
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }

    render() {
        return (
            <div className="index">
                {/* 轮播图 */}
                <div className="swiper">
                    {this.state.isSwipersLoaded ? (
                        <Carousel autoplay infinite autoplayInterval={3000}>
                            {this.renderSwiprs()}
                        </Carousel>
                    ) : (
                        ''
                    )}
                    {/* 搜索框 */}
                    <Flex className="search-box">
                        {/* 左侧白色区域 */}
                        <Flex className="search">
                            {/* 位置 */}
                            <div
                                className="location"
                                onClick={() => this.props.history.push('/citylist')}
                            >
                                <span className="name">{this.state.curCityName}</span>
                                <i className="iconfont icon-arrow" />
                            </div>

                            {/* 搜索表单 */}
                            <div
                                className="form"
                                onClick={() => this.props.history.push('/search')}
                            >
                                <i className="iconfont icon-seach" />
                                <span className="text">请输入小区或地址</span>
                            </div>
                        </Flex>
                        {/* 右侧地图图标 */}
                        <i
                            className="iconfont icon-map"
                            onClick={() => this.props.history.push('/map')}
                        />
                    </Flex>
                </div>
                {/* 导航菜单 */}
                <Flex className="nav">{this.renderNavs()}</Flex>
                {/* 租房小组 */}
                <div className="group">
                    <h3 className="group-title">
                        租房小组 <span className="more">更多</span>
                    </h3>
                    {/* 宫格组件 */}
                    <Grid
                        columnNum={2}
                        data={this.state.groups}
                        square={false}
                        hasLine={false}
                        renderItem={(item) => (
                            <Flex className="group-item" justify="around" key={item.id}>
                                <div className="desc">
                                    <p className="title">{item.title}</p>
                                    <span className="info">{item.desc}</span>
                                </div>
                                <img
                                    src={HOST + item.imgSrc}
                                    alt=""
                                />
                            </Flex>
                        )
                        } />
                </div>
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>

        );
    }
}