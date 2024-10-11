module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  // tämä määrittää yhden tutorialin ja monia kommentteja
  Tutorial.associate = function (models) {
    Tutorial.hasMany(models.Comment, { as: 'comments' });
  };

  return Tutorial;
};
