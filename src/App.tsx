import { useEffect, useMemo, useState } from 'react'
import './smartpay.css'
import uniopenCardImg from './assets/uniopen-card.png'

type TabId = 'home' | 'cards' | 'pay' | 'travel'

function Icon({ name }: { name: 'home' | 'card' | 'pay' | 'travel' }) {
  if (name === 'home') {
    return (
      <svg className="tab-icon tab-icon-home" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <g className="icon-base">
          <path d="M3 8l6-5 6 5v7a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <path d="M7 16v-5h4v5" stroke="currentColor" strokeWidth="1.3" />
        </g>
        <g className="icon-active">
          <path d="M3 8l6-5 6 5v7a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" fill="currentColor" opacity="0.18" />
          <path d="M6.7 16v-5h4.6v5" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>
    )
  }
  if (name === 'card') {
    return (
      <svg className="tab-icon tab-icon-card" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <g className="icon-base">
          <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <path d="M2 8h14" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5 12h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </g>
        <g className="icon-active">
          <rect x="2" y="5" width="14" height="10" rx="2.2" fill="currentColor" opacity="0.16" />
          <path d="M2 8h14" stroke="currentColor" strokeWidth="1.4" />
          <rect x="4.4" y="11.3" width="4.2" height="1.8" rx="0.9" fill="currentColor" />
        </g>
      </svg>
    )
  }
  if (name === 'pay') {
    return (
      <svg className="tab-icon tab-icon-pay" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <g className="icon-base">
          <rect x="3" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <rect x="9" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <rect x="3" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <path d="M11 11h4M13 9v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </g>
        <g className="icon-active">
          <rect x="3" y="3" width="6" height="6" rx="1.2" fill="currentColor" opacity="0.16" />
          <rect x="9" y="3" width="6" height="6" rx="1.2" fill="currentColor" opacity="0.16" />
          <rect x="3" y="9" width="6" height="6" rx="1.2" fill="currentColor" opacity="0.16" />
          <path d="M11 11h4M13 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    )
  }
  return (
    <svg className="tab-icon tab-icon-travel" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g className="icon-base">
        <path d="M3 13l2.5-2.5 2 1.5 3-4.5 3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M13 4l-1.5.8-.7-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="icon-active">
        <path d="M3 13l2.5-2.5 2 1.5 3-4.5 3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="13.5" cy="4.4" r="1.3" fill="currentColor" opacity="0.22" />
      </g>
    </svg>
  )
}

function ScanModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="scan-wrap on" role="dialog" aria-modal="true">
      <div className="scan-sheet">
        <div className="rbet" style={{ marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: 15, color: 'var(--color-text-primary)' }}>中信 Everywhere 卡</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>本次預計回饋 5%・NT$45</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: 18, lineHeight: 1 }}>×</button>
        </div>
        <div className="qr-box" aria-label="QR code mock">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect x="4" y="4" width="22" height="22" rx="3" stroke="var(--g800)" strokeWidth="2" fill="none" />
            <rect x="34" y="4" width="22" height="22" rx="3" stroke="var(--g800)" strokeWidth="2" fill="none" />
            <rect x="4" y="34" width="22" height="22" rx="3" stroke="var(--g800)" strokeWidth="2" fill="none" />
            <rect x="9" y="9" width="12" height="12" rx="1.5" fill="var(--g600)" />
            <rect x="39" y="9" width="12" height="12" rx="1.5" fill="var(--g600)" />
            <rect x="9" y="39" width="12" height="12" rx="1.5" fill="var(--g600)" />
            <rect x="34" y="34" width="5" height="5" fill="var(--g800)" />
            <rect x="41" y="34" width="5" height="5" fill="var(--g800)" />
            <rect x="34" y="41" width="5" height="5" fill="var(--g800)" />
            <rect x="51" y="41" width="5" height="5" fill="var(--g800)" />
            <rect x="41" y="51" width="5" height="5" fill="var(--g800)" />
            <rect x="51" y="51" width="5" height="5" fill="var(--g800)" />
          </svg>
        </div>
        <div className="barlines"></div>
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-text-secondary)' }}>出示此條碼完成付款</div>
      </div>
      <button className="scan-backdrop" onClick={onClose} aria-label="Close" />
    </div>
  )
}

