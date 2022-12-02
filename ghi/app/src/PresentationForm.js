import React from "react";

class PresentationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      company_name: "",
      title: "",
      synopsis: "",
      conference: "",
      conferences: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
    this.handleConferenceChange = this.handleConferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.presenter_name = data.name;
    data.presenter_email = data.email;
    console.log(data);

    const presentationUrl = "http://localhost:8000/api/presentations/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(presentationUrl, fetchConfig);
    if (response.ok) {
      const newPresentation = await response.json();
      console.log(newPresentation);

      const cleared = {
        name: "",
        email: "",
        company_name: "",
        title: "",
        synopsis: "",
        conference: "",
      };
      this.setState(cleared);
    }
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleEmailChange(event) {
    const value = event.target.value;
    this.setState({ email: value });
  }

  handleCompanyNameChange(event) {
    const value = event.target.value;
    this.setState({ company_name: value });
  }

  handleTitleChange(event) {
    const value = event.target.value;
    this.setState({ title: value });
  }

  handleSynopsisChange(event) {
    const value = event.target.value;
    this.setState({ synopsis: value });
  }

  handleConferenceChange(event) {
    const value = event.target.value;
    this.setState({ conference: value });
  }

  async componentDidMount() {
    const url = "http://localhost:8000/api/conferences/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ conferences: data.conferences });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new presentation</h1>
              <form id="create-presentation-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    placeholder="Presenter Name"
                    required
                    type="text"
                    name="presenter_name"
                    id="presenter_name"
                    className="form-control"
                  />
                  <label htmlFor="presenter_name">Presenter Name</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="presenter_email" className="form-label">
                    Presenter Email
                  </label>
                  <input
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    type="presenter_email"
                    className="form-control"
                    name="presenter_email"
                    id="presenter_email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleCompanyNameChange}
                    value={this.state.company_name}
                    placeholder="Company name"
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="form-control"
                  />
                  <label htmlFor="company_name">Company Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleTitleChange}
                    value={this.state.title}
                    placeholder="Title"
                    required
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="synopsis" className="form-label">
                    Synopsis
                  </label>
                  <textarea
                    onChange={this.handleSynopsisChange}
                    value={this.state.synopsis}
                    className="form-control"
                    required
                    type="text"
                    name="synopsis"
                    id="synopsis"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <select
                    onChange={this.handleConferenceChange}
                    value={this.state.conference}
                    required
                    id="conference"
                    name="conference"
                    className="form-select"
                  >
                    <option value="">Choose a conference</option>
                    {this.state.conferences.map((conference) => {
                      return (
                        <option key={conference.id} value={conference.id}>
                          {conference.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PresentationForm;