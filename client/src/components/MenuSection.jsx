import React from 'react';
import MenuCategory from './MenuCategory.jsx';

const MenuSection = (props) => (
  <div>
    {props.menuCategories.map(category => 
      <MenuCategory menuCategory={category} />)}
  </div>
);

export default MenuSection;