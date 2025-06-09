const Register = require('../models/registration');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {

    try {
        const { uid, mobile, username, dob, email } = req.body;

        //check if user already registered
        const userExisted = await Register.findOne({ $or: [{ uid }, { mobile }, { email }] });
        if (userExisted) {
            return res.status(200).json({
                success: false,
                message: 'Already Registered with Mobile or Aadhar or Email',
            });
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomPassword = Array.from(crypto.randomBytes(6), byte => chars[byte % chars.length]).join('');
        const salt = await bcrypt.genSalt(6);
        const userHashedPassword = await bcrypt.hash(randomPassword, salt);

        // reqBody.password=userHashedPassword;
        console.log('randomPassword', randomPassword);
        console.log('userHashedPassword', userHashedPassword);

        const newUser = new Register({
            username,
            email,
            mobile,
            uid,
            dob,
            password: userHashedPassword
        });
        await newUser.save();
        if (newUser) {
            return res.status(200).json({
                success: true,
                message: 'Registered Successfully',
                userPassword: randomPassword,
            });
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal server Issue',
        });

    }
};

const loginuser = async (req, res) => {
    const { username, password } = req.body;

    //check if the user is present 
    const userExisted = await Register.findOne({ username });
    if (!userExisted) {
        return res.status(400).json({
            success: false,
            message: 'User Does not Exist'
        });
    }

    //check if the password entered is correct or not
    const ispasswordCorrect = await bcrypt.compare(password, userExisted.password);
    if (!ispasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Credentials'
        });
    }

    //now create the token
    const accessTooken = jwt.sign({
        userId: userExisted.id,
        username: userExisted.username
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION
    });

    const refreshToken = jwt.sign(
        {
            userId: userExisted.id
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        }
    );

    res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, // use false if testing on localhost (http)
    sameSite: 'Strict',
    // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

    return res.status(200).json({
        success: true,
        message: 'Login Successfull',
        token: accessTooken,
        token_expiry: process.env.JWT_EXPIRATION,
        refreshToken: refreshToken,
        refres_token_expiry: process.env.JWT_REFRESH_EXPIRATION
    });

};



const refreshToken = async (req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("refreshToken", refreshToken);

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
        if (!payload) {
            return res.status(500).json({
                status: false,
                message: 'Invalid Refresh token'
            })
        }
        console.log("payload", payload);

        const newAccessToken = jwt.sign(
            { userId: payload.userId },
            process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRATION
        }
        );

        const newRefreshToken = jwt.sign(
            {
                userId: payload.userId
            },
            process.env.JWT_REFRESH_SECRET_KEY,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Login Successfull',
            token: newAccessToken,
            token_expiry: process.env.JWT_EXPIRATION,
            // refreshToken: newRefreshToken,
            refres_token_expiry: process.env.JWT_REFRESH_EXPIRATION
        })

    }
    catch (e) {
        return res.status(401).json({
            status: false,
            message: 'Invalid Refresh token'
        })
    }
}

const changePassword = async (req, res) => {
    try {

        const password = req.body.password;
        const username = req.body.username;

        const user = await Register.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User Does not Exist'
            });

        }
        else {

            const salt = await bcrypt.genSalt(6);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
            user.save();

            return res.status(200).json({
                success: true,
                message: 'Password changed Successfully'
            });

        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'some error occured! please try again'
        });
    }


}

module.exports = {
    registerUser,
    loginuser,
    changePassword, refreshToken
};
