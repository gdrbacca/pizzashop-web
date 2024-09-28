import { Helmet } from 'react-helmet-async'

import { PedidosCancelados } from './pedidos-cancelados'
import { PedidosDiarios } from './pedidos-diarios'
import { PedidosMensais } from './pedidos-mensais'
import { PopularProductsChart } from './popular-produts-chart'
import { ReceitaMensal } from './receita-mensal-card'
import { RevenueChart } from './revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <ReceitaMensal />

          <PedidosMensais />

          <PedidosDiarios />

          <PedidosCancelados />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