function UserAvatar({ name = 'SmartPay 使用者' }: { name?: string }) {
  return (
    <button className="avatar-btn" type="button" aria-label={`使用者頭像：${name}`}>
      <div className="avatar" aria-hidden="true">
        <svg className="avatar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.2" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" />
          <path
            d="M3.5 17c0-3.1 2.9-5.6 6.5-5.6s6.5 2.5 6.5 5.6"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  )
}

type UserCardType = '一般回饋' | '旅遊/海外' | '哩程' | '現金回饋' | '學生/入門'
type UserCard = {
  id: string
  name: string
  type: UserCardType
  masked: string
  note: string
  badgeText?: string
  badgeStyle?: { [key: string]: string }
  chipBg: string
}

function AddCardModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose: () => void
  onSave: (card: { name: string; type: UserCardType; cardNumber: string }) => void
}) {
  const [name, setName] = useState('新信用卡')
  const [type, setType] = useState<UserCardType>('一般回饋')
  const [cardNumber, setCardNumber] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    setName('新信用卡')
    setType('一般回饋')
    setCardNumber('')
  }, [open])

  if (!open) return null

  const digits = cardNumber.replace(/\D/g, '')
  const canSave = digits.length >= 12

  return (
    <div className="modal-wrap on" role="dialog" aria-modal="true">
      <div className="modal-sheet">
        <div className="rbet" style={{ marginBottom: 12 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-text-primary)' }}>新增信用卡</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>設定卡號與卡片類型</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: 18, lineHeight: 1 }}>×</button>
        </div>

        <div className="sp-field">
          <label className="sp-label" htmlFor="cardName">卡片名稱</label>
          <input
            id="cardName"
            className="sp-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：中信 @GOGO 卡"
          />
        </div>

        <div className="sp-field" style={{ marginTop: 10 }}>
          <label className="sp-label" htmlFor="cardType">卡片類型</label>
          <select id="cardType" className="sp-select" value={type} onChange={(e) => setType(e.target.value as UserCardType)}>
            <option value="一般回饋">一般回饋</option>
            <option value="旅遊/海外">旅遊/海外</option>
            <option value="哩程">哩程</option>
            <option value="現金回饋">現金回饋</option>
            <option value="學生/入門">學生/入門</option>
          </select>
        </div>

        <div className="sp-field" style={{ marginTop: 10 }}>
          <label className="sp-label" htmlFor="cardNo">卡號</label>
          <input
            id="cardNo"
            className="sp-input"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="例如：4111 1111 1111 1111"
            inputMode="numeric"
            autoComplete="cc-number"
          />
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 6 }}>
            會以遮罩方式顯示（只保留末四碼）。
          </div>
        </div>

        {error ? (
          <div style={{ marginTop: 10, fontSize: 12, color: '#B42318' }}>{error}</div>
        ) : null}

        <div className="modal-actions">
          <button className="modal-btn secondary" type="button" onClick={onClose}>取消</button>
          <button
            className="modal-btn primary"
            type="button"
            disabled={!canSave}
            onClick={() => {
              if (!canSave) {
                setError('請輸入至少 12 碼卡號')
                return
              }
              onSave({ name: name.trim() || '新信用卡', type, cardNumber: digits })
              onClose()
            }}
          >
            儲存
          </button>
        </div>
      </div>
      <button className="modal-backdrop" onClick={onClose} aria-label="Close" />
    </div>
  )
}

