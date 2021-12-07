import './index.scss'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { navs } from './config'
import { Menu } from 'antd'

export default function CustomMenu() {
  const [ selectedKey ] = useState(() => {
    const url = window.location.pathname
    const findRoute = navs.find((nav) => {
      return nav.path === url
    })
    return findRoute?.key ?? '0'
  })
  return <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedKey]}>
  {
    navs.map(nav => {
      return <Menu.Item key={nav.key}>
        <Link to={nav.path}>{nav.title}</Link>
      </Menu.Item>
    })
  }
</Menu>
}