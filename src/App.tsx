import React from 'react';

import { Layout, SearchEngine } from '@components';

import 'antd/dist/antd.css';

const App: React.VFC = (): React.ReactElement => (
  <Layout title='Numéros'>
    <SearchEngine />
  </Layout>
);

export default App;
