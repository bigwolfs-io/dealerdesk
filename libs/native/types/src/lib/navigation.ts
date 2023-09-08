import { ITask } from '@dealerdesk/shared/types'

export type RootStackParamList = {
  SignUp: undefined,
  SignIn: undefined,
  Home: undefined,
  TaskCreate: undefined,
  TaskUpdate: {
    task: ITask
  }
}
