import React from "react";
import ReactDOM from "react-dom";
import MenuSection from "./components/MenuSection.jsx";
import MenuButtons from "./components/MenuButtons.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantID: '',
      restaurantMenus: ['Breakfast', 'Lunch', 'Dinner'],
      restaurantMenuCategories: ['Appetizers', 'Mains', 'Sides', 'Beverages'],
      restaurantMenuItems: [],
      selectedMenu: [],
      updatedAt: ''
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    this.handleRestaurantID();
  }
  
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    //fetches data associated with id
    axios
      .get(`${this.state.restaurantID}menu`)
      .then((restaurantMenu) => {
        console.log(`${this.state.restaurantID} data fetched`);
        console.log(restaurantMenu.data);
        this.setState({ 
          restaurantMenuItems: restaurantMenu.data,
          updatedAt: restaurantMenu.data[0].updatedAt.slice(0, 10)
          });
          //first menu to show on page reload
        this.handleMenuClick(this.state.restaurantMenus[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRestaurantID() {
    //grabs id from url
    let id = window.location.pathname;
    this.setState({
      restaurantID: id
    });
  }

  handleMenuState(organizedMenu) {
    this.setState({ selectedMenu: organizedMenu });
  }
  
  handleMenuClick(menu) {
    //updates state with selected menu button
    let callback = this.handleMenuState.bind(this);
    let selectedMenu = this.filterRestaurantData(menu, callback);
    console.log(menu,'menu was selected');
  }
  
  filterRestaurantData(menu, cb) {
    //filters restaurants menu items to selected menu
    let restaurantMenuItems = this.state.restaurantMenuItems;
    let filteredMenu = [];

    for (let i = 0; i < restaurantMenuItems.length; i++) {
      if (restaurantMenuItems[i].menuName === menu) {
        filteredMenu.push(restaurantMenuItems[i]);
      }
    }
    this.organizeMenuData(filteredMenu, cb);
  }

  organizeMenuData(menu, cb) {
    //orders filtered menu list by category name
    let restaurantMenu = [];
    let categoryNames = this.state.restaurantMenuCategories;

    for (let x = 0; x < categoryNames.length; x++) {
      let category = [];
      for (let y = 0; y < menu.length; y++) {
        if (menu[y].menuCategoryName === categoryNames[x]) {
          category.push(menu[y]);
        }
      }
      restaurantMenu.push(category);
    }
    cb(restaurantMenu);
  }

  render () {
    return (
      <div>
        <h2 className='menu-title'>Menu</h2>
        <div className='menu-nav'>
          <MenuButtons menuNames={this.state.restaurantMenus} menuClick={this.handleMenuClick}/>
        </div>
        <div className='menu-section'>
          <MenuSection menuCategories={this.state.selectedMenu}/>
        </div>
        <div className='footer'>
          <span>Last updated: {this.state.updatedAt}</span> 
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));