import { useState } from 'react';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//Importando toda info do YUP
import * as yup from 'yup'

import styles from './form.module.css'

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatório').min(6,'No mínimo 6 caracteres'),
  passwordConfirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais')
}).required();

function App() {

  const [isSuccess, setIsSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = () => {
    setIsSuccess(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contentForm}>
      <div className={styles.formGroup}>
        <input 
        type="text" 
        placeholder='Insira seu nome: ' 
        {...register("nome")}
        className={(errors.nome) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError} >{errors.nome?.message}</span>
      </div>
      <div className={styles.formGroup}>
        <input 
        type="email" 
        placeholder='Insira seu e-mail: ' 
        {...register("email")}
        className={(errors.email) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError} >{errors.email?.message}</span>
      </div>
      <div className={styles.formGroup}>
        <input 
        type="password" 
        placeholder='Insira sua senha: ' 
        {...register("password")}
        className={(errors.password) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError} >{errors.password?.message}</span>
      </div>
      <div className={styles.formGroup}>
        <input 
        type="password" 
        placeholder='Confirmar sua senha: ' 
        {...register("passwordConfirmation")}
        className={(errors.passwordConfirmation) ? `${styles.inputError}` : ''}
        />
        <span className={styles.labelError} >{errors.passwordConfirmation?.message}</span>
      </div>
      <button type='submit'>Enviar</button>

      {
        isSuccess && <p className={styles.labelSuccess}>Formulário enviado com sucesso!</p>
      }
    </form>
  )
}

export default App
