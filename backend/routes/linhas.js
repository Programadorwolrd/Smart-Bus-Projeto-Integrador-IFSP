var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get('/listar', async (req, res) => {
  try {
    const linha = await prisma.linha.findMany(); 
    res.status(200).json(linha);
  } catch (error) {
    console.error('Erro ao buscar linhas:', error);
    res.status(500).send('Erro ao buscar linhas');
  }
});

// no gpt: envia o codigo do schema prisma, "express prisma rota/endpoint para ..."
// quando gerar o codigo trocar de app.js para router.get





// cadastrar linha
router.post('/cadastrar', async (req, res) => {
  try {
    // Recupere os dados da solicitação do corpo
    const { nome, origem, destino, horarioPartida, duracao } = req.body;

    // Crie uma nova linha de ônibus no banco de dados
    const novaLinha = await prisma.linha.create({
      data: {
        nome,
        origem,
        destino,
        horarioPartida,
        duracao,
      },
    });

    res.status(201).json(novaLinha);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



// atualizar o linha 
router.put('/atualizar/:id', async (req, res) => {
  try {
    const linhaId = parseInt(req.params.id);
    const { nome, origem, destino, horarioPartida, duracao } = req.body;

    // Verifique se a linha existe antes de tentar atualizá-la
    const linhaExistente = await prisma.linha.findUnique({
      where: { id: linhaId },
    });

    if (!linhaExistente) {
      return res.status(404).json({ error: 'Linha não encontrada' });
    }

    // Atualize as informações da linha express no banco de dados
    const linhaAtualizada = await prisma.linha.update({
      where: { id: linhaId },
      data: {
        nome,
        origem,
        destino,
        horarioPartida,
        duracao,
      },
    });

    res.status(200).json(linhaAtualizada); // Retorna a linha atualizada como resposta
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});








// deletar o linha completo funcional
router.delete('/excluir/:id', async (req, res) => {
  try {
    const linhaId = parseInt(req.params.id);

    // Verifique se a linha existe antes de tentar excluí-la
    const linhaExistente = await prisma.linha.findUnique({
      where: { id: linhaId },
    });

    if (!linhaExistente) {
      return res.status(404).json({ error: 'Linha não encontrada' });
    }

    // Exclua a linha express do banco de dados
    await prisma.linha.delete({
      where: { id: linhaId },
    });

    res.status(204).send(); // Retorna uma resposta vazia para indicar que a exclusão foi bem-sucedida
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});












// buscar um linhas por id

module.exports = router;
