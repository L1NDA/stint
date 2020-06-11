import React from 'react';
import Menu from './Menu.js'
import Footer from './Footer.js'

class About extends React.Component {

	render() {
		return (
      <div className="container">
        <Menu/>
        <div className="flex-column about-text">
          <h1>What We Do</h1>
          <h3>Stint is redefining the way students and companies interact by tapping into the oversupply of student talent in the professional marketplace to create meaningful work opportunities. Our platform connects small-sized businesses with student freelancers through a more efficient and cost-effective online hiring process.</h3>
          <p>Companies with a hiring need browse through skills and services offered by students on Stint and submit a hiring request for the desired student freelancer.
          </p>
          <p>
          Students choose to accept the requested service, and Stint facilitates the connection that follows.
          </p>
          <h1>Our Inspiration</h1>
          <h3>
            As recent university graduates, we’ve experienced the struggle of landing paid internships. We believe that students are incredibly skilled and talented, but often overlooked due to their lack of professional work experience.
          </h3>
          <h3>
            After speaking with multiple startups and small business owners who showed a genuine interest and need for hiring students, we realized the potential student freelancers have to transform the way companies hire.
          </h3>
          <h1>Our Vision</h1>
          <h3>Our vision is to give students and companies a way to connect virtually at any time and create meaningful work opportunities.</h3>
          <p>For our driven students, we’re supporting you in gaining work experience and building professional relationships without the need for a 10-week internship.</p>
          <p>For our business owners, we are making it easier for you to access reliable student freelancers to fulfill your business needs.</p>
        </div>
        <Footer/>
      </div>
		)
	}
}

export default About;
