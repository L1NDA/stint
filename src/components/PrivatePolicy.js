import React from 'react';
import Menu from './Menu.js'
import Footer from './Footer.js'
import './style/other.css'

class About extends React.Component {

  componentDidMount() {
    document.title = 'Private Policy | Stint';
  }

	render() {
		return (
      <div className="container">
        <Menu/>
        <div className="flex-column private-policy padding">
          <h3><b>Private Policy</b></h3>
          <div className="subtitle">Last updated: June 15, 2020</div>
          <br/><br/>

          Please read through this Privacy Policy carefully to understand how we use your Personal Information. By accessing or using this site, you agree to the collection, use, and disclosure of your information in regards to this Privacy Policy. We will not use or share your information with anyone except as described in this Privacy Policy. The Personal Information that we collect is used for providing our service and making continuous improvements to optimize your experience and use of this site.
          <br/><br/>

          From time to time, we may make changes to this Privacy Policy. Any changes made will be effective as of the “Last updated” date, so please check this Privacy Policy periodically for any updates.
          <br/><br/>

          <b>Summary</b>
          <br/>
          At Stint, fostering your trust in us is top priority. We care about your privacy and do our best to protect it. We do not sell or rent your Personal Information to third party companies without your knowledge or explicit consent. We do not disclose your Personal Information for any purposes aside from enabling basic site functionality, improving our site performance, and allowing you to make purchases on our platform using third party secure payment services.
          <br/><br/>

          We will not share information you have provided us during registration processes except as described in this Privacy Policy. However, information that you choose to publish or make public on our site (i.e. photos, reviews, comments, text, music, videos, creative work) is no longer private, just like any information you make public online.
          <br/><br/>

          Technical information, collected by us or third party companies, may be used automatically for purposes of operation, analytics, and enhancement of your user experience. We will not disclose your information to third party companies for marketing or promotional purposes or allow third party companies to contact you with the Personal Information you provide us. However, in accordance with local law, we may use your Personal Information to contact you – in order to inform you about site activity, offer you site opportunities, or make general update announcements.
          <br/><br/>

          As this section only provides a brief summary of our Privacy Policy, we encourage you to read through the Privacy Policy in its entirety to better understand what information we collect from you, how we collect it, how we use it, and how we try our best to protect your privacy.
          <br/><br/>

          If at any point you have questions regarding your privacy on Stint or this Privacy Policy, please do not hesitate to contact us at wearestint@gmail.com.
          <br/><br/>

          <b>Information Collection and Use</b>
          <br/>
          To ensure a better experience on our site, we may require you to provide us with Personally Identifiable Information, including but not limited to First Name, Last Name, Age, City/Country of Residence, School, Email, etc. We collect this information during account registration and other site registration processes solely for the purpose of enabling your use of our service. This information will only be disclosed on our platform in the form of your Account Profile, which makes it possible for you to use the services on our site. We do not use this information for marketing purposes without your explicit consent. The information that we request from you will be retained by us and used as described in this Privacy Policy.
          <br/><br/>

          We do use third party services that may also collect information in order to identify you. Below are links to the privacy policies of third party service providers used on this site.
          <br/><br/>
          <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" style={{color: "#8F8DFF", alignSelf: "flex-start"}}><b>LinkedIn</b></a>
          <a href="https://firebase.google.com/policies/analytics" target="_blank" style={{color: "#8F8DFF", alignSelf: "flex-start"}}><b>Firebase Analytics</b></a>
          <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" style={{color: "#8F8DFF", alignSelf: "flex-start"}}><b>Google API Services</b></a>
          <a href="https://www.paypal.com/va/webapps/mpp/ua/privacy-full" target="_blank" style={{color: "#8F8DFF", alignSelf: "flex-start"}}><b>PayPal</b></a>
          <br/>

          <b>Third Parties</b>
          <br/>
          We do not sell or distribute your Personal Information to third parties for their marketing purposes without your explicit consent.
          <br/><br/>
          We provide your Personal Information to third parties only so that we can operate our site and make it possible for you to use our service. For instance, for the purposes of creating an account for you and enabling secure payment transactions during purchases on our site, we will provide your Personal Information to third parties.
          <br/><br/>
          Please note, your profile information as well as information regarding your activity on the site is made public and is visible to all users on the site. When you publish or share your information on the site or with other Stint users, while we strive to protect your privacy, we cannot guarantee that other users will do the same.
          <br/><br/>

          <b>Cookies</b>
          <br/>
          When you visit our site, we use industry-wide technologies such as “cookies” to better your overall experience. Cookies are small data files sent from a web server to your browser and stored on your computer or device whenever you visit a website. They contain unique anonymous identifiers that allow us to track Non-personal Information such as the type of browser you use, the site you came from, the device you used to access our service, the date and time of access, and other information that does not personally identify you. By continuing to use our site, you are agreeing to let us place cookies on your computer in accordance with our Privacy Policy.
          <br/><br/>

          The cookies we use are either to ensure basic site functionality and operation, personalize your user experience (for instance – providing content based on your location), or analyze user behavior for the purpose of improving our site performance. For instance, we may use cookies to inform us of which pages on our site are most frequented by users. All of the Non-personal Information collected with cookies is used to help us improve the site for your better experience.
          <br/><br/>

          Currently, all of the cookies we use on our site are managed by third parties, such as Google Analytics. Please refer to the third parties’ privacy policies for further information regarding their own use of cookies.
          <br/><br/>

          <b>Children</b>
          <br/>
          The use of our site is not intended for children under the age of 13. Children under the age of 13 should never provide Personal Information on our site for any reason. We do not knowingly collect Personal Information from children under the age of 13. In the case we learn that a child under the age of 13 has provided Personal Information on our site, we will immediately delete that information. Parents and guardians should monitor children’s online activities at all times. If you are a parent or guardian who believes that we may have any information regarding a child under 13, please contact us so we can take the necessary actions.
          <br/><br/>

          <b>Security</b>
          <br/>
          At Stint, we put great effort into maintaining the security of our site and the privacy of your information. Our internal procedures are developed carefully so as to prevent unauthorized access, alteration, or damage to your Personal Information. Nevertheless, please remember that the transmission of information and data via the internet is not completely secure, and although we will always do our best to ensure that your privacy is protected, we cannot absolutely guarantee the security of any information you transmit on or through our site. Thus, any transmission is done at your own risk. Once we receive your data, we will adhere to strict internal procedures to keep your information safe and secure to the best of our ability.

          </div>

        <Footer/>
      </div>
		)
	}
}

export default About;
