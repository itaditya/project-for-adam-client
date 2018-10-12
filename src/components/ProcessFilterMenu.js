import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const ProcessFilterMenu = ({ processFilter, ...props }) => {
  const handleProcessFilter = ({ key }) => {
    processFilter(key);
  }

  const menu = (
    <Menu onClick={handleProcessFilter}>
      <Menu.Item key="archived">Archived</Menu.Item>
      <Menu.Item key="archiving">Archiving</Menu.Item>
      <Menu.Item key="tx-master">TX Master</Menu.Item>
      <Menu.Item key="qc">QC</Menu.Item>
    </Menu>
  );

  return (
    <div {...props}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Filter By Process <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  )
}

export { ProcessFilterMenu };
