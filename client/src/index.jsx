import React from "react";
import ReactDOM from "react-dom";
import MenuSection from "./components/MenuSection.jsx";
import MenuButtons from "./components/MenuButtons.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantMenuItems: [],
      restaurantID: 1,
      selectedMenu: []
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    this.getRandomID();
  }
  
  componentDidMount() {
    this.fetch();
  }

  getRandomID() {
    let num =  Math.floor(Math.random() * (200)) + 1;
    console.log('Restautrant ID: ',num);
    this.setState({
      restaurantID: num 
    })
  };

  fetch() {
    axios
      .get(`/${this.state.restaurantID}/menu`)
      .then((restuarantMenu) => {
        console.log(`Restaurant ${this.state.restaurantID} data fetched`);
        console.log(restuarantMenu.data);
        this.setState({ restaurantMenuItems: restuarantMenu.data });
        this.handleMenuClick("Breakfast");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleMenuChange(menu) {
    //filters restaurants menu items
    let restaurantMenuItems = this.state.restaurantMenuItems;
    let filteredMenu = [];
    for (let i = 0; i < restaurantMenuItems.length; i++) {
      if (restaurantMenuItems[i].menuCategoryName === menu) {
        filteredMenu.push(restaurantMenuItems[i]);
      }
    }
    return filteredMenu;
  }

  handleMenuClick(menu) {
    //update state with whatever menu was selected
    // console.log(menu,'was clicked!')
    let selectedMenu = this.handleMenuChange(menu);
    this.setState({
      selectedMenu: selectedMenu
    });
    console.log(menu);
  }
  

  render () {
    return (
      <div>
        <h2>Menu</h2>
        <div className='menu-nav'>
          <MenuButtons menuClick={this.handleMenuClick}/>
        </div>
        <div className='menu-section'>
          <MenuSection menuItems={this.state.selectedMenu}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));