import express from 'express';
import { createService, getService, getServicesBusiness, getServices, updateService, deleteService } from '../controllers/serviceController.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:id', getService);
router.get('/all-services', getServices);
router.get('/', authorize('business'), getServicesBusiness);
router.post('/', authorize('business'), createService);
router.put('/:id', authorize('business'), updateService);
router.delete('/:id', authorize('business'), deleteService);

export default router;