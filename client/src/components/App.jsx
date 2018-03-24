import React from 'react';
import axios from 'axios';
import MenuSection from './MenuSection';
import MenuButtons from './MenuButtons';
import CONFIG from '../config.client';

const ENV = window.ENV = 'TEST'; // Define current enironment
const PATH = (window.PATH = CONFIG[ENV].HOST + ':' + CONFIG[ENV].PORT);

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantID: '',
      restaurantMenus: ['Breakfast', 'Lunch', 'Dinner'],
      restaurantMenuCategories: ['Appetizers', 'Mains', 'Sides', 'Beverages'],
      restaurantMenuItems: [],
      selectedMenu: [],
      updatedAt: '',
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    this.handleRestaurantID();
  }
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    // fetches data associated with id
    axios
      .get(`${PATH}${this.state.restaurantID}menu`)
      .then((restaurantMenu) => {
        console.log(`${this.state.restaurantID} data fetched`);
        console.log('this is restaurantmenudata ->', restaurantMenu.data);
        let test = restaurantMenu.data;
        this.state.restaurantMenuItems = test; 
        console.log('this is test ->', test)
        this.setState({
          // restaurantMenuItems: test, 
          updatedAt: 0,
        });
        // console.log('state looks like this', this.state)
        // first menu to show on page reload
        this.handleMenuClick(this.state.restaurantMenus[0]);
       // console.log('state looks like this', this.state)
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }

  handleRestaurantID() {
    // grabs id from url
    const id = window.location.pathname;
    this.setState({
      restaurantID: id,
    });
  }

  handleMenuState(organizedMenu) {
    this.setState({ selectedMenu: organizedMenu });
  }

  handleMenuClick(menu) {
    // updates state with selected menu button
    const callback = this.handleMenuState.bind(this);
    this.filterRestaurantData(menu, callback);
    console.log(menu, 'menu was selected');
    console.log('state looks like this', this.state)
  }

  filterRestaurantData(menu, cb) {
    // filters restaurants menu items to selected menu
    let  restaurantMenuItems  = this.state.restaurantMenuItems;
    let filteredMenu = [];

    for (let i = 0; i < restaurantMenuItems.length; i += 1) {
      if (restaurantMenuItems[i].menuname === menu) {

        filteredMenu.push(restaurantMenuItems[i]);
      }
    }
    
    this.organizeMenuData(filteredMenu, cb);
  }

  organizeMenuData(menu, cb) {
    // orders filtered menu list by category name
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
    console.log('this is restaurant menu', restaurantMenu);
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
// window.Menu = Menu;
export default Menu;
