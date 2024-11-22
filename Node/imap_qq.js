const Imap = require('imap');
const { simpleParser } = require('mailparser');

const imapConfig = {
    user: '1023219342@example.com', // �����˺�
    password: 'dbuxpaqkyplybefc',     // �������루��Ӧ�����룩
    host: 'imap.qq.com',      // IMAP ��������ַ
    port: 993,                     // IMAP �˿ں�
    tls: true,                     // ʹ�ü���
};

const imap = new Imap(imapConfig);

function openInbox(cb) {
    imap.openBox('INBOX', false, cb); // ���ռ���
}

imap.once('ready', function () {
    console.log('IMAP connection ready.');
    openInbox(function (err, box) {
        if (err) throw err;

        // ����δ���ʼ�
        imap.search(['UNSEEN'], function (err, results) {
            if (err) throw err;

            if (!results || results.length === 0) {
                console.log('No unread emails found.');
                imap.end();
                return;
            }

            const fetch = imap.fetch(results, { bodies: '' });

            fetch.on('message', function (msg) {
                console.log('Processing new email...');

                msg.on('body', function (stream) {
                    simpleParser(stream, (err, parsed) => {
                        if (err) throw err;

                        // ��ӡ�ʼ�����
                        console.log(`Subject: ${parsed.subject}`);
                        console.log(`From: ${parsed.from.text}`);
                        console.log(`Body: ${parsed.text}`);
                    });
                });
            });

            fetch.once('end', function () {
                console.log('Done fetching all unread emails.');
                imap.end();
            });
        });
    });
});

imap.once('error', function (err) {
    console.log(err);
});

imap.once('end', function () {
    console.log('IMAP connection ended.');
});

imap.connect();