const { Router } = require("express");
const Feedback = require("../models/Feedback");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const feedback = new Feedback({
    name: req.body.name,
    telnum: req.body.telnum,
    email: req.body.email,
    message: req.body.message,
  });
  try {
    const newfeedback = await feedback.save();
    res.status(201).json(newfeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getFeedbackById, (req, res) => {
  res.status(200).json(res.feedback);
});

// update individual
router.patch("/:id", getFeedbackById, async (req, res) => {
  if (req.body.name != null) {
    res.feedback.name = req.body.name;
  }
  if (req.body.telnum != null) {
    res.feedback.telnum = req.body.telnum;
  }
  if (req.body.email != null) {
    res.feedback.email = req.body.email;
  }
  if (req.body.message != null) {
    res.feedback.message = req.body.message;
  }
  try {
    const updatedFeedback = await res.feedback.save();
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getFeedbackById, async (req, res) => {
  try {
    await res.feedback.remove();
    res.status(200).json({ message: "Feedback removed succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getFeedbackById(req, res, nxt) {
  let feedback;
  try {
    feedback = await Feedback.findById(req.params.id);
    if (feedback == null) {
      return res.status(400).json({ message: "Feedback error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.feedback = feedback;
  nxt();
}

module.exports = router;