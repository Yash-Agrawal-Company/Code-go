import express from 'express';
import { createRoom, getRooms, joinRoomRequest } from '../controllers/roomController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createRoom);
router.get('/', protect, getRooms);
router.post('/:roomId/join', protect, joinRoomRequest);

export default router;
