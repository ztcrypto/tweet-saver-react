import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {Droppable} from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles';
import TweetWidget from './TweetWidget';

const useStyles = makeStyles({
  root: {
    height: 600,
    overflowY: 'scroll',
    border: '1px solid grey',
    borderRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 10
  },
  header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 30
  },
  input: {
      '& input': {
        paddingTop: 15,
        width: 250
      }
  }
});

export default function SearchBox(props) {
    const classes = useStyles(props);
    const [query, setQuery] = useState('');
    const [count, setCount] = useState(10);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }   
    const handleCountChange = (e) => {
        setCount(e.target.value);
    }

    const handleSearchClick = () => {
        if (!query || count <= 0) return;
        fetch(`/api/search?q=${query}&count=${count}`)
            .then((res) => res.json())
            .then(res => {
                props.updateItems(res);
            })
    }

  return (
    <Grid item xs={12} sm={6}>
        <div className={classes.header}>
            <TextField 
                placeholder="Search Tweet"
                value={query}
                onChange={handleInputChange}
                variant="filled"
                classes={{root: classes.input}}
                >
            </TextField>
            <Input placeholder="Query Count" value={count} onChange={handleCountChange} type="number"></Input>
            <Button variant="contained" color="primary" onClick={handleSearchClick}>
            Search
            </Button>
        </div>
        <Droppable droppableId="searchBox" index="1">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppbleProps}
                    className={classes.root}
                >
                    {props.searchItems.map((item, index) =>{
                        return (
                            <TweetWidget tweet={item} index={index} key={item.id_str} />
                        )}
                    )}
                    {provided.placeholder}
                </div>
            )
            }
        </Droppable>
    </Grid>
    );
}