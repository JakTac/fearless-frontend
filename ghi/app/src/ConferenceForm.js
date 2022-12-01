import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            max_presentations: '',
            max_attendees: '',
            locations: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleStartDateChange(event) {
        const value = event.target.value;
        this.setState({ starts: value })
    }

    handleEndDateChange(event) {
        const value = event.target.value;
        this.setState({ ends: value })
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({ description: value })
    }

    handleMaxPresentationsChange(event) {
        const value = event.target.value;
        this.setState({ max_presentations: value })
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({ max_attendees: value })
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({ location: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        delete data.locations
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            const cleared = {
                name: "",
                starts: "",
                ends: "",
                description: "",
                max_presentations: "",
                max_attendees: "",
                location: "",
            };
            this.setState(cleared)
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/'

        const response = await fetch(url);


        if (response.ok) {
            const data = await response.json();
            this.setState({ locations: data.locations });
        }
    }
    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={this.handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={this.state.name} className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleStartDateChange} placeholder="Start date" required type="date" name="start_date" id="start_date" value={this.state.starts} className="form-control" />
                            <label htmlFor="name">Start date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleEndDateChange} placeholder="End date" required type="date" name="end_date" id="end_date" value={this.state.ends} className="form-control" />
                            <label htmlFor="name">End date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleDescriptionChange} placeholder="Description" required type="text" name="description" id="description" value={this.state.description} className="form-control" />
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleMaxPresentationsChange} placeholder="Max presentations" required type="number" name="max_presentations" id="max_presentations" value={this.state.max_presentations} className="form-control" />
                            <label htmlFor="max_presentations">Max presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleMaxAttendeesChange} placeholder="Max attendees" required type="number" name="max_attendees" id="max_attendees" value={this.state.max_attendees} className="form-control" />
                            <label htmlFor="max_attendees">Max attendees</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleLocationChange} required name="Location" id="location" value={this.state.location} className="form-select">
                                <option value="">Choose a location</option>
                                {this.state.locations.map(location => {
                                    return (
                                        <option value={location.id} key={location.id}>
                                            {location.name}
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
        );
    }
}
export default ConferenceForm