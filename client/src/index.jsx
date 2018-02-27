import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <h1>Menu is rendering properly!!!</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));