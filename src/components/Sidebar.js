import React from "react";
import { PRE_DEFINED_QUERIES } from "../utils";

const Sidebar = ({ recentQueriesList, updateQueryAndTabData }) => {
  const renderRows = (data) => {
    return data?.map((query, i) => (
      <div
        className="rq-row"
        key={i}
        onClick={() => {
          updateQueryAndTabData(query);
        }}
      >
        <pre>{`${i + 1}. ${query}`}</pre>
      </div>
    ));
  };
  return (
    <>
      <div className="rs-cont">
        <div className="rq-header">
          <div className="bold">
            Recent Queries <span>(limited to 10)</span>
            <div style={{ fontSize: "10px" }}>
              (select any item to update the query)
            </div>
          </div>
        </div>
        <div className="rs-cont-1">
          {recentQueriesList?.length ? (
            renderRows(recentQueriesList)
          ) : (
            <div className="empty-cont">No Recent Searches</div>
          )}
        </div>
      </div>
      <div className="rs-cont">
        <div className="rq-header">
          <div className="bold"> Predefined Queries</div>
        </div>
        <div className="rs-cont-1">{renderRows(PRE_DEFINED_QUERIES)}</div>
      </div>
    </>
  );
};

 const MemoizedSidebar = React.memo(Sidebar);
 export default MemoizedSidebar;