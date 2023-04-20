import {Settings as LayoutSettings} from '@ant-design/pro-components';


// @ts-ignore
/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '',
  // @ts-ignore
  breakpoint: false,
  defaultCollapsed: true,
};

export default Settings;
