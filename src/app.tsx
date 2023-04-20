import Footer from '@/components/Footer';
import {LinkOutlined} from '@ant-design/icons';
import type {RunTimeLayoutConfig} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';


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
    footerRender: () => <Footer/>,
    links:
      [<a key="github" href="https://github.com/hui-huo" target="_blank">
        <LinkOutlined/>
        <span>GitHub文档</span>
      </a>],
    menuHeaderRender: undefined,

    ...initialState?.settings,
  };
};

