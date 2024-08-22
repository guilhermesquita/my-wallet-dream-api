export interface CheckConfirmaitonEmail {
  checkConfirmation: (id: string) => Promise<boolean>
}
