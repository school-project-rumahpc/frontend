import superagent from 'superagent';
import superagentIntercept from 'superagent-intercept';
import { appConfig } from '../config/appConfig';
import { attachSuperagentLogger } from './http_logger';
import { TokenUtil } from './token';
let AuthIntercept = superagentIntercept((err, res) => {
  if (res && res.status === 401) {
    TokenUtil.clearAccessToken();
    TokenUtil.persistToken();
    window.location.href = '/';
  }
});

export const http = {
  auth: (url, values) => {
    const req = superagent
    .post(url)
    .send(values)
    .use(attachSuperagentLogger)
    return req;
  },
  fetcher: async (url) => {
    let req = superagent
      .get(appConfig.apiUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger);
    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
    }

    const resp = await req;

    return resp.body;
  },
  get: (url, opts = {}) => {
    let req = superagent
      .get(appConfig.apiUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger);
    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
    }
    return req;
  },
  post: (url, opts) => {
    let req = superagent
      .post(appConfig.apiUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger);
    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
    }
    return req;
  },
  put: (url, opts) => {
    let req = superagent
      .put(appConfig.apiUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger);
    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
    }
    return req;
  },
  del: (url, opts) => {
    let req = superagent
      .del(appConfig.apiUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger);
    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
    }
    return req;
  },
  upload: (url, file) => {
    let req = superagent
      .post(appConfig.imageApiUrl + url)
      .use(AuthIntercept)
      .attach('file', file);
    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken);
    }

    return req;
  },
};
