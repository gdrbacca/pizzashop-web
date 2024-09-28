import { test, expect } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu email').fill('johndoe@gmail.com')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu telefone').fill('33343410')

  await page.getByRole('button', { name: 'Cadastrar' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  await expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('sign up unsuccessfully', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza roots')
  await page.getByLabel('Seu email').fill('johndoe@gmail.com')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu telefone').fill('33343410')

  await page.getByRole('button', { name: 'Cadastrar' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante!')

  await expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
