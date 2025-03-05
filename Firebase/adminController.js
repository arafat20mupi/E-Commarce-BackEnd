const admin = require("./firebaseAdmin");

const getAllUsers = async (pageToken) => {
  try {
    // Fetch users with pagination
    const userData = await admin.auth().listUsers(1000, pageToken);

    if (userData && userData.users) {
      const users = await Promise.all(
        userData.users.map(async (user) => {
          const { customClaims } = await admin.auth().getUser(user.uid);
          return {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "No Name",
            photoURL : user.photoURL,
            role: customClaims?.role || "user",
            lastActive: user.metadata?.lastSignInTime || "Never",
          };
        })
      );
      return { users, nextPageToken: userData.pageToken };
    } else {
      throw new Error("No users found.");
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

exports.allUsers = async (req, res) => {
  const { pageToken, searchTerm } = req.query;

  try {
    const { users, nextPageToken } = await getAllUsers(pageToken);

    // Filter users by search term if provided
    const filteredUsers = searchTerm
      ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : users;

    res.status(200).json({ users: filteredUsers, nextPageToken });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

exports.updateRole = async (req, res) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({ error: "UID and role are required" });
  }

  try {
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