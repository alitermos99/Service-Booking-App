import express from 'express';
import { 
	createReview, 
	updateReview, 
	deleteReview,
	getUserReviewsStats,
	getUserPendingReviews
} from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(authorize('customer'));

router.get('/pending-reviews', getUserPendingReviews);
router.get('/reviews-info', getUserReviewsStats);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;