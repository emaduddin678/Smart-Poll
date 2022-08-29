import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const PollList = (props) => {
  if (props.polls.length === 0) {
    return <p>There is no poll</p>;
  }

  return (
    <ListGroup>
      {props.polls.map((poll) => (
        <ListGroupItem
          key={poll.id}
          onClick={() => props.selectPoll(poll.id)} 
          style={{cursor: 'pointer'}}
        ></ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default PollList;
