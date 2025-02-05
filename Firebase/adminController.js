const admin = require("./firebaseAdmin")

const getAllUsers = async () => {
  try {
    // Fetch all users using the listUsers method
    const userData = await admin.auth().listUsers();

    // Ensure that userData and userData.users exist before calling map
    if (userData && userData.users) {
      const users = await Promise.all(
        userData.users.map(async (user) => {
          const { customClaims } = await admin.auth().getUser(user.uid); // Corrected the property name
          return {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "No Name",
            role: customClaims?.role || "user", // Fetch role or set default as "user"
            lastActive: user.metadata?.lastSignInTime || "Never",
          };
        })
      );
      return users; // Return the resolved users array
    } else {
      throw new Error("No users found.");
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error; // Rethrow the error to be handled in the controller
  }
};


exports.allUsers=async(req,res)=>{
    try {
        const users = await getAllUsers(); // Fetch all users (uid and email only)
        res.status(200).json({ users }); // Send the list of users in one response
      } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
      }
}

exports.updateRole = async (req, res) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({ error: "UID and role are required" });
  }

  try {
    // Update custom claims for the user
    await admin.auth().setCustomUserClaims(uid, { role });

    res.status(200).send({ message: `Role updated to ${role} for user ${uid}` });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).send({ message: "Failed to update role", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).json({ message: `User with UID ${uid} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};