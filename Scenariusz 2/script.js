'use strict'

const login = document.getElementById('login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const repeatPassword = document.getElementById('repeat-password')
const phone = document.getElementById('phone')
const postCode = document.getElementById('post-code')
const submit = document.querySelector('.submit')
const form = document.getElementById('form')
const error = document.getElementById('error')
const input = document.querySelector('input')


form.addEventListener('submit', (e) => {
	let messages = []

	if (login.value === '' || login.value == null) {
		messages.push('* Wymagany jest login')
	}

	const emailRegExp = /^(\w|\.|-)+@(\w|\.|-)+$/
	if (!emailRegExp.test(email.value)) {
		messages.push('* Proszę wpisać poprawny mail')
		console.log('re')
	}

	const checkPasswordArray = [/[!@#$%^&*()_+=-]/, /[a-z]/, /[A-Z]/, /[0-9]/, /.{8,}/]
	if (!checkPasswordArray.every(regexp => regexp.test(password.value))) {
		messages.push('* Hasło musi zawierać przynajmniej 8 znaków, zawierać przynajmniej 1 znak specjalny, 1 cyfrę i przynajmniej 1 dużą i 1 małą literę.')
	}

	if (password.value !== repeatPassword.value) {
		document.getElementById('repeat-password').style.background = "red"
		messages.push('* Hasła muszą być takie same')
	}

	const phoneRegExp = /^\+48\d{9}$/
	if (!phoneRegExp.test(phone.value)) {
		messages.push('* Proszę wpisać numer telefonu w formacie +48XXXXXXXXX')
	}

	if (!postCodeRegExp.test(postCode.value)) {
		messages.push('* Proszę wpisać kod pocztowy w formacie XX-XXX')
	}

	if (messages.length > 0) {
		e.preventDefault()
		error.innerHTML = messages
			.map(str => `<span>${str}</span>`)
			.join('')
	}
})