function App() {
  const [tab, setTab] = useState<TabId>('home')
  const [scanOpen, setScanOpen] = useState(false)
  const [travelCountry, setTravelCountry] = useState<string>('日本')
  const [travelQuery, setTravelQuery] = useState<string>('')
  const [now, setNow] = useState(() => new Date())
  const [geo, setGeo] = useState<
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'ready'; lat: number; lng: number; accuracyM?: number; ts: number }
    | { status: 'error'; message: string }
  >({
    // Demo default: show “GPS 已啟動/已定位” without needing permission click.
    status: 'ready',
    lat: 25.033,
    lng: 121.5654,
    accuracyM: 18,
    ts: Date.now(),
  })

  const [addCardOpen, setAddCardOpen] = useState(false)
  const [rewardDetailOpen, setRewardDetailOpen] = useState(false)
  const [userCards, setUserCards] = useState<UserCard[]>(() => [
    {
      id: 'everywhere',
      name: '中信 Everywhere 卡',
      type: '現金回饋',
      masked: '**** **** **** 1234',
      note: '一般消費 3% 現金回饋',
      badgeText: '主力卡',
      badgeStyle: { background: 'var(--g50)', color: 'var(--g800)' },
      chipBg: 'var(--g800)',
    },
    {
      id: 'gogo',
      name: '中信 @GOGO 卡',
      type: '旅遊/海外',
      masked: '**** **** **** 5678',
      note: '海外 5% 點數',
      badgeText: '旅遊',
      badgeStyle: { background: '#E8EEFF', color: '#1A3080' },
      chipBg: '#2C4A8C',
    },
    {
      id: 'a',
      name: 'A 銀行白金卡',
      type: '一般回饋',
      masked: '**** **** **** 0007',
      note: '一般消費 1% 回饋',
      badgeText: '備用',
      badgeStyle: { background: 'var(--color-background-tertiary)', color: 'var(--color-text-secondary)' },
      chipBg: '#4A5568',
    },
  ])

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30)
    return () => window.clearInterval(id)
  }, [])

  const timeText = useMemo(() => {
    // iPhone status bar style: "9:41"
    return now.toLocaleTimeString('zh-TW', { hour: 'numeric', minute: '2-digit', hour12: false })
  }, [now])

  const requestGps = () => {
    if (!('geolocation' in navigator)) {
      setGeo({ status: 'error', message: '此瀏覽器不支援定位' })
      return
    }
    setGeo({ status: 'loading' })
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({
          status: 'ready',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyM: pos.coords.accuracy,
          ts: pos.timestamp || Date.now(),
        })
      },
      (err) => {
        const msg =
          err.code === err.PERMISSION_DENIED
            ? '定位權限被拒絕'
            : err.code === err.POSITION_UNAVAILABLE
              ? '目前無法取得定位'
              : err.code === err.TIMEOUT
                ? '定位逾時'
                : '定位失敗'
        setGeo({ status: 'error', message: msg })
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30_000 },
    )
  }

  const countries = useMemo(
    () => ['日本', '韓國', '新加坡', '泰國', '越南', '美國', '加拿大', '英國', '法國', '德國', '西班牙', '義大利', '澳洲'],
    [],
  )

  const q = travelQuery.trim().toLowerCase()
  const matchesQuery = (text: string) => (q.length === 0 ? true : text.toLowerCase().includes(q))

  const screens = useMemo(() => {
    return {
      home: (
        <div className="screen on" id="s-home">
          <div className="topbar">
            <div className="rbet">
              <div>
                <div className="topbar-title">智慧刷卡顧問</div>
                <div className="topbar-sub">本月已優化回饋 NT$380</div>
              </div>
              <UserAvatar name="王小明" />
            </div>
          </div>
          <div className="body">
            <div className="push-card">
              <div className="push-label">
                <span>即時推播</span>
                <span className="bell-wrap" aria-label="有新推播">
                  <svg className="bell-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 22a2.3 2.3 0 0 0 2.2-2H9.8A2.3 2.3 0 0 0 12 22Z"
                      fill="rgba(255,255,255,0.92)"
                    />
                    <path
                      d="M19 17H5c1.2-1.1 2-2.3 2-4.2V10a5 5 0 0 1 10 0v2.8c0 1.9.8 3.1 2 4.2Z"
                      stroke="rgba(255,255,255,0.92)"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="bell-dot" aria-hidden="true" />
                </span>
              </div>
              <div className="push-body">即將抵達全聯，使用中信 Everywhere 卡可得 3X 點數，比隨機刷多賺 NT$45</div>
              <div className="gps-row">
                <div className="gps-left">
                  <span className={`gps-dot ${geo.status === 'ready' ? 'on' : geo.status === 'loading' ? 'loading' : ''}`} />
                  {geo.status === 'ready' ? (
                    <span>
                      GPS 已定位（{geo.lat.toFixed(4)}, {geo.lng.toFixed(4)}
                      {typeof geo.accuracyM === 'number' ? `・±${Math.round(geo.accuracyM)}m` : ''}）
                    </span>
                  ) : geo.status === 'loading' ? (
                    <span>GPS 定位中…</span>
                  ) : geo.status === 'error' ? (
                    <span>GPS：{geo.message}</span>
                  ) : (
                    <span>GPS：未啟用</span>
                  )}
                </div>
                <button className="gps-btn" onClick={requestGps} type="button">
                  {geo.status === 'ready' ? '重新定位' : '啟用定位'}
                </button>
              </div>
              <button
                className="push-btn"
                onClick={() => {
                  setTab('pay')
                  setScanOpen(true)
                }}
              >
                開啟條碼付款 →
              </button>
            </div>
            <div className="card">
              <div className="clabel-row">
                <div className="clabel" style={{ marginBottom: 0 }}>本月回饋總覽</div>
                <button className="link-btn" type="button" onClick={() => setRewardDetailOpen(true)}>
                  查看詳細資訊
                </button>
              </div>
              <div className="row">
                <div className="met"><div className="met-v">$1,247</div><div className="met-l">已獲回饋</div></div>
                <div className="met"><div className="met-v">$380</div><div className="met-l">聰明選卡多賺</div></div>
                <div className="met"><div className="met-v">4</div><div className="met-l">持有卡片</div></div>
              </div>
            </div>
            <div className="card">
              <div className="clabel">快速功能</div>
              <div className="row">
                <button onClick={() => setTab('cards')} className="quick-btn">我的卡片</button>
                <button onClick={() => setTab('pay')} className="quick-btn">即時支付</button>
                <button onClick={() => setTab('travel')} className="quick-btn">出國規劃</button>
              </div>
            </div>
            <div className="card">
              <div className="clabel">待辦提醒</div>
              <div className="alert-row"><div className="dot" style={{ background: '#E24B4A' }}></div><span>中信 Everywhere 限時活動 <span style={{ color: '#A32D2D' }}>3 天後截止登錄</span></span></div>
              <div className="div" style={{ margin: '4px 0' }}></div>
              <div className="alert-row"><div className="dot" style={{ background: '#E6A817' }}></div><span>航空哩程點數 <span style={{ color: '#7A5200' }}>本月到期 2,400 點</span></span></div>
            </div>
          </div>
        </div>
      ),
      cards: (
        <div className="screen on" id="s-cards">
          <div className="topbar">
            <div className="rbet">
              <div>
                <div className="topbar-title">我的卡片中心</div>
                <div className="topbar-sub">管理卡片・回饋儀表板・AI 推薦</div>
              </div>
              <UserAvatar name="王小明" />
            </div>
          </div>
          <div className="body">
            <div className="card">
              <div className="clabel-row">
                <div className="clabel" style={{ marginBottom: 0 }}>持有卡片</div>
                <button className="add-btn" type="button" onClick={() => setAddCardOpen(true)} aria-label="新增卡片">＋</button>
              </div>
              {userCards.map((c) => (
                <div key={c.id} className="cc-item" style={{ background: 'var(--color-background-secondary)' }}>
                  <div className="cc-chip" style={{ background: c.chipBg }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cc-name">{c.name}</div>
                    <div className="cc-sub">{c.note} ・ {c.masked}</div>
                  </div>
                  {c.badgeText ? (
                    <span className="badge" style={c.badgeStyle}>{c.badgeText}</span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="card">
              <div className="clabel">回饋儀表板・本月</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 10 }}>若每次都選最優卡，可多賺 NT$380</div>
              <div style={{ marginBottom: 9 }}>
                <div className="rbet" style={{ marginBottom: 4 }}><span style={{ fontSize: 12 }}>中信 Everywhere</span><span style={{ fontSize: 12, fontWeight: 500, color: 'var(--g800)' }}>NT$820</span></div>
                <div className="prog"><div className="progb" style={{ width: '66%' }}></div></div>
              </div>
              <div style={{ marginBottom: 9 }}>
                <div className="rbet" style={{ marginBottom: 4 }}><span style={{ fontSize: 12 }}>中信 @GOGO</span><span style={{ fontSize: 12, fontWeight: 500, color: 'var(--g800)' }}>NT$310</span></div>
                <div className="prog"><div className="progb" style={{ width: '25%', background: 'var(--g400)' }}></div></div>
              </div>
              <div>
                <div className="rbet" style={{ marginBottom: 4 }}><span style={{ fontSize: 12 }}>其他</span><span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>NT$117</span></div>
                <div className="prog"><div className="progb" style={{ width: '9%', background: '#B4B2A9' }}></div></div>
              </div>
            </div>
            <div className="card">
              <div className="clabel">點數到期提醒</div>
              <div className="rbet" style={{ padding: '6px 0' }}>
                <div>
                  <div style={{ fontSize: 13 }}>航空哩程點數</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 1 }}>建議兌換機票或里程升等</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#A32D2D' }}>2,400 點</div>
                  <div style={{ fontSize: 11, color: '#A32D2D' }}>本月到期</div>
                </div>
              </div>
            </div>
            <div className="ai-box">
              <div className="ai-tag">AI 智慧推薦</div>
              <div className="ai-head">
                <img className="ai-card-img" src={uniopenCardImg} alt="中信 uniopen 聯名卡" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ai-title">中信 uniopen 聯名卡</div>
                  <div className="ai-sub">依你的消費習慣，這張卡在餐飲與量販情境更有利。</div>
                  <div className="ai-chips" aria-label="適用情境">
                    <span className="ai-chip">餐飲美食</span>
                    <span className="ai-chip">生活量販</span>
                  </div>
                </div>
              </div>
              <div className="ai-body">
                <div className="ai-bullets">
                  <div className="ai-bullet"><span className="ai-dot" /> 統一企業集團最高回饋 <strong style={{ color: 'var(--g800)' }}>11%</strong></div>
                  <div className="ai-bullet"><span className="ai-dot" /> 國外消費最高回饋 <strong style={{ color: 'var(--g800)' }}>11%</strong></div>
                  <div className="ai-bullet"><span className="ai-dot" /> 指定卡友日最優享買一送一</div>
                </div>
              </div>
              <button
                className="abtn"
                type="button"
                onClick={() => {
                  window.open(
                    'https://www.ctbcbank.com/twrbo/zh_tw/cc_index/cc_product/cc_hot.html',
                    '_blank',
                    'noopener,noreferrer',
                  )
                }}
              >
                立即申辦中信uniopen聯名卡 →
              </button>
            </div>
          </div>
        </div>
      ),
      pay: (
        <div className="screen on" id="s-pay">
          <div className="topbar">
            <div className="topbar-title">即時最優支付</div>
            <div className="topbar-sub">推播 + 掃碼・共用同一 AI 引擎</div>
          </div>
          <div className="body">
            <div className="rec-card">
              <div className="rbet" style={{ marginBottom: 10 }}>
                <div>
                  <div className="rec-name">中信 Everywhere 卡</div>
                  <div className="rec-sub">根據位置自動推薦・全聯超市</div>
                </div>
                <span className="badge bg">最優</span>
              </div>
              <div className="rbet">
                <div><div className="rec-rate">5%</div><div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>現金回饋</div></div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>預計可得</div>
                  <div style={{ fontSize: 20, fontWeight: 500, color: 'var(--g800)' }}>NT$45</div>
                </div>
              </div>
              <div className="div"></div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>本月加碼活動進行中・已完成活動登錄</div>
            </div>
            <div className="qbtn-wrap">
              <div className="qbtn" onClick={() => setScanOpen(true)}>
                <div style={{ width: 36, height: 36, borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.9)' }} />
                <div className="qbtn-text">點擊出示條碼</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 10 }}>以推薦卡自動付款</div>
            </div>
            <div className="card">
              <div className="clabel">手動切換卡片</div>
              <div className="sw-row">
                <div className="sw-left">
                  <div className="card-thumb" data-variant="gogo" aria-hidden="true">
                    <div className="card-chip" />
                    <div className="card-brand" />
                  </div>
                  <div style={{ fontSize: 13 }}>中信 @GOGO 卡</div>
                </div>
                <div className="row" style={{ gap: 6 }}><span style={{ fontSize: 13, color: 'var(--g700)' }}>3%</span><span className="badge bg" style={{ cursor: 'pointer' }}>選擇</span></div>
              </div>
              <div className="sw-row">
                <div className="sw-left">
                  <div className="card-thumb" data-variant="a" aria-hidden="true">
                    <div className="card-chip" />
                    <div className="card-brand" />
                  </div>
                  <div style={{ fontSize: 13 }}>A 銀行白金卡</div>
                </div>
                <div className="row" style={{ gap: 6 }}><span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>1%</span><span className="badge" style={{ background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>選擇</span></div>
              </div>
              <div className="sw-row">
                <div className="sw-left">
                  <div className="card-thumb" data-variant="b" aria-hidden="true">
                    <div className="card-chip" />
                    <div className="card-brand" />
                  </div>
                  <div style={{ fontSize: 13 }}>B 銀行現金卡</div>
                </div>
                <div className="row" style={{ gap: 6 }}><span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>2%</span><span className="badge" style={{ background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>選擇</span></div>
              </div>
            </div>
            <div className="info-bar">主動推播已開啟：導航時系統將在抵達前 2 分鐘自動推送最優刷卡建議。</div>
          </div>
        </div>
      ),
      travel: (
        <div className="screen on" id="s-travel">
          <div className="topbar">
            <div className="topbar-title">出國懶人包</div>
            <div className="topbar-sub">目的地：{travelCountry}・出發 5 天後</div>
          </div>
          <div className="body">
            <div className="card">
              <div className="clabel">搜尋目的地</div>
              <div className="sp-field">
                <label className="sp-label" htmlFor="countrySelect">國家/地區</label>
                <select
                  id="countrySelect"
                  className="sp-select"
                  value={travelCountry}
                  onChange={(e) => setTravelCountry(e.target.value)}
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sp-field" style={{ marginTop: 10 }}>
                <label className="sp-label" htmlFor="travelSearch">搜尋（卡片/狀態/提醒）</label>
                <input
                  id="travelSearch"
                  className="sp-input"
                  value={travelQuery}
                  onChange={(e) => setTravelQuery(e.target.value)}
                  placeholder="例如：免手續費、5%、登錄、到期"
                />
              </div>
              {q.length > 0 ? (
                <div style={{ marginTop: 10, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  已套用搜尋：<span style={{ color: 'var(--g800)', fontWeight: 600 }}>{travelQuery}</span>
                </div>
              ) : null}
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="ctable">
                <thead>
                  <tr><th style={{ width: '34%' }}>卡片</th><th style={{ width: '17%' }}>手續費</th><th style={{ width: '17%' }}>回饋率</th><th style={{ width: '32%' }}>狀態</th></tr>
                </thead>
                <tbody>
                  {(() => {
                    const rows = [
                      {
                        key: 'everywhere',
                        className: 'best',
                        card: <>中信 Everywhere<br /><span className="ltag">本月限時加碼</span></>,
                        fee: '免收',
                        rate: '3%+1%',
                        status: <span style={{ color: 'var(--g800)', fontWeight: 500 }}>已持有 ✓</span>,
                        haystack: '中信 Everywhere 本月限時加碼 免收 3%+1% 已持有',
                      },
                      {
                        key: 'gogo',
                        className: 'apply',
                        card: <>中信 @GOGO<br /><span className="atag">申辦即享優惠</span></>,
                        fee: '免收',
                        rate: '5%',
                        status: <span className="alink">立即申辦 →</span>,
                        haystack: '中信 @GOGO 申辦即享優惠 免收 5% 立即申辦',
                      },
                      {
                        key: 'a',
                        className: '',
                        card: 'A 銀行卡',
                        fee: '1.5%',
                        rate: '2%',
                        status: <span style={{ color: 'var(--color-text-secondary)' }}>持有中</span>,
                        haystack: 'A 銀行卡 1.5% 2% 持有中',
                      },
                      {
                        key: 'b',
                        className: '',
                        card: 'B 銀行卡',
                        fee: '1.0%',
                        rate: '1.5%',
                        status: <span style={{ color: 'var(--color-text-secondary)' }}>持有中</span>,
                        haystack: 'B 銀行卡 1.0% 1.5% 持有中',
                      },
                    ].filter((r) => matchesQuery(r.haystack))

                    return rows.length > 0 ? (
                      rows.map((r) => (
                        <tr key={r.key} className={r.className}>
                          <td>{r.card}</td>
                          <td>{r.fee}</td>
                          <td>{r.rate}</td>
                          <td>{r.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ color: 'var(--color-text-secondary)' }}>
                          找不到符合「{travelQuery}」的結果
                        </td>
                      </tr>
                    )
                  })()}
                </tbody>
              </table>
            </div>
            {matchesQuery('申辦 @GOGO 多 2% 回饋 NT$600') ? (
              <div className="warn-bar">申辦中信 @GOGO 可多 2% 回饋，行程消費 NT$30,000 可多賺 NT$600。<strong style={{ color: '#7A5200', cursor: 'pointer' }}>立即申辦 →</strong></div>
            ) : null}
            {matchesQuery('中信卡使用佔比 38% 多賺 NT$420') ? (
              <div className="info-bar">中信卡使用佔比僅 38%，切換 Everywhere 卡可達成本季滿額禮門檻並多賺 NT$420。</div>
            ) : null}
            <div className="card">
              <div className="clabel">行前待辦清單</div>
              {matchesQuery('確認持有 中信 Everywhere') ? (
                <div className="chk-row"><div className="chk chk-ok">✓</div><div>確認持有中信 Everywhere 卡</div></div>
              ) : null}
              {matchesQuery('登錄 限時 加碼 活動 截止') ? (
                <div className="chk-row"><div className="chk chk-warn">!</div><div style={{ color: '#5C3D00' }}>登錄限時加碼活動<span style={{ fontSize: 11, marginLeft: 6, color: '#A06000' }}>3 天後截止</span></div></div>
              ) : null}
              {matchesQuery('考慮 申辦 中信 @GOGO 海外 最優') ? (
                <div className="chk-row"><div className="chk chk-off">○</div><div style={{ color: 'var(--color-text-secondary)' }}>考慮申辦中信 @GOGO 卡（海外最優）</div></div>
              ) : null}
              {matchesQuery('確認 日本 現金 換匯') ? (
                <div className="chk-row"><div className="chk chk-off">○</div><div style={{ color: 'var(--color-text-secondary)' }}>確認日本現金換匯需求</div></div>
              ) : null}
              {q.length > 0 &&
              !matchesQuery('確認持有 中信 Everywhere') &&
              !matchesQuery('登錄 限時 加碼 活動 截止') &&
              !matchesQuery('考慮 申辦 中信 @GOGO 海外 最優') &&
              !matchesQuery('確認 日本 現金 換匯') ? (
                <div style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
                  待辦清單沒有符合「{travelQuery}」的項目
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ),
    } satisfies Record<TabId, React.ReactNode>
  }, [countries, geo, q, travelCountry, travelQuery, userCards])

  return (
    <div className="wrap" id="root-phone">
      <div className="sbar">
        <div className="sb-left" aria-label="時間">{timeText}</div>
        <div className="sb-notch" aria-hidden="true" />
        <div className="sb-right" aria-label="狀態列">
          <div className="sb-signal" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="sb-battery" aria-label="電量 76%">
            <div className="sb-battery-body">
              <div className="sb-battery-fill" style={{ width: '76%' }} />
            </div>
            <div className="sb-battery-cap" />
          </div>
        </div>
      </div>

      {screens[tab]}

      <div className="nav">
        <button className={`nb ${tab === 'home' ? 'on' : ''}`} onClick={() => setTab('home')}>
          <div className="ni"><Icon name="home" /></div>首頁
        </button>
        <button className={`nb ${tab === 'cards' ? 'on' : ''}`} onClick={() => setTab('cards')}>
          <div className="ni"><Icon name="card" /></div>卡片
        </button>
        <button className={`nb ${tab === 'pay' ? 'on' : ''}`} onClick={() => setTab('pay')}>
          <div className="ni"><Icon name="pay" /></div>支付
        </button>
        <button className={`nb ${tab === 'travel' ? 'on' : ''}`} onClick={() => setTab('travel')}>
          <div className="ni"><Icon name="travel" /></div>出國
        </button>
      </div>

      <ScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
      <AddCardModal
        open={addCardOpen}
        onClose={() => setAddCardOpen(false)}
        onSave={({ name, type, cardNumber }) => {
          const last4 = cardNumber.slice(-4)
          const masked = `**** **** **** ${last4}`
          const badge =
            type === '旅遊/海外'
              ? { text: '旅遊', style: { background: '#E8EEFF', color: '#1A3080' } }
              : type === '哩程'
                ? { text: '哩程', style: { background: 'var(--g50)', color: 'var(--g800)' } }
                : type === '現金回饋'
                  ? { text: '回饋', style: { background: 'var(--g50)', color: 'var(--g800)' } }
                  : { text: '新卡', style: { background: 'var(--color-background-tertiary)', color: 'var(--color-text-secondary)' } }

          setUserCards((prev) => [
            ...prev,
            {
              id: `user-${Date.now()}`,
              name,
              type,
              masked,
              note: type,
              badgeText: badge.text,
              badgeStyle: badge.style,
              chipBg: 'var(--g800)',
            },
          ])
        }}
      />
      <div className={`modal-wrap ${rewardDetailOpen ? 'on' : ''}`} role="dialog" aria-modal="true">
        <div className="modal-sheet">
          <div className="rbet" style={{ marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)' }}>本月回饋詳細資訊</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>回饋拆解與最優選卡成果（示意）</div>
            </div>
            <button onClick={() => setRewardDetailOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: 18, lineHeight: 1 }}>×</button>
          </div>

          <div className="card" style={{ padding: 12 }}>
            <div className="rbet">
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>已獲回饋</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--g900)' }}>$1,247</div>
            </div>
            <div className="div" style={{ margin: '10px 0' }} />
            <div className="rbet">
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>聰明選卡多賺</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--g800)' }}>$380</div>
            </div>
          </div>

          <div className="card" style={{ padding: 12, marginTop: 10 }}>
            <div className="clabel" style={{ marginBottom: 8 }}>卡片貢獻（示意）</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div className="rbet" style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 12 }}>中信 Everywhere</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--g800)' }}>$820</span>
                </div>
                <div className="prog"><div className="progb" style={{ width: '66%' }} /></div>
              </div>
              <div>
                <div className="rbet" style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 12 }}>中信 @GOGO</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--g800)' }}>$310</span>
                </div>
                <div className="prog"><div className="progb" style={{ width: '25%', background: 'var(--g400)' }} /></div>
              </div>
              <div>
                <div className="rbet" style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 12 }}>其他</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>$117</span>
                </div>
                <div className="prog"><div className="progb" style={{ width: '9%', background: 'rgba(11,42,74,0.28)' }} /></div>
              </div>
            </div>
          </div>

          <div className="info-bar" style={{ marginTop: 10 }}>
            最優選卡依「通路/活動門檻/回饋上限」即時調整，並以同一 AI 引擎同步推播與掃碼建議（示意）。
          </div>
        </div>
        <button className="modal-backdrop" onClick={() => setRewardDetailOpen(false)} aria-label="Close" />
      </div>
    </div>
  )
}

export default App
