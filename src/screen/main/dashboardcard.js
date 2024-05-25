import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function MainDashboardcard({ name, description, backgroundColor }) {
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: backgroundColor }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Button size="large" style={{ color: 'white', backgroundColor: 'blue', fontWeight: 'bold', width: '100%', marginBottom: '10px' }}>Share</Button>
                    <Button size="large" style={{ color: 'white', backgroundColor: 'blue', fontWeight: 'bold', width: '100%' }}>Learn More</Button>
                </div>
            </CardActions>
        </Card>
    );
}

  
