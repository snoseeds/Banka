import app from './app';

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at ${PORT}`);
});
