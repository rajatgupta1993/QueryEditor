import React from "react";
import "../styles/queryStyles.css";

const QueryEditor = ({onQuerySubmit, query, onQueryChange, isLoading}) => {
return(
    <>
    <textarea
        value={query}
        onChange={onQueryChange}
        placeholder="Enter your query" 
    />
    <div className="cta-cont">
        <button className="query-submit-btn rq-btn" onClick={() => onQuerySubmit(query)} disabled={isLoading}>
            {isLoading ? "Loading Result ..." : "Run query"}
        </button>
    </div>
   </>
)
}

export default QueryEditor;