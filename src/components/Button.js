import React from 'react';
import '../index.css';
import app from 'firebase/app';
import 'firebase/database';
import firebase from '../firebase';

import { TiTimes } from "react-icons/ti";

const ANALYTICS = "analytics"
const BUSINESS = "business"
const DIGITAL_MARKETING = "digitalmarketing"
const ENGINEERING = "engineering"
const GRAPHICS_DESIGN = "graphicsdesign"
const VIDEO_MEDIA = "videomedia"
const WRITING = "writing"

const {setCompanyBetaInfo} = require('../api/company')

const COMPANY = "company"
const STUDENT = "student"

class Button extends React.Component {

  constructor(){
    super();
    this.state = {
      modal: false,
      companyName: '',
      studentName: '',
      categories: new Set(),
      companyEmail: '',
      text: '',
      studentEmail: '',
      dropdown: '',
    }
  }

  handleButtonClick = () => {
    let temp = this.state.modal
    this.setState({
      modal: !temp
    })
  }

  handleCheckbox = (item) => {
    let updatedCategories = this.state.categories
    if (this.state.categories.has(item)) {
      updatedCategories.delete(item)
    }
    else {
      updatedCategories.add(item)
    }
    this.setState({
      categories: updatedCategories
    })
  }

  uploadCompanyData = (event) => {
    event.preventDefault()
    const name = this.state.companyName
    const companyEmail = this.state.companyEmail
    const interestAreas = Array.from(this.state.categories)
    setCompanyBetaInfo(name, companyEmail, interestAreas)
    this.handleButtonClick()
  }

  // Students

  onChangeName = (audience, e) => {
    if (audience === COMPANY) {
      this.setState({ companyName: e.target.value });
    } else if (audience === STUDENT) {
      this.setState({ studentName: e.target.value });
    }
  };

  onChangeEmail = (audience, e) => {
    if (audience === COMPANY) {
      this.setState({ companyEmail: e.target.value });
    } else if (audience === STUDENT) {
      this.setState({ studentEmail: e.target.value });
    }
  };

  onChangeDropdown = event => {
    this.setState({ dropdown: event.target.value });
  };

  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  onCreateMessage = event => {
    event.preventDefault()
    firebase.database().ref('users/' + this.guidGenerator()).set({
      studentEmail: this.state.studentEmail,
      name: this.state.studentName,
      dropdown: this.state.dropdown
    });

    this.setState({
      studentEmail: '',
      name: '',
      dropdown: '',
      modal: false });
  };

  render() {

    return (
      <>
        {this.props.category ?
          <>
          <div className="modal center" style={{display: this.state.modal ? 'flex' : 'none'}}>
              <TiTimes className="modal-x" onClick={this.handleButtonClick}/>
              {this.props.category === COMPANY ?

                <form>
                  <div className="flex-column" style={{marginBottom: "20px"}}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Company name *"
                      className="input"
                      autocomplete="off"
                      onChange={(e) => this.onChangeName(COMPANY, e)}
                      required/>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      className="input"
                      autocomplete="off"
                      onChange={(e) => this.onChangeEmail(COMPANY, e)}
                      required/>
                  </div>

                  <h4>Areas of interest</h4>
                  <div className="flex-column">
                    <div><input type="checkbox"
                           name="analytics"
                           checked={this.state.categories.has(ANALYTICS)}
                           onChange={() => this.handleCheckbox(ANALYTICS)}/>
                    <label for="analytics"
                           onClick={() => this.handleCheckbox(ANALYTICS)}> Analytics </label></div>

                    <div>
                      <input type="checkbox"
                           name="business"
                           checked={this.state.categories.has(BUSINESS)}
                           onChange={() => this.handleCheckbox(BUSINESS)}/>
                    <label for="business"
                           onClick={() => this.handleCheckbox(BUSINESS)}> Business </label>
                  </div>

                  <div><input type="checkbox"
                         name="digitalmarketing"
                         checked={this.state.categories.has(DIGITAL_MARKETING)}
                         onChange={() => this.handleCheckbox(DIGITAL_MARKETING)}/>
                  <label for="digitalmarketing"
                         onClick={() => this.handleCheckbox(DIGITAL_MARKETING)}> Digital Marketing </label></div>

                  <div><input type="checkbox"
                         inline={true}
                         name="engineering"
                         checked={this.state.categories.has(ENGINEERING)}
                         onChange={() => this.handleCheckbox(ENGINEERING)}/>
                  <label for="engineering"
                         onClick={() => this.handleCheckbox(ENGINEERING)}> Engineering </label></div>

                <div><input type="checkbox"
                       name="graphicsdesign"
                       checked={this.state.categories.has(GRAPHICS_DESIGN)}
                       onChange={() => this.handleCheckbox(GRAPHICS_DESIGN)}/>
                <label for="graphicsdesign"
                       onClick={() => this.handleCheckbox(GRAPHICS_DESIGN)}> Graphics & Design </label>
                </div>

                    <div><input type="checkbox"
                           name="videomedia"
                           checked={this.state.categories.has(VIDEO_MEDIA)}
                           onChange={() => this.handleCheckbox(VIDEO_MEDIA)}/>
                    <label for="videomedia"
                           onClick={() => this.handleCheckbox(VIDEO_MEDIA)}> Video & Media </label></div>

                  <div><input type="checkbox"
                         name="writing"
                         checked={this.state.categories.has(WRITING)}
                         onChange={() => this.handleCheckbox(WRITING)}/>
                  <label for="writing"
                         onClick={() => this.handleCheckbox(WRITING)}> Writing </label></div>

                  </div>
                  <button type="submit"
                    className="button"
                    style={{marginTop: "50px"}}
                    onClick={this.uploadCompanyData}>Join our beta →</button>
                </form>

                : null}

                {this.props.category === STUDENT ?
                  <form onSubmit={this.onCreateMessage}>
                  <div className="flex-row" style={{marginBottom: "40px"}}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      className="input"
                      onChange={(e) => this.onChangeName(STUDENT, e)}
                      required/>
                    <input
                      type="email"
                      name="email"
                      placeholder="Student email *"
                      className="input"
                      onChange={(e) => this.onChangeEmail(STUDENT, e)}
                      style={{width: "250px", marginLeft: "20px"}}
                      required/>
                  </div>

                  <select name="Interest"
                          className="dropdown"
                          onChange={this.onChangeDropdown}
                          style={{width: "300px", marginBottom: "40px"}}>
                      <option value="" disabled selected>Area of interest</option>
                      <option value="design" className="dropdown-item">Design</option>
                      <option value="engineering" className="dropdown-item">Engineering</option>
                      <option value="creatives" className="dropdown-item">Creatives</option>
                      <option value="analytics" className="dropdown-item">Analytics</option>
                    </select>
                  <button type="submit"
                    className="button">Join our beta →</button>
                </form> : null}

            </div>
            <div className="modal-screen"
                 style={{display: this.state.modal ? 'block' : 'none'}}
                 onClick={this.handleButtonClick}></div>
               </> : null
        }


           <div className="button"
                style={this.props.style}
                onClick={this.props.onClick}
                type={this.props.type}>

             {this.props.text}

           </div>

      </>


    )
  }
}

export default Button;
