import React from 'react';
import { Flex, Spin } from 'antd';

export const Loading = () => (
  <Flex gap="small" vertical>
    <Flex gap="small">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Flex>
  </Flex>
);
