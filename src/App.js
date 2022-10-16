import "./App.css";
import QueryEditor from "./components/queryEditor";
import { useEffect, useState } from "react";
import { getQueryResult, QUERY_LS_KEY, PRE_DEFINED_QUERIES } from "./utils";
import ResultViewer from "./components/resultViewer";

function App() {
  const [query, setQuery] = useState("Select * from Categories;");
  const [queryResult, setQueryResult] = useState([]);
  const [recentQueriesList, setRecentQuesriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let savedData = JSON.parse(localStorage.getItem(QUERY_LS_KEY) || "[]");
    setRecentQuesriesList(savedData);
  }, [queryResult]);

  const onQuerySubmit = (query) => {
    setIsLoading(true);
    setQueryResult(getQueryResult(query));
    setIsLoading(false);
  };

  const onQueryChange = (e) => {
    const val = e?.target?.value;
    setQuery(val);
  };

  const renderRows = (data) => {
    return data?.map((query, i) => (
      <div
        className="rq-row"
        key={i}
        onClick={() => {
          setQuery(query);
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
              isLoading={isLoading}
            />
          </div>
          <ResultViewer isLoading={isLoading} result={queryResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
