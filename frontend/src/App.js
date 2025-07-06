import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin } from 'antd';
import { getLogs } from './services/api';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await getLogs(filters);
        setLogs(data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [filters]);

  return (
    <Layout style={{ padding: '24px' }}>
      <Header style={{ background: '#fff' }}>
        <Title level={2}>Log Viewer</Title>
      </Header>
      <Content style={{ marginTop: '20px' }}>
        <FilterBar filters={filters} setFilters={setFilters} />
        {loading ? <Spin /> : <LogList logs={logs} />}
      </Content>
    </Layout>
  );
}

export default App;
