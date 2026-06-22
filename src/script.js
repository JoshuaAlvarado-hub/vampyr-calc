let cur = '0', prev = null, op = null, fresh = false, lastOp = null, lastVal = null

function display(v) {
  const el = document.getElementById('val')
  el.textContent = v
  const len = v.replace('-', '').replace('.', '').length
  if (len <= 6) el.style.fontSize = '10vw'
  else if (len <= 9) el.style.fontSize = '7vw'
  else el.style.fontSize = '5vw'
}

function input(d) {
  if (fresh) { cur = d; fresh = false }
  else cur = cur === '0' ? d : cur + d
  display(cur)
}

function dot() {
  if (!cur.includes('.')) cur += '.'
  display(cur)
}

function setOp(o) {
  prev = parseFloat(cur); op = o; fresh = true
  document.getElementById('expr').textContent = prev + ' ' + (o === '*' ? '×' : o === '/' ? '÷' : o)
}

function calculate() {
  if (op && prev !== null) {
    lastOp = op
    lastVal = parseFloat(cur)
  } else if (lastOp && lastVal !== null) {
    prev = parseFloat(cur)
    op = lastOp
    cur = String(lastVal)
  } else return

  const c = parseFloat(cur)
  let r
  if (op === '+') r = prev + c
  else if (op === '-') r = prev - c
  else if (op === '*') r = prev * c
  else if (op === '/') r = c === 0 ? 'Error' : prev / c

  document.getElementById('expr').textContent = ''
  cur = typeof r === 'string' ? r : String(parseFloat(r.toFixed(3)))
  display(cur)
  prev = null; op = null; fresh = true
}

function clearAll() { cur = '0'; prev = null; op = null; display('0') }
function toggleSign() { cur = String(parseFloat(cur) * -1); display(cur) }
function mod() {
  if (op && prev !== null) {
    cur = String(prev % parseFloat(cur))
    display(cur)
    prev = null; op = null; fresh = true
    document.getElementById('expr').textContent = ''
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') input(e.key)
  else if (e.key === '.') dot()
  else if (e.key === '+') setOp('+')
  else if (e.key === '-') setOp('-')
  else if (e.key === '*') setOp('*')
  else if (e.key === '/') setOp('/')
  else if (e.key === '%') mod()
  else if (e.key === 'Enter' || e.key === '=') calculate()
  else if (e.key === 'Backspace') {
    if (cur.length > 1) cur = cur.slice(0, -1)
    else cur = '0'
    display(cur)
  }
  else if (e.key === 'Escape') clearAll()
})