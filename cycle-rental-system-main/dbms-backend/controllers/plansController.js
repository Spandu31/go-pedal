import Plan from '../models/planModel.js';


export async function getAllPlans(_req, res) {
    try {
      const plans = await Plan.findAll();
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching plans', error });
    }
  }
  
  export async function createPlan(req, res) {
    const { name, price, duration_days } = req.body;
    try {
      const plan = await Plan.create({ name, price, duration_days });
      res.status(201).json(plan);
    } catch (error) {
      res.status(500).json({ message: 'Error creating plan', error });
    }
  }
  
