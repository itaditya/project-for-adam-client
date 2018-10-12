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
      key: 'process',
      filterMultiple: false,
      filters: [
        { text: 'Archived', value: 'archived' },
        { text: 'QC', value: 'qc' },
        { text: 'Archiving', value: 'archiving' },
        { text: 'TX Master', value: 'tx-master' }
      ]
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      filterMultiple: false,
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'In Progress', value: 'in-progress' },
        { text: 'Failed', value: 'failed' }
      ]
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
