import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, lightBlue } from '@material-ui/core/colors';


import Header from './components/Header';
import Home from './components/Home';
import Log from './components/Log';


const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: blue,
  },
});

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>

            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/log' component={Log} />
            </Switch>
          
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
