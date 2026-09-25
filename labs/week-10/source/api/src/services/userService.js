import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');
const DB_FILE = process.env.DB_FILE || path.resolve(API_ROOT, 'data/campus.db');

const db = new DatabaseSync(DB_FILE);

export function findAllUsers() {
  return db.prepare('SELECT id, name, department, email FROM users ORDER BY id').all();
}

export function findRequestsByUserId(userId) {
  return db.prepare(`
    SELECT r.id,
           u.name AS requesterName,
           r.request_type AS requestType,
           r.location,
           r.details,
           r.priority,
           r.status
    FROM requests r
    JOIN users u ON r.requester_id = u.id
    WHERE r.requester_id = ?
    ORDER BY r.id
  `).all(userId);
}