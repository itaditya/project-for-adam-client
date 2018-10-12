import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const SortOrderMenu = ({ sortOrder, ...props }) => {
  const handleSortOrder = ({ key }) => {
    sortOrder(key);
  }

  const menu = (
    <Menu onClick={handleSortOrder}>
      <Menu.Item key="asc">Ascending</Menu.Item>
      <Menu.Item key="desc">Descending</Menu.Item>
    </Menu>
  );

  return (
    <div {...props}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Sort Order <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  )
}

export { SortOrderMenu };
