const Project = require('../models/Project');
const moment = require('moment');

const createEmail = require('../functions/createEmail');
const mailer = require('../../modules/mailer');

module.exports = async () => {
  const projects = await Project.findAll({
    include: 'user'
  });
  const now = moment(new Date()); 

  projects.map(async (project) => {
    const past = moment(project.completion_date); 

    const duration = moment.duration(now.diff(past));

    const days = Math.round(duration.asDays());
    const formatedDays = Math.abs(days);

    if (days > 0){
      const { email, first_name } = project.user;

      return await mailer.sendMail(createEmail.projectLate({ project, first_name, email, formatedDays }));

    }else if(days < 0 && days > -4){
      const { email, first_name } = project.user;
      
      return await mailer.sendMail(createEmail.projectExpiring({ project, first_name, email, formatedDays }));

    }else if(days == 0){
      const { email, first_name } = project.user;

      return await mailer.sendMail(createEmail.projectExpiresToday({ project, first_name, email }));

    }else{
      return;
    }
  });
}