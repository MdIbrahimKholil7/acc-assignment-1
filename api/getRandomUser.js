const express = require('express');
const { getRandomUser } = require('../controllers/user');
const router=express.Router()

router.get('/api/v1/getRandomUser',getRandomUser)

module.exports=router

