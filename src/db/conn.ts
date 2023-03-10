import { connect } from "mongoose";
import { config } from "dotenv";
config();

export async function run() {
  try {
    await connect(
      `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@${process.env.ATLAS_PROJECT}.3eey1bh.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (e) {
    console.log(e);
  }
}
