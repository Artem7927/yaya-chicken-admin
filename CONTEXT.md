Правь на месте при изменении кода, НЕ дописывай.

## 1. Назначение
Админ-панель кафе YaYa Chicken: управление заказами и меню, назначение курьеров, пуши. Роли MANAGER/SUPERVISOR/ASSEMBLER.

## 2. Стек и точка входа
Vanilla HTML/CSS/JS, без сборки; PWA (manifest + service worker). Входная точка — index.html (корень репо = корень сайта); courier.html — отдельная страница курьера. server.js — Node/Express-бэкенд в репо, фронтом не используется (см. Готчи).

## 3. Структура
- index.html — вся админка: экран входа, Главная/Заказы/Курьеры/Меню/YaYa ТВ/Баннеры/YaYa Radio/Ещё + весь JS (заказы, курьеры, меню, ТВ, радио, баннеры, push-код).
- courier.html — автономный экран курьера: выбор имени, онлайна-тумблер с GPS, список назначенных заказов, кнопки «В пути»/«Доставлен».
- sw.js — service worker: кэш оболочки как офлайн-запаска (манифест и страница — всегда из сети), обработка push и клика по уведомлению (фокус на своём scope).
- manifest.json — PWA-манифест кабинета (start_url/scope ./index.html).
- icon-192.png / icon-512.png — иконки PWA.
- menu.js — модуль меню витрины (комментарий «витрина», ждёт #cats/#menu-content/#cartBar) — НИКУДА не подключается в этом репо; сюда не относится.
- server.js — мини-бэкенд Node/Express+Postgres: /kv*, /orders, /order, /next-order-num, /health. Без авторизации, на него не ссылается ни один файл фронта.

## 4. Публичные интерфейсы
Экраны index.html (вход → Main→Заказы→Курьеры→Меню→Ещё в ботнаве; ТВ/Баннеры/Radio открываются из «Ещё»):
- gate (вход) — POST /auth-check c заголовком X-Admin-Token; роль должна быть admin|MANAGER|SUPERVISOR|ASSEMBLER; без ключа — fallback-пароль 'yaya2024' из кода.
- Главная (s-home) — GET /orders?limit=100; статистика из ORDERS + GET /kv/yaya_order_couriers (наложения).
- Заказы (s-orders) — GET /orders?limit=100 (poll каждые 8с); вкладки new/cook/ready/deliv/done; POST /orders/:id/status; PUT /kv/yaya_order_couriers.
- Курьеры (s-couriers) — GET/PUT /kv/yaya_couriers; GET /kv/yaya_order_couriers; карта Leaflet + GET /kv/yaya_courier_pos.
- Меню (s-menu) — GET/PUT /kv/yaya_menu; fallback-прайс BASE_MENU в коде (меню из базы приоритетно); фото: POST /feed-upload → Cloudinary API → base64 в базу.
- YaYa ТВ (s-tv) — GET/PUT /kv/yaya_tv; превью из i.ytimg.com; настройки Cloudinary в localStorage (yaya_cloud/yaya_preset).
- Баннеры (s-banners) — GET/PUT /kv/yaya_banners; фото жмутся в браузере (1344×588) и кладутся в базу/Cloudinary.
- YaYa Radio (s-radio) — GET/PUT /kv/yaya_radio (волна, поздравления) + GET/PUT /kv/yaya_greet_req (заявки, poll 15с); аудио Cloudinary → f_mp3.
- Ещё (s-more) — только ТВ/Radio/Баннеры открывают экраны; Отзывы/Push-уведомления/Акции/Инвентарь/Настройки/Поддержка — заглушки (toast «добавим следующим шагом»).
- Push (фоновый) — GET /push/public-key, POST /push/subscribe (X-Admin-Token, body {role:'admin', sub}), GET /push/status, POST /push/test; активация тихой авто-подписки на первое касание.

Экраны courier.html:
- gate (выбор имени) — GET /kv/yaya_couriers; имя из localStorage yaya_courier_me.
- app (список) — GET /orders?limit=100 + GET/PUT /kv/yaya_order_couriers; online: watchPosition → PUT /kv/yaya_courier_pos (интервал 15с); самодобавление в /kv/yaya_couriers.

## 5. Внешние связи
Один бэкенд — yaya-db (https://yaya-db-production.up.railway.app, const API зашита в index.html:808 и courier.html:107). Запросы с заголовком X-Admin-Token (ключ из localStorage yaya_key, /auth-check). KV — межрепный контракт:
- yaya_menu — админ пишет, витрина (yaya-kitchen) читает.
- yaya_banners, yaya_tv, yaya_radio — админ пишет, витрина читает.
- yaya_greet_req — витрина пишет заявки, админ читает/закрывает.
- yaya_order_couriers, yaya_couriers, yaya_courier_pos — общие с курьером (yaya-chicken-courier): назначения↔, мастер-список↔, позиции: курьер пишет→админ показывает на карте.
- yaya_stock — читается при входе, в UI не выводится (см. Готчи).
Прочее: Leaflet 1.9.4 и Google Fonts (Bebas Neue/Nunito) с CDN; OSM-тайлы {s}.tile.openstreetmap.org; Cloudinary api.cloudinary.com (unsigned upload).

## 6. Готчи
- PWA: при ЛЮБОЙ правке .html бампать тег кэша в sw.js. Текущий тег дословно: `yaya-kabinet-v10` (зафиксирован как есть — у admin он в линейке yaya-kabinet-vNN, а не yaya-chicken-admin; это шов).
- API-база зашита в код (const API в index.html и courier.html); server.js в репо — мимо, на него фронт не смотрит.
- Сервер (yaya-db) — единственный источник правды: кухонные статусы идут очередью pending с повторными POST, назначения курьеров хранятся в KV (ORDER_COUR) и переживают перезагрузку.
- Вход: если ADMIN_TOKEN задан на сервере — пароль из кода не работает, решает /auth-check; разрешённые роли в гейте: admin|MANAGER|SUPERVISOR|ASSEMBLER.
- courier.html — копия функций yaya-chicken-courier внутри админ-репо: без sw/manifest (вне PWA), без X-Courier-Name/courier_token, пишет в KV напрямую.
- Push-UI: enablePush()/testPush() ссылаются на #notifStatus/#notifBtn/#notifDiag, которых в DOM нет — активно только молчаливое подписывание (armPushAuto → refreshPushSilently).
- /kv/yaya_stock читается (loadCouriers), но saveStock() нигде не вызывается и склад в интерфейсе не показывается.
- Кнопка «Новый заказ» и плитки «Ещё» — заглушки-тосты, кроме ТВ/Radio/Баннеры.
- Время поздравлений/баннеров хранится без часовых поясов (админ и гости в одном городе); поздравления старше 15 мин до эфира не принимаются.
- Файлы: UTF-8 без BOM, окончания строк CRLF (не смешивать при правках).

TODO(owner):
- courier.html: мёртвый дубль — ссылок в коде нет (только CONTEXT.md), под снос отдельной задачей.
- server.js: Node/Express в репо, фронтом не используется — оставлен намеренно.
- push-экран: JS updateNotifUI/enablePush/testPush ссылаются на #notifStatus/#notifBtn/#notifDiag, которых нет в DOM; guard не роняет. Судьба не решена (TODO owner).
