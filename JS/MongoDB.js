// JavaScript source code
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

const config = {
    useNewUrlParser: true,
};
Mongoose.connect("mongodb://localhost:27017/Private_User_Data", config);

const UserSchema = new Mongoose.Schema({
    username: String,
    password: String,
});;
const UserModel = new Mongoose.model("user", UserSchema);

module.exports = async function MongoMar(lrd, body) {

    


    UserSchema.pre("save", function (next) {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = Bcrypt.hashSync(this.password, 10);
        next();
    });



    if (lrd == "register") {
        try {
            console.log("registering....");
            var user = new UserModel(body);
            var result = await user.save();
            return { Status: 200, message: result };
        } catch (error) {
            return { Status: 500, message: error };
        }
    }
    else if (lrd == "Login") {
        console.log("loging in....");
        try {
            var user = await UserModel.findOne({ username: body.username }).exec();
            if (!user) {
                return { Status: 400, message: "The username does not exist" };
            }
            var match = await Bcrypt.compareSync(plaintext, this.password);
            if (!match) {
                return { Status: 400, message: "The password is invalid" };
            }
            return { Status: 200, message: "The username and password combination is correct!" };
        }
        catch (error) {
            return { Status: 500, message: error };
        }
    }
    else if (lrd == "dump") {


        try {
            var result = await UserModel.find().exec();
            return { Status: 200, message: result };
        } catch (error) {
            return { Status: 500, message: error };
        }
    }
    else {
        console.log("Unkown imput");
        return { Status: 500, message: "Not dump,register,login" };

    }
}
