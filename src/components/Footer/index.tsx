import {GithubOutlined} from '@ant-design/icons';
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
      links={[
        {
          key: 'JMeterReport',
          title: 'JMeter Report',
          href: 'https://github.com/hui-huo',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://github.com/hui-huo',
          blankTarget: true,
        },
        {
          key: 'hui-huo',
          title: 'hui-huo',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
