export function getSessionUser() {
  const raw = localStorage.getItem("fs_user");
  return raw ? JSON.parse(raw) : null;
}

export function saveSessionUser(user) {
  localStorage.setItem("fs_user", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("fs_user");
}

function cartKey() {
  const user = getSessionUser();
  if (user) return `fs_cart_${user.email}`;      // login -> lưu lâu dài
  return "fs_cart_guest";                        // guest -> lưu tạm
}

export function getCart() {
  const user = getSessionUser();
  const key = cartKey();
  const raw = user ? localStorage.getItem(key) : sessionStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

export function setCart(items) {
  const user = getSessionUser();
  const key = cartKey();
  const val = JSON.stringify(items);
  if (user) localStorage.setItem(key, val);
  else sessionStorage.setItem(key, val);
}

export function addToCart(line) {
  const cart = getCart();
  const idx = cart.findIndex(
    x => x.productId === line.productId && x.variantColor === line.variantColor
  );
  if (idx >= 0) cart[idx].qty += line.qty;
  else cart.push(line);
  setCart(cart);
}

export function cartCount() {
  return getCart().reduce((s, x) => s + x.qty, 0);
}
