const router = require('express').Router();
const {
	getAllThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router
	.route('/:thoughtId')
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

router.route('/:thoughtId/reaction').post(createReaction);

router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;