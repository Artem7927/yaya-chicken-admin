/* ══════════════════════════════════════════════════════════════════════
   YaYa Chicken · витрина: меню и карточка товара
   • плитка — фото на всю карточку, название, состав и цена ПОВЕРХ фото
   • тап по плитке открывает товар на весь экран
   • длинный состав разворачивается тапом
   Разметка сохранена: разделы «sec-<id категории>», кнопки .cat-btn,
   плитки .item-card / .item-wide, кнопка «+» в #add-<id товара>.
   Поэтому showCat, menuPhotos и поиск из index.html работают как прежде.
   ══════════════════════════════════════════════════════════════════════ */

// ── МЕНЮ (запасное: показывается, пока не пришло меню из кабинета) ────
let MENU = [
  {id:'sets',name:'Сеты',emoji:'🎁',wide:true,items:[
    {id:'s1',name:'SET (Большой)',price:10290,desc:'крылышки 20 шт, ножки 30 шт, фри 2л, Coca Cola 2л'},
    {id:'s2',name:'SET (Средний)',price:5890,desc:'крылышки 30 шт'},
    {id:'s3',name:'КОМБО ПИЦЦА',price:14390,desc:'Пицца Ранч, Пицца 4 сыра, пицца на палочке, фри 2л, Coca Cola 2л'},
    {id:'s4',name:'КОМБО СЕМЕЙНЫЙ',price:16390,desc:'крылышки 30 шт, фри 2л, Coca Cola 2л, соус'},
    {id:'s5',name:'ДЕТСКОЕ МЕНЮ',price:2690,desc:'наггетсы 7 шт, фри, сок 0.2л, крылышки 2 шт'}
  ]},
  {id:'wings',name:'Крылышки и стрипсы',emoji:'🍗',wide:false,items:[
    {id:'w6',name:'Крылышки 30 шт',price:5890,desc:'30 штук'},
    {id:'w7',name:'Крылышки 20 шт',price:4490,desc:'20 штук'},
    {id:'w8',name:'Крылышки 8 шт',price:2390,desc:'8 штук'},
    {id:'w9',name:'Стрипсы 20 шт',price:4790,desc:'стрипсы 20 штук'},
    {id:'w10',name:'Стрипсы 14 шт',price:3390,desc:'стрипсы 14 штук'},
    {id:'w11',name:'Стрипсы 7 шт',price:2090,desc:'стрипсы 7 штук'}
  ]},
  {id:'snacks',name:'Закуски',emoji:'🍟',wide:false,items:[
    {id:'s12',name:'Наггетсы 7 шт',price:990,desc:'наггетсы 7 штук'},
    {id:'s13',name:'Сырные палочки 5 шт',price:1790,desc:'сырные палочки 5 штук'},
    {id:'s14',name:'Фри',price:790,desc:'картошка фри'}
  ]},
  {id:'burgers',name:'Бургеры',emoji:'🍔',wide:false,items:[
    {id:'b15',name:'Гамбургер говяжий',price:1490,desc:'бургер из говядины'},
    {id:'b16',name:'Гамбургер куриный',price:1390,desc:'бургер из курицы'},
    {id:'b17',name:'Чизбургер говяжий',price:1590,desc:'чизбургер из говядины'},
    {id:'b18',name:'Чизбургер куриный',price:1490,desc:'чизбургер из курицы'},
    {id:'b19',name:'Гамбургер x2 говяжий',price:1690,desc:'двойной бургер из говядины'},
    {id:'b20',name:'Гамбургер x2 куриный',price:1690,desc:'двойной бургер из курицы'},
    {id:'b21',name:'Чизбургер x2 говяжий',price:1890,desc:'двойной чизбургер из говядины'},
    {id:'b22',name:'Чизбургер x2 куриный',price:1890,desc:'двойной чизбургер из курицы'},
    {id:'b23',name:'Гамбургер MIX',price:1790,desc:'смешанный бургер говядина+курица'},
    {id:'b24',name:'Чизбургер MIX',price:1990,desc:'смешанный чизбургер говядина+курица'},
    {id:'b25',name:'Гамбургер x2 MIX',price:2090,desc:'двойной смешанный бургер'},
    {id:'b26',name:'КОМБО ЧИЗБУРГЕР (Говяжий)',price:2790,desc:'бургер из говядины + фри + Coca Cola'},
    {id:'b27',name:'КОМБО ЧИЗБУРГЕР (Куриный)',price:2690,desc:'бургер из курицы + фри + Coca Cola'},
    {id:'b28',name:'БИГ КОМБО (Говяжий)',price:9990,desc:'бургер из говядины + крылышки 3 шт + фри + Coca Cola'},
    {id:'b29',name:'БИГ КОМБО (Куриный)',price:9790,desc:'бургер из курицы + крылышки 3 шт + фри + Coca Cola'},
    {id:'b30',name:'КОМБО НА ДВОИХ (Говяжий)',price:6590,desc:'бургер из говядины + крылышки 8 шт + фри + соус + Coca Cola'},
    {id:'b31',name:'КОМБО НА ДВОИХ (Куриный)',price:6390,desc:'бургер из курицы + крылышки 8 шт + фри + соус + Coca Cola'}
  ]},
  {id:'doners',name:'Донеры',emoji:'🌯',wide:false,items:[
    {id:'d32',name:'Донер куриный',price:1590,desc:'донер из курицы'},
    {id:'d33',name:'Донер говяжий',price:1790,desc:'донер из говядины'},
    {id:'d34',name:'Донер MIX',price:1690,desc:'смешанный донер'},
    {id:'d35',name:'Багет куриный',price:1790,desc:'багет с курицей'},
    {id:'d36',name:'Багет говяжий',price:1990,desc:'багет с говядиной'},
    {id:'d37',name:'Багет MIX',price:1890,desc:'смешанный багет'},
    {id:'d38',name:'ДОНЕР КОМБО (Говяжий)',price:2790,desc:'донер из говядины + фри + Coca Cola 0.5л'},
    {id:'d39',name:'ДОНЕР КОМБО (Куриный)',price:2790,desc:'донер из курицы + фри + Coca Cola 0.5л'},
    {id:'d40',name:'ДОНЕР MIX КОМБО',price:2790,desc:'смешанный донер + фри + Coca Cola 0.5л'},
    {id:'d41',name:'КОМБО БАГЕТ (Куриный)',price:2790,desc:'багет с курицей + фри + Coca/Soda 0.5л'},
    {id:'d42',name:'КОМБО БАГЕТ (Говяжий)',price:2990,desc:'багет с говядиной + фри + Coca/Soda 0.5л'},
    {id:'d43',name:'БАГЕТ MIX КОМБО',price:2890,desc:'смешанный багет + фри + Coca/Soda 0.5л'},
    {id:'d44',name:'КОМБО ЕКУЕҮ (Говяжий донер)',price:7090,desc:'донер из говядины 2 шт + крылышки 8 шт + фри + Coca Cola 0.5л'},
    {id:'d45',name:'КОМБО НА ДВОИХ (Куриный донер)',price:6890,desc:'донер из курицы 2 шт + крылышки 8 шт + фри + Coca Cola 0.5л'}
  ]},
  {id:'pizza',name:'Пицца',emoji:'🍕',wide:false,items:[
    {id:'p46',name:'Пицца YaYa',price:2990,desc:'фирменная пицца YaYa'},
    {id:'p47',name:'Пицца Ранч',price:2990,desc:'пицца Ранч'},
    {id:'p48',name:'Пицца Филадельфия',price:3290,desc:'пицца Филадельфия'},
    {id:'p49',name:'Пицца BBQ',price:3190,desc:'пицца BBQ'},
    {id:'p50',name:'Пицца Фаро',price:3190,desc:'пицца Фаро'},
    {id:'p51',name:'Пицца 4 сыра',price:2990,desc:'пицца четыре сыра'},
    {id:'p52',name:'Пицца Курица с грибами',price:2690,desc:'пицца с курицей и грибами'},
    {id:'p53',name:'Пицца Пепперони',price:2790,desc:'пицца пепперони'},
    {id:'p54',name:'Пицца Маргарита',price:2290,desc:'пицца маргарита'},
    {id:'p55',name:'Пицца Маргарита-Пепперони',price:2990,desc:'пицца маргарита пепперони'},
    {id:'p56',name:'Пицца Мексиканская острая',price:2990,desc:'острая мексиканская пицца'},
    {id:'p57',name:'Пицца 4 сезона',price:2690,desc:'пицца четыре сезона'},
    {id:'p58',name:'Сладкая пицца Банан-Банан',price:2690,desc:'сладкая пицца с бананом'},
    {id:'p59',name:'КОМБО ПИЦЦА',price:14390,desc:'Пицца Ранч + Пицца 4 сыра + пицца на палочке + фри 2л + Coca Cola 2л'}
  ]},
  {id:'bliny',name:'Блины',emoji:'🥞',wide:false,items:[
    {id:'b60',name:'Блин Творожная вишня',price:890,desc:'сладкий блин с творогом и вишней'},
    {id:'b61',name:'Блин Клубничный джем',price:890,desc:'сладкий блин с клубничным джемом'},
    {id:'b62',name:'Блин Медовый орех',price:590,desc:'сладкий блин с медом и орехами'},
    {id:'b63',name:'Блин Шоколад',price:590,desc:'сладкий блин с шоколадом'},
    {id:'b64',name:'Блин Клубничный',price:590,desc:'сладкий блин с клубникой'},
    {id:'b65',name:'Блин Тропикано',price:1190,desc:'тропический сладкий блин'},
    {id:'b66',name:'Блин Творожный',price:590,desc:'блин с творогом'},
    {id:'b67',name:'Блин Банановое наслаждение',price:890,desc:'сладкий блин с бананом'},
    {id:'b68',name:'Блин с маслом',price:200,desc:'сытный блин с маслом'},
    {id:'b69',name:'Блин со сметаной',price:300,desc:'сытный блин со сметаной'},
    {id:'b70',name:'Блин с сыром',price:690,desc:'сытный блин с сыром'},
    {id:'b71',name:'Блин с яйцом',price:790,desc:'сытный блин с яйцом'},
    {id:'b72',name:'Блин с мясом',price:1150,desc:'сытный блин с мясом'},
    {id:'b73',name:'Блин с курицей',price:1150,desc:'сытный блин с курицей'},
    {id:'b74',name:'Блин деревенский',price:1250,desc:'деревенский сытный блин'},
    {id:'b75',name:'Блин с грибами',price:1250,desc:'сытный блин с грибами'},
    {id:'b76',name:'Блин дуэт',price:1090,desc:'блин дуэт'},
    {id:'b77',name:'Блин Курочка Ряба',price:1090,desc:'блин Курочка Ряба'},
    {id:'b78',name:'Блин гурман',price:1150,desc:'блин гурман'}
  ]},
  {id:'drinks',name:'Напитки',emoji:'🥤',wide:false,items:[
    {id:'d79',name:'Coca Cola 1л',price:790,desc:'Coca Cola 1 литр'},
    {id:'d80',name:'Coca Cola 0.5л',price:490,desc:'Coca Cola 0.5 литра'},
    {id:'d81',name:'Sprite 1л',price:790,desc:'Sprite 1 литр'},
    {id:'d82',name:'Sprite 0.5л',price:490,desc:'Sprite 0.5 литра'},
    {id:'d83',name:'Fanta 1л',price:790,desc:'Fanta 1 литр'},
    {id:'d84',name:'Fanta 0.5л',price:490,desc:'Fanta 0.5 литра'},
    {id:'d85',name:'Fuse Tea 1л',price:790,desc:'Fuse Tea 1 литр'},
    {id:'d86',name:'Fuse Tea 0.5л',price:490,desc:'Fuse Tea 0.5 литра'}
  ]},
  {id:'coffee',name:'Кофе',emoji:'☕',wide:false,items:[
    {id:'c87',name:'Американо',price:890,desc:'американо 0.2/0.3/0.4мл'},
    {id:'c88',name:'Капучино',price:990,desc:'капучино'},
    {id:'c89',name:'Латте',price:1190,desc:'латте'},
    {id:'c90',name:'Латте Маккиато',price:1190,desc:'латте маккиато'},
    {id:'c91',name:'Горячий шоколад',price:1290,desc:'горячий шоколад'}
  ]},
  {id:'cocktails',name:'Коктейли',emoji:'🍦',wide:false,items:[
    {id:'c92',name:'Коктейль молочный',price:1190,desc:'молочный коктейль'},
    {id:'c93',name:'Коктейль шоколадный',price:1290,desc:'шоколадный коктейль'},
    {id:'c94',name:'Коктейль клубничный',price:1290,desc:'клубничный коктейль'},
    {id:'c95',name:'Коктейль Сникерс',price:1290,desc:'коктейль Сникерс'},
    {id:'c96',name:'Коктейль Баунти',price:1290,desc:'коктейль Баунти'},
    {id:'c97',name:'Коктейль Орео',price:1290,desc:'коктейль Орео'},
    {id:'c98',name:'Коктейль банановый',price:1290,desc:'банановый коктейль'}
  ]},
  {id:'mohito',name:'Мохито',emoji:'🍹',wide:false,items:[
    {id:'m99',name:'Мохито Классик 1л',price:1390,desc:'мохито классик 1 литр'},
    {id:'m100',name:'Мохито Клубника 1л',price:1490,desc:'мохито клубника 1 литр'},
    {id:'m101',name:'Мохито Малина 1л',price:1490,desc:'мохито малина 1 литр'}
  ]},
  {id:'lemonade',name:'Лимонад',emoji:'🍋',wide:false,items:[
    {id:'l102',name:'Лимонад Классик 1л',price:1390,desc:'лимонад классик 1 литр'},
    {id:'l103',name:'Лимонад Цитрус 1л',price:1490,desc:'лимонад цитрус 1 литр'},
    {id:'l104',name:'Лимонад Киви 1л',price:1490,desc:'лимонад киви 1 литр'},
    {id:'l105',name:'Лимонад Клубника-Маракуйя 1л',price:1590,desc:'лимонад клубника-маракуйя 1 литр'},
    {id:'l106',name:'Лимонад Киви-Маракуйя 1л',price:1590,desc:'лимонад киви-маракуйя 1 литр'},
    {id:'l107',name:'Лимонад Ягодный 1л',price:1490,desc:'лимонад ягодный 1 литр'}
  ]},
  {id:'sauces',name:'Соусы',emoji:'🫙',wide:false,items:[
    {id:'s108',name:'Соус сырный',price:150,desc:'сырный соус'},
    {id:'s109',name:'Соус томатный',price:150,desc:'томатный соус'},
    {id:'s110',name:'Соус халапеньо',price:150,desc:'соус халапеньо'},
    {id:'s111',name:'Сырный кетчуп',price:150,desc:'сырный кетчуп'}
  ]}
];

