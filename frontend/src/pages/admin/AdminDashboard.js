import { Container, Typography, Grid, Paper } from "@mui/material";

/*
dashboard admin principal
*/

export default function AdminDashboard(){

return(

<Container sx={{mt:5}}>

<Typography variant="h4" sx={{mb:4}}>

Admin Dashboard

</Typography>

<Grid container spacing={3}>

<Grid item md={4}>

<Paper sx={{padding:3}}>

<Typography variant="h6">

Total Products

</Typography>

<Typography variant="h3">

120

</Typography>

</Paper>

</Grid>

<Grid item md={4}>

<Paper sx={{padding:3}}>

<Typography variant="h6">

Orders

</Typography>

<Typography variant="h3">

35

</Typography>

</Paper>

</Grid>

<Grid item md={4}>

<Paper sx={{padding:3}}>

<Typography variant="h6">

Users

</Typography>

<Typography variant="h3">

15

</Typography>

</Paper>

</Grid>

</Grid>

</Container>

)

}