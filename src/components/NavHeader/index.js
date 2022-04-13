import React from "react";
import { NavBar } from "antd-mobile";
import "./index.scss"
// 导入withRouter高阶组件
import { withRouter } from "react-router-dom";
// 导入 prop 校验

import { PropTypes } from 'prop-types';

function NavHeader({ children, history, onLeftClick }) {
    // 添加 prop 校验
    NavHeader.propTypes = {
        children: PropTypes.string.isRequired,
        onLeftClick: PropTypes.func
    }

    const defaultHandlf = () => history.go(-1)
    return (
        <NavBar
            className="navbar"
            mode="light"
            icon={<i className="iconfont icon-back" />}
            onLeftClick={onLeftClick || defaultHandlf}
        >{children}</NavBar>


    )
}
export default withRouter(NavHeader)