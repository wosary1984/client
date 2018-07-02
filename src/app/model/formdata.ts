export class QmAngular {
  id: number;

  qmText: string;
  qmTextarea: string;
  qmCheckbox: string;
  qmRadio: string;
  qmSelect: string;
  qmSelectall: string;
}

export class BackMessage {

  action: string;
  code: number;
  success: boolean;
  data: {
    userName: string;
    isLogged: boolean;
    userPermissions: string[];
  };
  message: string;
  xsrfToken: string;
}

export class BackNewsCode {
  backCode: number;
  Id: number;
}

export class NewsList {
  id: number;
  name: string;
}
