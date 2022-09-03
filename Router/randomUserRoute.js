const express = require('express');
const { getAllUser, getRandomUser, userAdded, updateUser, deleteUser } = require('../Controler/randomUserControler');
const router = express.Router()

router.get('/all' , getAllUser)
router.get("/random" , getRandomUser)
router.post("/save" , userAdded)
router.put("/update/:id" , updateUser)
router.delete("/delete/:id" , deleteUser)

module.exports = router