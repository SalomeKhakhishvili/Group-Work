import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css'; // Ensure this file includes your styles

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink exact to="/" activeClassName="active">All Animal</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-animals" activeClassName="active">Add Animal</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/categorieslist" activeClassName="active">All Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/categories" activeClassName="active">Add Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/CategAndAnim" activeClassName="active">All Animals with Categories</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;



