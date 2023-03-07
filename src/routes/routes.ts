import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ Initial: "First" });
});

export default router;
