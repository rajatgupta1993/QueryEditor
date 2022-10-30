import CategoryData from '../data/categories.json';
import CustomerData from '../data/customers.json';
import EmployeesData from '../data/employees.json';
import OrderData from '../data/orders.json';
import ProductsData from '../data/products.json';
import RegionsData from '../data/regions.json';
import ShippersData from '../data/shippers.json';
import SuppliersData from '../data/suppliers.json';

export const QUERY_LS_KEY = "SEARCHED_QUERY"

const saveQuery = (query) => {
    let savedData = JSON.parse(localStorage.getItem(QUERY_LS_KEY) || "[]");
    savedData.unshift(query);
    if(savedData.length > 10) savedData.pop();
    localStorage.setItem(QUERY_LS_KEY, JSON.stringify(savedData));
}

export const getQueryResult = (query) => {
    saveQuery(query);
    const caseInsensitiveQuery = query.toLowerCase();
    
    if(caseInsensitiveQuery.indexOf("categories") > -1){
        return CategoryData;
    }
    if(caseInsensitiveQuery.indexOf("customers") > -1){
        return CustomerData;
    }
    if(caseInsensitiveQuery.indexOf("employees") > -1){
        return EmployeesData;
    }
    if(caseInsensitiveQuery.indexOf("orders") > -1){
        return OrderData;
    }
    if(caseInsensitiveQuery.indexOf("products") > -1){
        return ProductsData;
    }
    
    if(caseInsensitiveQuery.indexOf("regions") > -1){
        return RegionsData;
    }
    if(caseInsensitiveQuery.indexOf("shippers") > -1){
        return ShippersData;
    }
    if(caseInsensitiveQuery.indexOf("suppliers") > -1){
        return SuppliersData;
    }
   
    return [];
}

export const getTableColumns = (obj, columnArr, accessorKey="") => {
    for(const key in obj){
        if(Array.isArray(obj)){
            columnArr.push({
                Header: key,
                columns:getTableColumns(obj[key], [], accessorKey + `[${key}].`)
           })
        }
        else if(Array.isArray(obj[key])){
            columnArr.push({
                Header: key,
                columns:getTableColumns(obj[key], [], accessorKey + key)
           })
        } else if(typeof(obj[key]) !== "object"){
      	columnArr.push({
        	 Header: key,
             accessor: accessorKey + key
        })
      }else{
      	columnArr.push({
        	 Header: key,
           columns: getTableColumns(obj[key], [], accessorKey + key + ".")
        })
      }
    }
    return columnArr;
}

export const PRE_DEFINED_QUERIES = [
    "Select * from Categories;",
    "Select * from suppliers;",
    "Select * from shippers;",
    "Select * from regions;",
    "Select * from Orders;",
    "Select * from products;",
    "Select * from employees;",
    "Select * from customers;",
];