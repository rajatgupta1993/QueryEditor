# Atlan SQL Query Editor Assignment

## Website Link
Click here to access the website - https://master--clinquant-figolla-6b26b7.netlify.app/

## UI Screenshot
![UI ](https://imgur.com/9iV6YIA.png)

##Overview

Used React to build this assignment, have used vanilla css instead of any css framework. For SQL tables data I have used JSON provided in the assignment. 
Website is highly performant and re-rendering is minimised with apt usage of react hooks. 

## Features
 
📝 Have added predefined list of queries, user can select any query & fetch the data.

📝 Storing all the recently run query (limited to 10) in LS & showing them in the sidebar as history. 

📝 Tabs in query editor 
  - User can add & delete tabs from the UI.
  - User can switch between multiple tabs. 
  - Each tab will have it's own query & it's query result. 
	
📝 Have added an animating tag on top of reuslt table for showing if the rendered result is of latest query or not. <br />
&emsp;&emsp;[USECASE] User runs a query -> Result gets rendered in table -> user updates the query but doesn't run it. 
This tag helps user to know if the rendered result is of latest query or not.

## List of Pre-defined queries

	"Select * from Categories;",
    "Select * from suppliers;",
    "Select * from shippers;",
    "Select * from regions;",
    "Select * from Orders;",
    "Select * from products;",
    "Select * from employees;",
    "Select * from customers;",

## 3rd Party Libraries Used
`mantine/hooks` - Used for useCounter hook ( used for assigning Ids to tabs)

`react-table` - Used for creating tables UI. 

## Website Performance

Total JS bundle size - 689KB

Total JS bundle size (compressed using brotli compression) - 116 KB (transferred over network)


<h3>Web Performance</h3>

![Web Performance](https://i.imgur.com/gBNMn1A.png)

<h3>Mobile Performance </h3>

![Mobile Performance](https://i.imgur.com/muyK5BL.png)




