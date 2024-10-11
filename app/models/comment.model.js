
// tämä model määrittelee kommentin tietokantataulun ja sen kentät

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        text: {
            type: Sequelize.STRING,
        },
        tutorialId: { 
            type: Sequelize.INTEGER,
            allowNull: false, 
        },
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Tutorial, {
            foreignKey: 'tutorialId',
            as: 'tutorial',
        });
    };

    return Comment;
};
