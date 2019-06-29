
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('journals').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('journals').insert([
        
        {title: 'Day 1 Journal Entry', content: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', user_id: '1'},
        
        {title: 'Day 2 Journal Entry', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy.', user_id: '1'},

        {title: 'Day 3 Journal Entry', content: 'Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', user_id: '1'}
      ]);
    });
};