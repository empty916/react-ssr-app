// 你的natur store实例
import NaturService from 'natur-service';
import store, { LM, M } from '../store';


class BaseService extends NaturService<M, LM> {
	/**
   * for server side render， bind your store instance to every service instance
   * also you can make it optional.
   *
   * 为了更好的服务端渲染，绑定了你store到每个实例上
   * 如果你不需要服务端渲染，那么你可以传入默认的store给到构造函数
   */
	constructor(s: typeof store = store) {
		super(s);
		this.start();
	}

	start() {}
}

export default BaseService;