// ── Мелкие помощники ─────────────────────────────────────────────────
const yyEsc = s => String(s == null ? '' : s)
  .replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yyPrice = n => (Number(n) || 0).toLocaleString('ru') + ' тг';
let yyOpenId = null;                       // товар, открытый на весь экран

// ── Поиск позиции по id ───────────────────────────────────────────────
function findItem(id) {
  for (const cat of MENU) {
    const item = (cat.items || []).find(i => i.id === id);
    if (item) return { ...item, emoji: cat.emoji || '' };
  }
  return null;
}

// ── Стили карточки и полноэкранного товара ────────────────────────────
(function yyStyles() {
  if (document.getElementById('yy-card-css')) return;
  const st = document.createElement('style');
  st.id = 'yy-card-css';
  st.textContent = `
  /* плитка: фото на всю карточку, текст поверх фото */
  .item-card{position:relative;aspect-ratio:1/1.24;background:var(--panel);
    -webkit-tap-highlight-color:transparent;cursor:pointer}
  .item-card .item-img-placeholder{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto}
  .item-card .item-img-placeholder::before{content:"";position:absolute;inset:0;z-index:1;
    background:linear-gradient(to top,rgba(0,0,0,.93) 0%,rgba(0,0,0,.74) 30%,rgba(0,0,0,.14) 62%,transparent 100%)}
  .item-card .item-info{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:10px 11px 11px}
  .item-card .item-name{min-height:unset;margin-bottom:2px;color:#fff;font-size:13.5px;
    text-shadow:0 1px 6px rgba(0,0,0,.65);display:-webkit-box;-webkit-line-clamp:2;
    -webkit-box-orient:vertical;overflow:hidden}
  .item-card .item-desc{font-size:11px;font-weight:700;color:#CFC8BC;line-height:1.3;margin-bottom:2px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .item-card .item-price{font-size:17px;text-shadow:0 1px 6px rgba(0,0,0,.65)}
  .item-card .item-add-row{margin-top:5px}
  .item-card .btn-add{width:38px;height:38px;font-size:22px;box-shadow:0 4px 14px rgba(0,0,0,.5)}
  .item-card .soldout{margin:0 0 2px}
  /* счётчик на плитке — компактной золотой пилюлей */
  .item-card .qty-control{gap:0;background:var(--gold);border-radius:20px;padding:2px;
    box-shadow:0 4px 14px rgba(0,0,0,.5)}
  .item-card .qty-btn{width:32px;height:34px;border:none;background:transparent;color:#111;font-size:20px}
  .item-card .qty-num{color:#111;min-width:18px}
  .item-wide{cursor:pointer}

  `;
  document.head.appendChild(st);
})();

