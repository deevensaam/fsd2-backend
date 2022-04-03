const { Router } = require("express");
const Search = require("../models/Search");

const router = Router();

router.get('/Search',async (req,res)=>{
    let filter = {};
    for (let key in req.query) {
        filter[key] = { $regex: req.query[key], $options: "i" };
    }
    console.log(filter)
    const results = await Search.find(filter)
    res.json(results)
})

module.exports = router