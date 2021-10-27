const router = require('express').Router();
const { Card } = require('../../models/card');

router.post('/', async (req, res) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCard);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cardData = await Card.destroy({
      where: {
        name: req.params.name,
        user_id: req.session.user_id,
      },
    });

    if (!cardData) {
      res.status(404).json({ message: 'No card found with this id!' });
      return;
    }

    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
