import React from "react";
import "../styles/queryStyles.css";

const QueryEditor = ({
  onQuerySubmit,
  onQueryChange,
  onTabClicked,
  tabsData,
  onAddTabClicked,
  selectedTabId,
  onCrossClicked,
}) => {
  const selectedTabData = tabsData.find((tab) => tab.id === selectedTabId);
  return (
    <>
      <div className="tab-bar">
        {tabsData?.map((tab, i) => (
          <div
            key={tab.id}
            className={tab.id === selectedTabId ? "tab-selected tab" : "tab"}
            onClick={() => onTabClicked(tab)}
          >
            <span key={tab.id}>{`Tab ${i+1}`}</span>
            {tabsData.length > 1 && (
              <div
                className="cross"
                onClick={(e) => {
                  e.stopPropagation();
                  onCrossClicked(tab.id);
                }}
              >
                X
              </div>
            )}
          </div>
        ))}
        {tabsData.length < 10 && (
          <div onClick={onAddTabClicked} className="add-btn-ctn">
            <span className="add-btn"> + </span>
          </div>
        )}
      </div>
      <textarea
        value={selectedTabData?.query}
        onChange={onQueryChange}
        placeholder="Enter your query"
      />
      <div className="cta-cont">
        <button className="query-submit-btn rq-btn" onClick={onQuerySubmit}>
          Run query
        </button>
      </div>
    </>
  );
};

export default QueryEditor;
