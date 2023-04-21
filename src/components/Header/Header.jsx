import React from 'react';
import { ImArrowDown } from 'react-icons/im';

import './Header.scss';

const Header = () => {
  return (
    <div>
        <h1 className="header">
            Todo List
        </h1>

        <div className="header_arrow">
            <ImArrowDown />
        </div>
    </div>
  )
}

export default Header