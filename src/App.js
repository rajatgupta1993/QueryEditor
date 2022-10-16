import './App.css';
import QueryEditor from './components/queryEditor';
import { useEffect, useState } from 'react';
import { getQueryResult, QUERY_LS_KEY, PRE_DEFINED_QUERIES } from './utils';
import ResultViewer from './components/resultViewer';

function App() {
  const [query, setQuery] = useState("Select * from Categories;");
  const [queryResult, setQueryResult] = useState([]);
  const [recentQueriesList, setRecentQuesriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let savedData = JSON.parse(localStorage.getItem(QUERY_LS_KEY) || "[]");
    setRecentQuesriesList(savedData)
  },[queryResult])

  const onQuerySubmit = (query) => {
    setIsLoading(true);
    setQueryResult(getQueryResult(query));
    setIsLoading(false);
  
  }

  const onQueryChange = (e)=>{
      const val = e?.target?.value;
      setQuery(val);
  }
  return (
    <div className="App">
      <div className='main'>
        <div className='left-sidebar'>
          <div className='rs-cont'>
            <div className='rq-header'> 
              <div className='bold'> Recent Queries <span>(limited to 10)</span></div>
            </div>
            <div className='rs-cont-1'>
              {recentQueriesList?.length ?
                recentQueriesList.map((query, i) => (
                  <div className='rq-row' key={i} onClick={() => {
                    setQuery(query);
                  }}>
                    <pre>{`${i+1}. ${query}`}</pre>
                  </div>
                )): (
                  <div className='empty-cont'> 
                    No Recent Searches
                  </div>
                )
              }
              </div>
          </div>
          <div className='rs-cont'>
            <div className='rq-header'> 
              <div className='bold'> Predefined Queries</div>
            </div>
            <div className='rs-cont-1'>
            
              {PRE_DEFINED_QUERIES.map((query, i) => (
                  <div className='rq-row' key={i} onClick={() => {
                    setQuery(query);
                  }}>
                    <pre>{`${i+1}. ${query}`}</pre>
                  </div>
                ))
              }
              </div>
          </div>
        </div>
        <div className='main-content'> 
        <div className='qv-cont'>
          {/* <div className='editor-header bold'> Query Editor</div> */}
          <QueryEditor 
            onQuerySubmit={onQuerySubmit} 
            onQueryChange={onQueryChange} 
            query={query} 
            isLoading={isLoading}/>
        </div>
        <ResultViewer isLoading={isLoading} result={queryResult}/>
        </div>
        <div className='right-sidebar bold'> 3rd div</div>
      </div>
    
    </div>
  );
}

export default App;
