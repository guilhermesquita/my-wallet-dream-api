import {
  DreamRepository,
  PgUserRepository,
  PgWalletRepository
} from '@/infra/repos/postgres'
import { RedisService } from '../config/redis'
import {
  DbListDreamById,
  DbListUserByEmail,
  DbListUserById,
  DbListWalletByExpense,
  DbListWalletById
} from '@/domain/usecases'
import { Wallet } from '@/domain/entities'

const pgUserRepository = new PgUserRepository(new RedisService())
const pgWalletRepository = new PgWalletRepository(new RedisService())
const dbListUserById = new DbListUserById(pgUserRepository, pgUserRepository)
const dbListWalletById = new DbListWalletById(pgWalletRepository)
const dbListWalletByExpense = new DbListWalletByExpense(pgWalletRepository)
const dbListDreamById = new DbListDreamById(new DreamRepository())

const dbListUserByEmail = new DbListUserByEmail(pgUserRepository)

interface validationTokenParams {
  id: string | number
  url: string
  method: string
  tokenPayload: string
  profileId?: string
  email?: string
  walletId?: number
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserByToken = async (id: string) => {
  const user = await dbListUserById.ListById({
    id
  })
  return user
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserByEmail = async (email: string) => {
  const user = await dbListUserByEmail.ListByEmail({
    email
  })
  return user
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const verifyOwnerWallet = async (id: number) => {
  const wallet = await dbListWalletById.ListById(id)
  return wallet
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const verifyWalletExpense = async (id: string) => {
  const wallet = await dbListWalletByExpense.listByExpense(id)
  return wallet
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getDreamById = async (id: string) => {
  const user = await dbListDreamById.listById(id)
  return user
}

export const validationsTokenUser = async ({
  id,
  tokenPayload,
  url,
  method,
  email
}: validationTokenParams): Promise<boolean> => {
  let valid = true

  if (url.includes('/api/users/reset-password')) {
    const user = await getUserByEmail(email as string)
    if (tokenPayload !== user.id_user) {
      valid = false
    }
    return valid
  }

  switch (method) {
    case 'PUT':
      if (tokenPayload !== id) {
        valid = false
      }
      break
    case 'PATCH':
      if (tokenPayload !== id) {
        valid = false
      }
      break
  }

  if (url.includes('/api/users/upload')) {
    if (tokenPayload !== id) {
      return (valid = false)
    }
  }

  if (url.includes('/api/users/email')) {
    if (tokenPayload !== id) {
      return (valid = false)
    }
  }

  return valid
}

export const validationsTokenWallet = async ({
  id,
  tokenPayload,
  url,
  method,
  profileId
}: validationTokenParams): Promise<boolean> => {
  let valid = true

  const wallet = (await verifyOwnerWallet(id as number)) as Wallet

  if (url.includes('/api/wallets/')) {
    switch (method) {
      case 'POST':
        if (tokenPayload !== profileId) {
          valid = false
        }
        break
      case 'PUT':
        if (tokenPayload !== wallet.fk_profile.id_profile) {
          valid = false
        }
        break
      case 'DELETE':
        if (tokenPayload !== wallet.fk_profile.id_profile) {
          valid = false
        }
        break
    }
  }

  return valid
}

export const validationsTokenExpense = async ({
  id,
  tokenPayload,
  method,
  walletId
}: validationTokenParams): Promise<boolean> => {
  let valid = true

  const wallet = await verifyWalletExpense(id as string)

  if (method === 'post') {
    const ownerWallet = (await verifyOwnerWallet(walletId as number)) as Wallet
    if (tokenPayload !== ownerWallet.fk_profile.id_profile) {
      valid = false
    }
  }

  switch (method) {
    case 'GET':
      break
    default:
      if (tokenPayload !== wallet.fk_profile.id_profile) {
        valid = false
      }
      break
  }

  return valid
}

export const validationTokenDream = async ({
  tokenPayload,
  id,
  method,
  profileId
}: validationTokenParams): Promise<boolean> => {
  let valid = true

  const dream = await getDreamById(id as string)

  switch (method) {
    case 'POST':
      if (tokenPayload !== profileId) {
        valid = false
      }
      break
    case 'GET':
      valid = true
      break
    default:
      if (tokenPayload !== dream.fk_profile.id_profile) {
        valid = false
      }
      break
  }

  return valid
}
