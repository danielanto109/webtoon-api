'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    id_user: DataTypes.INTEGER,
    id_webtoons: DataTypes.INTEGER
  }, {});
  favorites.associate = function(models) {
    favorites.belongsTo(models.webtoons, {
      as:'webtoonDatas',
      foreignKey: 'id_webtoons'
    })

  };
  return favorites;
};