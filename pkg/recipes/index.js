const mongoose = require('mongoose');

const Recipes = mongoose.model(
    'recipes',
    {
        recipe_title: String,
        category: String,
        preparation_time: String,
        no_people: Number,
        short_description: String,
        recipe: String,
        chef_id: String,
        created_on: String,
        likes: Number
    },
    'recipes'
);

const create = async (data) => {
    let a = new Recipes(data);
    return await a.save();
};

const getOne = async (id) => {
    return await Recipes.findById(id);
};

const getAllByUser = async (uid) => {
    return await Recipes.find({ chef_id: uid });
};

const getAll = async () => {
    return await Recipes.find({});
};

const update = async (id, chef_id, data) => {
    return await Recipes.updateOne({ _id: id, chef_id: chef_id }, data);
};

const remove = async (id, uid) => {
    return await Recipes.deleteOne({ _id: id, chef_id: uid });
};

const getByCategory = async (recipeCategory) => {
    return await Recipes.find({ category: recipeCategory })
};

const addLike = async (id) => {
    return await Recipes.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } });
}

const removeLike = async (id) => {
    return await Recipes.findOneAndUpdate({ _id: id }, { $inc: { likes: -1 } });
}

module.exports = {
    create,
    getOne,
    getAllByUser,
    getAll,
    update,
    remove,
    getByCategory,
    addLike,
    removeLike
};