const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.body.userId;
        const dir = path.join(__dirname, 'public/img/perfis', userId, 'fotoPerfil');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `fotoPerfil${ext}`);
    }
});

const upload = multer({ storage });

app.post('/uploadPerfil', upload.single('photo'), (req, res) => {
    const userId = req.body.userId;
    const ext = path.extname(req.file.originalname);
    const url = `/img/perfis/${userId}/fotoPerfil/fotoPerfil${ext}`;
    res.json({ url });
});

const storagePub = multer.diskStorage({
    destination: (req, file, cb) => {
        const { userId, pubId } = req.body;
        const dir = path.join(__dirname,
            'public/img/perfis',
            userId,
            'publicacoes',
            pubId,
            'img'
        );
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `publicacao${ext}`);
    }
});
const uploadPub = multer({ storage: storagePub });

app.post('/uploadPublicacao', uploadPub.single('photo'), (req, res) => {
    const { userId, pubId } = req.body;
    const ext = path.extname(req.file.originalname);
    const url = `/img/perfis/${userId}/publicacoes/${pubId}/img/publicacao${ext}`;
    res.json({ url });
});

app.use('/img', express.static(path.join(__dirname, 'public/img')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
