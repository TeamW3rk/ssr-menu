import React from 'react';
import ReactDom from 'react-dom';

class MenuButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div>
        <button>Breakfast Menu</button>
        <button>Lunch Menu</button>
        <button>Dinner Menu</button>
      </div>
    )
  }
}


export default MenuButtons;