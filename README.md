# Rick and Morty

[Тестовое задание](https://docs.google.com/document/d/1Vjf3nVHdcPo6ygDzWGlru_LALdj_mh2jiQWbrx00PYY/edit) на позицию Node.js Backend разработчик.

### Что делает скрипт

1. Устанавливает соединение с удаленной БД Postgrs
2. Создает таблицу в БД "Characters"
3. Ходит по ручке в сервис [RickAndMorty](https://rickandmortyapi.com/) получает персонажей
4. Сохраняет полученные данные в нашу БД

### Как запустить проект

1. Клонировать репозиторий

```bash
git clone https://github.com/Taashev/data-heroes-rick-and-morty.git
```

2. Переменные окружения для БД Postgres:

- PG_HOST
- PG_PORT
- PG_NAME
- PG_USER
- PG_PASSWORD

3. SSL-сертификат

Получить SSL-сертификат в яндекс облаке для успешного подключения к удаленной БД Postgres. Добавить сертификат в переменную окружения в закодированном виде base64.

Для этого необходимо прочитать данные из файла (сертификата) и передать их на кодирование

``` bash
cat <path-cart> | base64
```
запишите полученный результат в переменную окружения *PG_CERT_BASE64*

[Документация как получить SSL-сертификат](https://yandex.cloud/ru/docs/managed-postgresql/operations/connect?from=int-console-help-center-or-nav#get-ssl-cert)
