//宣告空陣列
let productData = []

//抓取dom 監聽click事件
document.getElementById('addProduct').addEventListener('click', function (e) {
  const timeStamp = Math.floor(Date.now());
  //如果#title不等於''
  if (document.getElementById('title').value.trim() !== '') {
    //空陣列推入以下資料
    productData.push({
      id: timeStamp,
      title: document.getElementById('title').value.trim(),
      origin_price: parseInt(document.getElementById('origin_price').value) || 0,
      price: parseInt(document.getElementById('price').value) || 0,
      is_enabled: false,
    })
    //宣告空字串
    let str = '';
    //塞入東西後的陣列 跑forEach
    productData.forEach((item) => {
      //將字串+變數塞入空字串
      str += `
      <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled ? 'checked' : ''} data-action="status" data-id="${item.id}">
          <label class="form-check-label" for="${item.id}">${item.is_enabled ? '啟用' : '未啟用'}</label>
        </div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
    })
    //將字串放入#productList
    document.getElementById('productList').innerHTML = str;
    document.getElementById('productCount').textContent = productData.length;

    //清空欄位
    document.getElementById('title').value = '';
    document.getElementById('origin_price').value = '';
    document.getElementById('price').value = '';
  }
});

//抓取dom 監聽click事件
document.getElementById('clearAll').addEventListener('click', function (e) {
  //許消預設
  e.preventDefault();
  //宣告空陣列
  productData = [];
  //宣告空字串
  let str = '';
  //陣列跑forEach
  productData.forEach((item) => {
    ////將字串+變數塞入空字串
    str += `
    <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled ? 'checked' : ''} data-action="status" data-id="${item.id}">
          <label class="form-check-label" for="${item.id}">${item.is_enabled ? '啟用' : '未啟用'}</label>
        </div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
  })
  //#productList放入字串
  document.getElementById('productList').innerHTML = str;
  document.getElementById('productCount').textContent = productData.length;
});

//抓取dom 監聽click事件
document.getElementById('productList').addEventListener('click', function (e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  if (action === 'remove') {
    let newIndex = 0;
    productData.forEach((item, key) => {
      if (id == item.id) {
        newIndex = key;
      }
    })
    productData.splice(newIndex, 1);

  } else if (action === 'status') {
    productData.forEach((item) => {
      if (id == item.id) {
        item.is_enabled = !item.is_enabled;
      }
    })
  }
  let str = '';
  productData.forEach(function (item) {
    str += `
    <tr>
      <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled ? 'checked' : ''} data-action="status" data-id="${item.id}">
          <label class="form-check-label" for="${item.id}">${item.is_enabled ? '啟用' : '未啟用'}</label>
        </div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
  })
  document.getElementById('productList').innerHTML = str;
  document.getElementById('productCount').textContent = productData.length;
});

let str = '';
productData.forEach((item) => {
  str += `
  <tr>
    <td>${item.title}</td>
    <td width="120">
      ${item.origin_price}
    </td>
    <td width="120">
      ${item.price}
    </td>
    <td width="100">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled ? 'checked' : ''} data-action="status" data-id="${item.id}">
        <label class="form-check-label" data-action="status" for="${item.id}">${item.is_enabled ? '啟用' : '未啟用'}</label>
      </div>
    </td>
    <td width="120">
      <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
    </td>
  </tr>`;
})
document.getElementById('productList').innerHTML = str;
document.getElementById('productCount').textContent = productData.length;