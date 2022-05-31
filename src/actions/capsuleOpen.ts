export interface CapsuleIndex {
  c_idx: number;
}

export interface CapsuleOpenActionType {
  type: string;
  payload: CapsuleIndex;
}

class CapsuleOpenActions {
  REQUEST: string;

  SUCCESS: string;

  FAILURE: string;

  constructor() {
    this.REQUEST = 'OPEN_REQUEST';
    this.SUCCESS = 'OPEN_SUCCESS';
    this.FAILURE = 'OPEN_FAILURE';
  }

  request(payload: CapsuleIndex) {
    return { type: this.REQUEST, payload };
  }

  success(payload: CapsuleIndex) {
    return { type: this.SUCCESS, payload };
  }

  failure(payload: CapsuleIndex) {
    return { type: this.SUCCESS, payload };
  }
}

const capsuleOpenActions = new CapsuleOpenActions();

export default capsuleOpenActions;
