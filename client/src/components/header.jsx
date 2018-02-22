import React from 'react';
import { connect } from "react-redux";
import mammoth from 'mammoth';

import {submitResume} from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openResume: false};
    this.resumeText;
    this.resumeHTML;
  }

  renderContent(){
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="inner-navigation-div">
            <h1 className="logo">𝓡</h1>
            <h1 className="landing-header">Recruited</h1>
            <a className="button-login-google-fake" href="/auth/google">Login With Google</a>
          </div>
        );
      default:
        return (
        <div className="logged-in-inner-navigation-div">
          <h1 className="logged-in-logo">𝓡</h1>
          <h1 className="logged-in-landing-header">Recruited</h1>
          <div>{this.renderResumeModal()}</div>
          <span className="span-logged-in">
            <a className="button-logged-in-google-real" href="/api/logout">Logout</a>
            <button className="resume-button" onClick={()=> this.setState({openResume: true})}>
              Upload Resume
            </button>
          </span>
        </div>
      );
    }
  }

  closeResumeModal(e) { //close modal when clicking outside
    if (e.target === document.getElementsByClassName('modal-screen')[0]) {
      this.setState({openResume: false});
    }
  }

  renderResumeModal() {
    if (!this.state.openResume) return (<div></div>);
    return (
      <div onClick={(e)=> this.closeResumeModal(e)}
        className="modal-screen">
        <form className="resume-form">
          <img onClick={()=> this.setState({openResume: false})}
            className="close-button"
            src="https://www.materialui.co/materialIcons/navigation/close_grey_192x192.png">
          </img>
          <div>Upload your resume (.doc, .docx)</div>
            <input onChange={() => this.handleFile()} id="resume-input" type="file"/>
          <input onClick={() => this.submitFile()}
            type="submit" value="Submit" />
          <div id="file-review">File Review</div>
        </form>
      </div>
    );
  }

  submitFile() {
    console.log("submitting");
    this.props.submitResume({
      resumeText: this.resumeText,
      resumeHTML: this.resumeHTML
    });
  }

  handleFile() {
    const resume = document.getElementById('resume-input').files[0];
    const review = document.getElementById('file-review');

    if (resume) {
      let reader = new FileReader();
      reader.onload = (e) => {  // initialize event on reader
        // save result into arrayBuffer
        const arrayBuffer = e.target.result;
        // Using mammoth to convert arrayBuffer into Raw Text
        mammoth.extractRawText({
          arrayBuffer: arrayBuffer
        }).then((result) => {this.resumeText = result.value;});
        // Using mammoth to convert arrayBuffer into inner HTML
        mammoth.convertToHtml({
          arrayBuffer: arrayBuffer
        }).then((result) => {review.innerHTML = result.value;});
      };
      reader.readAsArrayBuffer(resume);  // start reading
      // should call action to save variable to database
    }
  }

  render() {
    return (
      <div className="outer-navigation-div">
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return {
    submitResume: (values) => dispatch(submitResume(values))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