// ── Обновление кнопки + / счётчика (плитка и открытый товар) ─────────
function updateCard(id) {
  const qty = (typeof cart !== 'undefined' && cart[id]) || 0;
  const html = qty === 0
    ? `<button class="btn-add" onclick="addItem('${id}')">+</button>`
    : `<div class="qty-control">
      <button class="qty-btn" onclick="removeItem('${id}')">−</button>
      <span class="qty-num">${qty}</span>
      <button class="qty-btn" onclick="addItem('${id}')">+</button>
    </div>`;
  const el = document.getElementById('add-' + id);
  if (el) el.innerHTML = html;
  const foot = document.getElementById('yyFullAdd');
  if (foot && yyOpenId === id) foot.innerHTML = html;
}

// ── Обновление плавающей кнопки корзины ──────────────────────────────
function updateCartBar() {
  const { total, count } = getStats();
  const bar = document.getElementById('cartBar');
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = total.toLocaleString('ru') + ' тг';
  bar.classList.toggle('visible', count > 0);
}

// ── Рендер меню ───────────────────────────────────────────────────────
function renderMenu() {
  const catsEl = document.getElementById('cats');
  MENU.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (i === 0 ? ' active' : '');
    btn.textContent = cat.name;
    btn.onclick = () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('sec-' + cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    catsEl.appendChild(btn);
  });

  const content = document.getElementById('menu-content');
  MENU.forEach(cat => {
    const sec = document.createElement('div');
    sec.className = 'section';
    sec.id = 'sec-' + cat.id;
    sec.innerHTML = `<div class="section-title">${yyEsc(cat.name)}</div>`;

    if (cat.wide) {
      const list = document.createElement('div');
      list.className = 'items-list';
      cat.items.forEach(item => {
        list.innerHTML += `
          <div class="item-wide" onclick="openProduct('${yyEsc(item.id)}')">
            <div class="item-img-placeholder"></div>
            <div class="item-wide-info">
              <div class="item-name">${yyEsc(item.name)}</div>
              ${item.desc ? `<div class="item-wide-desc">${yyEsc(item.desc)}</div>` : ''}
              <div class="item-wide-bottom">
                <div class="item-price">${yyPrice(item.price)}</div>
                <div id="add-${yyEsc(item.id)}" onclick="event.stopPropagation()"><button class="btn-add" onclick="addItem('${yyEsc(item.id)}')">+</button></div>
              </div>
            </div>
          </div>`;
      });
      sec.appendChild(list);
    } else {
      const grid = document.createElement('div');
      grid.className = 'items-grid';
      cat.items.forEach(item => {
        grid.innerHTML += `
          <div class="item-card" onclick="openProduct('${yyEsc(item.id)}')">
            <div class="item-img-placeholder">
              <div class="item-info">
                <div class="item-name">${yyEsc(item.name)}</div>
                ${item.desc ? `<div class="item-desc">${yyEsc(item.desc)}</div>` : ''}
                <div class="item-add-row">
                  <div class="item-price">${yyPrice(item.price)}</div>
                  <div id="add-${yyEsc(item.id)}" onclick="event.stopPropagation()"><button class="btn-add" onclick="addItem('${yyEsc(item.id)}')">+</button></div>
                </div>
              </div>
            </div>
          </div>`;
      });
      sec.appendChild(grid);
    }
    content.appendChild(sec);
  });

  /* если что-то уже лежит в корзине — вернуть счётчики на плитки */
  if (typeof cart !== 'undefined') Object.keys(cart).forEach(updateCard);
}

