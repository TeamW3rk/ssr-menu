import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from './MenuItem.jsx';

const MenuSection = (props) => (
  <div>
    {props.menuItems.map(item => 
    <MenuItem menuItem={item}/>)}
  </div>
)

export default MenuSection;