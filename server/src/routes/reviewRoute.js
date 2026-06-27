import express from 'express';
import { 
	createReview, 
	updateReview, 
	deleteReview,
	getUserReviewsStats,
	getUserPendingReviews,
	replyToUserReview,
	deleteReplyToUserReview
} from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/pending-reviews', authorize('customer'), getUserPendingReviews);
router.get('/reviews-info', authorize('customer'), getUserReviewsStats);
router.post('/', authorize('customer'), createReview);
router.put('/:id', authorize('customer'), updateReview);
router.delete('/:id', authorize('customer'), deleteReview);

router.post('/:id/reply', authorize('business'), replyToUserReview);
router.delete('/:id/reply', authorize('business'), deleteReplyToUserReview);

export default router;