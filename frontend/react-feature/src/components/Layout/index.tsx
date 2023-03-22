import { FC, memo } from 'react';
import { Layout as AntdLayout } from 'antd';
import Content from '../Content';
import Footer from '../Footer';
import Header from '../Header';

interface LayoutProps {
  className?: string;
}

const Layout: FC<LayoutProps> = props => {
  const { className = '' } = props;
  return <AntdLayout className={`layout ${className}`}>
      <Header />
      <Content />
      <Footer />
    </AntdLayout>;
};

export default memo(Layout);
