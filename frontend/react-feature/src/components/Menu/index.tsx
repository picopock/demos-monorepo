import { Menu } from 'antd';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { navs } from './config';
import './index.scss';

export default function CustomMenu() {
  const [selectedKey] = useState(() => {
    const url = window.location.pathname;
    const findRoute = navs.find((nav) => {
      return nav.path === url;
    });
    return findRoute?.key ?? '0';
  });

  const items = useMemo(() => {
    return navs.map((nav) => {
      return {
        ...nav,
        label: <Link to={nav.path}>{nav.title}</Link>,
      };
    });
  }, []);
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[selectedKey]}
      items={items}
    />
  );
}
