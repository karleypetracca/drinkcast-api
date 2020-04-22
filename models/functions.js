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

  static async addSession(name, sessionID, token, password) {
    const query = `INSERT INTO users (name, sessionID, token, password) VALUES (''${name}', '${sessionID}', ${token},${password})`;
    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Functions;
