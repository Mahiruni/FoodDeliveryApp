"use client"

import { useMemo, useState } from 'react'
import {
  Bell, ChevronDown, ChevronRight, Clock3, CreditCard, Home, MapPin,
  Plus, Search, ShoppingBag, ShoppingCart, Star, Utensils,
  WalletCards, UserRound, Compass, ReceiptText, ArrowUpRight, X,
  CheckCircle2, Trash2, Minus, MapPinned
} from 'lucide-react'

const dishes = [
  { name: 'Chicken Burger', price: 280, rating: 4.8, time: '20–30 min', emoji: '🍔', type: 'Food' },
  { name: 'Shiro Special', price: 190, rating: 4.9, time: '25–35 min', emoji: '🍲', type: 'Food' },
  { name: 'Margherita Pizza', price: 420, rating: 4.7, time: '25–40 min', emoji: '🍕', type: 'Food' },
  { name: 'Tibs Plate', price: 350, rating: 4.9, time: '30–40 min', emoji: '🥘', type: 'Food' },
  { name: 'Fresh Groceries', price: 650, rating: 4.8, time: '20–30 min', emoji: '🛒', type: 'Groceries' },
  { name: 'Everyday Market', price: 890, rating: 4.7, time: '30–45 min', emoji: '🛍️', type: 'Market' },
]

const categories = [
  { label: 'All', icon: Compass }, { label: 'Food', icon: Utensils },
  { label: 'Groceries', icon: ShoppingCart }, { label: 'Market', icon: ShoppingBag }
]

