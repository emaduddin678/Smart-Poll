import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
// import ParticipationForm from "./participate-form";
import PollForm from "../poll-form";
import ParticipationForm from "./participate-form";



class MainContent extends React.Component {
  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };
  
  render() {
    const { poll, getOpinion, updatePoll, deletePoll } = this.props;
    
    if (Object.keys(poll).length === 0) {
      return (
        <div>
          <h3>Welcome to My Application</h3>
          <p>
            You can create as many poll as you want. Click the new button to
            create a new poll. To check details of a poll please select from the
            left sidebar. By selecting a poll you can check it's details ,
            participate and check others opinion about this poll.
          </p>
        </div>
      );
    }
    return (
      <div>
        <h3>{poll.title}</h3>
        <p>{poll.description}</p>
        <br />
        <ParticipationForm
          poll={poll}
          getOpinion={getOpinion}
          toggleModal={this.toggleModal}
          deletePoll={deletePoll}
        /> 




        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>Update Poll</ModalHeader>
          <ModalBody>
            <PollForm
              poll={poll}
              isUpdate={true}
              submit={updatePoll}
              buttonValue="Update Poll"
            />
          </ModalBody>
        </Modal>




        {/* <h1>Hello World!</h1>
        <p>{Object.keys(poll).length > 0 ? "true" : "false"}</p> */}
      </div>
    );
      
      
    //   return (
    //   <div>
    //     {/* {console.log(poll.length)} */}
    //     <h3>{poll.title}</h3>
    //     <p>{poll.description}</p>
    //     <br />
    //     <ParticipationForm
    //       poll={poll}
    //       getOpinion={getOpinion}
    //       toggleModal={this.toggleModal}
    //       deletePoll={deletePoll}
    //     />
    //     <Modal
    //       isOpen={this.state.openModal}
    //       toggle={this.toggleModal}
    //       unmountOnClose={true}
    //     >
    //       <ModalHeader toggle={this.toggleModal}>Update Modal</ModalHeader>
    //       <ModalBody>
    //         <PollForm
    //           poll={poll}
    //           isUpdate={true}
    //           submit={updatePoll}
    //           buttonValue="Update Poll"
    //         />
    //       </ModalBody>
    //     </Modal>
    //   </div>
    // );
  }
}

export default MainContent;
