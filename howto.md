1) Генерируем ключ:
> openssl genrsa -des3 -out tetris.loc.key 2048
2) Генерируем сертификат:
> openssl req -key tetris.loc.key -new -out tetris.loc.csr
3) Подписываем:
> openssl x509 -signkey tetris.loc.key -in tetris.loc.csr -req -days 365 -out tetris.loc.crt