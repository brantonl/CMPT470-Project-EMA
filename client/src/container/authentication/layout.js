import React from "react";
import { Layout } from 'antd';

const { Content } = Layout;

export default (content) => {
  return (
    <Layout style={{ height:"100vh" }}>
      <Content style={{ marginTop: '300px' }}>
        {content}
      </Content>
    </Layout>
  );
};
