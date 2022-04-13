import React from "react";
import { Toast } from "antd-mobile"
import "./index.scss"
import axios from "axios";
import { HOST } from "../../cofing/address";
import { getCurrentCity } from "../../utils";
import { List, AutoSizer } from 'react-virtualized';
import NavHeader from '../../components/NavHeader';

// 数据格式化的方法
// list:[{},{}]
const formatCityData = (list) => {
    const cityList = {}
    // const cityIndex = []

    // 遍历list数组
    list.forEach(item => {
        const first = item.short.substr(0, 1)
        // console.log(first);
        if (cityList[first]) {
            cityList[first].push(item)
        } else {
            cityList[first] = [item]
        }
    });

    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort()
    return {
        cityList,
        cityIndex,
    }
}
// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 封装字母索引的方法
const formatCityIndex = (letter) => {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toUpperCase()//转换大小写d
    }
}

const HOUSE_CITY = ['北京', '上海', '广州', '深圳']


export default class CityList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cityList: {},
            cityIndex: [],
            activeIndex: 0,
        }
        // 创建ref对象
        this.cityListComponent = React.createRef()
    }



    async componentDidMount() {
        await this.getCityList()

        // 调用measureAllRows
        this.cityListComponent.current.measureAllRows()
    }
    // 获取城市列表数据
    async getCityList() {
        const res = await axios.get(HOST + '/area/city?level=1')
        // console.log(res, '城市列表数据');
        const { cityList, cityIndex } = formatCityData(res.data.body)

        //获取热门城市数据
        const hotRes = await axios.get(HOST + '/area/hot')
        // console.log(hotRes, '热门城市数据');
        cityList['hot'] = hotRes.data.body
        cityIndex.unshift('hot')

        // 获取当前定位城市
        const curCity = await getCurrentCity()
        cityList['#'] = [curCity]
        cityIndex.unshift('#')

        // console.log(cityList, cityIndex, curCity);
        this.setState({
            cityList,
            cityIndex,
        })
    }


    changeCity({ label, value }) {
        if (HOUSE_CITY.indexOf(label) > -1) {
            localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
            this.props.history.go(-1)
        } else {
            Toast.info('该城市无房源信息', 1, null, false);
        }
    }

    // List组件渲染每一行的方法
    rowRenderer = ({
        key,
        index, // 索引号
        isScrolling, // 当前项是否正在滚动中
        isVisible, // 当前项在List中是可见的
        style, // 一定要给每一行数据添加该样式 指定每一行的位置
    }) => {
        const { cityIndex, cityList } = this.state
        const letter = cityIndex[index]
        // console.log(cityList);
        return (
            <div key={key} style={style} className="city">
                <div className="title">{formatCityIndex(letter)}</div>
                {cityList[letter].map(item => (
                    <div className="name" key={item.value} onClick={() => this.changeCity(item)}>
                        {item.label}
                    </div>
                ))}
            </div>
        );
    }
    // 创建动态计算每一行的高度
    getRowheight = ({ index }) => {
        const { cityIndex, cityList } = this.state
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }

    // 封装渲染右侧索引的方法
    renderCityIndex() {
        const { cityIndex, activeIndex } = this.state
        return cityIndex.map((item, index) =>
            <li
                className="city-index-item"
                key={item}
                onClick={() =>
                    this.cityListComponent.current.scrollToRow(index)
                }
            >
                <span className={activeIndex === index ? 'index-active' : ''}>
                    {item === 'hot' ? '热' : item.toUpperCase()}
                </span>
            </li >)
    }
    // 用于获取List组件渲染行的信息
    onRowsRendered = ({ startIndex }) => {
        // console.log('startIndex', startIndex);
        if (this.state.activeIndex !== startIndex) {
            this.setState({
                activeIndex: startIndex
            })
        }
    }

    render() {
        return (
            <div className="citylist">
                {/* 顶部导航栏 */}
                <NavHeader>
                    城市选择
                </NavHeader>
                {/* 城市列表 */}
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            ref={this.cityListComponent}
                            width={width}
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.getRowheight}
                            rowRenderer={this.rowRenderer}
                            onRowsRendered={this.onRowsRendered}
                            scrollToAlignment="start"
                        />
                    )}
                </AutoSizer>
                <ul className="city-index">
                    {this.renderCityIndex()}
                </ul>
            </div>
        )
    }
}