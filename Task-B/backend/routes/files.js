const express = require('express');
const auth    = require('../middleware/auth');
const upload  = require('../utils/storage');
const fc      = require('../controllers/fileController');
const router  = express.Router();

router.use(auth);
router.post('/upload',    upload.single('file'), fc.upload);
router.get ('/',          fc.list);
router.put ('/:id/rename', fc.rename);
router.delete('/:id',      fc.delete);

module.exports = router;
