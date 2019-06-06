const db = require('./dbConfig');

module.exports = {
  find,
  findById,
  add,
  remove,
  update
};

function find(id = 0, dbn='students') {
  
  if(id && id > 0) 
    return db(dbn)
    .where({ id })
    .first();

  return db(dbn);
}

function findById(id) {return find(id)}

async function add(zoo,dbn='students') {
  const [id] = await db(dbn).insert(zoo);

  return find(id);
}

function remove(id,dbn='students') {
  return db(dbn)
    .where({ id })
    .del();
}

async function update(id, changes, dbn='students') {
  let i = await db(dbn)
    .where({ id })
    .update(changes, '*');
  return find(i);
}