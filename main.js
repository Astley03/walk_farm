
// ========================================
// 田邊走走民宿網站
// main.js
// ========================================

const $ = id => document.getElementById(id);

const LINE_URL = "https://line.me/R/ti/p/@395bjawe";

const asset = path => "assets/" + path;

// ----------------------------------------
// 導覽列
// ----------------------------------------

const menuToggle = $("menuToggle");
const nav = $("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    nav.classList.contains("open")
  );
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ----------------------------------------
// 房型資料
// ----------------------------------------

const rooms = {
  A: {
    name: "A 館",
    count: "6 間四人房",
    address: "宜蘭縣冬山鄉三正路 17 巷 35 號",

    booking: "https://reurl.cc/L5qyXx",
    map: "https://maps.app.goo.gl/xsVBkw9yDUnNUyX89?g_st=ic",

    photos: [
      "外觀.png",
      "房間.png",
      "房間2.png",
      "客廳.png",
      "客廳2.png",
      "廚房.png",
      "廚房2.png"
    ]
  },

  B: {
    name: "B 館",
    count: "2 間四人房、1 間六人房",
    address: "宜蘭縣冬山鄉成興路 746 號",

    booking: "https://reurl.cc/qvZ1lR",
    map: "https://maps.app.goo.gl/See1kWg4fek75EYy6?g_st=ic",

    photos: [
      "外觀.jpeg",
      "4人房.png",
      "6人房.png",
      "客廳.png",
      "客廳2.png",
      "1樓廁所.png"
    ]
  }
};

function roomImage(type, file) {
  return asset(`房型/${type}館/${file}`);
}

let currentRoom = "A";
let currentRoomPhoto = 0;

// 房型選單
$("houseCards").innerHTML = Object.entries(rooms)
  .map(([type, room]) => `
    <article class="card">
      <img class="card-image"
        src="${roomImage(type, room.photos[0])}"
        alt="田邊走走${room.name}">
      <div class="card-body">
        <h3>田邊走走 ${room.name}</h3>
        <p>${room.count}</p>
        <button class="btn"
          onclick="showRoom('${type}', true)">
          查看館別介紹 →
        </button>
        <a class="btn outline"
          target="_blank"
          rel="noopener noreferrer"
          href="${room.booking}">
          訂房官網 ↗
        </a>
      </div>
    </article>
  `).join("");

