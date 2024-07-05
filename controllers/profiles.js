
const Profile=require('../model/profile')



getprofiles=async (req,res)=>{
    const profiles=await Profile.find();
    res.status(200).json({profiles})
}

postprofile=async(req,res)=>{
    const {name}=req.body;
    const imagepath='http://localhost:3000/images/' +req.file.filename;
    const profile=new Profile({
        name,
        imagepath
    });
    const createdprofile=await profile.save()
    res.status(201).json({
        "status":true,
        profile:{
            ...createdprofile._doc,
        }
    })
}


  
updateProfile = async (req, res) => {
    try {
      const { id } = req.params;
      let profile = await Profile.findById(id);
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // If a new image is uploaded, update the imagepath
      let imagepath = profile.imagepath;
      if (req.file) {
        imagepath = 'http://localhost:3000/images/' + req.file.filename;
      }
  
      // Update profile data
      if (req.body.name) {
        profile.name = req.body.name;
      }
      profile.imagepath = imagepath;
  
      const updatedProfile = await profile.save();
  
      res.status(200).json({ profile: updatedProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.status(204).end(); // Respond with 204 No Content on successful deletion
  } catch (error) {
    res.status(500).json({"status":true, message: 'Profile deleted successfully'  });
    console.log(error)
  }
};



module.exports = {
    getprofiles,
    postprofile,
    updateProfile, // Make sure this is exported
  deleteProfile
  };





















