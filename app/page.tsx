import { ArrowRight, Bell, Bike, ChevronRight, Clock3, CreditCard, MapPin, Search, ShoppingBag, ShoppingCart, Utensils, WalletCards } from 'lucide-react'

const services = [
  { label:'Food', icon:Utensils }, { label:'Grocery', icon:ShoppingCart }, { label:'Marketplace', icon:ShoppingBag }, { label:'Courier', icon:Bike },
]
const picks = [
  { name:'Fresh Kitchen', meta:'Local meals · 25–35 min', price:'From ETB 180' },
  { name:'Addis Market', meta:'Groceries · 20–30 min', price:'Daily essentials' },
  { name:'Urban Finds', meta:'Marketplace · New arrivals', price:'Shop now' },
]

export default function Home() {
  return <main className="shell">
    <header className="topbar">
      <div><div className="eyebrow">DELIVER TO</div><div className="location"><MapPin size={17} fill="currentColor"/> Addis Ababa <ChevronRight size={16}/></div></div>
      <button className="iconButton" aria-label="Notifications"><Bell size={21}/><span className="dot"/></button>
    </header>

    <section className="hero">
      <div className="heroCopy"><span className="tag">ONE APP, EVERYDAY</span><h1>Everything you need,<br/><strong>right at your door.</strong></h1><p>Food, groceries, shopping and delivery — built for life in Ethiopia.</p></div>
      <div className="heroOrb" aria-hidden="true"><ShoppingBag size={58}/></div>
    </section>

    <label className="search"><Search size={20}/><input placeholder="Search food, stores and products"/><kbd>/</kbd></label>

    <section className="section"><div className="sectionHead"><h2>What do you need?</h2><button>See all <ArrowRight size={15}/></button></div><div className="serviceGrid">{services.map(({label,icon:Icon})=><button className="service" key={label}><span className="serviceIcon"><Icon size={24}/></span><span>{label}</span></button>)}</div></section>

    <section className="promo"><div><span className="promoLabel">THIS WEEK</span><h2>More value in every order.</h2><p>Discover local favorites and everyday essentials.</p><button>Explore offers <ArrowRight size={16}/></button></div><div className="promoMark"><CreditCard size={34}/></div></section>

    <section className="section"><div className="sectionHead"><div><h2>Popular near you</h2><p>Handpicked for Addis Ababa</p></div><button>View all <ArrowRight size={15}/></button></div><div className="cards">{picks.map((p,i)=><article className="placeCard" key={p.name}><div className={`placeImage image${i+1}`}>{i===0?<Utensils/>:i===1?<ShoppingCart/>:<ShoppingBag/>}</div><div className="placeBody"><h3>{p.name}</h3><p>{p.meta}</p><div className="placeFoot"><span>{p.price}</span><span className="arrow"><ArrowRight size={15}/></span></div></div></article>)}</div></section>

    <section className="wallet"><div className="walletIcon"><WalletCards size={22}/></div><div><span>WALLET</span><strong>ETB 2,450.00</strong><small>Available balance</small></div><button>Manage <ArrowRight size={16}/></button></section>

    <section className="section last"><div className="sectionHead"><div><h2>Recent activity</h2><p>Your latest orders and deliveries</p></div></div><div className="activity"><div className="activityIcon"><Clock3 size={19}/></div><div><strong>No recent orders</strong><p>Your orders will appear here.</p></div><button>Start exploring <ArrowRight size={15}/></button></div></section>

    <nav className="bottomNav"><a className="active"><span>⌂</span>Home</a><a><span>⌕</span>Explore</a><a className="center"><span>+</span></a><a><span>▣</span>Orders</a><a><span>◉</span>Profile</a></nav>
  </main>
}
