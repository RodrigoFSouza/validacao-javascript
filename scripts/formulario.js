const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const campos = {
  usuario: false,
  nome: false,
  senha: false,
  email: false, 
  telefone: false
}

const expresions = {    
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nome: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	senha: /^.{4,12}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case 'usuario':
      validarCampo(expresions.usuario, e.target, 'usuario');
    break;
    case 'nome':
      validarCampo(expresions.nome, e.target, 'nome');
    break;
    case 'senha':
      validarCampo(expresions.senha, e.target, 'senha');
      validarConfirmacao();
    break;
    case 'confirmacao':
      validarConfirmacao();
    break;

    case 'email':
      validarCampo(expresions.email, e.target, 'email');
    break;
    case 'telefone':
      validarCampo(expresions.telefone, e.target, 'telefone');
    break;
  }
}

const validarCampo = (expressao, input, campo) => {
  if (expressao.test(input.value)) {
    document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correto');
    document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorreto');
    document.querySelector(`#grupo-${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo-${campo} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo-${campo} .formulario-error`).classList.remove('formulario-error-active');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correto');
    document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorreto');
    document.querySelector(`#grupo-${campo} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo-${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo-${campo} .formulario-error`).classList.add('formulario-error-active');
    campos[campo] = false;
  }
}

const validarConfirmacao = () => {
  const inputSenha = document.getElementById('senha');
  const inputConfirmacao = document.getElementById('confirmacao');
  
  if (inputSenha.value !== inputConfirmacao.value) {
    document.getElementById(`grupo-confirmacao`).classList.remove('formulario-grupo-correto');
    document.getElementById(`grupo-confirmacao`).classList.add('formulario-grupo-incorreto');
    document.querySelector(`#grupo-confirmacao i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo-confirmacao i`).classList.add('fa-times-circle');
    document.querySelector('#grupo-confirmacao .formulario-error').classList.add('formulario-error-active');
    campos['senha'] = false;
  } else {
    document.getElementById('grupo-confirmacao').classList.add('formulario-grupo-correto');
    document.getElementById('grupo-confirmacao').classList.remove('formulario-grupo-incorreto');
    document.querySelector('#grupo-confirmacao i').classList.add('fa-check-circle');
    document.querySelector('#grupo-confirmacao i').classList.remove('fa-times-circle');
    document.querySelector('#grupo-confirmacao .formulario-error').classList.remove('formulario-error-active');
    campos['senha'] = true;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const termos = document.getElementById('termos');
  if (campos.usuario && campos.email && campos.senha && campos.nome && campos.telefone && termos.checked) {
    formulario.reset();

    document.getElementById("formulario-mensagem-sucesso").classList.add('formulario-mensagem-sucesso-active');
    setTimeout(() => {
      document.getElementById("formulario-mensagem-sucesso").classList.remove('formulario-mensagem-sucesso-active');
    }, 5000);

    document.querySelectorAll('.formulario-grupo-correto').forEach((item) => {
      item.classList.remove('formulario-grupo-correto');
    });
  } else {
    document.getElementById('formulario-message').classList.add('formulario-grupo-message-active')
    setTimeout(() => {
      document.getElementById('formulario-message').classList.remove('formulario-grupo-message-active')
    }, 5000);
  }
})