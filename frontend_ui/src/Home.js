import React, { Component } from "react";
import Header from "./Header";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <div>
          <center>
            <h3 style={{ color: "green" }}>Project Statement</h3>
          </center>
        </div>
        <div class="container" style={{ borderLeft: "6px solid orangered" }}>
          <h4>
            Create an app that collects information from Incedo panel members
            who take interviews like interviewer, their grade, interviewee,
            recruiter, project, position or job code, date, photo, result, etc.
            All details must be stored in DB and sent out as a report to
            specific mail id on a daily basis.
          </h4>
        </div>
      </div>
    );
  }
}
export default Home;
