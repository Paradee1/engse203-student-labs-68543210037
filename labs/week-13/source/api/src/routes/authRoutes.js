import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

const router = Router();

const failedAttempts = new Map();

export function resetLoginLimiter() {
  failedAttempts.clear();
}

router.post('/login', (req, res) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 นาที

  // ดึงประวัติเฉพาะที่ยังไม่หมดอายุ 15 นาที
  const recentAttempts = (failedAttempts.get(ip) || []).filter((time) => now - time < windowMs);

  // ถ้าผิดสะสมครบ 5 ครั้งแล้ว ให้ปฏิเสธด้วย 429 ทันที
  if (recentAttempts.length >= 5) {
    return res.status(429).json({ error: 'เข้าสู่ระบบผิดพลาดเกินกำหนด กรุณาลองใหม่ในภายหลัง' });
  }


  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }


  const result = authService.login(req.body.email, req.body.password);
  if (!result) {

    recentAttempts.push(now);
    failedAttempts.set(ip, recentAttempts);
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }

  failedAttempts.delete(ip);
  return res.status(200).json(result);
});

export default router;