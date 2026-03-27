import { useState } from "react"
import { Container, TextField, Button, Typography } from "@mui/material"
import api from "../../services/api"

/*
Ajouter un produit (admin)
*/

export default function AdminAddProduct(){

const [product,setProduct] = useState({
name:"",
brand:"",
price:"",
category:"",
image:"",
description:"",
stock:""
})

const handleSubmit = async(e)=>{

e.preventDefault()

await api.post("/products",product)

alert("Product added successfully")

}

return(

<Container sx={{mt:5}}>

<Typography variant="h4">

Add Product

</Typography>

<form onSubmit={handleSubmit}>

<TextField
label="Name"
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,name:e.target.value})}
/>

<TextField
label="Brand"
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,brand:e.target.value})}
/>

<TextField
label="Price"
type="number"
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,price:e.target.value})}
/>

<TextField
label="Category"
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,category:e.target.value})}
/>

<TextField
label="Image URL"
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,image:e.target.value})}
/>

<TextField
label="Stock"
type="number"
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,stock:e.target.value})}
/>

<TextField
label="Description"
multiline
rows={4}
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,description:e.target.value})}
/>

<Button
type="submit"
variant="contained"
sx={{mt:3}}
>

Add Product

</Button>

</form>

</Container>

)

}