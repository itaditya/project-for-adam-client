import React, { Component } from 'react';
import axios from 'axios';

import { SortColumnMenu } from './SortColumnMenu';
import { SortOrderMenu } from './SortOrderMenu';
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

  sorter  = {
    _sort: 'title',
    _order: 'desc'
  }

  componentDidMount() {
    this.fetch({
      _page: 1
    });
  }

  handleSortColumn = (sortColumn) => {
    this.sorter = {
      _sort: sortColumn,
      _order: this.sorter._order
    }

    const queryParams = {
      ...this.sorter,
      ...this.filters,
      q: this.searchText,
      _page: this.state.pagination.current,
    }
    this.fetch(queryParams);
  }

  handleSortOrder = (sortOrder) => {
    this.sorter = {
      _sort: this.sorter._sort,
      _order: sortOrder
    }

    const queryParams = {
      ...this.sorter,
      ...this.filters,
      q: this.searchText,
      _page: this.state.pagination.current,
    }
    this.fetch(queryParams);
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.filters = filters;
    const queryParams = {
      ...this.sorter,
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
        <nav style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 0' }}>
          <SortColumnMenu sortBy={this.handleSortColumn} />
          <SortOrderMenu sortOrder={this.handleSortOrder} style={{ padding: '0 20px' }}/>
          <TableSearch
            onSearch={this.handleSearch}
            style={{ width: 200 }}
          />
        </nav>
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
