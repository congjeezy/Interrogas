import React from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";


function PollsTable(props) {

  return(
    <>
      <Table 
        bordered="true" 
        hover="true" 
        responsive="md" 
        size="sm"
        className="font-12 text-wrap">            
        <thead>
          <tr>
            <th>Id#</th>
            <th>Pollster Name</th>
            <th>Election Year</th>
            {/* <th>Poll Content</th> */}{/* removed for now by request of Hector */}
            <th>Polling Method</th>
            <th>Date Taken</th>
            <th>Date Published</th>
            <th>Cost</th>
            <th>Reference</th>
            <th>Objective</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData?.tableRowContent || []}
        </tbody>
      </Table>
    </>
  );
};

PollsTable.propTypes = {
  tableData: PropTypes.shape({}) || PropTypes.shape(
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.object),  
  ),
};

export default React.memo(PollsTable);