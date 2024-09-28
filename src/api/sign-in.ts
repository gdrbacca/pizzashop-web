import { toast } from 'sonner'

import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  await api
    .post('/authenticate', {
      email,
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success(
          'Conectado com sucesso!' /* , {
          action: {
            label: 'Reenviar',
            onClick: () => handleSignIn(data),
          },
        } */,
        )
      }
    })
    .catch((err) => {
      console.log(err.message)
      toast.error('Erro ao conectar!')
    })
}
