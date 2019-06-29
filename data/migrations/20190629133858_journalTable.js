
exports.up = function(knex, Promise) {
    return knex.schema.createTable('journals', journals => {
       journals.increments();
       //both title and content are needed in order to fill out form
       journals
           .string('title', 128)
           .notNullable()
       journals
          .text('content', 255)
          .notNullable();
       journals
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("users");
       journals
           .text('category', 255); //for filtering purposes on react portion
   
         });
   };
   
   
   exports.down = function(knex, Promise) {
       return knex.schema.dropTableIfExists('journals');
   };