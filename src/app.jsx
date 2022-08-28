import React from "react";
import {Container, Row, Col} from 'reactstrap'
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";



class App extends React.Component {
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
        )
    }
};

export default App;
