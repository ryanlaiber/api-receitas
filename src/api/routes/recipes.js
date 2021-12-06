const express = require('express');
const path = require('path');
const multer = require('multer');
const Auth = require('../controllers/auth');
const RecipesController = require('../controllers/recipes');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', Auth, RecipesController.create);
router.get('/', RecipesController.getAll);
router.get('/:id', RecipesController.getById);
router.put('/:id', Auth, RecipesController.updateById);
router.delete('/:id', Auth, RecipesController.deleteById);
router.put('/:id/image', Auth, upload.single('image'), RecipesController.updateImageById);

module.exports = router;
