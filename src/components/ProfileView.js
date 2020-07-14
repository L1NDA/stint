import React from 'react'
import Menu from './Menu.js'
import { connect } from "react-redux"
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import './style/my-profile.css'
import { IoLogoGithub } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import { AiFillMediumCircle, AiFillInstagram } from "react-icons/ai";
import { getFreelancerRef } from '../api/freelancer'
import { TiSortNumericallyOutline } from 'react-icons/ti';
import {getInstaInfo} from "../api/instagram"
import {getMediumInfo} from "../api/medium"
import {getGithubInfo} from "../api/github"
import ReactLoading from "react-loading";


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

  componentDidUpdate() {
    if (!this.state.width) {
      this.setWidth();
    }

    console.log(this.state)
  }

  setWidth = () => {
    const optionEle = document.getElementById(`hidden-skill-level`);
    if (optionEle) {
      const width = optionEle.offsetWidth + 5; // padding width or arrows
      this.setState({ width: `${width}px` });
    }

  };

  updateProfilePic = (imgUrl) => {
    this.state.freelancerRef.child("avatarUrl").set(imgUrl)
    document.getElementById("profile-img").src = imgUrl
  }

  componentDidMount = async () => {
    let fileUrls = await this.getFilesFromStorage()
    console.log('fileurls', fileUrls)

    let freelancerRef = await getFreelancerRef(this.props.auth.uid)
    let freelancerInfo = await freelancerRef.on("value", (snapshot) => {
        let info = snapshot.val()
        console.log("uid", this.props.auth.uid)
        console.log("freelancerinfo", info)
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
          console.log("github", githubUsername)
          gInfo = getGithubInfo(githubUsername)
        }

        if (instaUsername) {
          console.log('insta', instaUsername)
          iInfo = getInstaInfo(instaUsername)
        }

        if (mediumUsername) {
          console.log('medium', mediumUsername)
          mInfo = getMediumInfo(mediumUsername)
        }

        this.setState({
            freelancerInfo: info,
            githubInfo: gInfo,
            instagramInfo: iInfo,
            mediumInfo: mInfo,
            fileUrls: fileUrls
        },
        () => console.log("everything", this.state.githubInfo, this.state.instagramInfo, this.state.mediumInfo, this.state.freelancerInfo)

      )}, function(error) {
      console.error(error)
    })
    // let githubUser = this.state.freelancerInfo.profile.softwareDev.githubUrl
    // this.setState({
    //   githubInfo: this.state.freelancerInfo.profile.softwareDev.githubUrl
    // })

  }

  getFilesFromStorage = async () => {
    let storageRef = this.props.storage.ref()
    let filesRef = storageRef.child("images" + "/" + this.props.auth.uid)
    let res = await filesRef.listAll()

    let fileUrls = []
    res.items.forEach((item) => {
      fileUrls.push(item.getDownloadURL())
    })
    return fileUrls
  }

  sortSkills = (skills) => {
    var items = Object.keys(skills).map(function(key) {
      return [key, skills[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    return items
  }

  render() {
      return (

      <div className="container">
        <Menu/>
        {this.state.freelancerInfo
          ? <><section className="padding flex-row profile-item">
            <img id="profile-img" src={this.props.auth.photoURL} className="my-profile-img"></img>
            <div>
              <h1 style={{margin: '0'}}>{this.props.auth.displayName.split(' ')[0]}</h1>
              <div style={{margin: '0'}}>{this.state.freelancerInfo.profile.education.majors[0]}
                {this.state.freelancerInfo.profile.education.majors[1] ? ` & ` + this.state.freelancerInfo.profile.education.majors[1] : null}
                {this.state.freelancerInfo.profile.education.minors[0] ? ` / ` + this.state.freelancerInfo.profile.education.minors[0] + ` (minor)` : null}
                {this.state.freelancerInfo.profile.education.minors[1] ?  `& ` + this.state.freelancerInfo.profile.education.minors[0] + ` (minor)` : null}</div>
              <div style={{margin: '0'}}>{this.state.freelancerInfo.profile.education.year.charAt(0).toUpperCase() + this.state.freelancerInfo.profile.education.year.slice(1)} @ {this.state.freelancerInfo.profile.education.school}</div>
            </div>
          </section>

          <section className="self-view">
            <h2 style={{marginTop: '0', color: 'white'}}>(Visible to you only)</h2>
            <div className="flex-column">
              {this.state.freelancerInfo.profile.dataAnalytics ?
                <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>analytics</b> stints.</div> : null}

              {this.state.freelancerInfo.profile.contentCreation ? <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>content creation & management</b> stints.</div> : null}

              {this.state.freelancerInfo.profile.design ? <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>design & branding</b> stints.</div> : null}

              {this.state.freelancerInfo.profile.softwareDev ? <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>software engineering</b> stints.</div> : null}

            </div>
            <div className="subtitle" style={{color: 'white', marginTop: '30px'}}>(If you set yourself as ‘not available’ for a category, you will not show up in relevant search results for that area.)</div>
          </section>

          <section className="profile-item flex-row padding experience-section">
            <div className="experience">
              <h2>Work Experience</h2>
              <div className="experience-container">
                <div className="experience-line"></div>
                {this.state.freelancerInfo.profile.workExperience.companies.map((company, index) => {
                  return (
                    <div className="experience-item">
                      <div className="experience-label">‘{this.state.freelancerInfo.profile.workExperience.companyYears[index].slice(2)}</div>
                      {this.state.freelancerInfo.profile.workExperience.companyRoles[index]} @ <b> {company}</b>
                    </div>
                  )})}
              </div>
            </div>
            <div className="experience">
              <h2 style={{color: "#05D9B2"}}>Other Experience</h2>
              <div className="experience-container">
                <div className="experience-line" style={{backgroundColor: "#05D9B2"}}></div>
                  {this.state.freelancerInfo.profile.orgExperience.organizations.map((organization, index) => {
                    return (
                      <div className="experience-item">
                        <div className="experience-label" style={{backgroundColor: "#05D9B2"}}>
                          ‘{this.state.freelancerInfo.profile.orgExperience.orgYears[index].slice(2)}</div>
                        {this.state.freelancerInfo.profile.orgExperience.orgRoles[index]} @ <b> {organization}</b>
                      </div>
                    )})}
              </div>
            </div>
          </section>

          {this.state.freelancerInfo.profile.dataAnalytics ?
            <section className="profile-item">
              <h1>Analytics</h1>
              <div className="profile-skills">
                <div className="section-header">My skill(s) and proficiency</div>
                <div className="skill-container">
                  {this.sortSkills(this.state.freelancerInfo.profile.dataAnalytics.skills).map((skillTuple, index) => {
                    return (
                      <div className="skill-static" style={{ minWidth: this.state.width }}>
                        <span className="skill-name-static">{skillTuple[0]}</span>
                        <div className="skill-bar" style={{width: `${skillTuple[1] * 20}%`}}></div>
                        <div className="skill-static" id="hidden-skill-level">Skill Level</div>
                      </div>
                    )})}
                </div>
              </div>
              <div className="profile-works">
                <div className="section-header">My work(s)</div>
                <div className="works-container">
                  <a className="works-item" href={`https://github.com/${this.state.freelancerInfo.profile.dataAnalytics.githubUrl.slice(1)}`} target="_blank">
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

                  </a>

                  <a className="works-item" href={this.state.freelancerInfo.profile.dataAnalytics.personalWebsiteUrl} target="_blank">
                    <div className="works-header gray">
                      <FiLink className="works-header-img"/>
                      My personal website
                    </div>
                    <div className="works-section">
                      <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                      <img src={require('./imgs/example-website.png')} className="works-laptop-screen"></img>
                    </div>
                  </a>

                </div>
              </div>

              {this.state.freelancerInfo.profile.dataAnalytics.awardCategories ?
                <div className="profile-awards">
                  <div className="section-header">My awards</div>
                  {this.state.freelancerInfo.profile.dataAnalytics.awardCategories.map((awardCategory, index) => {
                    return (
                      <h3><b>{this.state.freelancerInfo.profile.dataAnalytics.awardContent[index]} </b>
                        ({awardCategory === "competition" ? `a competition` : awardCategory === "academic" ? "an academic" : `an`} award from {this.state.freelancerInfo.profile.dataAnalytics.awardProviders[index]})</h3>
                    )})}

                </div>
                : null
              }


            </section>
            : null
          }

          {this.state.freelancerInfo.profile.contentCreation ?
            <section className="profile-item">
              <h1>Content Creation & Management</h1>
              <div className="profile-skills">
                <div className="section-header">My skill(s) and proficiency</div>
                <div className="skill-container">
                  {this.sortSkills(this.state.freelancerInfo.profile.contentCreation.skills).map((skillTuple, index) => {
                    return (
                      <div className="skill-static" style={{ minWidth: this.state.width }}>
                        <span className="skill-name-static">{skillTuple[0]}</span>
                        <div className="skill-bar" style={{width: `${skillTuple[1] * 20}%`}}></div>
                        <div className="skill-static" id="hidden-skill-level">Skill Level</div>
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

                  <a className="works-item" href={this.state.freelancerInfo.profile.contentCreation.personalWebsiteUrl} target="_blank">
                    <div className="works-header gray">
                      <FiLink className="works-header-img"/>
                      My personal website
                    </div>
                    <div className="works-section">
                      <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                      <img src={require('./imgs/example-website.png')} className="works-laptop-screen"></img>
                    </div>
                  </a>

                </div>
              </div>

              {this.state.freelancerInfo.profile.contentCreation.awardCategories ?
                <div className="profile-awards">
                  <div className="section-header">My awards</div>
                  {this.state.freelancerInfo.profile.contentCreation.awardCategories.map((awardCategory, index) => {
                    return (
                      <h3><b>{this.state.freelancerInfo.profile.contentCreation.awardContent[index]} </b>
                        ({awardCategory === "competition" ? `a competition` : awardCategory === "academic" ? "an academic" : `an`} award from {this.state.freelancerInfo.profile.contentCreation.awardProviders[index]})</h3>
                    )})}

                </div>
                : null
              }


            </section>
          : null}

          {this.state.freelancerInfo.profile.softwareDev ?
            <section className="profile-item">
              <h1>Software Development</h1>
              <div className="profile-skills">
                <div className="section-header">My skill(s) and proficiency</div>
                <div className="skill-container">
                  {this.sortSkills(this.state.freelancerInfo.profile.softwareDev.skills).map((skillTuple, index) => {
                    return (
                      <div className="skill-static" style={{ minWidth: this.state.width }}>
                        <span className="skill-name-static">{skillTuple[0]}</span>
                        <div className="skill-bar" style={{width: `${skillTuple[1] * 20}%`}}></div>
                        <div className="skill-static" id="hidden-skill-level">Skill Level</div>
                      </div>
                    )})}
                </div>
              </div>
              <div className="profile-works">
                <div className="section-header">My work(s)</div>
                <div className="works-container">
                  <a className="works-item" href={`https://github.com/${this.state.freelancerInfo.profile.softwareDev.githubUrl.slice(1)}`} target="_blank">
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

                  </a>

                  <a className="works-item" href={this.state.freelancerInfo.profile.softwareDev.personalWebsiteUrl} target="_blank">
                    <div className="works-header gray">
                      <FiLink className="works-header-img"/>
                      My personal website
                    </div>
                    <div className="works-section">
                      <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                      <img src={require('./imgs/example-website.png')} className="works-laptop-screen"></img>
                    </div>
                  </a>

                </div>
              </div>

              {this.state.freelancerInfo.profile.softwareDev.awardCategories ?
                <div className="profile-awards">
                  <div className="section-header">My awards</div>
                  {this.state.freelancerInfo.profile.softwareDev.awardCategories.map((awardCategory, index) => {
                    return (
                      <h3><b>{this.state.freelancerInfo.profile.softwareDev.awardContent[index]} </b>
                        ({awardCategory === "competition" ? `a competition` : awardCategory === "academic" ? "an academic" : `an`} award from {this.state.freelancerInfo.profile.softwareDev.awardProviders[index]})</h3>
                    )})}

                </div>
                : null
              }

            </section>
            : null}

          {this.state.freelancerInfo.profile.design ?
            <section className="profile-item">
              <h1>Design and Branding</h1>
              <div className="profile-skills">
                <div className="section-header">My skill(s) and proficiency</div>
                <div className="skill-container">
                  {this.sortSkills(this.state.freelancerInfo.profile.design.skills).map((skillTuple, index) => {
                    return (
                      <div className="skill-static" style={{ minWidth: this.state.width }}>
                        <span className="skill-name-static">{skillTuple[0]}</span>
                        <div className="skill-bar" style={{width: `${skillTuple[1] * 20}%`}}></div>
                        <div className="skill-static" id="hidden-skill-level">Skill Level</div>
                      </div>
                    )})}
                </div>
              </div>
              <div className="profile-works">
                <div className="section-header">My work(s)</div>
                <div className="works-container">
                  <a className="works-item" href={this.state.freelancerInfo.profile.design.personalWebsiteUrl} target="_blank">
                    <div className="works-header gray">
                      <FiLink className="works-header-img"/>
                      My personal website
                    </div>
                    <div className="works-section">
                      <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                      <img src={require('./imgs/example-website.png')} className="works-laptop-screen"></img>
                    </div>
                  </a>

                  <div className="works-item">
                    <div className="works-header gray">
                      <FiLink className="works-header-img"/>
                      My work
                    </div>
                    <div className="works-section flex-column center">
                      <iframe
                        src={`https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf` + `#toolbar=0&navpanes=0&statusbar=0&messages=0`}
                        className="work-iframe"></iframe>
                    </div>
                  </div>

                </div>
              </div>

              {this.state.freelancerInfo.profile.design.awardCategories ?
                <div className="profile-awards">
                  <div className="section-header">My awards</div>
                  {this.state.freelancerInfo.profile.design.awardCategories.map((awardCategory, index) => {
                    return (
                      <h3><b>{this.state.freelancerInfo.profile.design.awardContent[index]} </b>
                        ({awardCategory === "competition" ? `a competition` : awardCategory === "academic" ? "an academic" : `an`} award from {this.state.freelancerInfo.profile.design.awardProviders[index]})</h3>
                    )})}

                </div>
                : null
              }



            </section>
             : null}


          </>

          : <ReactLoading
            className={"Loading"}
            type={"bubbles"}
            width={"20%"}
            height={"auto"}
            color={"#8F8DFF"}
          />}


      </div>
    )}
  }

function parseGithubUser(user) {
  return user.substring(1)
}

function parseMediumUser(user) {
  return user.substring(1)
}

function parseInstaUser(user) {

  return user.substring(1)
}

function mapStateToProps(state, props) {
  const { firebase } = props
  return {
    storage: firebase.storage()
  }
}

export default compose(firebaseConnect(), connect(mapStateToProps))(ProfileView);
