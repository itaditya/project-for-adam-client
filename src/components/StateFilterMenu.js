import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const StateFilterMenu = ({ stateFilter, ...props }) => {
  const handleStateFilter = ({ key }) => {
    stateFilter(key);
  }

  const menu = (
    <Menu onClick={handleStateFilter}>
      <Menu.Item key="completed">Completed</Menu.Item>
      <Menu.Item key="in-progress">In Progress</Menu.Item>
      <Menu.Item key="failed">Failed</Menu.Item>
    </Menu>
  );

  return (
    <div {...props}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Filter By Status <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  )
}

export { StateFilterMenu };
