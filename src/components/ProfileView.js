import React from 'react'
import Menu from './Menu.js'
import { connect } from "react-redux"
import './style/my-profile.css'

const SKILLS = ['React', 'Python', 'Javascript', 'HTML/CSS', 'C/C++', 'SQL', 'Java']
const LEVEL = ['5', '4', '4', '4', '2', '1', '1']

class ProfileView extends React.Component {

  constructor(){
    super();
    this.state = {
    }
  }

  componentDidMount = () => {

  }

  render() {
      return (

      <div className="container">
        <Menu/>
        <section className="padding flex-row profile-item">
          <img src={require('./imgs/logo.png')} className="my-profile-img"></img>
          <div>
            <h1 style={{margin: '0'}}>Linda Qin</h1>
            <div style={{margin: '0'}}>Computer Science (Mind, Brain and Behavior) & Economics (minor)</div>
            <div style={{margin: '0'}}>Senior @ Harvard University</div>
          </div>
        </section>

        <section className="self-view">
          <h2 style={{marginTop: '0', color: 'white'}}>(Visible to you only)</h2>
          <div className="flex-column">
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>analytics</b> stints.</div>
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>content creation & management</b> stints.</div>
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>design & branding</b> stints.</div>
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>software engineering</b> stints.</div>
          </div>
          <div className="subtitle" style={{color: 'white', marginTop: '30px'}}>(If you set yourself as ‘not available’ for a category, you will not show up in relevant search results for that area.)</div>
        </section>

        <section className="profile-item flex-row padding experience-section">
          <div className="experience">
            <h2>Work Experience</h2>
            <div className="experience-container">
              <div className="experience-line"></div>
              <div className="experience-item">
                <div className="experience-label">‘19</div>
                Product designer @ <b> Instagram</b>
              </div>
              <div className="experience-item">
                <div className="experience-label">‘19</div>
                Adviser @ <b>Harvard Office for International Education</b>
              </div>
              <div className="experience-item">
                <div className="experience-label">‘19</div>
                Designer @ <b> HSA DEV</b>
              </div>
            </div>
          </div>
          <div className="experience">
            <h2 style={{color: "#05D9B2"}}>Other Experience</h2>
            <div className="experience-container">
              <div className="experience-line" style={{backgroundColor: "#05D9B2"}}></div>
              <div className="experience-item" >
                <div className="experience-label" style={{backgroundColor: "#05D9B2"}}>‘19</div>
                Product designer @ <b> Instagram</b>
              </div>
              <div className="experience-item">
                <div className="experience-label" style={{backgroundColor: "#05D9B2"}}>‘19</div>
                Adviser @ <b>Harvard Office for International Education</b>
              </div>
              <div className="experience-item">
                <div className="experience-label" style={{backgroundColor: "#05D9B2"}}>‘19</div>
                Designer @ <b> HSA DEV</b>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-item">
          <h1>Analytics</h1>
          <div className="profile-skills">
            <div className="section-header">My skill(s) and proficiency</div>
            <div className="skill-container">
              {SKILLS.map((skill, index) => {
                return (
                  <div className="skill-static">
                    <span className="skill-name-static">{skill}</span>
                    <div className="skill-bar" style={{width: `${LEVEL[index] * 20}%`}}></div>
                  </div>
                )})}
            </div>
          </div>
          <div className="profile-works">
            <div className="section-header">My work(s)</div>
            <div className="works-container">
              <div className="works-item">
                <div className="works-header github">
                  <img src={require('./imgs/logo.png')} className="works-header-img"></img>
                  Github
                </div>

                <div className="works-section">
                  <div className="works-section-header github">My recent repositories</div>
                  <div className="works-section-item">
                    <b>Lorem-ipsum-dolor</b><br/>
                    Lorem ipsum dolor sit amet, consectetur
                  </div>
                  <div className="works-section-item">
                    <b>Ultrices at magna</b><br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare.
                  </div>
                  <div className="works-section-item">
                    <b>Lorem ipsum</b><br/>
                    Lorem ipsum dolor sit
                  </div>
                </div>

                <div className="works-section">
                  <div className="works-section-header github">Number of contributions</div>
                  <div className="works-section-item">
                    <b>180</b> in the last year (average <b>15</b> per month)
                  </div>
                </div>

                <div className="works-section">
                  <div className="works-section-header">My organizations</div>
                  <div className="works-section-item">
                    <b>cs61</b><br/>
                    A systems class taught at Harvard
                  </div>
                </div>

              </div>

              <div className="works-item">
                <div className="works-header gray">
                  <img src={require('./imgs/logo.png')} className="works-header-img"></img>
                  My personal website
                </div>
                <div className="works-section">
                  <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                  <img src={require('./imgs/example-website.png')} className="works-laptop-screen"></img>
                </div>
              </div>

            </div>
          </div>

          <div className="profile-awards">
            <div className="section-header">My awards</div>
            <h3><b>Award goes here</b> (a competition award from awarder)</h3>
          </div>


        </section>

        <section className="profile-item">
          <h1>Content Creation & Management</h1>
          <div className="profile-skills">
            <div className="section-header">My skill(s) and proficiency</div>
            <div className="skill-container">
              {SKILLS.map((skill, index) => {
                return (
                  <div className="skill-static">
                    <span className="skill-name-static">{skill}</span>
                    <div className="skill-bar" style={{width: `${LEVEL[index] * 20}%`}}></div>
                  </div>
                )})}
            </div>
          </div>
          <div className="profile-works">
            <div className="section-header">My work(s)</div>
            <div className="works-container">

              <div className='flex-column'>

                <div className="works-item column-works-item">
                  <div className="works-header medium">
                    <img src={require('./imgs/logo.png')} className="works-header-img"></img>
                    Medium
                  </div>

                  <div className="works-section">
                    <div className="works-section-header medium">My recent publications</div>
                    <div className="works-section-item">
                      <b>Medium article 1</b><br/>
                      <i>Published on this date</i><br/>
                      Lorem ipsum dolor sit amet, consectetur
                    </div>
                    <div className="works-section-item">
                      <b>Medium article 2</b><br/>
                      <i>Published on this date</i><br/>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare.
                    </div>
                    <div className="works-section-item">
                      <b>Medium article 3</b><br/>
                      <i>Published on this date</i><br/>
                      Lorem ipsum dolor sit
                    </div>
                  </div>

                </div>

                <div className="works-item column-works-item">
                  <div className="works-header medium">
                    <img src={require('./imgs/logo.png')} className="works-header-img"></img>
                    Instagram
                  </div>

                  <div className="works-section flex-row">
                    <img src={require('./imgs/logo.png')} className="insta-img"></img>
                    <div className='flex-column' style={{justifyContent: 'center'}}>
                      <b className="insta-handle">@1indaqin</b>
                      <div className="insta-handle">1493 followers</div>
                    </div>
                  </div>

                </div>

              </div>

              <div className="works-item">
                <div className="works-header gray">
                  <img src={require('./imgs/logo.png')} className="works-header-img"></img>
                  My personal website
                </div>
                <div className="works-section">
                  <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                  <img src={require('./imgs/example-website.png')} className="works-laptop-screen"></img>
                </div>
              </div>

            </div>
          </div>

          <div className="profile-awards">
            <div className="section-header">My awards</div>
            <h3><b>Award goes here</b> (a competition award from awarder)</h3>
          </div>


        </section>

        <section className="profile-item">
          <h1>Software Development</h1>
          <div className="profile-skills">
            <div className="section-header">My skill(s) and proficiency</div>
            <div className="skill-container">
              {SKILLS.map((skill, index) => {
                return (
                  <div className="skill-static">
                    <span className="skill-name-static">{skill}</span>
                    <div className="skill-bar" style={{width: `${LEVEL[index] * 20}%`}}></div>
                  </div>
                )})}
            </div>
          </div>
          <div className="profile-works">
            <div className="section-header">My work(s)</div>
            <div className="works-container">
              <div className="works-item">
                <div className="works-header github">
                  <img src={require('./imgs/logo.png')} className="works-header-img"></img>
                  Github
                </div>

                <div className="works-section">
                  <div className="works-section-header github">My recent repositories</div>
                  <div className="works-section-item">
                    <b>Lorem-ipsum-dolor</b><br/>
                    Lorem ipsum dolor sit amet, consectetur
                  </div>
                  <div className="works-section-item">
                    <b>Ultrices at magna</b><br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare.
                  </div>
                  <div className="works-section-item">
                    <b>Lorem ipsum</b><br/>
                    Lorem ipsum dolor sit
                  </div>
                </div>

                <div className="works-section">
                  <div className="works-section-header github">Number of contributions</div>
                  <div className="works-section-item">
                    <b>180</b> in the last year (average <b>15</b> per month)
                  </div>
                </div>

                <div className="works-section">
                  <div className="works-section-header">My organizations</div>
                  <div className="works-section-item">
                    <b>cs61</b><br/>
                    A systems class taught at Harvard
                  </div>
                </div>

              </div>

              <div className="works-item">
                <div className="works-header gray">
                  <img src={require('./imgs/logo.png')} className="works-header-img"></img>
                  My personal website
                </div>
                <div className="works-section">
                  <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                  <img src={require('./imgs/example-website.png')} className="works-laptop-screen"></img>
                </div>
              </div>

            </div>
          </div>

          <div className="profile-awards">
            <div className="section-header">My awards</div>
            <h3><b>Award goes here</b> (a competition award from awarder)</h3>
          </div>


        </section>

      </div>
    )}
  }

function mapStateToProps(state, props) {
  return {
    displayName: state.firebase.auth.displayName,
    photoURL: state.firebase.auth.photoURL,
  };
}

// <div className="padding flex-row profile-item">
//   <img src={this.props.photoURL} className="my-profile-img"></img>
//   <div>
//     <h1 style={{margin: '0'}}>{this.props.displayName}</h1>
//     <div style={{margin: '0'}}>Computer Science (Mind, Brain and Behavior) & Economics (minor)</div>
//     <div style={{margin: '0'}}>Senior @ Harvard University</div>
//   </div>
// </div>


export default connect(mapStateToProps)(ProfileView);
