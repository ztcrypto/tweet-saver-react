import React, {useState, useEffect} from 'react';
import './App.css';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


import {DragDropContext} from 'react-beautiful-dnd'

import SearchBox from './components/SearchBox';
import SavedBox from './components/SavedBox';

function App() {

  const [savedItems, setSavedItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    const tweets = localStorage.getItem('savedTweets');
    if (!tweets) return;
    setSavedItems(JSON.parse(tweets));
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('savedTweets', JSON.stringify(savedItems));
  // }, [savedItems])

  const handleDragEnd = (result) => {
    const {destination, source, draggableId} = result;
    if (!destination) return;
    let item = {}
    if (source.droppableId === 'savedBox') {
      item = savedItems.find((item) => item.id_str === draggableId);
      savedItems.splice(source.index, 1)
    }
    else {
      item = searchItems.find((item) => item.id_str === draggableId);
      searchItems.splice(source.index, 1)
    }

    if (!item) return;
    if (destination.droppableId === 'savedBox') {
      const index = savedItems.findIndex((item) => item.id_str === draggableId);
      if (index === -1) savedItems.splice(destination.index, 0, item);
      setSavedItems(savedItems);
    }
    else if (destination.droppableId === 'searchBox') {      
      const index = searchItems.findIndex((item) => item.id_str === draggableId);
      if (index === -1) searchItems.splice(destination.index, 0, item);
      setSearchItems(searchItems);
    }
    localStorage.setItem('savedTweets', JSON.stringify(savedItems));
  }

  const updateItems = (res) => {
    const data = res.statuses.map((item) => {
      const {id_str, text, user, created_at} = item;
      return {id_str, text, user, created_at}
    })
    setSearchItems(data)
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Twitter Saver: Drag tweets to save
        </Typography>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={10}>
            <SearchBox searchItems={searchItems} updateItems={updateItems}></SearchBox>
            <SavedBox savedItems={savedItems}></SavedBox>
          </Grid>
        </DragDropContext>
      </Box>
    </Container>
  );
}

export default App;
