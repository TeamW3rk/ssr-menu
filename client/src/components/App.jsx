import React from 'react';
import MenuSection from './MenuSection.jsx';
import MenuButtons from './MenuButtons.jsx';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantID: this.props.menuItems[0].restaurantid,
      restaurantMenus: ['Breakfast', 'Lunch', 'Dinner'],
      restaurantMenuCategories: ['Appetizers', 'Mains', 'Sides', 'Beverages'],
      restaurantMenuItems: this.props.menuItems,
      selectedMenu: [],
      updatedAt: '',
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    this.handleMenuClick(this.state.restaurantMenus[1]);
  }

  handleMenuState(organizedMenu) {
    this.setState({ selectedMenu: organizedMenu });
  }

  handleMenuClick(menu) {

    const callback = this.handleMenuState.bind(this);
    this.filterRestaurantData(menu, callback);
  }

  filterRestaurantData(menu, cb) {
    let restaurantMenuItems  = this.state.restaurantMenuItems;
    let filteredMenu = [];

    for (let i = 0; i < restaurantMenuItems.length; i += 1) {
      if (restaurantMenuItems[i].menuname === menu) {

        filteredMenu.push(restaurantMenuItems[i]);
      }
    }
    
    this.organizeMenuData(filteredMenu, cb);
  }

  organizeMenuData(menu, cb) {
    const restaurantMenu = [];
    const categoryNames = this.state.restaurantMenuCategories;
    for (let x = 0; x < categoryNames.length; x += 1) {
      const category = [];
      for (let y = 0; y < menu.length; y += 1) {
        if (menu[y].menucategorynames === categoryNames[x]) {
          category.push(menu[y]);
        }
      }
      restaurantMenu.push(category);
    }
    cb(restaurantMenu);
  }

  render() {
    return (
      <div>
        <h2 className="menu-title">Menu</h2>
        <div className="menu-nav">
          <MenuButtons menuNames={this.state.restaurantMenus} menuClick={this.handleMenuClick} />
        </div>
        <div className="menu-section">
          <MenuSection menuCategories={this.state.selectedMenu} />
        </div>
        <div className="footer">
          <span>Last updated: {this.state.updatedAt}</span>
        </div>
      </div>
    );
  }
}


