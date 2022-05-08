const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
        attributes: [
          'id',
          'product name',
          'price',
          'stock',
          'category_id'
        ],
      }]
    });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
 
});


router.get('/:id', async (req, res) => {
  try {
    const dbcategoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
          ],
        },
      ],
    });
  res.status(200).json(dbcategoryData);
  }catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err) {
    res.status(400).json(err);
  }

});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name:req.body.categoryName,
    },
    {
    where: {
      id:req.params.id
    },
    }
  )
  .then((updatedCategory) => {
    res.status(200).json(updatedCategory);
  })
  .catch((err) => res.json(err));

});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {id: req.params.id}
    });
    if(!categoryData) {
      res.status(404).json({message: 'No category with this ID found!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
