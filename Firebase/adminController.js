const {getAllUsers}=require("./firebaseAdmin")

exports.allUsers=async(req,res)=>{
    try {
        const users = await getAllUsers(); // Fetch all users (uid and email only)
        res.status(200).json({ users }); // Send the list of users in one response
      } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
      }
}