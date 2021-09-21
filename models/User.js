const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default: "/dashboard/img/uploaded/users/default.svg",
    },
  },
  { timestamps: true }
);

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Eposta veya parola hatalı!");
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw Error("Eposta veya parola hatalı!");
  }
  return user;
};

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
