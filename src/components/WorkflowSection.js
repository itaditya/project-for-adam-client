import React, { Component } from 'react';
import axios from 'axios';

import { WorkflowTable } from './WorkflowTable';
import { TableSearch } from './TableSearch';

const apiBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://projectforadam.herokuapp.com';

class WorkflowSection extends Component {
  state = {
    works: [],
    pagination: {},
    loading: false
  };

  searchText = '';

  componentDidMount() {
    this.fetch({
      _page: 1
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.filters = filters;
    const queryParams = {
      ...filters,
      _page: pagination.current,
      q: this.searchText
    };

    this.fetch(queryParams);
  };

  handleSearch = searchText => {
    this.searchText = searchText;
    const queryParams = {
      ...this.filters,
      q: searchText
    };

    console.log(queryParams);
    this.fetch(queryParams);
  };

  async fetch(queryParams) {
    this.setState({ loading: true });
    let works = [];
    let totalCount = 0;
    try {
      const jsonResponse = await axios.get(`${apiBaseUrl}/works`, {
        params: queryParams
      });
      works = jsonResponse.data;
      totalCount = parseInt(jsonResponse.headers['x-total-count']);
    } catch (err) {
      console.log('err', err);
    }
    const pagination = { ...this.state.pagination };
    pagination.total = totalCount;
    this.setState({
      works,
      pagination,
      loading: false
    });
  }

  render() {
    return (
      <section style={{ padding: '20px' }}>
        <h1>Workflow Status</h1>
        <TableSearch
          onSearch={this.handleSearch}
          style={{ width: 200, marginLeft: 'auto', padding: '10px 0' }}
        />
        <WorkflowTable
          workData={this.state.works}
          loading={this.state.loading}
          pagination={this.state.pagination}
          handleTableChange={this.handleTableChange}
        />
      </section>
    );
  }
}

export { WorkflowSection };
