import React from 'react';
import MenuCategory from './MenuCategory';

const MenuSection = props => (
  <div>
    {console.log('props in menu section was -> ', props)}
    {props.menuCategories.map(category =>
      <MenuCategory menuCategory={category} />)}
  </div>
);

export default MenuSection;
