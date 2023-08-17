import React from 'react'
import {Card,
    CardActions,
    CardContent,
    Button,
    Typography} from '@mui/material';
import { Link } from 'react-router-dom';



const MovieItems = ({title,releaseDate,posterUrl,id}) => {
  return (
    <Card sx={{margin:2, width:240,height:320, borderRadius:5, 
    "hover":{boxShadow:"10px 10px 20px #ccc"} }}>
    <img height={'40%'} width='100%'
     src={posterUrl} alt={title} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       {new Date(releaseDate).toDateString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant='contained' LinkComponent={Link} to={`/booking/${id}`}
       sx={{margin:'auto'}} size="small">
        Book
      </Button>
    </CardActions>
  </Card>
  )
}

export default MovieItems
