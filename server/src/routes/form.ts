import express from "express";
import Form from "../models/form";
import nodemailer from "nodemailer";

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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Form.findByIdAndUpdate(id, data);
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

router.get("/creator/:userId/:formId", async (req, res) => {
  try {
    const { userId, formId } = req.params;
    const form = await Form.findById(formId);
    if (!form) {
      throw new Error("form does not exist");
    }
    const isCreator = userId === form.creatorId;
    res.status(200).json({ message: "success", isCreator });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) {
      throw new Error("form does not exist");
    }
    const types = form.fields.map((field) => {
      return {
        type: field.type,
        title: field.title,
      };
    });
    res.status(200).json({ message: "success", types });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/share/email", async (req, res) => {
  try {
    const { emails, subject, title, link } = req.body;
    const emailIds = emails.split(";");
    const response = sendMail(emailIds, title, link, subject);
    if (response === "success") {
      return res.status(200).json({ message: "success" });
    }
    res.status(400).json({ message: response });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/user-forms/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const forms = await Form.find({ creatorId: userId }).sort({
      updatedAt: "desc",
    });
    res.status(200).json({ message: "success", forms });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:formId/:creatorId", async (req, res) => {
  try {
    const { formId, creatorId } = req.params;
    await Form.deleteOne({ _id: formId, creatorId });
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/update-acceptance/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    const { acceptingResponse } = req.body;
    await Form.updateOne(
      { _id: formId },
      {
        acceptingResponse,
      }
    );
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

const sendMail = (
  emails: string[],
  title: string,
  link: string,
  subject: string | undefined
) => {
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: emails,
    subject: subject ?? title ?? "Form invitation",
    html: `<div>
      <p>Hello there! I invited you to fill out a form:</p>
      <h2>${title}</h2>
      <p>Click the link below</p>
      <a href=${link}>FILL OUT FORM</a>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (error, _) {
    if (error) {
      return error;
    }
  });
  return "success";
};

export default router;
