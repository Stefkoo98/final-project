const { Validator } = require('node-input-validator');

const CreateRecipe = {
  recipe_title: 'required',
  category: 'required',
  preparation_time: 'required',
  no_people: 'required',
  short_description: 'required',
  recipe: 'required'
}

const UpdateRecipe = {
  recipe_title: 'required',
  category: 'required',
  preparation_time: 'required',
  no_people: 'required',
  short_description: 'required',
  recipe: 'required'
}

const validate = async (data, schema) => {
  let sch;
  switch (schema) {
    case 'CREATE':
      sch = CreateRecipe;
      break;
    case 'UPDATE':
      sch = UpdateRecipe;
      break;
  }

  let v = new Validator(data, sch);
  let e = await v.check();
  if (!e) {
    throw v.errors
  }

};

module.exports = validate;