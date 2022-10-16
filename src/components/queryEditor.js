import React from "react";
import "../styles/queryStyles.css";

const QueryEditor = ({
  onQuerySubmit,
  query,
  onQueryChange,
  onTabClicked,
  tabsData,
  onAddTabClciked,
  selectedTabId,
  onCrossClicked,
}) => {
  return (
    <>
      <div className="tab-bar">
        {tabsData?.map((tab) => (
          <div
            key={tab.id}
            className={tab.id === selectedTabId ? "tab-selected tab" : "tab"}
            onClick={(e) => onTabClicked(e, tab)}
          >
            <span key={tab.id}>{`Tab ${tab.id}`}</span>
            <div className="cross" onClick={() => onCrossClicked(tab.id)}>
              X{" "}
            </div>
          </div>
        ))}
        <div onClick={onAddTabClciked} className="add-btn-ctn">
          <span className="add-btn"> + </span>
        </div>
      </div>
      <textarea
        value={query}
        onChange={onQueryChange}
        placeholder="Enter your query"
      />
      <div className="cta-cont">
        <button
          className="query-submit-btn rq-btn"
          onClick={onQuerySubmit}
        >
            Run query
        </button>
      </div>
    </>
  );
};

export default QueryEditor;
