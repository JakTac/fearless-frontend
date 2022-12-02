import Nav from './Nav'
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm'
import AttendeeForm from './AttendeeForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,  
} from 'react-router-dom';

export default function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="">
            <Route path="" element={<MainPage />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="attendees">
            <Route path="new" element={<AttendeeForm />} />
            <Route path="" element={<AttendeesList attendees={props.attendees} />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}



