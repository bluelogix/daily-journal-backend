const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findById,
    getArticleList,
    insert,
    update,
    remove,
  };
  
  function find() {
    return db('journals');
  }
  
  function findById(id) {
    return db('journals').where({ id: Number(id) });
  }


  function getArticleList(userId) {
    return db('journals')
      .join('users ', 'users.id', 'journals.user_id')
      .select('journals.id', 'journals.title', 'journals.content', 'journals.abstract', 'journals.image', 'journals.category', 'users.username')
      .where('journals.user_id', userId);
  }
  

  function insert(journal) {
    return db('journals')
      .insert(journal)
    //   .then(ids => ({ id: ids[0] }));
  }
  
  function update(id, journal) {
    return db('journals')
      .where('id', Number(id))
      .update(journal);
  }
  
  function remove(id) {
    return db('journals')
      .where('id', Number(id))
      .del();
  }
  