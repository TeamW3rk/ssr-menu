import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from "./MenuItem.jsx";

const MenuCategory = (props) => (
  <div>
    <h3 className='menu-category-title'>{props.menuCategory[0].menuCategoryName}</h3>
    <div className="menu-category">
      {props.menuCategory.map(item => <MenuItem menuItem={item} />)}
    </div>
  </div>
);

export default MenuCategory;