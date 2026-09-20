"use client"

import { useMemo, useState } from 'react'
import {
  Bell, ChevronDown, ChevronRight, Clock3, CreditCard, Home, MapPin,
  Minus, Plus, Search, ShoppingBag, ShoppingCart, Star, Utensils,
  WalletCards, UserRound, Compass, ReceiptText, ArrowUpRight, X
} from 'lucide-react'

const dishes = [
  { name: 'Chicken Burger', price: 280, rating: 4.8, time: '20–30 min', emoji: '🍔' },
  { name: 'Shiro Special', price: 190, rating: 4.9, time: '25–35 min', emoji: '🍲' },
  { name: 'Margherita Pizza', price: 420, rating: 4.7, time: '25–40 min', emoji: '🍕' },
  { name: 'Tibs Plate', price: 350, rating: 4.9, time: '30–40 min', emoji: '🥘' },
]

const categories = [
  { label: 'All', icon: Compass }, { label: 'Food', icon: Utensils },
  { label: 'Groceries', icon: ShoppingCart }, { label: 'Market', icon: ShoppingBag }
]

export default function Home() {
  const [active, setActive] = useState('Home')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [walletOpen, setWalletOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = Object.entries(cart).reduce((sum, [name, qty]) => {
    const item = dishes.find(d => d.name === name)
    return sum + (item?.price ?? 0) * qty
  }, 0)

  const filtered = useMemo(() => dishes.filter(d => d.name.toLowerCase().includes(search.toLowerCase())), [search])

  function add(name: string) {
    setCart(c => ({ ...c, [name]: (c[name] || 0) + 1 }))
  }

  function remove(name: string) {
    setCart(c => {
      const next = { ...c }
      if (!next[name]) return c
      next[name] -= 1
      if (next[name] <= 0) delete next[name]
      return next
    })
  }

  return (
    <main className="app">
      <header className="header">
        <div className="brand">
          <div className="logo">S</div>
          <div><strong>S Food</strong><span>Food & Wallet</span></div>
        </div>
        <button className="roundBtn" aria-label="Notifications"><Bell size={19}/><i/></button>
      </header>

      <section className="locationRow">
        <div><span className="label">DELIVER TO</span><button className="location"><MapPin size={15} fill="currentColor"/> Addis Ababa <ChevronDown size={14}/></button></div>
        <button className="walletMini" onClick={() => setWalletOpen(true)}><WalletCards size={17}/><span>ETB 2,450</span></button>
      </section>

      <section className="greeting">
        <div><span>Good evening 👋</span><h1>What are you craving?</h1><p>Order food, pay with S Pay, and track it all in one place.</p></div>
      </section>

      <label className="searchBox"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search dishes, restaurants & groceries"/>{search && <button onClick={() => setSearch('')} aria-label="Clear"><X size={16}/></button>}<kbd>⌘ K</kbd></label>

      <section className="chips">{categories.map(({label, icon: Icon}) => <button key={label} className={category === label ? 'chip active' : 'chip'} onClick={() => setCategory(label)}><Icon size={16}/>{label}</button>)}</section>

      <section className="section">
        <div className="sectionHead"><div><span className="eyebrow">POPULAR NOW</span><h2>Top orders</h2></div><button>See all <ChevronRight size={15}/></button></div>
        <div className="dishGrid">
          {filtered.map(d => <article className="dish" key={d.name}>
            <div className="dishArt"><span>{d.emoji}</span><button className="fav" aria-label={'Add '+d.name}>♡</button></div>
            <div className="dishInfo"><div className="dishTitle"><h3>{d.name}</h3><span><Star size={12} fill="currentColor"/> {d.rating}</span></div><p><Clock3 size={12}/> {d.time}</p><div className="dishBottom"><strong>ETB {d.price}</strong><button className="addBtn" onClick={() => add(d.name)}><Plus size={17}/></button></div></div>
          </article>)}
        </div>
      </section>

      <section className="walletCard">
        <div className="walletTop"><div className="walletLogo"><WalletCards size={21}/></div><div><span>SPAY WALLET</span><small>Available balance</small></div><button onClick={() => setWalletOpen(true)}>Manage <ArrowUpRight size={15}/></button></div>
        <strong>ETB 2,450.00</strong>
        <div className="walletActions"><button onClick={() => setWalletOpen(true)}><Plus size={15}/> Top up</button><button onClick={() => setWalletOpen(true)}><ReceiptText size={15}/> Transactions</button></div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><span className="eyebrow">ORDER AGAIN</span><h2>Local favorites</h2></div><button>View all <ChevronRight size={15}/></button></div>
        <div className="favoriteRow"><div className="favoriteArt">🥙</div><div><strong>Habesha Kitchen</strong><p>Traditional meals · 4.9 ★</p></div><button onClick={() => add('Shiro Special')}><Plus size={16}/></button></div>
      </section>

      {cartCount > 0 && <button className="cartBar" onClick={() => setActive('Cart')}><div><ShoppingCart size={18}/><b>{cartCount} item{cartCount > 1 ? 's' : ''}</b></div><span>ETB {total.toLocaleString()}</span><ChevronRight size={18}/></button>}

      <nav className="bottomNav">
        {[
          ['Home', Home], ['Explore', Compass], ['Cart', ShoppingCart], ['Wallet', WalletCards], ['Profile', UserRound]
        ].map(([label, Icon]) => <button key={label as string} className={active === label ? 'navItem active' : 'navItem'} onClick={() => setActive(label as string)}><Icon size={20}/><span>{label as string}{label === 'Cart' && cartCount > 0 ? ' · ' + cartCount : ''}</span></button>)}
      </nav>

      {walletOpen && <div className="modalBackdrop" onClick={() => setWalletOpen(false)}><aside className="walletSheet" onClick={e => e.stopPropagation()}>
        <div className="sheetHead"><div><span className="eyebrow">S PAY</span><h2>Your wallet</h2></div><button onClick={() => setWalletOpen(false)}><X size={19}/></button></div>
        <div className="balance"><span>AVAILABLE BALANCE</span><strong>ETB 2,450.00</strong></div>
        <button className="topup"><Plus size={18}/> Top up wallet</button>
        <div className="transaction"><div className="txIcon"><Utensils size={16}/></div><div><strong>Food order</strong><small>Today · S Food</small></div><b>- ETB 280</b></div>
        <div className="transaction"><div className="txIcon"><CreditCard size={16}/></div><div><strong>Wallet top-up</strong><small>Yesterday · Card</small></div><b className="positive">+ ETB 1,000</b></div>
      </aside></div>}
    </main>
  )
}
