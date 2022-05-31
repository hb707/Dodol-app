export interface SearchPayload {
  u_idx?: number | null;
  u_id: string | null;
  u_alias?: string | null;
}

export interface SearchActionType {
  type: string;
  payload: SearchPayload;
}

class SearchAction {
  REQUEST: string;

  SUCCESS: string;

  FAILURE: string;

  constructor() {
    this.REQUEST = 'SEARCH_REQUEST';
    this.SUCCESS = 'SEARCH_SUCCESS';
    this.FAILURE = 'SEARCH_FAILURE';
  }

  request(payload: SearchPayload) {
    return { type: this.REQUEST, payload };
  }

  success(payload: SearchPayload) {
    return { type: this.SUCCESS, payload };
  }

  failure(payload: SearchPayload) {
    return { type: this.SUCCESS, payload };
  }
}

const searchActions = new SearchAction();

export default searchActions;
