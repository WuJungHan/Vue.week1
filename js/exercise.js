//dom
const productTitle = document.querySelector('#title');
const productOriginPrice = document.querySelector('#origin_price');
const productPrice = document.querySelector('#price')
const addProductBtn = document.querySelector('#addProduct');
const clearAllBtn = document.querySelector('#clearAll');
const productList = document.querySelector('#productList');
const countProductNum = document.querySelector('#productCount');

//建立空陣列存放data
let productData = [];

//監聽addProductBtn按鈕事件
addProductBtn.addEventListener('click', addProductData);
//組合資料
function addProductData() {
  //如果產品標題不等於空字串
  if (productTitle.value !== '') {
    //將空陣列推入以下資料
    productData.push({
      id: Date.now(),//唯一值
      title: productTitle.value.trim(),//trim()去除字串開頭和結尾外的空白
      origin_price: parseInt(productOriginPrice.value) || 0,//用||來做預設0
      price: parseInt(productPrice.value) || 0,//用||來做預設0
      is_enabled: false,//用來做"是否啟用"的預設
    })
  } else {//驗證機制
    //彈跳提示
    alert('請輸入正確資料');
  };
  //console.log(productData);//驗證用
  render(productData);//呼叫渲染函式帶參數productData
  productTitle.value = '';//清空input
  productOriginPrice.value = '';//清空input
  productPrice.value = '';//清空input
};

//監聽clearAllBtn click事件
clearAllBtn.addEventListener('click', clearAllProductList);
//刪除所有資料函式
function clearAllProductList(e) {
  e.preventDefault();//取消標籤預設功能
  productData = [];//變回空陣列
  render(productData);//重新渲染畫面
};

//監聽productList點擊事件
productList.addEventListener('click', pointOfDivergence);
function pointOfDivergence(e) {
  //console.log(e.target.dataset.action);//得知單筆刪除為remove 是否啟用為status
  const action = e.target.dataset.action;
  //console.log(e.target.dataset.id);//取得唯一值
  const id = e.target.dataset.id;
  //如果action為'remove'
  if (action === 'remove') {
    //執行deleteProductList函式帶id參數
    deleteProductList(id);
    //如果action為'status'
  } else if (action === 'status') {
    //執行statusProduct帶id參數
    isEnableProduct(id);
  }
};

//刪除選擇到的單筆資料 帶入e.target.dataset.id當參數
function deleteProductList(id) {
  //console.log(123);//驗證用
  let newIndex = 0;//初始化 數值型態
  //將資料跑forEach 使用index參數
  //index代表目前被處理中的 Array 之中的那個元素的index.
  productData.forEach((item, index) => {
    //如果productData的id=e.target.dataset.id
    if (item.id === id) {
      //newIndex=目前被選到的index
      newIndex = index;
    }
  })
  //splice(開始位置,是否刪除1或0,插入的元素) 方法可以藉由刪除既有元素並／或加入新元素來改變一個陣列的內容。
  //用splice()刪除newIndex
  productData.splice(newIndex, 1);
  //刪除後重新渲染畫面
  render(productData);
};

//啟用狀態 帶入e.target.dataset.id當參數
function isEnableProduct(id) {
  //console.log(321);//驗證用
  //資料跑forEach
  productData.forEach((item) => {
    //當選擇到的元素id=e.target.dataset.id時
    //注意不可用嚴格模式===
    if (item.id == id) {
      //改變trun or flase
      item.is_enabled = !item.is_enabled;
    }
  })
  //重新渲染畫面
  render(productData);
};

//渲染畫面 帶入參數
function render(productData) {
  let str = '';//宣告空字串
  productData.forEach((item) => {//將資料跑迴圈
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
  productList.innerHTML = str;//productList塞入字串
  countProductNum.textContent = productData.length;//更改產品數量的顯示數字(依資料長度來計算)
};
//render(productData);
