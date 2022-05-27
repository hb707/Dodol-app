export interface QuitAttribute {
  u_idx: number | null;
}

export interface QuitActionType {
  type: string;
  payload: QuitAttribute;
}

class QuitAction {
  REQUEST: string;

  SUCCESS: string;

  FAILURE: string;

  constructor() {
    this.REQUEST = 'QUIT_REQUEST';
    this.SUCCESS = 'QUIT_SUCCESS';
    this.FAILURE = 'QUIT_FAILURE';
  }

  request(payload: QuitAttribute) {
    return { type: this.REQUEST, payload };
  }

  success(payload: QuitAttribute) {
    return { type: this.SUCCESS, payload };
  }

  failure(payload: QuitAttribute) {
    return { type: this.SUCCESS, payload };
  }
}

const quitAction = new QuitAction();

export default quitAction;
