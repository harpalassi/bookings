import React, { Component } from 'react';
import Button from './Button';
import Modal from 'react-modal';
import API from '../utils/API';
import TableContainer from './TableContainer';

class Heading extends Component {
  // State holds data for form, GET request result, and modal.
  state = {
    result: [],
    showModal: false,
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    bookingType: 'Dog Walk',
    date: '',
    time: ''
  };

  // When component mounts, grab all current booking information from database.
  componentDidMount() {
    Modal.setAppElement('body');
    this.getAllBookings();
  }

  // Function to grab booking detail objects and set it in state as an array.
  getAllBookings = () => {
    API.getBookings()
      .then(res =>
        this.setState({
          result: res.data
        })
      )
      .catch(err => console.log(err));
  };

  // Modal handling functions
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  // Handle input change from form values
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    //Combine address variables into one variable
    let address = `${this.state.street} ${this.state.city}, ${this.state.state.toUpperCase()}, ${
      this.state.zipcode
    }`;
    // Save form data as a JSON object and send it as a POST request to the database.
    API.createBooking({
      name: this.state.name,
      email: this.state.email,
      address: address,
      appt_type: this.state.bookingType,
      appt_date: this.state.date,
      appt_time: this.state.time
    })
      // Close modal, grab all latest bookings and clear the form state.
      .then(this.handleCloseModal)
      .then(this.getAllBookings)
      .then(
        this.setState({
          name: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zipcode: '',
          bookingType: 'Dog Walk',
          date: '',
          time: ''
        })
      );
  };

  // Return heading, modal, and form and pass in result props to child component, TableContainer.
  render() {
    return (
      <div>
        <div className="heading">
          <div>Bookings</div>
          <Button showmodal={this.handleOpenModal} />
          <Modal className="modal" isOpen={this.state.showModal}>
            <h2>Create booking</h2>
            <form onSubmit={this.handleFormSubmit}>
              <div className="row">
                <div className="column">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    name="name"
                    value={this.state.name}
                    className="name"
                    required
                  />
                </div>
                <div className="column">
                  <label htmlFor="bookingType">Booking type</label>
                  <select
                    name="bookingType"
                    value={this.state.bookingType}
                    onChange={this.handleInputChange}>
                    <option value="Dog Walk">Dog Walk</option>
                    <option value="Housekeeping">Housekeeping</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    onChange={this.handleInputChange}
                    name="email"
                    value={this.state.email}
                    required
                  />
                </div>
                <div className="column">
                  <label htmlFor="date">Booking Date</label>
                  <input
                    type="date"
                    onChange={this.handleInputChange}
                    name="date"
                    value={this.state.date}
                    className="date"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <label htmlFor="address">Street Address</label>
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    name="street"
                    value={this.state.street}
                    required
                  />
                </div>
                <div className="column">
                  <label htmlFor="date">Booking Time</label>
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    name="time"
                    value={this.state.time}
                    required
                  />
                </div>
              </div>
              <div className="column">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="city"
                  value={this.state.city}
                  className="city"
                  required
                />
              </div>
              <div className="stateZip">
                <div className="row">
                  <div className="column">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      onChange={this.handleInputChange}
                      name="state"
                      value={this.state.state}
                      className="state"
                      required
                    />
                  </div>
                  <div className="column">
                    <label className="zipcode" htmlFor="zipcode">
                      Zip code
                    </label>
                    <input
                      type="text"
                      onChange={this.handleInputChange}
                      name="zipcode"
                      value={this.state.zipcode}
                      className="zipcode"
                      required
                    />
                  </div>
                </div>
              </div>
              <button className="btn modalbtn" type="submit" value="Create booking">
                Create booking
              </button>
            </form>
            <button className="closebtn" onClick={this.handleCloseModal}>
              X
            </button>
          </Modal>
        </div>
        <TableContainer result={this.state.result} />
      </div>
    );
  }
}

export default Heading;
