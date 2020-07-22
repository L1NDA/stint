import React from "react";
import Select from "./Select.js";
import Autocomplete from "./Autocomplete.js";
import Button from "./Button.js";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { debounce } from "lodash";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";

const SKILLS = "skills";

class StudentSkillsDropdown extends React.Component {
  constructor(props) {
    super();
    this.state = {
      details: false,
      [SKILLS]: {},
      files: null,
    };

    let section = props.section;
    this.haveMappings = {
      [section + "Have0"]: [section + "0"],
      [section + "Have1"]: [section + "1"],
      [section + "Have2"]: [section + "2"],
      [section + "Have3"]: [section + "3"],
      [section + "HaveAward"]: [
        section + "HaveAwardCategory",
        section + "HaveAwardContent",
        section + "HaveAwardProvider",
      ],
      [section + "HaveAward1"]: [
        section + "HaveAwardCategory1",
        section + "HaveAwardContent1",
        section + "HaveAwardProvider1",
      ],
      [section + "HaveAward2"]: [
        section + "HaveAwardCategory2",
        section + "HaveAwardContent2",
        section + "HaveAwardProvider2",
      ],
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.details && !this.state.width) {
      this.setWidth();
    }
  }

  setWidth = () => {
    const optionEle = document.getElementById(`hidden-skill-level`);
    const width = optionEle.offsetWidth + 5; // padding width or arrows
    this.setState({ width: `${width}px` });
  };

  // For component that needs a function prop

  saveState = (stateName, content, index = null) => {
    this.setState(function (prevState) {
      let updateAttributes = { [stateName]: content };
      // console.log('statename', stateName)
      // console.log('content', content)
      // console.log('havemappings', this.haveMappings)
      // console.log("check1", stateName in this.haveMappings)
      if ([stateName] in this.haveMappings) {
        if (content !== "have") {
          this.haveMappings[stateName].forEach((key) => {
            updateAttributes[key] = null;
          });
        }
      }
      return updateAttributes;
    });
  };

  // handleChange = (stateName, content, index = null) => {
  //   this.props.handleChange(stateName, content, index)
  // }

  handleChange = (stateName, content, index = null) => {
    this.props.saveEntireState();
  };

  handleClick = () => {
    this.setState({
      details: !this.state.details,
    });
  };

  aggregateAwards = (currState) => {
    let categoryString = this.props.section + "HaveAwardCategory";
    let contentString = this.props.section + "HaveAwardContent";
    let providerString = this.props.section + "HaveAwardProvider";
    if (currState[categoryString]) {
      currState.awardCategories = [currState[categoryString]];
      currState.awardContent = [currState[contentString]];
      currState.awardProviders = [currState[providerString]];
    }
    if (currState[categoryString + "1"]) {
      currState.awardCategories.push(currState[categoryString + "1"]);
      currState.awardContent.push(currState[contentString + "1"]);
      currState.awardProviders.push(currState[providerString + "1"]);
    }
    if (currState[categoryString + "2"]) {
      currState.awardCategories.push(currState[categoryString + "2"]);
      currState.awardContent.push(currState[contentString + "2"]);
      currState.awardProviders.push(currState[providerString + "2"]);
    }
    return currState;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let aggregatedState = this.aggregateAwards(this.state);
    this.props.handleButton(this.props.section, aggregatedState);
    this.setState({
      submitted: true,
      details: false,
    });
  };

  handleSkillClick = (e, skill, type) => {
    e.stopPropagation();
    let tempLevel = this.state[SKILLS][skill];
    if (tempLevel === undefined) {
      tempLevel = 0;
    }
    if (tempLevel && type === "default") {
      tempLevel = 0;
    } else if (type === "plus") {
      tempLevel += 1;
    } else if (type === "minus") {
      tempLevel -= 1;
    } else {
      tempLevel = 2;
    }

    let newSkills = {
      ...this.state[SKILLS],
      [skill]: Math.min(5, Math.max(0, tempLevel)),
    };
    if (tempLevel <= 0) {
      delete newSkills[skill];
    }
    this.setState({
      [SKILLS]: newSkills,
    });
  };

