import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import axios from 'axios';


class Home extends Component {

  state = {
    member: 0,
    FibNumber: 0,
    current: false,
    error:false,
    helperText: 'Input number of the member'
  };

  handleChange = (event) => {
    const value = Number(event.target.value);
    if (value < 0) {
      this.setState({
        error:true,
        helperText: 'Input has to be a positive number'
      });
    } else {
      this.setState({
        member: value,
        current: false,
        error:false,
        helperText: 'Input number of the member'
      });
    }

  }

  getFibNumber = () => {
    const memb = this.state.member;
    axios.get(`/api/${memb}`)
      .then( (response) => {
        this.setState({
          FibNumber: response.data.FibNumb,
          current: true
        });
      })
      .catch( (err) => {
        console.log(err);
      });
  }

  render(){
    return(
      <Container maxWidth={false}>
        <div className="main">
          <div className="home-header">
            <h1>Fibonacci Number</h1>
          </div>
          <div>
            <Card>
              <div id="res"
                className="result"
                style={{color: this.state.current ? "black" : "lightgrey"}}
              >
                {this.state.FibNumber}
              </div>
            </Card>
          </div>
          <div className="input">
            <TextField
              onChange={this.handleChange}
              value={this.state.member}
              className="mb"
              size="medium"
              type="number"
              variant="outlined"
              label="Fibonacci member"
              helperText={this.state.helperText}
              error={this.state.error}
            />
          </div>
          <div className="btn">
            <Button
              color="primary"
              variant="contained"
              onClick={this.getFibNumber}
              disabled={this.state.error}
            >
              Get Fibonacci number
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default Home;
