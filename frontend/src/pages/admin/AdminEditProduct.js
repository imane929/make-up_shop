import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { Container, TextField, Button, Typography, Box, Chip } from "@mui/material"
import api from "../../services/api"

/*
Modifier produit
*/

export default function AdminEditProduct(){

const {id} = useParams()

const [product,setProduct] = useState(null)
const [sizeInput, setSizeInput] = useState("")

useEffect(()=>{

api.get("/products/"+id)
.then(res=>setProduct(res.data))

},[id])

const handleSubmit = async(e)=>{

e.preventDefault()

await api.put("/products/"+id,product)

alert("Product updated")

}

const addSize = () => {
  if (sizeInput.trim() && product) {
    const currentSizes = product.sizes || []
    if (!currentSizes.includes(sizeInput.trim())) {
      setProduct({...product, sizes: [...currentSizes, sizeInput.trim()]})
    }
    setSizeInput("")
  }
}

const removeSize = (sizeToRemove) => {
  if (product) {
    setProduct({
      ...product, 
      sizes: (product.sizes || []).filter(s => s !== sizeToRemove)
    })
  }
}

if(!product) return "Loading..."

return(

<Container sx={{mt:5}}>

<Typography variant="h4">

Edit Product

</Typography>

<form onSubmit={handleSubmit}>

<TextField
label="Name"
value={product.name}
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,name:e.target.value})}
/>

<TextField
label="Price"
value={product.price}
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,price:e.target.value})}
/>

<TextField
label="Stock"
value={product.stock}
fullWidth
sx={{mt:2}}
onChange={(e)=>setProduct({...product,stock:e.target.value})}
/>

<Box sx={{ mt: 2 }}>
  <Typography variant="subtitle2" sx={{ mb: 1 }}>Sizes</Typography>
  <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
    {(product.sizes || []).map((size, index) => (
      <Chip 
        key={index} 
        label={size} 
        onDelete={() => removeSize(size)}
        sx={{ bgcolor: "primary.light", color: "white" }}
      />
    ))}
  </Box>
  <Box sx={{ display: "flex", gap: 1 }}>
    <TextField
      label="Add Size (e.g., S, M, L)"
      value={sizeInput}
      onChange={(e) => setSizeInput(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
      size="small"
    />
    <Button variant="outlined" onClick={addSize}>Add</Button>
  </Box>
</Box>

<Button
type="submit"
variant="contained"
sx={{mt:3}}
>

Update

</Button>

</form>

</Container>

)

}