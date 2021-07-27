import React from 'react'
import './footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
           <div className="updates">
            <h4><i
          style={{
            position: "relative",
            padding: "2px ",
            marginLeft: "3px",
            marginRight: "4px",
            top: "2px",
          }}
          className="fa fa-download"
        ></i>Check for Updates</h4>
           </div>
            <div className="footer-version" style={{color: '#fff'}}>
                <h4><i
          style={{
            position: "relative",
            padding: "2px ",
            marginLeft: "3px",
            marginRight: "4px",
            top: "2px",
          }}
          className="fa fa-code-fork"
        ></i>Version 0.3.6</h4>
            </div>
            <div className="connectivity" style={{color: '#90EE90'}}>
                <h4> <i
          style={{
            position: "relative",
            padding: "2px ",
            marginLeft: "3px",
            marginRight: "4px",
            top: "2px",
          }}
          className="fa fa-wifi"
        ></i>Connected</h4>
            </div>
        </div>
    )
}

export default Footer
