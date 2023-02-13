import React from 'react';

function Navbar() {
    return (
      <header>
        <nav className="nav">
          <img src= "./logo192.png" alt = "Hutao Smirc" className='nav-logo'/>
          <ul className="nav-items">
            <li> Thing 1 </li>
            <li> Thing 2</li>
            <li> Thing 3</li>
          </ul>
        </nav>
      </header>
    );
  }

  export default Navbar