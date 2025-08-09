import { Account, User } from '../generated/prisma'

type AuthContextData = { currentUser: User | null; isPendingFetch: boolean; fetchCurrentUser: () => void }
type SignUpData = NonNullableFields<Pick<User & Account, 'name' | 'email' | 'password'>, 'password'>
type SignInData = Omit<SignUpData, 'name'>
