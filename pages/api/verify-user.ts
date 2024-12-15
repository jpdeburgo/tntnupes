import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = req.body; // Example: Expecting a user ID in the request body
    const authUser = await admin.auth().getUser(uid); // Admin SDK action
    const user = (
      await admin.firestore().collection("users").doc(uid).get()
    )?.data(); // Admin SDK action
    res.status(200).json({ authUser, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify user." });
  }
};

export default handler;
