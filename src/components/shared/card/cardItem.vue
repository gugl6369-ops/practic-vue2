<template>
  <div class="product-card">
    <span class="product-badge">Хит продаж</span>
    <span class="product-category">Категория товара</span>
    <h2 class="product-name">Product name 2</h2>
    <p class="product-description">Product description 2</p>

    <div class="product-footer">
      <div class="product-price">
        200
        <span class="price-currency">₽</span>
      </div>
      <button class="buy-button">Купить</button>
    </div>
  </div>
</template>
<style scoped>


body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(145deg, #f5f5f5 0%, #e8e8e8 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.product-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  max-width: 320px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(255, 59, 48, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(255, 59, 48, 0.1);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(255, 59, 48, 0.25);
}

/* Акцентный красный */
.product-category {
  color: #ff3b30;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  line-height: 1.2;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
  border-left: 3px solid #ff3b30;
  padding-left: 12px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.product-price {
  font-size: 28px;
  font-weight: 700;
  color: #ff3b30;
}

.price-currency {
  font-size: 16px;
  font-weight: 500;
  color: #999;
  margin-left: 4px;
}

.buy-button {
  background: #ff3b30;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
}

.buy-button:hover {
  background: #ff1f1f;
  box-shadow: 0 6px 16px rgba(255, 59, 48, 0.4);
  transform: scale(1.02);
}

.buy-button:active {
  transform: scale(0.98);
}

.product-badge {
  display: inline-block;
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

/* Анимация загрузки */
.product-card {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>