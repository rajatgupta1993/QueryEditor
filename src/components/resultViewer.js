import React, { useMemo } from "react";
import "../styles/resultViewerStyles.css";
import { getTableColumns } from "../utils";
import TableView from "./TableView";

const ResultViewer = ({ result = [], isLoading, isOldResultFlag }) => {
  const columns = useMemo(() => {
    const columnArr = getTableColumns(result[0], []);
    return columnArr;
  }, [result]);

  if (!result?.length) {
    return (
      <div className="table-cont">
        <div className="empty-cont">
          <h2> No Data</h2>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="table-cont">
        <h2>Loading ...</h2>
      </div>
    );
  }
  return (
    <div className="table-cont">
      {isOldResultFlag && <div className="old-tag"> old query result</div>}
      <TableView data={result} columns={columns} />
    </div>
  );
};

export default ResultViewer;
