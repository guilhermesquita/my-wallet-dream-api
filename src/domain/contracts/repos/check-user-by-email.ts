export interface CheckUserByEmail {
    check: (email: string) => Promise<boolean>
}