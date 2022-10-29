import "./App.css";
import { useCounter } from "@mantine/hooks";
import QueryEditor from "./components/QueryEditor";
import { useEffect, useState } from "react";
import { getQueryResult, QUERY_LS_KEY } from "./utils";
import ResultViewer from "./components/ResultViewer";
import Sidebar from "./components/Sidebar";

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
  const [count, handlers] = useCounter(2);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [isOldResultFlag, setIsOldResultFlag] = useState(false);

  const onTabClicked = (tab) => {
    setQuery(tab.query);
    setSelectedTabId(tab.id);
  };

  const onAddTabClicked = () => {
    setTabsData([
      ...tabsData,
      {
        id: count,
        query: "",
        result: [],
      },
    ]);
    setSelectedTabId(count);
    setQuery("");
    handlers.increment();
  };

  const onCrossClicked = (deletedTabId) => {
    const tabsLength = tabsData.length;
    if (tabsLength === 1) return;

    const updatedTabsData = tabsData.filter((val) => val.id !== deletedTabId);

    if (deletedTabId === selectedTabId) {
      if (tabsData[tabsLength - 1]?.id === deletedTabId) {
        setSelectedTabId(updatedTabsData[updatedTabsData.length - 1]?.id);
      } else {
        const oldTabIndex = tabsData.findIndex(
          (tab) => tab.id === deletedTabId
        );
        setSelectedTabId(updatedTabsData[oldTabIndex]?.id);
      }
    }
    setTabsData(updatedTabsData);

    if (updatedTabsData.length === 1) setSelectedTabId(updatedTabsData[0].id);
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

  useEffect(() => {
    const selectedTabData = tabsData.find((tab) => tab.id === selectedTabId);
    if (selectedTabData) setQuery(selectedTabData.query);
  }, [selectedTabId]);

  return (
    <div className="App">
      <div className="main">
        <div className="left-sidebar">
          <Sidebar
            recentQueriesList={recentQueriesList}
            updateQueryAndTabData={updateQueryAndTabData}
          />
        </div>
        <div className="main-content">
          <div className="qv-cont">
            <QueryEditor
              onQuerySubmit={onQuerySubmit}
              onQueryChange={onQueryChange}
              query={query}
              onTabClicked={onTabClicked}
              tabsData={tabsData}
              onAddTabClicked={onAddTabClicked}
              selectedTabId={selectedTabId}
              onCrossClicked={onCrossClicked}
            />
          </div>
          <ResultViewer
            result={
              tabsData.find((val) => val.id === selectedTabId)?.result || []
            }
            isOldResultFlag={isOldResultFlag}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
