import express from "express";
import FormResponse from "../models/form_response";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const formResponse = req.body;
    const doc = new FormResponse(formResponse);
    await doc.save();
    res.status(201).json({ message: "success" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await FormResponse.deleteOne({ _id: id });
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
