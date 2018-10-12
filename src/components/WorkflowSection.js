import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';

import { ProcessFilterMenu } from './ProcessFilterMenu';
import { StateFilterMenu } from './StateFilterMenu';
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
  processFilter = '';
  stateFilter = '';
  stateFilter = '';
  sorter  = {};

  componentDidMount() {
    this.fetch(1);
  }

  handleReset = () => {
    this.searchText = '';
    this.processFilter = '';
    this.stateFilter = '';
    this.stateFilter = '';
    this.sorter  = {};
    this.fetch();
  }

  handleSortColumn = (sortColumn) => {
    this.sorter = {
      _sort: sortColumn,
      _order: this.sorter._order
    }
    this.fetch();
  }

  handleSortOrder = (sortOrder) => {
    this.sorter = {
      _sort: this.sorter._sort,
      _order: sortOrder
    }
    this.fetch();
  }

  handleProcessFilter = (selectedProcess) => {
    this.processFilter = selectedProcess;
    this.fetch();
  }

  handleStateFilter = (selectedState) => {
    this.stateFilter = selectedState;
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    }, () => this.fetch());
  };

  handleSearch = searchText => {
    this.searchText = searchText;
    this.fetch();
  };

  async fetch(_page) {
    let queryParams = {};
    if(this.stateFilter) {
      queryParams.state = this.stateFilter;
    }
    if(this.processFilter) {
      queryParams.process = this.processFilter;
    }
    if(this.searchText) {
      queryParams.q = this.searchText;
    }
    if(this.state.pagination.current) {
      queryParams._page = this.state.pagination.current;
    } else {
      queryParams._page = _page;
    }
    queryParams = {
      ...queryParams,
      ...this.sorter
    };
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
          <Button onClick={this.handleReset} style={{ marginRight: 'auto' }}>Reset</Button>
          <ProcessFilterMenu processFilter={this.handleProcessFilter} />
          <StateFilterMenu stateFilter={this.handleStateFilter} style={{ padding: '0 20px' }}/>
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
