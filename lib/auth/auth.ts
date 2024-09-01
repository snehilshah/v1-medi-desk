import { Lucia } from 'lucia'

import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { prisma } from '../db/prisma'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie:{
        name: 'medi-desk-auth',
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
})