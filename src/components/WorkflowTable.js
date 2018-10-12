import React from 'react';
import { Table } from 'antd';

const WorkflowTable = ({ workData, handleTableChange, ...props }) => {
  const tableColumns = [
    {
      title: 'UID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'HDR/SDR',
      dataIndex: 'dr',
      key: 'dr'
    },
    {
      title: 'Frame Rate',
      dataIndex: 'frameRate',
      key: 'frameRate'
    },
    {
      title: 'Audio',
      dataIndex: 'audio',
      key: 'audio'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'License',
      dataIndex: 'license',
      key: 'license'
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate'
    },
    {
      title: 'Process',
      dataIndex: 'process',
      key: 'process'
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state'
    }
  ];

  return (
    <Table
      dataSource={workData}
      columns={tableColumns}
      rowKey={record => record.id}
      onChange={handleTableChange}
      bordered
      {...props}
    />
  );
};

export { WorkflowTable };
