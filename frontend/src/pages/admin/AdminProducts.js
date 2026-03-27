import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/*
table gestion produits
*/

export default function AdminProducts(){

const [products,setProducts] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

api.get("/products")
.then(res=>setProducts(res.data))

},[])

const deleteProduct = async(id)=>{

await api.delete("/products/"+id)

setProducts(products.filter(p=>p._id !== id))

}

return(

<div>
<Button 
  variant="contained" 
  color="primary"
  sx={{ mb: 2 }}
  onClick={() => navigate("/admin/products/add")}
>
  Add Product
</Button>

<Table>

<TableHead>

<TableRow>

<TableCell>Name</TableCell>
<TableCell>Price</TableCell>
<TableCell>Actions</TableCell>

</TableRow>

</TableHead>

<TableBody>

{products.map(p=>(

<TableRow key={p._id}>

<TableCell>{p.name}</TableCell>
<TableCell>${p.price}</TableCell>

<TableCell>

<Button 
  variant="outlined" 
  size="small"
  sx={{ mr: 1 }}
  onClick={()=>navigate("/admin/products/edit/"+p._id)}
>
  Edit
</Button>

<Button color="error"
onClick={()=>deleteProduct(p._id)}
>
Delete
</Button>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</div>

)

}