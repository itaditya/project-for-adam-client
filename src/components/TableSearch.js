import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const TableSearch = ({ onSearch, ...props }) => (
  <div {...props}>
    <Search placeholder="Search" onSearch={onSearch} />
  </div>
);

export { TableSearch };