/* ══ Товар на весь экран ═══════════════════════════════════════════
   Стили прописаны прямо в элементах: окно рисуется одинаково в любом
   вебвью и не зависит от таблиц стилей витрины.                    */
const YY_BG='#0F0E0C', YY_GOLD='#F4B400', YY_TXT='#F2EFE8', YY_TXT2='#A6A197';

function openProduct(id){
  const it=findItem(id);
  if(!it) return;
  yyOpenId=id;

  let el=document.getElementById('yyFull');
  if(!el){ el=document.createElement('div'); el.id='yyFull'; document.body.appendChild(el); }
  el.setAttribute('style',
    'position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:'+YY_BG+';'
   +'overflow-y:auto;-webkit-overflow-scrolling:touch;opacity:0;transition:opacity .18s ease;'
   +'font-family:Nunito,system-ui,-apple-system,sans-serif');

  const img=it.img?String(it.img):'';
  const desc=(it.desc||'').trim();

  el.innerHTML=
    '<div id="yyHero" style="position:relative;width:100%;height:100vw;max-height:58vh;'
     +'background:#211D17 center/cover no-repeat">'
     +'<div style="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);'
     +'text-align:center;font-family:\'Bebas Neue\',sans-serif;font-size:56px;'
     +'letter-spacing:2px;color:rgba(244,180,0,.28)">YaYa</div>'
     +'<button onclick="closeProduct()" aria-label="Закрыть" style="position:absolute;top:14px;left:14px;'
     +'width:42px;height:42px;border-radius:50%;border:none;background:rgba(0,0,0,.55);color:#fff;'
     +'font-size:20px;line-height:1;cursor:pointer">✕</button>'
     +'<div style="position:absolute;left:0;right:0;bottom:0;height:96px;'
     +'background:linear-gradient(to top,'+YY_BG+',rgba(15,14,12,0))"></div>'
   +'</div>'

   +'<div style="padding:14px 18px 130px">'
     +'<div style="font-size:24px;font-weight:900;line-height:1.15;color:'+YY_TXT+'">'+yyEsc(it.name)+'</div>'
     +'<div style="font-size:28px;font-weight:900;color:'+YY_GOLD+';margin-top:8px">'+yyPrice(it.price)+'</div>'
     +(it.off?'<div style="margin-top:16px;padding:12px 14px;border-radius:14px;'
              +'background:rgba(255,143,106,.12);color:#ff8f6a;font-weight:800;font-size:14px">'
              +'Сейчас этой позиции нет в наличии</div>':'')
     +'<div style="font-size:11px;font-weight:800;color:'+YY_TXT2+';letter-spacing:1.4px;'
     +'text-transform:uppercase;margin:22px 0 7px">Состав</div>'
     +(desc
        ? '<div id="yyDesc" onclick="toggleDesc()" style="font-size:15px;font-weight:600;line-height:1.55;'
          +'color:'+YY_TXT+';max-height:4.7em;overflow:hidden">'+yyEsc(desc)+'</div>'
          +'<button id="yyMore" onclick="toggleDesc()" style="display:none;margin-top:9px;background:none;'
          +'border:none;padding:0;color:'+YY_GOLD+';font-family:inherit;font-size:14px;font-weight:800;'
          +'cursor:pointer">Показать полностью</button>'
        : '<div style="font-size:14px;font-weight:700;color:'+YY_TXT2+'">'
          +'Состав не заполнен — добавьте его в кабинете</div>')
   +'</div>'

   +'<div style="position:fixed;left:0;right:0;bottom:0;background:'+YY_BG+';'
   +'border-top:1px solid rgba(255,255,255,.08);padding:12px 18px calc(14px + env(safe-area-inset-bottom));'
   +'display:flex;align-items:center;justify-content:space-between">'
     +'<div style="font-size:12px;font-weight:800;color:'+YY_TXT2+'">'
       +(it.off?'Нет в наличии'
               :'Цена<b style="display:block;font-size:20px;color:'+YY_TXT+';font-weight:900;margin-top:2px">'
                +yyPrice(it.price)+'</b>')
     +'</div>'
     +'<div id="yyFullAdd"></div>'
   +'</div>';

  /* фото ставим из JS: в атрибуте style кавычки внутри url() ломают разметку */
  if(img){
    const h=document.getElementById('yyHero');
    if(h) h.style.backgroundImage='url("'+img.replace(/"/g,'%22')+'")';
  }

  if(!it.off) updateCard(id);

  /* кнопка «Показать полностью» — только если текст правда не влез */
  const d=document.getElementById('yyDesc'), m=document.getElementById('yyMore');
  if(d&&m){
    if(d.scrollHeight>d.clientHeight+4) m.style.display='';
    else d.style.maxHeight='none';
  }

  document.body.style.overflow='hidden';
  requestAnimationFrame(function(){ el.style.opacity='1'; });
  try{ history.pushState({yyFull:1},''); }catch(e){}
}

function closeProduct(fromBack){
  const el=document.getElementById('yyFull');
  if(el){ el.style.opacity='0'; setTimeout(function(){ if(!yyOpenId&&el) el.remove(); },200); }
  yyOpenId=null;
  document.body.style.overflow='';
  if(!fromBack){
    try{ if(history.state&&history.state.yyFull) history.back(); }catch(e){}
  }
}

function toggleDesc(){
  const d=document.getElementById('yyDesc'), b=document.getElementById('yyMore');
  if(!d) return;
  const open=d.style.maxHeight==='none';
  d.style.maxHeight=open?'4.7em':'none';
  if(b) b.textContent=open?'Показать полностью':'Свернуть';
}

window.addEventListener('popstate',function(){ if(yyOpenId) closeProduct(true); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&yyOpenId) closeProduct(); });
