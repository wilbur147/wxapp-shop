import {request} from "../../utils/request";
export default {
	data() {
		return {
			background: {
				// backgroundColor: '#001f3f',

				// 导航栏背景图
				// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				// backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
			searchValue: "",
			searchActionStyle: {
				"position": "absolute",
				"right": "40rpx",
				"overflow": "visible",
				"width": "inherit",
				"line-height": "5rpx",
				"padding": "25rpx",
				"border-radius": "30rpx",
				"background-color": "#ff9900"
			},
			adImagesList: [{
					icon: '../../static/shop/o_1f55hj3cc84e17vh4gq1em71ahn1c.png',
					name: ''
				},
				{
					icon: '../../static/shop/o_1f55hjjre1snkf5e77s18us1hde1h.png',
					name: ''
				},
				{
					icon: '../../static/shop/o_1f55hjtp535q4b2br6cni18do1m.png',
					name: ''
				},
				{
					icon: '../../static/shop/o_1f55hk4bciso1fbl93h6ka17v1r.png',
					name: ''
				}
			],
			queryParams: {
				cpType: 'pdd',
				page: 1,
				page_size: 10
			},
			loadStatus: 'loadmore',
			list: [],
		}
	},
	onLoad() {
		// 加载商品列表
		this.loadGoodsList();
	},
	onReachBottom() {
		this.loadmore();
	},
	methods: {
		async loadGoodsList(){
			const result = await request({url: '/program/mall/mallList'+this.$u.queryParams(this.queryParams), method: 'GET'});
			if (result.code == 200) {
				this.list = [...this.list,...result.data.goods_list];
				if (this.list.length >= result.total) {
					this.loadStatus = 'nomore';
				}else{
					this.loadStatus = 'loadmore';
				}
			}
		},
		loadmore(){
			if(this.loadStatus == 'nomore') return;
			this.loadStatus = 'loading';
			this.queryParams.page = ++ this.queryParams.page;
			// 数据加载
			setTimeout(() => {
				this.loadGoodsList();
			}, 1000)
		},
		toSearch() {
			console.log("触发搜索点击");
		},
	}
}
