import express from "express";
import Form from "../models/form";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const form = new Form(data);
    const doc = await form.save();
    res.status(201).json({ message: "success", formId: doc._id });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    const data = req.body;
    await Form.findByIdAndUpdate(formId, data);
    res.status(201).json({ message: "success" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    res.status(200).json({ message: "success", form });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Form.deleteOne({ _id: id });
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
