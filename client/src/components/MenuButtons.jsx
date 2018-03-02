import React from 'react';
import ReactDom from 'react-dom';

class MenuButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: ''
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(menu) {
    this.setState({ selectedMenu: menu });
    this.props.menuClick(this.state.selectedMenu);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleMenuClick("Breakfast")}>Breakfast Menu</button>
        <button onClick={() => this.handleMenuClick('Lunch')}>Lunch Menu</button>
        <button onClick={() => this.handleMenuClick('Dinner')}>Dinner Menu</button>
      </div>
    )
  }
}

export default MenuButtons;