module.exports = {
   welcome: (user) => {
      let { email, first_name } = user;

      return {
         to: email,
         from: 'My Project <myproject@system.com>',
         subject: 'Bem-Vindo',
         template: 'auth/welcome',
         context: { first_name }
      }
   },

   forgotPassword: (user, token) => {
      let { email } = user;

      return {
         to: email,
         from: 'My Project <myproject@system.com>',
         subject: 'Recuperação de senha My Project',
         template: 'auth/forgot_password',
         context: { token }
      }
   },

   projectLate: ({ project, first_name, email, days }) => {
      let { title, id } = project;
      return {
         to: email,
         from: 'My Project <myproject@system.com>',
         subject: 'Projeto Vencido',
         template: 'auth/project_late',
         context: { first_name , title, id, days }
      }
   },

   projectExpiring: ({ project, first_name, email, formatedDays }) => {
      let { title, id } = project;
      return {
         to: email,
         from: 'My Project <myproject@system.com>',
         subject: 'Projeto Expirando',
         template: 'auth/project_expiring',
         context: { first_name , title, id, formatedDays }
      }
   },

   projectExpiresToday: ({ project, first_name, email }) => {
      let { title, id } = project;
      return {
         to: email,
         from: 'My Project <myproject@system.com>',
         subject: 'Projeto expirando hoje',
         template: 'auth/project_expires_today',
         context: { first_name , title, id}
      }
   }
}
