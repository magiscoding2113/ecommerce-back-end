const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
try {
  const tagData = await Tag.findAll({
    include: [
      {
        model: Product,
        attributes: [
          'product_name',
          'price',
          'stock',
          'category_id'
        ],
      }
    ],
  });
  res.status(200).json(tagData);
} catch(err){
  res.status(500).json(err);
} // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: [
            'product_name',
            'price',
            'stock',
            'category_id'
          ],
        },
      ],
    });
    res.status(200).json(dbTagData);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update (
    {
      tag_name: req.body.tagName,
    },
    {
      where:{
        id: req.params.id
      },
    }
  )
  .then((updatedTag) => {
    res.status(200).json(updatedTag);
  })
  .catch((err) => res.json(err));
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this ID!'});
      return;
    }
    res.status(200).json(tagData);
  }catch(err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
