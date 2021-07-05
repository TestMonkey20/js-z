"use strict"

class Matrix {
	constructor(width, height) {
		
		this.width = width
		this.height = height
		this.data = new Array(height)
			.fill(null)
			.map( () => new Int8Array(width))
		
	}
	setValue = (x, y, value = 0) => {
		this.data[y][x] = value
	}

	getValue = (x, y) => {
		return this.data[y][x]
	}

	transpose = () => {
		const matrix = new Matrix(this.height, this.width)
		displayMatrix()
	}
}

let matrix = new Matrix(4, 2)
matrix.setValue(2, 1, 5)
matrix.setValue(0, 0, 6)

const promptValid = (messesage) => {
	
	do {
		const result = window.prompt(messesage)

		if(result === null) return null
		
		const num = Number(result)

		if(Number.isNaN(num) || num<1) {
			alert("Proszę wybrać cyfrę większą od 0")
		} 
		else {
			return num
		}
		
	} while(true)
}

const createBtn = document.getElementById('create-button')
const transposeBtn = document.getElementById('transpose-button')

const displayMatrix = () => {
	const tableBodyHandler = document.getElementById('table-body')

	if(matrix === null) {
		tableBodyHandler.innerHTML = "Brak macierzy"
		return
	}

	let trs = ""

	for(let i = 0; i<matrix.height; i++) {
		let tds = ""

		for(let j = 0; j<matrix.width; j++) {
			tds += `<td>${matrix.getValue(j, i)}</td>`
		}

		trs += `<tr>${tds}</tr>`
		
	}
 	
	tableBodyHandler.innerHTML = trs
}

createBtn.addEventListener('click', () => {
	const height = promptValid("Proszę podać liczbę wierszy")
	if(height === null) return

	const width = promptValid("Proszę podać liczbę kolumn")
	if(width === null) return

	matrix = new Matrix(height, width)
	displayMatrix()
})

transposeBtn.addEventListener('click', () => {

	const transposed = new Matrix(matrix.height, matrix.width)
	for(let y = 0; y<matrix.height; y++) {

		for(let x = 0; x<matrix.width; x++) {
			const a = matrix.getValue(x,y)
			transposed.setValue(y, x, a)
		}
	}
	matrix = transposed

	displayMatrix()
})

displayMatrix()