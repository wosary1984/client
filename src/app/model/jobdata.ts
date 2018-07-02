export class job {

  groupName: string;
  name: string;
  state: string;
  expression: string;
}

export class JobBackMessage {

  action: string;
  code: number;
  success: boolean;
  data: job[];
  message: string;
}