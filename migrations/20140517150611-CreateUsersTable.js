module.exports = {
  up: function(migration, DataTypes, done) {

     migration.createTable(
          'Users',
         {
             id: {
                 type: DataTypes.INTEGER,
                 allowNull: false,
                 primaryKey: true,
                 autoIncrement: true,
                 unique: true
             },
             login: {
                 type: DataTypes.STRING,
                 notEmpty: true,
                 unique: true
             },
             name: {
                 type: DataTypes.STRING,
                 allowNull: false,
                 defaultValue:'John Smith'
             },
             email: {
                 type: DataTypes.STRING,
                 notEmpty: true
             },
             hashed_password: {
                 type: DataTypes.STRING,
                 notEmpty: true,
                 allowNull: false
             },
             salt: {
                 type: DataTypes.STRING,
                 notEmpty: true,
                 allowNull: false
             },
             createdAt: {
                 type: DataTypes.DATE,
                 allowNull: false
             },
             updatedAt: {
                 type: DataTypes.DATE,
                 allowNull: false
             }
          },
          { sync: {force:true}
          })
       .complete(done);

  },
  down: function(migration, DataTypes, done) {

    migration.dropTable('Users')
          .complete(done);

  }
}