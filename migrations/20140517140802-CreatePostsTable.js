module.exports = {
  up: function(migration, DataTypes, done) {
        migration.createTable(
                'Posts', {  id: { type: DataTypes.INTEGER,
                                  allowNull: false,
                                  primaryKey: true,
                                  autoIncrement: true,
                                  unique: true },
                         title: { type: DataTypes.STRING,
                                  allowNull: false,
                                  defaultValue:'Título del Posts' },
                          body: { type: DataTypes.TEXT,
                                  allowNull: false },
                     createdAt: { type: DataTypes.DATE,
                                  allowNull: false },
                     updatedAt: { type: DataTypes.DATE,
                                  allowNull: false }
                },
                { sync: {force:true} })
        .complete(done);
  },
  down: function(migration, DataTypes, done) {
         migration.dropTable('Posts')
                  .complete(done);  }
}
