const db = require('./database')

class Todo {
  constructor(data) {
    this.id = data.id
    this.text = data.text
    this.done = data.done
  }

  static async findAll() {
    const { rows } = await db.query('SELECT * FROM todos')
    return rows
  }

  static async findOne(id) {
    const { rows } = await db.query('SELECT * FROM todos WHERE id=$1', [id])
    return rows[0]
  }

  static async create(data) {
    const todo = new Todo(data)
    await db.query('INSERT INTO todos (done, text) VALUES($1, $2)', [todo.done, todo.text])
    const { rows } = await db.query('SELECT * FROM todos ORDER BY id DESC LIMIT 1')
    return rows[0]
  }

  static async update(id, data) {
    let todo = await Todo.findOne(id)
    todo = new Todo({ ...todo, ...data })
    await db.query('UPDATE todos SET done=$1, text=$2 WHERE id=$3', [todo.done, todo.text, todo.id])
    return await Todo.findOne(id)
  }

  static async delete(id) {
    await db.query('DELETE FROM todos WHERE id=$1', [id])
  }
}

module.exports = Todo