// 顯示房型詳情
function showRoom(type, scroll = false) {
  currentRoom = type;
  currentRoomPhoto = 0;

  const room = rooms[type];

  $("roomDetail").innerHTML = `
    <div class="room-panel">

      <div class="room-header">
        <div>
          <h2>${room.name}｜${room.count}</h2>
          <p class="muted">${room.address}</p>
        </div>

        <div>
          <a class="btn outline" href="${room.map}"
            target="_blank" rel="noopener noreferrer">
            館別導航 ↗
          </a>
          <a class="btn" href="${room.booking}"
            target="_blank" rel="noopener noreferrer">
            查詢空房與訂房 ↗
          </a>
        </div>
      </div>

      <img class="room-main-image" id="roomMainImage"
        src="${roomImage(type, room.photos[0])}"
        alt="${room.name}照片"
        onclick="openRoomViewer()">

      <div class="room-thumbs">
        ${room.photos.map((file, index) => `
          <button
            class="${index === 0 ? "active" : ""}"
            onclick="selectRoomPhoto(${index})">
            <img
              src="${roomImage(type, file)}"
              alt="${file}">
          </button>
        `).join("")}
      </div>

      <h3>空間與設施</h3>
      <p class="muted">
        歡迎瀏覽館內房間、客廳與公共空間實景。
        民宿提供基本廚具、鍋具、餐具及烤肉爐。
        實際使用規範請查看入住須知。
      </p>

      <a class="btn outline" href="#rules">
        查看入住須知 →
      </a>
    </div>
  `;

  if (scroll) {
    $("roomDetail").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// 切換房型照片
function selectRoomPhoto(index) {
  currentRoomPhoto = index;

  const room = rooms[currentRoom];

  $("roomMainImage").src = roomImage(
    currentRoom,
    room.photos[index]
  );

  document.querySelectorAll(".room-thumbs button")
    .forEach((button, i) => {
      button.classList.toggle("active", i === index);
    });
}

function openRoomViewer() {
  const room = rooms[currentRoom];

  const images = room.photos.map(file => ({
    src: roomImage(currentRoom, file),
    title: `${room.name}｜${file}`
  }));

  openViewer(images, currentRoomPhoto);
}

showRoom("A");

// ----------------------------------------
// 餐飲服務
// ----------------------------------------

const foodGroups = [
  {
    id: "food",
    name: "代訂食材",
    files: [
      "代訂食材.jpg",
      "代訂食材2.jpg",
      "代訂食材3.jpg"
    ]
  },
  {
    id: "pot",
    name: "代訂火鍋",
    files: [
      "代訂火鍋.jpg",
      "代訂火鍋2.jpg",
      "代訂火鍋3.jpg"
    ]
  },
  {
    id: "grill",
    name: "代烤服務",
    files: [
      "代烤.jpg",
      "代烤2.jpg",
      "代烤3.jpg"
    ]
  }
];

let currentFood = "food";

function switchFood(id) {
  currentFood = id;
  renderFood();
}

function renderFood() {
  const group = foodGroups.find(g => g.id === currentFood);

  $("foodTabs").innerHTML = foodGroups.map(g => `
    <button class="tab ${g.id === currentFood ? "active" : ""}"
      onclick="switchFood('${g.id}')">
      ${g.name}
    </button>
  `).join("");

  $("foodGallery").innerHTML = group.files.map((file, i) => `
    <div class="food-card" onclick="openFoodViewer(${i})">
      <img src="${asset("代烤食材/" + file)}"
        alt="${group.name}菜單 ${i + 1}"
        loading="lazy">
      <p>點擊放大查看菜單 ↗</p>
    </div>
  `).join("");
}

function openFoodViewer(index) {
  const group = foodGroups.find(g => g.id === currentFood);

  const images = group.files.map((file, i) => ({
    src: asset("代烤食材/" + file),
    title: `${group.name}｜菜單 ${i + 1}`
  }));

  openViewer(images, index);
}

renderFood();

// ----------------------------------------
// LINE 複製功能
// ----------------------------------------

$("copyTemplate").addEventListener("click", async () => {
  const message = $("templateText").textContent;

  try {
    await navigator.clipboard.writeText(message);
    showToast("已複製！請貼到官方 LINE");
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = message;

    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand("copy");
    textarea.remove();

    showToast(
      success ? "已複製詢問內容" : "請手動選取並複製內容"
    );
  }
});

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

// ----------------------------------------
// 合作廠商
// ----------------------------------------

const partners = [
  {
    name: "合作優惠",
    description:
      "田邊走走與在地農場合作，住宿旅客可向官方 LINE 詢問購票優惠與使用方式。",
    files: ["農場.jpg", "農場2.jpg"]
  },
  {
    name: "接送・叫車・包車",
    description:
      "提供合作接送、叫車與包車旅遊資訊，歡迎聯繫官方 LINE 詢問。",
    files: ["接送.jpg", "接送2.jpg"]
  }
];

$("partnerCards").innerHTML = partners.map((partner, i) => `
  <article class="card">
    <img class="card-image"
      src="${asset("合作/" + partner.files[0])}"
      alt="${partner.name}">
    <div class="card-body">
      <h3>${partner.name}</h3>
      <p>${partner.description}</p>
      <button class="btn" onclick="openPartner(${i})">
        查看合作資訊
      </button>
      <a class="btn outline"
        href="${LINE_URL}"
        target="_blank" rel="noopener noreferrer">
        官方 LINE 詢問 ↗
      </a>
    </div>
  </article>
`).join("");

function openPartner(index) {
  const partner = partners[index];

  const images = partner.files.map(file => ({
    src: asset("合作/" + file),
    title: partner.name
  }));

  openViewer(images, 0);
}

// ----------------------------------------
// 圖片放大視窗
// ----------------------------------------

let viewerImages = [];
let viewerIndex = 0;

function openViewer(images, index = 0) {
  viewerImages = images;
  viewerIndex = index;

  updateViewer();

  $("imageModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateViewer() {
  const image = viewerImages[viewerIndex];

  $("modalImage").src = image.src;
  $("modalTitle").textContent =
    `${image.title}　${viewerIndex + 1}/${viewerImages.length}`;
}

function closeViewer() {
  $("imageModal").classList.remove("open");
  document.body.style.overflow = "";
}

function moveViewer(direction) {
  viewerIndex = (
    viewerIndex + direction + viewerImages.length
  ) % viewerImages.length;

  updateViewer();
}

$("modalClose").onclick = closeViewer;
$("modalPrev").onclick = () => moveViewer(-1);
$("modalNext").onclick = () => moveViewer(1);

$("imageModal").addEventListener("click", event => {
  if (event.target === $("imageModal")) closeViewer();
});

document.addEventListener("keydown", event => {
  if (!$("imageModal").classList.contains("open")) return;

  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowLeft") moveViewer(-1);
  if (event.key === "ArrowRight") moveViewer(1);
});

// ========================================
// 插畫式互動景點地圖
// ========================================

// 注意：x、y 為插畫中的相對位置百分比，
// 不是精確 GPS 座標。

const houses = [
  {
    id: "A",
    kind: "stay",
    name: "田邊走走 A 館",
    description: "6 間四人房。",
    tip: "民宿位置",
    x: 46, y: 53,
    url: "https://maps.app.goo.gl/xsVBkw9yDUnNUyX89?g_st=ic"
  },
  {
    id: "B",
    kind: "stay",
    name: "田邊走走 B 館",
    description: "2 間四人房與 1 間六人房。",
    tip: "民宿位置",
    x: 58, y: 52,
    url: "https://maps.app.goo.gl/See1kWg4fek75EYy6?g_st=ic"
  }
];

const places = [
  // 食
  {
    id: "f1",
    kind: "food",
    name: "冬山金珠蔥油餅",
    description: "在地蔥油餅小吃。",
    tip: "車程約 7 分鐘",
    x: 51, y: 46,
    url: "https://maps.app.goo.gl/Vga7J9Y8BdE1kQH98"
  },
  {
    id: "f2",
    kind: "food",
    name: "冬山春捲蝦餅",
    description: "特色春捲蝦餅，適合品嚐在地小吃。",
    tip: "車程約 6 分鐘",
    x: 54, y: 47,
    url: "https://maps.app.goo.gl/vAcz6AVDo7nyrcHw8"
  },
  {
    id: "f3",
    kind: "food",
    name: "武淵香腸伯",
    description: "在地人氣香腸小吃。",
    tip: "車程約 7 分鐘",
    x: 64, y: 51,
    url: "https://maps.app.goo.gl/ZwpfTYRH2oepnKnf9"
  },
  {
    id: "f4",
    kind: "food",
    name: "大仁哥蔗香脆皮桶仔雞－宜蘭旗艦店",
    description: "適合團體聚餐，品嚐特色蔗香桶仔雞。",
    tip: "車程約 21～23 分鐘",
    x: 18, y: 16,
    url: "https://maps.app.goo.gl/71uctqzyr6vV2da9A"
  },
  {
    id: "f5",
    kind: "food",
    name: "湯蒸火鍋",
    description: "食材新鮮，湯頭濃郁，提供肉品及海鮮。",
    tip: "車程約 7～9 分鐘",
    x: 59, y: 44,
    url: "https://maps.app.goo.gl/Bp47LSXvufXsyy5MA"
  },
  {
    id: "f6",
    kind: "food",
    name: "富美活海鮮",
    description: "南方澳海鮮料理，享用新鮮海產。",
    tip: "車程約 18～20 分鐘",
    x: 84, y: 73,
    url: "https://maps.app.goo.gl/VdY29W5ZiE2r7TJw9"
  },

  // 玩
  {
    id: "p1",
    kind: "play",
    name: "棗稻田休閒農場",
    description: "農業體驗、自然生態及親子遊憩。",
    tip: "車程約 31 分鐘",
    x: 15, y: 25,
    url: "https://share.google/JMT2fMWnyGd1HBpda"
  },
  {
    id: "p2",
    kind: "play",
    name: "星夢森林劇場",
    description: "療癒系農場，有多種動物可欣賞與互動。",
    tip: "車程約 25 分鐘",
    x: 25, y: 28,
    url: "https://maps.app.goo.gl/Y86LME1AcEP4y8A76?g_st=ic"
  },
  {
    id: "p3",
    kind: "play",
    name: "武淵水火同源",
    description: "大碗公溜滑梯及天然泉水設施。",
    tip: "車程約 7～9 分鐘",
    x: 66, y: 57,
    url: "https://maps.app.goo.gl/YHWPSULVbGL3fLxu9"
  },
  {
    id: "p4",
    kind: "play",
    name: "梅花湖",
    description: "湖畔單車、散步及欣賞自然美景。",
    tip: "車程約 19～21 分鐘",
    x: 34, y: 52,
    url: "https://maps.app.goo.gl/7bS4AkzcJ4e4kQNe7"
  },
  {
    id: "p5",
    kind: "play",
    name: "奇麗灣珍奶文化館",
    description: "認識珍珠奶茶文化與製作過程。",
    tip: "車程約 7～9 分鐘",
    x: 77, y: 63,
    url: "https://maps.app.goo.gl/wUbcxix7MXkrDoj88"
  },

  // 樂
  {
    id: "e1",
    kind: "fun",
    name: "宜蘭傳藝園區",
    description: "傳統文化展演、特色街區及工藝體驗。",
    tip: "文化體驗",
    x: 75, y: 37,
    url: "https://maps.app.goo.gl/tjoq5Y6nC4Z4DTVv6"
  },
  {
    id: "e2",
    kind: "fun",
    name: "冬山河生態綠舟",
    description: "河畔散步、生態活動及遊船體驗。",
    tip: "生態體驗",
    x: 45, y: 39,
    url: "https://www.google.com/maps/search/?api=1&query=冬山河生態綠舟"
  },
  {
    id: "e3",
    kind: "fun",
    name: "冬山河親水公園",
    description: "河岸散步、單車及季節性親水活動。",
    tip: "親水活動",
    x: 72, y: 42,
    url: "https://www.google.com/maps/search/?api=1&query=冬山河親水公園"
  }
];

const allPoints = [...houses, ...places];

let currentCategory = "all";
let selectedPoint = "A";

const categoryNames = {
  all: "全部",
  food: "食 · 美食探索",
  play: "玩 · 自然景點",
  fun: "樂 · 體驗活動"
};

const kindNames = {
  stay: "民宿位置",
  food: "美食推薦",
  play: "景點推薦",
  fun: "體驗活動"
};

function getPoint(id) {
  return allPoints.find(point => point.id === id);
}

function visiblePoints() {
  return allPoints.filter(point =>
    point.kind === "stay" ||
    currentCategory === "all" ||
    point.kind === currentCategory
  );
}

function switchCategory(category) {
  currentCategory = category;

  if (!visiblePoints().some(point => point.id === selectedPoint)) {
    selectedPoint = "A";
  }

  renderMap();
}

// 地圖分類按鈕
function renderTabs() {
  $("placeTabs").innerHTML =
    Object.entries(categoryNames).map(([id, name]) => `
      <button class="tab ${currentCategory === id ? "active" : ""}"
        onclick="switchCategory('${id}')">
        ${name}
      </button>
    `).join("");
}

// 地圖標記
function renderPins() {
  $("mapPins").innerHTML = visiblePoints().map(point => {
    const icon = point.kind === "stay" ? "🏡" :
      point.kind === "food" ? "食" :
      point.kind === "play" ? "玩" : "樂";

    const flip = point.x > 72 ? "flip" : "";

    return `
      <button
        class="map-pin ${point.kind} ${flip}
          ${point.id === selectedPoint ? "selected" : ""}"
        style="left:${point.x}%;top:${point.y}%"
        onclick="selectPoint('${point.id}')"
        title="${point.name}">

        <span class="pin-circle">${icon}</span>
        <span class="pin-name">${point.name}</span>
      </button>
    `;
  }).join("");
}

// 小視窗
function renderPopup() {
  const point = getPoint(selectedPoint);
  const popup = $("mapPopup");
  const map = $("illustrationMap");

  if (!point || !map.clientWidth) {
    popup.classList.add("hidden");
    return;
  }

  popup.classList.remove("hidden");

  popup.innerHTML = `
    <h4>${point.name}</h4>
    <p>${point.tip}</p>
    <a href="${point.url}" target="_blank"
      rel="noopener noreferrer">
      Google Maps 導航 ↗
    </a>
  `;

  // 防止彈出視窗被裁切
  const mapWidth = map.clientWidth;
  const mapHeight = map.clientHeight;

  const popupWidth = popup.offsetWidth;
  const popupHeight = popup.offsetHeight;

  const px = mapWidth * point.x / 100;
  const py = mapHeight * point.y / 100;

  const left = Math.max(
    8,
    Math.min(px - 25, mapWidth - popupWidth - 8)
  );

  const top = Math.max(
    8,
    Math.min(py - popupHeight - 25, mapHeight - popupHeight - 8)
  );

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
}

// 右側介紹卡
function renderDetail() {
  const point = getPoint(selectedPoint);

  $("placeDetail").innerHTML = `
    <small>${kindNames[point.kind]}</small>
    <h3>${point.name}</h3>
    <p><strong>${point.tip}</strong></p>
    <p>${point.description}</p>
    <a class="btn" href="${point.url}"
      target="_blank" rel="noopener noreferrer">
      Google Maps 導航 ↗
    </a>
  `;

  $("mapStatus").textContent =
    `目前查看：${point.name}。實際位置及車程以 Google Maps 為準。`;
}

// 右側景點清單
function renderPlaceList() {
  const filtered = places.filter(point =>
    currentCategory === "all" ||
    point.kind === currentCategory
  );

  $("placeList").innerHTML = filtered.map(point => `
    <article class="place-item
      ${selectedPoint === point.id ? "active" : ""}">
      <h4>${point.name}</h4>
      <p>${point.description}</p>
      <p>${point.tip}</p>

      <button onclick="selectPoint('${point.id}')">
        地圖查看 ◎
      </button>

      <a href="${point.url}" target="_blank"
        rel="noopener noreferrer">
        Google Maps ↗
      </a>
    </article>
  `).join("");
}

// 選擇景點
function selectPoint(id) {
  selectedPoint = id;

  renderPins();
  renderDetail();
  renderPlaceList();
  renderPopup();
}

function renderMap() {
  renderTabs();
  renderPins();
  renderDetail();
  renderPlaceList();
  renderPopup();
}

renderMap();

window.addEventListener("resize", renderPopup);


// ========================================
// 回頂端按鈕功能
// ========================================

const backToTopButton = document.getElementById("backToTop");

// 監聽網頁捲動
function updateBackToTop() {
  if (window.scrollY > 260) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

// 點擊後平滑回到頂端
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// 捲動時控制按鈕顯示
window.addEventListener(
  "scroll",
  updateBackToTop,
  { passive: true }
);

// 初始化按鈕狀態
updateBackToTop();

// ========================================
// 程式結束
// ========================================
