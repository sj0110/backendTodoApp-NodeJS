import jwt from 'jsonwebtoken'


export const createCookie = (res, user, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).cookie('token', token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        sameSite: process.env.NODE_ENV !== 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV !== 'production' ? true : false,
    }).json({ message: message, user: user._id });

}
