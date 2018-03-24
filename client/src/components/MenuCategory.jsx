import React from 'react';
import MenuItem from './MenuItem';

const MenuCategory = props => (
  <div>
    {console.log('props in menu category was', props)}
    <h3 className="menu-category-title">{props.menuCategory[0].menucategorynames}</h3>
    <div className="menu-category">
      {props.menuCategory.map(item => <MenuItem menuItem={item} />)}
    </div>
  </div>
);

export default MenuCategory;
