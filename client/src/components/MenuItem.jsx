import React from 'react';

const MenuItem = props => (
  <div className="menu-item">
    <div className="menu-item-title">
      {props.menuItem.menuitemname}
      <div className="menu-item-price">
        ${props.menuItem.menuitemprice}
      </div>
    </div>
    <p className="menu-item-desc">{props.menuItem.menuitemdescription}</p>
  </div>
);

export default MenuItem;
