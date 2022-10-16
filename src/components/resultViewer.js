import React, { useMemo, useState } from "react";
import "../styles/resultViewerStyles.css";
import { getTableColumns } from "../utils";
import TableView from "./TableView";

const ResultViewer = ({result=[], isLoading}) => {

    const columns = useMemo(() => {
        // return  ["categoryID", "Description", "Name"];

        // return [
        //     {
        //         "Header": "orderID",
        //         "accessor": "orderID"
        //     },
        //     {
        //         "Header": "customerID",
        //         "accessor": "customerID"
        //     },
        //     {
        //         "Header": "employeeID",
        //         "accessor": "employeeID"
        //     },
        //     {
        //         "Header": "orderDate",
        //         "accessor": "orderDate"
        //     },
        //     {
        //         "Header": "requiredDate",
        //         "accessor": "requiredDate"
        //     },
        //     {
        //         "Header": "shippedDate",
        //         "accessor": "shippedDate"
        //     },
        //     {
        //         "Header": "shipVia",
        //         "accessor": "shipVia"
        //     },
        //     {
        //         "Header": "freight",
        //         "accessor": "freight"
        //     },
        //     {
        //         "Header": "shipName",
        //         "accessor": "shipName"
        //     },
        //     {
        //         "Header": "shipAddress",
        //         "columns": [
        //             {
        //                 "Header": "street",
        //                 "accessor": "shipAddress.street"
        //             },
        //             {
        //                 "Header": "city",
        //                 "accessor": "shipAddress.city"
        //             },
        //             {
        //                 "Header": "region",
        //                 "accessor": "shipAddress.region"
        //             },
        //             {
        //                 "Header": "postalCode",
        //                 "accessor": "shipAddress.postalCode"
        //             },
        //             {
        //                 "Header": "country",
        //                 "accessor": "shipAddress.country"
        //             }
        //         ]
        //     },
        //     {
        //         "Header": "details",
        //         "columns": [
        //             {
        //                 "Header": "0",
        //                 "columns": [
        //                     {
        //                         "Header": "productID",
        //                         "accessor": "details[0].productID"
        //                     },
        //                     {
        //                         "Header": "unitPrice",
        //                         "accessor": "details[0].unitPrice"
        //                     },
        //                     {
        //                         "Header": "quantity",
        //                         "accessor": "details[0].quantity"
        //                     },
        //                     {
        //                         "Header": "discount",
        //                         "accessor": "details[0].discount"
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ]
        const columnArr = getTableColumns(result[0], [])
        console.log("columnArr", columnArr);
        return columnArr;
    }, [result])

  
 if(!result?.length){
    return ( 
        <div className="table-cont">
            <h2> No Data</h2>
        </div>)
 }
 if(isLoading){
    return ( 
        <div className="table-cont">
            <h2>Loading ...</h2>
        </div>)
 }
return(
   <div className="table-cont">
   <TableView data={result} columns={columns} />
   </div>
)
}

export default ResultViewer;