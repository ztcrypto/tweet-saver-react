import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
      marginBottom: 30
  }
});

// fetch('/api/search', { q: 'banana since:2011-07-11', count: 100 })
//   .then((res) => res.json())
//   .then(res => {
//     console.log(res)
//   })

export default function SavedBox(props) {
    const classes = useStyles(props);

    return (
        <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h6" gutterBottom className={classes.header}>
                Saved Tweets
            </Typography>
            <Droppable droppableId="savedBox" index="2">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppbleProps}
                        className={classes.root}
                    >
                        {props.savedItems.map((item, index) =>{
                            if (!item) return
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
