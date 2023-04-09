const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, max: 10000 },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
