import React, { Component } from 'react';
import SearchAPI from '../api/APIhelper';
import { Button, ButtonGroup } from 'reactstrap';
import '../styles/Main.css';
import leetmommy from '../styles/lm-large.png';

const COHORTS = ['r11', 'r12', 'r13'];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWords: "",
      cohortSelection: "r11",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // When this page loads, ping the server to wake up heroku.
    SearchAPI.ping();
  }

  async handleSubmit(evt) {
    evt.preventDefault();

    // Prepare the search word and cohort to send to the API
    const { searchWords, cohortSelection } = this.state;
    const words = searchWords.split(' ');

    const links = await SearchAPI.indexSearch(words, cohortSelection);
    // To do, use these links to render some component? Maybe push onto another Route?
    console.log(links);
    
    // Reseet the 
    this.setState({
      ...this.state,
      searchWords: "",
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  onRadioClick(cohort) {
    this.setState({
      cohortSelection: cohort
    });
  }

  render() {
    return (
      <div className="Main-Container" >

        <div>
          <img
            className="Logo"
            src={leetmommy}
            alt="logo" />
        </div>

        <form
          className="Search-Form"
          onSubmit={this.handleSubmit}>

          <section id="Search-Section">
            <label htmlFor="searchWords">
              <i className="fa fa-search" aria-hidden="true"></i>
            </label>

            <input
              className="Search-Bar"
              name="searchWords"
              onChange={this.handleChange}
              value={this.state.searchWords}
              autoComplete="off"
              tabIndex={1}
            >
            </input>
          </section>
          
          <button style={{ display: "none"}} type="submit"> Search! </button>

          <ButtonGroup>
            {COHORTS.map(cohort => (
              <Button
                key={cohort}
                color="primary"
                onClick={() => this.onRadioClick(cohort)}
                active={this.state.cohortSelected === cohort}
              >
                {cohort}
              </Button>
            )
            )}
          </ButtonGroup>

        </form>
      </div>
    )
  }
}

export default Main;
