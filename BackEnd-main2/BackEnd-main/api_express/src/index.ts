import server from './server';

const PORT = process.env.PORT || 3040;

server.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});