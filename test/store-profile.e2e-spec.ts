import { test, expect } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('button', { name: 'Meu restaurante' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome:').fill('Rocket')
  await page.getByLabel('Descrição:').fill('muito massa cara')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')

  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('button', { name: 'Rocket' })).toBeVisible()

  // await page.waitForTimeout(1000)
})
