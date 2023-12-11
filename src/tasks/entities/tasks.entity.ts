export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Tasks {
  id: string;
  title: string;
  description: string;
  status: boolean;
}
