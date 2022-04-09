import axios from "axios";
import { HOST } from "../cofing/address";

// 创建并导出获取定位城市的函数 getCurrentCity
export const getCurrentCity = () => {
    const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
    // 判断localCity是否有定位城市
    if (!localCity) {
        // 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
        return new Promise((resolve, reject) => {
            const myCity = new window.BMapGL.LocalCity();
            myCity.get(async res => {
                try {
                    // console.log(res, '当前城市信息');
                    const result = await axios.get(HOST + `/area/info?name=${res.name}`)
                    // result.data.body => {label: '上海', value: ''}
                    //存储到本地存储中
                    localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
                    //返回城市数据
                    resolve(result.data.body)
                } catch (e) {
                    // 获取定位城市失败
                    reject(e)
                }
            })
        })
    }

    // 如果有，直接返回本地存储中的城市数据
    // 注意：因为上面为了处理异步操作，使用了promise，因此，为了该函数返回值的统一，此处也应该使用promise
    // 因为此处的promise不会失败直接返回成功的promise
    return Promise.resolve(localCity)
}