const db = require('./conn.js');

class Functions {
  constructor(id, token, password, sessionID, name) {
    this.token = token;
    this.id = id;
    this.password = password;
    this.name = name;
    this.sessionID = sessionID;
  }

  static async getById(sessionID) {
    try {
      const response = await db.one(
        `select * from users where sessionID = ${sessionID}`,
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getByBarName(name) {
    try {
      const response = await db.one('SELECT * FROM users WHERE name = $1', [
        name,
      ]);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async addSession(name, sessionID, password) {
    try {
      const query =
        'INSERT INTO users (name, sessionID, password) VALUES ($1, $2, $3) RETURNING id';
      const response = await db.one(query, [name, sessionID, password]);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getNeverHaveIEver() {
    try {
      const response = await db.one(
        'SELECT * FROM never_have_i_ever ORDER BY random() LIMIT 1;',
      );
      console.log(response);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getQuestion() {
    try {
      const response = await fetch('https://www.rrrather.com/botapi');
    } catch (e) {
      return e;
    }
  }
}

module.exports = Functions;
