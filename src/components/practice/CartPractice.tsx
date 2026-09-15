"use client";

import { useState } from "react";
import { CodeSample, SectionLabel } from "./PracticeCardParts";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: "Hook 手冊", category: "書籍", price: 320, emoji: "📗" },
  { id: 2, name: "元件積木", category: "教具", price: 580, emoji: "🧩" },
  { id: 3, name: "除錯咖啡", category: "補給", price: 150, emoji: "☕" },
];

const cartSnippet = `const existing = cart.find((item) => item.id === product.id);

setCart((current) => current.map((item) => ({ ...item })));
setCart((current) => current.filter((item) => item.id !== id));

const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);`;

const priceFormatter = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0,
});

export function CartPractice() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id: number, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <article className="rounded-[2rem] border border-line bg-panel/80 p-6 sm:p-8 lg:col-span-2">
      <SectionLabel number="05">TypeScript Array</SectionLabel>
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">購物車陣列邏輯</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted">
            用 Product 與 CartItem 型別約束資料，再透過 find、map、filter、reduce 完成常見購物車操作。
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"
              >
                <span className="text-3xl" aria-hidden="true">
                  {product.emoji}
                </span>
                <p className="mt-4 font-semibold">{product.name}</p>
                <p className="mt-1 text-xs text-muted">{product.category}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-accent">
                    {priceFormatter.format(product.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#07110f] transition hover:bg-accent"
                  >
                    加入
                  </button>
                </div>
              </div>
            ))}
          </div>
          <CodeSample>{cartSnippet}</CodeSample>
        </div>

        <div className="rounded-2xl bg-black/20 p-5">
          <div className="flex items-center justify-between border-b border-white/8 pb-4">
            <h3 className="font-semibold">我的購物車</h3>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">
              {totalItems} 件商品
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="grid min-h-48 place-items-center text-center text-sm text-muted">
              <div>
                <span className="text-3xl" aria-hidden="true">
                  🛒
                </span>
                <p className="mt-3">購物車是空的，先加入一件商品吧。</p>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-white/8">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-4">
                  <span className="text-2xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {priceFormatter.format(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, -1)}
                      className="px-2.5 py-1.5 text-muted transition hover:text-accent"
                      aria-label={`減少 ${item.name} 數量`}
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center font-mono text-xs">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, 1)}
                      className="px-2.5 py-1.5 text-muted transition hover:text-accent"
                      aria-label={`增加 ${item.name} 數量`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-muted transition hover:text-red-300"
                    aria-label={`移除 ${item.name}`}
                  >
                    移除
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-end justify-between border-t border-white/8 pt-4">
            <div>
              <p className="text-xs text-muted">訂單總計</p>
              <strong className="mt-1 block font-mono text-2xl text-accent">
                {priceFormatter.format(totalPrice)}
              </strong>
            </div>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => setCart([])}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs text-muted transition hover:border-red-300/40 hover:text-red-200"
              >
                清空購物車
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
