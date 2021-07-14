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
		if(x>=this.width || y>=this.height) {
			throw new Error("Index out of bounds")
		} 
		else {
			return this.data[y][x]
		}
	}

	transpose = () => {

		const transposed = new Array(this.width)
			.fill(null)
			.map( () => new Int8Array(this.height))

		for(let y = 0; y<this.height; y++) {

			for(let x = 0; x<this.width; x++) {
				transposed[x][y] = this.data[y][x]
			}
		}
		
		const tempSize = this.height
		this.height = this.width
		this.width = tempSize
		this.data = transposed
	}
}

let matrix = null


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
	matrix.transpose()
	displayMatrix()	
})

displayMatrix()