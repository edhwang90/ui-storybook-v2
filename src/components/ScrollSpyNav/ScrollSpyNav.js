import React, { useState, useLayoutEffect } from "react";
import { ScrollSpy } from "../ScrollSpy/ScrollSpy";

import './ScrollSpyNav.scss';

const useNavMenu = () => {
  // control the click event
  const onClick = (e) => {
    e.preventDefault();
    // Set the hash
    window.location.hash = e.target.hash;

    // Scroll to the section + 1 to account for weird bug.
    // remove the `+1` and click on Section 2 link to see the bug.
    const targetSection = document.querySelector(`${e.target.hash}`);
    window.scrollTo(0, targetSection.offsetTop + 1);
  };

  return {
    onClick
  };
};

const NavMenu = ({ options }) => {
  const { onClick } = useNavMenu();

  return (
    <nav className="sticky">
      <ul>
        {options.map((option) => (
          <li key={option.hash}>
            <a
              href={`#${option.hash}`}
              onClick={onClick}
              data-scrollspy-id={option.hash}
            >
              {option.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const ScrollSpyNav = ({ children, selector }) => {
  const [options, setOptions] = useState([]);
  // initiate ScrollSpy
  ScrollSpy();

  useLayoutEffect(() => {
    const navMenuSections = document.querySelectorAll(selector);
    
    const optionsFromSections = Array.from(navMenuSections).map((section) => {
      return {
        hash: section.id,
        title: section.dataset.navTitle
      };
    });

    setOptions(optionsFromSections);
  }, [selector]);

  return (
    <div className="sticky-container">
      <div className="sticky-nav">
        <NavMenu options={options} />
      </div>
      <div className="content">{children}</div>
    </div>
  );
};
