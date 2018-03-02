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
      selectedMenu: [],
      updatedAt: ''
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
      .then((restaurantMenu) => {
        console.log(`Restaurant ${this.state.restaurantID} data fetched`);
        console.log(restaurantMenu.data);
        this.setState({ 
          restaurantMenuItems: restaurantMenu.data,
          updatedAt: restaurantMenu.data[0].updatedAt.slice(0, 10)
         });
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
    let selectedMenu = this.handleMenuChange(menu);
    this.setState({ selectedMenu: selectedMenu });
    console.log(menu);
  }
  

  render () {
    return (
      <div>
        <h2 className='menu-title'>Menu</h2>
        <div className='menu-nav'>
          <MenuButtons menuClick={this.handleMenuClick}/>
        </div>
        <div className='menu-section'>
          <MenuSection menuItems={this.state.selectedMenu}/>
        </div>
        <div className='footer'>
          <span>Last updated: {this.state.updatedAt}</span> 
          <span className='menu-provider'> Powered by -TOE JAM- </span>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));