import { Breadcrumb, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { navs } from '../Menu/config';

const { Content } = Layout;

export type ICustomContentProps = {};

function CustomContent(props: ICustomContentProps) {
  const location = useLocation();

  const [breadcrumb, updateBreadcrumb] = useState(() => {
    const url = location.pathname;
    const findRoute = navs.find((nav) => {
      return nav.path === url;
    });
    return findRoute?.title ?? '0';
  });

  useEffect(() => {
    const { pathname } = location;
    const findRoute = navs.find((nav) => {
      return nav.path === pathname;
    });
    updateBreadcrumb(findRoute?.title || 'Home');
  }, [location]);

  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb
        style={{ margin: '16px 0' }}
        items={[{ title: breadcrumb }]}
      />
      <div>
        <Outlet />
      </div>
    </Content>
  );
}

export default CustomContent;
