import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const LogTable = (props) => (
  <TableContainer>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>IP</TableCell>
          <TableCell>Member</TableCell>
          <TableCell>Number</TableCell>
          <TableCell>Timestamp</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { props.data.map( (record) => (
          <TableRow>
            <TableCell>{record.ip}</TableCell>
            <TableCell>{record.memb}</TableCell>
            <TableCell>{record.numb}</TableCell>
            <TableCell>
              {record.ts.replace(/T|Z/g, ' ')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  </TableContainer>
);

LogTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default LogTable;
