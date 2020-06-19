import React from "react";
import Select from "./Select.js";
import StudentSkillsDropdown from "./StudentSkillsDropdown.js";

const DATA_SKILLS = [
  "Python",
  "R",
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
  "Digital Media",
  "Adobe Premiere Pro",
  "iMovie",
  "Final Cut Pro",
  "Adobe After Effects",
  "Adobe Lightroom",
];
const DESIGN_SKILLS = [
  "UI Design",
  "UX Design",
  "Prototyping",
  "Hi-fi Markups",
  "Lo-fi Markups",
  "Wireframes",
  "Sketch",
  "Figma",
  "Photoshop",
  "Illustrator",
];
const SOFTWARE_SKILLS = [
  "Java",
  "Python",
  "C/C++",
  "JavaScript",
  "HTML/CSS",
  "Go/Clojure/Erlang",
  "Flask",
  "Node.js/Express",
  "React",
  "SQL",
  "NoSQL",
  "iOS/Swift",
  "Android",
  "Distributed Systems",
];

class StudentSkills extends React.Component {
  constructor() {
    super();
  }

  handleChange = (stateName, content, index = null) => {
    this.props.saveToParent(stateName, content, index);
  };

  render() {
    return (
      <form className="student-dialogue" autocomplete="off">
        <StudentSkillsDropdown
          title="Data Analytics"
          subtitle="Given messy data scraped from a webpage, you can clean it up nicely and identify customer profiles or pinpoint key trends."
          section="da"
          content={["a personal website"]}
        />

        <div className="hline"></div>

        <StudentSkillsDropdown
          title="Design & Branding"
          subtitle="You’re experienced in designing logos, web pages, icons, or building up a specific brand image."
          section="db"
          content={["a portfolio or personal website"]}
        />

        <div className="hline"></div>

        <StudentSkillsDropdown
          title="Content Creation & Management"
          subtitle="You’re a content creator. Blogging, photography, illustration, upping your Instagram follower game – you know how it’s done."
          section="ccm"
          content={[
            "a Medium account",
            "an Instagram",
            "a Youtube account",
            "a portfolio or personal website",
          ]}
        />

        <div className="hline"></div>

        <StudentSkillsDropdown
          title="Software Development"
          subtitle="You can pull a few programming languages out of your toolbox and use them for front-end or back-end work."
          section="sd"
          content={["a Github profile", "a personal website"]}
        />
      </form>
    );
  }
}

export default StudentSkills;
