import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";


const Search = ({word, setWord, handleSubmit}) => {
    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit} className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Row>
                        <Col xs={9}>
                            <Form.Control
                                placeholder="search"
                                type="text"
                                value={word}
                                onChange={(e) => setWord(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Form>
        </Container>
    );
};

export default Search;