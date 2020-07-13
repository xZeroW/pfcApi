const app = require('./app.js');
const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  if (err) throw err
  console.info(`Server is runnig on port: ${PORT}`);
});
