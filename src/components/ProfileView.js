import React from 'react'
import Menu from './Menu.js'
import { connect } from "react-redux"
import { isLoaded, isEmpty } from "react-redux-firebase";
import './style/my-profile.css'
import { IoLogoGithub } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import { AiFillMediumCircle, AiFillInstagram } from "react-icons/ai";
import { getFreelancerRef } from '../api/freelancer'
import { TiSortNumericallyOutline } from 'react-icons/ti';
import {getInstaInfo} from "../api/instagram"
import {getMediumInfo} from "../api/medium"
import {getGithubInfo} from "../api/github"

const SKILLS = ['React', 'Python', 'Javascript', 'HTML/CSS', 'C/C++', 'SQL', 'Java']
const LEVEL = ['5', '4', '4', '4', '2', '1', '1']

class ProfileView extends React.Component {

  constructor(){
    super();
    this.state = {
      freelancerInfo: null,
      githubInfo: null,
      instagramInfo: null,
      mediumInfo: null
    }
  }

  componentDidMount = async () => {
    let freelancerRef = await getFreelancerRef(this.props.auth.uid)
    let freelancerInfo = await freelancerRef.on("value", (snapshot) => {
        let info = snapshot.val()
        console.log(info)
        let githubUsername = null
        let instaUsername = null
        let mediumUsername = null

        let gInfo = null
        let iInfo = null
        let mInfo = null

        if (info.profile.dataAnalytics) {
          if (info.profile.dataAnalytics.githubUrl) {
            let githubUrl = info.profile.dataAnalytics.githubUrl
            githubUsername = parseGithubUser(githubUrl)
          }
        }
        if (info.profile.softwareDev) {
          if (info.profile.softwareDev.githubUrl) {
            let githubUrl = info.profile.softwareDev.githubUrl
            githubUsername = parseGithubUser(githubUrl)
          }
        }
        console.log(githubUsername)
        if (info.profile.contentCreation) {
          if (info.profile.contentCreation.instagramUrl) {
            let instaUrl = info.profile.contentCreation.instagramUrl
            instaUsername = parseInstaUser(instaUrl)
          }
          if (info.profile.contentCreation.mediumUrl) {
            let mediumUrl = info.profile.contentCreation.mediumUrl
            mediumUsername = parseMediumUser(mediumUrl)
          }
        }

        if (githubUsername) {
          gInfo = getGithubInfo(githubUsername)
        }

        if (instaUsername) {
          iInfo = getInstaInfo(instaUsername)
        }

        if (mediumUsername) {
          mInfo = getMediumInfo(mediumUsername)
        }

        this.setState({
            freelancerInfo: freelancerInfo,
            githubInfo: gInfo,
            instagramInfo: iInfo,
            mediumInfo: mInfo
        },
        () => console.log(this.state.githubInfo, this.state.instagramInfo, this.state.mediumInfo)

      )}, function(error) {
      console.error(error)
    })
    // let githubUser = this.state.freelancerInfo.profile.softwareDev.githubUrl
    // this.setState({
    //   githubInfo: this.state.freelancerInfo.profile.softwareDev.githubUrl
    // })

  }

  render() {
      return (

      <div className="container">
        <Menu/>
        <section className="padding flex-row profile-item">
          <img src={this.props.auth.photoURL} className="my-profile-img"></img>
          <div>
            <h1 style={{margin: '0'}}>{this.props.auth.displayName}</h1>
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
                  <IoLogoGithub className="works-header-img"/>
                  Github
                </div>

                <div className="works-section">
                  <div className="works-section-header">My recent repositories</div>
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
                  <div className="works-section-header">Number of contributions</div>
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
                  <FiLink className="works-header-img"/>
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

              <div className='flex-column works-col-wrapper'>

                <div className="works-item column-works-item">
                  <div className="works-header medium">
                    <AiFillMediumCircle className="works-header-img"/>
                    Medium
                  </div>

                  <div className="works-section">
                    <div className="works-section-header">My recent publications</div>
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
                  <div className="works-header instagram">
                    <AiFillInstagram className="works-header-img"/>
                    Instagram
                  </div>

                  <div className="works-section flex-row">
                    <img src={require('./imgs/logo.png')} className="insta-propic"></img>
                    <div className='flex-column' style={{justifyContent: 'center'}}>
                      <b className="insta-handle">@1indaqin</b>
                      <div className="insta-handle">1493 followers</div>
                    </div>
                  </div>

                  <div className="works-section insta-grid">
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                    <img src={require("./imgs/process-1.png")} className="insta-img"/>
                  </div>

                </div>

              </div>

              <div className="works-item">
                <div className="works-header gray">
                  <FiLink className="works-header-img"/>
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
                  <IoLogoGithub className="works-header-img"/>
                  Github
                </div>

                <div className="works-section">
                  <div className="works-section-header">My recent repositories</div>
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
                  <div className="works-section-header">Number of contributions</div>
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
                  <FiLink className="works-header-img"/>
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

function parseGithubUser(user) {
  var str = user;
  var n = str.lastIndexOf('/');
  var result = str.substring(n + 1);
  return result
}

function parseMediumUser(user) {
  var str = user;
  var n = str.lastIndexOf('@');
  var result = str.substring(n + 1);
  return result
}

function parseInstaUser(user) {
  const regex = /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im

  let match = regex.exec(user)
  return match[1]
}

export default ProfileView;
