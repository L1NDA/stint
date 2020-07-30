import React from "react";
import { Colleges, Majors, Cities, Roles } from "./LoginDropdowns.js";
import Select from "./Select.js";
import Autocomplete from "./Autocomplete.js";

const Year = ["(select year*)", "freshman", "sophomore", "junior", "senior"];

const State = [
  "(select state*)",
  "Outside US",
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

class StudentInfo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChange = (stateName, content, index = null, finished = null) => {
    this.props.saveToParent(stateName, content, index);
    if (
      stateName === "major" ||
      stateName === "major2" ||
      stateName === "minor" ||
      stateName === "minor2" ||
      stateName === "role1" ||
      stateName === "company1" ||
      stateName === "role2" ||
      stateName === "company2" ||
      stateName === "role3" ||
      stateName === "company3" ||
      stateName === "ec1" ||
      stateName === "ec2" ||
      stateName === "ec3" ||
      stateName === "ecrole1" ||
      stateName === "ecrole2" ||
      stateName === "ecrole3" ||
      stateName === "yearcompany1" ||
      stateName === "yearcompany2" ||
      stateName === "yearcompany3" ||
      stateName === "yearec1" ||
      stateName === "yearec2" ||
      stateName === "yearec3"
    ) {
      if (content) {
        this.setState({
          [stateName]: true,
        });
      } else {
        this.setState({
          [stateName]: false,
        });
      }
    }
  };

  render() {
    return (
      <div className="student-dialogue">
        <div className="student-dialogue-block">
          <h3>
            I am a{" "}
            <Select
              items={Year}
              name="year"
              saveData={this.handleChange}
              selected={this.props.education ? this.props.education.year : ""}
              required={true}
            />
            at{" "}
            <span className="nobreak">
              <Autocomplete
                options={Colleges}
                name="colleges"
                placeholder="(insert college*)"
                saveData={this.handleChange}
                val={this.props.education ? this.props.education.school : ""}
                required={true}
              />
              .
            </span>
          </h3>
          <h3>
            I'm majoring in{" "}
            <Autocomplete
              options={Majors}
              name="major"
              index="0"
              placeholder="(insert major*)"
              saveData={this.handleChange}
              required={true}
              val={this.props.education ? this.props.education.majors[0] : ""}
            />
            {this.state.major ? (
              <span
                className="optional-chunk"
                style={{ filter: this.state.major2 ? "opacity(1)" : null }}
              >
                and{" "}
                <Autocomplete
                  className="optional-input"
                  options={Majors}
                  name="major2"
                  index="1"
                  placeholder="(insert second major)"
                  saveData={this.handleChange}
                  required={false}
                  val={
                    this.props.education &&
                    this.props.education.majors.length === 2
                      ? this.props.education.majors[1]
                      : ""
                  }
                />{" "}
              </span>
            ) : null}
            <span
              style={{
                filter: this.state.minor ? "opacity(1)" : "opacity(0.5)",
                position: "relative",
                zIndex: "3",
              }}
            >
              and minoring in
              <Autocomplete
                options={Majors}
                name="minor"
                placeholder="(insert minor)"
                saveData={this.handleChange}
                index="0"
                required={false}
                val={
                  this.props.education &&
                  this.props.education.minors &&
                  this.props.education.minors.length !== 0
                    ? this.props.education.minors[0]
                    : ""
                }
              />
            </span>
            <span className="nobreak">
              {this.state.minor ? (
                <span
                  className="optional-chunk"
                  style={{ filter: this.state.minor2 ? "opacity(1)" : null }}
                >
                  and{" "}
                  <Autocomplete
                    className="optional-input"
                    options={Majors}
                    name="minor2"
                    index="1"
                    placeholder="(insert second minor)"
                    saveData={this.handleChange}
                    required={false}
                    val={
                      this.props.education &&
                      this.props.education.minors &&
                      this.props.education.minors.length === 2
                        ? this.props.education.minors[1]
                        : ""
                    }
                  />{" "}
                </span>
              ) : null}
              .
            </span>
          </h3>

          <h3>
            I’m currently residing in
            <Autocomplete
              options={Cities}
              name="city"
              placeholder="(insert city*)"
              saveData={this.handleChange}
              required={true}
              val={
                this.props.residenceInfo ? this.props.residenceInfo.city : ""
              }
            />
            ,
            <span className="nobreak">
              <Select
                items={State}
                name="state"
                saveData={this.handleChange}
                selected={
                  this.props.residenceInfo ? this.props.residenceInfo.state : ""
                }
                required={true}
              />
              .
            </span>
          </h3>
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>
            In my most recent work experience, I was as a(n)
            <Autocomplete
              options={Roles}
              name="role1"
              placeholder="(role*)"
              index="0"
              saveData={this.handleChange}
              required={true}
              val={
                this.props.workExperience
                  ? this.props.workExperience.companyRoles[0]
                  : ""
              }
            />
            at{" "}
            <Autocomplete
              name="company1"
              placeholder="(company*)"
              index="0"
              saveData={this.handleChange}
              required={true}
              optionalParent
              val={
                this.props.workExperience
                  ? this.props.workExperience.companies[0]
                  : ""
              }
            />
            in{" "}
            <span className="nobreak">
              <Select
                items={[
                  "(insert year*)",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                ]}
                name="yearcompany1"
                index="0"
                saveData={this.handleChange}
                selected={
                  this.props.workExperience
                    ? this.props.workExperience.companyYears[0]
                    : ""
                }
                required={true}
              />
              .
            </span>
          </h3>
          {this.state.role1 && this.state.company1 ? (
            <h3>
              <span
                className="optional-chunk"
                style={{
                  filter:
                    this.state.role2 || this.state.company2
                      ? "opacity(1)"
                      : null,
                }}
              >
                Before that, I was as a(n)
                <Autocomplete
                  options={Roles}
                  className="optional-input"
                  name="role2"
                  placeholder="(role)"
                  index="1"
                  saveData={this.handleChange}
                  required={
                    this.state.company2 || this.state.yearcompany2
                      ? true
                      : false
                  }
                  maxLength="60"
                  val={
                    this.props.workExperience &&
                    this.props.workExperience.companyRoles.length > 1
                      ? this.props.workExperience.companyRoles[1]
                      : ""
                  }
                />
                at
                <Autocomplete
                  className="optional-input"
                  name="company2"
                  placeholder="(company)"
                  index="1"
                  saveData={this.handleChange}
                  required={
                    this.state.role2 || this.state.yearcompany2 ? true : false
                  }
                  optionalParent
                  maxLength="60"
                  val={
                    this.props.workExperience &&
                    this.props.workExperience.companies.length > 1
                      ? this.props.workExperience.companies[1]
                      : ""
                  }
                />
                in
                <span className="nobreak">
                  <Select
                    items={[
                      "(insert year*)",
                      "2020",
                      "2019",
                      "2018",
                      "2017",
                      "2016",
                    ]}
                    name="yearcompany2"
                    index="1"
                    saveData={this.handleChange}
                    selected={
                      this.props.workExperience &&
                      this.props.workExperience.companyYears.length > 1
                        ? this.props.workExperience.companyYears[1]
                        : ""
                    }
                    required={
                      this.state.role2 || this.state.company2 ? true : false
                    }
                  />
                  .
                </span>
              </span>
            </h3>
          ) : null}
          {this.state.role2 && this.state.company2 ? (
            <h3>
              <span
                className="optional-chunk"
                style={{
                  filter:
                    this.state.role3 || this.state.company3
                      ? "opacity(1)"
                      : null,
                }}
              >
                Before that, I was as a(n)
                <Autocomplete
                  options={Roles}
                  className="optional-input"
                  name="role3"
                  placeholder="(role)"
                  index="2"
                  saveData={this.handleChange}
                  val={
                    this.props.workExperience &&
                    this.props.workExperience.companyRoles.length > 2
                      ? this.props.workExperience.companyRoles[2]
                      : ""
                  }
                  required={
                    this.state.company3 || this.state.yearcompany3
                      ? true
                      : false
                  }
                />
                at
                <Autocomplete
                  className="optional-input"
                  name="company3"
                  placeholder="(company)"
                  index="2"
                  saveData={this.handleChange}
                  required={
                    this.state.role3 || this.state.yearcompany3 ? true : false
                  }
                  maxLength="60"
                  val={
                    this.props.workExperience &&
                    this.props.workExperience.companies.length > 2
                      ? this.props.workExperience.companies[2]
                      : ""
                  }
                />
                in
                <span className="nobreak">
                  <Select
                    items={[
                      "(insert year*)",
                      "2020",
                      "2019",
                      "2018",
                      "2017",
                      "2016",
                    ]}
                    name="yearcompany3"
                    index="2"
                    saveData={this.handleChange}
                    selected={
                      this.props.workExperience &&
                      this.props.workExperience.companyYears.length > 2
                        ? this.props.workExperience.companyYears[2]
                        : ""
                    }
                    required={
                      this.state.role3 || this.state.company3 ? true : false
                    }
                  />
                  .
                </span>
              </span>
            </h3>
          ) : null}
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>
            I’ve been most recently involved in
            <Autocomplete
              name="ec1"
              placeholder="(organization*)"
              index="0"
              saveData={this.handleChange}
              required={true}
              optionalParent
              maxLength="60"
              val={
                this.props.orgExperience
                  ? this.props.orgExperience.orgRoles[0]
                  : ""
              }
            />{" "}
            as a(n)
            <Autocomplete
              name="ecrole1"
              placeholder="(role*)"
              index="0"
              saveData={this.handleChange}
              required={true}
              optionalParent
              val={
                this.props.orgExperience
                  ? this.props.orgExperience.organizations[0]
                  : ""
              }
            />
            in{" "}
            <span className="nobreak">
              <Select
                items={[
                  "(insert year*)",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                ]}
                name="yearec1"
                index="0"
                saveData={this.handleChange}
                selected={
                  this.props.orgExperience
                    ? this.props.orgExperience.orgYears[0]
                    : ""
                }
                required={true}
              />
              .
            </span>
          </h3>
          {this.state.ec1 && this.state.ecrole1 ? (
            <h3>
              <span
                className="optional-chunk"
                style={{
                  filter:
                    this.state.ec2 || this.state.ecrole2 ? "opacity(1)" : null,
                }}
              >
                I’ve also been involved in
                <Autocomplete
                  className="optional-input"
                  name="ec2"
                  placeholder="(organization)"
                  index="1"
                  saveData={this.handleChange}
                  required={
                    this.state.ecrole2 || this.state.yearec2 ? true : false
                  }
                  maxLength="60"
                  val={
                    this.props.orgExperience &&
                    this.props.orgExperience.orgRoles.length > 1
                      ? this.props.orgExperience.orgRoles[1]
                      : ""
                  }
                />{" "}
                as a(n)
                <Autocomplete
                  className="optional-input"
                  name="ecrole2"
                  placeholder="(role)"
                  index="1"
                  saveData={this.handleChange}
                  required={this.state.ec2 || this.state.yearec2 ? true : false}
                  optionalParent
                  val={
                    this.props.orgExperience &&
                    this.props.orgExperience.organizations.length > 1
                      ? this.props.orgExperience.organizations[1]
                      : ""
                  }
                />
                in{" "}
                <span className="nobreak">
                  <Select
                    items={[
                      "(insert year*)",
                      "2020",
                      "2019",
                      "2018",
                      "2017",
                      "2016",
                    ]}
                    name="yearec2"
                    index="1"
                    saveData={this.handleChange}
                    selected={
                      this.props.orgExperience &&
                      this.props.orgExperience.orgYears.length > 1
                        ? this.props.orgExperience.orgYears[1]
                        : ""
                    }
                    required={
                      this.state.ec2 || this.state.ecrole2 ? true : false
                    }
                  />
                  .
                </span>
              </span>
            </h3>
          ) : null}
          {this.state.ec2 && this.state.ecrole2 ? (
            <h3>
              <span
                className="optional-chunk"
                style={{
                  filter:
                    this.state.ec3 || this.state.ecrole3 ? "opacity(1)" : null,
                }}
              >
                I’ve also been involved in
                <Autocomplete
                  className="optional-input"
                  name="ec3"
                  placeholder="(organization)"
                  index="2"
                  saveData={this.handleChange}
                  required={
                    this.state.ecrole3 || this.state.yearec3 ? true : false
                  }
                  maxLength="60"
                  val={
                    this.props.orgExperience &&
                    this.props.orgExperience.orgRoles.length > 2
                      ? this.props.orgExperience.orgRoles[2]
                      : ""
                  }
                />{" "}
                as a(n)
                <Autocomplete
                  className="optional-input"
                  name="ecrole3"
                  placeholder="(role)"
                  index="2"
                  saveData={this.handleChange}
                  val={
                    this.props.orgExperience &&
                    this.props.orgExperience.organizations.length > 2
                      ? this.props.orgExperience.organizations[2]
                      : ""
                  }
                  required={this.state.ec3 || this.state.yearec3 ? true : false}
                />
                in{" "}
                <span className="nobreak">
                  <Select
                    items={[
                      "(insert year*)",
                      "2020",
                      "2019",
                      "2018",
                      "2017",
                      "2016",
                    ]}
                    name="yearec3"
                    index="2"
                    saveData={this.handleChange}
                    selected={
                      this.props.orgExperience &&
                      this.props.orgExperience.orgYears.length > 2
                        ? this.props.orgExperience.orgYears[2]
                        : ""
                    }
                    required={
                      this.state.ec3 || this.state.ecrole3 ? true : false
                    }
                  />
                  .
                </span>
              </span>
            </h3>
          ) : null}
        </div>
      </div>
    );
  }
}

export default StudentInfo;
