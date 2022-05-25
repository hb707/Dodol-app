interface UserIndex {
  u_idx: number;
}

export interface ProfileActionType {
  type: string;
  data: UserIndex;
}

class ProfileAction {
  REQUEST: string;

  SUCCESS: string;

  FAILURE: string;

  constructor() {
    this.REQUEST = 'PROFILE_REQUEST';
    this.SUCCESS = 'PROFILE_SUCCESS';
    this.FAILURE = 'PROFILE_FAILURE';
  }

  request(payload: UserIndex) {
    return { type: this.REQUEST, payload };
  }

  success(payload: UserIndex) {
    return { type: this.SUCCESS, payload };
  }

  failure(payload: UserIndex) {
    return { type: this.SUCCESS, payload };
  }
}

const profileActions = new ProfileAction();

export default profileActions;
