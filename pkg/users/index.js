const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        first_name: String,
        last_name: String,
        email: {
            type: String,
            unique: true
        },
        birthday: String,
        password: String,
        repeat_password: String,
        avatar: String
    },
    'users'
);

const create = async (data) => {
    let u = new User(data);
    return await u.save();
};

const getByID = async (id) => {
    return await User.findById(id);
};

const getByEmail = async (email) => {
    return await User.findOne({ email });
};

const getAll = async () => {
    return await User.find({});
};

const update = async (id, data) => {
    return await User.updateOne({ _id: id }, data);
};

const remove = async (id) => {
    return await User.deleteOne({ _id: id });
};

const updateAvatar = async (id, avatar) => {
    return await User.findOneAndUpdate({ _id: id }, { $set: { avatar: avatar } })
}

module.exports = {
    create,
    getByID,
    getByEmail,
    getAll,
    update,
    remove,
    updateAvatar
};