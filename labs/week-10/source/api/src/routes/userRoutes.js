import { Router } from 'express';
import { findAllUsers, findRequestsByUserId } from '../services/userService.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(findAllUsers());
});

router.get('/:id/requests', (req, res) => {
  const requests = findRequestsByUserId(req.params.id);
  res.json(requests);
});

export default router;