  handleFiles = (files) => {
    // check if there's already a file uploaded - if so, delete it first from firebase and state
    if (this.state.files && this.state.files.length > 0) {
      let prevFile = this.state.files[0].name;
      this.setState(
        {
          files: null,
        },
        async function () {
          await this.handleDeleteUpload(prevFile);
        }
      );
    }

    var fileErrorHandler = document.getElementById("file-error");
    if (files.length === 0) {
      fileErrorHandler.innerHTML = "Please upload a file.";
      return;
    }

    const acceptedFileTypes = [".png", ".pdf", ".jpg", ".jpeg", ".gif", ".svg"];
    // check file type is accepted and that it is below 10MB (in bytes)
    if (
      acceptedFileTypes.some((type) => files[0].name.endsWith(type)) &&
      files[0].size <= 10000000
    ) {
      this.setState(
        {
          files: files,
        },
        function () {
          this.handleUpload(fileErrorHandler);
        }
      );
    } else {
      fileErrorHandler.innerHTML =
        "Please upload a .png, .pdf, .jpg, .jpeg, .svg,  or .gif file below 10MB";
    }
  };

  handleUpload = (fileErrorHandler) => {
    let file = this.state.files[0];

    let fileRef = this.props.storage.ref(
      "images" + "/" + this.props.userUid + "/" + "designshowcase-" + file.name
    );
    let uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileErrorHandler.innerHTML = `Upload is ${Math.round(progress)} % done`;
      },
      function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            fileErrorHandler.innerHTML = "Not authorized";
            break;
          case "storage/canceled":
            fileErrorHandler.innerHTML = "Upload cancelled";
            break;
          case "storage/unknown":
            fileErrorHandler.innerHTML = "Unknown error, please try again";
            break;
        }
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          fileErrorHandler.innerHTML = `Successfully uploaded ${file.name}`;
        });
      }
    );
  };

  handleDeleteUpload = (fileName) => {
    let fileRef = this.props.storage.ref(
      "images" + "/" + this.props.userUid + "/" + "designshowcase-" + fileName
    );
    fileRef
      .delete()
      .then(function () {
        console.log("File deleted");
      })
      .catch(function (error) {
        console.error("Error, file not deleted:", error);
      });
  };

  render() {
    return (
      <div className="student-dialogue-block">
        <div
          className="flex-column"
          className="skills-header"
          onClick={this.handleClick}
        >
          <div className="skills-header-row">
            <h3 style={{ fontWeight: "bold" }}>{this.props.title}</h3>
            {this.state.details ? <BsChevronUp /> : <BsChevronDown />}
            {(!this.props[this.props.section] && this.state.details && !this.state.submitted) ||
            (!this.props[this.props.section] && Object.keys(this.state.skills).length !== 0 &&
              !this.state.submitted) ||
            (!this.props[this.props.section] && this.state[`${this.props.section}HaveAwardContent`] &&
              !this.state.submitted) ? (
              <div
                className="student-skill-status"
                style={{ backgroundColor: "#8F8DFF" }}
              >
                In Progress
              </div>
            ) : null}
            {this.state.submitted ? (
              <div
                className="student-skill-status"
                style={{ backgroundColor: "#05D9B2" }}
              >
                Completed
              </div>
            ) : null}
            {this.props[this.props.section] || this.state.submitted ?
              <div
                className="student-skill-status"
                style={{ backgroundColor: "#05D9B2" }}
              >
                Listed
              </div> : null
            }
          </div>
          <p style={{ color: "#B0B0B0", margin: "0", marginTop: "10px" }}>
            {this.props.subtitle}
          </p>
        </div>

        {this.state.details ? (
          <form className="flex-column" onSubmit={this.handleSubmit}>
            {this.props.content.map((social, index) => {
              return (
                <h3>
                  I{" "}
                  <Select
                    items={["have", "do not have"]}
                    name={`${this.props.section}Have${index}`}
                    saveData={this.saveState}
                    selected={(this.props[this.props.section] && this.props[this.props.section][social[2]]) ? "have" : this.state[`${this.props.section}Have${index}`]}
                    have={true}
                  />
                  {social[0]}
                  {this.state[`${this.props.section}Have${index}`] ===
                  "have" || (this.props[this.props.section] && this.props[this.props.section][social[2]]) ? (
                    <span className="nobreak">
                      :{" "}
                      {social[1] === "url" ? (
                        <Autocomplete
                          name={`${this.props.section}${index}`}
                          placeholder="(insert http URL*)"
                          saveData={this.saveState}
                          required={true}
                          val={this.props[this.props.section] ? this.props[this.props.section][social[2]] : this.state[`${this.props.section}${index}`]}
                          type="url"
                        />
                      ) : (
                        <Autocomplete
                          name={`${this.props.section}${index}`}
                          placeholder="(insert username*)"
                          saveData={this.saveState}
                          required={true}
                          username={true}
                          val={this.props[this.props.section] ? this.props[this.props.section][social[2]] : this.state[`${this.props.section}${index}`]}
                        />
                      )}
                      .
                    </span>
                  ) : (
                    <React.Fragment>.</React.Fragment>
                  )}
                </h3>
              );
            })}
            {this.props.section === "db" ? (
              <div>
                <h3>
                  I{" "}
                  <Select
                    items={["have", "do not have"]}
                    name={"haveFileUpload"}
                    saveData={this.saveState}
                    selected={this.state.haveFileUpload}
                    have={true}
                  />{" "}
                  other work I want to display.
                  <br />
                  {this.state.haveFileUpload === "have" ? (
                    <div className="upload flex-column">
                      {this.state.uploadedFile ? (
                        <button className="button">
                          Delete {this.state.files[0].name}
                        </button>
                      ) : (
                        <>
                          <input
                            id="fileInput"
                            type="file"
                            onChange={(e) => {
                              this.handleFiles(e.target.files);
                            }}
                            required
                          />
                          <label for="fileInput">Choose a file</label>
                        </>
                      )}

                      <div
                        className="subtitle"
                        id="file-error"
                        style={{ marginTop: "10px" }}
                      ></div>
                    </div>
                  ) : null}
                </h3>
              </div>
            ) : null}
            <div>
              <p>I have the following skills (optional):</p>
              <div className="skill-container">
                {this.props.skills.map((skill, index) => {
                  return (
                    <div
                      className="skill"
                      onClick={(e) =>
                        this.handleSkillClick(e, skill, "default")
                      }
                      key = {`${this.props.section}-skills-${index}`}
                      style={{ minWidth: this.state.width }}
                    >
                      <span className="skill-name">{skill}</span>
                      <span
                        className="minus"
                        onClick={(e) =>
                          this.handleSkillClick(e, skill, "minus")
                        }
                      >
                        -
                      </span>
                      <span className="skill-level">Skill Level</span>
                      <span
                        className="plus"
                        onClick={(e) => this.handleSkillClick(e, skill, "plus")}
                      >
                        +
                      </span>
                      <div
                        className="skill-bar"
                        style={{
                          width: this.props[this.props.section] && this.props[this.props.section].skills[skill]
                          ? `${
                            this.props[this.props.section].skills[skill] * 20
                          }%`
                          : `${
                            this.state[SKILLS][skill]
                              ? this.state[SKILLS][skill] * 20
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  );
                })}
                <div className="skill" id="hidden-skill-level">
                  Skill Level
                </div>
              </div>
            </div>

            <h3>
              I{" "}
              <Select
                items={["have", "have not"]}
                name={`${this.props.section}HaveAward`}
                saveData={this.saveState}
                selected={this.props[this.props.section] && this.props[this.props.section].awardContent ? "have" : this.props[this.props.section] ? "have not" : this.state[`${this.props.section}HaveAward`]}
                have={true}
              />
              won a relevant{" "}
              {this.state[`${this.props.section}HaveAward`] === "have" ? (
                <Select
                  items={[
                    "(insert category*)",
                    "competition",
                    "academic",
                    "other",
                  ]}
                  name={`${this.props.section}HaveAwardCategory`}
                  saveData={this.saveState}
                  selected={this.props[this.props.section] && this.props[this.props.section].awardCategories ? this.props[this.props.section].awardCategories[0] : this.state[`${this.props.section}HaveAwardCategory`]}
                  have={true}
                />
              ) : null}
              {this.state[`${this.props.section}HaveAward`] === "have" ? (
                <React.Fragment>
                  &nbsp;award:{" "}
                  <Autocomplete
                    name={`${this.props.section}HaveAwardContent`}
                    placeholder="(award name*)"
                    saveData={this.saveState}
                    val={this.props[this.props.section] && this.props[this.props.section].awardContent ? this.props[this.props.section].awardContent[0] : this.state[`${this.props.section}HaveAwardContent`]}
                    required={true}
                    maxLength="50"
                  />{" "}
                  from
                  <span className="nobreak">
                    <Autocomplete
                      name={`${this.props.section}HaveAwardProvider`}
                      placeholder="(award provider*)"
                      saveData={this.saveState}
                      val={this.props[this.props.section] && this.props[this.props.section].awardProviders ? this.props[this.props.section].awardProviders[0] : this.state[`${this.props.section}HaveAwardProvider`]}
                      required={true}
                      maxLength="50"
                    />
                    .
                  </span>
                </React.Fragment>
              ) : (
                <span className="nobreak">&nbsp;award.</span>
              )}
            </h3>

            {this.state[`${this.props.section}HaveAwardContent`] ? (
              <span
                className="optional-chunk"
                style={{
                  filter: this.state[`${this.props.section}HaveAward1`]
                    ? "opacity(1)"
                    : null,
                }}
              >
                <h3>
                  I{" "}
                  <Select
                    items={["have not", "have"]}
                    name={`${this.props.section}HaveAward1`}
                    saveData={this.saveState}
                    have={true}
                    selected={this.props[this.props.section] && this.props[this.props.section].awardContent && this.props[this.props.section].awardContent.length > 1 ? "have" : this.state[`${this.props.section}HaveAward1`]}
                  />
                  won another relevant{" "}
                  {this.state[`${this.props.section}HaveAward1`] === "have" ? (
                    <Select
                      items={[
                        "(insert category*)",
                        "competition",
                        "academic",
                        "other",
                      ]}
                      name={`${this.props.section}HaveAwardCategory1`}
                      saveData={this.saveState}
                      selected={this.props[this.props.section] && this.props[this.props.section].awardCategories && this.props[this.props.section].awardCategories.length > 1 ? this.props[this.props.section].awardCategories[1] : this.state[`${this.props.section}HaveAwardCategory1`]}
                      have={true}
                    />
                  ) : null}
                  {this.state[`${this.props.section}HaveAward1`] === "have" ? (
                    <React.Fragment>
                      &nbsp;award:{" "}
                      <Autocomplete
                        name={`${this.props.section}HaveAwardContent1`}
                        placeholder="(award name*)"
                        saveData={this.saveState}
                        val={this.props[this.props.section] && this.props[this.props.section].awardContent && this.props[this.props.section].awardContent.length > 1 ? this.props[this.props.section].awardContent[1] : this.state[`${this.props.section}HaveAwardContent1`]}
                        required={true}
                        maxLength="50"
                      />{" "}
                      from
                      <span className="nobreak">
                        <Autocomplete
                          name={`${this.props.section}HaveAwardProvider1`}
                          placeholder="(award provider*)"
                          saveData={this.saveState}
                          val={this.props[this.props.section] && this.props[this.props.section].awardProviders && this.props[this.props.section].awardProviders.length > 1 ? this.props[this.props.section].awardProviders[1] : this.state[`${this.props.section}HaveAwardProvider1`]}
                          required={true}
                          maxLength="50"
                        />
                        .
                      </span>
                    </React.Fragment>
                  ) : (
                    <span className="nobreak">&nbsp;award.</span>
                  )}
                </h3>
              </span>
            ) : null}

            {this.state[`${this.props.section}HaveAwardContent1`] ? (
              <span
                className="optional-chunk"
                style={{
                  filter: this.state[`${this.props.section}HaveAward1`]
                    ? "opacity(1)"
                    : null,
                }}
              >
                <h3>
                  I{" "}
                  <Select
                    items={["have not", "have"]}
                    name={`${this.props.section}HaveAward2`}
                    saveData={this.saveState}
                    selected={this.props[this.props.section] && this.props[this.props.section].awardContent && this.props[this.props.section].awardContent.length > 2 ? "have" : this.state[`${this.props.section}HaveAward2`]}
                    have={true}
                  />
                  won third relevant{" "}
                  {this.state[`${this.props.section}HaveAward2`] === "have" ? (
                    <Select
                      items={[
                        "(insert category*)",
                        "competition",
                        "academic",
                        "other",
                      ]}
                      name={`${this.props.section}HaveAwardCategory2`}
                      saveData={this.saveState}
                      selected={this.props[this.props.section] && this.props[this.props.section].awardCategories && this.props[this.props.section].awardCategories.length > 2 ? this.props[this.props.section].awardCategories[2] : this.state[`${this.props.section}HaveAwardCategory2`]}
                      have={true}
                    />
                  ) : null}
                  {this.state[`${this.props.section}HaveAward2`] === "have" ? (
                    <React.Fragment>
                      &nbsp;award:{" "}
                      <Autocomplete
                        name={`${this.props.section}HaveAwardContent2`}
                        placeholder="(award name*)"
                        saveData={this.saveState}
                        val={this.props[this.props.section] && this.props[this.props.section].awardContent && this.props[this.props.section].awardContent.length > 2 ? this.props[this.props.section].awardContent[2] : this.state[`${this.props.section}HaveAwardContent2`]}
                        required={true}
                        maxLength="50"
                      />{" "}
                      from
                      <span className="nobreak">
                        <Autocomplete
                          name={`${this.props.section}HaveAwardProvider2`}
                          placeholder="(award provider*)"
                          saveData={this.saveState}
                          val={this.props[this.props.section] && this.props[this.props.section].awardProviders && this.props[this.props.section].awardProviders.length > 2 ? this.props[this.props.section].awardProviders[2] : this.state[`${this.props.section}HaveAwardProvider2`]}
                          required={true}
                          maxLength="50"
                        />
                        .
                      </span>
                    </React.Fragment>
                  ) : (
                    <span className="nobreak">&nbsp;award.</span>
                  )}
                </h3>
              </span>
            ) : null}

            <div className="subtitle" style={{ marginTop: "30px" }}>
              Don't have any of the above? No worries! You can still join. Keep
              in mind that companies have all sorts of needs, so you don't need
              to have any one particular skill. For now, just tell us as much as
              you can about the skills you do have. In the near future, we'll
              release our 'site challenges' feature where you can complete
              simple challenges that we'll spotlight to showcase your skills to
              companies.
            </div>
            <button
              className="button"
              style={{
                marginTop: "75px",
                marginBottom: "50px",
                alignSelf: "flex-start",
              }}
              type="submit"
              disabled={
                this.state[`${this.props.section}0`] ||
                (this.state[`${this.props.section}HaveAwardCategory`] &&
                  this.state[`${this.props.section}HaveAwardContent`] &&
                  this.state[`${this.props.section}HaveAwardProvider`]) ||
                Object.keys(this.state.skills).length !== 0
                  ? false
                  : true
              }
            >
              {this.props[this.props.section] ? `Update my info for ${this.props.title}.` : `I'm done here! List me under ${this.props.title}.`}
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { firebase } = props;
  return {
    userUid: state.firebase.auth.uid,
    storage: firebase.storage(),
  };
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(StudentSkillsDropdown);
