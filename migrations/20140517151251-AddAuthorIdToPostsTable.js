module.exports = {
  up: function(migration, DataTypes, done) {

        migration.addColumn('Posts',
                            'AuthorId',
                            DataTypes.INTEGER
                           )  
             .complete(done);
  },
  down: function(migration, DataTypes, done) {

        migration.removeColumn('Posts', 'AuthorId')
             .complete(done);
  }
}
