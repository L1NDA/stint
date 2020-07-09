import React from 'react';
import Menu from './Menu.js'
import Footer from './Footer.js'
import './style/other.css'

class About extends React.Component {

	render() {
		return (
      <div className="container thank-you-background">
        <Menu/>
        <div className="thank-you-container">
          <div className="thank-you">
            <h2>That’s it! Thanks for telling us about yourself.</h2>
            <h3>Now that we know you better, we’ll help companies get to know you too. Profile verification may take around 48 hours, so please be patient, and we’ll email you when your profile is all set up. 🧑‍💻</h3>
          </div>
        </div>
        <Footer/>
      </div>
		)
	}
}

export default About;
