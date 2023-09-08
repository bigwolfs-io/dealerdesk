import { ITask } from '@dealerdesk/shared/types'
export type RootStackParamList = {
  SignUp: undefined,
  SignIn: undefined,
  TaskCreate: undefined,
  TaskUpdate: {
    task: ITask
  }
}
