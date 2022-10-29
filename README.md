# Atlan SQL Query Editor Assignment

## Demo of the task
Website Link - https://master--clinquant-figolla-6b26b7.netlify.app/

## Features
 
📝 Have added predefined list of queries, user can select any query & fetch the data.

📝 Storing all the recently run query (limited to 10) in LS. 
📝 Tabs in query editor 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - User can add & delete tabs from the UI.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - User can switch between multiple tabs. 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Each tab will have it's own query & it's query result. 
📝 Have added an animating tag on top of reuslt table for showing if the rendered result is of latest query or not. 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- [USECASE] User runs a query -> Result gets rendered in table -> user updates the query but doesn't run it. 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This tag helps user to know if the rendered result is of latest query or not.

## 3rd Party Libraries Used
`mantine/hooks` - Used for useCounter hook ( used for assigning Ids to tabs)
`react-table` - Used for creating tables in UI. 

