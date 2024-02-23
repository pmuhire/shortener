import { PrismaClient } from './prisma/src/generated/prisma-client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './Client';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>