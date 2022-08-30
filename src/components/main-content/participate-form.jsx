import React from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

class ParticipationForm extends React.Component {
  state = {
    name: "",
    selectedOption: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { errors, isValid } = this.validate();
    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.poll.id,
        name: this.state.name,
        selectedOption: this.state.selectedOption,
      });
      event.target.reset();
      this.setState({
        name: "",
        selectedOption: "",
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};

    if (!this.state.name) {
      errors.name = "Please Provides a name";
    } else if (this.state.name.length > 20) {
      errors.name = "Name Too Long";
    }

    if (!this.state.selectedOption) {
      errors.selectedOption = "Please Select one option";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <h4>Options</h4>
          <Button
            className="me-auto"
            color="warning"
            type="button"
            onClick={this.props.toggleModal}
          >
            Edit
          </Button>
          <Button
            className="me-2"
            color="warning"
            type="button"
            onClick={this.props.deletePoll(this.props.poll.id)}
          >
            Delete
          </Button>
        </div>
        {this.props.poll.options.map((opt) => (
          <FormGroup className="my-2" key={opt.id}>
            <Label className="d-flex">
              <Input
                type="radio"
                id={opt.id}
                name="selectOption"
                value={opt.id}
                onChange={this.handleChange}
                invalid={this.state.selectedOption ? true : false}
              />
              {opt.value}
              <span
                style={{
                  padding: "5px 20px",
                  background: "green",
                  color: "white",
                  borderRadius: "5px",
                }}
                className="me-auto"
              >
                {opt.vote}
              </span>
              <span
                style={{
                  padding: "5px 20px",
                  background: "orange",
                  color: "white",
                  borderRadius: "5px",
                }}
                className="me-2"
              >
                {this.props.poll.totalVote > 0
                  ? ((100 * opt.vote) / this.props.poll.totalVote).toFixed(2)
                  : 0}
                %
              </span>
            </Label>
          </FormGroup>
        ))}
        <FormGroup className="my-3">
          <Label>Enter Your Name</Label>
          <Input
            name="name"
            placeholder="Emad Uddin"
            value={this.state.value}
            onChange={this.handleChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && <FormFeedback>{this.state.errors.name}</FormFeedback>}
                    
        </FormGroup>
        <Button type="submit" color="primary">Submit Your Opinion</Button>
      </Form>
    );
  }
}


export default ParticipationForm;