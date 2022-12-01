import Nav from './Nav'
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm'
import AttendeeForm from './AttendeeForm';
import React from 'react';


export default function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <Nav />
      <div className="container">
        {/* <LocationForm /> */}
        {/* { <ConferenceForm />} */}
        {/* <AttendeesList attendees={props.attendees} /> */}
        { <AttendeeForm />}
      </div>
    </>
  );
}



