import React from 'react';
import ReactDOM from 'react-dom';

const MenuItem = props => (
  <div className="menu-item">
    <div className='menu-item-title'>
      {props.menuItem.menuItemName} ${props.menuItem.menuItemPrice}
    </div>
      <p className='menu-item-desc'>{props.menuItem.menuItemDescription}</p>
  </div>
);

export default MenuItem;