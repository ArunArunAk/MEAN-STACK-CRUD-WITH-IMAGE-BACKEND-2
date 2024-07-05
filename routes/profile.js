const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router=express.Router();
const profilesControllers=require('../controllers/profiles')
const storage=require('../helpers/storage')



router.get('/',profilesControllers.getprofiles)
router.post('/',storage,profilesControllers.postprofile)
router.put('/:id',storage, profilesControllers.updateProfile); // Add PUT route
router.delete('/:id', profilesControllers.deleteProfile); // Add DELETE route

module.exports=router;