import { useEffect, useState } from "react"
import api from "../../services/api"

import {
Container,
Typography,
Table,
TableBody,
TableCell,
TableHead,
TableRow,
Select,
MenuItem
} from "@mui/material"

/*
AdminOrders
Page admin pour gérer toutes les commandes
*/

export default function AdminOrders(){

const [orders,setOrders] = useState([])

/*
charger toutes les commandes
*/

useEffect(()=>{

api.get("/orders")
.then(res=>setOrders(res.data))

},[])


/*
changer statut commande
*/

const updateStatus = async(id,status)=>{

await api.put("/orders/"+id,{status})

setOrders(
orders.map(o =>
o._id === id
? {...o,status}
: o
)
)

}


return(

<Container sx={{mt:5}}>

<Typography variant="h4" sx={{mb:4}}>

Orders Management

</Typography>

<Table>

<TableHead>

<TableRow>

<TableCell>User</TableCell>
<TableCell>Total</TableCell>
<TableCell>Address</TableCell>
<TableCell>Status</TableCell>

</TableRow>

</TableHead>

<TableBody>

{orders.map(order=>(

<TableRow key={order._id}>

<TableCell>

{order.user?.name || "User"}

</TableCell>

<TableCell>

${order.total}

</TableCell>

<TableCell>

{order.address}

</TableCell>

<TableCell>

<Select
value={order.status}
onChange={(e)=>updateStatus(order._id,e.target.value)}
>

<MenuItem value="pending">

Pending

</MenuItem>

<MenuItem value="shipped">

Shipped

</MenuItem>

<MenuItem value="delivered">

Delivered

</MenuItem>

</Select>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</Container>

)

}