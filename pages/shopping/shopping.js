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
				backgroundImage: 'linear-gradient(45deg, #feda2a, #d4d332)'
			},
			searchValue: "",
			searchActionStyle: {
				"position": "absolute",
				"right": "40rpx",
				"overflow": "visible",
				"width": "inherit",
				"line-height": "20rpx",
				"padding": "25rpx",
				"border-radius": "30rpx",
				"background-color": "#feda2a"
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
				pageSize: 10
			},
			loadStatus: 'loadmore',
			list: [],
			searchId: '',
			shopTypeIcon: '',
		}
	},
	onLoad() {
		// 加载商品列表
		this.loadGoodsList();
		this.initShopTypeIcon();
	},
	onReachBottom() {
		this.loadmore();
	},
	methods: {
		async loadGoodsList(e){
			if (e) {uni.showLoading({title:"加载中..."})}
			const result = await request({url: '/program/mall/mallList'+this.$u.queryParams(this.queryParams), method: 'GET'});
			if (e) {uni.hideLoading();}
			if (result.code == 200) {
				this.searchId = result.data.searchId;
				this.list = [...this.list,...result.data.goodsList];
				if (this.list.length >= result.total) {
					this.loadStatus = 'nomore';
				}else{
					this.loadStatus = 'loadmore';
				}
			}
		},
		
		numFilter (value) {
			if (0 == value || '' == value || undefined == value) {
				return 0;
			}
			const fenStr = '00' + Number.parseInt(value.toString()).toString()
			return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
		},
		switchCpType(type){
			this.queryParams.cpType = type;
			
			this.queryParams.page = 1;
			this.list = [];
			this.initShopTypeIcon();
			this.loadGoodsList(true);
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
			this.$u.route({
				url: 'pages/HM-search/HM-search'
			})
		},
		goDetail(item){
			this.$u.route({
				url: 'pages/shop-detail/shop-detail',
				params: {
					"goodsId": item.goodsId,
					"searchId": this.searchId,
					"cpType": this.queryParams.cpType
				}
			})
		},
		initShopTypeIcon(){
			switch(this.queryParams.cpType){
				case 'pdd':
				this.shopTypeIcon = '../../static/shop/pdd_logo.png';
				break;
				case 'jd':
				this.shopTypeIcon = '../../static/shop/jd_logo.ico';
				break;
				case 'wph':
				this.shopTypeIcon = '../../static/shop/wph_logo.png';
				break;
			}
		}
	}
}
