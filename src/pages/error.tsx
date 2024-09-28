import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Algo errado aconteceu...</h1>
      <p className="text-accent-foreground">Mais detalhes abaixo:</p>
      <pre className="text-accent-foreground/50">{error.message}</pre>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
