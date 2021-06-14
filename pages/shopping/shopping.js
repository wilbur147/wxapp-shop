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
						jumpType: 'pdd',
						channelType: '1'
					}
				},
				{
					src: '../../static/shop/o_1f2j4gkvf1uuu14f01c9uids81n1c.png',
					toType: 1,
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '今日爆款',
						jumpType: 'pdd',
						channelType: '3'
					}
				},
				{
					src: '../../static/shop/o_1f2j4h3upn5b158ludf16bhqmp1h.png',
					toType: 1,
					toPath: {
						page_path: 'pages/shop-list/shop-list',
						title: '大额优惠',
						jumpType: 'pdd',
						channelType: '7'
					}
				},
			],
			features: [],
			adOne: {},
			adSecond: {},
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
				this.bigAdImges = result.data.bigAdImges;
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
			wx.navigateTo({
				url: '../HM-search/HM-search'
			})
		},
		goDetail(item){
			wx.navigateTo({
				url: '../shop-detail/shop-detail?goodsId='+item.goodsId+'&searchId='+this.searchId+'&cpType='+this.queryParams.cpType
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
				wx.navigateTo({
					url: e.toPath.page_path+'?jumpType='+e.toPath.jumpType+'&title='+e.toPath.title+'&channelType='+e.toPath.channelType
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
