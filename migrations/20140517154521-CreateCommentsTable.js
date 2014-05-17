module.exports = {
  up: function(migration, DataTypes, done) {

    migration.createTable(
        'Comments',
        { 
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            AuthorId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            PostId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            body: {
                type: DataTypes.TEXT,
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

     migration.dropTable('Comments')
         .complete(done);

  }
}
