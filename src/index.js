import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { WorkflowSection } from './components/WorkflowSection';

function App() {
  return (
    <div className="App">
      <WorkflowSection />
    </div>
  );
}

if (module.hot) {
  module.hot.accept();
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
