const db = require('./conn.js');

class Functions {
  constructor(id, token, password, sessionID, name) {
    this.token = token;
    this.id = id;
    this.password = password;
    this.name = name;
    this.sessionID = sessionID;
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
      const query = 'INSERT INTO users (name, sessionID, password) VALUES ($1, $2, $3) RETURNING id';
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
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getWouldYouRather() {
    try {
      const response = await db.one(
        'SELECT * FROM would_you_rather ORDER BY random() LIMIT 1;',
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async checkIfNameIsInUse(name) {
    try {
      const prospectiveName = await this.getByBarName(name);
      if (name === prospectiveName.name) {
        return true;
      }
      return false;
    } catch (e) {
      return e;
    }
  }

  static async updateLastAccess(name, now) {
    try {
      const response = await db.one(`UPDATE users SET lastaccess = '${now}' WHERE name = '${name}';`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getLastAccess() {
    try {
      const response = await db.any('SELECT id, lastaccess FROM users;');
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async deleteBar(id) {
    try {
      const response = await db.one(`DELETE FROM users WHERE id = ${id};`);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Functions;
