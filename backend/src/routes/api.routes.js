import { Router } from 'express';
import { submitInquiry, getFeatures, getStats } from '../controllers/api.controller.js';

const router = Router();

router.post('/inquiries', submitInquiry);
router.get('/features', getFeatures);
router.get('/stats', getStats);

export default router;
