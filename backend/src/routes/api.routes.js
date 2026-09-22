import { Router } from 'express';
import { submitContact, submitInquiry, getFeatures, getStats } from '../controllers/api.controller.js';

const router = Router();

router.post('/contact', submitContact);
router.post('/inquiries', submitInquiry);
router.get('/features', getFeatures);
router.get('/stats', getStats);

export default router;

