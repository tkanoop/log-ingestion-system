import React from 'react';
import { Card, Tag } from 'antd';

import { formatDate } from '../utils/helper';

const levelColor = {
  error: 'red',
  warn: 'orange',
  info: 'blue',
  debug: 'gray',
};

const LogList = ({ logs, filters }) => {
  const {
    level,
    message,
    resourceId,
    timestamp_start,
    timestamp_end
  } = filters || {};

  // Apply filtering logic
  const filteredLogs = logs.filter(log => {
    const matchLevel = !level || log.level === level;
    const matchMessage = !message || log.message.toLowerCase().includes(message.toLowerCase());
    const matchResourceId = !resourceId || log.resourceId.toLowerCase().includes(resourceId.toLowerCase());
    const matchStart = !timestamp_start || new Date(log.timestamp) >= new Date(timestamp_start);
    const matchEnd = !timestamp_end || new Date(log.timestamp) <= new Date(timestamp_end);

    return matchLevel && matchMessage && matchResourceId && matchStart && matchEnd;
  });

  return (
    <div>
      {filteredLogs.map((log, index) => (
        <Card
          key={index}
          style={{
            marginBottom: 10,
            borderLeft: `5px solid ${levelColor[log.level] || 'gray'}`
          }}
        >
          <strong>{formatDate(log.timestamp)}</strong> -{" "}
          <Tag color={levelColor[log.level]}>{log.level.toUpperCase()}</Tag>
          <p><strong>Message:</strong> {log.message}</p>
          <p><strong>Resource ID:</strong> {log.resourceId}</p>
        </Card>
      ))}

      {filteredLogs.length === 0 && <p>No matching logs found.</p>}
    </div>
  );
};

export default LogList;
