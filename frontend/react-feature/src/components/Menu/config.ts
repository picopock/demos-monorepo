export const navs = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/themeContext',
    title: 'Theme Context',
  },
  {
    path: '/batchUpdate',
    title: 'Batch Update',
  },
  {
    path: '/diffDemo',
    title: 'Diff Demo',
  },
  {
    path: '/reactEvent',
    title: 'React Event',
  },
  {
    path: '/zustand',
    title: 'State Manager: zustand',
  },
].map((nav, index) => ({ ...nav, key: index.toString() }));
