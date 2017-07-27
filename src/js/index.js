// Created by Witt on 2016/4/10.
window.onload = () => {
  ;[...new Array(20)].map(_ => {
    const _div = document.createElement('div')
    _div.innerHTML = `<div></div>`.repeat(20)
    document.body.appendChild(_div)
  })
  const map = (x, y) => document.body.children[19 - y].children[x]
  const set = div => div.style.background = '#000'
  const clear = div => div.style.background = '#ccc'
  const over = t => clearInterval(t) && alert('游戏结束')
  const move = { 38: { x: 0, y: 1 }, 40: { x: 0, y: -1 }, 39: { x: 1, y: 0 }, 37: { x: -1, y: 0 } }
  let food, dir = ~~(Math.random() * 4) + 37, snake = [{ x: 10, y: 10, m: 37 }]
  const newFood = () => {
    food = { x: ~~(Math.random() * 19) + 1, y: ~~(Math.random() * 19) + 1 }
    set(map(...Object.keys(food).map(key => food[key])))
  }
  newFood()
  const handle = _ => {
    const next = { x: snake[0].x + move[snake[0].m].x, y: snake[0].y + move[snake[0].m].y, m: dir }
    if (next.x >= 20 || next.x < 0 || next.y >= 20 || next.y < 0) return over(time)
    if (snake.forEach(v => v.x === next.x && v.y === next.y)) return over(time)
    snake.unshift(next)
    set(map(...[snake[0].x, snake[0].y]))
    clear(map(...[snake[snake.length - 1].x, snake[snake.length - 1].y]))
    snake[0].m = dir
    if (next.x == food.x && next.y == food.y) return newFood()
    snake.pop()
  }
  const time = setInterval(handle, 200)
  document.body.addEventListener('keydown', event => {
    if (move[event.keyCode]) dir = event.keyCode
  })
}





