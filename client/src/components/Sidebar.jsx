import React from 'react';
import { Link } from "react-router-dom";
import { BsHouseDoor, BsBarChart, BsCoin, BsNewspaper, BsPencilSquare, BsCalendarRange } from "react-icons/bs";

const Sidebar = () => {
  return (
  <div id="sidebar-container" className="bg-primary">
    <div className="logo">
        <h4 className="text-light font-weight-bold">Crypto Dash</h4>
    </div>
    
    <div className="menu">
        <Link to='/' className="d-block text-light p-3 sidelink"><BsHouseDoor size={24} className="mx-2"/> Home</Link><i className="mr-2 lead icon ion-md-apps"></i>

        <Link to='/cryptocurrencies' className="d-block text-light p-3 sidelink"> <BsBarChart size={24} className="mx-2"/> Cryptocurrencies</Link><i className="mr-2 lead icon ion-md-settings"></i>
        
        <Link to='/charts' className="d-block text-light p-3 sidelink"><BsCoin size={24} className="mx-2"/> Charts</Link><i className="mr-2 lead icon ion-md-stats"></i>
        
        <Link to='/news' className="d-block text-light p-3 sidelink"><BsNewspaper size={24} className="mx-2"/> News</Link><i className="mr-2 lead icon ion-md-person"></i>

        <Link to='/trades' className="d-block text-light p-3 sidelink"><BsPencilSquare size={24} className="mx-2"/> Trades</Link><i className="mr-2 lead icon ion-md-people"></i>

        <Link to='/calendar' className="d-block text-light p-3 sidelink"><BsCalendarRange size={24} className="mx-2"/> Calendar</Link><i className="mr-2 lead icon ion-md-people"></i>

    </div>
  </div>
  )
};

export default Sidebar;
