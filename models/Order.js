const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  records: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Record",
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
