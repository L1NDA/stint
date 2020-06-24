import React from 'react';
import Menu from './Menu.js'
import Footer from './Footer.js'
import Button from './Button.js'

class About extends React.Component {

	render() {
		return (
      <div className="container">
        <Menu/>
        <div className="flex-column about-text">
          <h1>Our Mission</h1>
          <h3>To give students and companies a way to connect virtually at any time and create meaningful work opportunities.</h3>
          <div className="flex-row about-card-container">
            <div className="about-card">
              <p>We’re supporting our driven students in gaining work experience and building professional relationships without the need for a 10-week internship.</p>
              <Button text="Join as student" style={{marginTop: "50px"}} category="student"/>
            </div>
            <div className="about-card">
              <p>We are making it easier for business owners to access reliable student freelancers to fulfill your business needs.</p>
              <Button text="Join as company" style={{marginTop: "50px"}} category="company"/>
            </div>

          </div>
        </div>
        <div className="flex-column about-text" style={{backgroundColor: "#F5F5F5"}}>
          <h1>Our Purpose</h1>
          <h3>
            Stint is redefining the way students and companies interact by tapping into the oversupply of student talent in the professional marketplace to create meaningful work opportunities. Our platform connects small-sized businesses with student freelancers through a more efficient and cost-effective online hiring process.
          </h3>
          <p>
            Companies with a hiring need browse through skills and services offered by students on Stint and submit a hiring request for the desired student freelancer.
          </p>
          <p>Students choose to accept the requested service, and Stint facilitates the connection that follows.</p>
        </div>
        <div className="flex-column about-text" style={{marginBottom: "100px"}}>
          <h1>Our Inspiration</h1>
          <h3>During this difficult and unforeseen pandemic time, we have watched friends grow more and more distraught as offers and internships were rescinded. Students everywhere were scrambling for internship alternatives because they knew the importance of gaining experience – tangibly and on paper. As recent university graduates, we have also experienced first-hand the struggle of landing paid internships.</h3>
          <p>We believe that students are incredibly skilled and talented, but often overlooked due to their lack of professional work experience.</p>
          <p>After speaking with multiple startups and small business owners who showed a genuine interest and need for hiring student freelancers, we realized the potential students have to transform the way companies hire.</p>
        </div>
        <Footer/>
      </div>
		)
	}
}

export default About;
