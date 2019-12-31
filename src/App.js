import React from 'react';
import logo from './logo.svg';
import './App.css';
import Display from "./component/display";
import ButtonPanel from "./component/buttonPanel";
import calculate from "./calculate/index";

class App extends React.Component {
    state = {
    total: null,
    next: null,
    equation: null,
    operation: null,
  };

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };
  render(){
    return (
    <div className="App">
      <header className="App-header">
        <div className="main-body">
         <Display value={this.state.next || this.state.total || "0"} equation={this.state.equation || ""}/>
          <ButtonPanel clickHandler={this.handleClick} />
        </div>
      </header>
    </div>
  );

  }
}
export default App;
