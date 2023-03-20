import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Header from "./Header";

class InterviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interviewer: "",
      grade: "",
      interviewee: "",
      recruiter: "",
      project: "",
      position: "",
      date: "",
      photo: null,
      result: "",
      selectedProjectPositions: [],
      showModal: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fileInput = React.createRef();
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const projectPositions = [
      {
        project: "",
        positions: [""],
      },
      {
        project: "Airwave SP",
        positions: ["FSD", "React", "Node", "Testing / QA"],
      },
      {
        project: "XLPT",
        positions: ["FSD", "React", "Java", "Testing / QA"],
      },
      {
        project: "RTT",
        positions: ["FSD", "React", "Java", "Testing / QA"],
      },
      {
        project: "Airwave VMR",
        positions: ["FSD", "React", "Node", "Testing / QA"],
      },
      {
        project: "VSON",
        positions: ["FSD", "React", "Node", "Testing / QA"],
      },
      {
        project: "Delphi",
        positions: ["FSD", "React", "Java", "Testing / QA"],
      },
      {
        project: "Kirke",
        positions: ["FSD", "React", "Java", "Testing / QA"],
      },
      {
        project: "Data & AI",
        positions: ["FSD", "React", "Python", "Testing / QA"],
      },
    ];
    if (name === "project") {
      const projectPositionsObj = projectPositions.find(
        (obj) => obj.project === value
      );
      this.setState({
        [name]: value,
        selectedProjectPositions: projectPositionsObj.positions,
        position: "",
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  handleFileChange(event) {
    const target = event.target;
    const name = target.name;
    const file = target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (file && file.type.match("image.*")) {
        this.props.onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);

    this.setState({
      [name]: file,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("interviewer", this.state.interviewer);
    formData.append("grade", this.state.grade);
    formData.append("interviewee", this.state.interviewee);
    formData.append("recruiter", this.state.recruiter);
    formData.append("project", this.state.project);
    formData.append("position", this.state.position);
    formData.append("date", this.state.date);
    formData.append("photo", this.state.photo);
    formData.append("result", this.state.result);

    axios
      .post("http://localhost:4000/api/interviews", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      interviewer: "",
      grade: "",
      interviewee: "",
      recruiter: "",
      project: "",
      position: "",
      date: "",
      photo: null,
      result: "",
      showModal: true,
    });
    this.fileInput.current.value = null;
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <div class="container">
          <div class="col-sm-6" style={{ float: "none", margin: "auto" }}>
            <div class="card text-center">
              <div class="card-header">
                <h5 class="card-title">Interview</h5>
              </div>
              <div class="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Interviewer</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        class="form-control"
                        type="text"
                        name="interviewer"
                        value={this.state.interviewer}
                        onChange={this.handleInputChange}
                        required
                        oninvalid="ths.setCustomValidity('Enter User Name Here')"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Grade</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        class="form-select"
                        name="grade"
                        value={this.state.grade}
                        onChange={this.handleInputChange}
                        required
                      >
                        <option value="" selected=""></option>
                        <option value="1A">1A</option>
                        <option value="1B">1B</option>
                        <option value="2A">2A</option>
                        <option value="2B">2B</option>
                        <option value="3A">3A</option>
                        <option value="3B">3B</option>
                        <option value="4A">4A</option>
                        <option value="4B">4B</option>
                        <option value="5A">5A</option>
                        <option value="5B">5B</option>
                        <option value="6A">6A</option>
                        <option value="6B">6B</option>
                        <option value="7A">7A</option>
                        <option value="7B">7B</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Interviewee</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        class="form-control"
                        type="text"
                        name="interviewee"
                        value={this.state.interviewee}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Recruiter</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        class="form-control"
                        type="text"
                        name="recruiter"
                        value={this.state.recruiter}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Project</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        class="form-select"
                        name="project"
                        value={this.state.project}
                        onChange={this.handleInputChange}
                        required
                      >
                        <option value="" selected=""></option>
                        <option value="Airwave SP">Airwave SP</option>
                        <option value="XLPT">XLPT</option>
                        <option value="RTT">RTT</option>
                        <option value="Airwave VMR">Airwave VMR</option>
                        <option value="VSON">VSON</option>
                        <option value="Delphi">Delphi</option>
                        <option value="Kirke">Kirke</option>
                        <option value="Data & AI">Data & AI</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Position</label>
                    </div>
                    <div class="col-md-8">
                      <select
                        class="form-select"
                        name="position"
                        value={this.state.position}
                        onChange={this.handleInputChange}
                        required
                      >
                        <option value="" selected=""></option>
                        {this.state.selectedProjectPositions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Date</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        class="form-control"
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Photo</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        class="form-control"
                        type="file"
                        name="photo"
                        accept="image/*"
                        ref={this.fileInput}
                        onChange={this.handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-4">
                      <label class="col-form-label">Result</label>
                    </div>
                    <div class="col-md-8">
                      <textarea
                        class="form-control"
                        name="result"
                        value={this.state.result}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-12">
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <footer class="bg-dark text-center text-md-start">
          <div class="text-center p-3" style={{ color: "#ffffff" }}>
            &copy; 2023 Copyright:&nbsp;
            <span style={{ color: "orangered", "font-weight": "bold" }}>
              Incedo
            </span>
          </div>
        </footer>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Submission Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your form has been submitted successfully.</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.handleCloseModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default InterviewForm;
