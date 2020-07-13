const Project = require('../models/Project');
const User = require("../models/User");

module.exports = {
   view: async (req, res) => {
      try {
         const sub = req.user.sub;
         // if user doesn't exist, create
         const verifyUser = await User.findOne({ where: { sub } });

         if (!verifyUser) {
            const registerUser = await User.create({
               sub
            });

            if (registerUser){
               console.info(`User ${sub} registered!`)
            }
         }

         const userProjects = await Project.findAll({
            where: { sub_fk: sub },
            include: { association: 'tasks' }
         });
         return res.status(200).json(userProjects)

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      };
   },

   findOne: async (req, res) => {
      try {
         const { projectid } = req.params;

         const userProjects = await Project.findOne({
            where: { id: projectid },
            include: { association: 'tasks' }
         });

         return res.status(200).json(userProjects)

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      };
   },

   viewById: async (req, res) => {
      try {
         const sub = req.user.sub;
         const project_id = req.params.projectid;

         const project = await Project.findByPk(project_id);

         if(project.sub_fk != sub){
            return res.status(401).json({ error: 'Unathorized operation' });
         }

         return res.status(201).json(project)

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      };
   },
   
   create: async (req, res) => {
      try {
         const { title, description, completion_date, status } = req.body;
         const sub = req.user.sub;

         const projectCreated = await Project.create({
            sub_fk: sub,
            title,
            description,
            completion_date,
            status
         });

         return res.status(201).json(projectCreated);

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      };
   },

   patch: async (req, res) => {
      try {
         const { title, description, status } = req.body;
         const { projectid } = req.params;
         const sub = req.user.sub;

         const project = await Project.findByPk(projectid);

         if(project.sub_fk != sub) {
            return res.status(403).json({ error: 'Unathorized operation' });
         };

         await Project.update({ title, description, status }, {
            where: {
               id: projectid,
               sub
            }
         });

         return res.status(200).json({ ok: true });

      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      }
   },
   
   dalete: async (req, res) => {
      try {
         const { projectid } = req.params;
         const user = req.user;
   
         const project = await Project.findByPk(projectid);
   
         if(!project || project.user_id != user.id) {
           return res.status(403).json({ error: 'Unathorized operation' });
         };
            
         await Project.destroy({
           where: {
             id: projectid
           }
         });
   
         return res.status(200).json({ ok: true });
   
      } catch (err) {
         console.error(err);
         return res.status(400).json({ error: err });
      }
   }
};
