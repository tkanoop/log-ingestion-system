import React from 'react';
import { Input, Select, DatePicker, Row, Col } from 'antd';


const { RangePicker } = DatePicker;
const { Option } = Select;

const levels = ['error', 'warn', 'info', 'debug'];

const FilterBar = ({ filters, setFilters }) => {
  const onChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <Input
          placeholder="Search message"
          onChange={e => onChange('message', e.target.value)}
        />
      </Col>
      <Col span={4}>
        <Select
          placeholder="Level"
          allowClear
          style={{ width: '100%' }}
          onChange={value => onChange('level', value)}
        >
          {levels.map(lvl => (
            <Option key={lvl} value={lvl}>{lvl}</Option>
          ))}
        </Select>
      </Col>
      <Col span={4}>
        <Input
          placeholder="Resource ID"
          onChange={e => onChange('resourceId', e.target.value)}
        />
      </Col>
      <Col span={6}>
        <RangePicker
          showTime
          onChange={(dates) => {
            if (!dates) return;
            onChange('timestamp_start', dates[0]?.toISOString());
            onChange('timestamp_end', dates[1]?.toISOString());
          }}
        />
      </Col>
    </Row>
  );
};

export default FilterBar;
