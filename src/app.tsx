import Footer from '@/components/Footer';
import {LinkOutlined} from '@ant-design/icons';
import type {RunTimeLayoutConfig} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import LOGO from '/public/logo.png'

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
  return {
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    title: ' JMeter Report',
    logo: LOGO,
    footerRender: () => <Footer/>,
    links:
      [<a key="github" href="https://github.com/hui-huo/jmeter_report_server" target="_blank">
        <LinkOutlined/>
        <span>使用文档</span>
      </a>],
    menuHeaderRender: undefined,

    ...initialState?.settings,
  };
};

