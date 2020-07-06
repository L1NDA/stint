import React from 'react'
import Menu from './Menu.js'
import { connect } from "react-redux"
import './style/my-profile.css'

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
        <div className="padding flex-row profile-item">
          <img src={this.props.photoURL} className="my-profile-img"></img>
          <div>
            <h1 style={{margin: '0'}}>{this.props.displayName}</h1>
            <div style={{margin: '0'}}>Computer Science (Mind, Brain and Behavior) & Economics (minor)</div>
            <div style={{margin: '0'}}>Senior @ Harvard University</div>
          </div>
        </div>

        <div className="self-view">
          <h2 style={{marginTop: '0', color: 'white'}}>(Visible to you only)</h2>
          <div className="flex-column">
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>analytics</b> stints.</div>
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>content creation & management</b> stints.</div>
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>design & branding</b> stints.</div>
            <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>software engineering</b> stints.</div>
          </div>
          <div className="subtitle" style={{color: 'white', marginTop: '30px'}}>(If you set yourself as ‘not available’ for a category, you will not show up in relevant search results for that area.)</div>
        </div>

        <div className="profile-item flex-row padding experience-section">
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
        </div>

        <div className="profile-item">
          <h1>Analytics</h1>
        </div>

      </div>
    )}
  }

function mapStateToProps(state, props) {
  return {
    displayName: state.firebase.auth.displayName,
    photoURL: state.firebase.auth.photoURL,
  };
}

export default connect(mapStateToProps)(ProfileView);
