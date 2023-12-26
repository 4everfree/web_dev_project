import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useState} from 'react';
import Header from './components/Header';
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import {Container, Row, Col} from 'react-bootstrap';
import React from 'react'

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

const App = () => {
    const [word, setWord] = useState('');
    const [images, setImages] = useState([]);

    const handeSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${API_URL}/new-image?query=${word}`);
            setImages([{...res.data, title: word}, ...images]);
        } catch (error) {
            console.log(error)
        }

        setWord('')
    }

    const handleDeleteImage = (id) => {
        setImages(images.filter((image) => image.id !== id));
    };

    return (
        <div className="App">
            <Header title={"Images gallery"}/>
            <Search word={word} setWord={setWord} handeSubmit={handeSearchSubmit}/>
            <Container className="mt-4">
                <Row xs={1} md={2} lg={3}>
                    {images.map((image, i) => (
                        <Col key={i} className="pb-3">
                            <ImageCard deleteImage={handleDeleteImage} image={image}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default App;
