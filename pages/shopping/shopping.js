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
			bigAdImges: [
				{
					src: '../../static/shop/o_1f2j4g85brqh8cl1jg916n2ung17.png',
					toType: 1,
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '新人特惠',
						jumpType: 'pdd'
					}
				},
				{
					src: '../../static/shop/o_1f2j4gkvf1uuu14f01c9uids81n1c.png',
					toType: 1,
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '今日爆款',
						jumpType: 'pdd'
					}
				},
				{
					src: '../../static/shop/o_1f2j4h3upn5b158ludf16bhqmp1h.png',
					toType: 1,
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '大额优惠',
						jumpType: 'pdd'
					}
				},
			],
			features: [{
					src: '../../static/shop/o_1f55hj3cc84e17vh4gq1em71ahn1c.png',
					toType: 1, 
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '拼多多',
						jumpType: 'index'
					}
				},
				{
					src: '../../static/shop/o_1f55hjjre1snkf5e77s18us1hde1h.png',
					toType: 1,
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '京东',
						jumpType: 'index'
					}
				},
				{
					src: '../../static/shop/o_1f55hjtp535q4b2br6cni18do1m.png',
					toType: 1,
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '唯品会',
						jumpType: 'index'
					}
				},
				{
					src: '../../static/shop/o_1f55hk4bciso1fbl93h6ka17v1r.png',
					toType: 2,
					toPath: {
						app_id: 'wxa918198f16869201',
						page_path: '/pages/web/web?specialUrl=1&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fduo_transfer_channel.html%3FresourceType%3D39997%26pid%3D13957782_210518982%26authDuoId%3D200005%26cpsSign%3DCE_210611_13957782_210518982_e238ad1ef824d1380c5be9823e0276be%26duoduo_type%3D2'
					}
				}
			],
			adOne: {},
			adSecond: {
				src: '../../static/shop/o_1f5il8ed71bs913pta30ttakp612.gif',
				item: {
					toType: 2,
					toPath: {
						app_id: 'wxa918198f16869201',
						page_path: '/pages/web/web?specialUrl=1&src=https%3A%2F%2Fmobile.yangkeduo.com%2Fduo_transfer_channel.html%3FresourceType%3D39997%26pid%3D13957782_210518982%26authDuoId%3D200005%26cpsSign%3DCE_210611_13957782_210518982_e238ad1ef824d1380c5be9823e0276be%26duoduo_type%3D2'
					}
				}
			},
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
		// 加载商城首页
		this.loadMallIndex();
		// 加载商品列表
		this.loadGoodsList();
		this.initShopTypeIcon();
	},
	onReachBottom() {
		this.loadmore();
	},
	methods: {
		async loadMallIndex(){
			const result = await request({url: '/program/mall/mallIndex', method: 'GET'});
			if (result.code == 200) {
				this.adOne = result.data.adOne;
				this.features = result.data.features;
				this.adSecond = result.data.adSecond;
			}
		},
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
			}else{
				this.loadGoodsList(true);
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
		},
		toPath(e){
			// toType：0 不作任何动作  1 跳转商品列表  2 跳转其它小程序
			if (e.toType == 1) {
				this.$u.route({
					url: e.toPath.page_path,
					params: {
						"jumpType": e.toPath.jumpType,
						"barTitle": e.toPath.title
					}
				})
			}else if(e.toType == 2){
				wx.navigateToMiniProgram({
					appId: e.toPath.app_id,
					path: e.toPath.page_path,
					success(res) {
						// 打开成功
					}
				})
			}
		}
	}
}
