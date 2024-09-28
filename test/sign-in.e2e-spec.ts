import { test, expect } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Seu email').fill('johndoe@gmail.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Conectado com sucesso!')

  await expect(toast).toBeVisible()

  // await page.waitForTimeout(2000)
})

test('sign in unsuccessfully', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Seu email').fill('wrongdoe@gmail.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Erro ao conectar!')

  await expect(toast).toBeVisible()

  // await page.waitForTimeout(2000)
})

test('sign up', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
