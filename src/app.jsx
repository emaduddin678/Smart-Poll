import React from "react";
import shortid from "shortid";
import { Container, Row, Col } from "reactstrap";
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";

import POLLS from "./data/polls";

class App extends React.Component {
  state = {
    polls: POLLS,
    selectedPoll: {},
    searchTerm: "",
  };

  // componentDidMount() {
  //   this.setState({ polls: POLLS });
  // }

  addNewPoll = (poll) => {
    poll.id = shortid.generate();
    poll.created = new Date();
    poll.totalVote = 0;
    poll.opinions = [];

    this.setState({
      // polls: [...this.state.polls, poll],
      polls: this.state.polls.concat(poll),
    });


    
  };

  updatePoll = (updatedPoll) => {
    const polls = [...this.state.polls];
    const poll = polls.find((p) => p.id === updatedPoll.id);

    poll.title = updatedPoll.title;
    poll.description = updatedPoll.description;
    poll.options = updatedPoll.opinions;

    this.setState({ polls });
  };

  deletePoll = (pollId) => {
    const polls = this.state.polls.filter((p) => p.id !== pollId);
    // console.log(this.state.selectedPoll);
    // console.log(pollId);
    this.setState({ polls, selectedPoll: {} });
    // console.log(this.state.selectedPoll);
  };

  selectPoll = (pollId) => {
    const poll = this.state.polls.find(p => p.id === pollId);
    // console.log(poll);
    // console.log(pollId);
    // console.log(this.state.selectedPoll);

    this.setState({ selectedPoll: poll });
    // console.log(this.state.selectedPoll);
  };

  getOpinion = (response) => {
    const { polls } = this.state;
    const poll = polls.find((p) => p.id === response.pollId);
    const option = poll.opinions.find((o) => o.id === response.selectedOption);

    poll.totalVote++;
    option.vote++;
    const opinion = {
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption,
    };

    poll.opinions.push(opinion);
    this.setState({ polls: polls });
  };
  
  handleSearch = (searchTerm) => {};

  render() {
    return (
      <Container className="my-5">
        <Row>
          <Col md={5}>
            <Sidebar
              polls={this.state.polls}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
              selectPoll={this.selectPoll}
              addNewPoll={this.addNewPoll}
            />
          </Col>
          <Col md={6}>
            <MainContent
              poll={this.state.selectedPoll}
              getOpinion={this.getOpinion}
              updatePoll={this.updatePoll}
              deletePoll={this.deletePoll}
            />
          </Col>
        </Row>
        <p> {console.log(this.state.polls.length)}</p>
      </Container>
    );
  }
}

export default App;
