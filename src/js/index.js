// Created by Witt on 2016/4/10.
import values from 'babel-runtime/core-js/object/values'
window.onload = () => {
	new Array(20).fill('').map(v =>{					//创建一个20*20的div
		let _div = document.createElement('div')
		_div.innerHTML = `<div></div>`.repeat(20)
		document.body.appendChild(_div)
	})
	const map = (x, y) => document.body.children[19 - y].children[x]	//用于根据抽象的数组找到div组的具体dom
	const set = div => div.style.background = '#000'					//将dom设置为激活状态
	const clear = div => div.style.background = '#ccc'					//清除激活状态
	const over = t => {													//游戏结束
		clearInterval(t)
		return alert('游戏结束')
	}
	let move = {38: {x: 0, y: 1}, 40: {x: 0, y: -1}, 39: {x: 1, y: 0}, 37: {x: -1, y: 0}}		//移动事件触发对象,当前点在坐标中移动方法
	let food, dir = Number.parseInt(Math.random()* 4 +37,10), snake = [{x: 10, y: 10, m: 37}]	//每次的食物生成坐标,移动方向数值(对应移动事件对象)
	const newFood = () =>{																		//生成一个新的食物并且将它同步到dom上
		food = {x: Number.parseInt(Math.random()* 19), y: Number.parseInt(Math.random()* 19)}
		set(map(...values(food)))
	}
	newFood()
	const handle = event =>{
		const next = {x: snake[0].x + move[snake[0].m].x, y: snake[0].y + move[snake[0].m].y, m: dir}	//下一步的坐标与方向
		if (next.x >= 20 || next.x < 0 || next.y >= 20 || next.y < 0) return over(time)					//边缘检测
		snake.forEach(v =>{
			if (v.x === next.x && v.y === next.y) return over(time)					//触碰自身检测
		})
		snake.unshift(next)															//添加一个长度
		set(map(...[snake[0].x,snake[0].y]))										//将新添加的长度同步到dom上
		clear(map(...[snake[snake.length - 1].x,snake[snake.length - 1].y]))		//清除最后一个坐标的激活状态
		snake[0].m = dir															//最后再同步一次方向,及时响应操作
		if (next.x == food.x && next.y == food.y)  return newFood()					//吃食物后再创建一个新食物
		snake.pop()																	//未吃食物相应的缩短一次长度
	}
	const time = setInterval(handle,200)
	document.body.addEventListener('keydown', event =>{
		if (move[event.keyCode]) dir = event.keyCode							//如果移动事件触发对象中可以找到,则更新一次方向
	})
}





