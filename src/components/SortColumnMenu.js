import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const SortColumnMenu = ({ sortBy, ...props }) => {
  const handleSortColumn = ({ key }) => {
    sortBy(key);
  }

  const menu = (
    <Menu onClick={handleSortColumn}>
      <Menu.Item key="id">UID</Menu.Item>
      <Menu.Item key="title">Title</Menu.Item>
      <Menu.Item key="dr">HDR/SDR</Menu.Item>
      <Menu.Item key="frameRate">Frame Rate</Menu.Item>
      <Menu.Item key="audio">Audio</Menu.Item>
      <Menu.Item key="type">Type</Menu.Item>
      <Menu.Item key="license">License</Menu.Item>
      <Menu.Item key="lastUpdate">Last Update</Menu.Item>
      <Menu.Item key="process">Process</Menu.Item>
      <Menu.Item key="state">State</Menu.Item>
    </Menu>
  );

  return (
    <div {...props}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Sort By <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  )
}

export { SortColumnMenu };
