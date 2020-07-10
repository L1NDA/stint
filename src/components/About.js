import React from 'react';
import Menu from './Menu.js'
import Footer from './Footer.js'
import Button from './Button.js'

class About extends React.Component {

  componentDidMount() {
    document.title = 'Our Mission | Stint';
  }

	render() {
		return (
      <div className="container">
        <Menu/>
        <div className="flex-column about-text">
          <h1>Our Mission</h1>
          <h3>To give students and companies an immediate way to connect and work together virtually.</h3>
          <div className="flex-row about-card-container">
            <div className="about-card">
              <p>We’re supporting our <b>driven students</b> in gaining work experience and growing professionally without the physical and time constraints of an internship.</p>
              <Button text="Join as student" style={{marginTop: "50px"}} category="student"/>
            </div>
            <div className="about-card">
              <p>We are making it easier for <b>business owners</b> to access reliable student talent to fulfill their business needs.</p>
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
          <p>When students choose to accept the request to work, Stint will facilitate the connection that follows.</p>
        </div>
        <div className="flex-column about-text" style={{marginBottom: "100px"}}>
          <h1>Our Inspiration</h1>
          <h3>The idea for Stint grew from our belief that students deserve the opportunity to show companies they have the skills to do real work – now.</h3>
          <p>When the COVID-19 pandemic hit, students everywhere were scrambling to find new work in place of rescinded internships and job offers because they understood the importance of gaining professional experience in order to get ahead.
          <b> We saw their student instincts in action, how hard they were willing to work, and became convinced that there must be a better way to satiate this massive desire to grow professionally and improve their future prospects of succeeding in industry.</b></p>
          <p>We believe that students are incredibly skilled and talented, but often overlooked due to their lack of professional work experience.</p>
          <p>After speaking with multiple startups and business owners who showed a genuine interest and need for hiring student freelancers, we realized the potential that students have to transform the way companies hire.</p>
        </div>
        <Footer/>
      </div>
		)
	}
}

export default About;
