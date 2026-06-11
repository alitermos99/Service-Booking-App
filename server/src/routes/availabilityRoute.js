import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { createSlot, deleteSlot, updateSlot } from '../controllers/availabilityController.js';

const router = express.Router();

router.use(authMiddleware);
router.use(authorize('business'));

router.post('/', createSlot);
router.put('/:id', updateSlot);
router.delete('/:id', deleteSlot);

export default router;