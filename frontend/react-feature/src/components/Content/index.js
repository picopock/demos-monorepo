import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import BatchUpdate from '../../containers/BatchUpdate'
import DiffDemo from '../../containers/DiffDemo'
import ReactEvent from '../../containers/ReactEvent'
import RecoilDemo from '../../containers/RecoilDemo'
import ThemeContext from '../../containers/ThemeContext'
import { navs } from '../Menu/config'

const { Content } = Layout


function CustomContent(props) {

  const [breadcrumb, updateBreadcrumb] = useState(() => {
    const url = window.location.pathname
    const findRoute = navs.find((nav) => {
      return nav.path === url
    })
    return findRoute?.title ?? '0'
  })

  const { location } = props
  useEffect(() => {
    console.log(location)
    const { pathname } = location
    const findRoute = navs.find((nav) => {
      return nav.path === pathname
    })
    updateBreadcrumb(findRoute?.title || 'Home')
  }, [location])

  return <Content style={{ padding: '0 50px'}}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
    </Breadcrumb>
    <div>
      <Switch>
        <Route path="/themeContext">
          <ThemeContext />
        </Route>
        <Route path="/batchUpdate">
          <BatchUpdate />
        </Route>
        <Route path="/diffDemo">
          <DiffDemo />
        </Route>
        <Route path="/reactEvent">
          <ReactEvent />
        </Route>
        <Route path="/recoil">
          <RecoilDemo />
        </Route>
      </Switch>
    </div>
  </Content>
}

export default withRouter(CustomContent)