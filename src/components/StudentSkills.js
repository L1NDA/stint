import React from "react";
import Select from "./Select.js";
import StudentSkillsDropdown from "./StudentSkillsDropdown.js";

const DATA_SKILLS = [
  "Python",
  "R",
  "Stata",
  "SQL",
  "NoSQL",
  "pandas",
  "Beautiful Soup",
  "scikit-learn",
  "TensorFlow",
  "Keras",
  "PyTorch",
];
const CONTENT_SKILLS = [
  "Blogging",
  "Content Strategy",
  "Digital Marketing",
  "Premiere Pro",
  "iMovie",
  "Final Cut Pro",
  "After Effects",
  "Lightroom",
];
const DESIGN_SKILLS = [
  "UI Design",
  "UX Design",
  "Prototyping",
  "Hi-fi Mockups",
  "Lo-fi Mockups",
  "Wireframes",
  "Sketch",
  "Figma",
  "Photoshop",
  "Illustrator",
  "Animation",
  "Digital Illustration",
  "Physical Illustration",
];
const SOFTWARE_SKILLS = [
  "Java",
  "Python",
  "C or C++",
  "JavaScript",
  "HTML and CSS",
  "Go",
  "Clojure",
  "Erlang",
  "Flask",
  "Node",
  "Express",
  "React",
  "SQL",
  "NoSQL",
  "iOS",
  "Android",
  "Distributed Systems",
];

class StudentSkills extends React.Component {
  constructor() {
    super();
  }

  saveEntireState = (section, state) => {
    this.props.saveToParent(section, state);
  };

  render() {
    return (
      <div className="student-dialogue" autocomplete="off">
        <StudentSkillsDropdown
          title="Data Analytics"
          subtitle="Given messy data scraped from a webpage, you can clean it up nicely and identify customer profiles or pinpoint key trends."
          section="da"
          da={this.props.da}
          content={[
            ["a GitHub profile", "user", "githubUser"],
            ["a personal website", "url", "personalWebsiteUrl"],
          ]}
          skills={DATA_SKILLS}
          handleButton={this.saveEntireState}
        />

        <div className="hline"></div>

        <StudentSkillsDropdown
          title="Design & Branding"
          subtitle="You’re experienced in designing logos, web pages, illustrations, or building up a specific brand image."
          section="db"
          db={this.props.db}
          content={[
            ["a portfolio or personal website", "url", "personalWebsiteUrl"],
          ]}
          skills={DESIGN_SKILLS}
          handleButton={this.saveEntireState}
        />

        <div className="hline"></div>

        <StudentSkillsDropdown
          title="Content Creation & Management"
          subtitle="You’re a content creator. Blogging, photography, videography, upping your Instagram follower game – you know how it’s done."
          section="ccm"
          ccm={this.props.ccm}
          content={[
            ["a Medium account", "user", "mediumUser"],
            ["an Instagram", "user", "instagramUser"],
            ["a Youtube account", "user", "youtubeUser"],
            ["a portfolio or personal website", "url", "personalWebsiteUrl"],
          ]}
          skills={CONTENT_SKILLS}
          handleButton={this.saveEntireState}
        />

        <div className="hline"></div>

        <StudentSkillsDropdown
          title="Software Development"
          subtitle="You can pull a few programming languages out of your toolbox and use them for front-end or back-end work."
          section="sd"
          sd={this.props.sd}
          content={[
            ["a GitHub profile", "user", "githubUser"],
            ["a personal website", "url", "personalWebsiteUrl"],
          ]}
          skills={SOFTWARE_SKILLS}
          handleButton={this.saveEntireState}
        />
      </div>
    );
  }
}

export default StudentSkills;