export default function Home() {
  const [active, setActive] = useState('Home')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [walletOpen, setWalletOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [locationOpen, setLocationOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [topupOpen, setTopupOpen] = useState(false)
  const [topupAmount, setTopupAmount] = useState('')

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = Object.entries(cart).reduce((sum, [name, qty]) => {
    const item = dishes.find(d => d.name === name)
    return sum + (item?.price ?? 0) * qty
  }, 0)

  const filtered = useMemo(() => dishes.filter(d =>
    (category === 'All' || d.type === category) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  ), [search, category])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }
  function add(name: string) {
    setCart(c => ({ ...c, [name]: (c[name] || 0) + 1 }))
    notify(name + ' added to cart')
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
  function go(label: string) {
    setActive(label)
    if (label === 'Wallet') setWalletOpen(true)
  }
  function topUp() {
    const amount = Number(topupAmount)
    if (!amount || amount < 10) return notify('Enter at least ETB 10')
    setTopupAmount('')
    setTopupOpen(false)
    notify('Top-up request created for ETB ' + amount.toLocaleString())
  }

  return (
    <main className="app">
      <header className="header">
        <button className="brand brandButton" onClick={() => go('Home')} aria-label="Go home">
          <div className="logo">S</div>
          <div><strong>S Food</strong><span>Food & Wallet</span></div>
        </button>
        <button className="roundBtn" onClick={() => setNotificationOpen(v => !v)} aria-label="Notifications"><Bell size={19}/><i/></button>
      </header>

      {notificationOpen && <div className="popover notificationPopover"><div><strong>Notifications</strong><button onClick={() => setNotificationOpen(false)}><X size={15}/></button></div><p>🎉 Welcome to S Food & S Pay.</p><p>Your wallet is ready to use.</p></div>}

      <section className="locationRow">
        <div><span className="label">DELIVER TO</span><button className="location" onClick={() => setLocationOpen(v => !v)}><MapPin size={15} fill="currentColor"/> Addis Ababa <ChevronDown size={14}/></button></div>
        <button className="walletMini" onClick={() => setWalletOpen(true)}><WalletCards size={17}/><span>ETB 2,450</span></button>
      </section>

      {locationOpen && <div className="popover locationPopover"><strong>Delivery location</strong><button onClick={() => {setLocationOpen(false); notify('Addis Ababa selected')}}><MapPinned size={15}/> Addis Ababa <CheckCircle2 size={15}/></button><button onClick={() => {setLocationOpen(false); notify('Location selection is ready')}}><Plus size={15}/> Add another location</button></div>}

      {active === 'Home' && <>
        <section className="greeting"><div><span>Good evening 👋</span><h1>What are you craving?</h1><p>Order food, pay with S Pay, and track it all in one place.</p></div></section>
        <label className="searchBox"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search dishes, restaurants & groceries"/>{search && <button onClick={() => setSearch('')} aria-label="Clear"><X size={16}/></button>}<kbd>⌘ K</kbd></label>
        <section className="chips">{categories.map(({label, icon: Icon}) => <button key={label} className={category === label ? 'chip active' : 'chip'} onClick={() => setCategory(label)}><Icon size={16}/>{label}</button>)}</section>
        <section className="section">
          <div className="sectionHead"><div><span className="eyebrow">POPULAR NOW</span><h2>Top orders</h2></div><button onClick={() => {setCategory('All');setSearch('');notify('Showing all popular orders')}}>See all <ChevronRight size={15}/></button></div>
          <div className="dishGrid">
            {filtered.map(d => <article className="dish" key={d.name}>
              <div className="dishArt"><span>{d.emoji}</span><button className="fav" onClick={() => notify(d.name + ' saved')} aria-label={'Save '+d.name}>♡</button></div>
              <div className="dishInfo"><div className="dishTitle"><h3>{d.name}</h3><span><Star size={12} fill="currentColor"/> {d.rating}</span></div><p><Clock3 size={12}/> {d.time}</p><div className="dishBottom"><strong>ETB {d.price}</strong><button className="addBtn" onClick={() => add(d.name)}><Plus size={17}/></button></div></div>
            </article>)}
          </div>
          {filtered.length === 0 && <div className="empty">No matches found. Try another search.</div>}
        </section>
        <section className="walletCard">
          <div className="walletTop"><div className="walletLogo"><WalletCards size={21}/></div><div><span>SPAY WALLET</span><small>Available balance</small></div><button onClick={() => setWalletOpen(true)}>Manage <ArrowUpRight size={15}/></button></div>
          <strong>ETB 2,450.00</strong>
          <div className="walletActions"><button onClick={() => setTopupOpen(true)}><Plus size={15}/> Top up</button><button onClick={() => setWalletOpen(true)}><ReceiptText size={15}/> Transactions</button></div>
        </section>
        <section className="section"><div className="sectionHead"><div><span className="eyebrow">ORDER AGAIN</span><h2>Local favorites</h2></div><button onClick={() => {setCategory('Food');setSearch('')}}>View all <ChevronRight size={15}/></button></div><div className="favoriteRow"><div className="favoriteArt">🥙</div><div><strong>Habesha Kitchen</strong><p>Traditional meals · 4.9 ★</p></div><button onClick={() => add('Shiro Special')}><Plus size={16}/></button></div></section>
      </>}

      {active === 'Explore' && <section className="pagePanel"><span className="eyebrow">EXPLORE</span><h1>Find something delicious.</h1><p>Browse food, groceries and marketplace items.</p><label className="searchBox"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search everything"/></label><div className="exploreList">{dishes.map(d => <button key={d.name} onClick={() => add(d.name)}><span>{d.emoji}</span><div><strong>{d.name}</strong><small>{d.type} · ETB {d.price}</small></div><Plus size={18}/></button>)}</div></section>}

      {active === 'Cart' && <section className="pagePanel"><span className="eyebrow">YOUR CART</span><h1>{cartCount ? cartCount + ' item' + (cartCount > 1 ? 's' : '') : 'Your cart is empty'}</h1>{cartCount ? <><div className="cartList">{Object.entries(cart).map(([name,qty]) => {const d=dishes.find(x=>x.name===name)!;return <div className="cartItem" key={name}><span className="cartEmoji">{d.emoji}</span><div><strong>{name}</strong><small>ETB {d.price} each</small></div><div className="qty"><button onClick={() => remove(name)}><Minus size={14}/></button><b>{qty}</b><button onClick={() => add(name)}><Plus size={14}/></button></div><strong>ETB {(d.price*qty).toLocaleString()}</strong><button className="deleteBtn" onClick={() => setCart(c => {const n={...c};delete n[name];return n})}><Trash2 size={15}/></button></div>})}</div><div className="checkout"><div><span>Total</span><strong>ETB {total.toLocaleString()}</strong></div><button onClick={() => notify('Checkout started')}>Checkout <ArrowUpRight size={16}/></button></div></> : <button className="primaryCta" onClick={() => go('Explore')}>Explore food <ChevronRight size={16}/></button>}</section>}

      {active === 'Profile' && <section className="pagePanel"><span className="eyebrow">ACCOUNT</span><h1>Your profile</h1><div className="profileCard"><div className="avatar">M</div><div><strong>Welcome to S Food</strong><p>Manage your account and preferences.</p></div></div>{['Personal details','Saved addresses','Payment cards','Notifications','Help & support'].map(item => <button className="menuRow" key={item} onClick={() => notify(item + ' opened')}><span>{item}</span><ChevronRight size={17}/></button>)}<button className="signOut" onClick={() => notify('Sign out action ready')}>Sign out</button></section>}

      {cartCount > 0 && active !== 'Cart' && <button className="cartBar" onClick={() => setActive('Cart')}><div><ShoppingCart size={18}/><b>{cartCount} item{cartCount > 1 ? 's' : ''}</b></div><span>ETB {total.toLocaleString()}</span><ChevronRight size={18}/></button>}

      <nav className="bottomNav">
        {[['Home', Home], ['Explore', Compass], ['Cart', ShoppingCart], ['Wallet', WalletCards], ['Profile', UserRound]].map(([label, Icon]) => <button key={label as string} className={active === label ? 'navItem active' : 'navItem'} onClick={() => go(label as string)}><Icon size={20}/><span>{label as string}{label === 'Cart' && cartCount > 0 ? ' · ' + cartCount : ''}</span></button>)}
      </nav>

      {walletOpen && <div className="modalBackdrop" onClick={() => setWalletOpen(false)}><aside className="walletSheet" onClick={e => e.stopPropagation()}><div className="sheetHead"><div><span className="eyebrow">S PAY</span><h2>Your wallet</h2></div><button onClick={() => setWalletOpen(false)}><X size={19}/></button></div><div className="balance"><span>AVAILABLE BALANCE</span><strong>ETB 2,450.00</strong></div><button className="topup" onClick={() => setTopupOpen(true)}><Plus size={18}/> Top up wallet</button><div className="transaction"><div className="txIcon"><Utensils size={16}/></div><div><strong>Food order</strong><small>Today · S Food</small></div><b>- ETB 280</b></div><div className="transaction"><div className="txIcon"><CreditCard size={16}/></div><div><strong>Wallet top-up</strong><small>Yesterday · Card</small></div><b className="positive">+ ETB 1,000</b></div></aside></div>}

      {topupOpen && <div className="modalBackdrop" onClick={() => setTopupOpen(false)}><aside className="walletSheet" onClick={e => e.stopPropagation()}><div className="sheetHead"><div><span className="eyebrow">S PAY</span><h2>Top up wallet</h2></div><button onClick={() => setTopupOpen(false)}><X size={19}/></button></div><p className="modalHint">Enter the amount you want to add to your wallet.</p><div className="amountInput"><span>ETB</span><input inputMode="numeric" value={topupAmount} onChange={e => setTopupAmount(e.target.value.replace(/[^0-9]/g,''))} placeholder="0"/></div><button className="topup" onClick={topUp}>Continue <ChevronRight size={17}/></button></aside></div>}

      {toast && <div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
    </main>
  )
}
