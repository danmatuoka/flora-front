import 'dotenv/config'

export const BASE_URL = process.env.API_BASE_URL;

export const PATHS = {
	signup: 'auth/signup',
	signin: 'auth/signin',
	getWord: 'entries/en',
	favorites: 'user/me/favorite',
	history: 'user/me/history',
}
