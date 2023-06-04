const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  recipientEmails: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    default: "NOT_SEND",
    required: true,
  },
  requester: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
