export interface ITask {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  priority?: string;
}


export interface ICreateTask {
  title: string;
  description?: string;
  dueDate: string;
  completed?: boolean;
  priority?: string;
}

export type IUpdateTask = Partial<ICreateTask>

export type IFindAllTask = ITask[]

