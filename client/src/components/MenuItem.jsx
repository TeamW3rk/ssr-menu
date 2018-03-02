import React from 'react';
import ReactDOM from 'react-dom';

const MenuItem = props => (
  <div className="menu-item">
    <div className='menu-item-title'>
      {props.menuItem.menuItemName} ${props.menuItem.menuItemPrice}
    </div>
    <div className='menu-item-desc'>
      {props.menuItem.menuItemDescription}  
    </div>
  </div>
);

export default MenuItem;