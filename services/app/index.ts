import BaseService from '../base-service';
import { collect } from '../../utils/collect-class';

@collect
class AppService extends BaseService {
	times = 0;

	start() {
		this.watch('app', ({ actionName, state }) => {
			if (actionName === 'fetch' && this.times === 0 && state) {
				this.times++;
				this.dispatch('app', 'fetch', `${state.name}23333`, 100);
			}
		});
	}
}

export const appService = new AppService();

export default appService;
