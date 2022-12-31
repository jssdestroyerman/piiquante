const passwordValidator = require("password-validator");

// Vérifier les champs entrés dans l'input password, renvoi une erreur si la saisie est incorrecte
const schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces(); // Should not have spaces

module.exports = schema;
