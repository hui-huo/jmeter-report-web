export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },
  // {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {path: '/admin', redirect: '/admin/sub-page'},
  //     {path: '/admin/sub-page', name: '二级管理页', component: './Admin'},
  //   ],
  // },
  // {name: '查询表格', icon: 'table', path: '/list', component: './TableList'},
  {name: '测试看板', icon: 'LineChartOutlined', path: '/dashboard', component: '@/pages/Dashboard'},
  {name: '测试报告', icon: 'PieChartOutlined', path: '/report', component: '@/pages/Report'},
  {name: '测试详情', icon: 'PieChartOutlined', path: '/detail/:id', component: '@/pages/TestDetail', hideInMenu: true},
  {path: '/', redirect: '/dashboard'},
  {path: '*', layout: false, component: './404'},
];
