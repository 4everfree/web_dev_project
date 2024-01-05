import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Header from './components/Header';
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import {Container, Row, Col} from 'react-bootstrap';
import React from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

const App = () => {
    const [word, setWord] = useState('');
    const [images, setImages] = useState([]);

    ;

    useEffect(()=> {
            async function getSavedImages() {
                const res = await axios.get(`${API_URL}/images`);
                setImages(res.data || []);
            }
            getSavedImages();
        }
        , []);

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

    const handleDeleteImage = async (id) => {
        try {
            const res = await axios.delete(`${API_URL}/images/${id}`);
            if (res.data?.deleted_id) {
                setImages(images.filter((image) => image.id !== id));
            }    
        } catch (error) {
            console.log(error)
        }
    };

    const handleSaveImage = async (id) => {
        const imageToBeSaved = images.find((image) => image.id === id);
        imageToBeSaved.saved = true; 
        
        try {
            const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
            if ( res.data?.inserted_id) {
                setImages(images.map((image) => image.id === id ? {...image, saved: true} : image));
            } 
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <Header title={"Images gallery"}/>
            <Search word={word} setWord={setWord} handeSubmit={handeSearchSubmit}/>
            <Container className="mt-4">
                <Row xs={1} md={2} lg={3}>
                    {images.map((image, i) => (
                        <Col key={i} className="pb-3">
                            <ImageCard 
                                saveImage={handleSaveImage} 
                                deleteImage={handleDeleteImage} 
                                image={image}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default App;
