import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { createSlot, deleteSlot, getAvailableSlots, updateSlot } from '../controllers/availabilityController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/available-slots', getAvailableSlots);
router.post('/', authorize('business'), createSlot);
router.put('/:id', authorize('business'), updateSlot);
router.delete('/:id', authorize('business'), deleteSlot);

export default router;