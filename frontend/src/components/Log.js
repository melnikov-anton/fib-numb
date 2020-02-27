import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import LogTable from './LogTable';



class Log extends Component {

  state = {
    data: []
  };

  getLogData = () => {
    axios.get('/api/stat')
      .then( (response) => {
        this.setState({
          data: response.data
        });
        console.log(response.data);
      })

  }

  componentDidMount() {
    this.getLogData();
  }

  render() {
    return(
      <Container>
        <div className="main">
          <h1>Request history from your IP</h1>
          <LogTable data={this.state.data} />
        </div>
      </Container>
    );
  }
}

export default Log;
