import "./App.css";
import QueryEditor from "./components/queryEditor";
import { useEffect, useState } from "react";
import { getQueryResult, QUERY_LS_KEY, PRE_DEFINED_QUERIES } from "./utils";
import ResultViewer from "./components/resultViewer";

function App() {
  const [query, setQuery] = useState("Select * from Categories;");
  const [queryResult, setQueryResult] = useState({
    result: [],
    query: "",
  });
  const [recentQueriesList, setRecentQuesriesList] = useState([]);
  const [tabsData, setTabsData] = useState([
    {
      id: 0,
      query: "Select * from Categories;",
      result: [],
    },
    {
      id: 1,
      query: "Select * from Products;",
      result: [],
    },
  ]);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [isOldResultFlag, setIsOldResultFlag] = useState(false);

  const onCrossClicked = (deletedTabId) => {
    const updatedTabsData = tabsData.filter((val) => val.id !== deletedTabId);
    setTabsData(updatedTabsData);
    if (updatedTabsData.length === 1) setSelectedTabId(updatedTabsData[0].id);
  };

  const onTabClicked = (e, tab) => {
    setQuery(tab.query);
    setSelectedTabId(tab.id);
  };

  const onAddTabClciked = () => {
    const newTabId = tabsData.length;
    setTabsData([
      ...tabsData,
      {
        id: tabsData.length,
        query: "",
        result: [],
      },
    ]);
    setSelectedTabId(newTabId);
    setQuery("");
  };

  const onQuerySubmit = () => {
    // setQueryResult(getQueryResult(query));
    const result = getQueryResult(query);
    setQueryResult({
      result,
      query,
    });
    const updatedTabsData = tabsData.map((tabData) => {
      if (tabData.id === selectedTabId) {
        return {
          ...tabData,
          result,
        };
      }
      return tabData;
    });
    setTabsData(updatedTabsData);
  };

  const updateQueryAndTabData = (val) => {
    setQuery(val);
    const updatedTabsData = tabsData.map((tabData) => {
      if (tabData.id === selectedTabId) {
        return {
          ...tabData,
          query: val,
        };
      }
      return tabData;
    });
    setTabsData(updatedTabsData);
    if (val !== queryResult.query) setIsOldResultFlag(true);
    else setIsOldResultFlag(false);
  };

  const onQueryChange = (e) => {
    const val = e?.target?.value;
    updateQueryAndTabData(val);
    if (val !== queryResult.query) setIsOldResultFlag(true);
    else setIsOldResultFlag(false);
  };

  useEffect(() => {
    let savedData = JSON.parse(localStorage.getItem(QUERY_LS_KEY) || "[]");
    setRecentQuesriesList(savedData);
    if (query !== queryResult.query) setIsOldResultFlag(true);
    else setIsOldResultFlag(false);
  }, [query, queryResult]);

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
    <div className="App">
      <div className="main">
        <div className="left-sidebar">
          <div className="rs-cont">
            <div className="rq-header">
              <div className="bold">
                Recent Queries <span>(limited to 10)</span>
                <div style={{ fontSize: "10px" }}>
                  {" "}
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
        </div>
        <div className="main-content">
          <div className="qv-cont">
            <QueryEditor
              onQuerySubmit={onQuerySubmit}
              onQueryChange={onQueryChange}
              query={query}
              onTabClicked={onTabClicked}
              tabsData={tabsData}
              onAddTabClciked={onAddTabClciked}
              selectedTabId={selectedTabId}
              onCrossClicked={onCrossClicked}
            />
          </div>
          <ResultViewer
            result={tabsData.find((val) => val.id === selectedTabId)?.result || []}
            isOldResultFlag={isOldResultFlag}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
