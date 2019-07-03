const mockQuestions = [
  {
    maxScore: 1,
    title: 'Ble stab, cast og kunde tilbudt vegetarisk eller vegansk catering?'
  },
  {
    maxScore: 2,
    title:
      'Catering: Ble det brukt gjenbrukbart/organisk bestikk, glass, kopper, tallerkner, duker, servietter?'
  }
];

const Agency = require('../models/Agency');
const Form = require('../models/Form');
const Production = require('../models/Production');

const { handleError } = require('../utils/');

const getProductions = async (req, res, next) => {
  try {
    const productions = await Agency.findById(
      req.decodedToken.agencyId,
      'agencyName productions'
    ).populate({
      path: 'productions',
      model: 'Production',
      select: 'productionName form'
    });

    res.send(productions);
  } catch (err) {
    handleError(err, next);
  }
};

const createProduction = async (req, res, next) => {
  const { productionName } = req.body;

  if (!productionName) {
    res.status(400).send('Missing production name');
  } else {
    try {
      // const questions = await cmsController.getListBlueprintInternal();
      const { _id: formId } = await Form.create({ questions: mockQuestions });

      const production = await Production.create({
        productionName,
        form: formId
      });

      await Agency.findByIdAndUpdate(req.decodedToken.agencyId, {
        $push: { productions: production._id }
      });

      res.send(production);
    } catch (err) {
      handleError(err, next);
    }
  }
};

module.exports = { getProductions, createProduction };
