import React from "react";
import { Carousel } from 'antd-mobile';

import axios from 'axios'
import Item from "antd-mobile/lib/popover/Item";

export default class Index extends React.Component {
    state = {
        // 轮播图状态数据
        swipers: []
    }

    // 获取轮播图数据的方法
    async getSwipers() {
        const res = await axios.get('http://localhost:8080/home/swiper')
        this.setState(() => {
            return {
                swipers: res.data.body
            }
        })
    }
    componentDidMount() {
        this.getSwipers()
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
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                />
            </a>
        ))
    }
    render() {
        return (
            <div className="index">
                <Carousel autoplay infinite autoplayInterval={3000}>
                    {this.renderSwiprs()}
                </Carousel>
            </div>
        );
    }
}