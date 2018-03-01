import React from 'react';
import ReactDOM from 'react-dom';

const MenuItem = (props) => (
  <div className='menu-item'>
    {props.menuItem.menuItemName} {props.menuItem.menuItemPrice}<br/>
    {props.menuItem.menuItemDescription}
  </div>
)

export default MenuItem;