const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecomarce-8fe12.firebaseio.com", // Replace with your Firebase database URL
});

const getAllUsers = async () => {
  try {
    // Fetch all users using the listUsers method
    const userData = await admin.auth().listUsers();
    
    // Ensure that userData and userData.users exist before calling map
    if (userData && userData.users) {
      const users = userData.users.map(user => ({
        uid: user.uid,
        email: user.email,
      }));
      return users;
    } else {
      throw new Error("No users found.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

module.exports = { getAllUsers };
