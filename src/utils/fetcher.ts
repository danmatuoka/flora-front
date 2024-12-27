import 'dotenv/config'

export interface Fetcher {
  url: string;
  token: string;
  print?: string;
}

export const fetcher = ({ url, token, print }: Fetcher) =>
  fetch(url, { headers: { Authorization: token } }).then((res) => {
    if (print) {
      console.log(print, '->', res.json());
    }
    return res.json();
  });