export default [
  {name: '测试看板', icon: 'LineChartOutlined', path: '/dashboard', component: '@/pages/Dashboard'},
  {name: '测试报告', icon: 'PieChartOutlined', path: '/report', component: '@/pages/Report'},
  {name: '测试详情', icon: 'PieChartOutlined', path: '/detail/:id', component: '@/pages/TestDetail', hideInMenu: true},
  {path: '/', redirect: '/dashboard'},
  {path: '*', layout: false, component: './404'},
];
