import React from 'react';
import ReactDOM from 'react-dom';

// 导入antd-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';

// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'

// 注意：我们自己写的全局样式需要放在组件库样式后面导入，这样，样式才会生效！
import './index.css';

import App from './App';

document.documentElement.addEventListener(
    "touchmove",
    function (e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    },
    false
)

ReactDOM.render(<App />, document.getElementById('root'));

