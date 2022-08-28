import React from "react";
import shortid from "shortid";
import { Container, Row, Col } from "reactstrap";
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";

import POLLS from "./data/polls";

class App extends React.Component {
  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: "",
  };

  componentDidMount() {
    this.setState({ polls: POLLS });
  }

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

  updatePoll = (updatedpoll) => {
    const polls = [...this.state.polls];
    const poll = polls.find((p) => p.id === updatedpoll.id);

    poll.title = updatedpoll.title;
    poll.description = updatedpoll.description;
    poll.options = updatedpoll.opinions;

    this.setState({ polls });
  };

  deletePoll = (pollId) => {
    const polls = this.state.polls.filter((p) => p.id !== pollId);
    this.setState({ polls, selectedPoll: {} });
  };

  selectPoll = pollId => {
    const poll = this.state.polls.find(p => p.id === pollId);
    this.setState({selectedPoll: poll});
  }

  render() {
    return (
      <Container className="my-5">
        <Row>
          <Col md={4}>
            <Sidebar />
          </Col>
          <Col md={8}>
            <MainContent />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
