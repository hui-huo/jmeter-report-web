// import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import '@umijs/max';

const Footer: React.FC = () => {

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      // copyright={`${currentYear} ${defaultMessage}`}
      copyright={false}
      // links={[
      //   {
      //     key: 'JMeter',
      //     title: 'JMeter',
      //     href: 'https://jmeter.apache.org',
      //     blankTarget: true,
      //   },
      //   {
      //     key: 'github',
      //     title: <GithubOutlined/>,
      //     href: 'https://github.com/hui-huo',
      //     blankTarget: true,
      //   },
      //   // {
      //   //   key: 'hui-huo',
      //   //   title: 'huihuo',
      //   //   href: 'https://github.com/hui-huo',
      //   //   blankTarget: true,
      //   // },
      // ]}
    />
  );
};
export default Footer;
