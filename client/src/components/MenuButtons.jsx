import React from 'react';
import ReactDom from 'react-dom';
import Button from './Button.jsx';

class MenuButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick.bind(this);
  }

  handleMenuClick(menu) {
   this.props.menuClick(menu);
  }

  render() {
    return <div>
        {this.props.menuNames.map(menuName => (
          <Button
            menuClick={() => this.handleMenuClick(menuName)}
            menuName={menuName}
          />
        ))}
      </div>;
    //  <div>
    //     <button className="menu-button" onClick={() => this.handleMenuClick("Breakfast")}>
    //       Breakfast Menu
    //     </button>
    //     <button className="menu-button" onClick={() => this.handleMenuClick("Lunch")}>
    //       Lunch Menu
    //     </button>
    //     <button className="menu-button" onClick={() => this.handleMenuClick("Dinner")}>
    //       Dinner Menu
    //     </button>
    //   </div>
  }
}

export default MenuButtons;