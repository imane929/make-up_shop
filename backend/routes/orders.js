const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// get orders
router.get("/", async(req,res)=>{
    try{
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);

    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// create order
router.post("/", async(req,res)=>{
    try{
        console.log("Creating order:", req.body);
        const order = new Order({
            user: req.body.userId || null,
            products:req.body.products,
            total:req.body.total,
            address:req.body.address,
            status: "pending"
        });
        await order.save();
        console.log("Order saved:", order);
        res.json(order);
    }catch(err){
        console.error("Order error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// PUT /api/orders/:id
// Update order status (admin only)
router.put("/:id", async(req,res)=>{

const order = await Order.findByIdAndUpdate(

req.params.id,

{status:req.body.status},

{new:true}

)

res.json(order)

})

// DELETE /api/orders/:id
router.delete("/:id", async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully" });
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
