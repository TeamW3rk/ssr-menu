import React from 'react';
import ReactDom from 'react-dom';

class MenuButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMenuClick(menu) {
   this.props.menuClick(menu);
  }

  render() {
    return <div>
        <button className="menu-button" onClick={() => this.handleMenuClick("Breakfast")}>
          Breakfast Menu
        </button>
        <button className="menu-button" onClick={() => this.handleMenuClick("Lunch")}>
          Lunch Menu
        </button>
        <button className="menu-button" onClick={() => this.handleMenuClick("Dinner")}>
          Dinner Menu
        </button>
      </div>;
  }
}

export default MenuButtons;