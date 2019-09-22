import React, { Component } from 'react';
import SearchAPI from '../api/APIhelper';
import { Button, ButtonGroup } from 'reactstrap';
import '../styles/Main.css';

const COHORTS = ['r11', 'r12', 'r13'];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWords: "",
      cohortSelection: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    SearchAPI.ping();
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { searchWords, cohortSelection } = this.state;
    const words = searchWords.split(' ');

    const links = await SearchAPI.indexSearch(words, cohortSelection);
    console.log(links);
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
      <div>
        <div className="Logo">
          Leet Mommy Logo here
        </div>

        <form onSubmit={this.handleSubmit}>
          
          <input
            name="searchWords"
            onChange={this.handleChange}
            value={this.state.searchWords}
          >
          </input>
          <button> Search </button>

            <ButtonGroup>
              {COHORTS.map(cohort => (
                <Button
                  key={cohort}
                  color="primary"
                  onClick={() => this.onRadioClick(cohort)}
                  active={this.state.rSelected === cohort}
                >
                  {cohort}
                </Button>
              )
              )}
            </ButtonGroup>
s
        </form>
      </div>
    )
  }
}

export default Main;
