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
          
        </Card>
    );
}

  
