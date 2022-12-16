const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bookmark: {
        type: Array
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: Array,
        required: true
    },
    following: {
        type: Array,
        required: true
    },
    profilepicimage: {
        type: String
    },
    Bio: {
        type: String
    },
    Location: {
        type: String
    },
    tokens:[
        {
            token: {
                type: String,
                required:true
            }
        }
    ]

})

userSchema.methods.genrateAuthToken = async function () {
    try {
       const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,{
           expiresIn:"120 minutes"
       });
       
        this.tokens = this.tokens.concat({token: token});
     
        await this.save();
    //   console.log(token)
     return token;
    } catch (err) {
        console.log(err)
    }
}
//password hashing

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
       
    }
    next();
});


const User = mongoose.model('registers', userSchema)

module.exports = User;