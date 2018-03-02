import React from 'react';
import ReactDOM from 'react-dom';

const MenuItem = props => (
  <div className="menu-item">
    <div className='menu-item-title'>
      {props.menuItem.menuItemName.toUpperCase()} 
      <div className='menu-item-price'>
        ${props.menuItem.menuItemPrice}     
      </div>
    </div>
      <p className='menu-item-desc'>{props.menuItem.menuItemDescription}</p>
  </div>
);

export default MenuItem;