import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import { Pool } from 'pg';

@Injectable()
export class CsvService {
  constructor() {}

  async startPoint(): Promise<string> {
    await this.readCSVColors();
    await this.readCSVSizes();
    await this.readCSV();
    return 'Done';
  }
  private async readCSV() {
    const stream = fs.createReadStream('./src/csv/uploads/products.csv');
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on('data', (data) => csvData.push(data))
      .on('end', () => {
        csvData.shift();

        const query =
          'INSERT INTO products (name,description,price) VALUES ($1,$2,$3)';
        const queryCleaner = 'DELETE FROM products';

        this.poolNew.connect((err, client, done) => {
          if (err) throw err;
          client.query(queryCleaner, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('table products deleted');
            }
          });
          try {
            csvData.forEach((row) => {
              client.query(query, row, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('success');
                }
              });
            });
          } finally {
            done();
          }
        });
      });
    stream.pipe(csvStream);
  }
  async readCSVColors() {
    const stream = fs.createReadStream('./src/csv/uploads/colors.csv');
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on('data', (data) => csvData.push(data))
      .on('end', () => {
        csvData.shift();

        const query = 'INSERT INTO colors (color) VALUES ($1)';
        const queryCleaner = 'DELETE FROM colors';

        this.poolNew.connect((err, client, done) => {
          if (err) throw err;
          client.query(queryCleaner, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('table products deleted');
            }
          });
          try {
            csvData.forEach((row) => {
              client.query(query, row, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('success');
                }
              });
            });
          } finally {
            done();
          }
        });
      });
    stream.pipe(csvStream);
  }
  async readCSVSizes() {
    const stream = fs.createReadStream('./src/csv/uploads/sizes.csv');
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on('data', (data) => csvData.push(data))
      .on('end', () => {
        csvData.shift();

        const query = 'INSERT INTO sizes (size) VALUES ($1)';
        const queryCleaner = 'DELETE FROM sizes';

        this.poolNew.connect((err, client, done) => {
          if (err) throw err;
          client.query(queryCleaner, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log('table products deleted');
            }
          });
          try {
            csvData.forEach((row) => {
              client.query(query, row, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('success');
                }
              });
            });
          } finally {
            done();
          }
        });
      });
    stream.pipe(csvStream);
  }
  private poolNew = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
}
