import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import axios from 'axios';

import LogTable from './LogTable';



class Log extends Component {

  state = {
    data: [],
    period: 6
  };

  getLogData = () => {
    const days = this.state.period;
    axios.get(`/api/stat/${days}`)
      .then( (response) => {
        this.setState({
          data: response.data
        });
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    this.setState({
      period: event.target.value
    }, this.getLogData);
  }

  componentDidMount() {
    this.getLogData();
  }

  render() {
    return(
      <Container>
        <div className="main">
          <h1>Request history from your IP</h1>
            <Box display="flex" flexDirection="row" m={2}>
              <Box py={2} pr={0}>
                <InputLabel id="select1">Logs from</InputLabel>
              </Box>
              <Box p={1}>
                <Select
                  id="select"
                  autoWidth={true}
                  value={this.state.period}
                  onChange={this.handleChange}
                >
                  <MenuItem value={0}>today.</MenuItem>
                  <MenuItem value={6}>last week.</MenuItem>
                  <MenuItem value={13}>last 2 weeks.</MenuItem>
                </Select>
              </Box>
            </Box>
          <LogTable data={this.state.data} />
        </div>
      </Container>
    );
  }
}

export default Log;
