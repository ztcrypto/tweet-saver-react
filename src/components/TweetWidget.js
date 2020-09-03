import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Draggable} from 'react-beautiful-dnd'

const useStyles = makeStyles({
  root: {
    padding: 10,
    border: '1px solid lightgrey',
    borderRadius: 5,
    margin: 5,
    background: 'lightgrey'
  },
  header: {
      display: 'flex',
      '& img': {
          borderRadius: 999
      }
  },
  username: {
      display: 'flex',
      flexDirection: 'column',
      '& p': {
          margin: 5,
          fontSize: 15
      },
      '& p:last-child': {
          color: 'blue'
      }
  }
});

export default function TweetWidget({tweet, index}) {
    const classes = useStyles();
    return (
        <Draggable draggableId={tweet.id_str} index={index}>
            {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <div className={classes.root}>
                    <div className={classes.header}>
                        <img src={tweet.user.profile_image_url} width="60" height="60"></img>
                        <div className={classes.username}>
                            <p>{tweet.user.name}</p>
                            <p>@{tweet.user.screen_name}</p>
                        </div>
                    </div>
                    <p>{tweet.text}</p>
                    <p>{tweet.created_at}</p>
                </div>
            </div>
            )}
        </Draggable>
    );
}