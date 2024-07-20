import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Subject, BehaviorSubject  } from 'rxjs';
import { personasDefaultRecords } from './JSON/personas-default';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: SQLiteObject;
  // private databaseReady = false;
  private databaseReady = new BehaviorSubject<boolean>(false);
  public personasUpdated = new BehaviorSubject<any[]>([]);


  currentPage = 1;

  loadData = {
    limit: 10000,
    offset: 0,
    total: 0
  };

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.createDatabase()
        .then(() => this.createTableDefault())
        .then(() => this.databaseReady.next(true))
        .catch(e => console.log(e));
    });
   }

   private async createDatabase() {
    try {
      const db = await this.sqlite.create({
        name: 'data_guayaba.db',
        location: 'default'
      });
      console.log('Database created:', db);
      this.db = db;
    } catch (error) {
      console.error('Error creating database', error);
    }
  }

  private async createTable() {
    // const dropQuery = 'DROP TABLE IF EXISTS fincas';
    const createQuery = 'CREATE TABLE IF NOT EXISTS personas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, departamento TEXT, municipio TEXT, vereda TEXT)';
      // const query = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, username TEXT, password TEXT)';
      try {
      // await this.db.executeSql(dropQuery, []);
      await this.db.executeSql(createQuery, []);
      return console.log('Tabla de personas creada correctamente');
    } catch (e) {
      return console.log(e);
    }
    }


    private async createTableDefault() {
      // const dropQuery = 'DROP TABLE IF EXISTS fincas';
      const createQuery = 'CREATE TABLE IF NOT EXISTS personas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, departamento TEXT, municipio TEXT, vereda TEXT)';

      const insertQuery = 'INSERT INTO personas (nombre, departamento, municipio, vereda) SELECT ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM personas WHERE nombre = ?)';
      try {
        // await this.db.executeSql(dropQuery, []);
        await this.db.executeSql(createQuery, []);
        await Promise.all(personasDefaultRecords.map(record =>
          this.db.executeSql(insertQuery, [
            record.nombre,
            record.departamento,
            record.municipio,
            record.vereda,
            record.nombre
          ])
        ));
        console.log('Tabla de personas creada correctamente');
      } catch (e) {
        console.log(e);
      }
    }

    async createPersona(persona: any) {
      const query = 'INSERT INTO personas (nombre, departamento, municipio, vereda) VALUES (?, ?, ?, ?)';
      try {
        return await this.db.executeSql(query, [persona.nombre, persona.departamento, persona.municipio, persona.vereda]);
      } catch (e) {
        return console.log(e);
      }
    }

    async getPersonas(page: number, limit: number) {
      if (!this.databaseReady) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      if (!this.db) {
        await this.createDatabase();
      }
      try {
        const offset = (page - 1) * limit;
        // const query = 'SELECT * FROM fincas LIMIT ?,?';
        const query = 'SELECT * FROM personas ORDER BY id DESC LIMIT ?,?';
        const result = await this.db.executeSql(query, [offset, limit]);
        const personas = [];
        for (let i = 0; i < result.rows.length; i++) {
          personas.push(result.rows.item(i));
        }
        // this.fincasUpdated.next(fincas);
        return personas;
      } catch (error) {
        console.error(error);
        return [];
      }
    }


    async getPersonaById(id: number) {
      if (!this.databaseReady) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      }
      if (!this.db) {
      await this.createDatabase();
      }
      try {
      const result = await this.db.executeSql('SELECT * FROM personas WHERE id = ?', [id]);
      return result.rows.item(0);
      } catch (error) {
      console.error(error);
      return null;
      }
      }

      // Eliminra registros
      async deletePersona(id: number) {
        try {
          const result = await this.db.executeSql('DELETE FROM personas WHERE id = ?', [id]);
          return result.rowsAffected;
        } catch (error) {
          console.error(error);
          return 0;
        }
      }


    // async updateFinca(id: number, finca: any) {
    async updatePersona(id: number, persona: any) {
      try {
        const query = 'UPDATE personas SET nombre=?, departamento=?, municipio=?, vereda=? WHERE id=?';
        const data = [persona.nombre, persona.departamento, persona.municipio, persona.vereda, id];
        const result = await this.db.executeSql(query, data);
        return result.rowsAffected;
      } catch (error) {
        console.error(error);
        return 0;
      }
    }
}
