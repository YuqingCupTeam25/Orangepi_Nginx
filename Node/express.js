const express = require('express');  // ���� Express ���
const app = express();  // ����һ�� Express Ӧ��

app.get('/', (req, res) => {  // ���ø�·���� GET ������
    res.send('Hello from Node.js!');  // ����һ���򵥵���Ϣ
});

app.listen(3000, () => {  // ���� 3000 �˿�
    console.log('Node.js server running on http://localhost:3000');
});
