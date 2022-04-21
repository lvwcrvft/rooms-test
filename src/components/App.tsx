import React from "react";
import './AppStyles.css'
import { TableComponent } from "./Table";
import { PageHeader } from 'antd';

const App: React.FC = () => {
  return (
    <div className="body">
      <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Свободные номера"
  />
      <TableComponent />
    </div>
  );
};
export { App };
