import React from 'react'
// 导入样式
import './index.scss'
import NavHeader from '../../components/NavHeader';

export default class Map extends React.Component {
    componentDidMount() {
        //初始化地图实例
        // react全局对象要用window访问
        const map = new window.BMapGL.Map("container");
        // 设置中心点坐标
        const point = new window.BMapGL.Point(116.404, 39.915);
        // 初始化地图
        map.centerAndZoom(point, 15);
    }
    render() {
        return (

            <div className='map'>
                <NavHeader>
                    地图找房
                </NavHeader>
                <div id="container"></div>
            </div>
        )

    }
}