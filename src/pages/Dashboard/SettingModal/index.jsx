import React from 'react';
import {ModalForm, ProFormSelect} from '@ant-design/pro-components';
import {useModel} from "@@/exports";

function SettingModal({setFilter, setText, visible, setVisible}) {
  const {baseInfo} = useModel('base');

  const convertValueEnum = (data) => {
    let valueEnum = {}
    data.map((value) => {
      valueEnum[value] = value
    })
    return valueEnum
  }

  return (<>
    <ModalForm
      title="设置"
      width="360px"
      layout="horizontal"
      open={visible}
      onFinish={async (record) => {
        let text = ''
        const {project, env} = record
        if (project && env) {
          text = `${project} | ${env}`
        } else if (project) {
          text = `${project}`
        } else if (env) {
          text = `${env}`
        } else {
          text = `全部`
        }
        setFilter({...record})
        setText(text)
        return true;
      }}
      onOpenChange={setVisible}
    >
      <ProFormSelect
        width="sm"
        label="项目名称"
        name="project"
        valueEnum={convertValueEnum(baseInfo?.project)}
      />
      <ProFormSelect
        width="sm"
        label="执行环境"
        name="env"
        valueEnum={convertValueEnum(baseInfo?.env)}
      />

    </ModalForm>
  </>);
}

export default SettingModal;
