const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// get orders
router.get("/",auth, async(req,res)=>{
    try{
        const orders = await Order.find({user:req.user.id});
        res.json(orders);

    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// create order
router.post("/",auth, async(req,res)=>{
    try{
        const order = new Order({
            user:req.user.id,
            products:req.body.products,
            total:req.body.total,
            address:req.body.address
        });
        await order.save();
        res.json(order);
    }catch(err){
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

module.exports = router;
