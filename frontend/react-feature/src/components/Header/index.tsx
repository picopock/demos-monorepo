import { Layout } from 'antd'
import Menu from '../Menu'
import 'antd/lib/layout/style/index'

const { Header } = Layout;

export default function CustomHeader() {
  return <Header>
    <div className="App-logo" />
    <Menu />
  </Header>
}